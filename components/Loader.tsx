"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[200] grid place-items-center bg-bg-0 transition-[opacity,visibility] duration-[900ms] ${
        hidden ? "pointer-events-none opacity-0 invisible" : "opacity-100"
      }`}
      style={{ transitionTimingFunction: "var(--ease-out-soft)" }}
    >
      <div className="flex w-[min(420px,70vw)] flex-col items-center gap-7">
        <div className="flex w-full justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-n-400">
          <span>ENACERO</span>
          <span>MX · 2026</span>
        </div>

        <div
          className="relative h-16 w-16"
          style={{ animation: "mark-pulse 2.4s var(--ease-in-out-soft) infinite" }}
        >
          <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="rgba(212,214,217,.25)" strokeWidth="1" />
            <path d="M32 12 L50 50 L42 50 L32 26 L22 50 L14 50 Z" fill="#c26f3a" />
            <path d="M32 26 L36 34 L28 34 Z" fill="#1f2d7a" />
          </svg>
        </div>

        <div className="relative h-[2px] w-full overflow-hidden bg-white/[.08]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-copper-deep), var(--color-copper) 50%, var(--color-copper-bright))",
              animation: "load-fill 1.8s var(--ease-out-soft) forwards",
            }}
          />
        </div>

        <div className="flex w-full justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-n-400">
          <span>Cargando experiencia</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
