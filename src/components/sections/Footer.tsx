"use client";
import { useCart } from "@/lib/cart-context";

export default function Footer() {
  const { openCart } = useCart();

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="relative border-t border-border bg-[#050505] pt-16 pb-8 px-4 md:px-8 overflow-hidden">
      {/* Absolute Bottom Backdrop Grid */}
      <div className="absolute inset-0 bg-grid-faint opacity-[0.25] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-meme text-4xl text-lime tracking-wide flex items-center gap-1.5 mb-4 select-none">
                SHANDAAR PRINT<span className="text-[#FF7A00]">.</span>
              </div>
              <p className="font-body text-sm text-text2 max-w-sm leading-relaxed mb-6">
                Desi meme tees and premium graphic totes designed for the culture. Karachi made, shipping all over Pakistan. Bohot Shandaar.
              </p>
            </div>
            
            {/* WhatsApp Contact Callout */}
            <div className="flex items-center">
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn group flex items-center gap-3 bg-surface hover:bg-lime border border-border hover:border-lime px-5 py-3 rounded-[2px] font-meme text-sm tracking-widest text-text1 hover:text-text-dark transition-all duration-350 cursor-none"
              >
                {/* WhatsApp SVG Icon */}
                <svg
                  className="w-5 h-5 fill-current text-[#25D366] group-hover:text-text-dark transition-colors duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.177-1.358a9.926 9.926 0 0 0 4.829 1.258h.006c5.507 0 9.99-4.478 9.99-9.984a9.961 9.961 0 0 0-2.923-7.062A9.97 9.97 0 0 0 12.012 2zm5.795 14.282c-.254.717-1.472 1.405-2.023 1.493-.497.08-1.134.145-3.23-.728-2.681-1.116-4.417-3.837-4.551-4.015-.134-.178-1.096-1.45-1.096-2.766 0-1.317.69-1.96.938-2.228.248-.267.545-.333.726-.333.18 0 .362.001.52.008.167.008.39-.033.61.496.228.552.78 1.905.847 2.043.067.138.113.298.02.482-.092.183-.14.298-.276.458-.137.16-.289.356-.413.477-.138.138-.282.289-.12.569.162.278.718 1.186 1.54 1.916.856.762 1.579 1.002 1.805 1.116.227.114.361.097.496-.06.136-.156.578-.67.732-.897.155-.228.31-.19.522-.11.213.08 1.348.636 1.58.749.23.113.385.17.441.267.056.097.056.561-.197 1.278z" />
                </svg>
                TALK ON WHATSAPP
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="font-meme text-lg tracking-[0.2em] text-lime mb-6">
              // DISCOVER
            </h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-text2">
              <li>
                <button
                  onClick={() => handleScroll("hero")}
                  className="hover:text-lime transition-colors duration-200 cursor-none"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("collection")}
                  className="hover:text-lime transition-colors duration-200 cursor-none"
                >
                  COLLECTION
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("about")}
                  className="hover:text-lime transition-colors duration-200 cursor-none"
                >
                  ABOUT US
                </button>
              </li>
              <li>
                <button
                  onClick={openCart}
                  className="hover:text-lime transition-colors duration-200 cursor-none"
                >
                  MY CART (BAG)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div className="md:col-span-4">
            <h4 className="font-meme text-lg tracking-[0.2em] text-lime mb-6">
              // CUSTOMER CARE
            </h4>
            <ul className="flex flex-col gap-3 font-body text-sm text-text2 mb-6">
              <li>
                <a href="#" className="hover:text-lime transition-colors duration-200 cursor-none">
                  RETURNS & REFUNDS (10-DAY TENSION-FREE)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime transition-colors duration-200 cursor-none">
                  DELIVERY CHARGES & SIZE GUIDE
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-lime transition-colors duration-200 cursor-none">
                  TERMS OF SHANDAAR SERVICE
                </a>
              </li>
            </ul>
            <p className="font-body text-xs text-text2">
              For collaborations or custom bulk meme print orders, hit us up at: <br />
              <span className="text-white hover:text-lime transition-colors duration-200">hello@shandaarprint.com</span>
            </p>
          </div>
        </div>

        {/* Large Outlined Streetwear Logotype marquee */}
        <div className="relative border-y border-border py-4 my-8 select-none pointer-events-none overflow-hidden">
          <div className="flex gap-16 whitespace-nowrap animate-marquee font-meme text-[5rem] sm:text-[8rem] md:text-[10rem] font-black text-transparent stroke-text uppercase tracking-widest leading-[0.9]">
            <span>SHANDAAR PRINT</span>
            <span>★</span>
            <span>BOHOT SHANDAAR</span>
            <span>★</span>
            <span>SHANDAAR PRINT</span>
            <span>★</span>
            <span>BOHOT SHANDAAR</span>
            <span>★</span>
          </div>
          <style jsx>{`
            .stroke-text {
              -webkit-text-stroke: 1px var(--color-border);
            }
          `}</style>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border">
          <span className="font-body text-xs text-text2 text-center sm:text-left">
            © 2026 SHANDAAR PRINT. POWERED BY DESI MEMES. ALL RIGHTS SECURED.
          </span>

          {/* Payment Method Badges (Pills) */}
          <div className="flex flex-wrap gap-2 justify-center">
            {["CASH ON DELIVERY (COD)", "EASYPAISA", "JAZZCASH", "BANK TRANSFER"].map((method) => (
              <span
                key={method}
                className="px-3 py-1 font-meme text-[10px] tracking-widest text-text2 bg-surface border border-border rounded-[2px] select-none"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
