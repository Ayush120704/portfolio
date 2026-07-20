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
      className="relative py-32 px-6 max-w-4xl mx-auto"
    >
      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 max-w-[60px] bg-accent" />
          <span className="text-sm text-accent font-mono uppercase tracking-widest">
            Experience
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          My <span className="gradient-text">journey</span>
        </h2>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent-secondary to-transparent hidden md:block" />

          <div className="space-y-12">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="relative pl-14 md:pl-16 gsap-reveal"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.1, duration: 0.4, ease: "backOut" }}
                  className="absolute left-4 top-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center hidden md:flex shadow-[0_0_20px_rgba(108,99,255,0.4)]"
                >
                  <Briefcase size={10} className="text-white" />
                </motion.div>

                <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-accent/20 transition-all duration-500">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-sm text-accent-secondary mb-3">
                      {exp.company} · {exp.location}
                    </p>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md bg-surface text-xs text-muted"
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
