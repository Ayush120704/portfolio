"use client";

import { motion } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";

export default function CustomCursor() {
  const { cursorVariant } = usePortfolioStore();

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "var(--accent)",
      mixBlendMode: "difference" as const,
    },
    link: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      border: "2px solid var(--accent)",
      mixBlendMode: "difference" as const,
    },
    button: {
      width: 64,
      height: 64,
      backgroundColor: "transparent",
      border: "2px solid var(--accent-secondary)",
      mixBlendMode: "difference" as const,
    },
    drag: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(108, 99, 255, 0.1)",
      border: "2px solid var(--accent)",
      mixBlendMode: "difference" as const,
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: typeof window !== "undefined" ? undefined : 0,
          y: typeof window !== "undefined" ? undefined : 0,
        }}
      />
    </>
  );
}
