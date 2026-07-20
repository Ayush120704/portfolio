"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { Briefcase } from "lucide-react";

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    if (isInView) setActiveSection("experience");
  }, [isInView, setActiveSection]);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      <div className="backdrop-blur-sm bg-background/30 rounded-3xl p-4 sm:p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-accent" />
          <span className="text-xs sm:text-sm text-accent font-mono uppercase tracking-widest">
            Experience
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16">
          My <span className="gradient-text">journey</span>
        </h2>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-secondary to-transparent hidden md:block" />

          <div className="space-y-6 sm:space-y-8 lg:space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="relative pl-2 sm:pl-4 md:pl-14 lg:pl-16 gsap-reveal"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.1, duration: 0.4, ease: "backOut" }}
                  className="absolute left-1 sm:left-3 md:left-4 top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent items-center justify-center hidden md:flex shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                >
                  <Briefcase size={10} className="text-white" />
                </motion.div>

                <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden group hover:border-accent/20 transition-all duration-500">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="text-[10px] sm:text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-xs sm:text-sm text-accent-secondary mb-2 sm:mb-3">
                      {exp.company} · {exp.location}
                    </p>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mb-3 sm:mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-surface text-[10px] sm:text-xs text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
