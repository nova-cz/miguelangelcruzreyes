"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, FileDown, Sparkles } from "lucide-react";
import { tr, type Lang } from "@/lib/i18n";
import { site, ui } from "@/content/site";
import FloatingObjects from "./FloatingObjects";
import GlassButton from "./GlassButton";
import OpenContact from "./OpenContact";

const reveal = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default function Hero({ lang }: { lang: Lang }) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  // Guiño de interfaz: el nombre aparece seleccionado, como en la referencia.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const select = () => {
      const el = nameRef.current;
      const sel = window.getSelection();
      if (!el || !sel || sel.toString()) return;
      const range = document.createRange();
      range.selectNodeContents(el);
      sel.removeAllRanges();
      sel.addRange(range);
    };
    const timer = setTimeout(select, 2300);
    return () => clearTimeout(timer);
  }, []);

  const copyName = async () => {
    try {
      await navigator.clipboard.writeText(site.name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* portapapeles no disponible */
    }
  };

  const askStar = () => window.dispatchEvent(new Event("star:open"));

  return (
    <section id="home" className="relative flex min-h-svh flex-col items-center justify-center px-6 pb-24 pt-28 text-center">
      <FloatingObjects />

      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center">
        <a
          href={site.github}
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          className="reveal mb-7 grid size-[60px] place-items-center overflow-hidden rounded-full text-lg font-medium transition-[scale] duration-150 ease-out hover:scale-105 active:scale-95"
          style={{ ...reveal(0), background: "linear-gradient(135deg,#3b3b3b,#151515)", color: "#fff", boxShadow: "0 0 0 1px var(--line)" }}
        >
          {site.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.avatar} alt={site.name} className="size-full object-cover" />
          ) : (
            <span aria-hidden>{site.initials}</span>
          )}
        </a>

        <h1 className="reveal text-2xl font-normal leading-[1.35] tracking-[-0.03em]" style={reveal(1)}>
          <span className="block">{tr(ui.hero.im, lang)}</span>
          <span ref={nameRef} className="inline-block px-0.5">
            {site.name}
          </span>
        </h1>

        <div
          className="reveal mt-3 flex items-center rounded-2xl p-1 text-[13px] font-medium"
          style={{ ...reveal(2), background: "var(--nav)" }}
        >
          <button onClick={copyName} className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 transition-[scale,background-color] duration-150 ease-out hover:bg-white/10 active:scale-95">
            <Copy size={14} aria-hidden />
            {copied ? tr(ui.hero.copied, lang) : tr(ui.hero.copy, lang)}
          </button>
          <span className="h-4 w-px" style={{ background: "var(--line)" }} />
          <a
            href={tr(site.cv, lang)}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 transition-[scale,background-color] duration-150 ease-out hover:bg-white/10 active:scale-95"
          >
            <FileDown size={14} aria-hidden />
            {tr(ui.hero.openCv, lang)}
          </a>
          <span className="h-4 w-px" style={{ background: "var(--line)" }} />
          <button onClick={askStar} className="flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 transition-[scale,background-color] duration-150 ease-out hover:bg-white/10 active:scale-95">
            <Sparkles size={14} aria-hidden />
            <span className="sm:hidden">{tr(ui.hero.askStarShort, lang)}</span>
            <span className="hidden sm:inline">{tr(ui.hero.askStar, lang)}</span>
          </button>
        </div>

        <p className="reveal mt-7 text-2xl leading-[1.3] tracking-[-0.03em]" style={reveal(3)}>
          {tr(ui.hero.headline, lang)}
        </p>

        <p className="reveal mt-5 font-serif text-base leading-[1.45] tracking-[-0.03em] text-muted" style={reveal(4)}>
          {tr(ui.hero.p1, lang)}
        </p>
        <p className="reveal mt-4 font-serif text-base leading-[1.45] tracking-[-0.03em] text-muted" style={reveal(5)}>
          {tr(ui.hero.p2, lang)}
        </p>

        <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3" style={reveal(6)}>
          <OpenContact variant="dark">{tr(ui.hero.cta, lang)}</OpenContact>
          <GlassButton variant="magenta" href="#works">
            {tr(ui.hero.ctaWorks, lang)}
          </GlassButton>
        </div>

        <p className="reveal pointer-fine:flex mt-5 hidden items-center gap-1.5 text-xs text-muted" style={reveal(7)}>
          {tr(ui.hero.hintPre, lang)}
          <kbd className="rounded-md px-1.5 py-0.5 font-sans" style={{ background: "var(--nav)" }}>⌘</kbd>
          <kbd className="rounded-md px-1.5 py-0.5 font-sans" style={{ background: "var(--nav)" }}>⌥</kbd>
          <span>+ S</span>
          {tr(ui.hero.hintPost, lang)}
        </p>
      </div>
    </section>
  );
}
