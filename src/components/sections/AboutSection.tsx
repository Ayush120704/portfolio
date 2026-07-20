"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { MapPin, Award, BookOpen } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    if (isInView) setActiveSection("about");
  }, [isInView, setActiveSection]);

  return (
    <section
      id="about"
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
            About
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Building the{" "}
              <span className="gradient-text">future</span> with AI
            </h2>

            <div className="space-y-4 text-muted leading-relaxed">
              {personalInfo.bio.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: <BookOpen size={20} />,
                title: "Education",
                text: "B.Tech CSE @ United Institute of Technology, Prayagraj (2027) — 8.31 CGPA",
              },
              {
                icon: <Award size={20} />,
                title: "Achievements",
                text: "GATE CSE 2026 Qualified · AIT Bangkok Internship · 90% Merit Scholarship",
              },
              {
                icon: <MapPin size={20} />,
                title: "Location",
                text: "India · Open to remote & on-site opportunities worldwide",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-accent">{item.icon}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
