"use client";
import React, { useState } from "react";
import Loader from "./Loader";
import Grain from "./Grain";
import CustomCursor from "./CustomCursor";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import SmoothScroll from "./SmoothScroll";
import Footer from "../sections/Footer";
import CartDrawer from "../ui/CartDrawer";
import { CartProvider } from "@/lib/cart-context";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
      {/* Fullscreen Loader screen */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main Page structure (Rendered hidden under loader and fade-in when loading finishes) */}
      <div 
        style={{ 
          opacity: loading ? 0 : 1,
          visibility: loading ? "hidden" : "visible",
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)" 
        }}
        className="flex flex-col min-h-screen relative overflow-x-hidden"
      >
        {/* Hype visual overlays */}
        <Grain />
        <CustomCursor />

        {/* Top Header chrome */}
        <AnnouncementBar />
        <Navbar />

        {/* Scrollable Area */}
        <SmoothScroll>
          <main id="top" className="flex-grow pt-[120px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>

        {/* Slid-in cart bag */}
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
