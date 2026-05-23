"use client";
import React, { useState } from "react";

const ITEMS = [
  "Free delivery across Pakistan 🇵🇰",
  "New drop every Friday",
  "Tension lene ka nahi dene ka",
  "Save me. JPG or PDF?",
  "Bohot Shandaar."
];

export default function AnnouncementBar() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Repeating items list twice to ensure seamless marquee bridging
  const marqueeText = ITEMS.join("   ·   ");

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1100] flex items-center overflow-hidden border-b border-black/10 bg-lime text-[var(--color-text-dark)] select-none"
      style={{ height: 40 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="flex shrink-0 whitespace-nowrap font-meme text-sm tracking-[0.18em]"
        style={{
          animation: "marquee linear infinite",
          animationDuration: isHovered ? "70s" : "35s"
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-center px-6">
            {marqueeText}
          </span>
        ))}
      </div>
    </div>
  );
}

