"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BrandStatement() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  const line1 = "WE DIDN'T MAKE FASHION.";
  const line2 = "WE MADE IT FUNNY.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      rotateX: -90,
      y: 40,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-[#070707] border-y border-border"
      style={{ perspective: "1000px" }}
    >
      {/* Radial Gradient Backdrop for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,240,98,0.03)_0%,transparent_50%)] pointer-events-none" />

      {/* Decorative Brand Text */}
      <span className="font-meme text-text2/15 text-sm tracking-[0.4em] uppercase mb-8 block text-center">
        // THE BRAND ETHOS
      </span>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center text-center select-none"
      >
        {/* Line 1 */}
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 overflow-hidden py-2">
          {line1.split(" ").map((word, idx) => (
            <div key={idx} className="overflow-hidden py-1" style={{ perspective: "600px" }}>
              <motion.span
                variants={wordVariants}
                className="inline-block font-meme text-[3.5rem] sm:text-[5rem] md:text-[7.5rem] leading-[0.95] text-text1 uppercase origin-bottom"
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Line 2 */}
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 overflow-hidden py-2 mt-2">
          {line2.split(" ").map((word, idx) => {
            const isFunny = word.toUpperCase() === "FUNNY.";
            return (
              <div key={idx} className="overflow-hidden py-1" style={{ perspective: "600px" }}>
                <motion.span
                  variants={wordVariants}
                  className={`inline-block font-meme text-[3.5rem] sm:text-[5rem] md:text-[7.5rem] leading-[0.95] uppercase origin-bottom ${
                    isFunny ? "text-[#FF7A00] italic font-bold select-text" : "text-text1"
                  }`}
                >
                  {word}
                </motion.span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Extra bottom stamp */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 0.6, y: 0 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
        className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-text2 mt-12 text-center max-w-md px-4 leading-relaxed"
      >
        HYPE STREETWEAR MEETS DESI MEMES. <br />
        BOHOT SHANDAAR, MADE IN KARACHI WITH LOVE.
      </motion.p>
    </section>
  );
}
