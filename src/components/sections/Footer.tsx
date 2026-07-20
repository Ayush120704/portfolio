"use client";

import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
          reserved.
        </div>
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            LeetCode
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
