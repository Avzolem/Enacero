"use client";

import { motion } from "framer-motion";
import { MEXICO_PATH, MEXICO_VIEWBOX } from "./mexico-paths";

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

// Positions hand-tuned against the 976×655 viewBox of the source SVG
const PINS: Pin[] = [
  // Primary
  { x: 570, y: 468, r: 9, label: "CDMX", primary: true, labelDx: 18, labelDy: 6 },
  // Major cities
  { x: 535, y: 252, r: 5, label: "MONTERREY", labelDx: 14, labelDy: 4 },
  { x: 446, y: 423, r: 5, label: "GUADALAJARA", labelAnchor: "end", labelDx: -14, labelDy: 4 },
  { x: 850, y: 414, r: 5, label: "MÉRIDA", labelAnchor: "end", labelDx: -14, labelDy: 4 },
  { x: 50, y: 30, r: 5, label: "TIJUANA", labelDx: 14, labelDy: 4 },
  // Secondary — visual density only
  { x: 597, y: 482, r: 3 }, // Puebla
  { x: 532, y: 426, r: 3 }, // Querétaro
  { x: 659, y: 475, r: 3 }, // Veracruz
  { x: 493, y: 410, r: 3 }, // León
  { x: 605, y: 369, r: 3 }, // Tampico
];

export function MexicoMap({ active }: { active: boolean }) {
  const { width, height } = MEXICO_VIEWBOX;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className="h-auto w-full"
      style={{ filter: "drop-shadow(0 24px 80px rgba(194,111,58,.18))" }}
    >
      {/* Subtle background grid for depth */}
      <defs>
        <pattern id="mx-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="rgba(244,242,238,.04)"
            strokeWidth="0.5"
          />
        </pattern>
        <linearGradient id="mx-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(194,111,58,0.10)" />
          <stop offset="100%" stopColor="rgba(31,45,122,0.06)" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#mx-grid)" />

      {/* Mexico silhouette — single unified outline */}
      <motion.path
        d={MEXICO_PATH}
        stroke="rgba(244,242,238,.85)"
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="url(#mx-fill)"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={
          active
            ? { pathLength: 1, fillOpacity: 1 }
            : { pathLength: 0, fillOpacity: 0 }
        }
        transition={{
          pathLength: { duration: 3.2, ease: [0.16, 1, 0.3, 1] },
          fillOpacity: { duration: 1.4, delay: 2.6, ease: "easeOut" },
        }}
      />

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
              strokeWidth={1.2}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: active ? "pin-ring 2.4s ease-out infinite" : "none",
                animationDelay: `${3 + i * 0.15}s`,
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
                duration: 0.6,
                delay: 3.2 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
            {/* Label */}
            {p.label && (
              <motion.text
                x={p.x + (p.labelDx ?? 14)}
                y={p.y + (p.labelDy ?? 4)}
                fill={p.primary ? "var(--color-copper)" : "rgba(244,242,238,.78)"}
                fontFamily="General Sans, Inter, sans-serif"
                fontSize={p.primary ? 18 : 13}
                fontWeight={p.primary ? 700 : 500}
                letterSpacing={p.primary ? 1.6 : 1.2}
                textAnchor={p.labelAnchor ?? "start"}
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7, delay: 3.5 + i * 0.1 }}
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
