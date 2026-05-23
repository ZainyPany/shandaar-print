"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import ProductMedia from "../ui/ProductMedia";
import CartCtaRow from "../ui/CartCtaRow";

// Custom row component to encapsulate scroll targets for individual product parallaxes
function FeaturedRow({
  productId,
  isReverse = false
}: {
  productId: string;
  isReverse?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === productId);

  // Setup parallax scroll parameters mapping 0 -> -40px y displacement
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  if (!product) return null;

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-10 ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Editorial Product Canvas side with Parallax */}
      <motion.div
        initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-surface-2 ${
          isReverse ? "md:order-2" : ""
        }`}
      >
        <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-full scale-[1.08]">
          <ProductMedia
            product={product}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Copy Content details side */}
      <motion.div
        initial={{ opacity: 0, x: isReverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`flex flex-col items-start ${isReverse ? "md:order-1" : ""}`}
      >
        <h3 className="font-meme text-4xl sm:text-5xl leading-none text-text1">
          {product.name}
        </h3>
        
        <p className="mt-4 font-body text-base font-light text-text2 leading-relaxed max-w-[480px]">
          {product.tagline}
        </p>

        <span className="mt-4 font-meme text-3xl tracking-wide text-lime">
          PKR {product.price.toLocaleString("en-PK")}
        </span>

        <CartCtaRow
          className="mt-8"
          onAdd={() => addToCart(product.id)}
          label="Cart mein daloo"
        />
      </motion.div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="drop" className="relative w-full bg-bg px-6 py-28 lg:px-10 overflow-hidden select-none border-b border-border">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Section labels */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label inline-flex items-center"
        >
          THE DROP
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mt-4"
        >
          THIS WEEK, ONLY TWO.
        </motion.h2>

        {/* Editorial Rows */}
        <div className="mt-16 flex flex-col gap-12">
          {/* Row 1: Save Me Tote */}
          <FeaturedRow productId="1" />

          {/* Divider line drawing left to right when in view */}
          <div className="relative w-full h-[1px] bg-border overflow-hidden my-4">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-lime origin-left"
            />
          </div>

          {/* Row 2: Yelling Tote (alternating columns) */}
          <FeaturedRow productId="5" isReverse />
        </div>
      </div>
    </section>
  );
}
