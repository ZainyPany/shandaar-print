import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-cream": "var(--color-bg-cream)",
        surface: "var(--color-surface)",
        "surface-2": "var(--color-surface-2)",
        border: "var(--color-border)",
        text1: "var(--color-text-1)",
        text2: "var(--color-text-2)",
        "text-dark": "var(--color-text-dark)",
        lime: "var(--color-accent-lime)",
        purple: "var(--color-accent-purple)",
        teal: "var(--color-accent-teal)",
        blue: "var(--color-accent-blue)"
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-epilogue)", "sans-serif"],
        meme: ["var(--font-bebas)", "sans-serif"]
      },
      fontSize: {
        hero: "var(--text-hero)",
        "3xl": "var(--text-3xl)",
        "2xl": "var(--text-2xl)",
        xl: "var(--text-xl)",
        base: "var(--text-base)",
        sm: "var(--text-sm)"
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        elastic: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }
    }
  },
  plugins: []
};
export default config;
