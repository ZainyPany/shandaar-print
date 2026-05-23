"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { products } from "@/lib/products";
import ProductMedia from "@/components/ui/ProductMedia";

function StatCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
}

export default function AboutBrand() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Get first 4 products for the 2x2 mosaic
  const mosaicProducts = products.slice(0, 4);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
    >
      {/* Background patterns and glowing accent */}
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-purple opacity-[0.03] blur-[150px] pointer-events-none" />
      
      {/* Left Column: Core Copy & Staggered Stats */}
      <div className="lg:col-span-6 flex flex-col justify-center">
        <span className="font-meme text-lime text-lg tracking-[0.25em] uppercase block mb-3">
          // WHO WE ARE
        </span>
        <h2 className="font-meme text-[4.5rem] md:text-[6rem] leading-[0.9] uppercase mb-8 text-text1">
          BORN IN <span className="text-lime">KARACHI</span>, <br />
          MADE TO BE LOUD.
        </h2>

        <p className="font-body text-text1 text-base md:text-lg leading-relaxed mb-6">
          We got tired of corporate "minimalism" and boring English typography on tees that cost a kidney. Shandaar Print is a loud tribute to Pakistani meme culture, Hinglish humor, and raw street aesthetic.
        </p>

        <p className="font-body text-text2 text-sm md:text-base leading-relaxed mb-12">
          From late-night chai sessions at Dhaba to designer pixel-pushing panic, we translate the chaotic Karachi energy into high-quality heavyweight streetwear. It's unapologetic, funny, and 100% real.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-8 border-t border-border pt-10">
          <div>
            <h4 className="font-meme text-4xl sm:text-5xl text-lime tracking-wide">
              <StatCounter value={10400} />+
            </h4>
            <p className="font-body text-xs sm:text-sm uppercase tracking-widest text-text2 mt-1">
              SHANDAAR CUSTOMERS
            </p>
          </div>
          <div>
            <h4 className="font-meme text-4xl sm:text-5xl text-purple tracking-wide">
              <StatCounter value={120} />%
            </h4>
            <p className="font-body text-xs sm:text-sm uppercase tracking-widest text-text2 mt-1">
              DESI STREET ENERGY
            </p>
          </div>
          <div>
            <h4 className="font-meme text-4xl sm:text-5xl text-teal tracking-wide">
              <StatCounter value={21} />+
            </h4>
            <p className="font-body text-xs sm:text-sm uppercase tracking-widest text-text2 mt-1">
              DESI PILLS DROPPED
            </p>
          </div>
          <div>
            <h4 className="font-meme text-4xl sm:text-5xl text-text1 tracking-wide">
              0
            </h4>
            <p className="font-body text-xs sm:text-sm uppercase tracking-widest text-text2 mt-1">
              TENSIONS TAKEN
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: 2x2 Tilted Product SVG Grid */}
      <div className="lg:col-span-6 relative flex items-center justify-center">
        {/* Glow backdrop behind grid */}
        <div className="absolute w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(212,240,98,0.04)_0%,transparent_60%)] pointer-events-none" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[500px]">
          {mosaicProducts.map((prod, idx) => {
            // Apply slight offsets & rotations based on index to create "tilted mosaic" vibe
            const tiltRotate = idx === 0 ? -4 : idx === 1 ? 3 : idx === 2 ? 2 : -3;
            const translateOffset = idx % 2 === 0 ? -10 : 10;

            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
                whileHover={{ 
                  y: -15, 
                  rotate: tiltRotate * 1.5,
                  scale: 1.05,
                  zIndex: 10
                }}
                className="relative aspect-square w-full overflow-hidden rounded-md bg-surface border border-border cursor-none"
                style={{
                  rotate: tiltRotate,
                  y: translateOffset,
                }}
              >
                <ProductMedia product={prod} sizes="(max-width: 900px) 50vw, 25vw" />
                {/* Visual shade filter */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-5"
                  style={{ backgroundColor: prod.accent }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
