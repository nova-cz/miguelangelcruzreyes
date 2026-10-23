import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { tr, type Lang } from "@/lib/i18n";
import { awards, education, experience, ui } from "@/content/site";
import T from "./T";

const chip = "rounded-full border border-line px-3 py-1 text-xs text-muted";
const tile = "grid shrink-0 place-items-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]";

const medalImg: Record<string, string> = {
  "🥈": "/images/medal-2.webp",
  "🥉": "/images/medal-3.webp",
};

// El premio trae la medalla como primer carácter del texto: se separa para mostrarla en su propio recuadro.
const splitMedal = (text: string) => {
  const m = /^(🥇|🥈|🥉)\s*/u.exec(text);
  return m ? { medal: m[1], title: text.slice(m[0].length) } : { medal: null, title: text };
};

// "A, B, C." → ["A", "B", "C"]
const chips = (text: string, sep: string) => text.replace(/\.$/, "").split(sep).filter(Boolean);

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
        <div className="glass-card glass-card-gold flex flex-col p-6 sm:p-8">
          <h3 className="text-3xl font-normal tracking-[-0.03em]">{tr(ui.about.educationTitle, lang)}</h3>

          <div className="mt-6 flex items-center gap-4">
            <span className={`${tile} size-14`} style={{ background: "linear-gradient(145deg,#fde68a,#d4a017)", color: "#3b2a00" }}>
              <GraduationCap size={26} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-2xl leading-tight tracking-[-0.03em]">{education.school}</p>
              <p className="mt-0.5 text-[15px] text-muted">{tr(education.degree, lang)}</p>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-line p-4" style={{ background: "var(--card)" }}>
              <dt className="text-xs uppercase tracking-[0.08em] text-muted">{tr(ui.about.gpa, lang)}</dt>
              <dd className="text-gold mt-1 text-3xl tracking-[-0.03em]">{education.gpa}</dd>
            </div>
            <div className="rounded-2xl border border-line p-4" style={{ background: "var(--card)" }}>
              <dt className="text-xs uppercase tracking-[0.08em] text-muted">{tr(ui.about.graduation, lang)}</dt>
              <dd className="text-gold mt-1 text-3xl tracking-[-0.03em]">
                <T>{tr(education.graduation, lang)}</T>
              </dd>
            </div>
          </dl>

          <p className="mt-7 text-xs uppercase tracking-[0.08em] text-muted">{tr(ui.about.coursesTitle, lang)}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {chips(tr(education.courses, lang), ", ").map((c) => (
              <li key={c} className={chip}>
                {c}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-xs uppercase tracking-[0.08em] text-muted">{tr(ui.about.languagesTitle, lang)}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {chips(tr(education.languages, lang), " · ").map((c) => (
              <li key={c} className={chip}>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card glass-card-gold p-6 sm:p-8">
          <h3 className="flex items-center gap-3 text-3xl font-normal tracking-[-0.03em]">
            <Image src="/images/trophy.webp" alt="" width={32} height={32} className="size-8 object-contain" />
            <span className="text-gold">{tr(ui.about.awardsTitle, lang)}</span>
          </h3>
          <ul className="mt-5 space-y-2.5">
            {awards.map((a, i) => {
              const { medal, title } = splitMedal(tr(a.text, lang));
              return (
                <li
                  key={i}
                  className="group flex items-center gap-4 rounded-2xl border border-line p-3.5 transition-[background-color,border-color] duration-200 hover:border-[#f5c451]/50 hover:bg-[#f5c451]/[0.06]"
                  style={{ background: "var(--card)" }}
                >
                  {medal && medalImg[medal] ? (
                    <Image
                      src={medalImg[medal]}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 shrink-0 drop-shadow-[0_0_3px_rgba(255,255,255,0.4)] transition-transform duration-200 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src="/images/trophy.webp"
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 shrink-0 object-contain p-0.5 transition-transform duration-200 ease-out group-hover:scale-110"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-[15px] leading-snug tracking-[-0.01em]">{title}</p>
                    {a.detail && (
                      <p className="mt-0.5 text-sm text-muted">
                        <T>{tr(a.detail, lang)}</T>
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
