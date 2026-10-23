# Portafolio v2 de Miguel Cruz: contexto y forma de trabajo

> Este archivo vive en la raíz del repo como `CLAUDE.md`. Claude Code lo lee automáticamente en cada sesión.

---

## Objetivo

Rehacer mi portafolio (https://miguelangelcruzreyes.vercel.app, repo `nova-cz/miguelangelcruzreyes`) para aplicar a internships 2027 de Software Engineering e IA. Busco en México (CDMX, GDL, MTY), EE. UU., Australia o cualquier país que acepte extranjeros.

Un recruiter debe entender en 10 segundos quién soy, qué construyo, qué he ganado y cómo contactarme o descargar mi CV.

El sitio es bilingüe (español e inglés), carga rápido y se lee bien en celular. Debe verse mío y no de plantilla: el sitio actual es una plantilla 3D genérica con testimonios inventados, y eso se elimina.

### Idiomas (requisito)
- **Detección automática:** al entrar por primera vez, usa `navigator.language`. Si empieza con `es`, carga en español; en cualquier otro caso, en inglés.
- **Botón ES / EN** visible en el navbar (también en móvil). Al cambiar, se guarda la elección en `localStorage` (con try/catch) y se respeta en visitas futuras por encima de la detección.
- **URLs por idioma:** `/es/...` y `/en/...`. Así puedo mandar a un recruiter el link directo en su idioma, y cada versión tiene su propio `<html lang>`, título y descripción.
- **Todo el texto** vive en el archivo de contenido con las dos versiones (`{ es: "...", en: "..." }`). Ningún texto queda escrito directo en los componentes. Nombres propios, stacks y links no se traducen.
- **El botón de CV** descarga el CV del idioma activo: `Miguel_Cruz_CV_ES.pdf` o `Miguel_Cruz_CV_EN.pdf`.
- **Traducción:** yo escribo o reviso la versión en español. Las dos deben sonar naturales, no traducidas palabra por palabra.

## Reglas

1. Trabaja en la rama `v2`. Antes de borrar nada, crea el tag `v1` en `main`. Vercel genera una URL de preview para cada rama. Cuando yo apruebe, se hace merge a `main` y se conserva la misma URL.
2. No inventes nada: ni métricas, ni testimonios, ni fechas, ni puestos. Si falta un dato, escribe `TODO:` y pregúntame.
3. Todo el contenido vive en un solo archivo de datos (`src/content/site.ts` o `.json`). Los componentes solo leen de ahí. No uses base de datos.
4. Las imágenes van en `public/images/<proyecto>/`, en WebP, con un máximo de 1600 px de ancho y unos 300 KB cada una. Nada de HEIC. Los videos van comprimidos (menos de 5 MB) o como embed de YouTube.

---

## Fase 1: contenido (sin diseño)

Arma `src/content/site.ts` con todo lo de abajo y devuélveme dos cosas:
- la lista de `TODO:` pendientes;
- las inconsistencias que encuentres.

No avances a la Fase 2 sin mi OK.

### Datos personales
- Miguel Angel Cruz Reyes ("Mike"), Puebla, México. Disponible para relocalizarme.
- cruzmiguelangel858@gmail.com · github.com/nova-cz · linkedin.com/in/miguelcr4
- Idiomas: español (nativo), inglés (C1), alemán (A1).

### Educación
- BUAP, Computer Science Engineering. GPA 9.8/10.
- Graduación: TODO. El CV dice "Summer 2027", pero termino materias en junio de 2027 y me gradúo en otoño de 2027.
- Materias relevantes: Data Structures, OOP, Advanced Databases, Operating Systems, Cybersecurity, Networks (CISCO), AI, IoT, Robotics, Linear Algebra, Discrete Math.

### Experiencia
1. **Goalpost Group**, empresa de EE. UU. (East Lansing, MI). Remoto. Nov 2025 – presente.
   - Puesto: TODO. En LinkedIn y en el CV dice "Marketing Technology Manager". Elige uno y úsalo igual en todos lados.
   - Arquitectura de automatización de marketing y RevOps con GoHighLevel y Zapier.
   - Diseño y despliegue de 8+ agentes de IA (voz y chat) para clientes de salud, energía, bienestar y consultoría industrial. Cada agente lleva knowledge base (web crawler + rich text), agente de voz, agente de chat, widget e instalación en WordPress.
   - Automatización completa de un webinar y optimización de CRMs de clientes.
   - TODO: ¿puedo nombrar clientes o lo dejo anónimo?
2. **Growmo Tech**, Web Developer Intern, remoto.
   - Fechas: TODO. El CV dice May–Aug 2025; LinkedIn dice Sep–Nov 2025.
   - Vue.js + Supabase; Slack y Linear para trabajo ágil.
   - Descripción: TODO. El CV dice "plataforma para mejorar el inglés técnico y la empleabilidad de devs LATAM"; LinkedIn dice "fintech platform".
3. **Camp Counselor**, Sonlight Camp, Pagosa Springs, Colorado, EE. UU. Veranos 2024 y 2025. Trabajo en inglés en el extranjero.
4. **Mentor, FTC Robotics Team AZTROID** (Fundación Azteca).
   - Modelado 3D (Onshape, SolidWorks), mecánica, electrónica y Java.
   - Guié a 20+ estudiantes hasta la etapa estatal.
   - Fechas: TODO. El CV dice Jun 2022 – Dic 2024; LinkedIn dice Ene 2023 – Ene 2024.
5. **ICPC Competitive Programming Club, BUAP.** Miembro del club; apoyé en las fechas de ICPC. No di clases ni fui mentor (corregido por Miguel).
6. **Voluntariado.**
   - Fundador de Legion Kids: 22 niños con rezago post-pandemia.
   - Instructor de matemáticas en SAFIRO, Sierra Norte de Puebla: 30+ niños.

### Proyectos destacados (formato caso de estudio)
Cada uno lleva: problema, qué hice yo, stack, resultado, demo, repo y fotos.
Orden fijo: 1. AgroCebada, 2. PawAlert, 3. TlamatIA. Después van AquaBI y los agentes de IA.

1. **AgroCebada, Reto FIRA 2026.** Equipo de 5.
   - Predicción de rendimiento de cebada para 59 parcelas reservadas.
   - Datos geoespaciales y satelitales (Rasterio, QGIS) y 28k registros históricos.
   - Modelos de ML con evaluación out-of-fold.
   - App con visualización 3D en Streamlit: https://agrocebada-2026-production.up.railway.app/
   - Mi rol: responsable de la evaluación común de modelos (T03).
   - Estado: en curso, resultados pendientes. No pongas premio.
2. **PawAlert.** 🥈 2º lugar en FEPRO (año: TODO).
   - Plataforma de coordinación de rescate animal: mapa de reportes, gamificación, trust score y módulo de aliados.
   - React Native + Expo + Supabase. 330 tests con 100% de aprobación.
   - Asociaciones aliadas reales: Evolución Animal y URSVA.
   - Repo: github.com/nova-cz/PawAlert
3. **TlamatIA.** 🥉 3er lugar en DigiEduHack 2025.
   - IA para maestros rurales multigrado: planes de clase alineados a la SEP en menos de 30 s, traducción a náhuatl y modo 100% offline.
   - React, TypeScript, Tailwind y Gemini.
   - Demo: https://tlamatia-plans-nuevo.vercel.app
   - El repo es privado (danielalira20). TODO: hacerlo público o quitar el botón "Code".
4. **AquaBI.** 🥈 2º lugar en el UPAEP Business Intelligence Hackathon 2026 (abril).
   - Sistema directivo para un organismo de agua: salud financiera, eficiencia operativa, estrategia de cobranza con mapa de calor de morosidad por fraccionamiento, segmentación de usuarios y predicciones.
   - Stack y mi rol: TODO.
   - Repo privado (danielalira20/hackathon-agua-upaep).
5. **Agentes de IA en producción (Goalpost).** Caso de estudio anonimizado del patrón de construcción de agentes de voz y chat.

### Trabajo freelance con clientes (sección propia: "Client work")
Sitios en producción para negocios reales en Australia. Cada uno lleva link al sitio, captura y una línea de qué hice.
- **Be Browed by Brooke**: https://bebrowedbybrooke.com/
  - Sitio en Shopify para una marca de cejas y belleza.
  - Lo construí yo; está en vivo desde septiembre de 2026.
  - Incluye una sección de eventos.
  - Trabajo el tema con código usando Shopify CLI.
- **Icon Gallery**: https://www.icongallery.com.au/
  - Sitio de un salón en Australia.
  - Auditoría técnica y rediseño o mejoras (proyecto de unas 2 semanas).
  - Estado: TODO, en curso o terminado. Si sigue en curso, márcalo así.

Otros proyectos (sección secundaria, tarjetas pequeñas):
- Lane Line Detection: Python, OpenCV, NumPy.
- TrackMyBus: FEPRO 2024.
- SATelite: Talent Land 2025.
- ExpenseTracker: Swift/SwiftUI.
- Doom en ESP32: hardware, en curso.

Quitar, o mover a "Other": YC Directory y AI Resume Analyzer, porque son de tutorial.

### Premios
- 🥈 2º lugar, UPAEP Business Intelligence Hackathon 2026 (AquaBI), abril 2026.
- 🥈 2º lugar, FEPRO (PawAlert). Año: TODO.
- 🥉 3er lugar, DigiEduHack 2025 (TlamatIA), noviembre 2025.
- ICPC Mexico Finals 2025 (ITESO, Guadalajara, 7–8 nov): clasifiqué a la final nacional representando a BUAP. Equipo: Miguel Angel Cruz Reyes, Osmar Javier Hernández Prado y Emmitt Bryan Mendez Atlatenco; coach Pedro Bello López.
  - El certificado oficial dice 116º lugar. Muestra "ICPC Mexico Finalist" y el certificado; no pongas otro número.
- FEPRO 2024: 2º lugar en programación competitiva y 4º lugar en aplicaciones (TrackMyBus).
- Talent Land Hackathon 2025: 7º lugar en el track de Capital One (SATelite).
- FIRST Tech Challenge: Control Award (2019–2022).
- Próximo: NASA Space Apps Challenge 2026 (14–15 nov). Se agrega cuando pase.

### Skills (agrupadas, sin barras de porcentaje)
- Lenguajes: Python, TypeScript/JavaScript, C/C++, Java, Swift.
- Web y móvil: React, Next.js, React Native/Expo, Vue, Node/Express, FastAPI, Django REST.
- Datos e IA: LLM APIs (Claude, Gemini), agentes de IA, OpenCV, ML con Python, Streamlit, QGIS/Rasterio.
- Infraestructura: Supabase, PostgreSQL, MongoDB, Firebase, Docker, Vercel, Railway, Git.
- Automatización: GoHighLevel, Zapier.

### Fotos disponibles
- En el repo actual: `public/images/aztroid`, `legionkids`, `experiencia`, `Tlamantla.png`.
- Ya listas en WebP (del zip `fotos_portafolio.zip`, se copian a `public/images/`):
  - `goalpost/logo.webp`
  - `growmo/logo.webp`
  - `icpc-2025/certificado.webp`, `icpc-2025/equipo-selfie.webp` y `icpc-2025/delegacion-iteso.webp`
  - `tlamatia/landing.webp`
- Por subir (yo las mando):
  - Goalpost Group: capturas de agentes o workflows, sin datos de clientes.
  - Capturas de Be Browed e Icon Gallery.
  - Premiación UPAEP (AquaBI), FEPRO (PawAlert) y DigiEduHack (TlamatIA).
  - Capturas de AquaBI, PawAlert, AgroCebada y TlamatIA.
  - Campamento en Colorado y foto de perfil.
- Cada foto lleva texto alternativo (`alt`) en los dos idiomas.

---

## Fase 2: diseño (solo después de aprobar la Fase 1)

### Dirección visual
Moderno, formal y de mucha calidad. La calidad se nota en el detalle de las animaciones y de las transiciones de texto, no en la cantidad de efectos.

Referencias (las capturas van en `docs/inspo/`):
- **ivankalkaev.com:** la referencia principal.
  - Fondo oscuro tipo espacio con estrellas; sobre él, objetos 3D brillantes flotando.
  - Navbar en forma de píldora y foto circular.
  - Botones con brillo: "Get in touch" y "Works".
  - Toggle de modo claro/oscuro.
  - Asistente de chat con mascota ("Blue").
- **ivankalkaev.com/works/pokerdao:** formato de caso de estudio.
  - Sub-navegación fija: Overview, Challenge, Approach, Research, Solution, Outcome.
  - Bloque de metadatos: rol, stack, año y equipo.
  - Galerías con pie de foto y navegación al proyecto anterior y siguiente.
- **dennissnellenberg.com:** solo se toma el preloader. El resto de ese sitio queda descartado.
  - Pantalla inicial con un saludo ("• Hello") antes de mostrar la home. En mi sitio: "Hola, soy Mike", en el idioma activo.
  - Notas en `docs/inspo/dennissnellenberg-animaciones.md`, solo como archivo.
- **juanmora.co:** misma familia que Ivan.
  - GSAP + Lenis (smooth scroll), formas decorativas y CTA final grande.
- **Tablero de Pinterest:** https://mx.pinterest.com/nglmike/inspowebsites/ (capturas en `docs/inspo/`).

### Mi mascota: una estrella ⭐
- Personaje 3D de estrella, mi equivalente a "Blue". Aparece en el hero y abre un chat.
- **El chat:** responde preguntas sobre mí usando SOLO `src/content/site.ts`, en el idioma activo.
  - Preguntas sugeridas, por ejemplo: "¿Qué proyecto de IA ha hecho?" y "¿Está disponible para internship?".
  - Las respuestas no inventan nada; si algo no está en el contenido, lo dice.
  - Tiene límite de mensajes por visitante y la API key va en el servidor, nunca en el navegador.
- Esto demuestra lo que hago (agentes de IA), así que es una pieza central y no un adorno. Se construye después de que el sitio base funcione.

### Stack
- **Next.js (App Router) + TypeScript + Tailwind.** Se cambia de Vite a Next.js por tres razones:
  - metadatos por idioma y por proyecto (previews en LinkedIn y WhatsApp);
  - rutas `/es` y `/en`;
  - una API route para el chat de la estrella.
- **Animación:** GSAP (ScrollTrigger y SplitText, ahora gratis), Lenis para el smooth scroll y Motion para microinteracciones.
- **3D:** la estrella y los objetos se exportan de Spline o Blender a imagen o video ligero. Three.js solo si el 3D interactivo de verdad vale la pena.
- **Accesibilidad:** respetar `prefers-reduced-motion` y que todo funcione con teclado.
- **Estructura:**
  1. Hero: nombre, una línea clara (p. ej. "CS student building AI agents and full-stack products") y "Seeking SWE / AI internships 2027". Botones de CV, GitHub, LinkedIn y Email.
  2. Franja de logros: 2nd UPAEP · 2nd FEPRO · 3rd DigiEduHack · ICPC Mexico Finalist.
  3. Proyectos destacados con página propia por caso (`/projects/<slug>`).
  4. Experiencia (Goalpost primero).
  5. Premios con foto.
  6. About corto con foto.
  7. Contacto.
- **CV:** dos PDF actualizados en `public/` con nombre fijo y sin año: `Miguel_Cruz_CV_EN.pdf` y `Miguel_Cruz_CV_ES.pdf`.
- **Meta tags:** título, descripción e imagen Open Graph por idioma, para que el link se vea bien en LinkedIn y WhatsApp.
- **Analítica:** activa Vercel Web Analytics, que es gratis y no pide banner de cookies. Así sé si alguien abre mi portafolio después de que aplico.
- **Calidad:** Lighthouse ≥ 90 en Performance y Accessibility. Sin scroll horizontal en móvil.
- **Antes de construir:** muéstrame 2–3 direcciones visuales (paleta, tipografía, hero) y yo elijo una.
