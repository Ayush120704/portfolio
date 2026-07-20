"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioStore } from "@/lib/store";

export default function LoadingScreen() {
  const { isLoaded, setLoaded, loadProgress, setLoadProgress } =
    usePortfolioStore();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        setLoadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setLoaded(true);
          setTimeout(() => setShow(false), 500);
        }, 400);
      } else {
        setLoadProgress(Math.min(progress, 100));
      }
    }, 200);
    return () => clearInterval(interval);
  }, [setLoaded, setLoadProgress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="text-4xl font-bold gradient-text">AM</div>
            <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent), var(--accent-secondary))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <div className="text-sm text-muted font-mono">
              {Math.round(loadProgress)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
