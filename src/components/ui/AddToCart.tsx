"use client";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import CartCtaRow from "./CartCtaRow";

export default function AddToCart({ product, className }: { product: Product; className?: string }) {
  const { addToCart } = useCart();
  return (
    <CartCtaRow
      className={cn(className)}
      onAdd={() => addToCart(product.id)}
      label="Cart mein daloo"
      compact
    />
  );
}
