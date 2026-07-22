"use client";

import { motion } from "framer-motion";
import { personalInfo, profileLinks } from "@/lib/data";

const links = [
  { icon: "📧", url: `mailto:${personalInfo.email}`, label: "Email" },
  { icon: "🔗", url: personalInfo.linkedin || "#", label: "LinkedIn" },
  { icon: "📦", url: personalInfo.github, label: "GitHub" },
  { icon: "⚡", url: personalInfo.leetcode, label: "LeetCode" },
  { icon: "📄", url: personalInfo.resumeUrl, label: "Resume" },
];

export default function SocialBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-sm transition-all duration-300 hover:border-accent/30 hover:-translate-y-0.5"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </motion.div>
  );
}
