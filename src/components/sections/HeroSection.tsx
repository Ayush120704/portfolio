"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const roles = [
  "AI/ML Engineer",
  "Full-Stack Developer",
  "Open Source Enthusiast",
  "Problem Solver",
];

export default function HeroSection() {
  const ref = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayText === current) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayText === "") {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            deleting
              ? current.slice(0, displayText.length - 1)
              : current.slice(0, displayText.length + 1)
          );
        },
        deleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, deleting, roleIndex]);

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
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
              Available for opportunities
            </span>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-8 flex items-center justify-center mb-6"
        >
          <span className="text-base md:text-lg font-mono" style={{ color: "var(--text-secondary)" }}>
            <span style={{ color: "var(--accent)" }}>&gt; </span>
            {displayText}
            <span className="animate-pulse" style={{ color: "var(--accent)" }}>|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Building intelligent systems with AI, NLP, and modern web technologies.
          GATE CSE 2026 qualified &amp; International Innovation Intern at Collab4Good Bangkok.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-center gap-3 mt-5 flex-wrap"
        >
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ backgroundColor: "var(--accent-dim)", color: "var(--accent)", border: "1px solid var(--accent-dim)" }}>
            GATE CSE 2026
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ backgroundColor: "rgba(167,139,250,0.15)", color: "var(--purple)", border: "1px solid rgba(167,139,250,0.2)" }}>
            AIT Bangkok Intern
          </span>
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ backgroundColor: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}>
            151-Day LeetCode Streak
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-10 flex-wrap"
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
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 glass-card hover:border-accent/30 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
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
