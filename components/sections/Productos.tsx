"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProductoCard, type Producto } from "./ProductoCard";
import { ProductoVisualBeam } from "@/components/visuals/ProductoVisualBeam";
import { ProductoVisualTube } from "@/components/visuals/ProductoVisualTube";
import { ProductoVisualSheet } from "@/components/visuals/ProductoVisualSheet";
import { ProductoVisualRebar } from "@/components/visuals/ProductoVisualRebar";

const PRODUCTOS: Producto[] = [
  {
    idx: "01 / 04",
    eyebrow: "Estructural",
    title: "Perfiles Estructurales",
    sub: "Alta resistencia para construcción civil, naves industriales y estructuras de gran claro.",
    specs: [
      "Vigas IPR — A36 / A572 Gr.50",
      "Tubos HSS cuadrados y rectangulares",
      "Perfiles IPS y canal CPS",
      "Certificación bajo NMX-B-284 y ASTM",
    ],
    visual: <ProductoVisualBeam />,
  },
  {
    idx: "02 / 04",
    eyebrow: "Comercial",
    title: "Perfiles Comerciales",
    sub: "Material de uso general para taller, fabricación ligera y obra civil cotidiana.",
    specs: [
      "PTR y tubo cuadrado calibres 11 al 18",
      "Ángulos LI / LD lados iguales y desiguales",
      "Canales y soleras laminadas en caliente",
      "Redondos sólidos, hexágonos, cuadrados",
    ],
    visual: <ProductoVisualTube />,
  },
  {
    idx: "03 / 04",
    eyebrow: "Planos",
    title: "Aceros Planos",
    sub: "Laminados y galvanizados para techo, fachada, fabricación de equipo y troquelado.",
    specs: [
      "Lámina laminada en frío y en caliente",
      "Lámina galvanizada cal. 22 al 30",
      "Lámina negra y antiderrapante",
      "Rollos slitting a medida bajo pedido",
    ],
    visual: <ProductoVisualSheet />,
  },
  {
    idx: "04 / 04",
    eyebrow: "Refuerzo",
    title: "Aceros de Refuerzo",
    sub: "Refuerzo para concreto en obra civil, vivienda, infraestructura y losacero.",
    specs: [
      'Varilla corrugada 3/8" a 1 1/4" — Gr.42 y Gr.60',
      "Malla electrosoldada 6×6, 10×10, 15×15",
      "Alambrón liso y trefilado",
      "Estribos prefabricados bajo pedido",
    ],
    visual: <ProductoVisualRebar />,
  },
];

export function Productos() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-240vw"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressNum = useTransform(scrollYProgress, (p) => {
    const n = Math.min(4, Math.max(1, Math.ceil(p * 4) || 1));
    return `0${n}`;
  });

  return (
    <section id="productos" className="relative bg-bg-0 p-0">
      <div ref={pinRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
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
                Cuatro familias.<br />Un solo estándar.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-n-400">
              <motion.span>{progressNum}</motion.span> / 04
              <div className="relative h-px w-[120px] bg-white/10">
                <motion.div
                  className="absolute left-0 top-0 h-px bg-copper"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>

          <motion.div
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
