"use client";

import { useEffect, useState } from "react";

// Saludo inicial (idea tomada de dennissnellenberg.com). Se muestra una vez por sesión.
// El script del <head> pone data-seen="1" si ya se vio; en ese caso el CSS lo oculta desde el primer paint.
// Al terminar marca <html data-ready="true"> para que el hero haga su entrada.
export default function Preloader({ text }: { text: string }) {
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (root.dataset.seen === "1" || reduced) {
      root.dataset.ready = "true";
      return;
    }
    try {
      sessionStorage.setItem("preloader-seen", "1");
    } catch {
      /* sin sessionStorage: se muestra igual */
    }

    root.style.overflow = "hidden";
    const timers = [
      setTimeout(() => setOut(true), 1700),
      setTimeout(() => {
        root.dataset.ready = "true";
        root.style.overflow = "";
      }, 2000),
      setTimeout(() => setGone(true), 2900),
    ];
    return () => {
      timers.forEach(clearTimeout);
      root.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className="preloader fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] text-white"
      style={{
        transform: out ? "translateY(-100%)" : "translateY(0)",
        borderBottomLeftRadius: out ? "50% 12vh" : 0,
        borderBottomRightRadius: out ? "50% 12vh" : 0,
        transition: "transform 0.9s cubic-bezier(0.7, 0, 0.3, 1), border-radius 0.9s cubic-bezier(0.7, 0, 0.3, 1)",
      }}
    >
      <p
        className="flex items-center gap-3 text-3xl font-light tracking-[-0.03em] sm:text-5xl"
        style={{
          opacity: out ? 0 : 1,
          animation: "preloader-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
          transition: "opacity 0.4s ease",
        }}
      >
        <span className="inline-block size-2 rounded-full bg-white sm:size-3" />
        {text}
      </p>
      <style>{`@keyframes preloader-in{from{opacity:0;transform:translateY(16px);filter:blur(8px)}to{opacity:1;transform:none;filter:none}}`}</style>
    </div>
  );
}
