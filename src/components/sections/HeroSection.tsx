"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function HeroSection() {
  const ref = useRef(null);

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--accent-dim) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-6 font-medium"
            style={{ color: "var(--accent)" }}
          >
            Full-Stack Developer & AI Engineer
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6"
        >
          Hi, I&apos;m{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--accent), var(--purple))",
            }}
          >
            {personalInfo.name.split(" ")[0]}
          </span>
          <br />
          {personalInfo.name.split(" ").slice(1).join(" ")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Building intelligent systems with AI, NLP, and modern web technologies.
          Currently focused on multimodal AI and full-stack development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
              boxShadow: "0 4px 20px var(--accent-glow)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 6px 30px var(--accent-glow)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 4px 20px var(--accent-glow)")
            }
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 glass-card hover:border-accent/30"
          >
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
            style={{ borderColor: "var(--text-tertiary)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
