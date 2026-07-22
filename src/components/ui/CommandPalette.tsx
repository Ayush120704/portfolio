"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems, personalInfo } from "@/lib/data";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = navItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    (listRef.current?.children[selected] as HTMLElement)?.scrollIntoView({
      block: "nearest",
    });
  }, [selected]);

  const execute = useCallback(
    (item: (typeof navItems)[0]) => {
      setOpen(false);
      if ("section" in item && item.section) {
        document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" });
      } else if (item.action === "resume") {
        window.open(personalInfo.resumeUrl, "_blank");
      } else if (item.action === "github") {
        window.open(personalInfo.github, "_blank");
      } else if (item.action === "leetcode") {
        window.open(personalInfo.leetcode, "_blank");
      }
    },
    []
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[91] w-[480px] max-w-[calc(100vw-2rem)] glass-card rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--border-color)" }}>
              <svg className="w-4 h-4 shrink-0" style={{ color: "var(--text-secondary)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelected((prev) => Math.min(prev + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelected((prev) => Math.max(prev - 1, 0));
                  } else if (e.key === "Enter" && filtered[selected]) {
                    execute(filtered[selected]);
                  }
                }}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)" }}
              />
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded border"
                style={{
                  color: "var(--text-tertiary)",
                  borderColor: "var(--border-color)",
                }}
              >
                ESC
              </kbd>
            </div>

            <div ref={listRef} className="max-h-72 overflow-y-auto p-2" style={{ scrollbarWidth: "thin" }}>
              {filtered.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => execute(item)}
                  onMouseEnter={() => setSelected(i)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-left transition-colors duration-150"
                  style={{
                    color: i === selected ? "var(--text-primary)" : "var(--text-secondary)",
                    backgroundColor: i === selected ? "rgba(255,255,255,0.08)" : "transparent",
                  }}
                >
                  <span>{item.name}</span>
                  <kbd
                    className="text-[10px] px-1.5 py-0.5 rounded border"
                    style={{
                      color: "var(--text-tertiary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    {item.shortcut}
                  </kbd>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-xs text-center py-6" style={{ color: "var(--text-tertiary)" }}>
                  No results found
                </p>
              )}
            </div>

            <div
              className="px-5 py-2.5 border-t flex items-center gap-4 text-[10px]"
              style={{
                color: "var(--text-tertiary)",
                borderColor: "var(--border-color)",
              }}
            >
              <span>Ctrl+K to toggle</span>
              <span>&uarr;&darr; to navigate</span>
              <span>&crarr; to select</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
