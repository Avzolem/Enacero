"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const WORDS: Array<{ text: string; em?: boolean; accent?: boolean }> = [
  { text: "Distribuimos", em: true }, { text: "el" }, { text: "acero" }, { text: "que" },
  { text: "levanta" }, { text: "los" }, { text: "proyectos" }, { text: "más" },
  { text: "exigentes" }, { text: "de" }, { text: "México.", accent: true },
  { text: "Desde" }, { text: "la" },
  { text: "viga", em: true }, { text: "estructural", em: true },
  { text: "hasta" }, { text: "la" },
  { text: "varilla", em: true }, { text: "de", em: true }, { text: "obra.", em: true },
  { text: "Atención" }, { text: "puntual." },
  { text: "Seguimiento" }, { text: "continuo." },
  { text: "Capacidad" }, { text: "de" }, { text: "respuesta." },
];

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visibleCount = useTransform(scrollYProgress, [0.15, 0.75], [0, WORDS.length]);

  return (
    <section
      ref={ref}
      className="relative bg-bg-0 text-n-100"
      style={{ padding: "clamp(120px,18vw,220px) var(--pad)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <p
          className="font-normal"
          style={{
            fontSize: "clamp(32px,5.4vw,88px)",
            lineHeight: 1.08,
            letterSpacing: "var(--tracking-tighter)",
            maxWidth: "22ch",
          }}
        >
          {WORDS.map((w, i) => (
            <StatementWord
              key={i}
              index={i}
              text={w.text}
              em={!!w.em}
              accent={!!w.accent}
              visibleCount={visibleCount}
            />
          ))}
        </p>

        <div
          className="flex justify-between gap-10 border-t border-white/[.08] pt-8 text-xs uppercase tracking-[.15em] text-n-400"
          style={{ marginTop: "clamp(60px,8vw,100px)" }}
        >
          <span>02 · <strong className="font-medium text-n-100">Quiénes somos</strong></span>
          <span>Encuentro Acerero MX</span>
        </div>
      </div>
    </section>
  );
}

function StatementWord({
  index,
  text,
  em,
  accent,
  visibleCount,
}: {
  index: number;
  text: string;
  em: boolean;
  accent: boolean;
  visibleCount: MotionValue<number>;
}) {
  const color = useTransform(visibleCount, (v) =>
    v > index ? (accent ? "var(--color-copper)" : "var(--color-n-100)") : "var(--color-n-400)"
  );

  return (
    <motion.span
      className={`mr-[.22em] inline-block ${em ? "font-medium" : ""}`}
      style={{ color, transition: "color .8s var(--ease-out-soft)" }}
    >
      {text}
    </motion.span>
  );
}
