import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLang, hasLang, locales } from "@/lib/i18n";

// Cookie "lang" (elegida con el botón ES/EN) gana sobre Accept-Language.
function pickLang(request: NextRequest) {
  const saved = request.cookies.get("lang")?.value;
  if (saved && hasLang(saved)) return saved;

  const first = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("es") ? "es" : defaultLang;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${pickLang(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
