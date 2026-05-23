"use client";
import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LINKS = [
  { label: "Shop", href: "/#shop" },
  { label: "Drops", href: "/#drop" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[1200] flex flex-col bg-bg px-6 py-8 md:hidden select-none"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header Close row */}
      <div className="flex items-center justify-between">
        <span className="font-meme text-xl tracking-[0.2em] text-lime">MENU</span>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="rounded-full border border-border p-3 text-text1 hover:border-lime hover:text-lime transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex flex-1 flex-col justify-center gap-4 py-8">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={onClose}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-border/40 py-4 font-meme text-5xl tracking-[0.1em] text-text1 hover:text-lime transition-colors"
          >
            {link.label.toUpperCase()}
          </motion.a>
        ))}
      </nav>

      {/* Footer detail inside Mobile menu overlay */}
      <div className="text-center font-body text-xs text-text2 tracking-wider">
        MADE IN KARACHI · BOHOT SHANDAAR.
      </div>
    </motion.div>
  );
}
