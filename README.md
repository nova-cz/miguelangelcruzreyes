<div align="center">
  <h1>Miguel Cruz</h1>
  <p>Portafolio v2 · Agentes de IA y productos full-stack</p>
  <p><a href="https://miguelcruz.vercel.app"><strong>miguelcruz.vercel.app</strong></a></p>

  <div>
    <img src="https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
  </div>
</div>

## Qué es

Mi portafolio profesional. Lo hice para aplicar a internships de Software Engineering e IA en 2027. Está en español e inglés, y un recruiter debe poder entender en pocos segundos quién soy, qué construyo y cómo contactarme.

*English:* personal portfolio, bilingual (ES/EN), built with Next.js. Live at [miguelcruz.vercel.app](https://miguelcruz.vercel.app).

## Qué incluye

- **Dos idiomas** con rutas `/es` y `/en`. Detecta el idioma del navegador y recuerda la elección.
- **Casos de estudio** por proyecto (`/[lang]/works/[slug]`), con problema, rol, stack y resultado.
- **Nova**, la estrella del sitio: un asistente de preguntas y respuestas de opción múltiple sobre mi experiencia, proyectos y disponibilidad. Se abre con el botón del hero o con `⌘ + ⌥ + S` (`Ctrl + Alt + S`).
- **Formulario de contacto** en una ventana emergente que envía el mensaje a mi correo con EmailJS.
- Tema oscuro y claro, galería, premios y educación.
- Respeta `prefers-reduced-motion` y se puede usar con teclado.

## Stack

- [Next.js](https://nextjs.org) (App Router) y React
- TypeScript
- Tailwind CSS 4
- [Motion](https://motion.dev) para las animaciones
- [EmailJS](https://www.emailjs.com) para el formulario de contacto
- Despliegue en [Vercel](https://vercel.com)

## Estructura

```
src/
  app/[lang]/        páginas por idioma y casos de estudio
  components/        Hero, About, Works, Mascot (Nova), ContactDialog…
  content/
    site.ts          TODO el texto y los datos del sitio (es / en)
    star-flow.ts     árbol de preguntas y respuestas de Nova
  lib/               i18n y utilidades
public/images/       fotos y capturas en WebP
docs/inspo/          referencias de diseño
```

Todo el contenido vive en `src/content/site.ts`. Los componentes solo leen de ahí, y las respuestas de Nova salen de los mismos datos.

## Correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Otros comandos: `npm run build`, `npm run start` y `npm run lint`.

## Variables de entorno

Solo se necesitan para el formulario de contacto (ver `.env.example`):

| Variable | Qué es |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | ID del servicio de EmailJS |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | ID de la plantilla |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Public Key de la cuenta |

También se leen con el prefijo `VITE_APP_EMAILJS_*` del portafolio anterior. La plantilla de EmailJS recibe los campos `name`, `email` y `message`. Sin estas variables el formulario muestra un error al enviar.

## Despliegue

Cada push a `main` se publica en producción en Vercel. Las demás ramas generan una URL de preview. La versión anterior del portafolio está en el tag `v1`.

## Contacto

- Correo: [cruzmiguelangel858@gmail.com](mailto:cruzmiguelangel858@gmail.com)
- LinkedIn: [linkedin.com/in/miguelcr4](https://www.linkedin.com/in/miguelcr4/)
- GitHub: [github.com/nova-cz](https://github.com/nova-cz)
