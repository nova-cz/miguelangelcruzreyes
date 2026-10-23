import type { L } from "@/lib/i18n";

// Todo el texto del sitio vive aquí. Los componentes solo leen de este archivo.
// Regla: no inventar datos. Lo que falta va como "TODO:" (se resalta en el sitio).

const same = (text: string): L => ({ es: text, en: text });
const todo = (note: string): L => same(`TODO: ${note}`);

export const site = {
  name: "Miguel Cruz",
  fullName: "Miguel Angel Cruz Reyes",
  nickname: "Mike",
  location: "Puebla, México",
  year: 2026,
  email: "cruzmiguelangel858@gmail.com",
  github: "https://github.com/nova-cz",
  linkedin: "https://www.linkedin.com/in/miguelcr4/",
  instagram: "https://www.instagram.com/migueczrs/",
  // TODO: reemplazar por Miguel_Cruz_CV_ES.pdf y Miguel_Cruz_CV_EN.pdf (hoy solo existe Resume2025.pdf).
  cv: { es: "/Resume2025.pdf", en: "/Resume2025.pdf" } as L,
  avatar: "/images/avatar.jpg" as string | null,
  initials: "MC",
};

export const ui = {
  meta: {
    title: {
      es: "Miguel Cruz",
      en: "Miguel Cruz",
    } as L,
    description: {
      es: "Estudiante de Ciencias de la Computación que construye agentes de IA y productos full-stack. Busco internships de SWE e IA 2027.",
      en: "CS student building AI agents and full-stack products. Seeking SWE / AI internships 2027.",
    } as L,
  },
  preloader: { es: "Hola, soy Mike", en: "Hi, I'm Mike" } as L,
  nav: {
    home: { es: "Inicio", en: "Home" } as L,
    works: { es: "Proyectos", en: "Works" } as L,
    about: { es: "Experiencia", en: "About" } as L,
    email: { es: "Escríbeme", en: "Email Me" } as L,
    langLabel: { es: "Idioma", en: "Language" } as L,
    themeLabel: { es: "Cambiar tema", en: "Toggle theme" } as L,
  },
  hero: {
    im: { es: "Soy", en: "I'm" } as L,
    copy: { es: "Copiar", en: "Copy" } as L,
    copied: { es: "Copiado", en: "Copied" } as L,
    openCv: { es: "Abrir CV", en: "Open CV" } as L,
    askStar: { es: "Pregunta a Nova", en: "Ask Nova" } as L,
    askSoon: { es: "Pronto ⭐", en: "Soon ⭐" } as L,
    askStarShort: { es: "Pregunta", en: "Ask" } as L,
    headline: {
      es: "Construyo agentes de IA y productos full-stack",
      en: "I build AI agents and full-stack products",
    } as L,
    p1: {
      es: "Estudiante de Ingeniería en Ciencias de la Computación en la BUAP (promedio 9.8/10), en Puebla, México. Busco internships de SWE e IA para 2027.",
      en: "Computer Science Engineering student at BUAP (GPA 9.8/10), based in Puebla, Mexico. Seeking SWE / AI internships for 2027.",
    } as L,
    p2: {
      es: "2.º lugar en el UPAEP BI Hackathon y en FEPRO, 3.º en DigiEduHack y finalista de ICPC México. He puesto agentes de IA en producción para clientes de EE. UU. y sitios web para negocios en Australia.",
      en: "2nd place at the UPAEP BI Hackathon and FEPRO, 3rd at DigiEduHack, and ICPC Mexico finalist. I have shipped AI agents for US clients and websites for businesses in Australia.",
    } as L,
    cta: { es: "Contáctame", en: "Get in touch" } as L,
    ctaWorks: { es: "Proyectos", en: "Works" } as L,
    hintPre: { es: "Presiona", en: "Press" } as L,
    hintPost: { es: "para chatear con Nova", en: "to chat with Nova" } as L,
  },
  works: {
    title: { es: "Proyectos", en: "Works" } as L,
    subtitle: {
      es: "Casos de estudio, en orden de relevancia.",
      en: "Case studies, in order of relevance.",
    } as L,
    demo: { es: "Ver demo", en: "Live demo" } as L,
    code: { es: "Código", en: "Code" } as L,
    kindProject: { es: "Proyecto", en: "Project" } as L,
    kindClient: { es: "Cliente", en: "Client" } as L,
    close: { es: "Cerrar", en: "Close" } as L,
    stackLabel: { es: "Stack", en: "Stack" } as L,
    clientTitle: { es: "Trabajo con clientes", en: "Client work" } as L,
    clientSubtitle: {
      es: "Sitios en producción para negocios reales en Australia.",
      en: "Live websites for real businesses in Australia.",
    } as L,
    visit: { es: "Ver sitio", en: "Visit site" } as L,
    otherTitle: { es: "Otros proyectos", en: "Other projects" } as L,
  },
  about: {
    title: { es: "Experiencia", en: "Experience" } as L,
    awardsTitle: { es: "Premios", en: "Awards" } as L,
    skillsTitle: { es: "Skills", en: "Skills" } as L,
    educationTitle: { es: "Educación", en: "Education" } as L,
    gpa: { es: "Promedio", en: "GPA" } as L,
    graduation: { es: "Graduación", en: "Graduation" } as L,
    coursesTitle: { es: "Materias relevantes", en: "Relevant coursework" } as L,
    languagesTitle: { es: "Idiomas", en: "Languages" } as L,
  },
  contact: {
    title: { es: "Hablemos", en: "Let's talk" } as L,
    text: {
      es: "Disponible para internships 2027 y para relocalizarme.",
      en: "Available for 2027 internships and open to relocating.",
    } as L,
    email: { es: "Escríbeme", en: "Email me" } as L,
  },
  form: {
    title: { es: "Escríbeme", en: "Write to me" } as L,
    subtitle: {
      es: "Cuéntame en qué puedo ayudarte. Te respondo por correo.",
      en: "Tell me how I can help. I'll reply by email.",
    } as L,
    name: { es: "Tu nombre", en: "Your name" } as L,
    email: { es: "Tu correo", en: "Your email" } as L,
    message: { es: "Mensaje", en: "Message" } as L,
    send: { es: "Enviar mensaje", en: "Send message" } as L,
    sending: { es: "Enviando…", en: "Sending…" } as L,
    sentTitle: { es: "¡Mensaje enviado!", en: "Message sent!" } as L,
    sentText: { es: "Gracias por escribir. Te responderé pronto.", en: "Thanks for reaching out. I'll get back to you soon." } as L,
    error: {
      es: "No se pudo enviar. Intenta de nuevo o escribe directo a",
      en: "Couldn't send. Try again or write directly to",
    } as L,
    close: { es: "Cerrar", en: "Close" } as L,
  },
  gallery: {
    title: { es: "Galería", en: "Gallery" } as L,
    subtitle: {
      es: "Momentos de mentoría, docencia y competencia.",
      en: "Moments from mentoring, teaching and competing.",
    } as L,
    all: { es: "Todo", en: "All" } as L,
    prev: { es: "Anterior", en: "Previous" } as L,
    next: { es: "Siguiente", en: "Next" } as L,
    close: { es: "Cerrar", en: "Close" } as L,
    page: { es: "Página", en: "Page" } as L,
  },
  more: {
    title: { es: "Más proyectos", en: "More projects" } as L,
    subtitle: { es: "Repositorios públicos en GitHub.", en: "Public repositories on GitHub." } as L,
    viewAll: { es: "Ver todo en GitHub", en: "See all on GitHub" } as L,
  },
  case: {
    back: { es: "Volver", en: "Back" } as L,
    overview: { es: "Resumen", en: "Overview" } as L,
    challenge: { es: "Reto", en: "Challenge" } as L,
    features: { es: "Qué construí", en: "What I built" } as L,
    role: { es: "Qué hice yo", en: "What I did" } as L,
    roleTitle: { es: "Rol", en: "Role" } as L,
    outcome: { es: "Resultado", en: "Outcome" } as L,
    gallery: { es: "Reconocimiento", en: "Recognition" } as L,
    type: { es: "Tipo", en: "Type" } as L,
    stack: { es: "Stack", en: "Stack" } as L,
    year: { es: "Año", en: "Year" } as L,
    links: { es: "Enlaces", en: "Links" } as L,
    prev: { es: "Proyecto anterior", en: "Previous project" } as L,
    next: { es: "Siguiente proyecto", en: "Next project" } as L,
    all: { es: "Todos los proyectos", en: "All projects" } as L,
  },
  chat: {
    title: { es: "Nova", en: "Nova" } as L,
    subtitle: { es: "Pregúntame sobre Mike", en: "Ask me about Mike" } as L,
    bubble: { es: "¿Te ayudo?", en: "Can I help?" } as L,
    open: { es: "Abrir chat con Nova", en: "Open chat with Nova" } as L,
    close: { es: "Cerrar chat", en: "Close chat" } as L,
    home: { es: "Menú principal", en: "Main menu" } as L,
    pick: { es: "Elige una opción", en: "Pick an option" } as L,
  },
  footer: {
    rights: {
      es: "Hecho por Miguel Cruz",
      en: "Made by Miguel Cruz",
    } as L,
  },
};

export type Photo = { src: string; alt: L };

export type Work = {
  slug: string;
  title: string;
  kind: "project" | "client";
  year?: string;
  badge?: L;
  summary: L;
  stack?: string[];
  demo?: string;
  repo?: string;
  // Ruta bajo /public. Si el archivo no existe, la tarjeta muestra un degradado con el título.
  image?: string;
  imageAlt?: L;
  status?: L;
  // Fotos de reconocimiento del caso (premiación, diploma). Llevan tamaño para no mover el layout.
  photos?: (Photo & { width: number; height: number })[];
  // Secciones de la página del caso. Solo se muestran las que tienen contenido.
  challenge?: L;
  features?: L[];
  role?: L;
  roleTitle?: string;
  roleAreas?: L[];
  outcome?: L;
};

// Orden fijo: AgroCebada, PawAlert, TlamatIA, AquaBI y luego clientes (3 columnas x 2 filas).
export const works: Work[] = [
  {
    slug: "agrocebada",
    challenge: {
      es: "Predecir el rendimiento de cebada de 59 parcelas reservadas a partir de datos geoespaciales y satelitales (Rasterio, QGIS) y 28k registros históricos.",
      en: "Predict barley yield for 59 held-out plots from geospatial and satellite data (Rasterio, QGIS) and 28k historical records.",
    },
    features: [
      { es: "Modelos de ML con evaluación out-of-fold.", en: "ML models with out-of-fold evaluation." },
      { es: "App con visualización 3D en Streamlit.", en: "Streamlit app with a 3D visualization." },
    ],
    role: {
      es: "Responsable de la evaluación común de modelos (T03) en un equipo de 5.",
      en: "Owner of the shared model evaluation (T03) in a team of 5.",
    },
    outcome: { es: "En curso: resultados pendientes.", en: "In progress: results pending." },
    title: "AgroCebada",
    kind: "project",
    year: "2026",
    badge: { es: "Reto FIRA 2026 · en curso", en: "FIRA 2026 Challenge · in progress" },
    summary: {
      es: "Predicción de rendimiento de cebada para 59 parcelas reservadas, con datos geoespaciales y satelitales y 28k registros históricos. Modelos de ML con evaluación out-of-fold. Equipo de 5; soy responsable de la evaluación común de modelos (T03).",
      en: "Barley yield prediction for 59 held-out plots using geospatial and satellite data and 28k historical records. ML models with out-of-fold evaluation. Team of 5; I own the shared model evaluation (T03).",
    },
    stack: ["Python", "Rasterio", "QGIS", "Streamlit"],
    demo: "https://agrocebada-2026-production.up.railway.app/",
    image: "/images/projects/agrocebada.webp",
    imageAlt: {
      es: "App de AgroCebada con mapa 3D de parcelas y rendimiento estimado",
      en: "AgroCebada app with a 3D plot map and estimated yield",
    },
  },
  {
    slug: "pawalert",
    challenge: {
      es: "Reto de desarrollo de software con PolyWorks México, con mentorías semanales. La pregunta de partida: ¿qué pasa después de que alguien encuentra a un animal en riesgo y decide ayudar? Un reporte es solo el inicio: hay que considerar evidencia, ubicación, urgencia, disponibilidad, transporte, seguimiento, hogares temporales, adopciones y privacidad.",
      en: "Software development challenge with PolyWorks México, with weekly mentoring. The starting question: what happens after someone finds an animal at risk and decides to help? A report is only the beginning: evidence, location, urgency, availability, transport, follow-up, foster homes, adoptions and privacy all matter.",
    },
    features: [
      { es: "Reportes desde la app o desde un flujo conversacional por WhatsApp, con fotos y ubicación, que llegan al mismo sistema.", en: "Reports from the app or from a conversational WhatsApp flow, with photos and location, all landing in the same system." },
      { es: "Mapa de reportes y avistamientos.", en: "Map of reports and sightings." },
      { es: "Coordinación de voluntarios, asignaciones y rutas.", en: "Volunteer coordination, assignments and routes." },
      { es: "Seguimiento de rescates, eventos y procesos de adopción.", en: "Rescue tracking, events and adoption processes." },
      { es: "Validaciones asistidas por IA para analizar evidencia visual.", en: "AI-assisted validation to analyze visual evidence." },
      { es: "Gamificación, trust score y módulo de aliados.", en: "Gamification, trust score and an allies module." },
    ],
    roleTitle: "Full-stack Developer",
    roleAreas: [
      { es: "Backend", en: "Backend" },
      { es: "Frontend", en: "Frontend" },
      { es: "Base de datos", en: "Database" },
      { es: "Implementación de modelos de IA", en: "AI model implementation" },
    ],
    outcome: {
      es: "2.º lugar en FEPRO BUAP 2026, categoría empresa con PolyWorks México. 330 tests con 100% de aprobación. Aliados reales: Evolución Animal y URSVA.",
      en: "2nd place at FEPRO BUAP 2026, company category with PolyWorks México. 330 tests with a 100% pass rate. Real partners: Evolución Animal and URSVA.",
    },
    title: "PawAlert",
    kind: "project",
    year: "2025 – 2026",
    badge: { es: "🥈 2.º lugar FEPRO 2026", en: "🥈 2nd place FEPRO 2026" },
    summary: {
      es: "Plataforma de coordinación de rescate animal: el reporte llega desde la app o WhatsApp y se valida, prioriza y da seguimiento hasta el rescate o la adopción. Incluye mapa, voluntarios y rutas, y validación de evidencia con IA. 330 tests con 100% de aprobación.",
      en: "Animal-rescue coordination platform: a report arrives from the app or WhatsApp and is validated, prioritized and followed up through rescue or adoption. Includes a map, volunteers and routes, and AI evidence validation. 330 tests with a 100% pass rate.",
    },
    stack: ["TypeScript", "React Native", "Expo", "Python", "FastAPI", "Supabase", "PostgreSQL / PostGIS", "Gemini", "WhatsApp Cloud API", "OSRM", "VROOM", "Firebase", "Jest", "Pytest", "Playwright"],
    demo: "https://paw-alert-pwa.vercel.app/map",
    repo: "https://github.com/nova-cz/PawAlert",
    image: "/images/projects/pawalert.webp",
    imageAlt: {
      es: "Mapa de reportes activos de PawAlert en Puebla",
      en: "PawAlert map of active reports in Puebla",
    },
  },
  {
    slug: "tlamatia",
    challenge: {
      es: "Reto de DigiEduHack 2025 (noviembre de 2025): IA para maestros rurales multigrado.",
      en: "DigiEduHack 2025 challenge (November 2025): AI for rural multigrade teachers.",
    },
    features: [
      { es: "Planes de clase alineados a la SEP en menos de 30 s.", en: "SEP-aligned lesson plans in under 30 s." },
      { es: "Traducción a náhuatl.", en: "Nahuatl translation." },
      { es: "Modo 100% offline.", en: "100% offline mode." },
    ],
    roleTitle: "Full-stack Developer",
    roleAreas: [
      { es: "Backend", en: "Backend" },
      { es: "Frontend", en: "Frontend" },
      { es: "Base de datos", en: "Database" },
      { es: "Implementación de modelos de IA", en: "AI model implementation" },
    ],
    outcome: { es: "3.er lugar en DigiEduHack 2025.", en: "3rd place at DigiEduHack 2025." },
    title: "TlamatIA",
    kind: "project",
    year: "2025",
    badge: { es: "🥉 3.er lugar DigiEduHack 2025", en: "🥉 3rd place DigiEduHack 2025" },
    summary: {
      es: "IA para maestros rurales multigrado: planes de clase alineados a la SEP en menos de 30 s, traducción a náhuatl y modo 100% offline.",
      en: "AI for rural multigrade teachers: SEP-aligned lesson plans in under 30 s, Nahuatl translation and a 100% offline mode.",
    },
    stack: ["React", "TypeScript", "Tailwind", "Gemini"],
    demo: "https://tlamatia-plans-nuevo.vercel.app",
    image: "/images/tlamatia/landing.webp",
    imageAlt: { es: "Pantalla principal de TlamatIA", en: "TlamatIA landing screen" },
  },
  {
    slug: "aquabi",
    challenge: {
      es: "Reto real de Tekuno en el UPAEP Business Intelligence Hackathon 2026 (abril): mejorar la toma de decisiones de una operación de agua con datos. 24 horas y más de 184,000 registros históricos. Antes de graficar, había que entender la calidad de los datos.",
      en: "Real Tekuno challenge at the UPAEP Business Intelligence Hackathon 2026 (April): improve decision-making for a water utility operation through data. 24 hours and more than 184,000 historical records. Before charting anything, we had to understand the data's quality.",
    },
    features: [
      { es: "Auditoría de la base de datos original en Microsoft Access, limpieza y reorganización, y migración a una arquitectura en PostgreSQL.", en: "Audit of the original Microsoft Access database, cleaning and reorganization, and migration to a PostgreSQL-based architecture." },
      { es: "Análisis exploratorio (EDA), segmentación RFM, clustering con K-Means y pronóstico de series de tiempo con Meta Prophet.", en: "Exploratory data analysis (EDA), RFM segmentation, K-Means clustering and time-series forecasting with Meta Prophet." },
      { es: "Dashboard funcional con segmentos de clientes, riesgo de pago, tendencias financieras y un mapa de calor de morosidad por fraccionamiento para priorizar acciones.", en: "Functional dashboard with customer segments, payment risk, financial trends and a delinquency heatmap by neighbourhood to prioritize action." },
    ],
    roleTitle: "Full-stack Developer",
    roleAreas: [
      { es: "Backend", en: "Backend" },
      { es: "Frontend", en: "Frontend" },
      { es: "Base de datos", en: "Database" },
      { es: "Implementación de modelos de IA", en: "AI model implementation" },
    ],
    outcome: {
      es: "2.º lugar en el UPAEP BI Hackathon 2026 (abril), en un equipo de 4.",
      en: "2nd place at the UPAEP BI Hackathon 2026 (April), in a team of 4.",
    },
    title: "AquaBI",
    kind: "project",
    year: "2026",
    badge: { es: "🥈 2.º lugar UPAEP BI Hackathon 2026", en: "🥈 2nd place UPAEP BI Hackathon 2026" },
    summary: {
      es: "Solución de inteligencia de negocios para un organismo de agua, hecha en 24 horas con más de 184,000 registros históricos: de una base de datos en Access a un dashboard con segmentación, riesgo de pago, tendencias y pronósticos.",
      en: "Business intelligence solution for a water utility, built in 24 hours from more than 184,000 historical records: from an Access database to a dashboard with segmentation, payment risk, trends and forecasts.",
    },
    stack: ["Python", "Pandas", "scikit-learn", "Prophet", "Supabase / PostgreSQL", "Next.js", "Vercel", "Git & GitHub"],
    demo: "https://hackathon-agua-upaep.onrender.com",
    image: "/images/projects/aquabi.webp",
    imageAlt: {
      es: "Pantalla de Estrategia de Cobranza de AquaBI con el mapa de calor de morosidad y la segmentación de usuarios",
      en: "AquaBI Collections Strategy screen with the delinquency heatmap and user segmentation",
    },
    photos: [
      {
        src: "/images/aquabi/diploma.webp",
        width: 800,
        height: 1422,
        alt: {
          es: "Diploma de 2.º lugar en el Hackathon de Inteligencia de Negocios UPAEP 2026",
          en: "2nd place diploma from the UPAEP Business Intelligence Hackathon 2026",
        },
      },
      {
        src: "/images/aquabi/premiacion.webp",
        width: 1600,
        height: 1200,
        alt: {
          es: "Premiación del Hackathon de Inteligencia de Negocios UPAEP 2026",
          en: "Awards ceremony of the UPAEP Business Intelligence Hackathon 2026",
        },
      },
    ],
  },
  {
    slug: "be-browed",
    features: [
      { es: "Sitio en Shopify para una marca de cejas y belleza.", en: "Shopify site for a brow and beauty brand." },
      { es: "Incluye una sección de eventos.", en: "Includes an events section." },
    ],
    role: {
      es: "Lo construí yo. Trabajo el tema con código usando Shopify CLI.",
      en: "I built it. I work on the theme in code with the Shopify CLI.",
    },
    outcome: { es: "En vivo desde septiembre de 2026.", en: "Live since September 2026." },
    title: "Be Browed by Brooke",
    kind: "client",
    year: "2026",
    summary: {
      es: "Sitio en Shopify para una marca de cejas y belleza, con sección de eventos. Lo construí yo y está en vivo desde septiembre de 2026; trabajo el tema con código usando Shopify CLI.",
      en: "Shopify site for a brow and beauty brand, with an events section. I built it and it has been live since September 2026; I work on the theme in code with the Shopify CLI.",
    },
    stack: ["Shopify", "Shopify CLI"],
    demo: "https://bebrowedbybrooke.com/",
    image: "/images/projects/be-browed.webp",
    imageAlt: { es: "Página de inicio de Be Browed by Brooke", en: "Be Browed by Brooke home page" },
  },
  {
    slug: "icon-gallery",
    role: {
      es: "Todo el desarrollo del sitio e integración de las funciones de IA.",
      en: "All of the site development and the integration of the AI features.",
    },
    outcome: { es: "Proyecto terminado, sitio en vivo.", en: "Finished project, live site." },
    title: "Icon Gallery",
    kind: "client",
    summary: {
      es: "Sitio de un salón en Australia, terminado y en vivo. Hice todo el desarrollo e integré las funciones de IA.",
      en: "Website for a salon in Australia, finished and live. I did all the development and integrated the AI features.",
    },
    demo: "https://www.icongallery.com.au/",
    image: "/images/projects/icon-gallery.webp",
    imageAlt: { es: "Página de inicio de Icon Gallery", en: "Icon Gallery home page" },
  },
];

export const otherProjects = [
  { name: "AI Resume Analyzer", stack: "React, TypeScript, Anthropic API", href: "https://github.com/nova-cz/ai-resume-analyzer" },
  { name: "Lane Line Detection", stack: "Python, OpenCV, NumPy", href: "https://github.com/nova-cz/adaptive-lane-detection" },
  { name: "TrackMyBus", stack: "FEPRO 2024", href: "https://github.com/nova-cz/TrackMyBus" },
  { name: "SATelite", stack: "Talent Land 2025", href: "https://github.com/nova-cz/talent-hackathon-2025" },
  { name: "ExpenseTracker", stack: "Swift / SwiftUI", href: "https://github.com/nova-cz/ExpenseTracker" },
  // Sin repositorio público: enlaza al perfil.
  { name: "Doom en ESP32", stack: "Hardware", href: "https://github.com/nova-cz" },
];



export type Job = {
  company: string;
  role: L;
  place: L;
  period: L;
  bullets: L[];
  logo?: string;
  photos?: Photo[];
};

export const experience: Job[] = [
  {
    company: "Goalpost Group",
    role: same("Marketing Technology Manager"),
    place: { es: "East Lansing, MI (EE. UU.) · Remoto", en: "East Lansing, MI (USA) · Remote" } as L,
    period: { es: "nov 2025 – presente", en: "Nov 2025 – present" } as L,
    bullets: [
      {
        es: "Arquitectura de automatización de marketing y RevOps con GoHighLevel y Zapier.",
        en: "Marketing automation and RevOps architecture with GoHighLevel and Zapier.",
      },
      {
        es: "Diseño y despliegue de 8+ agentes de IA (voz y chat) para clientes de salud, energía, bienestar y consultoría industrial: knowledge base, agente de voz, agente de chat, widget e instalación en WordPress.",
        en: "Design and deployment of 8+ AI agents (voice and chat) for health, energy, wellness and industrial-consulting clients: knowledge base, voice agent, chat agent, widget and WordPress install.",
      },
      {
        es: "Automatización completa de un webinar y optimización de CRMs de clientes.",
        en: "End-to-end webinar automation and CRM optimization for clients.",
      },
    ] as L[],
    // TODO: ¿puedo nombrar clientes o los dejo anónimos? Por ahora van anónimos.
    logo: "/images/goalpost/logo.webp",
  },
  {
    company: "Growmo Tech",
    role: { es: "Web Developer Intern", en: "Web Developer Intern" } as L,
    place: { es: "Remoto", en: "Remote" } as L,
    period: { es: "sep – nov 2025", en: "Sep – Nov 2025" } as L,
    bullets: [
      {
        es: "Desarrollo web con Vue.js y Supabase; trabajo ágil con Slack y Linear.",
        en: "Web development with Vue.js and Supabase; agile workflow with Slack and Linear.",
      },
      {
        es: "Plataforma para aprender inglés especializada en desarrolladores y gente de computación.",
        en: "A platform for learning English, specialized for developers and computing professionals.",
      },
    ] as L[],
    logo: "/images/growmo/logo.webp",
  },
  {
    company: "FTC Robotics Team AZTROID · Fundación Azteca",
    photos: [
      {
        src: "/images/experience/aztroid-equipo.webp",
        alt: { es: "Equipo de robótica AZTROID con su robot en una competencia FTC", en: "AZTROID robotics team with their robot at an FTC competition" },
      },
      {
        src: "/images/experience/aztroid-modelado3d.webp",
        alt: { es: "Sesión de modelado 3D con estudiantes del equipo", en: "3D modeling session with team students" },
      },
    ] as Photo[],
    role: { es: "Mentor", en: "Mentor" } as L,
    place: { es: "Puebla", en: "Puebla" } as L,
    period: same("2022 – 2023"),
    bullets: [
      {
        es: "Modelado 3D (Onshape, SolidWorks), mecánica, electrónica y Java.",
        en: "3D modeling (Onshape, SolidWorks), mechanics, electronics and Java.",
      },
      {
        es: "Guié a 20+ estudiantes hasta la etapa estatal.",
        en: "Guided 20+ students to the state stage.",
      },
    ] as L[],
  },
  {
    company: "ICPC Competitive Programming Club · BUAP",
    photos: [
      {
        src: "/images/experience/icpc-code-rush.webp",
        alt: { es: "Grupo de participantes y organizadores en Code Rush 2025", en: "Group of participants and organizers at Code Rush 2025" },
      },
    ] as Photo[],
    role: { es: "Miembro del club", en: "Club member" } as L,
    place: { es: "Puebla", en: "Puebla" } as L,
    period: same(""),
    bullets: [
      {
        es: "Formé parte del club y apoyé en las fechas de ICPC.",
        en: "I was part of the club and helped out on ICPC event dates.",
      },
    ] as L[],
  },
  {
    company: "Legion Kids · SAFIRO",
    photos: [
      {
        src: "/images/experience/legionkids-clase.webp",
        alt: { es: "Clase de Legion Kids en un salón con niños y el instructor", en: "Legion Kids class with children and the instructor" },
      },
      {
        src: "/images/experience/legionkids-ninos.webp",
        alt: { es: "Niños trabajando en una clase de Legion Kids", en: "Children working in a Legion Kids class" },
      },
    ] as Photo[],
    role: { es: "Fundador e instructor", en: "Founder and instructor" } as L,
    place: { es: "Puebla", en: "Puebla" } as L,
    period: same(""),
    bullets: [
      {
        es: "Fundador de Legion Kids: 22 niños con rezago post-pandemia.",
        en: "Founder of Legion Kids: 22 children with post-pandemic learning gaps.",
      },
      {
        es: "Instructor de matemáticas en SAFIRO, Sierra Norte de Puebla: 30+ niños.",
        en: "Math instructor at SAFIRO, Sierra Norte de Puebla: 30+ children.",
      },
    ] as L[],
  },
  {
    company: "Camp Counselor · Sonlight Camp",
    photos: [
      {
        src: "/images/experience/camp-sonlight.webp",
        alt: { es: "Mike en el campamento de verano Sonlight, en Colorado", en: "Mike at Sonlight summer camp in Colorado" },
      },
    ] as Photo[],
    role: { es: "Consejero de campamento", en: "Camp Counselor" } as L,
    place: { es: "Pagosa Springs, Colorado (EE. UU.)", en: "Pagosa Springs, Colorado (USA)" } as L,
    period: { es: "veranos 2024 y 2025", en: "Summers 2024 and 2025" } as L,
    bullets: [
      { es: "Trabajo en inglés en el extranjero.", en: "Worked in English abroad." },
    ] as L[],
  },
];

export const education = {
  school: "BUAP",
  degree: {
    es: "Ingeniería en Ciencias de la Computación",
    en: "Computer Science Engineering",
  } as L,
  gpa: "9.8/10",
  graduation: { es: "Diciembre 2027", en: "December 2027" } as L,
  courses: {
    es: "Estructuras de datos, POO, Bases de datos avanzadas, Sistemas operativos, Ciberseguridad, Redes (CISCO), IA, IoT, Robótica, Álgebra lineal, Matemáticas discretas.",
    en: "Data Structures, OOP, Advanced Databases, Operating Systems, Cybersecurity, Networks (CISCO), AI, IoT, Robotics, Linear Algebra, Discrete Math.",
  } as L,
  languages: {
    es: "Español (nativo) · Inglés (C1) · Alemán (A1)",
    en: "Spanish (native) · English (C1) · German (A1)",
  } as L,
};

export const awards: { text: L; detail?: L; photos?: Photo[] }[] = [
  {
    text: { es: "🥈 2.º lugar · UPAEP Business Intelligence Hackathon 2026", en: "🥈 2nd place · UPAEP Business Intelligence Hackathon 2026" },
    detail: { es: "AquaBI · abril 2026", en: "AquaBI · April 2026" },
  },
  {
    text: { es: "🥈 2.º lugar · FEPRO BUAP 2026", en: "🥈 2nd place · FEPRO BUAP 2026" },
    detail: { es: "PawAlert · FEPRO BUAP 2026, categoría empresa", en: "PawAlert · FEPRO BUAP 2026, company category" },
  },
  {
    text: { es: "🥉 3.er lugar · DigiEduHack 2025", en: "🥉 3rd place · DigiEduHack 2025" },
    detail: { es: "TlamatIA · noviembre 2025", en: "TlamatIA · November 2025" },
  },
  {
    text: { es: "ICPC Mexico Finalist", en: "ICPC Mexico Finalist" },
    detail: {
      es: "Final nacional 2025 (ITESO, Guadalajara, 7–8 nov), representando a BUAP",
      en: "2025 national finals (ITESO, Guadalajara, Nov 7–8), representing BUAP",
    },
  },
  {
    text: { es: "FEPRO 2024 · 2.º lugar en programación competitiva y 4.º en aplicaciones", en: "FEPRO 2024 · 2nd in competitive programming and 4th in applications" },
    detail: { es: "TrackMyBus", en: "TrackMyBus" },
  },
  {
    text: { es: "Talent Land Hackathon 2025 · 7.º lugar, track Capital One", en: "Talent Land Hackathon 2025 · 7th place, Capital One track" },
    detail: { es: "SATelite", en: "SATelite" },
  },
  {
    text: { es: "FIRST Tech Challenge · Control Award", en: "FIRST Tech Challenge · Control Award" },
    detail: { es: "2019–2022", en: "2019–2022" },
  },
];

export const skills: { group: L; items: string[] }[] = [
  { group: { es: "Lenguajes", en: "Languages" }, items: ["Python", "TypeScript / JavaScript", "C / C++", "Java", "Swift"] },
  {
    group: { es: "Web y móvil", en: "Web and mobile" },
    items: ["React", "Next.js", "React Native / Expo", "Vue", "Node / Express", "FastAPI", "Django REST"],
  },
  {
    group: { es: "Datos e IA", en: "Data and AI" },
    items: ["LLM APIs (Claude, Gemini)", "Agentes de IA / AI agents", "OpenCV", "ML con Python", "Streamlit", "QGIS / Rasterio"],
  },
  {
    group: { es: "Infraestructura", en: "Infrastructure" },
    items: ["Supabase", "PostgreSQL", "MongoDB", "Firebase", "Docker", "Vercel", "Railway", "Git"],
  },
  { group: { es: "Automatización", en: "Automation" }, items: ["GoHighLevel", "Zapier"] },
];

export type GalleryCategory = "robotics" | "kids" | "icpc";

export const galleryCategories: { id: GalleryCategory; label: L }[] = [
  { id: "robotics", label: { es: "Robótica", en: "Robotics" } },
  { id: "kids", label: { es: "Legion Kids", en: "Legion Kids" } },
  { id: "icpc", label: { es: "ICPC", en: "ICPC" } },
];

export const gallery: { src: string; category: GalleryCategory; alt: L; caption: L }[] = [
  {
    src: "/images/experience/aztroid-equipo.webp",
    category: "robotics",
    alt: { es: "Equipo de robótica AZTROID con su robot en una competencia FTC", en: "AZTROID robotics team with their robot at an FTC competition" },
    caption: { es: "Equipo AZTROID en una competencia FTC", en: "AZTROID team at an FTC competition" },
  },
  {
    src: "/images/experience/aztroid-grupo.webp",
    category: "robotics",
    alt: { es: "Integrantes del equipo AZTROID posando en el evento", en: "AZTROID team members posing at the event" },
    caption: { es: "El equipo en el evento", en: "The team at the event" },
  },
  {
    src: "/images/experience/aztroid-modelado3d.webp",
    category: "robotics",
    alt: { es: "Sesión de modelado 3D con estudiantes del equipo", en: "3D modeling session with team students" },
    caption: { es: "Sesión de modelado 3D", en: "3D modeling session" },
  },
  {
    src: "/images/experience/aztroid-computo.webp",
    category: "robotics",
    alt: { es: "Estudiantes trabajando en computadoras en el laboratorio", en: "Students working on computers in the lab" },
    caption: { es: "Trabajo en el laboratorio", en: "Lab work" },
  },
  {
    src: "/images/experience/aztroid-diseno.webp",
    category: "robotics",
    alt: { es: "Pantalla con una pieza en 3D durante una clase de modelado", en: "Screen showing a 3D part during a modeling class" },
    caption: { es: "Piezas en 3D con el equipo", en: "3D parts with the team" },
  },
  {
    src: "/images/experience/legionkids-clase.webp",
    category: "kids",
    alt: { es: "Clase de Legion Kids en un salón con niños y el instructor", en: "Legion Kids class with children and the instructor" },
    caption: { es: "Clase de Legion Kids", en: "A Legion Kids class" },
  },
  {
    src: "/images/experience/legionkids-ninos.webp",
    category: "kids",
    alt: { es: "Niños trabajando en una clase de Legion Kids", en: "Children working in a Legion Kids class" },
    caption: { es: "Trabajo en equipo en clase", en: "Teamwork in class" },
  },
  {
    src: "/images/experience/legionkids-mesa.webp",
    category: "kids",
    alt: { es: "Actividad en mesa de trabajo durante una clase", en: "Table activity during a class" },
    caption: { es: "Actividad en la mesa de trabajo", en: "Work-table activity" },
  },
  {
    src: "/images/experience/legionkids-taller.webp",
    category: "kids",
    alt: { es: "Taller con materiales y proyector", en: "Workshop with materials and a projector" },
    caption: { es: "Taller con materiales", en: "Hands-on workshop" },
  },
  {
    src: "/images/icpc-2025/equipo-selfie.webp",
    category: "icpc",
    alt: { es: "Selfie del equipo de la BUAP en la final de ICPC México", en: "BUAP team selfie at the ICPC Mexico finals" },
    caption: { es: "Equipo BUAP en la final", en: "BUAP team at the finals" },
  },
  {
    src: "/images/icpc-2025/delegacion-iteso.webp",
    category: "icpc",
    alt: { es: "Delegación en la sede del ITESO, Guadalajara", en: "Delegation at the ITESO venue, Guadalajara" },
    caption: { es: "Delegación en el ITESO", en: "Delegation at ITESO" },
  },
  {
    src: "/images/icpc-2025/certificado.webp",
    category: "icpc",
    alt: { es: "Certificado oficial de la final de ICPC México 2025", en: "Official certificate from the ICPC Mexico 2025 finals" },
    caption: { es: "Certificado oficial", en: "Official certificate" },
  },
];
