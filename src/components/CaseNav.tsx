"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Item = { id: string; label: string };

// "Back" fijo y sub-navegación lateral de la página de caso (como ivankalkaev.com/works/pokerdao).
export default function CaseNav({ backHref, backLabel, items }: { backHref: string; backLabel: string; items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <>
      <Link
        href={backHref}
        className="fixed left-4 top-[112px] z-30 sm:top-[76px] flex items-center gap-1.5 rounded-full py-2 pl-3 pr-4 text-sm font-medium transition-[scale] duration-150 ease-out hover:scale-105 active:scale-95 sm:left-6"
        style={{ background: "var(--nav)" }}
      >
        <ChevronLeft size={16} aria-hidden />
        {backLabel}
      </Link>

      <nav aria-label="Secciones" className="fixed left-6 top-[150px] z-30 hidden lg:block">
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="block text-lg tracking-[-0.02em] transition-colors duration-200"
                style={{ color: active === item.id ? "var(--fg)" : "var(--fg-muted)" }}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
