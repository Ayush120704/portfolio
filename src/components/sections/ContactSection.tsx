"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";
import { Mail, Phone, Code, ExternalLink, Send, CheckCircle, Loader2 } from "lucide-react";
import useWeb3Forms from "@web3forms/react";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-200px" });
  const { setActiveSection, setCursorVariant } = usePortfolioStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const { submit: sendEmail } = useWeb3Forms({
    access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
    onSuccess: () => {
      setSubmitState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitState("idle"), 5000);
    },
    onError: () => {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3000);
    },
  });

  useEffect(() => {
    if (isInView) setActiveSection("contact");
  }, [isInView, setActiveSection]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState("sending");

    try {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 3000);
    }
  };

  const contactLinks = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "bg-accent/10 text-accent group-hover:bg-accent",
      external: false,
    },
    ...(personalInfo.linkedin
      ? [
          {
            icon: <Code size={16} />,
            label: "LinkedIn",
            value: "Connect on LinkedIn",
            href: personalInfo.linkedin,
            color: "bg-[#0077B5]/10 text-[#0077B5] group-hover:bg-[#0077B5]",
            external: true,
          },
        ]
      : []),
    {
      icon: <Code size={16} />,
      label: "GitHub",
      value: "Ayush120704",
      href: personalInfo.github,
      color: "bg-accent/10 text-accent group-hover:bg-accent",
      external: true,
    },
    {
      icon: <ExternalLink size={16} />,
      label: "LeetCode",
      value: "ayushmishra12345",
      href: personalInfo.leetcode,
      color: "bg-accent-secondary/10 text-accent-secondary group-hover:bg-accent-secondary",
      external: true,
    },
    {
      icon: <Phone size={16} />,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "bg-accent/10 text-accent group-hover:bg-accent",
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <div className="backdrop-blur-sm bg-background/30 rounded-3xl p-4 sm:p-8 lg:p-12">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[60px] bg-accent" />
          <span className="text-xs sm:text-sm text-accent font-mono uppercase tracking-widest">
            Contact
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
          Let&apos;s <span className="gradient-text">connect</span>
        </h2>
        <p className="text-muted mb-8 sm:mb-12 max-w-lg text-xs sm:text-sm md:text-base">
          Have a project in mind or want to collaborate? I&apos;d love to hear
          from you.
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl glass bg-transparent border-none text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-xs sm:text-sm"
              />
              {errors.name && (
                <p className="text-red-400 text-[10px] sm:text-xs mt-1">{errors.name}</p>
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
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl glass bg-transparent border-none text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-xs sm:text-sm"
              />
              {errors.email && (
                <p className="text-red-400 text-[10px] sm:text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl glass bg-transparent border-none text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-xs sm:text-sm"
              />
              {errors.subject && (
                <p className="text-red-400 text-[10px] sm:text-xs mt-1">{errors.subject}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your message"
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl glass bg-transparent border-none text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none text-xs sm:text-sm"
              />
              {errors.message && (
                <p className="text-red-400 text-[10px] sm:text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={submitState === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                submitState === "success"
                  ? "bg-green-500 text-white"
                  : submitState === "error"
                    ? "bg-red-500 text-white"
                    : submitState === "sending"
                      ? "bg-accent/50 text-white cursor-wait"
                      : "bg-accent text-white hover:bg-accent/80 hover:shadow-[0_0_30px_rgba(108,99,255,0.3)]"
              }`}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {submitState === "success" ? (
                <>
                  <CheckCircle size={14} /> Message Sent!
                </>
              ) : submitState === "error" ? (
                "Failed — Try Email Instead"
              ) : submitState === "sending" ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={12} />
                </>
              )}
            </motion.button>
          </form>

          <div className="space-y-3">
            {contactLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 sm:gap-4 glass rounded-lg sm:rounded-xl p-3 sm:p-4 hover:bg-surface-hover transition-all duration-300 group"
                whileHover={{ x: 4 }}
                onMouseEnter={() => setCursorVariant("link")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex items-center justify-center transition-all shrink-0 ${link.color}`}
                >
                  {link.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-xs text-muted">{link.label}</div>
                  <div className="text-xs sm:text-sm font-medium truncate">{link.value}</div>
                </div>
                {link.external && (
                  <ExternalLink
                    size={12}
                    className="text-muted group-hover:text-foreground transition-colors shrink-0"
                  />
                )}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
