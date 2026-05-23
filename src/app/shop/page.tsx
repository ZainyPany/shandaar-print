import type { Metadata } from "next";
import ProductGrid from "@/components/sections/ProductGrid";
import Customizer from "@/components/sections/Customizer";

export const metadata: Metadata = {
  title: "Shop — Shandaar Print | All Drops, Totes & Tees",
  description:
    "Every Shandaar Print design in one place. Pakistani graphic tees and tote bags — Hinglish humor, Karachi made.",
};

export default function ShopPage() {
  return (
    <main className="pt-32 md:pt-40">
      <header className="mx-auto w-full max-w-7xl px-4 md:px-8 mb-4">
        <span className="font-meme text-lime text-lg tracking-[0.25em] uppercase block mb-3">
          // SHOP
        </span>
        <h1 className="font-meme text-[3.5rem] md:text-[6rem] leading-[0.9] uppercase text-text1">
          EVERY DROP. <br />
          <span className="text-lime">ONE PLACE.</span>
        </h1>
      </header>

      <ProductGrid />
      <Customizer />
    </main>
  );
}
