"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { tr, type Lang } from "@/lib/i18n";
import { gallery, galleryCategories, ui, type GalleryCategory } from "@/content/site";

const PAGE_SIZE = 4; // cuadrícula de 2 × 2

const pill = (active: boolean) =>
  `rounded-full px-4 py-1.5 text-sm font-medium transition-[scale,background-color,color] duration-150 ease-out active:scale-95 ${
    active ? "" : "border border-line hover:bg-white/10"
  }`;

// Galería 2×2 con filtros y visor. Mantiene el estilo de vidrio del resto del sitio.
export default function Gallery({ lang }: { lang: Lang }) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [page, setPage] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null); // índice dentro de la lista filtrada

  const items = useMemo(() => (category === "all" ? gallery : gallery.filter((g) => g.category === category)), [category]);
  const pages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visible = items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const pickCategory = (c: GalleryCategory | "all") => {
    setCategory(c);
    setPage(0);
  };

  const step = useCallback(
    (dir: 1 | -1) => setViewer((v) => (v === null ? v : (v + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (viewer === null) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewer(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewer, step]);

  const current = viewer === null ? null : items[viewer];

  return (
    <section id="gallery" className="relative mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-normal tracking-[-0.03em] sm:text-5xl">{tr(ui.gallery.title, lang)}</h2>
          <p className="mt-3 font-serif text-lg text-muted">{tr(ui.gallery.subtitle, lang)}</p>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label={tr(ui.gallery.title, lang)}>
          <button
            type="button"
            onClick={() => pickCategory("all")}
            aria-pressed={category === "all"}
            className={pill(category === "all")}
            style={category === "all" ? { background: "var(--nav-active)", color: "var(--nav-active-fg)" } : undefined}
          >
            {tr(ui.gallery.all, lang)}
          </button>
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => pickCategory(c.id)}
              aria-pressed={category === c.id}
              className={pill(category === c.id)}
              style={category === c.id ? { background: "var(--nav-active)", color: "var(--nav-active-fg)" } : undefined}
            >
              {tr(c.label, lang)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={`${category}-${page}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-5"
        >
          {visible.map((g, i) => (
            <li key={g.src}>
              <button
                type="button"
                onClick={() => setViewer(page * PAGE_SIZE + i)}
                aria-label={tr(g.caption, lang)}
                className="glass-card group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden p-1.5 outline-offset-4 transition-[scale] duration-150 ease-out active:scale-[0.985] sm:p-2"
              >
                <span className="relative block size-full overflow-hidden rounded-[18px] sm:rounded-[22px]">
                  <Image
                    src={g.src}
                    alt={tr(g.alt, lang)}
                    fill
                    sizes="(min-width: 1152px) 560px, 48vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 hidden rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-md sm:block">
                    {tr(g.caption, lang)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {pages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((p) => (p - 1 + pages) % pages)}
            aria-label={tr(ui.gallery.prev, lang)}
            className="grid size-11 place-items-center rounded-full border border-line transition-[scale,background-color] duration-150 ease-out hover:scale-110 hover:bg-white/10 active:scale-95"
          >
            <ChevronLeft size={20} aria-hidden />
          </button>
          <ul className="flex items-center gap-2" aria-label={tr(ui.gallery.page, lang)}>
            {Array.from({ length: pages }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`${tr(ui.gallery.page, lang)} ${i + 1}`}
                  aria-current={i === page ? "true" : undefined}
                  className="block h-2 rounded-full transition-[width,background-color] duration-300"
                  style={{ width: i === page ? 28 : 8, background: i === page ? "var(--fg)" : "var(--line)" }}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setPage((p) => (p + 1) % pages)}
            aria-label={tr(ui.gallery.next, lang)}
            className="grid size-11 place-items-center rounded-full border border-line transition-[scale,background-color] duration-150 ease-out hover:scale-110 hover:bg-white/10 active:scale-95"
          >
            <ChevronRight size={20} aria-hidden />
          </button>
        </div>
      )}

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[65] grid place-items-center p-3 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={tr(current.caption, lang)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setViewer(null)} aria-hidden />

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card relative z-10 w-[min(94vw,1100px)] p-2 sm:p-3"
            >
              <div className="relative h-[72svh] overflow-hidden rounded-[22px]">
                <Image src={current.src} alt={tr(current.alt, lang)} fill sizes="94vw" className="object-contain" priority />
              </div>
              <figcaption className="px-3 pb-2 pt-3 text-center text-sm text-white/80">
                {tr(current.caption, lang)} · {(viewer ?? 0) + 1}/{items.length}
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={() => setViewer(null)}
              aria-label={tr(ui.gallery.close, lang)}
              className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-[scale] duration-150 ease-out hover:scale-110 active:scale-95"
            >
              <X size={18} aria-hidden />
            </button>
            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={tr(ui.gallery.prev, lang)}
                  className="absolute left-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-[scale] duration-150 ease-out hover:scale-110 active:scale-95 sm:left-6"
                >
                  <ChevronLeft size={22} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={tr(ui.gallery.next, lang)}
                  className="absolute right-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-[scale] duration-150 ease-out hover:scale-110 active:scale-95 sm:right-6"
                >
                  <ChevronRight size={22} aria-hidden />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
