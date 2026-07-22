"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import { personalInfo } from "@/lib/data";

const navItems = [
  { name: "Home", section: "home" },
  { name: "About", section: "about" },
  { name: "Skills", section: "skills" },
  { name: "Projects", section: "projects" },
  { name: "Timeline", section: "timeline" },
  { name: "Contact", section: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = usePortfolioStore();
  const isDark = theme === "dark";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => scrollTo("home")}
            className="text-sm font-semibold tracking-tight text-text-primary hover:text-accent transition-colors"
          >
            {personalInfo.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollTo(item.section)}
                className={`px-3 py-1.5 text-xs rounded-full transition-all duration-300 ${
                  activeSection === item.section
                    ? "text-accent bg-accent/10"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-xs transition-all duration-300 hover:border-accent/30"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-8 h-8 rounded-full glass-card flex items-center justify-center text-xs"
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-64 glass-card p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-text-primary"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollTo(item.section)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                      activeSection === item.section
                        ? "text-accent bg-accent/10"
                        : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
