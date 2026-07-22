"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AyushAI from "@/components/ui/AyushAI";
import Terminal from "@/components/ui/Terminal";
import CommandPalette from "@/components/ui/CommandPalette";
import RecruiterMode from "@/components/ui/RecruiterMode";
import BackToTop from "@/components/ui/BackToTop";
import SocialBar from "@/components/ui/SocialBar";
import ShortcutHint from "@/components/ui/ShortcutHint";
import { usePortfolioStore } from "@/lib/store";

export default function PortfolioPage() {
  const { isLoaded } = usePortfolioStore();

  useEffect(() => {
    console.log(
      "%c👋 Hello Developer!",
      "color: #4FD1FF; font-size: 20px; font-weight: bold;"
    );
    console.log(
      "%cThanks for checking out my portfolio.\nLet's connect!",
      "color: #A0A0A0; font-size: 12px;"
    );
  }, []);

  useEffect(() => {
    const onFocus = () => {
      document.title = "Ayush Mishra | AI/ML Engineer & Full-Stack Developer";
    };
    const onBlur = () => {
      document.title = "Come back! 👋";
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isLoaded ? (
        <LoadingScreen key="loader" />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grain-overlay"
        >
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <RecruiterMode />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
          <Footer />
          <AyushAI />
          <Terminal />
          <CommandPalette />
          <BackToTop />
          <SocialBar />
          <ShortcutHint />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
