// Conocimiento extra para el chat de la estrella: GitHub (solo repositorios públicos) y CV.
// Está curado a mano a partir de los README públicos y del CV. NO incluye teléfono, domicilio ni repos privados.
// Revisado: 2026-10-23. Si cambian el CV o GitHub, pídele a Claude que lo actualice.

export const githubKnowledge = `
GITHUB (github.com/nova-cz) — only PUBLIC repositories. Do not mention or guess anything about private repositories.
- 77 public repositories of his own (not forks). Main languages by repo count: TypeScript 20, Python 11, JavaScript 10, Java 8, CSS 7, HTML 5, C 2, Dart 2.
- Many are university coursework or practice projects (Java OOP exercises, JavaScript/CSS exercises, DEVF bootcamp exercises). Be honest about that if asked; the portfolio's featured case studies are the strongest work.
- Notable public repositories (details come from their READMEs):
  • PawAlert (github.com/nova-cz/PawAlert): rescue platform for stray animals in Puebla. Citizens report animals with geolocation, photo and description; animal-protection associations receive and coordinate the alerts. The repo is split into a Flutter mobile app (iOS/Android) and a REST backend (FastAPI + Supabase).
  • adaptive-lane-detection: real-time road lane-line detection from video with image processing in Python (OpenCV, NumPy). Interactive parameter tuning, morphological operations (erosion, dilation, opening, closing), gamma correction, histogram equalization and contrast adjustment.
  • TrackMyBus: mobile app (Dart/Flutter, Google Maps API) that tracks university buses in real time and shows arrival estimates. FEPRO 2024 project.
  • ExpenseTracker: personal-finance iOS app in Swift/SwiftUI, built for FEPRO 2024. Custom categories, interactive charts, searchable history with filters, multi-currency support and iCloud backup.
  • talent-hackathon-2025: "Inteligencia Fiscal Aumentada", a cloud-native (AWS) platform for Mexican SMEs and accountants that combines SAT tax-compliance automation, AI financial-health diagnosis and ML fraud detection. Team "AWSome Team", April 2025. This is the likely Talent Land 2025 hackathon project "SATelite".
  • IDA: IDA* solver for the N-Puzzle (3x3 up to 8x8) in Python, coursework (tabu criterion to avoid cycles).
  • Pacman-Mejorado-PAB: Pacman whose ghosts use Alpha-Beta pruning (Python), project for an Artificial Intelligence course.
  • SimulacionSemaforo: interactive simulation of a traffic-light finite-state machine (FSM diagram, digital circuit, waveforms, state table) for a Digital Design course; TypeScript, deployed on Vercel.
  • M-M-ARENA: competitive fitness app for couples (arenas, workout logs with photo proof, real-time points, streaks); React + TypeScript + Vite, Supabase (Auth, Postgres, Realtime, Storage), Tailwind, shadcn/ui, Motion; deployed on Vercel.
  • claude-skills: his personal Claude Code marketplace of skills that coordinate community skills for web design, backend engineering and security (Shell).
  • ai-resume-analyzer and YCDirectory: tutorial-based practice projects (AI resume analyzer with the Anthropic API and Puter.js; a Next.js startup directory with Sanity and MongoDB). Present them as practice projects, not as flagship work.
  • Other public repos with little documentation (name/language only, do not invent details): Sistema-de-Archivos-Distribuido- (a fault-tolerant distributed file system, Python), SistemaDeMonitoreo (Python), Procesamiento-digital-de-Imagenes (Python), Yolo-and-Teachable-Machine (Python), Sistema-Escolar front/back (TypeScript + Python).
  • Small deployed web projects: DoggisArt, Barberia, Valentine-s-Day, Doña Chucherías, Tasks-App (TypeScript, Vercel).
`.trim();

export const cvKnowledge = `
CV (an earlier 2025 version; it PREDATES Goalpost, Growmo, AgroCebada, PawAlert, TlamatIA and AquaBI, so the portfolio data is more current and wins on any conflict):
- Education: BUAP, Computer Science Engineering, cumulative GPA 3.9/4.0 (the portfolio shows it as 9.8/10). Relevant coursework includes Data Structures, OOP, Advanced Databases, Operating Systems, Cybersecurity, Web Applications, Networking (CISCO), Robotics, IoT, AI, Linear Algebra and Discrete Math.
- ICPC / Competitive Programming Club at BUAP: active member since May 2024 in the International Collegiate Programming Contest. He was a MEMBER and helped out on ICPC event dates; he did NOT teach or mentor there. Never say he mentored or taught at ICPC.
- FTC robotics team AZTROID (FIRST Tech Challenge): mentor. He taught students 3D modeling (Onshape, SolidWorks), mechanics, electronics and programming (block-based languages and Java), guiding a team to the state level. (The CV lists June 2022 – December 2024; the exact dates are unconfirmed.)
- Legion Kids: he founded and led it to support children with post-pandemic learning gaps; he taught math and basic English to 22 children aged 9 to 11 (CV lists April 2024).
- Projects listed on the CV with dates: Resume Analyzer (Aug 2025; React, TypeScript, Tailwind, Anthropic API and Puter.js), YC Directory (Jul 2025; Next.js, TypeScript, shadcn/ui, Sanity.io, MongoDB), Lane Line Detection (Oct 2025; Python, OpenCV, NumPy), ExpenseTracker (Mar 2025; Swift, SwiftUI, iCloud backup), TrackMyBus (Mar 2024; Dart, Google Maps APIs).
- Awards on the CV: FEPRO 2024 (TrackMyBus, 4th in advanced software applications; also 2nd place in the programming tournament), Talent Land Hackathon Apr 2025 (Capital One track, 7th place, project SATelite), FIRST Tech Challenge 2019–2022 (qualified to the National Robotics Competition in Torreón, ranked 6th of 30; Control Award).
- Skills by level (CV): Proficient — HTML, CSS3, C/C++, Python, JavaScript, TypeScript, React, Next.js, Django REST, Node.js. Intermediate — Git, FastAPI, Angular, Java, Express.js, Firebase, PostgreSQL, Swift, Figma, Tailwind CSS, Bootstrap, Supabase. Familiar — Docker, PHP, OpenCV, Appwrite, Sentry.
- Languages: Spanish (native), English (C1), German (A1).
`.trim();
