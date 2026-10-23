import { ArrowUpRight } from "lucide-react";
import { tr, type Lang } from "@/lib/i18n";
import { otherProjects, site, ui } from "@/content/site";
import GlassButton from "./GlassButton";

// Proyectos secundarios al final del sitio, enlazados a sus repositorios en GitHub.
export default function MoreProjects({ lang }: { lang: Lang }) {
  return (
    <section id="more" className="relative mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="text-4xl font-normal tracking-[-0.03em] sm:text-5xl">{tr(ui.more.title, lang)}</h2>
      <p className="mt-3 font-serif text-lg text-muted">{tr(ui.more.subtitle, lang)}</p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {otherProjects.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener"
              className="glass-card group flex items-center justify-between gap-4 p-5 transition-[scale] duration-150 ease-out hover:scale-[1.02] active:scale-[0.985] sm:p-6"
            >
              <span className="min-w-0">
                <span className="block truncate text-xl tracking-[-0.03em]">{p.name}</span>
                <span className="mt-0.5 block text-sm text-muted">{p.stack}</span>
              </span>
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-[background-color,transform] duration-200 group-hover:rotate-45 group-hover:bg-white/10"
              >
                <ArrowUpRight size={18} />
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <GlassButton variant="dark" href={site.github} target="_blank" rel="noopener" className="text-lg">
          {tr(ui.more.viewAll, lang)}
        </GlassButton>
      </div>
    </section>
  );
}
