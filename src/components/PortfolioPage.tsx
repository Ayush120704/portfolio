"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/ui/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import MouseTracker from "@/components/ui/MouseTracker";

export default function PortfolioPage() {
  return (
    <>
      <LoadingScreen />
      <MouseTracker />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
