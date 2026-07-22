"use client";

import { create } from "zustand";

interface PortfolioStore {
  theme: "dark" | "light";
  toggleTheme: () => void;
  isLoaded: boolean;
  setLoaded: (loaded: boolean) => void;
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
}));
