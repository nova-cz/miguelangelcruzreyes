import Anthropic from "@anthropic-ai/sdk";
import { hasLang } from "@/lib/i18n";
import { buildSystem } from "@/lib/chat-context";

// La clave vive solo en el servidor (ANTHROPIC_API_KEY). CHAT_MODEL permite cambiar de modelo sin tocar código.
const MODEL = process.env.CHAT_MODEL ?? "claude-opus-5-5";

const MAX_MESSAGES = 12;
const MAX_CHARS = 500;
const LIMIT = 15; // mensajes por IP y por hora
const GLOBAL_LIMIT = 300; // mensajes por hora entre todos los visitantes (tope de gasto)
const WINDOW_MS = 60 * 60 * 1000;
// En memoria: vale por instancia. Para un límite compartido entre instancias usa un almacén (Upstash/Redis/KV)
// y pon además un límite de gasto en la clave de Anthropic.
const hits = new Map<string, { count: number; reset: number }>();
const global = { count: 0, reset: 0 };

function rateLimited(ip: string) {
  const now = Date.now();

  if (global.reset < now) {
    global.count = 0;
    global.reset = now + WINDOW_MS;
    for (const [key, entry] of hits) if (entry.reset < now) hits.delete(key); // limpia entradas vencidas
  }
  global.count += 1;
  if (global.count > GLOBAL_LIMIT) return true;

  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

// IP del cliente: x-real-ip lo fija la plataforma (Vercel) y el cliente no puede falsificarlo.
// Si no existe, se usa el ÚLTIMO salto de x-forwarded-for (el que añade el proxy de confianza), no el primero.
function clientIp(request: Request) {
  const real = request.headers.get("x-real-ip")?.trim();
  if (real) return real;
  const hops = request.headers.get("x-forwarded-for")?.split(",").map((h) => h.trim()).filter(Boolean);
  return hops?.[hops.length - 1] ?? "unknown";
}

// Solo peticiones desde este mismo sitio (frena el uso desde páginas ajenas; no sustituye al límite de gasto).
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // llamadas sin navegador: las cubre el límite por IP
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

type Incoming = { role: unknown; content: unknown };

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: { lang?: unknown; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const lang = typeof body.lang === "string" && hasLang(body.lang) ? body.lang : "en";
  const raw = Array.isArray(body.messages) ? (body.messages as Incoming[]) : [];
  if (raw.length === 0 || raw.length > MAX_MESSAGES) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const messages: Anthropic.MessageParam[] = [];
  for (const m of raw) {
    if ((m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
      return Response.json({ error: "bad_request" }, { status: 400 });
    }
    const content = m.content.slice(0, MAX_CHARS).trim();
    if (!content) return Response.json({ error: "bad_request" }, { status: 400 });
    messages.push({ role: m.role, content });
  }
  if (messages[0].role !== "user" || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  if (!sameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });
  if (rateLimited(clientIp(request))) return Response.json({ error: "limit" }, { status: 429 });

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: buildSystem(lang),
      messages,
      output_config: { effort: "low" },
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ error: "error" }, { status: 502 });
    }
    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();
    if (!reply) return Response.json({ error: "error" }, { status: 502 });
    return Response.json({ reply });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return Response.json({ error: "busy" }, { status: 503 });
    if (error instanceof Anthropic.APIError) return Response.json({ error: "error" }, { status: 502 });
    return Response.json({ error: "error" }, { status: 500 });
  }
}
