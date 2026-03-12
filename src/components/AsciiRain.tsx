"use client";

import { useEffect, useRef } from "react";

const RAIN_CHARS = ["|", ":", ".", ";", "'", "`", ",", "!", "¦", "│", "╎", "┊", "┆"];
const MAX_DROPS = 500;
const SPAWN_RATE = 6; // new drops per frame

type Drop = {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  char: string;
};

export function AsciiRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const rafRef = useRef<number>(0);
  const fadingRef = useRef(false);
  const globalAlphaRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const spawnDrop = (w: number): Drop => ({
      x: Math.random() * w,
      y: -(Math.random() * 40),
      speed: 120 + Math.random() * 280,
      opacity: 0.15 + Math.random() * 0.45,
      char: RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)],
    });

    let lastTime = 0;

    const loop = (time: number) => {
      const dt = lastTime ? (time - lastTime) / 1000 : 0.016;
      lastTime = time;

      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      const w = rect.width;
      const h = rect.height;

      // Fade in/out
      if (active && !fadingRef.current) {
        globalAlphaRef.current = Math.min(1, globalAlphaRef.current + dt * 0.7);
      } else if (!active || fadingRef.current) {
        globalAlphaRef.current = Math.max(0, globalAlphaRef.current - dt * 0.7);
      }

      // Spawn new drops when active
      if (active && dropsRef.current.length < MAX_DROPS) {
        for (let i = 0; i < SPAWN_RATE; i++) {
          dropsRef.current.push(spawnDrop(w));
        }
      }

      // Clear
      ctx.clearRect(0, 0, w, h);

      if (globalAlphaRef.current <= 0 && !active) {
        dropsRef.current = [];
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Draw & update
      ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textAlign = "center";

      const drops = dropsRef.current;
      let alive = 0;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        d.y += d.speed * dt;

        if (d.y > h + 20) continue;

        // Fade at edges
        let localAlpha = d.opacity;
        if (d.y < 30) localAlpha *= d.y / 30;
        else if (d.y > h - 30) localAlpha *= (h - d.y) / 30;

        ctx.globalAlpha = Math.max(0, localAlpha * globalAlphaRef.current);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillText(d.char, d.x, d.y);

        drops[alive++] = d;
      }

      drops.length = alive;
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    />
  );
}
