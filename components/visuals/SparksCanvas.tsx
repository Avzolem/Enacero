"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  hue: number;
};

export function SparksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const particles: Particle[] = [];
    const MAX = 60;
    let rafId = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      const ox = w * (0.08 + Math.random() * 0.12);
      const oy = h * (0.68 + Math.random() * 0.12);
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
      const speed = 0.5 + Math.random() * 2.2;
      particles.push({
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 0.5,
        life: 0,
        max: 80 + Math.random() * 80,
        size: 0.6 + Math.random() * 1.4,
        hue: 18 + Math.random() * 20,
      });
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      while (particles.length < MAX && Math.random() < 0.7) spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.vx *= 0.995;
        const lifeP = p.life / p.max;
        if (lifeP >= 1 || p.x < 0 || p.x > w || p.y > h) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = (1 - lifeP) * 0.9;
        const sz = p.size * (1 - lifeP * 0.4);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 6);
        g.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${alpha})`);
        g.addColorStop(0.5, `hsla(${p.hue}, 95%, 55%, ${alpha * 0.3})`);
        g.addColorStop(1, `hsla(${p.hue}, 95%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(${p.hue + 10}, 95%, 80%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-50 mix-blend-screen"
    />
  );
}
