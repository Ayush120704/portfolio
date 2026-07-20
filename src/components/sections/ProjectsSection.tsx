"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { ExternalLink, Code, ArrowUpRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const categoryColors: Record<string, string> = {
  "ai/ml": "from-purple-500/20 to-blue-500/20",
  fullstack: "from-green-500/20 to-teal-500/20",
  web: "from-orange-500/20 to-yellow-500/20",
};

const categoryBorders: Record<string, string> = {
  "ai/ml": "border-purple-500/30",
  fullstack: "border-green-500/30",
  web: "border-orange-500/30",
};

const categoryGlows: Record<string, string> = {
  "ai/ml": "rgba(139, 92, 246, 0.15)",
  fullstack: "rgba(34, 197, 94, 0.15)",
  web: "rgba(249, 115, 22, 0.15)",
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorVariant } = usePortfolioStore();

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <TiltCard
      className="gsap-reveal"
      glareColor={categoryGlows[project.category]}
      intensity={12}
    >
      <motion.a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`group relative block rounded-2xl p-8 bg-gradient-to-br ${
          categoryColors[project.category]
        } border ${
          categoryBorders[project.category]
        } transition-all duration-500 overflow-hidden`}
        onMouseEnter={() => {
          setCursorVariant("link");
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setCursorVariant("default");
          setIsHovered(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.06), transparent 50%)`,
          }}
        />

        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `0 0 40px ${categoryGlows[project.category]}, inset 0 0 40px ${categoryGlows[project.category]}`,
          }}
        />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <Code
                size={20}
                className="text-muted group-hover:text-foreground transition-colors"
              />
              <ArrowUpRight
                size={16}
                className="text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            </div>
          </div>

          <p className="text-xs text-muted/70 mb-4 leading-relaxed hidden md:block">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-background/50 text-xs text-muted"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 rounded-md bg-background/50 text-xs text-muted">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.a>
    </TiltCard>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    if (isInView) setActiveSection("projects");
  }, [isInView, setActiveSection]);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 px-6 max-w-7xl mx-auto"
    >
      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 max-w-[60px] bg-accent" />
          <span className="text-sm text-accent font-mono uppercase tracking-widest">
            Projects
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Featured <span className="gradient-text">work</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {otherProjects.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-6 text-muted">
              Other Projects
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {otherProjects.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group block rounded-xl p-6 glass hover:bg-surface-hover transition-all duration-300 hover:border-accent/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Code
                      size={18}
                      className="text-muted group-hover:text-accent transition-colors"
                    />
                    <ExternalLink
                      size={14}
                      className="text-muted group-hover:text-foreground transition-colors"
                    />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">
                    {project.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] text-muted bg-background/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
