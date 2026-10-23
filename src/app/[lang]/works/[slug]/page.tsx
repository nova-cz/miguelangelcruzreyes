import { ViewTransition } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { hasLang, locales, tr, type L, type Lang } from "@/lib/i18n";
import { ui } from "@/content/site";
import { getWorks } from "@/lib/works";
import CaseNav from "@/components/CaseNav";
import Contact from "@/components/Contact";
import T from "@/components/T";
import WorkCover from "@/components/WorkCover";

export function generateStaticParams() {
  return locales.flatMap((lang) => getWorks().map((w) => ({ lang, slug: w.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/works/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const work = getWorks().find((w) => w.slug === slug);
  if (!hasLang(lang) || !work) return {};
  return {
    title: `${work.title} · Miguel Cruz`,
    description: tr(work.summary, lang),
    alternates: { languages: { es: `/es/works/${slug}`, en: `/en/works/${slug}` } },
    openGraph: work.image ? { images: [work.image] } : undefined,
  };
}

const sectionTitle = "text-3xl font-normal tracking-[-0.03em] sm:text-4xl";
const body = "mt-4 font-serif text-xl leading-[1.5] text-muted";
const rise = (i: number) => ({ "--i": i }) as React.CSSProperties;

export default async function WorkPage({ params }: PageProps<"/[lang]/works/[slug]">) {
  const { lang: rawLang, slug } = await params;
  if (!hasLang(rawLang)) notFound();
  const lang: Lang = rawLang;

  const all = getWorks();
  const index = all.findIndex((w) => w.slug === slug);
  if (index < 0) notFound();
  const work = all[index];
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  // Solo se muestran las secciones que tienen contenido.
  const sections: { id: string; label: L; content: React.ReactNode }[] = [
    { id: "overview", label: ui.case.overview, content: <p className={body}>{tr(work.summary, lang)}</p> },
  ];
  if (work.challenge)
    sections.push({
      id: "challenge",
      label: ui.case.challenge,
      content: (
        <p className={body}>
          <T>{tr(work.challenge, lang)}</T>
        </p>
      ),
    });
  if (work.features?.length)
    sections.push({
      id: "features",
      label: ui.case.features,
      content: (
        <ul className={`${body} list-disc space-y-2 pl-6 marker:text-white/30`}>
          {work.features.map((f, i) => (
            <li key={i}>{tr(f, lang)}</li>
          ))}
        </ul>
      ),
    });
  if (work.role || work.roleTitle || work.roleAreas?.length)
    sections.push({
      id: "role",
      label: ui.case.role,
      content: (
        <>
          {work.roleTitle && <p className="mt-4 text-2xl tracking-[-0.02em]">{work.roleTitle}</p>}
          {work.role && (
            <p className={body}>
              <T>{tr(work.role, lang)}</T>
            </p>
          )}
          {work.roleAreas?.length ? (
            <ul className={`${body} list-disc space-y-2 pl-6 marker:text-white/30`}>
              {work.roleAreas.map((a, i) => (
                <li key={i}>{tr(a, lang)}</li>
              ))}
            </ul>
          ) : null}
        </>
      ),
    });
  if (work.outcome)
    sections.push({
      id: "outcome",
      label: ui.case.outcome,
      content: (
        <p className={body}>
          <T>{tr(work.outcome, lang)}</T>
        </p>
      ),
    });

  const meta = [
    { label: ui.case.type, value: work.kind === "client" ? tr(ui.works.kindClient, lang) : tr(ui.works.kindProject, lang) },
    work.roleTitle ? { label: ui.case.roleTitle, value: work.roleTitle } : null,
    work.stack?.length ? { label: ui.case.stack, value: work.stack.join(" · ") } : null,
    work.year ? { label: ui.case.year, value: work.year } : null,
  ].filter((m): m is { label: L; value: string } => m !== null);

  return (
    <main>
      <CaseNav
        backHref={`/${lang}#works`}
        backLabel={tr(ui.case.back, lang)}
        items={sections.map((s) => ({ id: s.id, label: tr(s.label, lang) }))}
      />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-48 sm:pt-36 lg:pt-32">
        <div className="rise flex flex-wrap items-center gap-2" style={rise(0)}>
          <span className="rounded-full border border-line px-3 py-1 text-sm" style={{ background: "var(--nav)" }}>
            {work.title}
          </span>
          {work.badge && <span className="text-sm text-muted">{tr(work.badge, lang)}</span>}
        </div>

        <h1 className="rise mt-5 text-5xl font-normal leading-[1.02] tracking-[-0.04em] sm:text-7xl" style={rise(1)}>
          {work.title}
        </h1>

        <ViewTransition name={`work-${work.slug}`} share="morph" default="none">
          <div className="relative mt-10 aspect-[16/10] w-full overflow-hidden bg-[#141414]" style={{ borderRadius: 28 }}>
            <WorkCover work={work} lang={lang} sizes="(min-width: 896px) 896px, 100vw" priority />
          </div>
        </ViewTransition>

        <dl className="rise mt-10 grid gap-8 sm:grid-cols-3" style={rise(3)}>
          {meta.map((m) => (
            <div key={m.label.en}>
              <dt className="text-xl tracking-[-0.02em]">{tr(m.label, lang)}</dt>
              <dd className="mt-1 text-muted">
                <T>{m.value}</T>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 space-y-16">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="rise scroll-mt-32" style={rise(4)}>
              <h2 className={sectionTitle}>{tr(s.label, lang)}</h2>
              {s.content}
            </section>
          ))}
        </div>

        {(work.demo || work.repo) && (
          <div className="mt-14 flex flex-wrap gap-3">
            {work.demo && (
              <a
                href={work.demo}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-base font-medium transition-[scale] duration-150 ease-out hover:scale-105 active:scale-95"
                style={{ background: "var(--nav-active)", color: "var(--nav-active-fg)" }}
              >
                {tr(ui.works.demo, lang)} <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
            {work.repo && (
              <a
                href={work.repo}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-6 py-3 text-base font-medium transition-[scale] duration-150 ease-out hover:scale-105 active:scale-95"
              >
                {tr(ui.works.code, lang)} <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
          </div>
        )}

        <nav aria-label={tr(ui.case.all, lang)} className="mt-24 grid gap-3 border-t border-line pt-10 sm:grid-cols-2">
          {[
            { w: prev, label: ui.case.prev },
            { w: next, label: ui.case.next },
          ].map(({ w, label }, i) => (
            <Link
              key={label.en}
              href={`/${lang}/works/${w.slug}`}
              className={`group rounded-3xl border border-line p-6 transition-[scale,background-color] duration-150 ease-out hover:bg-white/5 active:scale-[0.985] ${i === 1 ? "sm:text-right" : ""}`}
            >
              <span className="text-sm text-muted">{tr(label, lang)}</span>
              <span className="mt-1 block text-2xl tracking-[-0.03em]">{w.title}</span>
            </Link>
          ))}
        </nav>
      </article>

      <Contact lang={lang} />
    </main>
  );
}
