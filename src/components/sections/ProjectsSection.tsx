"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { projects, type Project } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { Code, ArrowUpRight } from "lucide-react";
import PyramidCarousel from "@/components/ui/PyramidCarousel";

/* ── Compact project card for pyramid panel ───────── */
function ProjectCard({ project }: { project: Project }) {
  const { theme, setCursorVariant } = usePortfolioStore();
  const isDark = theme === "dark";
  const c = project.color;

  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full h-full p-4 sm:p-5 flex flex-col justify-between"
      onMouseEnter={() => setCursorVariant("link")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      {/* Top section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-[9px] font-mono uppercase tracking-[0.15em] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              color: c,
              backgroundColor: `${c}14`,
              borderColor: `${c}30`,
            }}
          >
            {project.category === "ai/ml" ? "AI/ML" : project.category}
          </span>
          <span
            className="text-[8px] font-mono"
            style={{
              color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
            }}
          >
            #{String(projects.indexOf(project) + 1).padStart(2, "0")}
          </span>
        </div>

        <h3
          className="text-sm sm:text-base font-bold leading-snug mb-1.5 transition-colors duration-300"
          style={{ color: "var(--foreground)" }}
        >
          {project.title}
        </h3>

        <p
          className="text-[10px] sm:text-xs leading-relaxed line-clamp-2 mb-2"
          style={{ color: "var(--muted)" }}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom section */}
      <div>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-medium border"
              style={{
                color: c,
                backgroundColor: `${c}0d`,
                borderColor: `${c}22`,
              }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span
              className="px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] border"
              style={{
                color: "var(--muted)",
                borderColor: "var(--border-color)",
              }}
            >
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-1.5 text-[10px] font-medium transition-all duration-300 group-hover:gap-2"
          style={{ color: c }}
        >
          <Code size={11} />
          <span>GitHub</span>
          <ArrowUpRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

/* ── Section ────────────────────────────────────────── */
export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    if (isInView) setActiveSection("projects");
  }, [isInView, setActiveSection]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="backdrop-blur-sm bg-background/30 rounded-3xl p-4 sm:p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-accent" />
          <span className="text-xs sm:text-sm text-accent font-mono uppercase tracking-widest">
            Projects
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-10 sm:mb-16">
          All <span className="gradient-text">projects</span>
        </h2>

        <div className="gsap-reveal">
          <PyramidCarousel
            items={projects}
            renderItem={(project: Project) => <ProjectCard project={project} />}
          />
        </div>
      </div>
    </section>
  );
}
