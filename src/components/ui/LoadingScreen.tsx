"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";

const loadingTexts = [
  "Initializing neural networks...",
  "Loading AI models...",
  "Warming up GPUs...",
  "Connecting to vector database...",
  "Calibrating sensors...",
  "Almost ready...",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [show, setShow] = useState(true);
  const { setLoaded } = usePortfolioStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1 + Math.floor(Math.random() * 3);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setShow(false);
        setLoaded(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, setLoaded]);

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * loadingTexts.length),
      loadingTexts.length - 1
    );
    setTextIndex(idx);
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          <div className="text-center space-y-8">
            <div className="space-y-2">
              <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs"
                style={{ color: "var(--accent)" }}
              >
                {loadingTexts[textIndex]}
              </motion.p>
            </div>

            <div
              className="w-48 h-[2px] rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--border-color)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                {Math.min(progress, 100)}%
              </motion.span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
