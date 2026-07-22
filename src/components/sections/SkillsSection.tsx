"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { skills } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";

const proficiency: Record<string, number> = {
  PyTorch: 85,
  "Hugging Face": 80,
  BERT: 82,
  ALBERT: 75,
  "Fine-Tuning": 88,
  "Transfer Learning": 78,
  "NLP Preprocessing": 90,
  "Cognitive Distortion Detection": 85,
  "Facial Emotion Recognition": 80,
  DeepFace: 78,
  OpenCV: 82,
  "RAG Pipelines": 85,
  ChromaDB: 80,
  "LLM Integration": 82,
  "Vector Databases": 78,
  "Prompt Engineering": 88,
  Python: 92,
  Java: 70,
  JavaScript: 85,
  TypeScript: 75,
  React: 85,
  "Next.js": 80,
  "Node.js": 82,
  FastAPI: 78,
  NumPy: 88,
  Pandas: 85,
  MongoDB: 80,
  MySQL: 72,
  "scikit-learn": 78,
  TensorFlow: 75,
  Git: 88,
  Docker: 72,
  Linux: 70,
  Postman: 80,
  "VS Code": 90,
  Vercel: 82,
  Netlify: 75,
};

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="glass-card rounded-2xl p-6 hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
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
              <div className="space-y-3">
                {group.items.map((item) => {
                  const level = proficiency[item] || 70;
                  return (
                    <div key={item}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{item}</span>
                        <span className="text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>{level}%</span>
                      </div>
                      <div
                        className="h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${level}%` } : {}}
                          transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: level > 80 ? "var(--accent)" : level > 60 ? "var(--purple)" : "var(--text-tertiary)" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
