"use client";

import { usePortfolioStore } from "@/lib/store";

export default function Footer() {
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";

  return (
    <footer
      className="py-10 px-6"
      style={{
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>Built with React & Next.js</span>
          <span style={{ color: "var(--text-tertiary)" }}>✦</span>
          <span>Designed by Ayush Mishra</span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          &copy; {new Date().getFullYear()} Ayush Mishra
        </p>
      </div>
    </footer>
  );
}
