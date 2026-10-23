import { tr, type Lang } from "@/lib/i18n";
import { ui } from "@/content/site";
import { getWorks } from "@/lib/works";
import ProjectGrid from "./ProjectGrid";

export default function Works({ lang }: { lang: Lang }) {
  return (
    <section id="works" className="relative scroll-mt-16 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-4xl font-normal tracking-[-0.03em] sm:text-5xl">{tr(ui.works.title, lang)}</h2>
        <p className="mt-3 font-serif text-lg text-muted">{tr(ui.works.subtitle, lang)}</p>
      </div>

      <div className="mt-12 px-3">
        <ProjectGrid works={getWorks()} lang={lang} />
      </div>

    </section>
  );
}
