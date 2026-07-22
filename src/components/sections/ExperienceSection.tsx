"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { timeline, experience, achievements } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";

function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";

  return (
    <section id="timeline" ref={ref} className="py-28 md:py-40 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-18"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
            style={{ color: "var(--accent)" }}
          >
            Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            My path in <span style={{ color: "var(--accent)" }}>tech</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="timeline-line" />
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={`${item.year}-${i}`}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`relative flex items-center mb-10 md:mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    isLeft ? "md:text-right md:pr-14" : "md:text-left md:pl-14"
                  } pl-14 md:pl-0`}
                >
                  <div className="glass-card rounded-xl p-6 inline-block max-w-sm hover:border-accent/20 transition-all duration-300">
                    <span
                      className="font-mono text-xs block mb-1.5"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs mt-1.5 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.detail}
                    </p>
                  </div>
                </div>
                <div
                  className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full z-10"
                  style={{
                    backgroundColor: "var(--accent)",
                    border: "2px solid var(--bg-primary)",
                    boxShadow: isDark
                      ? "0 0 12px var(--accent-glow)"
                      : "0 0 8px rgba(3,105,161,0.2)",
                  }}
                />
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MilestonesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";

  return (
    <section id="achievements" ref={ref} className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
            style={{ color: "var(--accent)" }}
          >
            Achievements
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">
            Milestones & Recognition<span style={{ color: "var(--accent)" }}>.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map((item, i) => (
              <motion.div
                key={`${item.number}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-xl p-5 group hover:border-accent/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span
                  className="font-mono text-lg font-bold block mb-2"
                  style={{ color: "var(--accent)" }}
                >
                  {item.number}
                </span>
                <p
                  className="text-xs leading-relaxed group-hover:text-text-primary transition-colors duration-300"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xs font-medium uppercase tracking-wider mb-5" style={{ color: "var(--text-secondary)" }}>
                Experience
              </h3>
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className={`${i < experience.length - 1 ? "mb-5 pb-5" : ""}`}
                  style={{
                    borderBottom:
                      i < experience.length - 1
                        ? "1px solid var(--border-color)"
                        : "none",
                  }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {exp.title}
                    </h4>
                    <span
                      className="text-[10px] shrink-0 ml-4"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    {exp.company} — {exp.location}
                  </p>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded-full"
                        style={{
                          backgroundColor: isDark
                            ? "rgba(255,255,255,0.03)"
                            : "rgba(0,0,0,0.03)",
                          color: "var(--text-tertiary)",
                          border: "1px solid var(--border-color)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ExperienceSection() {
  return (
    <>
      <TimelineSection />
      <MilestonesSection />
    </>
  );
}
