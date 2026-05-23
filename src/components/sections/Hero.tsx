"use client";
import React from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const MARQUEE_ITEMS = [
  "SAVE ME · JPG OR PDF",
  "GEN ZZZZZZ",
  "TENSION LENE KA NAHI",
  "ALL I NEED IS BOHOT PAISE",
  "I AM NOT YELLING I AM PAKISTANI"
];

export default function Hero() {
  const marqueeString = MARQUEE_ITEMS.join("   ★   ");

  return (
    <header className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden bg-bg px-6 py-20 lg:px-10 select-none">
      
      {/* Masked Grid dot-pattern layer */}
      <div 
        className="grid-faint absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)"
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] z-10 relative mt-16 md:mt-0">
        
        {/* Top new drop pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/10 px-4 py-1.5 font-meme text-xs sm:text-sm tracking-[0.16em] text-lime"
        >
          {/* Pulsing indicator dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
          </span>
          NEW DROP — FRIDAY 18:00 PKT
        </motion.div>

        {/* Headline: 3-line clip-path reveal */}
        <h1 className="mt-8 font-meme text-hero font-bold tracking-tight leading-[0.84] uppercase">
          <span className="block overflow-hidden h-[1.1em] py-1">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-text1"
            >
              SHANDAAR
            </motion.span>
          </span>
          <span className="block overflow-hidden h-[1.1em] py-1">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-text2"
            >
              WEAR THE
            </motion.span>
          </span>
          <span className="block overflow-hidden h-[1.1em] py-1">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-lime italic"
            >
              JOKE.
            </motion.span>
          </span>
        </h1>

        {/* Subtext description in Epilogue */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-[540px] font-body text-base sm:text-lg font-light text-text2 leading-relaxed"
        >
          Pakistani humor. On your chest. On your bag. All day. 
          Karachi made, shipped across Pakistan — bohot shandaar.
        </motion.p>

        {/* CTA rows using MagneticButton wrappers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.25, ease: "easeOut" }}
          className="mt-10 flex flex-wrap gap-4 items-center"
        >
          <MagneticButton
            as="a"
            href="/shop"
            className="flex items-center justify-center font-meme text-lg tracking-[0.14em] uppercase text-bg bg-lime border border-lime px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-transparent hover:text-lime cursor-none font-bold"
          >
            SHOP THE DROP →
          </MagneticButton>

          <MagneticButton
            as="a"
            href="/#about"
            className="flex items-center justify-center font-meme text-lg tracking-[0.14em] uppercase text-text1 border border-border px-8 py-3.5 rounded-full transition-all duration-300 hover:border-lime hover:text-lime cursor-none"
          >
            OUR STORY
          </MagneticButton>
        </motion.div>
      </div>
    </header>
  );
}
