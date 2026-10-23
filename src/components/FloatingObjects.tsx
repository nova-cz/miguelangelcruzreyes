import type { CSSProperties, ReactNode } from "react";

// Objetos "3D" flotantes del hero (referencia: ivankalkaev.com). SVG propios con degradados, reflejos
// y luz de borde para que se vean brillosos. Se mueven con el keyframe "hero-object-float"
// (6.6 s, linear, delays negativos para desfasarlos).

type Tone = { light: string; mid: string; dark: string };

const blue: Tone = { light: "#bae6fd", mid: "#38bdf8", dark: "#1e3a8a" };
const violet: Tone = { light: "#ddd6fe", mid: "#8b5cf6", dark: "#3b0764" };
const teal: Tone = { light: "#ccfbf1", mid: "#2dd4bf", dark: "#134e4a" };

const Defs = ({ id, t }: { id: string; t: Tone }) => (
  <defs>
    <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
      <stop offset="1" stopColor={t.light} />
    </linearGradient>
    <linearGradient id={`${id}-left`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={t.light} />
      <stop offset="0.55" stopColor={t.mid} />
      <stop offset="1" stopColor={t.dark} />
    </linearGradient>
    <linearGradient id={`${id}-right`} x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={t.mid} />
      <stop offset="1" stopColor={t.dark} />
    </linearGradient>
    <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={t.mid} />
      <stop offset="1" stopColor={t.dark} />
    </linearGradient>
  </defs>
);

function Gem({ id, t }: { id: string; t: Tone }) {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <Defs id={id} t={t} />
      <polygon points="22,12 78,12 98,40 50,96 2,40" fill={`url(#${id}-left)`} />
      <polygon points="22,12 78,12 70,40 30,40" fill={`url(#${id}-top)`} />
      <polygon points="2,40 30,40 50,96" fill={`url(#${id}-left)`} />
      <polygon points="98,40 70,40 50,96" fill={`url(#${id}-right)`} />
      <polygon points="30,40 70,40 50,96" fill={`url(#${id}-edge)`} />
      {/* reflejos */}
      <polygon points="26,15 46,15 38,38 30,38" fill="#fff" opacity="0.55" />
      <polygon points="58,15 72,15 66,36 58,36" fill="#fff" opacity="0.25" />
      <polygon points="8,40 28,40 34,58" fill="#fff" opacity="0.22" />
      <polygon points="22,12 78,12 98,40 50,96 2,40" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function HexGem({ id, t }: { id: string; t: Tone }) {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <Defs id={id} t={t} />
      <polygon points="50,4 92,28 92,72 50,96 8,72 8,28" fill={`url(#${id}-left)`} />
      <polygon points="50,4 92,28 50,50 8,28" fill={`url(#${id}-top)`} />
      <polygon points="92,28 92,72 50,96 50,50" fill={`url(#${id}-right)`} />
      <polygon points="8,28 50,50 50,96 8,72" fill={`url(#${id}-edge)`} />
      <polygon points="50,9 80,26 50,40 22,26" fill="#fff" opacity="0.4" />
      <polygon points="12,34 24,40 24,74 12,68" fill="#fff" opacity="0.18" />
      <polygon points="50,4 92,28 92,72 50,96 8,72 8,28" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function GoldStar() {
  const pts = "50,5 62,35 95,38 70,59 78,92 50,74 22,92 30,59 5,38 38,35";
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <defs>
        <linearGradient id="gs-body" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset="0.45" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <polygon points={pts} fill="url(#gs-body)" stroke="#fff" strokeOpacity="0.7" strokeWidth="2.2" strokeLinejoin="round" />
      <polygon points="50,12 59,36 50,46 41,36" fill="#fff" opacity="0.6" />
      <polygon points="14,40 36,38 40,48" fill="#fff" opacity="0.3" />
      <polygon points="50,74 28,90 36,62 50,66" fill="#7c2d12" opacity="0.25" />
    </svg>
  );
}

function Orb() {
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <defs>
        <radialGradient id="orb-body" cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#fbcfe8" />
          <stop offset="0.45" stopColor="#ec4899" />
          <stop offset="1" stopColor="#701a3f" />
        </radialGradient>
        <radialGradient id="orb-rim" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.82" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.35" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#orb-body)" />
      <circle cx="50" cy="50" r="44" fill="url(#orb-rim)" />
      <ellipse cx="36" cy="27" rx="17" ry="9" fill="#fff" opacity="0.75" transform="rotate(-28 36 27)" />
      <ellipse cx="68" cy="76" rx="14" ry="5" fill="#fff" opacity="0.18" transform="rotate(-28 68 76)" />
    </svg>
  );
}

function CodeBlob() {
  const lobes: [number, number, number][] = [
    [30, 46, 22],
    [54, 30, 24],
    [74, 50, 22],
    [52, 70, 26],
    [26, 68, 17],
  ];
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <defs>
        <linearGradient id="cb-body" gradientUnits="userSpaceOnUse" x1="20" y1="8" x2="78" y2="96">
          <stop offset="0" stopColor="#bae6fd" />
          <stop offset="0.35" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1e1b8b" />
        </linearGradient>
        <filter id="cb-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>
      {lobes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="url(#cb-body)" />
      ))}
      <ellipse cx="44" cy="26" rx="22" ry="9" fill="#fff" opacity="0.55" transform="rotate(-18 44 26)" filter="url(#cb-soft)" />
      <circle cx="82" cy="38" r="3" fill="#fff" opacity="0.5" />
      <circle cx="16" cy="56" r="2.2" fill="#fff" opacity="0.45" />
      <polyline points="34,42 50,54 34,66" fill="none" stroke="#fff" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="58" y1="68" x2="76" y2="68" stroke="#fff" strokeWidth="8.5" strokeLinecap="round" />
    </svg>
  );
}

function AiChip() {
  const pins = [26, 42, 58, 74];
  return (
    <svg viewBox="0 0 100 100" className="size-full">
      <defs>
        <linearGradient id="chip-body" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="0.5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#2e1065" />
        </linearGradient>
        <linearGradient id="chip-gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="chip-clip">
          <rect x="18" y="18" width="64" height="64" rx="16" />
        </clipPath>
      </defs>
      {pins.map((p) => (
        <g key={p} fill="#ddd6fe" opacity="0.9">
          <rect x={p - 3} y="6" width="6" height="12" rx="2.5" />
          <rect x={p - 3} y="82" width="6" height="12" rx="2.5" />
          <rect x="6" y={p - 3} width="12" height="6" rx="2.5" />
          <rect x="82" y={p - 3} width="12" height="6" rx="2.5" />
        </g>
      ))}
      <rect x="18" y="18" width="64" height="64" rx="16" fill="url(#chip-body)" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" />
      <rect x="30" y="30" width="40" height="40" rx="9" fill="#1e0a4a" opacity="0.45" stroke="#fff" strokeOpacity="0.35" />
      <g clipPath="url(#chip-clip)">
        <rect x="18" y="18" width="64" height="30" fill="url(#chip-gloss)" />
      </g>
      <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">
        AI
      </text>
    </svg>
  );
}

type Item = {
  node: ReactNode;
  className: string;
  delay: number;
  float: { x: number; y: number; rotate: number };
};

const items: Item[] = [
  { node: <Gem id="gm-blue" t={blue} />, className: "left-[6%] top-[16%] size-24 sm:size-32 lg:left-[14%]", delay: -4200, float: { x: 14, y: 18, rotate: 7 } },
  { node: <HexGem id="hx-violet" t={violet} />, className: "right-[8%] top-[9%] size-16 sm:size-20 lg:right-[24%]", delay: -1300, float: { x: 12, y: 16, rotate: -8 } },
  { node: <CodeBlob />, className: "left-[5%] bottom-[12%] size-[72px] sm:size-28 lg:left-[18%]", delay: -3600, float: { x: 10, y: 14, rotate: 6 } },
  { node: <GoldStar />, className: "right-[7%] bottom-[16%] size-14 sm:size-20 lg:right-[17%]", delay: 0, float: { x: 10, y: 14, rotate: 9 } },
  { node: <Orb />, className: "right-[9%] top-[50%] hidden size-12 sm:block lg:right-[14%]", delay: -2400, float: { x: 9, y: 12, rotate: -7 } },
  { node: <AiChip />, className: "right-[30%] top-[72%] hidden size-14 sm:block", delay: -900, float: { x: 9, y: 12, rotate: 5 } },
  { node: <HexGem id="hx-teal" t={teal} />, className: "left-[4%] top-[54%] hidden size-12 blur-[1.2px] md:block", delay: -3000, float: { x: 8, y: 11, rotate: -6 } },
];

export default function FloatingObjects() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <div
          key={i}
          className={`hero-object-float absolute drop-shadow-[0_14px_22px_rgba(0,0,0,0.5)] ${it.className}`}
          style={
            {
              animationDelay: `${it.delay}ms`,
              "--float-x": `${it.float.x}px`,
              "--float-y": `${it.float.y}px`,
              "--float-rotate": `${it.float.rotate}deg`,
            } as CSSProperties
          }
        >
          {it.node}
        </div>
      ))}
    </div>
  );
}
