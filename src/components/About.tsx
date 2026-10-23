import Image from "next/image";
import { tr, type Lang } from "@/lib/i18n";
import { awards, education, experience, ui } from "@/content/site";
import T from "./T";

const chip = "rounded-full border border-line px-3 py-1 text-xs text-muted";

// Experience, Educación y Premios en tarjetas de vidrio (mismo lenguaje visual que el resto del sitio).
export default function About({ lang }: { lang: Lang }) {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="text-4xl font-normal tracking-[-0.03em] sm:text-5xl">{tr(ui.about.title, lang)}</h2>

      <ol className="mt-12 grid gap-5 md:grid-cols-2">
        {experience.map((job) => {
          const cover = job.photos?.[0];
          return (
            <li key={job.company} className="glass-card flex flex-col overflow-hidden p-3">
              {cover && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-[20px]">
                  <Image
                    src={cover.src}
                    alt={tr(cover.alt, lang)}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]" />
                </div>
              )}

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  {job.logo && (
                    <Image
                      src={job.logo}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 shrink-0 rounded-xl border border-line bg-white/5 object-cover shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="text-xl leading-tight tracking-[-0.03em] sm:text-2xl">{job.company}</h3>
                    <p className="mt-0.5 text-[15px]">
                      <T>{tr(job.role, lang)}</T>
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {tr(job.period, lang) && (
                    <span className={chip}>
                      <T>{tr(job.period, lang)}</T>
                    </span>
                  )}
                  <span className={chip}>{tr(job.place, lang)}</span>
                </div>

                <ul className="mt-4 space-y-2 font-serif text-[15px] leading-[1.5] text-muted">
                  {job.bullets.map((b, i) => (
                    <li key={i}>
                      <T>{tr(b, lang)}</T>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-3xl font-normal tracking-[-0.03em]">{tr(ui.about.educationTitle, lang)}</h3>
          <p className="mt-6 text-xl tracking-[-0.03em]">{education.school}</p>
          <p className="mt-1 text-base">{tr(education.degree, lang)}</p>
          <p className="mt-1 text-sm">
            <T>{tr(education.graduation, lang)}</T>
          </p>
          <p className="mt-5 font-serif text-[15px] leading-[1.5] text-muted">{tr(education.courses, lang)}</p>
          <p className="mt-4 text-sm text-muted">{tr(education.languages, lang)}</p>
        </div>

        <div className="glass-card p-6 sm:p-8">
          <h3 className="text-3xl font-normal tracking-[-0.03em]">{tr(ui.about.awardsTitle, lang)}</h3>
          <ul className="mt-6 space-y-4">
            {awards.map((a, i) => (
              <li key={i} className="border-b border-line pb-4 last:border-0 last:pb-0">
                <p className="text-[15px] leading-snug tracking-[-0.01em]">{tr(a.text, lang)}</p>
                {a.detail && (
                  <p className="mt-0.5 text-sm text-muted">
                    <T>{tr(a.detail, lang)}</T>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
