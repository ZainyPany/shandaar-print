"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        // PostgREST unique constraint error code 23505 means already subscribed
        if (error.code === "23505") {
          setStatus("success");
          setEmail("");
          return;
        }
        console.error("Supabase error:", error);
        setStatus("idle");
        alert("Kuch error aagaya bhai. Double check your internet!");
        return;
      }
      
      setStatus("success");
      setEmail("");
    } catch (err) {
      console.error("Submission failed:", err);
      setStatus("idle");
      alert("Database error! Check environment variables.");
    }
  };

  return (
    <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto overflow-hidden rounded-lg bg-surface border border-border my-16">
      {/* Drifting Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--color-accent-lime) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          animation: "driftDotGrid 40s linear infinite",
        }}
      />
      <style jsx global>{`
        @keyframes driftDotGrid {
          from { background-position: 0px 0px; }
          to { background-position: 240px 240px; }
        }
      `}</style>

      {/* Radial shade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,var(--color-bg)_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        <span className="font-meme text-lime text-lg tracking-[0.25em] uppercase block mb-3">
          // JOIN THE GANG
        </span>

        <AnimatePresence mode="wait">
          {status !== "success" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              <h2 className="font-meme text-5xl md:text-7xl uppercase leading-[0.9] text-text1 mb-4">
                GET THE <span className="text-lime">DROP ALERTS</span>
              </h2>
              <p className="font-body text-text2 text-sm sm:text-base mb-8 max-w-md">
                No corporate updates. Zero junk. Only midnight drops, special discounts, and memes. We only email when it's Shandaar.
              </p>

              <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="APNA_EMAIL@DOMAIN.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="flex-grow px-5 py-4 bg-bg text-text1 border border-border focus:border-lime focus:outline-none font-body text-sm rounded-[2px] transition-colors duration-200"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn px-8 py-4 bg-lime text-text-dark font-meme text-base tracking-widest uppercase hover:bg-white hover:text-bg transition-colors duration-300 rounded-[2px] relative overflow-hidden flex items-center justify-center min-w-[140px] cursor-none"
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      SAVING...
                    </span>
                  ) : (
                    "SUBSCRIBE"
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="py-6 flex flex-col items-center"
            >
              {/* Confetti-like success icon */}
              <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mb-6 text-lime text-3xl border border-lime/30">
                🎉
              </div>
              <h2 className="font-meme text-5xl md:text-7xl uppercase leading-[0.9] text-lime mb-4">
                MUBARAK HO!
              </h2>
              <p className="font-body text-text1 text-base max-w-md">
                You are officially part of the Shandaar Print tribe. Double-check your inbox (or spam, because sometimes email servers are boring) for your special invite.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 font-meme text-xs tracking-[0.2em] text-text2 hover:text-lime uppercase border-b border-text2 hover:border-lime pb-1 transition-all duration-200 cursor-none"
              >
                ← BACK TO SIGN UP
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
