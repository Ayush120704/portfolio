"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { terminalCommands, personalInfo } from "@/lib/data";

interface Line {
  type: "input" | "output";
  text: string;
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: 'Welcome to Ayush\'s Terminal. Type "help" for commands.' },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "input", text: cmd }]);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }
    if (trimmed === "resume") {
      window.open(personalInfo.resumeUrl, "_blank");
    }
    const reply = terminalCommands[trimmed] || `Command not found: "${trimmed}". Type "help" for available commands.`;
    setLines((prev) => [...prev, { type: "output", text: reply }]);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-[60] w-14 h-14 rounded-full glass-card flex items-center justify-center transition-all duration-300"
        style={{
          border: "1px solid var(--accent-dim)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-mono text-sm font-bold" style={{ color: "var(--accent)" }}> &gt;_</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="terminal-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-[60] w-[400px] max-w-[calc(100vw-3rem)] glass-card rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#f87171", opacity: 0.7 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#fbbf24", opacity: 0.7 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#34d399", opacity: 0.7 }} />
              </div>
              <span className="text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>
                ayush@portfolio ~ $
              </span>
            </div>

            <div
              className="h-72 overflow-y-auto p-4 font-mono text-xs"
              style={{ scrollbarWidth: "thin" }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className="mb-1.5">
                  {line.type === "input" ? (
                    <div className="flex gap-2">
                      <span className="shrink-0" style={{ color: "var(--accent)" }}>$</span>
                      <span style={{ color: "var(--text-primary)" }}>{line.text}</span>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {line.text}
                    </pre>
                  )}
                </div>
              ))}
              <div ref={scrollRef} />
              <div className="flex gap-2 mt-1">
                <span className="shrink-0" style={{ color: "var(--accent)" }}>$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommand(input);
                      setInput("");
                    }
                  }}
                  className="flex-1 bg-transparent outline-none"
                  style={{ color: "var(--text-primary)" }}
                  placeholder="Type a command..."
                  spellCheck={false}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
