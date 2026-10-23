import { existsSync } from "node:fs";
import path from "node:path";
import { works, type Work } from "@/content/site";

// Si la imagen todavía no está en /public, el proyecto se muestra con un degradado y su título.
const withExistingImage = (w: Work): Work =>
  w.image && !existsSync(path.join(process.cwd(), "public", w.image)) ? { ...w, image: undefined } : w;

// Los proyectos con imagen van juntos y primero; los que aún no la tienen, al final (orden estable).
export const getWorks = () => {
  const all = works.map(withExistingImage);
  return [...all.filter((w) => w.image), ...all.filter((w) => !w.image)];
};
