"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { tr, type Lang } from "@/lib/i18n";
import { saveLang } from "@/lib/prefs";
import { ui } from "@/content/site";

const sections = ["home", "works", "about"] as const;
type Section = (typeof sections)[number];

export default function Navbar({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<Section>("home");
  const router = useRouter();
  const pathname = usePathname();
  const onWork = pathname.includes("/works/");
  const current: Section = onWork ? "works" : active;

  // En la home, marca como activa la sección que está en pantalla.
  useEffect(() => {
    if (onWork) return;
    const els = sections.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as Section);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, onWork]);

  const items: { id: Section; label: string }[] = [
    { id: "home", label: tr(ui.nav.home, lang) },
    { id: "works", label: tr(ui.nav.works, lang) },
    { id: "about", label: tr(ui.nav.about, lang) },
  ];

  const switchLang = (next: Lang) => {
    if (next === lang) return;
    saveLang(next);
    router.push(pathname.replace(/^\/(es|en)/, `/${next}`));
  };

  return (
    <>
      <nav
        aria-label="Principal"
        className="fixed left-1/2 top-5 z-40 flex -translate-x-1/2 items-center gap-0 rounded-full p-[3px] text-[13px] font-medium sm:gap-0.5 sm:text-sm"
        style={{ background: "var(--nav)" }}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/${lang}${item.id === "home" ? "" : `#${item.id}`}`}
            className="relative whitespace-nowrap rounded-full px-2.5 py-1.5 transition-[scale] duration-150 ease-out active:scale-95 sm:px-3.5"
            style={{ color: current === item.id ? "var(--nav-active-fg)" : "var(--fg)" }}
          >
            {current === item.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--nav-active)" }}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </Link>
        ))}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("contact:open"))}
          className="relative whitespace-nowrap rounded-full px-2.5 py-1.5 transition-[scale] duration-150 ease-out active:scale-95 sm:px-3.5"
        >
          {tr(ui.nav.email, lang)}
        </button>
      </nav>

      <div
        role="group"
        aria-label={tr(ui.nav.langLabel, lang)}
        className="fixed left-4 top-[68px] z-40 flex items-center rounded-full p-[3px] text-xs font-medium sm:left-6 sm:top-5"
        style={{ background: "var(--nav)" }}
      >
        {(["es", "en"] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => switchLang(code)}
            aria-pressed={lang === code}
            lang={code}
            className="rounded-full px-2.5 py-1.5 uppercase transition-[scale,background-color,color] duration-150 ease-out active:scale-95"
            style={{
              background: lang === code ? "var(--nav-active)" : "transparent",
              color: lang === code ? "var(--nav-active-fg)" : "var(--fg-muted)",
            }}
          >
            {code}
          </button>
        ))}
      </div>
    </>
  );
}
