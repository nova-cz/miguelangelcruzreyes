import type { LucideIcon } from "lucide-react";
import { Bot, Brain, Coffee, Layers, Workflow } from "lucide-react";
import {
  siAnthropic,
  siC,
  siCplusplus,
  siDjango,
  siDocker,
  siExpo,
  siFastapi,
  siFirebase,
  siGit,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siOpencv,
  siPostgresql,
  siPython,
  siQgis,
  siRailway,
  siReact,
  siStreamlit,
  siSupabase,
  siSwift,
  siTypescript,
  siVercel,
  siVuedotjs,
  siZapier,
  type SimpleIcon,
} from "simple-icons";

export type SkillIcon =
  | { kind: "brand"; path: string; hex: string }
  | { kind: "lucide"; Icon: LucideIcon; hex: string };

const brand = (i: SimpleIcon): SkillIcon => ({ kind: "brand", path: i.path, hex: i.hex });
const generic = (Icon: LucideIcon, hex: string): SkillIcon => ({ kind: "lucide", Icon, hex });

// Clave = texto tal como aparece en site.ts. Lo que no esté aquí se muestra sin icono.
export const skillIcons: Record<string, SkillIcon> = {
  Python: brand(siPython),
  "TypeScript / JavaScript": brand(siTypescript),
  "C / C++": brand(siCplusplus),
  C: brand(siC),
  Java: generic(Coffee, "E76F00"),
  Swift: brand(siSwift),
  React: brand(siReact),
  "Next.js": brand(siNextdotjs),
  "React Native / Expo": brand(siExpo),
  Vue: brand(siVuedotjs),
  "Node / Express": brand(siNodedotjs),
  FastAPI: brand(siFastapi),
  "Django REST": brand(siDjango),
  "LLM APIs (Claude, Gemini)": brand(siAnthropic),
  "Agentes de IA / AI agents": generic(Bot, "8B5CF6"),
  OpenCV: brand(siOpencv),
  "ML con Python": generic(Brain, "EC4899"),
  Streamlit: brand(siStreamlit),
  "QGIS / Rasterio": brand(siQgis),
  Supabase: brand(siSupabase),
  PostgreSQL: brand(siPostgresql),
  MongoDB: brand(siMongodb),
  Firebase: brand(siFirebase),
  Docker: brand(siDocker),
  Vercel: brand(siVercel),
  Railway: brand(siRailway),
  Git: brand(siGit),
  GoHighLevel: generic(Workflow, "22C55E"),
  Zapier: brand(siZapier),
  Rasterio: generic(Layers, "14B8A6"),
};

// Color del icono sobre el mosaico: blanco, o casi negro si el color de marca es muy claro.
export function tileColors(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return {
    // las marcas casi negras (Next.js, Vercel…) usan un gris para que el brillo se note
    color: luminance < 0.12 ? "#3b3b40" : `#${hex}`,
    icon: luminance > 0.72 ? "#161616" : "#ffffff",
  };
}
