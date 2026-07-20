"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import TiltCard from "@/components/ui/TiltCard";

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
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="backdrop-blur-sm bg-background/30 rounded-3xl p-4 sm:p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-accent" />
          <span className="text-xs sm:text-sm text-accent font-mono uppercase tracking-widest">
            Skills
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16">
          Tech <span className="gradient-text">stack</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map(([category, items], catIndex) => (
            <TiltCard key={category} className="gsap-reveal" intensity={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden group hover:border-accent/20 transition-all duration-500 h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
                <div className="relative z-10">
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 gradient-text">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {items.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: catIndex * 0.1 + i * 0.04,
                          duration: 0.4,
                          ease: "backOut",
                        }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "var(--accent)",
                          color: "white",
                        }}
                        className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-surface text-[10px] sm:text-xs md:text-sm text-muted transition-colors cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
