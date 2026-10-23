import { tr, type Lang } from "@/lib/i18n";
import { skills, ui } from "@/content/site";
import { skillIcons, tileColors } from "@/lib/skill-icons";

// Tecnologías: solo iconos brillosos del color de cada marca, con una ola de movimiento suave.
// El nombre aparece al pasar el cursor o con el teclado (y está en aria-label).
export default function Skills({ lang }: { lang: Lang }) {
  let index = 0;
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="text-4xl font-normal tracking-[-0.03em] sm:text-5xl">{tr(ui.about.skillsTitle, lang)}</h2>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {skills.map((group) => (
          <div key={group.group.en} className="glass-card p-6 sm:p-8">
            <h3 className="text-sm uppercase tracking-wider text-muted">{tr(group.group, lang)}</h3>
            <ul className="mt-6 flex flex-wrap gap-4">
              {group.items.map((name) => {
                const icon = skillIcons[name];
                const colors = icon ? tileColors(icon.hex) : null;
                const i = index++;
                return (
                  <li
                    key={name}
                    tabIndex={0}
                    aria-label={name}
                    className="skill-tile group"
                    style={
                      {
                        "--c": colors?.color ?? "#6b6b73",
                        "--ic": colors?.icon ?? "#fff",
                        "--i": i,
                      } as React.CSSProperties
                    }
                  >
                    <span className="skill-icon" aria-hidden>
                      {icon?.kind === "brand" && (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="relative size-[26px]">
                          <path d={icon.path} />
                        </svg>
                      )}
                      {icon?.kind === "lucide" && <icon.Icon className="relative size-[26px]" strokeWidth={2.1} />}
                      {!icon && <span className="relative text-sm font-semibold">{name.slice(0, 2)}</span>}
                    </span>
                    <span className="skill-tip" aria-hidden>
                      {name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
