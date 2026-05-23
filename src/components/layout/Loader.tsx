"use client";
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type LoaderProps = {
  onComplete: () => void;
};

export default function Loader({ onComplete }: LoaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isDone, setIsDone] = useState(false);
  const word = "SHANDAAR";
  const letters = word.split("");

  useEffect(() => {
    // If the user prefers reduced motion, skip the loader animation entirely
    if (shouldReduceMotion) {
      onComplete();
      return;
    }

    // Set layout slide-up trigger after 600ms
    const slideUpTimer = setTimeout(() => {
      setIsDone(true);
    }, 600);

    // Call complete handler after container completes slide-up animation (0.6s + 0.7s transition)
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 1300);

    return () => {
      clearTimeout(slideUpTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg select-none"
      initial={{ y: 0 }}
      animate={{ y: isDone ? "-100%" : 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Centered Letter Stagger Drop */}
      <div className="flex overflow-hidden font-meme text-5xl tracking-[0.08em] sm:text-7xl md:text-8xl text-text1">
        {letters.map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: "-120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* 3px Lime Progress Bar Filling Left to Right */}
      <div className="mt-8 h-[3px] w-[200px] sm:w-[280px] overflow-hidden bg-white/10 rounded-full">
        <motion.div
          className="h-full bg-lime"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
    </motion.div>
  );
}
