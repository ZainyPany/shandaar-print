"use client";
import { cn } from "@/lib/utils";

export default function MarqueeStrip({
  items,
  className,
  speed = "default"
}: {
  items: string[];
  className?: string;
  speed?: "default" | "fast";
}) {
  const row = items.join("  ·  ");
  return (
    <div className={cn("flex w-full overflow-hidden whitespace-nowrap", className)}>
      <div className={cn("flex shrink-0", speed === "fast" ? "animate-marquee-fast" : "animate-marquee")}>
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} className="mr-16 inline-flex">
            {items.map((it, j) => (
              <span key={j} className="mr-16">
                {it}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
