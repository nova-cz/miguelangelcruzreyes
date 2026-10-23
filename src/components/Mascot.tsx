"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { ArrowUpRight, RotateCcw, X } from "lucide-react";
import { tr, type L, type Lang } from "@/lib/i18n";
import { ui } from "@/content/site";
import { flow, rootId, type Opt } from "@/content/star-flow";

// Cada paso es un nodo del árbol; "via" es la opción que el visitante eligió para llegar a él.
type Step = { node: string; via?: L };
const MASCOT_IMAGE = "/images/mascot/star.webp";

function StarFace({ className = "" }: { className?: string }) {
  return <Image src={MASCOT_IMAGE} alt="" width={160} height={160} draggable={false} className={className} />;
}

export default function Mascot({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [steps, setSteps] = useState<Step[]>([{ node: rootId }]);
  const listRef = useRef<HTMLDivElement>(null);

  // --- Animación de la estrella ---
  const body = useAnimationControls();
  const shadow = useAnimationControls();
  const hopping = useRef(false);
  const openRef = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Salto: se agacha, despega estirándose, cae y rebota una vez.
  const jump = useCallback(async () => {
    if (hopping.current || reduced.current) return;
    hopping.current = true;
    shadow.start({
      scaleX: [1, 1.12, 0.62, 1.12, 0.95, 1],
      opacity: [0.35, 0.45, 0.12, 0.45, 0.32, 0.35],
      transition: { duration: 0.95, times: [0, 0.18, 0.48, 0.72, 0.86, 1] },
    });
    await body.start({
      y: [0, 5, -38, 0, -9, 0],
      scaleX: [1, 1.12, 0.92, 1.1, 0.98, 1],
      scaleY: [1, 0.86, 1.1, 0.88, 1.03, 1],
      rotate: [0, 0, -10, 8, -2, 0],
      transition: { duration: 0.95, times: [0, 0.18, 0.48, 0.72, 0.86, 1], ease: "easeOut" },
    });
    hopping.current = false;
  }, [body, shadow]);

  // Entrada: cae desde arriba con rebote cuando termina el preloader.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) {
      body.set({ opacity: 1, y: 0 });
      return;
    }
    const delay = document.documentElement.dataset.seen === "1" ? 700 : 2700;
    const timer = setTimeout(async () => {
      hopping.current = true;
      await body.start({
        opacity: [0, 1, 1, 1, 1],
        y: [-160, 0, -22, 0, -6, 0],
        scaleY: [1.15, 0.82, 1.08, 0.94, 1, 1],
        scaleX: [0.9, 1.16, 0.95, 1.05, 1, 1],
        transition: { duration: 1.2, times: [0, 0.4, 0.62, 0.8, 0.92, 1] },
      });
      hopping.current = false;
    }, delay);
    return () => clearTimeout(timer);
  }, [body]);

  // Salta de vez en cuando (si el chat está cerrado y la pestaña visible).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const loop = () => {
      timer = setTimeout(
        () => {
          if (!document.hidden && !openRef.current) jump();
          loop();
        },
        7000 + Math.random() * 5000,
      );
    };
    loop();
    return () => clearTimeout(timer);
  }, [jump]);

  // Globo "¿Te ayudo?" unos segundos después de cargar; la estrella salta al aparecer.
  useEffect(() => {
    const show = setTimeout(() => {
      setShowBubble(true);
      jump();
    }, 5200);
    const hide = setTimeout(() => setShowBubble(false), 12500);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [jump]);

  // El hero abre el chat con este evento.
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("star:open", onOpen);
    return () => window.removeEventListener("star:open", onOpen);
  }, []);

  // Atajo ⌘/Ctrl + Alt + / y Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.code === "Slash") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [steps]);

  const choose = useCallback(
    (opt: Opt) => {
      if (!opt.next) return;
      setSteps((prev) => [...prev, { node: opt.next as string, via: opt.label }]);
      jump();
    },
    [jump],
  );

  const restart = () => setSteps([{ node: rootId }]);

  const hrefFor = (opt: Opt) => (opt.href ? opt.href.replace("__LANG__", lang) : undefined);
  const current = flow[steps[steps.length - 1].node];

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={tr(ui.chat.title, lang)}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[112px] right-3 z-50 flex h-[min(70svh,540px)] w-[min(94vw,380px)] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line shadow-2xl backdrop-blur-xl sm:right-5"
            style={{ background: "var(--panel)" }}
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3">
              <StarFace className="size-9" />
              <div className="min-w-0 flex-1">
                <p className="text-base leading-tight tracking-[-0.02em]">{tr(ui.chat.title, lang)}</p>
                <p className="truncate text-xs text-muted">{tr(ui.chat.subtitle, lang)}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={tr(ui.chat.close, lang)}
                className="grid size-8 place-items-center rounded-full transition-[scale,background-color] duration-150 ease-out hover:bg-white/10 active:scale-95"
              >
                <X size={16} aria-hidden />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-[15px] leading-[1.45]" aria-live="polite">
              {steps.map((step, i) => (
                <div key={i} className="space-y-3">
                  {step.via && (
                    <p
                      className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-tr-md px-3.5 py-2.5"
                      style={{ background: "var(--nav-active)", color: "var(--nav-active-fg)" }}
                    >
                      {tr(step.via, lang)}
                    </p>
                  )}
                  <p className="max-w-[88%] whitespace-pre-line rounded-2xl rounded-tl-md px-3.5 py-2.5 text-muted" style={{ background: "var(--card)" }}>
                    {tr(flow[step.node].text, lang)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-line p-3">
              <p className="mb-2 px-1 text-xs text-muted">{tr(ui.chat.pick, lang)}</p>
              <div className="flex max-h-[168px] flex-wrap gap-2 overflow-y-auto">
                {current.options.map((opt) => {
                  const href = hrefFor(opt);
                  const cls =
                    "flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-left text-sm transition-[scale,background-color] duration-150 ease-out hover:bg-white/10 active:scale-95";
                  const label = tr(opt.label, lang);
                  return href ? (
                    <a
                      key={label}
                      href={href}
                      {...(opt.external ? { target: "_blank", rel: "noopener" } : { onClick: () => setOpen(false) })}
                      className={cls}
                    >
                      {label}
                      <ArrowUpRight size={13} aria-hidden />
                    </a>
                  ) : (
                    <button key={label} type="button" onClick={() => choose(opt)} className={cls}>
                      {label}
                    </button>
                  );
                })}
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={restart}
                    className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm text-muted transition-[scale,background-color] duration-150 ease-out hover:bg-white/10 active:scale-95"
                  >
                    <RotateCcw size={13} aria-hidden />
                    {tr(ui.chat.home, lang)}
                  </button>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-3 z-50 sm:right-5">
        <AnimatePresence>
          {showBubble && !open && (
            <motion.span
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              className="pointer-events-none absolute bottom-[62px] right-[66px] whitespace-nowrap rounded-2xl border border-line px-4 py-2 text-sm shadow-lg backdrop-blur-md"
              style={{ background: "var(--panel)" }}
            >
              {tr(ui.chat.bubble, lang)}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          onHoverStart={jump}
          aria-label={tr(open ? ui.chat.close : ui.chat.open, lang)}
          aria-expanded={open}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="relative block size-[76px]"
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0.35 }}
            animate={shadow}
            className="absolute -bottom-1.5 left-1/2 h-2.5 w-12 -translate-x-1/2 rounded-full bg-black blur-[3px]"
          />
          <span className="block size-full mascot-bob">
            <motion.span
              initial={{ opacity: 0, y: -160 }}
              animate={body}
              className="block size-full origin-bottom drop-shadow-[0_8px_14px_rgba(0,0,0,0.4)]"
            >
              <StarFace className="size-full select-none" />
            </motion.span>
          </span>
        </motion.button>
      </div>
    </>
  );
}
