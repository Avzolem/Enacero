"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ProductoCard, type Producto } from "./ProductoCard";
import { ProductoVisualBeam } from "@/components/visuals/ProductoVisualBeam";
import { ProductoVisualSheet } from "@/components/visuals/ProductoVisualSheet";
import { ProductoVisualRebar } from "@/components/visuals/ProductoVisualRebar";

const PRODUCTOS: Producto[] = [
  {
    idx: "01 / 03",
    eyebrow: "Planos",
    title: "Aceros Planos",
    sub: "Lámina y placa de alta calidad para techo, fachada, fabricación de equipo y troquelado.",
    specs: [
      "Lámina rolada en frío y en caliente",
      "Lámina galvanizada",
      "Placa de acero de alta calidad",
      "Lámina negra y comercial",
    ],
    visual: <ProductoVisualSheet />,
  },
  {
    idx: "02 / 03",
    eyebrow: "Estructural",
    title: "Perfiles Estructurales",
    sub: "Perfiles de alta resistencia para construcción civil, naves industriales y estructuras metálicas.",
    specs: [
      "Vigas y canales",
      "Tubos y polín monten",
      "Ángulo y solera",
      "Redondo y cuadrado",
    ],
    visual: <ProductoVisualBeam />,
  },
  {
    idx: "03 / 03",
    eyebrow: "Refuerzo",
    title: "Aceros de Refuerzo",
    sub: "Refuerzo para concreto en obra civil, vivienda e infraestructura. Construcción resistente.",
    specs: [
      "Varilla corrugada",
      "Malla electrosoldada",
      "Refuerzo para concreto",
      "Material para obra civil",
    ],
    visual: <ProductoVisualRebar />,
  },
];

export function Productos() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  // Measure the real horizontal overflow so the last card lands flush with the
  // viewport edge regardless of width (cards are capped at max-w-[1100px]).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setTravel(Math.max(0, track.scrollWidth - track.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressNum = useTransform(scrollYProgress, (p) => {
    const n = Math.min(3, Math.max(1, Math.ceil(p * 3) || 1));
    return `0${n}`;
  });

  return (
    <section id="productos" className="bg-bg-0 p-0" style={{ position: "relative" }}>
      <div ref={pinRef} style={{ position: "relative", height: "300vh" }}>
        <div
          className="flex flex-col overflow-hidden"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <div
            className="flex flex-shrink-0 flex-wrap items-end justify-between gap-10 pb-8 pt-20"
            style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
          >
            <div>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
                <span className="h-px w-6 bg-copper" />
                04 · Líneas de producto
              </span>
              <h2
                className="mt-4 font-medium"
                style={{
                  fontSize: "clamp(36px,5vw,80px)",
                  lineHeight: 1,
                  letterSpacing: "var(--tracking-tighter)",
                  maxWidth: "14ch",
                }}
              >
                Tres familias.<br />Un solo estándar.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-n-400">
              <motion.span>{progressNum}</motion.span> / 03
              <div className="relative h-px w-[120px] bg-white/10">
                <motion.div
                  className="absolute left-0 top-0 h-px bg-copper"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>

          <motion.div
            ref={trackRef}
            className="hidden flex-1 will-change-transform md:flex"
            style={{ x, paddingLeft: "var(--pad)" }}
          >
            {PRODUCTOS.map((p) => (
              <ProductoCard key={p.idx} producto={p} />
            ))}
          </motion.div>

          <div
            className="flex flex-1 flex-col gap-6 overflow-auto pb-15 md:hidden"
            style={{ paddingLeft: "var(--pad)", paddingRight: "var(--pad)" }}
          >
            {PRODUCTOS.map((p) => (
              <ProductoCard key={p.idx} producto={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
