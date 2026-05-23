"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { formatPKR } from "@/lib/utils";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductMedia from "./ProductMedia";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [hover, setHover] = useState(false);
  const { addToCart } = useCart();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="group relative flex flex-col"
    >
      {/* 1:1 Aspect Image Wrap, Full-Bleed ProductSVG */}
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-surface border border-border">
        <motion.div
          animate={{ scale: hover ? 1.06 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <ProductMedia
            product={product}
            sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
            priority={index < 3}
          />
        </motion.div>

        {/* Dynamic Color Overlay on Hover (Product Accent at 18% opacity) */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: product.accent }}
          animate={{ opacity: hover ? 0.18 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />

        {/* Custom NEW badge top-right (lime block, #0a0a0a text, Bebas Neue 12px) */}
        {product.isNew && (
          <span className="absolute right-3 top-3 z-10 bg-lime px-2.5 py-1 font-meme text-xs tracking-[0.18em] text-[var(--color-text-dark)] uppercase rounded-[2px] shadow-sm">
            NEW
          </span>
        )}

        {/* Cart CTA slide-up bar */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product.id);
          }}
          className="absolute left-0 right-0 h-[50px] bg-lime text-center font-meme text-sm tracking-[0.25em] text-[var(--color-text-dark)] uppercase border-t border-border flex items-center justify-center transition-transform duration-500 ease-out z-20 cursor-none"
          style={{
            bottom: 0,
            transform: hover ? "translateY(0)" : "translateY(51px)"
          }}
        >
          Cart mein daloo
        </button>
      </div>

      {/* Meta Information below the product canvas */}
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div>
          <h3 className="font-display text-[1.1rem] font-bold leading-tight group-hover:text-lime transition-colors duration-250">
            {product.name}
          </h3>
          <p className="mt-1 font-body text-xs uppercase tracking-[0.15em] text-text2">
            {product.cat === "tote" ? "Tote Bag" : "T-Shirt"}
          </p>
        </div>
        <span className="shrink-0 font-meme text-2xl tracking-wide text-lime">
          {formatPKR(product.price)}
        </span>
      </div>
    </motion.article>
  );
}
