"use client";

import { useState, useCallback, useEffect, useRef, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolioStore } from "@/lib/store";

/* -- Types ------------------------------------------- */
interface PyramidItem {
  title?: string;
  color?: string;
}

interface PyramidCarouselProps<T extends PyramidItem> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  direction?: "horizontal" | "vertical";
}

/* -- Constants --------------------------------------- */
const ROTATION_SPEED = 10;
const AUTO_ROTATE_DELAY = 4000;
const SNAP_DURATION = 700;
const VISIBLE_ARC = 100;
const MOBILE_BREAKPOINT = 640;
const SNAP_LERP_FACTOR = 10; // multiplier for snap deceleration

/* -- Memoised single panel --------------------------- */
const Panel = memo(function Panel({
  style,
  children,
}: {
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      style={style}
    >
      {children}
    </div>
  );
});

/* -- Component --------------------------------------- */
export default function PyramidCarousel<T extends PyramidItem>({
  items,
  renderItem,
  className = "",
  direction = "horizontal",
}: PyramidCarouselProps<T>) {
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";

  /* -- State ---------------------------------------- */
  const [rotation, setRotation] = useState(0);
  const [frontIndex, setFrontIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [interactionLock, setInteractionLock] = useState(false);

  /* -- Refs ----------------------------------------- */
  const rAF = useRef<number>(0);
  const lastTime = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frontRef = useRef(frontIndex);
  frontRef.current = frontIndex;
  const wasAutoRotating = useRef(true);
  const snapTargetRef = useRef<number | null>(null);
  const autoRotatingRef = useRef(isAutoRotating);
  autoRotatingRef.current = isAutoRotating;
  const hoveredRef = useRef(isHovered);
  hoveredRef.current = isHovered;
  const lockRef = useRef(interactionLock);
  lockRef.current = interactionLock;

  /* -- Geometry ------------------------------------- */
  const count = items.length;
  const angleStep = 360 / count;
  const isVert = direction === "vertical";
  const pWidth = isMobile ? (isVert ? 160 : 150) : (isVert ? 220 : 200);
  const pHeight = isMobile ? (isVert ? 180 : 190) : (isVert ? 240 : 250);
  const radius = isMobile ? (isVert ? 210 : 220) : (isVert ? 290 : 300);

  /* -- Responsive ----------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* -- Front-index helper --------------------------- */
  const computeFront = useCallback(
    (rot: number) => {
      const norm = ((rot % 360) + 360) % 360;
      return Math.round(((360 - norm) % 360) / angleStep) % count;
    },
    [angleStep, count]
  );

  /* -- Track front index via rotation changes ------- */
  useEffect(() => {
    const fi = computeFront(rotation);
    if (fi !== frontRef.current) {
      frontRef.current = fi;
      setFrontIndex(fi);
    }
  }, [rotation, computeFront]);

  /* -- Single unified rAF loop ---------------------- */
  useEffect(() => {
    lastTime.current = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime.current) / 1000, 0.1);
      lastTime.current = now;

      if (snapTargetRef.current !== null) {
        setRotation((prev) => {
          const remaining = snapTargetRef.current! - prev;
          if (Math.abs(remaining) < 0.3) {
            const t = snapTargetRef.current!;
            snapTargetRef.current = null;
            setInteractionLock(false);
            if (wasAutoRotating.current) {
              // Resume auto-rotation via the timer effect below
              if (resumeTimer.current) clearTimeout(resumeTimer.current);
              resumeTimer.current = setTimeout(() => {
                if (wasAutoRotating.current) setIsAutoRotating(true);
              }, AUTO_ROTATE_DELAY);
            }
            return t;
          }
          return prev + remaining * Math.min(dt * SNAP_LERP_FACTOR, 0.6);
        });
      } else if (autoRotatingRef.current && !hoveredRef.current) {
        setRotation((prev) => prev + ROTATION_SPEED * dt);
      }

      rAF.current = requestAnimationFrame(tick);
    };

    rAF.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rAF.current);
  }, []);

  /* -- Snap rotation -------------------------------- */
  const snapTo = useCallback(
    (targetIndex: number) => {
      if (lockRef.current || targetIndex === frontRef.current) return;
      setInteractionLock(true);

      wasAutoRotating.current = autoRotatingRef.current;
      setIsAutoRotating(false);

      const current = rotation;
      const targetAngle = ((-angleStep * targetIndex) % 360 + 360) % 360;
      let delta = targetAngle - ((current % 360) + 360) % 360;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      const target = current + delta;

      if (!isVert) {
        // Horizontal: use CSS transition on track element
        const el = trackRef.current;
        if (!el) {
          setRotation(target);
          setFrontIndex(targetIndex);
          frontRef.current = targetIndex;
          setInteractionLock(false);
          return;
        }
        el.style.transition = `transform ${SNAP_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        el.style.transform = `rotateY(${target}deg)`;
        const onEnd = () => {
          el.removeEventListener("transitionend", onEnd);
          el.style.transition = "";
          setRotation(target);
          setFrontIndex(targetIndex);
          frontRef.current = targetIndex;
          setInteractionLock(false);
          if (resumeTimer.current) clearTimeout(resumeTimer.current);
          resumeTimer.current = setTimeout(() => {
            if (wasAutoRotating.current) setIsAutoRotating(true);
          }, AUTO_ROTATE_DELAY);
        };
        el.addEventListener("transitionend", onEnd);
      } else {
        // Vertical: rAF loop lerps toward snapTarget
        snapTargetRef.current = target;
      }
    },
    [rotation, angleStep, isVert]
  );

  const goToNext = useCallback(
    () => snapTo((frontRef.current + 1) % count),
    [snapTo, count]
  );
  const goToPrev = useCallback(
    () => snapTo((frontRef.current - 1 + count) % count),
    [snapTo, count]
  );

  /* -- Keyboard ------------------------------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToPrev, goToNext]);

  /* -- Resume auto-rotation when leaving hover ----- */
  useEffect(() => {
    if (!isHovered && !interactionLock && !isAutoRotating) {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        if (wasAutoRotating.current) setIsAutoRotating(true);
      }, AUTO_ROTATE_DELAY);
    }
    return () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); };
  }, [isHovered, interactionLock, isAutoRotating]);

  /* -- Panel helpers -------------------------------- */
  const getPanelAngle = (index: number) => angleStep * index;
  const frontColor = (items[frontIndex] as any)?.color ?? "#6c63ff";

  /* -- Render ---------------------------------------- */
  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* -- Scene container --------------------------- */}
      <div
        className="relative mx-auto w-full overflow-visible"
        style={{
          perspective: isMobile ? "600px" : "1000px",
          minHeight: isVert
            ? (isMobile ? 340 : 480)
            : (isMobile ? 280 : 380),
        }}
      >
        {/* Shadow beneath formation */}
        {!isVert && (
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
            style={{
              bottom: isMobile ? -5 : 10,
              width: isMobile ? 180 : 280,
              height: isMobile ? 20 : 40,
              background: isDark
                ? "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)"
                : "radial-gradient(ellipse, rgba(0,0,0,0.10) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        )}

        {/* -- Rotating track ---------------------------- */}
        <div
          ref={trackRef}
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: isVert ? "none" : `rotateY(${rotation}deg)`,
            height: isVert
              ? (isMobile ? 260 : 380)
              : (isMobile ? 240 : 340),
            willChange: "transform",
          }}
        >
          {items.map((item, index) => {
            const angle = getPanelAngle(index);
            // For vertical, each panel uses the full world angle (includes rotation)
            // so it can counter-rotate to always face the viewer.
            const worldAngle = isVert
              ? ((angle + rotation) % 360 + 360) % 360
              : ((angle + rotation) % 360 + 360) % 360;
            let dist = Math.min(worldAngle, 360 - worldAngle);
            const hidden = dist > VISIBLE_ARC;

            const opacity = 1 - (dist / VISIBLE_ARC) * 0.8;
            const blur = (dist / VISIBLE_ARC) * 3;

            const isFront = index === frontIndex;
            const accent = (item as any)?.color ?? "#6c63ff";

            // Vertical: position on vertical circle + counter-rotate to face viewer
            const panelAngle = isVert ? angle + rotation : angle;
            const panelTransform = isVert
              ? `rotateX(${panelAngle}deg) translateZ(${radius}px) rotateX(${-panelAngle}deg)`
              : `rotateY(${angle}deg) translateZ(${radius}px) rotateX(${-10}deg)`;

            return (
              <Panel key={index} style={{ transformStyle: "preserve-3d" }}>
                <div
                  onClick={() => snapTo(index)}
                  className="relative cursor-pointer"
                  style={{
                    width: pWidth,
                    height: pHeight,
                    transform: panelTransform,
                    transformStyle: "preserve-3d",
                    transition: isVert
                      ? "none" // rAF handles all movement
                      : "filter 0.3s, opacity 0.3s",
                    opacity: hidden ? 0 : opacity,
                    filter: hidden
                      ? "blur(6px)"
                      : `blur(${blur}px)`,
                    pointerEvents: hidden ? "none" : "auto",
                    willChange: "transform",
                  }}
                >
                  {/* Front panel glow */}
                  {isFront && (
                    <div
                      className="absolute -inset-4 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 50%, ${accent}30 0%, transparent 70%)`,
                        filter: "blur(20px)",
                        willChange: "opacity",
                      }}
                    />
                  )}

                  {/* Panel body -- theme-aware */}
                  <div
                    className="relative w-full h-full rounded-xl border overflow-hidden"
                    style={{
                      background: isDark
                        ? `linear-gradient(145deg, ${accent}18, #0d0d1a 50%, ${accent}0a)`
                        : `linear-gradient(145deg, ${accent}14, #fff 50%, ${accent}08)`,
                      borderColor: isFront
                        ? (isDark ? `${accent}88` : `${accent}55`)
                        : (isDark ? `${accent}30` : `${accent}22`),
                      boxShadow: isFront
                        ? (isDark
                          ? `0 0 30px ${accent}35, 0 0 60px ${accent}15, inset 0 0 30px ${accent}08`
                          : `0 0 30px ${accent}20, 0 0 60px ${accent}0a`
                        )
                        : (isDark
                          ? `0 2px 15px rgba(0,0,0,0.3)`
                          : `0 2px 10px rgba(0,0,0,0.04)`
                        ),
                      transform: isFront ? "scale(1.02)" : "scale(1)",
                      transition: "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                    }}
                  >
                    {/* Shiny glass overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40"
                      style={{
                        background: isFront
                          ? `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.08) 100%)`
                          : `linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)`,
                      }}
                    />

                    {/* Colored top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: accent }}
                    />

                    {renderItem(item, index)}
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      </div>

      {/* -- Navigation -------------------------------- */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={goToPrev}
          className="group relative p-2.5 rounded-full border transition-all duration-300"
          style={{
            backgroundColor: isDark ? `${frontColor}15` : `${frontColor}0d`,
            borderColor: isDark ? `${frontColor}44` : `${frontColor}33`,
            color: frontColor,
          }}
          aria-label="Previous"
        >
          <ChevronLeft size={17} />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${frontColor}25 0%, transparent 70%)`,
            }}
          />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {items.map((_, index) => {
            const active = index === frontIndex;
            const near = Math.abs(index - frontIndex) <= 2 && !active;
            return (
              <button
                key={index}
                onClick={() => snapTo(index)}
                className="rounded-full transition-all duration-500"
                style={{
                  width: active ? 26 : near ? 7 : 4,
                  height: active ? 6 : near ? 5 : 4,
                  backgroundColor: active
                    ? frontColor
                    : near
                    ? (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)")
                    : (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"),
                  boxShadow: active ? `0 0 8px ${frontColor}55` : "none",
                }}
                aria-label={`Go to ${index + 1}`}
              />
            );
          })}
        </div>

        <button
          onClick={goToNext}
          className="group relative p-2.5 rounded-full border transition-all duration-300"
          style={{
            backgroundColor: isDark ? `${frontColor}15` : `${frontColor}0d`,
            borderColor: isDark ? `${frontColor}44` : `${frontColor}33`,
            color: frontColor,
          }}
          aria-label="Next"
        >
          <ChevronRight size={17} />
          <div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(50% 50% at 50% 50%, ${frontColor}25 0%, transparent 70%)`,
            }}
          />
        </button>
      </div>
    </div>
  );
}
