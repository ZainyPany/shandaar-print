"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursorPosition } from "@/hooks/useCursor";

export default function CustomCursor() {
  const { pos, hovering } = useCursorPosition();
  const [enabled, setEnabled] = useState(false);

  // Setup spring properties for the lerped outer ring
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  
  const springConfig = { stiffness: 180, damping: 20, mass: 0.6 };
  const springX = useSpring(ringX, springConfig);
  const springY = useSpring(ringY, springConfig);

  useEffect(() => {
    // Enable custom cursor on desktops only (hover capable and pointer fine)
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mql.matches);
    
    const handleMql = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mql.addEventListener("change", handleMql);
    return () => mql.removeEventListener("change", handleMql);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    ringX.set(pos.x);
    ringY.set(pos.y);
  }, [pos.x, pos.y, ringX, ringY, enabled]);

  if (!enabled) return null;

  const ringSize = hovering ? 70 : 36;

  return (
    <>
      {/* Outer Lerped Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border border-lime mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize
        }}
        animate={{
          backgroundColor: hovering ? "rgba(212, 240, 98, 0.12)" : "rgba(212, 240, 98, 0)",
          borderColor: "rgba(212, 240, 98, 1)"
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner Instant follow Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 rounded-full bg-lime mix-blend-screen"
        style={{
          x: pos.x,
          y: pos.y,
          translateX: "-50%",
          translateY: "-50%"
        }}
      />
    </>
  );
}
