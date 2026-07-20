"use client";

import { create } from "zustand";

interface PortfolioStore {
  theme: "dark" | "light";
  toggleTheme: () => void;
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
  loadProgress: number;
  setLoadProgress: (progress: number) => void;
  cursorVariant: "default" | "link" | "button" | "drag";
  setCursorVariant: (variant: "default" | "link" | "button" | "drag") => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  theme: "dark",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", newTheme);
      }
      return { theme: newTheme };
    }),
  isLoaded: false,
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  loadProgress: 0,
  setLoadProgress: (progress) => set({ loadProgress: progress }),
  cursorVariant: "default",
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
}));
