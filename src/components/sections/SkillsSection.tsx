"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    if (isInView) setActiveSection("skills");
  }, [isInView, setActiveSection]);

  const categories = Object.entries(skills);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 px-6 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 max-w-[60px] bg-accent" />
          <span className="text-sm text-accent font-mono uppercase tracking-widest">
            Skills
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Tech <span className="gradient-text">stack</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="font-semibold text-lg mb-4 gradient-text">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + i * 0.03 }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "var(--accent)",
                      color: "white",
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface text-sm text-muted transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
