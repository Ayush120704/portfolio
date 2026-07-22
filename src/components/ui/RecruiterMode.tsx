"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function RecruiterMode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.body.classList.add("recruiter-mode");
    } else {
      document.body.classList.remove("recruiter-mode");
    }
    return () => document.body.classList.remove("recruiter-mode");
  }, [active]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 0.5 }}
      className="fixed top-14 right-6 z-[45] flex flex-col items-end gap-2"
    >
      <button
        onClick={() => setActive(!active)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium transition-all duration-300 glass-card"
        style={{
          color: active ? "var(--accent)" : "var(--text-tertiary)",
          borderColor: active ? "var(--accent-dim)" : "var(--border-color)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: active ? "var(--accent)" : "var(--text-tertiary)",
          }}
        />
        Recruiter Mode
      </button>

      {active && (
        <motion.a
          initial={{ opacity: 0, y: -5, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="recruiter-badge flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-medium"
          style={{
            color: "var(--bg-primary)",
            backgroundColor: "var(--accent)",
            boxShadow: "0 4px 15px var(--accent-glow)",
          }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </motion.a>
      )}
    </motion.div>
  );
}
