"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePortfolioStore } from "@/lib/store";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const { theme } = usePortfolioStore();

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
    if (followerRef.current) {
      followerRef.current.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  const isDark = theme === "dark";

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9997]"
        style={{
          backgroundColor: isDark ? "#4fd1ff" : "#0369a1",
          transition: "width 0.2s, height 0.2s, background-color 0.3s",
          transform: "translate(0, 0)",
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9996] border will-change-transform"
        style={{
          borderColor: isDark ? "rgba(79,209,255,0.3)" : "rgba(3,105,161,0.3)",
          transition: "all 0.15s ease-out, background-color 0.3s",
          transform: "translate(0, 0)",
          backgroundColor: "transparent",
        }}
      />
    </>
  );
}
