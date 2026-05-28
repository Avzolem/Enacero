"use client";

import { motion } from "framer-motion";
import { MEXICO_PATHS } from "./mexico-paths";

type Pin = {
  x: number;
  y: number;
  r: number;
  label?: string;
  primary?: boolean;
  labelAnchor?: "start" | "end" | "middle";
  labelDx?: number;
  labelDy?: number;
};

// Approximate lat/lon → viewBox-275×184 positions, hand-tuned against the source SVG
const PINS: Pin[] = [
  // Primary
  { x: 162, y: 130, r: 2.4, label: "CDMX", primary: true, labelDx: 5, labelDy: 1.5 },
  // Major cities
  { x: 152, y: 72, r: 1.7, label: "MONTERREY", labelDx: 4, labelDy: 1 },
  { x: 132, y: 118, r: 1.7, label: "GUADALAJARA", labelAnchor: "end", labelDx: -4, labelDy: 1 },
  { x: 244, y: 116, r: 1.7, label: "MÉRIDA", labelAnchor: "end", labelDx: -4, labelDy: 1 },
  { x: 8, y: 12, r: 1.7, label: "TIJUANA", labelDx: 4, labelDy: 1 },
  // Secondary (no labels — visual density only)
  { x: 170, y: 134, r: 1.1 }, // Puebla
  { x: 151, y: 122, r: 1.1 }, // Querétaro
  { x: 188, y: 132, r: 1.1 }, // Veracruz
  { x: 140, y: 117, r: 1.1 }, // León
  { x: 173, y: 103, r: 1.1 }, // Tampico
];

export function MexicoMap({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 275 184"
      fill="none"
      className="h-auto w-full"
      style={{ filter: "drop-shadow(0 12px 60px rgba(194,111,58,.12))" }}
    >
      {/* Country outline — drawn path-by-path with stagger */}
      <g>
        {MEXICO_PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            pathLength={1}
            stroke="rgba(244,242,238,.45)"
            strokeWidth={0.25}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill={active ? "rgba(194,111,58,.04)" : "rgba(255,255,255,.015)"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              active
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 2.5, delay: 0.02 * i, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.4, delay: 0.02 * i },
            }}
          />
        ))}
      </g>

      {/* Pins */}
      <g>
        {PINS.map((p, i) => (
          <g key={i}>
            {/* Pulsing ring */}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="none"
              stroke="var(--color-copper)"
              strokeWidth={0.3}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: active ? "pin-ring 2.4s ease-out infinite" : "none",
                animationDelay: `${i * 0.15}s`,
              }}
            />
            {/* Solid dot */}
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={p.primary ? "var(--color-copper-bright)" : "var(--color-copper)"}
              initial={{ opacity: 0, scale: 0 }}
              animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.4 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            {/* Label */}
            {p.label && (
              <motion.text
                x={p.x + (p.labelDx ?? 3)}
                y={p.y + (p.labelDy ?? 1)}
                fill={p.primary ? "var(--color-copper)" : "rgba(244,242,238,.75)"}
                fontFamily="General Sans, Inter, sans-serif"
                fontSize={p.primary ? 4.2 : 3.2}
                fontWeight={p.primary ? 700 : 500}
                letterSpacing={p.primary ? 0.35 : 0.25}
                textAnchor={p.labelAnchor ?? "start"}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.7 + i * 0.08 }}
              >
                {p.label}
              </motion.text>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
