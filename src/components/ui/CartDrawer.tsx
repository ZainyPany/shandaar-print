"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import ProductMedia from "./ProductMedia";

export default function CartDrawer() {
  const {
    detailedItems,
    isOpen,
    closeCart,
    removeFromCart,
    changeQty,
    clearCart,
    subtotal,
    count
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Checkout States
  const [isCheckout, setIsCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "success">("idle");
  const [orderId, setOrderId] = useState("");

  // Checkout Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("JazzCash");

  // Close cart drawer on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCart]);

  // Reset checkout states when drawer opens/closes
  useEffect(() => {
    if (!isOpen) {
      setIsCheckout(false);
      setCheckoutStatus("idle");
      setOrderId("");
    }
  }, [isOpen]);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;
    setCheckoutStatus("loading");

    try {
      const generatedOrderId = "SP-" + Math.floor(100000 + Math.random() * 900000);
      
      const { error } = await supabase.from("orders").insert([
        {
          customer_name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          payment_method: paymentMethod,
          items: detailedItems.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            tagline: item.product.tagline,
            price: item.product.price,
            qty: item.qty,
          })),
          subtotal: subtotal,
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Supabase Checkout Error:", error);
        alert("Database connection failed! Ensure you set up environment variables.");
        setCheckoutStatus("idle");
        return;
      }

      setOrderId(generatedOrderId);
      setCheckoutStatus("success");
      clearCart();
    } catch (err) {
      console.error("Checkout crash:", err);
      alert("Something went wrong!");
      setCheckoutStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Semi-transparent backdrop overlay, clicking closes drawer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            className="fixed inset-0 z-[1250] bg-black/70 backdrop-blur-[2px]"
          />

          {/* Cart Sidebar Panel */}
          <motion.aside
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[1300] flex h-screen w-full max-w-[420px] flex-col border-l border-border bg-surface text-text1 select-none"
            aria-label="Shopping bag side panel"
          >
            {/* Header section */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h3 className="font-meme text-2xl tracking-[0.08em] uppercase">
                {checkoutStatus === "success" ? (
                  <span className="text-lime">ORDER PLACED</span>
                ) : isCheckout ? (
                  <span>DELIVERY DETAILS</span>
                ) : (
                  <>
                    YOUR BAG <span className="text-lime">({count})</span>
                  </>
                )}
              </h3>
              <button
                aria-label="Close cart drawer"
                onClick={closeCart}
                className="font-body text-2xl text-text2 hover:text-lime transition-colors cursor-none px-2"
              >
                ×
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                {checkoutStatus === "success" ? (
                  /* ORDER SUCCESS SCREEN */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-6 text-center"
                  >
                    <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mb-6 text-lime text-3xl border border-lime/30">
                      🛒
                    </div>
                    <h4 className="font-meme text-3xl text-lime tracking-wider uppercase mb-2">
                      TENSION INSHALLAH END!
                    </h4>
                    <p className="font-body text-xs text-text2 uppercase tracking-widest mb-6">
                      ORDER ID: <span className="text-text1 font-bold">{orderId}</span>
                    </p>
                    <div className="bg-surface-2 border border-border p-4 rounded-md text-left w-full text-xs font-body leading-relaxed text-text2 mb-6">
                      <p className="text-text1 font-bold uppercase tracking-wider mb-2 font-meme text-sm">// NEXT STEPS:</p>
                      <ol className="list-decimal pl-4 flex flex-col gap-2">
                        <li>Send your order amount to JazzCash/Easypaisa/Bank.</li>
                        <li>Take a screenshot of the payment receipt.</li>
                        <li>WhatsApp the receipt with your Order ID to <strong>+92 300 1234567</strong>.</li>
                      </ol>
                    </div>
                    <button
                      onClick={closeCart}
                      className="w-full bg-lime text-[var(--color-text-dark)] font-meme text-base uppercase tracking-[0.14em] py-3.5 rounded-full transition-all duration-300 ease-out border border-lime hover:bg-bg hover:text-lime font-bold cursor-none"
                    >
                      BOHOT SHANDAAR!
                    </button>
                  </motion.div>
                ) : isCheckout ? (
                  /* CHECKOUT FORM */
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-5"
                  >
                    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                      
                      {/* Name input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-meme text-xs tracking-wider text-text2 uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Asad Ahmed"
                          disabled={checkoutStatus === "loading"}
                          className="bg-bg text-text1 border border-border px-4 py-3 rounded-[3px] font-body text-sm focus:outline-none focus:border-lime disabled:opacity-50"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-meme text-xs tracking-wider text-text2 uppercase">
                          WhatsApp / Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 0300 1234567"
                          disabled={checkoutStatus === "loading"}
                          className="bg-bg text-text1 border border-border px-4 py-3 rounded-[3px] font-body text-sm focus:outline-none focus:border-lime disabled:opacity-50"
                        />
                      </div>

                      {/* Delivery Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-meme text-xs tracking-wider text-text2 uppercase">
                          Complete Address (with City)
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="e.g. House 45, Street 2, DHA Phase 6, Karachi"
                          disabled={checkoutStatus === "loading"}
                          className="bg-bg text-text1 border border-border px-4 py-3 rounded-[3px] font-body text-sm focus:outline-none focus:border-lime disabled:opacity-50 resize-none"
                        />
                      </div>

                      {/* Payment Method Selection */}
                      <div className="flex flex-col gap-2">
                        <label className="font-meme text-xs tracking-wider text-text2 uppercase">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["JazzCash", "Easypaisa", "Bank Transfer"].map((method) => {
                            const isSelected = method === paymentMethod;
                            return (
                              <button
                                key={method}
                                type="button"
                                onClick={() => setPaymentMethod(method)}
                                disabled={checkoutStatus === "loading"}
                                className={`px-2 py-3 border rounded-md font-meme text-xs tracking-wider transition-all duration-300 text-center cursor-none ${
                                  isSelected
                                    ? "bg-lime text-[var(--color-text-dark)] border-lime shadow-md font-bold scale-[1.03]"
                                    : "bg-surface-2/40 border-border text-text1 hover:border-text2"
                                }`}
                              >
                                {method.toUpperCase()}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="flex flex-col gap-3 mt-4">
                        <button
                          type="submit"
                          disabled={checkoutStatus === "loading"}
                          className="w-full bg-lime text-[var(--color-text-dark)] font-meme text-base uppercase tracking-[0.14em] py-3.5 rounded-full transition-all duration-300 ease-out border border-lime hover:bg-bg hover:text-lime font-bold cursor-none flex items-center justify-center gap-2"
                        >
                          {checkoutStatus === "loading" ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              PLACING ORDER...
                            </>
                          ) : (
                            "CONFIRM ORDER (PKR " + subtotal.toLocaleString() + ")"
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsCheckout(false)}
                          disabled={checkoutStatus === "loading"}
                          className="w-full text-center font-meme text-xs tracking-[0.18em] text-text2 hover:text-lime uppercase transition-colors py-2 cursor-none disabled:opacity-50"
                        >
                          ← BACK TO BAG
                        </button>
                      </div>

                    </form>
                  </motion.div>
                ) : detailedItems.length === 0 ? (
                  /* EMPTY STATE */
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <span className="text-7xl" role="img" aria-label="crying-face">🥲</span>
                    <h4 className="mt-6 font-meme text-xl tracking-[0.06em] text-text1">
                      BASKET KHALI HAI BHAI
                    </h4>
                    <p className="mt-2 font-body text-sm text-text2 max-w-[240px]">
                      Kuch nahi hai yahan. Fauri tor par shop par jao aur design add karo!
                    </p>
                  </motion.div>
                ) : (
                  /* CART CONTENT LIST */
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col divide-y divide-border/60"
                  >
                    {detailedItems.map(({ product, qty }) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4 py-4"
                      >
                        {/* 64px thumbnail preview */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-surface-2">
                          <ProductMedia product={product} sizes="64px" />
                        </div>

                        {/* Middle detailed metadata */}
                        <div className="flex-1">
                          <h5 className="font-display text-sm font-bold leading-tight line-clamp-1">
                            {product.name}
                          </h5>
                          <p className="font-body text-[11px] uppercase tracking-[0.1em] text-text2 mt-0.5">
                            {product.cat === "tote" ? "Tote Bag" : "T-Shirt"}
                          </p>
                          {product.id.startsWith("custom-tshirt") && (
                            <p className="font-body text-[10px] text-lime font-medium mt-0.5 uppercase tracking-wider">
                              {product.tagline}
                            </p>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            <button
                              onClick={() => changeQty(product.id, -1)}
                              className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-border text-xs text-text2 hover:bg-lime hover:text-bg hover:border-lime transition-all duration-200 cursor-none"
                            >
                              -
                            </button>
                            <span className="font-meme text-xs tracking-wider px-1 text-text1">
                              {qty}
                            </span>
                            <button
                              onClick={() => changeQty(product.id, 1)}
                              className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-border text-xs text-text2 hover:bg-lime hover:text-bg hover:border-lime transition-all duration-200 cursor-none"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Right side remove button and pricing */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            aria-label={`Remove ${product.name} from bag`}
                            onClick={() => removeFromCart(product.id)}
                            className="text-lg text-text2 hover:text-red-400 transition-colors cursor-none px-1 leading-none"
                          >
                            ×
                          </button>
                          <span className="font-meme text-[17px] tracking-wide text-lime">
                            {formatPKR(product.price * qty)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky footer checkout bar */}
            {detailedItems.length > 0 && !isCheckout && (
              <div className="border-t border-border bg-surface-2/40 px-6 py-5">
                <div className="flex items-center justify-between font-meme text-lg tracking-[0.06em] mb-4">
                  <span className="text-text2">SUBTOTAL</span>
                  <span className="text-lime text-2xl font-bold">{formatPKR(subtotal)}</span>
                </div>
                
                <button
                  onClick={() => setIsCheckout(true)}
                  className="w-full bg-lime text-[var(--color-text-dark)] hover:bg-bg hover:text-lime font-meme text-base uppercase tracking-[0.14em] py-3.5 rounded-full transition-all duration-300 ease-out border border-lime flex items-center justify-center cursor-none font-bold"
                >
                  CHECKOUT — TENSION LENE KA NAHI
                </button>

                <p className="text-center font-body text-[11px] text-text2 mt-3 tracking-wide">
                  Pay via JazzCash, Easypaisa, or Bank Transfer
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
