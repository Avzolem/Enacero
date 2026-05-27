"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Cotización ágil",
    desc: "Respuesta misma jornada en pedidos estándar. Volumen y especificación validados.",
  },
  {
    num: "02",
    title: "Asesoría técnica",
    desc: "Revisión de grados, tolerancias y compatibilidad con el proyecto.",
  },
  {
    num: "03",
    title: "Inventario disponible",
    desc: "Existencia en almacén de los códigos de mayor rotación, listos para salida.",
  },
  {
    num: "04",
    title: "Logística confiable",
    desc: "Transporte propio y aliado, ruteo confirmado, ventana de entrega comprometida.",
  },
  {
    num: "05",
    title: "Entrega puntual",
    desc: "Material certificado, remisión documentada, soporte post-entrega.",
  },
];

export function Proceso() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="proceso"
      className="relative overflow-hidden bg-bg-0"
      style={{ padding: "clamp(80px,12vw,160px) var(--pad)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 h-80 -translate-y-1/2 opacity-[.85]"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,.025) 1px, rgba(255,255,255,.06) 2px, rgba(255,255,255,0) 3px, rgba(255,255,255,0) 6px), linear-gradient(180deg, #0a0c10 0%, #2a2d32 30%, #3a3d42 50%, #2a2d32 70%, #0a0c10 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(7,8,10,.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(194,111,58,.08), transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div style={{ marginBottom: "clamp(60px,8vw,100px)" }}>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
            <span className="h-px w-6 bg-copper" />
            06 · Cómo trabajamos
          </span>
          <h2
            className="mt-5 font-medium"
            style={{
              fontSize: "clamp(36px,5vw,80px)",
              lineHeight: 1,
              letterSpacing: "var(--tracking-tighter)",
              maxWidth: "16ch",
            }}
          >
            Un proceso corto, sin fricción, documentado.
          </h2>
          <p className="mt-6 max-w-[50ch] text-[15px] leading-[1.55] text-n-200">
            Desde la solicitud inicial hasta la entrega en obra: cada paso tiene un responsable y un tiempo de
            respuesta acordado.
          </p>
        </div>

        <div className="relative z-[2] grid grid-cols-1 border-t border-white/[.18] sm:grid-cols-2 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative flex min-h-[240px] flex-col gap-5 border-r border-b border-white/10 p-6 last:border-r-0 md:border-b-0"
            >
              <motion.div
                className="absolute left-0 top-[-1px] h-0.5 bg-copper"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="text-[13px] font-medium tracking-[.2em] text-copper">{step.num}</span>
              <h3
                className="font-medium"
                style={{
                  fontSize: "clamp(20px,2vw,28px)",
                  lineHeight: 1.1,
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                {step.title}
              </h3>
              <p className="mt-auto text-[13px] leading-[1.55] text-n-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
