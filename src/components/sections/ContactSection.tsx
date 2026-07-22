"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { personalInfo, profileLinks } from "@/lib/data";
import { usePortfolioStore } from "@/lib/store";

function ConfettiPiece({
  delay,
  x,
  color,
}: {
  delay: number;
  x: number;
  color: string;
}) {
  return (
    <div
      className="confetti-piece"
      style={{
        left: `${x}%`,
        backgroundColor: color,
        animationDuration: `${1.5 + Math.random()}s`,
        animationDelay: `${delay}s`,
        borderRadius: Math.random() > 0.5 ? "50%" : "2px",
        width: `${6 + Math.random() * 6}px`,
        height: `${6 + Math.random() * 6}px`,
      }}
    />
  );
}

function Confetti() {
  const colors = ["#4FD1FF", "#A78BFA", "#34D399", "#FBBF24", "#F87171"];
  return (
    <div className="fixed inset-0 pointer-events-none z-[9990]">
      {Array.from({ length: 30 }).map((_, i) => (
        <ConfettiPiece
          key={i}
          delay={Math.random() * 0.5}
          x={Math.random() * 100}
          color={colors[i % colors.length]}
        />
      ))}
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {}
      }}
      className="text-xs transition-colors duration-300"
      style={{ color: "var(--text-tertiary)" }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--text-tertiary)")
      }
    >
      {copied ? "Copied!" : `Copy ${label}`}
    </button>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { theme } = usePortfolioStore();
  const isDark = theme === "dark";

  const inputStyle = isDark
    ? { background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.05)" }
    : { background: "#F8FAFC", borderColor: "#E2E8F0" };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.from_name.trim() || !formState.from_email.trim() || !formState.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/aayumishra2024@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("sent");
        setFormState({ from_name: "", from_email: "", message: "" });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      } else {
        setStatus("error");
        setErrorMsg("Form submission failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Check your connection and try again.");
    }
  };

  const contacts = [
    {
      icon: "✉️",
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      copyText: personalInfo.email,
    },
    {
      icon: "📱",
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    ...profileLinks.map((link) => ({
      icon: link.icon,
      label: link.name,
      value: link.label,
      href: link.url,
    })),
  ];

  return (
    <section id="contact" ref={ref} className="py-28 md:py-40 px-6 relative">
      {showConfetti && <Confetti />}
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
            Contact
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Let&apos;s build something
            <br />
            great{" "}
            <span style={{ color: "var(--accent)" }}>together</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 space-y-6"
            >
              <div className="space-y-1">
                <label
                  htmlFor="from_name"
                  className="block text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  value={formState.from_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm placeholder:text-text-tertiary focus:outline-none transition-colors duration-300"
                  style={inputStyle}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="from_email"
                  className="block text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="from_email"
                  name="from_email"
                  value={formState.from_email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm placeholder:text-text-tertiary focus:outline-none transition-colors duration-300"
                  style={inputStyle}
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="block text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-sm placeholder:text-text-tertiary focus:outline-none transition-colors duration-300 resize-none"
                  style={inputStyle}
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full px-8 py-3.5 text-white font-semibold rounded-full text-sm disabled:opacity-50 transition-all duration-300"
                style={{
                  backgroundColor: "var(--accent)",
                  boxShadow: isDark
                    ? "0 4px 20px rgba(79,209,255,0.2)"
                    : "0 4px 20px rgba(3,105,161,0.15)",
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-center"
                  style={{ color: "var(--accent)" }}
                >
                  Message sent successfully!
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-xs text-center"
                >
                  {errorMsg}
                </motion.p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-3"
          >
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Get in touch
            </h3>
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-accent/15 transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--accent-dim)",
                  }}
                >
                  <span className="text-base">{c.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="text-sm truncate transition-colors duration-300 group-hover:text-accent"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.value}
                  </p>
                </div>
                {"copyText" in c && c.copyText && (
                  <CopyButton text={c.copyText as string} label={c.label} />
                )}
                <svg
                  className="w-4 h-4 shrink-0 transition-all duration-300 group-hover:translate-x-0.5"
                  style={{ color: "var(--text-secondary)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
