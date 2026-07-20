"use client";

import { usePortfolioStore } from "@/lib/store";

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const { setCursorVariant } = usePortfolioStore();

  const handleMouseEnterLink = () => setCursorVariant("link");
  const handleMouseLeaveLink = () => setCursorVariant("default");
  const handleMouseEnterButton = () => setCursorVariant("button");
  const handleMouseLeaveButton = () => setCursorVariant("default");
  const handleMouseEnterDrag = () => setCursorVariant("drag");
  const handleMouseLeaveDrag = () => setCursorVariant("default");

  return (
    <div
      onMouseOver={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a, [data-cursor='link']")) {
          handleMouseEnterLink();
        } else if (target.closest("button, [data-cursor='button']")) {
          handleMouseEnterButton();
        } else if (target.closest("[data-cursor='drag']")) {
          handleMouseEnterDrag();
        } else {
          handleMouseLeaveLink();
        }
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("a")) handleMouseLeaveLink();
        if (target.closest("button")) handleMouseLeaveButton();
        if (target.closest("[data-cursor='drag']")) handleMouseLeaveDrag();
      }}
    >
      {children}
    </div>
  );
}
