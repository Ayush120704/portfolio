"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function GlobalScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <HeroScene />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/60 pointer-events-none" />
    </div>
  );
}
