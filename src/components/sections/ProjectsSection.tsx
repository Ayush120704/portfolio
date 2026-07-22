"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { featuredProject, projects } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";

function FeaturedProject() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";
  const p = featuredProject;

  const ArchStep = ({
    step,
    index,
    total,
  }: {
    step: { step: string; desc: string };
    index: number;
    total: number;
  }) => (
    <div className="flex items-center gap-2 flex-1">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
        className="w-6 h-px shrink-0 origin-left"
        style={{ backgroundColor: "var(--accent-dim)" }}
      />
      <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
        {step.step}
      </span>
      <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {step.desc}
      </span>
    </div>
  );

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
            style={{ color: "var(--accent)" }}
          >
            Featured Project
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {p.title}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {p.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card rounded-2xl p-6 mb-10"
        >
          <h3
            className="text-xs uppercase tracking-wider font-medium mb-4"
            style={{ color: "var(--accent)" }}
          >
            AI Processing Pipeline
          </h3>
          <div className="space-y-0">
            {p.architecture?.map((step, i) => (
              <ArchStep
                key={step.step}
                step={step}
                index={i}
                total={p.architecture?.length || 0}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6">
              <h3
                className="text-xs uppercase tracking-wider font-medium mb-3"
                style={{ color: "var(--accent)" }}
              >
                Problem Statement
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {p.problem}
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3
                className="text-xs uppercase tracking-wider font-medium mb-3"
                style={{ color: "var(--accent)" }}
              >
                Solution
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {p.solution}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h3
                className="text-xs uppercase tracking-wider font-medium mb-5"
                style={{ color: "var(--accent)" }}
              >
                Architecture Flow
              </h3>
              <div className="flex flex-col items-start gap-2">
                {p.architecture?.map((step, i) => (
                  <div
                    key={step.step}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.08 }}
                      className="w-6 h-px shrink-0 origin-left"
                      style={{ backgroundColor: "var(--accent-dim)" }}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: "var(--accent)" }}
                    >
                      {step.step}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Challenges", items: p.challenges, color: "var(--accent)" },
            { title: "Lessons Learned", items: p.lessons, color: "var(--purple)" },
            {
              title: "Development Timeline",
              items: p.timeline?.map(
                (t) => `${t.phase} — ${t.duration}`
              ),
              color: "var(--accent)",
            },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3
                className="text-xs uppercase tracking-wider font-medium mb-4"
                style={{ color: "var(--accent)" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.items?.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: section.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {p.futureImprovements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="mt-8 glass-card rounded-2xl p-6"
          >
            <h3
              className="text-xs uppercase tracking-wider font-medium mb-4"
              style={{ color: "var(--accent)" }}
            >
              Future Improvements
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {p.futureImprovements.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-purple/60" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {p.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 text-xs rounded-full"
              style={{
                backgroundColor: "var(--accent-dim)",
                border: "1px solid transparent",
                color: "var(--accent)",
                borderColor: "var(--accent)",
                opacity: 0.8,
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";

  const isPlaceholder = (url?: string) => !url || url === "#";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative glass-card rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? isDark
            ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,209,255,0.08)"
            : "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)"
          : "none",
        borderColor: hovered
          ? isDark
            ? "rgba(79,209,255,0.15)"
            : "rgba(3,105,161,0.12)"
          : undefined,
      }}
    >
      <div className="h-52 md:h-64 relative overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            background: `linear-gradient(135deg, ${project.color}08, ${project.color}18)`,
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 right-4 flex gap-2">
          {project.comingSoon && (
            <span className="px-2.5 py-1 text-[10px] font-medium rounded-full border"
              style={{
                backgroundColor: "var(--accent-dim)",
                color: "var(--accent)",
                borderColor: "var(--accent)",
              }}
            >
              Coming Soon
            </span>
          )}
          {project.privateRepo && (
            <span className="px-2.5 py-1 text-[10px] font-medium rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                color: "var(--text-tertiary)",
                border: "1px solid var(--border-color)",
              }}
            >
              Private
            </span>
          )}
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl md:text-2xl font-bold transition-colors duration-300"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
                {project.subtitle}
              </p>
            )}
          </div>
        </div>

        {(project.role || project.duration) && (
          <div className="flex items-center gap-4 mb-4">
            {project.role && (
              <span className="text-[10px] font-mono" style={{ color: "var(--accent)", opacity: 0.7 }}>
                {project.role}
              </span>
            )}
            {project.duration && (
              <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                {project.duration}
              </span>
            )}
          </div>
        )}

        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[10px] rounded-full"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                color: "var(--text-tertiary)",
                border: "1px solid var(--border-color)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-3 transition-all duration-500"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            opacity: hovered ? 1 : 0.6,
          }}
        >
          {project.comingSoon ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border cursor-not-allowed"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-tertiary)",
                opacity: 0.5,
              }}
            >
              Coming Soon
            </span>
          ) : (
            <a
              href={project.liveLink || "#"}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                isPlaceholder(project.liveLink)
                  ? "border border-dashed opacity-50"
                  : "text-white"
              }`}
              style={
                !isPlaceholder(project.liveLink)
                  ? {
                      backgroundColor: "var(--accent)",
                      boxShadow: hovered
                        ? "0 0 20px var(--accent-glow)"
                        : "none",
                    }
                  : {
                      borderColor: "var(--text-tertiary)",
                      color: "var(--text-tertiary)",
                      opacity: 0.4,
                    }
              }
            >
              Live Demo
            </a>
          )}

          {project.privateRepo ? (
            <span className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border cursor-not-allowed"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-tertiary)",
                opacity: 0.5,
              }}
            >
              Private
            </span>
          ) : (
            <a
              href={project.githubLink || "#"}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full border transition-all duration-300 ${
                isPlaceholder(project.githubLink)
                  ? "border-dashed opacity-50"
                  : ""
              }`}
              style={
                isPlaceholder(project.githubLink)
                  ? {
                      borderColor: "var(--text-tertiary)",
                      color: "var(--text-tertiary)",
                      opacity: 0.4,
                    }
                  : {
                      borderColor: "var(--border-color)",
                      color: "var(--text-secondary)",
                    }
              }
              onMouseEnter={(e) => {
                if (!isPlaceholder(project.githubLink)) {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isPlaceholder(project.githubLink)) {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              &lt;&gt; Source
            </a>
          )}
        </div>
      </div>

      {hovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${project.color}08, inset 0 0 40px ${project.color}05`,
          }}
        />
      )}
    </motion.div>
  );
}

function OtherProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={ref} className="py-28 md:py-40 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3 font-medium"
            style={{ color: "var(--accent)" }}
          >
            Projects
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">
            Other <span style={{ color: "var(--accent)" }}>projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  return (
    <>
      <FeaturedProject />
      <OtherProjects />
    </>
  );
}
