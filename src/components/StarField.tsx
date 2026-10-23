"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; phase: number; speed: number; sparkle: boolean };
type Shooter = { x: number; y: number; vx: number; vy: number; born: number; life: number };

// Cielo estrellado: parpadeo suave, destellos en cruz y una estrella fugaz de vez en cuando.
export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let shooter: Shooter | null = null;
    let nextShooter = performance.now() + 3500;
    let raf = 0;
    let w = 0;
    let h = 0;
    let rgb = "255,255,255";

    const readTheme = () => {
      rgb = getComputedStyle(document.documentElement).getPropertyValue("--star").trim() || "255,255,255";
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.4,
        sparkle: Math.random() < 0.07,
      }));
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const t = now / 1000;

      for (const s of stars) {
        const a = reduced ? 0.7 : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.sparkle) {
          const len = 4 + s.r * 4;
          ctx.strokeStyle = `rgba(${rgb},${a * 0.8})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y);
          ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len);
          ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        }
      }

      if (!reduced) {
        if (!shooter && now > nextShooter) {
          shooter = {
            x: w * (0.45 + Math.random() * 0.5),
            y: Math.random() * h * 0.3,
            vx: -(0.5 + Math.random() * 0.2),
            vy: 0.38 + Math.random() * 0.12,
            born: now,
            life: 1100,
          };
        }
        if (shooter) {
          const age = now - shooter.born;
          if (age > shooter.life) {
            shooter = null;
            nextShooter = now + 6000 + Math.random() * 6000;
          } else {
            const p = age / shooter.life;
            const hx = shooter.x + shooter.vx * age;
            const hy = shooter.y + shooter.vy * age;
            const tail = 170 * Math.sin(p * Math.PI);
            const norm = Math.hypot(shooter.vx, shooter.vy);
            const g = ctx.createLinearGradient(hx, hy, hx - (shooter.vx / norm) * tail, hy - (shooter.vy / norm) * tail);
            g.addColorStop(0, `rgba(${rgb},0.9)`);
            g.addColorStop(1, `rgba(${rgb},0)`);
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(hx, hy);
            ctx.lineTo(hx - (shooter.vx / norm) * tail, hy - (shooter.vy / norm) * tail);
            ctx.stroke();
          }
        }
      }

      if (!reduced && !document.hidden) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };

    readTheme();
    resize();
    start();

    const onResize = () => {
      resize();
      start();
    };
    const onVisibility = () => {
      if (!document.hidden) start();
    };
    const observer = new MutationObserver(() => {
      readTheme();
      start();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
