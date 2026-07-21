"use client";

import { useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = rectRef.current;
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate(${x * strength}px, ${y * strength}px)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0px, 0px)");
    rectRef.current = null;
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform,
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
