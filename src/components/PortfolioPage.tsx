"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
      <LoadingScreen />
      <div className="grain-overlay">
        {isLoaded && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ExperienceSection />
              <ContactSection />
            </main>
            <Footer />
          </>
        )}
      </div>
    </AnimatePresence>
  );
}
