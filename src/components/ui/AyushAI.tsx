"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiKnowledge } from "@/lib/data";

const synonyms: Record<string, string[]> = {
  neurowell: ["neuro", "well", "mental", "health", "emotion", "therapist", "cbt"],
  projects: ["project", "built", "build", "created", "application", "app", "software"],
  skills: ["skill", "tech", "technology", "stack", "proficient", "know", "language", "framework", "tool", "expertise"],
  resume: ["cv", "curriculum", "vitae", "download", "pdf", "print"],
  contact: ["email", "phone", "call", "reach", "message", "mail"],
  experience: ["exp", "background", "work", "job", "intern", "internship", "career", "professional"],
  leetcode: ["lc", "coding", "dsa", "algorithm", "problem", "programming", "competitive", "streak"],
  gate: ["graduate", "aptitude", "test", "engineering", "exam", "qualified", "score"],
  about: ["who", "tell", "introduce", "yourself", "biography"],
  ait: ["bangkok", "thailand", "internship", "scholarship", "global", "abroad"],
};

function matchScore(query: string, key: string, synonymsList: string[]): number {
  const q = query.toLowerCase();
  let score = 0;
  if (q.includes(key)) score += 10;
  if (q.includes(key.replace(/-/g, " "))) score += 10;
  for (const syn of synonymsList) {
    if (q.includes(syn)) score += 3;
    if (new RegExp(`\\b${syn}\\b`).test(q)) score += 2;
  }
  return score;
}

export default function AyushAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text: "Hi! I'm Ayush AI. Ask me about his projects, skills, experience, or anything related to his portfolio!",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getReply = (q: string): string => {
    const trimmed = q.toLowerCase().trim();

    const greetings = ["hi", "hello", "hey", "yo", "sup", "namaste", "good morning", "good evening"];
    if (greetings.some((g) => trimmed === g || trimmed.startsWith(g))) {
      return "Hello! 👋 I'm Ayush AI, your personal guide to Ayush Mishra's portfolio. Ask me about his projects, skills, experience, LeetCode journey, or anything else!";
    }

    if (trimmed.includes("thank")) {
      return "You're welcome! 😊 Feel free to ask more about Ayush's work or background.";
    }

    let bestKey = "default";
    let bestScore = 0;

    for (const [key, syns] of Object.entries(synonyms)) {
      if (key === "default") continue;
      const score = matchScore(trimmed, key, syns);
      if (score > bestScore) {
        bestScore = score;
        bestKey = key;
      }
    }

    if (bestScore > 0 && aiKnowledge[bestKey]) {
      return aiKnowledge[bestKey];
    }

    const words = trimmed.split(/\s+/);
    for (const [key] of Object.entries(aiKnowledge)) {
      if (key === "default") continue;
      if (words.some((w) => w.length > 3 && key.includes(w))) {
        return aiKnowledge[key];
      }
    }

    return aiKnowledge.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const q = input;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getReply(q) }]);
    }, 400);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center transition-shadow duration-300"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--bg-primary)",
          boxShadow: "0 0 30px var(--accent-glow)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[60] w-[340px] max-w-[calc(100vw-3rem)] glass-card rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-4 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Ayush AI</span>
              </div>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>Ask me anything about Ayush</p>
            </div>

            <div className="h-72 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: "thin" }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-md"
                        : "rounded-bl-md"
                    }`}
                    style={{
                      backgroundColor:
                        msg.role === "user"
                          ? "var(--accent-dim)"
                          : "rgba(255,255,255,0.03)",
                      color:
                        msg.role === "user"
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={scrollRef} />
            </div>

            <div className="p-3 border-t" style={{ borderColor: "var(--border-color)" }}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-xs placeholder:text-text-tertiary focus:outline-none transition-colors"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                />
                <button
                  type="submit"
                  className="px-3.5 py-2.5 rounded-xl text-xs font-medium hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg-primary)",
                  }}
                >
                  &rarr;
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
