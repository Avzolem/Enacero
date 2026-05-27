"use client";

import { motion } from "framer-motion";

type Pin = {
  x: number;
  y: number;
  r: number;
  label?: string;
  primary?: boolean;
  labelX?: number;
  labelY?: number;
};

const PINS: Pin[] = [
  { x: 395, y: 350, r: 6, label: "CDMX", primary: true, labelX: 408, labelY: 354 },
  { x: 370, y: 240, r: 4, label: "MTY", labelX: 380, labelY: 244 },
  { x: 320, y: 320, r: 4, label: "GDL", labelX: 270, labelY: 324 },
  { x: 435, y: 365, r: 3 },
  { x: 375, y: 320, r: 3 },
  { x: 105, y: 195, r: 3 },
  { x: 475, y: 360, r: 3 },
  { x: 700, y: 380, r: 3 },
  { x: 340, y: 305, r: 3 },
  { x: 425, y: 285, r: 3 },
];

const COUNTRY_D = `
M 70 200
C 85 175, 110 165, 135 168
C 155 170, 170 178, 188 192
C 205 205, 220 210, 240 215
C 270 222, 295 230, 320 245
C 345 260, 365 268, 385 270
C 410 272, 430 268, 450 260
C 470 252, 488 240, 505 232
C 525 222, 545 218, 565 222
C 588 226, 605 240, 615 258
C 622 272, 622 285, 615 300
C 605 320, 590 332, 570 340
C 555 346, 540 350, 525 355
C 510 360, 498 372, 495 388
C 493 398, 498 410, 510 418
C 525 428, 545 432, 568 434
C 590 436, 615 432, 635 422
C 655 412, 670 398, 685 380
C 695 368, 705 354, 720 348
C 735 343, 750 348, 760 360
C 770 372, 770 388, 762 402
C 752 420, 735 432, 715 438
C 690 446, 660 446, 632 442
C 605 438, 580 432, 555 428
C 530 425, 510 425, 490 432
C 470 438, 455 448, 442 458
C 430 466, 418 470, 405 468
C 390 466, 380 458, 372 446
C 365 435, 360 422, 352 410
C 340 392, 322 380, 302 372
C 280 364, 258 360, 238 354
C 218 348, 200 340, 185 328
C 168 314, 158 298, 148 282
C 138 268, 128 256, 115 248
C 100 240, 88 236, 78 228
C 68 220, 65 210, 70 200 Z
`;

export function MexicoMap({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 800 480"
      fill="none"
      className="h-auto w-full"
      style={{ filter: "drop-shadow(0 12px 60px rgba(194,111,58,.1))" }}
    >
      <motion.path
        d={COUNTRY_D}
        strokeLinejoin="round"
        stroke="rgba(255,255,255,.4)"
        strokeWidth={1}
        fill={active ? "rgba(194,111,58,.05)" : "rgba(255,255,255,.03)"}
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
      />
      <g>
        {PINS.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="none"
              stroke="var(--color-copper)"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: active ? "pin-ring 2.4s ease-out infinite" : "none",
              }}
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="var(--color-copper)"
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            />
            {p.label && (
              <text
                x={p.labelX}
                y={p.labelY}
                fill={p.primary ? "var(--color-copper)" : "rgba(255,255,255,.7)"}
                fontFamily="General Sans"
                fontSize={p.primary ? 11 : 10}
                fontWeight={p.primary ? 600 : 400}
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
