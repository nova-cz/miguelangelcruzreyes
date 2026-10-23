# dennissnellenberg.com: animaciones, transiciones y presentación de proyectos

Inspeccionado el 2026-10-22 con Claude in Chrome (home, lista de proyectos, footer y una página de caso: /work/twice). Los valores marcados "medido" salen del DOM/CSS; los demás son observación visual.

## Stack (medido)
- **GSAP 3.9.1 + ScrollTrigger** (sin SplitText), **Barba.js** (transiciones entre páginas), **Locomotive Scroll** (clases `has-scroll-init has-scroll-smooth`, atributos `data-scroll-speed` de -4 a 4 para parallax), jQuery 3.5.1 y vanilla-lazyload.
- Sin canvas ni Three.js. Todo es DOM + GSAP.
- Equivalente moderno para nosotros: GSAP (ya es gratis con todos sus plugins) + Lenis en lugar de Locomotive + transiciones de ruta propias en Next.js (Barba no aplica).

## Intro / preloader
- Pantalla oscura con "• Hello" centrado antes de mostrar la home. Entre páginas, el mismo patrón con el nombre del proyecto ("• TWICE").

## Hero
- Foto a pantalla completa con el nombre en una **marquee gigante** que se desplaza con el scroll (letras cortadas por los bordes), sobre la foto.
- Píldora oscura "Located in the Netherlands" con icono de globo, pegada al borde izquierdo. Subtítulo con flecha ↘ a la derecha.
- Navegación mínima: "© Code by Dennis" a la izquierda y Work / About / Contact a la derecha; al hacer scroll se reemplaza por un **botón hamburguesa circular fijo** (esquina superior derecha).

## Lista de proyectos (la parte más relevante para nosotros)
- Cada proyecto es una **fila** (`li.work-items` > `a.row`): título enorme (≈77 px) a la izquierda, tipo de trabajo ("Interaction & Development", "Design & Development") a la derecha y una **línea de 1 px** (`.stripe`, `rgba(28,29,32,.18)`) como separador. Sin miniaturas visibles en reposo.
- **Hover (observado + medido):**
  - Aparece una **tarjeta con la captura del proyecto que sigue al cursor** (clase `mouse-pos-list-image-wrap`).
  - El cursor se convierte en un **círculo azul con el texto "View"**.
  - El título se desplaza ≈ -19 px en X; el texto de tipo de trabajo se atenúa.
  - Transición del título: **0.3 s `cubic-bezier(0.7, 0, 0.3, 1)`** (medido).
- Las filas entran con la clase `animate` (la línea y el contenido aparecen al hacer scroll con ScrollTrigger; hay 8 triggers en la home).
- Botón circular grande "About me" (fondo oscuro) junto al texto de presentación, antes de la lista; la etiqueta "RECENT WORK" va en pequeño y en mayúsculas.

## Transición entre páginas (Barba)
1. Clic en la fila.
2. Cubre la pantalla un **overlay oscuro con el nombre del proyecto** ("• TWICE") y un **borde inferior curvo** (`rounded-div`) que barre hacia arriba.
3. Se revela la página del caso ya cargada. Todo ocurre en poco más de 1 s.
- Existen elementos `rounded-div-wrap`, `fixed-nav-rounded-div` y `footer-rounded-div`: el mismo borde curvo se reutiliza arriba del footer.

## Página de caso (/work/twice)
- Título enorme, y debajo **tres columnas de metadatos con línea superior**: ROLE / SERVICES, CREDITS, LOCATION & YEAR.
- **Botón circular azul "Live site ↗"** flotando a la derecha, magnético (clase `magnetic`).
- Imagen hero a ancho de contenido justo debajo.
- Navegación con **punto** bajo el elemento activo ("Work").

## Footer
- Sección oscura con borde superior curvo; "Let's work together" con foto circular, línea horizontal y **botón circular azul "Get in touch" sobre la línea**; píldoras de contacto (email, teléfono) con borde.

## Botones (medido por clases)
- Familia `.btn` con `.btn-fill` (relleno que se anima en hover), `.btn-text`/`.btn-text-inner` (texto que se desplaza), `.btn-round`, `.btn-click` y `.magnetic` (efecto magnético con GSAP).

## Pendiente
- Medir duraciones/easings de la transición de página y del reveal de texto (requiere leer los timelines de GSAP).
- GIFs de: hover de la lista, transición de página, botón magnético y marquee del hero.
- Página About y menú hamburguesa abierto.
