"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { MexicoMap } from "@/components/visuals/MexicoMap";

export function Cobertura() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      ref={ref}
      className="bg-bg-1"
      style={{ padding: "clamp(80px,12vw,160px) var(--pad)" }}
    >
      <div
        className="mx-auto grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"
        style={{ maxWidth: "var(--container-max)", columnGap: "clamp(40px,6vw,80px)" }}
      >
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
            <span className="h-px w-6 bg-copper" />
            07 · Cobertura
          </span>
          <h2
            className="mt-5 font-medium"
            style={{
              fontSize: "clamp(36px,5vw,80px)",
              lineHeight: 1,
              letterSpacing: "var(--tracking-tighter)",
              maxWidth: "14ch",
            }}
          >
            Operamos desde CDMX. Entregamos en todo el país.
          </h2>
          <p className="mt-7 max-w-[38ch] text-[15px] leading-[1.55] text-n-200">
            Base en Ciudad de México, con rutas activas hacia el Bajío, Norte y Sureste. Pedidos coordinados con
            ventana de entrega comprometida.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-7">
            <div className="flex flex-col gap-1.5">
              <div
                className="font-medium"
                style={{
                  fontSize: "clamp(32px,4vw,56px)",
                  lineHeight: 1,
                  letterSpacing: "var(--tracking-tighter)",
                }}
              >
                <span className="font-normal text-copper">14</span>
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[.2em] text-n-400">Estados activos</div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div
                className="font-medium"
                style={{
                  fontSize: "clamp(32px,4vw,56px)",
                  lineHeight: 1,
                  letterSpacing: "var(--tracking-tighter)",
                }}
              >
                CDMX
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[.2em] text-n-400">Sede operativa</div>
            </div>
          </div>
        </div>

        <div>
          <MexicoMap active={inView} />
        </div>
      </div>
    </section>
  );
}
