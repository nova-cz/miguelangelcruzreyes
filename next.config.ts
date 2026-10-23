import type { NextConfig } from "next";

// Las claves de EmailJS del portafolio anterior en Vercel se llaman VITE_APP_EMAILJS_*.
// Aquí se exponen al navegador con el nombre que lee el sitio; si existe NEXT_PUBLIC_*, esa gana.
const emailjs = (name: string) => process.env[`NEXT_PUBLIC_EMAILJS_${name}`] ?? process.env[`VITE_APP_EMAILJS_${name}`] ?? "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: emailjs("SERVICE_ID"),
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: emailjs("TEMPLATE_ID"),
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: emailjs("PUBLIC_KEY"),
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
