import Image from "next/image";
import { tr, type Lang } from "@/lib/i18n";
import type { Work } from "@/content/site";

// Portada de un proyecto. Sin imagen: degradado con el título.
export default function WorkCover({
  work,
  lang,
  sizes,
  priority,
}: {
  work: Work;
  lang: Lang;
  sizes: string;
  priority?: boolean;
}) {
  if (!work.image) {
    return (
      <div
        className="grid size-full place-items-center"
        style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.28), rgba(251,191,36,0.14))" }}
      >
        <span className="px-6 text-center text-3xl tracking-[-0.03em] text-white/70">{work.title}</span>
      </div>
    );
  }
  return (
    <Image
      src={work.image}
      alt={work.imageAlt ? tr(work.imageAlt, lang) : work.title}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover object-top"
    />
  );
}
