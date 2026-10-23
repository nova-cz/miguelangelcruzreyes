import { ViewTransition } from "react";
import Link from "next/link";
import { tr, type Lang } from "@/lib/i18n";
import { ui, type Work } from "@/content/site";
import WorkCover from "./WorkCover";

const chip =
  "rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-md";

// Cuadrícula de tarjetas a sangre (referencia: ivankalkaev.com/works).
// Cada tarjeta lleva a su página; la imagen se "expande" hasta la portada de esa página (View Transition).
export default function ProjectGrid({ works, lang }: { works: Work[]; lang: Lang }) {
  return (
    <ul className="grid gap-[11px] sm:grid-cols-2 lg:grid-cols-3">
      {works.map((w, i) => (
        <li key={w.slug}>
          <Link
            href={`/${lang}/works/${w.slug}`}
            aria-label={w.title}
            className="group relative block aspect-[4/3] w-full overflow-hidden bg-[#141414] outline-offset-4 transition-[scale] duration-150 ease-out active:scale-[0.985]"
            style={{ borderRadius: 28 }}
          >
            <ViewTransition name={`work-${w.slug}`} share="morph" default="none">
              <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 28 }}>
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <WorkCover work={w} lang={lang} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={i < 3} />
                </div>
              </div>
            </ViewTransition>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className={chip}>{w.title}</span>
              {w.year && <span className={chip}>{w.year}</span>}
            </div>
            <span className={`${chip} absolute bottom-4 left-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}>
              {w.kind === "client" ? tr(ui.works.kindClient, lang) : tr(ui.works.kindProject, lang)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
