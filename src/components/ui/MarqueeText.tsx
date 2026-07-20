"use client";

interface MarqueeTextProps {
  items: string[];
  speed?: number;
  className?: string;
}

export default function MarqueeText({
  items,
  speed = 30,
  className = "",
}: MarqueeTextProps) {
  const content = [...items, ...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-sm text-muted/40 select-none">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
          </span>
        ))}
      </div>
    </div>
  );
}
