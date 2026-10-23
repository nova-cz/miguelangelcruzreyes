import type { L } from "@/lib/i18n";
import { awards, education, experience, site, skills, works } from "./site";

// Árbol de preguntas y respuestas de Nova, la estrella. Todo es opción múltiple: no hay texto libre ni API.
// Las respuestas se arman con los datos de site.ts para no inventar nada ni duplicar contenido.

export type Opt = { label: L; next?: string; href?: string; external?: boolean };
export type Node = { text: L; options: Opt[] };

const l = (es: string, en: string): L => ({ es, en });
const isTodo = (text: L) => text.es.startsWith("TODO");
const bullets = (items: L[]): L => ({
  es: items.filter((i) => !isTodo(i)).map((i) => `• ${i.es}`).join("\n"),
  en: items.filter((i) => !isTodo(i)).map((i) => `• ${i.en}`).join("\n"),
});

const workNodes: Record<string, Node> = Object.fromEntries(
  works.map((w) => {
    const options: Opt[] = [];
    options.push({ label: l("Ver el caso completo", "See the full case study"), href: `/__LANG__/works/${w.slug}` });
    if (w.demo) options.push({ label: l("Abrir demo", "Open demo"), href: w.demo, external: true });
    if (w.repo) options.push({ label: l("Ver el código", "View the code"), href: w.repo, external: true });
    options.push({ label: l("Otro proyecto", "Another project"), next: w.kind === "client" ? "clients" : "projects" });
    const extras = [w.badge, w.outcome].filter((x): x is L => !!x);
    return [
      `work-${w.slug}`,
      {
        text: {
          es: [w.summary.es, ...extras.map((e) => e.es)].join("\n\n"),
          en: [w.summary.en, ...extras.map((e) => e.en)].join("\n\n"),
        },
        options,
      } satisfies Node,
    ];
  }),
);

const byKind = (kind: "project" | "client"): Opt[] =>
  works
    .filter((w) => w.kind === kind)
    .map((w) => ({ label: l(w.title, w.title), next: `work-${w.slug}` }));

const jobNodes: Record<string, Node> = Object.fromEntries(
  experience.map((j, i) => {
    const role = isTodo(j.role) ? "" : `${j.role.es}${j.period.es && !isTodo(j.period) ? ` · ${j.period.es}` : ""}\n\n`;
    const roleEn = isTodo(j.role) ? "" : `${j.role.en}${j.period.en && !isTodo(j.period) ? ` · ${j.period.en}` : ""}\n\n`;
    const b = bullets(j.bullets);
    return [
      `job-${i}`,
      {
        text: { es: `${role}${b.es}`, en: `${roleEn}${b.en}` },
        options: [
          { label: l("Otra experiencia", "Another experience"), next: "experience" },
          { label: l("Ver proyectos", "See projects"), next: "projects" },
        ],
      } satisfies Node,
    ];
  }),
);

export const rootId = "root";

export const flow: Record<string, Node> = {
  root: {
    text: l(
      "¡Hola! Soy Nova, la estrella de Mike ⭐ Elige un tema y te cuento.",
      "Hi! I'm Nova, Mike's star ⭐ Pick a topic and I'll tell you more.",
    ),
    options: [
      { label: l("¿Quién es Mike?", "Who is Mike?"), next: "who" },
      { label: l("Proyectos", "Projects"), next: "projects" },
      { label: l("Experiencia", "Experience"), next: "experience" },
      { label: l("Premios", "Awards"), next: "awards" },
      { label: l("Tecnologías", "Tech stack"), next: "skills" },
      { label: l("¿Está disponible?", "Is he available?"), next: "available" },
    ],
  },
  who: {
    text: l(
      `${site.fullName} ("${site.nickname}"), de ${site.location}. Estudia Ingeniería en Ciencias de la Computación en la BUAP (promedio 9.8/10) y construye agentes de IA y productos full-stack.`,
      `${site.fullName} ("${site.nickname}"), from Puebla, Mexico. He studies Computer Science Engineering at BUAP (GPA 9.8/10) and builds AI agents and full-stack products.`,
    ),
    options: [
      { label: l("¿Qué idiomas habla?", "Which languages does he speak?"), next: "languages" },
      { label: l("¿Qué materias ha cursado?", "What has he studied?"), next: "courses" },
      { label: l("Ver proyectos", "See projects"), next: "projects" },
    ],
  },
  languages: {
    text: education.languages,
    options: [
      { label: l("¿Qué materias ha cursado?", "What has he studied?"), next: "courses" },
      { label: l("¿Está disponible?", "Is he available?"), next: "available" },
    ],
  },
  courses: {
    text: education.courses,
    options: [
      { label: l("Tecnologías", "Tech stack"), next: "skills" },
      { label: l("Ver proyectos", "See projects"), next: "projects" },
    ],
  },
  projects: {
    text: l("¿Cuál proyecto te interesa?", "Which project are you curious about?"),
    options: [
      ...byKind("project"),
      { label: l("Trabajo con clientes", "Client work"), next: "clients" },
      { label: l("Otros proyectos", "Other projects"), href: `${site.github}?tab=repositories`, external: true },
    ],
  },
  clients: {
    text: l("Sitios en producción para negocios reales en Australia.", "Production sites for real businesses in Australia."),
    options: [...byKind("client"), { label: l("Proyectos destacados", "Featured projects"), next: "projects" }],
  },
  experience: {
    text: l("¿Qué experiencia quieres conocer?", "Which experience do you want to know about?"),
    options: experience.map((j, i) => ({ label: l(j.company, j.company), next: `job-${i}` })),
  },
  awards: {
    text: {
      es: awards.map((a) => `• ${a.text.es}`).join("\n"),
      en: awards.map((a) => `• ${a.text.en}`).join("\n"),
    },
    options: [
      { label: l("Ver proyectos", "See projects"), next: "projects" },
      { label: l("Experiencia", "Experience"), next: "experience" },
    ],
  },
  skills: {
    text: {
      es: skills.map((s) => `${s.group.es}: ${s.items.join(", ")}`).join("\n"),
      en: skills.map((s) => `${s.group.en}: ${s.items.join(", ")}`).join("\n"),
    },
    options: [
      { label: l("Ver proyectos", "See projects"), next: "projects" },
      { label: l("GitHub", "GitHub"), href: site.github, external: true },
    ],
  },
  available: {
    text: l(
      "Sí. Mike busca internships de Software Engineering e IA para 2027, en México (CDMX, GDL, MTY), EE. UU., Australia o cualquier país que acepte extranjeros, y está disponible para relocalizarse.",
      "Yes. Mike is seeking Software Engineering and AI internships for 2027 in Mexico (CDMX, GDL, MTY), the US, Australia or any country open to foreign applicants, and he's open to relocating.",
    ),
    options: [
      { label: l("Escribirle por correo", "Email him"), href: `mailto:${site.email}`, external: true },
      { label: l("LinkedIn", "LinkedIn"), href: site.linkedin, external: true },
      { label: l("Abrir CV", "Open CV"), href: site.cv.es, external: true },
    ],
  },
  ...workNodes,
  ...jobNodes,
};
