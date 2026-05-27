"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="fixed top-0 right-0 z-50 h-screen w-[2px] bg-white/[.04]"
    >
      <motion.div
        style={{
          height,
          background:
            "linear-gradient(180deg, var(--color-copper-bright), var(--color-copper))",
          boxShadow: "0 0 18px rgba(194,111,58,.6)",
        }}
      />
    </div>
  );
}
