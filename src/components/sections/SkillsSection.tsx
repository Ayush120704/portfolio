"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { skills } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";

  return (
    <section id="skills" ref={ref} className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
            style={{ color: "var(--accent)" }}
          >
            Skills & Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Tech <span style={{ color: "var(--accent)" }}>Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="glass-card rounded-2xl p-6 hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{
                    background: isDark
                      ? "rgba(79,209,255,0.08)"
                      : "rgba(3,105,161,0.06)",
                    border: isDark
                      ? "1px solid rgba(79,209,255,0.2)"
                      : "1px solid rgba(3,105,161,0.12)",
                  }}
                >
                  {group.icon}
                </div>
                <h3 className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: "var(--accent-dim)",
                      color: "var(--accent)",
                      opacity: 0.9,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
