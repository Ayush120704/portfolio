"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { techCategories, type TechCategory } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { Sparkles, ArrowUpRight } from "lucide-react";
import PyramidCarousel from "@/components/ui/PyramidCarousel";

/* -- Compact card for each tech category ------------ */
function TechCard({ item }: { item: TechCategory }) {
  const { setCursorVariant } = usePortfolioStore();
  const c = item.color;

  return (
    <motion.div
      className="group relative block w-full h-full p-3 sm:p-5 flex flex-col justify-between"
      onMouseEnter={() => setCursorVariant("link")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[8px] font-mono uppercase tracking-[0.15em] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              color: c,
              backgroundColor: `${c}14`,
              borderColor: `${c}30`,
            }}
          >
            Category
          </span>
          <Sparkles size={11} style={{ color: c }} />
        </div>

        <h3
          className="text-xs sm:text-sm font-bold leading-snug mb-2 transition-colors"
          style={{ color: "var(--foreground)" }}
        >
          {item.category}
        </h3>

        <div className="flex flex-wrap gap-1">
          {item.items.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-medium border"
              style={{
                color: c,
                backgroundColor: `${c}0d`,
                borderColor: `${c}22`,
              }}
            >
              {skill}
            </span>
          ))}
          {item.items.length > 6 && (
            <span className="px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] border"
              style={{
                color: "var(--muted)",
                borderColor: "var(--border-color)",
              }}
            >
              +{item.items.length - 6}
            </span>
          )}
        </div>
      </div>

      <div
        className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-medium mt-2 transition-all duration-300 group-hover:gap-2"
        style={{ color: c }}
      >
        <span>{item.items.length} technologies</span>
        <ArrowUpRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.div>
  );
}

/* -- Section ---------------------------------------- */
export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    if (isInView) setActiveSection("skills");
  }, [isInView, setActiveSection]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="backdrop-blur-sm bg-background/30 rounded-3xl p-4 sm:p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-accent" />
          <span className="text-xs sm:text-sm text-accent font-mono uppercase tracking-widest">
            Skills
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16">
          Tech <span className="gradient-text">stack</span>
        </h2>

        <div className="gsap-reveal">
          <PyramidCarousel
            items={techCategories}
            renderItem={(item: TechCategory) => <TechCard item={item} />}
            direction="vertical"
          />
        </div>
      </div>
    </section>
  );
}
