import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { hasLang, locales, tr } from "@/lib/i18n";
import { ui } from "@/content/site";
import StarField from "@/components/StarField";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import ThemeCord from "@/components/ThemeCord";
import Mascot from "@/components/Mascot";
import ContactDialog from "@/components/ContactDialog";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Alternativa libre a la serif del cuerpo de la referencia (Tiempos es de pago).
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLang(lang)) return {};
  return {
    metadataBase: new URL("https://miguelcruz.vercel.app"),
    title: tr(ui.meta.title, lang),
    description: tr(ui.meta.description, lang),
    alternates: { languages: { es: "/es", en: "/en" } },
  };
}

// Aplica el tema guardado antes de pintar para evitar el parpadeo.
const themeScript = `var d=document.documentElement;try{d.dataset.theme=localStorage.getItem("theme")==="light"?"light":"dark"}catch(e){d.dataset.theme="dark"}try{if(sessionStorage.getItem("preloader-seen")==="1")d.dataset.seen="1"}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();

  return (
    <html
      lang={lang}
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-svh overflow-x-hidden">
        <Preloader text={tr(ui.preloader, lang)} />
        <StarField />
        <Navbar lang={lang} />
        <ThemeCord label={tr(ui.nav.themeLabel, lang)} />
        <div className="relative">{children}</div>
        <Mascot lang={lang} />
        <ContactDialog lang={lang} />
      </body>
    </html>
  );
}
