# ivankalkaev.com: animaciones y técnica

Inspeccionado el 2026-10-22 con Claude in Chrome (solo la home; faltan /works, /works/pokerdao, hover de la navbar, chat de Blue y toggle claro/oscuro).

## Stack
- **Framer** (generator: Framer 7788242), no GSAP, Lenis ni Three.js. Las animaciones de la home son **CSS puro** más 3 `<canvas>` con OffscreenCanvas (render en worker; no se puede leer su contexto desde la consola).
- Implicación para nosotros: en Next.js se replica con CSS keyframes, Motion y GSAP; no hay código que reutilizar.

## Efectos medidos
| Efecto | Técnica | Valores |
|---|---|---|
| Objetos 3D flotando en el hero | `@keyframes hero-object-float` sobre `div.hero-object-float` | 6600 ms, `linear`, loop; cada objeto con `animation-delay` negativo distinto (0, -1300, -2400, -3600, -4200 ms) para desfasarlos |
| Movimiento del keyframe | `translate3d` + `rotate` controlados por variables CSS (`--hero-float-x`, `--hero-float-y-positive/negative`, `--hero-float-rotate-positive/negative`) | 0 % y 100 %: origen; 25 %: (x, -y) y rotación +; 50 %: (0, +y) y 0°; 75 %: (-x, 0) y rotación - |
| Brillo metálico del logo Apple | `@keyframes apple-metal-shift` sobre `span.apple-metal-mark` | 8000 ms, `linear`; mueve `background-position` de 0 % 50 % a 100 % 50 % y vuelve |
| Icono de mail | `@keyframes mail-metal` sobre un `path` SVG | 1800 ms, `linear`; `translateX` de -5 px a 5 px |
| Estrellas doradas | `span.ik-gold-stars` (animación CSS, no se midió) | pendiente |
| Fondo de estrellas | canvas (OffscreenCanvas) | pendiente de grabar en GIF |

## Tipografía y color (medido)
- Fondo `#0a0a0a`, texto `#fff`. Navbar `#262626`.
- Titulares: **Geist** 24 px / 400, `letter-spacing -0.72px` (-0.03em). Botones: Geist 22 px.
- Cuerpo: **Tiempos Text Regular** (serif comercial, de pago) 16 px, `letter-spacing -0.48px` (-0.03em), en gris claro. Alternativa libre: Newsreader o Source Serif 4.

## Composición del hero (observado)
- Todo centrado en una columna estrecha (≈300 px de texto): navbar → foto circular → "I'm / Ivan Kalkaev" → barra flotante (Copy · Open CV · Ask Blue) → subtítulo → 2 párrafos → 2 botones → atajo de teclado.
- El nombre aparece **seleccionado** (resaltado azul de selección del sistema) con una mini barra de acciones debajo: es un guiño de interfaz, no un error.
- Estrella fugaz: una línea diagonal fina cruza el fondo de vez en cuando.
- Atajo para chatear: "Press ⌘ ⌥ + / to chat with Blue".

## Navbar (medido)
- Píldora `#262626`, `border-radius 999px`, 293 × 40 px, a 20 px del borde superior, centrada. Ítems: Home · Works · About · Email Me.
- Ítem activo: píldora blanca con texto oscuro. Ítems: Geist 14 px / 500, `padding 6px 14px`.
- Interacción: `transition: scale 0.15s ease-out` (se encoge al pulsar/hover).

## Botones
- Radio 1000 px; solo transiciona `scale 0.15s ease-out`. El brillo de vidrio no está en el botón sino en capas internas (pendiente de extraer).
- "Get in touch": vidrio oscuro con reflejo superior y sombra inferior.
- "Works": degradado morado/magenta, reflejo superior blanco y glow magenta que crece en hover.

## Toggle claro/oscuro (observado)
- Es una **lámpara de cordón**: hilo vertical fino desde el borde superior derecho con un botón circular (luna) colgando. Al tirar del cordón cambia el tema.

## Mascota Blue (observado)
- Burbuja de chat azul brillante con dos ojos ovalados blancos, abajo a la derecha, fija. Abre el chat con IA.

## Pendiente
- Capas internas del brillo de los botones y animación de las estrellas del fondo.
- Hover/animación de la navbar, el toggle al tirar del cordón y el chat de Blue abierto.
- Transición entre páginas y /works, /works/pokerdao (formato de caso de estudio).
- GIFs de hover y scroll.
