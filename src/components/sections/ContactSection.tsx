"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { Mail, Phone, Code, ExternalLink, Send } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection, setCursorVariant } = usePortfolioStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isInView) setActiveSection("contact");
  }, [isInView, setActiveSection]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6 max-w-5xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px flex-1 max-w-[60px] bg-accent" />
          <span className="text-sm text-accent font-mono uppercase tracking-widest">
            Contact
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Let&apos;s <span className="gradient-text">connect</span>
        </h2>
        <p className="text-muted mb-12 max-w-lg">
          Have a project in mind or want to collaborate? I&apos;d love to hear
          from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass bg-transparent border-none text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass bg-transparent border-none text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your message"
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl glass bg-transparent border-none text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-3 rounded-xl bg-accent text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors"
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {submitted ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message <Send size={14} />
                </>
              )}
            </motion.button>
          </form>

          <div className="space-y-6">
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-4 glass rounded-xl p-5 hover:bg-surface-hover transition-all group"
              whileHover={{ x: 4 }}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-sm text-muted">Email</div>
                <div className="text-sm font-medium">{personalInfo.email}</div>
              </div>
              <ExternalLink
                size={14}
                className="ml-auto text-muted group-hover:text-foreground transition-colors"
              />
            </motion.a>

            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 glass rounded-xl p-5 hover:bg-surface-hover transition-all group"
              whileHover={{ x: 4 }}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Code size={18} />
              </div>
              <div>
                <div className="text-sm text-muted">GitHub</div>
                <div className="text-sm font-medium">
                  Ayush120704
                </div>
              </div>
              <ExternalLink
                size={14}
                className="ml-auto text-muted group-hover:text-foreground transition-colors"
              />
            </motion.a>

            <motion.a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 glass rounded-xl p-5 hover:bg-surface-hover transition-all group"
              whileHover={{ x: 4 }}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="w-10 h-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center text-accent-secondary group-hover:bg-accent-secondary group-hover:text-white transition-all">
                <ExternalLink size={18} />
              </div>
              <div>
                <div className="text-sm text-muted">LeetCode</div>
                <div className="text-sm font-medium">
                  ayushmishra12345
                </div>
              </div>
              <ExternalLink
                size={14}
                className="ml-auto text-muted group-hover:text-foreground transition-colors"
              />
            </motion.a>

            <motion.a
              href={`tel:${personalInfo.phone}`}
              className="flex items-center gap-4 glass rounded-xl p-5 hover:bg-surface-hover transition-all group"
              whileHover={{ x: 4 }}
              onMouseEnter={() => setCursorVariant("link")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-sm text-muted">Phone</div>
                <div className="text-sm font-medium">
                  {personalInfo.phone}
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
