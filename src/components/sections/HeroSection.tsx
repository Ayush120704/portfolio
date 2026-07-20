"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { personalInfo, stats } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { ChevronDown } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
  ),
});

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });
  const { setActiveSection, setCursorVariant } = usePortfolioStore();

  useEffect(() => {
    if (isInView) setActiveSection("hero");
  }, [isInView, setActiveSection]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full glass text-sm text-muted mb-6">
            Open to opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          {personalInfo.name.split(" ").map((word, i) => (
            <span key={word} className="block">
              {i === 1 ? (
                <span className="gradient-text">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-muted mb-4"
        >
          {personalInfo.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm text-muted/60 mb-10"
        >
          {personalInfo.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs text-muted mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-accent text-white font-medium text-sm hover:bg-accent/80 transition-colors"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full glass font-medium text-sm hover:bg-surface-hover transition-colors"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
