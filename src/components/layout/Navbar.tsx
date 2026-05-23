"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { label: "Shop", href: "/#shop" },
  { label: "Drops", href: "/#drop" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const { count, openCart } = useCart();

  useEffect(() => {
    // Delays entrance animation slightly to allow Loader to take stage first
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  useMotionValueEvent(scrollY, "change", (v) => {
    // Shift navbar background to blurred overlay once scrolled past 60px
    setSolid(v > 60);
  });

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -10 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed left-0 right-0 z-[1000] transition-all duration-400 ease-out",
          solid 
            ? "bg-bg/92 backdrop-blur-xl border-b border-border py-3" 
            : "bg-transparent py-5"
        )}
        style={{ top: 40 }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
          
          {/* LEFT: brand-mark logo pill */}
          <a href="#top" className="brand-mark flex items-center gap-1.5 select-none text-[28px] font-meme leading-none tracking-[0.04em]">
            <span className="bg-[#FFD600] text-[#0a0a0a] px-3.5 py-1 pt-1.5 rounded-full leading-none font-bold inline-block">
              SHANDAAR
            </span>
            <span className="text-[#FF7A00] font-bold leading-none inline-block">
              PRINT.
            </span>
          </a>

          {/* CENTER links: Epilogue 14px uppercase, draws underline left->right on hover */}
          <nav className="hidden items-center gap-10 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-body text-sm font-medium uppercase tracking-[0.1em] text-text1 transition-colors hover:text-lime"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-lime transition-all duration-300 ease-out origin-left group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* RIGHT actions: BAG pill button */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Open shopping bag"
              onClick={openCart}
              className="cart-btn font-meme text-base tracking-[0.14em] text-text1 border border-border px-6 py-2 rounded-full transition-all duration-300 ease-out hover:bg-lime hover:text-bg hover:border-lime select-none cursor-none flex items-center gap-2"
            >
              BAG <span className="bg-[#FF7A00] text-bg text-xs font-bold px-2 py-0.5 rounded-full leading-none min-w-[20px] text-center inline-block">{count}</span>
            </button>
            
            {/* Hamburger menu button for smaller screens */}
            <button
              aria-label="Open mobile navigation menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-full border border-border p-2.5 text-text1 md:hidden hover:border-lime hover:text-lime transition-colors cursor-none"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Mobile Navigation Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
