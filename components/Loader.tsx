"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
          <span>Encuentro Acerero MX</span>
          <span>CDMX · 2026</span>
        </div>

        <div
          className="relative h-20 w-20"
          style={{ animation: "mark-pulse 2.4s var(--ease-in-out-soft) infinite" }}
        >
          <Image
            src="/logo-mark.webp"
            alt="Enacero"
            width={80}
            height={75}
            priority
            className="h-full w-auto object-contain"
          />
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
          <span>Acero que mueve proyectos</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
