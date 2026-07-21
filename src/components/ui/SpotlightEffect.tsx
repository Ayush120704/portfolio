"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

export default function SpotlightEffect() {
  const mouse = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        opacity: 1,
        willChange: "background",
        transform: "translateZ(0)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mouse.clientX}px ${mouse.clientY}px, rgba(108, 99, 255, 0.07), transparent 40%)`,
          willChange: "background",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(400px circle at ${mouse.clientX}px ${mouse.clientY}px, rgba(0, 212, 170, 0.04), transparent 40%)`,
          willChange: "background",
        }}
      />
    </div>
  );
}
