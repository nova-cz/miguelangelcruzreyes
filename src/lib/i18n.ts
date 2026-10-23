export const locales = ["es", "en"] as const;
export type Lang = (typeof locales)[number];
export type L = { es: string; en: string };

export const defaultLang: Lang = "en";

export const hasLang = (value: string): value is Lang =>
  (locales as readonly string[]).includes(value);

export const tr = (text: L, lang: Lang) => text[lang];

export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es");
