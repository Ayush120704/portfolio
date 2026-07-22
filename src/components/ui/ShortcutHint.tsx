"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "portfolio_hint_seen";

export default function ShortcutHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setShow(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="shortcut-hint"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
        >
          <button
            onClick={dismiss}
            className="glass-card px-4 py-2 rounded-full text-xs flex items-center gap-2 hover:border-accent/30 transition-all duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ backgroundColor: "var(--accent-dim)", color: "var(--accent)" }}>
              Ctrl+K
            </kbd>
            <span>to navigate quickly</span>
            <span className="ml-2" style={{ color: "var(--text-tertiary)" }}>✕</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
