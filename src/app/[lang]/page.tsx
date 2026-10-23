import { notFound } from "next/navigation";
import { hasLang } from "@/lib/i18n";
import Hero from "@/components/Hero";
import Works from "@/components/Works";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Skills from "@/components/Skills";
import MoreProjects from "@/components/MoreProjects";
import Contact from "@/components/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();

  return (
    <main>
      <Hero lang={lang} />
      <Works lang={lang} />
      <About lang={lang} />
      <Gallery lang={lang} />
      <Skills lang={lang} />
      <MoreProjects lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}
