"use client";
import Image from "next/image";
import type { Product } from "@/lib/products";
import ProductSVG from "./ProductSVG";

type Props = {
  product: Product;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Renders the product's photo via next/image when `product.image` is set,
 * otherwise falls back to the branded ProductSVG so the site always looks finished.
 *
 * Drop photos in /public/products/ and set `image` on the product in src/lib/products.ts.
 */
export default function ProductMedia({ product, sizes, priority, className }: Props) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes={sizes || "(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"}
        className={className || "object-cover"}
        priority={priority}
      />
    );
  }
  return <ProductSVG product={product} className={className} />;
}
