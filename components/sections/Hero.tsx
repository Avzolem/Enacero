"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SparksCanvas } from "@/components/visuals/SparksCanvas";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const steelY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const words = ["Acero", "que", "sostiene", "México."];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-bg-0"
      style={{ padding: "0 var(--pad) clamp(60px,8vw,100px)" }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          y: mediaY,
          scale: mediaScale,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(194,111,58,.18), transparent 65%), radial-gradient(ellipse 90% 80% at 20% 90%, rgba(31,45,122,.22), transparent 60%), linear-gradient(180deg, #07080a 0%, #0a0c10 40%, #07080a 100%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[20%] -z-20"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(194,111,58,.12), transparent 35%)",
          animation: "drift 18s var(--ease-in-out-soft) infinite alternate",
        }}
      />

      <SparksCanvas />

      <motion.div
        aria-hidden
        className="absolute inset-x-0 -z-10 h-px"
        style={{
          bottom: "22%",
          y: steelY,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,214,217,.18) 15%, rgba(212,214,217,.6) 50%, rgba(212,214,217,.18) 85%, transparent 100%)",
          boxShadow: "0 0 24px rgba(212,214,217,.06)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(0,0,0,.55) 100%), linear-gradient(180deg, rgba(7,8,10,.4) 0%, transparent 25%, transparent 75%, rgba(7,8,10,.8) 100%)",
        }}
      />

      <div
        className="absolute hidden items-center gap-3.5 md:flex"
        style={{ left: "var(--pad)", top: "clamp(100px,14vh,160px)" }}
      >
        <span className="text-[11px] font-medium uppercase tracking-[.22em] text-n-400">
          <strong className="font-medium text-n-100">01</strong> — Distribución de acero
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[.22em] text-n-400">
          CDMX · MX
        </span>
      </div>

      <div
        className="relative z-[2] mx-auto grid w-full gap-7 md:gap-12"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <h1
          className="font-medium"
          style={{
            fontSize: "clamp(56px,11vw,184px)",
            lineHeight: 0.92,
            letterSpacing: "var(--tracking-tightest)",
            textWrap: "balance",
            maxWidth: "14ch",
          }}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-top">
              <motion.span
                className={`inline-block ${i === 3 ? "italic text-copper font-normal" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.4,
                  delay: 1.7 + 0.15 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
                {i < 3 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-10">
          <p className="max-w-[36ch] text-sm font-normal leading-[1.55] text-n-200">
            Distribuimos los perfiles, planos y refuerzos que levantan las obras más exigentes del país. Atención
            puntual. Inventario disponible. Entrega confiable.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-copper px-7 py-4 text-sm font-semibold text-bg-0 transition-colors hover:bg-copper-bright"
            >
              Cotizar
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#productos"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-n-100 transition-colors hover:border-n-100"
            >
              Ver productos
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.25em] text-n-400 md:flex"
      >
        <span>Scroll</span>
        <span
          className="block h-8 w-px"
          style={{
            background: "linear-gradient(180deg, var(--color-n-400), transparent)",
            animation: "scroll-hint 2.2s var(--ease-in-out-soft) infinite",
          }}
        />
      </div>
    </section>
  );
}
