"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";
import { Sun, Moon, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme, activeSection, setCursorVariant } =
    usePortfolioStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#hero"
          className="text-xl font-bold gradient-text"
          onMouseEnter={() => setCursorVariant("link")}
          onMouseLeave={() => setCursorVariant("default")}
          whileHover={{ scale: 1.05 }}
        >
          AM
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-300 relative ${
                activeSection === link.href.slice(1)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
              whileHover={{ y: -2 }}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass"
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
          <motion.button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm text-muted hover:text-foreground py-2 px-3 rounded-lg hover:bg-surface transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
