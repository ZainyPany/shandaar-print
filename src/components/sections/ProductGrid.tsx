"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductGrid() {
  const [filter, setFilter] = useState<"all" | "tote" | "tshirt">("all");

  const filteredProducts = products.filter((p) => {
    if (filter === "all") return true;
    return p.cat === filter;
  });

  const categories = [
    { label: "ALL DROPS", value: "all" as const },
    { label: "TOTE BAGS", value: "tote" as const },
    { label: "GRAPHIC TEES", value: "tshirt" as const },
  ];

  return (
    <section id="shop" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
      {/* Background visual accent */}
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-lime opacity-5 blur-[120px] pointer-events-none" />
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="font-meme text-lime text-lg tracking-[0.25em] uppercase block mb-3">
            // THE CATLOGUE
          </span>
          <h2 className="font-meme text-[4.5rem] md:text-[6rem] leading-[0.9] uppercase text-text1">
            BOHOT SHANDAAR <br />
            <span className="text-lime">COLLECTIONS</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const isActive = filter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className="filter-btn relative px-6 py-3 font-meme text-base tracking-[0.15em] border border-border overflow-hidden transition-colors duration-300 rounded-[2px] cursor-none"
                style={{
                  color: isActive ? "var(--color-text-dark)" : "var(--color-text-1)",
                }}
              >
                {/* Background Fill Animation */}
                {isActive && (
                  <motion.span
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-lime z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Text Label */}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid wrapper with layout transition */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="card"
            >
              <ProductCard product={product} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
