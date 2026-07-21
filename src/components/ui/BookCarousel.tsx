"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* -- Types ------------------------------------------- */
interface PageItem {
  title?: string;
  color?: string;
}

interface BookCarouselProps<T extends PageItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

/* -- Easing ------------------------------------------- */
const FLIP_EASE = [0.4, 0, 0.2, 1] as const;
const FLIP_DURATION = 0.6;
const REVEAL_DELAY = 0.08;

/* -- Component --------------------------------------- */
export default function BookCarousel<T extends PageItem>({
  items,
  renderItem,
  className = "",
}: BookCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipTarget, setFlipTarget] = useState<number | null>(null);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [isHovered, setIsHovered] = useState(false);
  const [revealStarted, setRevealStarted] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flippingRef = useRef(false);
  flippingRef.current = isFlipping;

  /* -- Navigation ------------------------------------ */
  const goTo = useCallback(
    (index: number) => {
      if (flippingRef.current) return;
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      if (clamped === currentIndex) return;
      setFlipDir(clamped > currentIndex ? "next" : "prev");
      setFlipTarget(clamped);
      setRevealStarted(false);
      setIsFlipping(true);
    },
    [currentIndex, items.length]
  );

  const goToNext = useCallback(() => {
    if (!flippingRef.current && currentIndex < items.length - 1) {
      setFlipDir("next");
      setFlipTarget(currentIndex + 1);
      setRevealStarted(false);
      setIsFlipping(true);
    }
  }, [currentIndex, items.length]);

  const goToPrev = useCallback(() => {
    if (!flippingRef.current && currentIndex > 0) {
      setFlipDir("prev");
      setFlipTarget(currentIndex - 1);
      setRevealStarted(false);
      setIsFlipping(true);
    }
  }, [currentIndex]);

  /* -- Keyboard -------------------------------------- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToPrev, goToNext]);

  /* -- Autoplay -------------------------------------- */
  useEffect(() => {
    if (isHovered || items.length <= 1) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(() => {
      if (!flippingRef.current && currentIndex < items.length - 1) {
        setFlipDir("next");
        setFlipTarget(currentIndex + 1);
        setRevealStarted(false);
        setIsFlipping(true);
      }
    }, 5000);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isHovered, items.length, currentIndex]);

  /* -- Trigger clip-path reveal mid-flip ------------- */
  useEffect(() => {
    if (isFlipping && !revealStarted) {
      const timer = setTimeout(() => setRevealStarted(true), REVEAL_DELAY * 1000);
      return () => clearTimeout(timer);
    }
  }, [isFlipping, revealStarted]);

  /* -- Flip completion ------------------------------- */
  const onFlipComplete = () => {
    if (flipTarget !== null) setCurrentIndex(flipTarget);
    setFlipTarget(null);
    setRevealStarted(false);
    setIsFlipping(false);
  };

  const targetIndex = flipTarget ?? currentIndex;
  const isForward = flipDir === "next";
  const accent = (items[currentIndex] as any)?.color ?? "#6c63ff";
  const targetAccent = (items[targetIndex] as any)?.color ?? "#6c63ff";

  /* -- Render ---------------------------------------- */
  return (
    <div
      className={`select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* -- Page-turn area ---------------------------- */}
      <div
        className="relative mx-auto w-full overflow-visible"
        style={{ perspective: "1600px" }}
      >
        <div
          className="relative w-full min-h-[420px] sm:min-h-[460px] rounded-xl border border-white/10 bg-[#0a0a14] overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Persistent dark backdrop */}
          <div className="absolute inset-0 bg-[#0a0a14] z-0" />

          {!isFlipping ? (
            /* ══════  STATIC VIEW  ══════ */
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              {/* Project accent glow behind card */}
              <div
                className="absolute -inset-8 rounded-[40px] pointer-events-none opacity-60"
                style={{
                  background: `radial-gradient(ellipse at 50% 40%, ${accent}22 0%, transparent 70%)`,
                  filter: "blur(40px)",
                  willChange: "opacity",
                }}
              />
              {renderItem(items[currentIndex], currentIndex)}
            </motion.div>
          ) : (
            /* ══════  FLIPPING VIEW  ══════ */
            <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>

              {/* -- BOTTOM LAYER: incoming page -- */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: revealStarted
                    ? "circle(150% at 50% 50%)"
                    : "circle(0% at 50% 50%)",
                  transition: revealStarted
                    ? `clip-path 0.55s cubic-bezier(0.4, 0, 0.2, 1) ${REVEAL_DELAY}s`
                    : "none",
                  willChange: "clip-path",
                }}
              >
                {/* Accent glow on reveal edge */}
                <div
                  className="absolute -inset-8 rounded-[40px] pointer-events-none opacity-60"
                  style={{
                    background: `radial-gradient(ellipse at 50% 40%, ${targetAccent}33 0%, transparent 70%)`,
                    filter: "blur(40px)",
                    willChange: "opacity",
                  }}
                />

                {/* Circular reveal ring */}
                <div
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    boxShadow: revealStarted
                      ? `inset 0 0 60px ${targetAccent}15, 0 0 80px ${targetAccent}10`
                      : "none",
                    transition: revealStarted
                      ? "box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                      : "none",
                    willChange: "box-shadow",
                  }}
                />

                {renderItem(items[targetIndex], targetIndex)}
              </div>

              {/* -- TOP LAYER: page flipping away -- */}
              <motion.div
                className="absolute inset-0"
                style={{
                  transformOrigin: isForward ? "left center" : "right center",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                initial={false}
                animate={{ rotateY: isForward ? -88 : 88 }}
                transition={{
                  duration: FLIP_DURATION,
                  ease: FLIP_EASE,
                }}
                onAnimationComplete={onFlipComplete}
              >
                {/* Fold-shadow on the lifting edge */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none z-10"
                  style={{
                    background: isForward
                      ? `linear-gradient(270deg, rgba(0,0,0,0.35) 0%, ${accent}15 25%, transparent 55%)`
                      : `linear-gradient(90deg, rgba(0,0,0,0.35) 0%, ${accent}15 25%, transparent 55%)`,
                    willChange: "opacity",
                  }}
                />

                {/* Paper backface */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    backgroundColor: "#0d0d1a",
                    backgroundImage: `linear-gradient(135deg, ${accent}08 0%, transparent 50%)`,
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "visible",
                  }}
                />

                {/* Surface shine */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: isForward
                      ? `linear-gradient(270deg, ${accent}08 0%, transparent 40%)`
                      : `linear-gradient(90deg, ${accent}08 0%, transparent 40%)`,
                    willChange: "opacity",
                  }}
                />

                {renderItem(items[currentIndex], currentIndex)}
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* -- Navigation --------------------------------- */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <motion.button
          onClick={goToPrev}
          disabled={currentIndex === 0 || isFlipping}
          className="group relative p-3 rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-300 disabled:opacity-15 disabled:cursor-not-allowed"
          whileHover={{ scale: currentIndex > 0 && !isFlipping ? 1.12 : 1 }}
          style={{
            borderColor: currentIndex > 0 && !isFlipping ? `${accent}44` : undefined,
          }}
          aria-label="Previous project"
        >
          <ChevronLeft size={18} />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${accent}18 0%, transparent 70%)`,
            }}
          />
        </motion.button>

        {/* Page indicator dots */}
        <div className="flex items-center gap-2">
          {items.map((_, index) => {
            const active = index === (isFlipping ? targetIndex : currentIndex);
            const near = Math.abs(index - (isFlipping ? targetIndex : currentIndex)) <= 2 && !active;
            const c = active ? accent : near ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)";
            return (
              <button
                key={index}
                onClick={() => goTo(index)}
                className="relative rounded-full transition-all duration-500"
                style={{
                  width: active ? 30 : near ? 8 : 5,
                  height: 5,
                  backgroundColor: c,
                  boxShadow: active ? `0 0 10px ${accent}55` : "none",
                }}
                aria-label={`Go to project ${index + 1}`}
              />
            );
          })}
        </div>

        <motion.button
          onClick={goToNext}
          disabled={currentIndex === items.length - 1 || isFlipping}
          className="group relative p-3 rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-300 disabled:opacity-15 disabled:cursor-not-allowed"
          whileHover={{ scale: currentIndex < items.length - 1 && !isFlipping ? 1.12 : 1 }}
          style={{
            borderColor: currentIndex < items.length - 1 && !isFlipping ? `${accent}44` : undefined,
          }}
          aria-label="Next project"
        >
          <ChevronRight size={18} />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${accent}18 0%, transparent 70%)`,
            }}
          />
        </motion.button>
      </div>
    </div>
  );
}
