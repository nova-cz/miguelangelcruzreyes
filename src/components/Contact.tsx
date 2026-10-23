import { tr, type Lang } from "@/lib/i18n";
import { site, ui } from "@/content/site";
import OpenContact from "./OpenContact";
import Socials from "./Socials";

export default function Contact({ lang }: { lang: Lang }) {
  return (
    <footer id="contact" className="relative mx-auto max-w-5xl px-6 pb-16 pt-24 text-center">
      <h2 className="text-4xl font-normal tracking-[-0.03em] sm:text-6xl">{tr(ui.contact.title, lang)}</h2>
      <p className="mx-auto mt-4 max-w-md font-serif text-lg text-muted">{tr(ui.contact.text, lang)}</p>
      <div className="mt-8 flex justify-center">
        <OpenContact variant="magenta">{tr(ui.contact.email, lang)}</OpenContact>
      </div>
      <Socials className="mt-8" />
      <p className="mt-3 text-sm text-muted">{site.email}</p>
      <p className="mt-16 text-sm text-muted">
        © {site.year} · {tr(ui.footer.rights, lang)}
      </p>
    </footer>
  );
}
