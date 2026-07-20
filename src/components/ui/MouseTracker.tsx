"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MouseTracker() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={dotRef}
      className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9998] hidden md:block"
      style={{ backgroundColor: "var(--accent)", mixBlendMode: "difference" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    />
  );
}
