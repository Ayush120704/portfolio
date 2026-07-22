"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { aboutParagraphs, personalInfo } from "@/lib/data";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-28 md:py-40 px-6 relative"
    >
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
            About
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Who <span style={{ color: "var(--accent)" }}>am I</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {aboutParagraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              {["PyTorch", "React", "NLP", "Computer Vision", "MongoDB"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-full"
                    style={{
                      backgroundColor: "var(--accent-dim)",
                      border: "1px solid var(--accent)",
                      color: "var(--accent)",
                      opacity: 0.8,
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: "Experience", value: "2+ Years", sub: "Coding" },
              { label: "Projects", value: "8+", sub: "Built" },
              { label: "LeetCode", value: "151", sub: "Day Streak" },
              { label: "CGPA", value: "8.31", sub: "Academic" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-6 text-center hover:border-accent/20 transition-all duration-300"
              >
                <div
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
