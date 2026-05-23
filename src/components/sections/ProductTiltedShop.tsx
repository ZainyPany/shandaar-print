"use client";

import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";
import { useCart } from "@/lib/cart-context";
import { productsForTiltedGrid } from "@/lib/products";

export default function ProductTiltedShop() {
  const { addToCart } = useCart();

  return (
    <ScrollTiltedGrid
      items={productsForTiltedGrid()}
      onAddToCart={addToCart}
      loop
      maxWidth="2xl"
      gap={10}
      className="pb-24"
    />
  );
}
