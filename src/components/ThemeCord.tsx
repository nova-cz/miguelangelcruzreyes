"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

// El tema vive en <html data-theme>; el componente solo lo lee y lo cambia.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
const getTheme = () => (document.documentElement.dataset.theme === "light" ? "light" : "dark");
const getServerTheme = () => "dark";

// Toggle de tema como lámpara de cordón: se toca o se tira hacia abajo (idea de ivankalkaev.com).
export default function ThemeCord({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignorar */
    }
  };

  return (
    <motion.div
      className="fixed right-[7vw] top-[-120px] z-40 flex h-[280px] touch-none flex-col items-center"
      drag="y"
      dragConstraints={{ top: 0, bottom: 28 }}
      dragElastic={0.25}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 500, bounceDamping: 14 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 14) toggle();
      }}
      whileTap={{ cursor: "grabbing" }}
    >
      <span className="w-px flex-1" style={{ background: "var(--fg-muted)" }} />
      <button
        type="button"
        aria-label={label}
        onClick={toggle}
        className="grid size-[30px] shrink-0 place-items-center rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.4)] transition-[scale] duration-150 ease-out hover:scale-110 active:scale-95"
        style={{ background: "#e8e8ea", color: "#222" }}
      >
        {theme === "dark" ? <Moon size={15} strokeWidth={2} /> : <Sun size={15} strokeWidth={2} />}
      </button>
    </motion.div>
  );
}
