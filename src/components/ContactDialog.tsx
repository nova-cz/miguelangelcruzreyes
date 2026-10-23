"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { tr, type Lang } from "@/lib/i18n";
import { site, ui } from "@/content/site";

// Ventana de contacto estilo glass. Se abre con window.dispatchEvent(new Event("contact:open")).
// Envío: EmailJS (campos name, email, message). Todo ocurre dentro de esta ventana; no abre la app de correo.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white outline-none backdrop-blur-md transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(217,70,239,0.18)]";

export default function ContactDialog({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setOpen(true);
    };
    window.addEventListener("contact:open", onOpen);
    return () => window.removeEventListener("contact:open", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const focus = setTimeout(() => firstRef.current?.focus(), 250);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focus);
    };
  }, [open]);

  useEffect(() => {
    if (status !== "sent") return;
    const t = setTimeout(() => setOpen(false), 3200);
    return () => clearTimeout(t);
  }, [status]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || status === "sending") return;
    const data = new FormData(form);
    if (data.get("company")) {
      setStatus("sent"); // honeypot: un bot lo llenó; se simula éxito
      return;
    }
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("EmailJS: faltan variables NEXT_PUBLIC_EMAILJS_* en este build");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS:", err);
      setStatus("error");
    }
  };

  const done = status === "sent";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-md" onClick={() => setOpen(false)} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={tr(ui.form.title, lang)}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl sm:p-8"
            style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04) 45%, rgba(168,85,247,0.12))" }}
          >
            {/* brillo superior de vidrio */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-0 h-24 rounded-b-[60px] opacity-60"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0))" }}
            />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tr(ui.form.close, lang)}
              className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-white/20 bg-white/10 transition-[scale,background-color] duration-150 ease-out hover:scale-110 hover:bg-white/20 active:scale-95"
            >
              <X size={16} aria-hidden />
            </button>

            {done ? (
              <div className="relative flex flex-col items-center py-8 text-center">
                <motion.span
                  initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  className="grid size-16 place-items-center rounded-full"
                  style={{
                    background: "linear-gradient(180deg,#e879f9,#a21caf 55%,#d946ef)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 0 34px rgba(217,70,239,0.55)",
                  }}
                >
                  <Check size={30} strokeWidth={3} aria-hidden />
                </motion.span>
                <p className="mt-5 text-2xl tracking-[-0.03em]">{tr(ui.form.sentTitle, lang)}</p>
                <p className="mt-2 font-serif text-base text-white/70">
                  {tr(ui.form.sentText, lang)}
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} className="relative">
                <h2 className="text-3xl tracking-[-0.03em]">{tr(ui.form.title, lang)}</h2>
                <p className="mt-2 font-serif text-base text-white/70">{tr(ui.form.subtitle, lang)}</p>

                <div className="mt-6 space-y-3">
                  <input
                    ref={firstRef}
                    name="name"
                    required
                    maxLength={80}
                    autoComplete="name"
                    placeholder={tr(ui.form.name, lang)}
                    aria-label={tr(ui.form.name, lang)}
                    className={field}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={120}
                    autoComplete="email"
                    placeholder={tr(ui.form.email, lang)}
                    aria-label={tr(ui.form.email, lang)}
                    className={field}
                  />
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    placeholder={tr(ui.form.message, lang)}
                    aria-label={tr(ui.form.message, lang)}
                    className={`${field} resize-none`}
                  />
                  {/* honeypot: invisible para personas */}
                  <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                </div>

                {status === "error" && (
                  <p role="alert" className="mt-3 text-sm text-rose-300">
                    {tr(ui.form.error, lang)}{" "}
                    <a className="underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-variant="magenta"
                  className="glass-btn mt-6 w-full text-[19px] disabled:opacity-70"
                >
                  {tr(status === "sending" ? ui.form.sending : ui.form.send, lang)}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
