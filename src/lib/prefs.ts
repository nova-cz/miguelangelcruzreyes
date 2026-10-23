import type { Lang } from "@/lib/i18n";

// Guarda el idioma elegido: la cookie la lee proxy.ts (gana sobre Accept-Language).
export function saveLang(lang: Lang) {
  try {
    localStorage.setItem("lang", lang);
  } catch {
    /* sin localStorage: la cookie basta */
  }
  document.cookie = `lang=${lang}; path=/; max-age=31536000; samesite=lax`;
}

// Abre la app de correo con el mensaje redactado.
export function openMailto(url: string) {
  window.location.href = url;
}
