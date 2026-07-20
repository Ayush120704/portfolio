"use client";

import { personalInfo } from "@/lib/data";
import { Code, ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden z-10">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/5 rounded-full blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent-secondary/5 rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold gradient-text mb-2">AM</div>
            <p className="text-xs sm:text-sm text-muted max-w-xs">
              Building intelligent systems with AI, NLP, and modern web technologies.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-surface"
            >
              <Code size={12} />
              GitHub
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-surface"
            >
              <ExternalLink size={12} />
              LeetCode
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-surface"
            >
              <Mail size={12} />
              Email
            </a>
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-surface"
              >
                <ExternalLink size={12} />
                LinkedIn
              </a>
            )}
            {personalInfo.twitter && (
              <a
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-surface"
              >
                <ExternalLink size={12} />
                Twitter
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="text-[10px] sm:text-xs text-muted/60">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="text-[10px] sm:text-xs text-muted/40 font-mono">
            Built with Next.js + Three.js + GSAP
          </div>
        </div>
      </div>
    </footer>
  );
}
