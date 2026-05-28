"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Item = { plus?: boolean; target: number; unit?: string; label: string };

const ITEMS: Item[] = [
  {
    target: 3,
    label: "Líneas de producto: aceros planos, perfiles estructurales y de refuerzo.",
  },
  {
    plus: true,
    target: 6,
    label: "Sectores atendidos: construcción, industria, estructuras, distribución y más.",
  },
  {
    target: 100,
    unit: "%",
    label: "Material verificado bajo control de calidad en cada entrega.",
  },
  {
    target: 5,
    label: "Pasos en nuestro proceso de suministro, de la solicitud a la entrega.",
  },
];

export function Cifras() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <section
      ref={ref}
      className="bg-bg-light text-[#14171c]"
      style={{ padding: "clamp(80px,12vw,160px) var(--pad)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div
          className="flex flex-wrap items-end justify-between gap-10"
          style={{ marginBottom: "clamp(60px,8vw,100px)" }}
        >
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper-deep">
              <span className="h-px w-6 bg-copper-deep" />
              03 · Autoridad
            </span>
            <h2
              className="mt-4 font-medium"
              style={{
                fontSize: "clamp(28px,3.6vw,56px)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-tighter)",
                maxWidth: "18ch",
              }}
            >
              Operación medible.<br />Resultados medibles.
            </h2>
          </div>
          <p className="max-w-[36ch] text-sm leading-[1.55] text-n-600">
            Cifras que respaldan la capacidad operativa, el alcance geográfico y los estándares con los que
            trabajamos cada proyecto.
          </p>
        </div>

        <div className="grid grid-cols-2 border-t border-[#14171c]/12 md:grid-cols-4">
          {ITEMS.map((item, i) => (
            <CifraCell key={i} item={item} inView={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CifraCell({ item, inView, index }: { item: Item; inView: boolean; index: number }) {
  const isLastRowMobile = index >= 2;
  const isRightColMobile = index % 2 === 1;
  return (
    <div
      className={`relative flex flex-col gap-4 px-8 pt-10 pb-8 border-r border-[#14171c]/12 ${
        isLastRowMobile ? "" : "border-b md:border-b-0"
      } ${isRightColMobile ? "border-r-0 md:border-r" : ""} md:last:border-r-0`}
    >
      <motion.div
        className="absolute left-0 top-[-1px] h-0.5 bg-copper"
        initial={{ width: 0 }}
        animate={inView ? { width: "60%" } : { width: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        className="flex items-baseline gap-1 font-medium text-[#14171c]"
        style={{
          fontSize: "clamp(64px,9vw,144px)",
          lineHeight: 0.9,
          letterSpacing: "var(--tracking-tightest)",
        }}
      >
        {item.plus && <span className="mr-1 font-normal text-copper">+</span>}
        <Counter target={item.target} inView={inView} />
        {item.unit && (
          <span className="ml-1.5 text-[.3em] font-normal tracking-normal text-n-600">{item.unit}</span>
        )}
      </div>
      <div className="max-w-[22ch] text-[13px] leading-[1.5] text-n-600">{item.label}</div>
    </div>
  );
}

function Counter({ target, inView }: { target: number; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString());
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, target, {
      duration: 1.8,
      ease: [0.34, 1, 0.64, 1],
    });
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target, motionValue, rounded]);

  return <span ref={ref}>0</span>;
}
