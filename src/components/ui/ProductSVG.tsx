"use client";
import React from "react";
import type { Product } from "@/lib/products";

type ProductSVGProps = {
  product: Product;
  className?: string;
};

export default function ProductSVG({ product, className }: ProductSVGProps) {
  const { name, cat, color, accent } = product;

  // Color theme mapper
  const getTheme = () => {
    switch (color) {
      case "black":
        return {
          bg: "#0f0f0f",
          silhouetteFill: "#161616",
          silhouetteStroke: "#2b2b2b",
          textDefault: "#f5f0e8",
          textAccent: accent,
          badgeBg: "#d4f062",
          badgeText: "#0a0a0a"
        };
      case "cream":
        return {
          bg: "#fcfaf7",
          silhouetteFill: "#f5f0e8",
          silhouetteStroke: "#e3dbcd",
          textDefault: "#0a0a0a",
          textAccent: accent === "#0a0a0a" ? "#FF7A00" : accent, // Ensure contrast
          badgeBg: "#FF7A00",
          badgeText: "#f5f0e8"
        };
      case "white":
      default:
        return {
          bg: "#fafafa",
          silhouetteFill: "#ffffff",
          silhouetteStroke: "#e2e2e2",
          textDefault: "#0a0a0a",
          textAccent: accent,
          badgeBg: "#7c4dff",
          badgeText: "#ffffff"
        };
    }
  };

  const theme = getTheme();

  // Smart word wrap and custom layout lines for our 8 designs
  const getLines = (): string[] => {
    const clean = name.toUpperCase().trim();
    if (clean.includes("SAVE ME")) {
      return ["SAVE ME.", "JPG OR", "PDF?"];
    }
    if (clean.includes("GEN Z")) {
      return ["GEN", "ZZZZZZZZ"];
    }
    if (clean.includes("TENSION")) {
      return ["TENSION LENE", "KA NAHI", "DENE KA"];
    }
    if (clean.includes("LOVE BOHOT")) {
      return ["ALL I NEED IS", "LOVE", "BOHOT PAISE"];
    }
    if (clean.includes("YELLING")) {
      return ["I AM NOT", "YELLING I AM", "PAKISTANI!!"];
    }
    if (clean.includes("CHAA PEE")) {
      return ["CHAA PEE LO.", "PHIR", "SOCHENGE"];
    }
    if (clean.includes("BOHOT SHANDAAR")) {
      return ["BOHOT", "SHANDAAR."];
    }
    if (clean.includes("KARACHI")) {
      return ["KARACHI", "WALAY HAIN", "HUM"];
    }

    // Dynamic word wrapping to ~14 characters fallback
    const words = clean.split(" ");
    const lines: string[] = [];
    let current = "";
    words.forEach((w) => {
      if ((current + " " + w).trim().length <= 14) {
        current = (current + " " + w).trim();
      } else {
        if (current) lines.push(current);
        current = w;
      }
    });
    if (current) lines.push(current);
    return lines;
  };

  const lines = getLines();

  // Base Y offset calculation to vertically center lines inside the printable area
  const stepY = 36;
  const startY = 246 - ((lines.length - 1) * stepY) / 2;

  return (
    <svg
      viewBox="0 0 400 400"
      width="100%"
      height="100%"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ background: theme.bg }}
    >
      {/* Grid Pattern overlay for tech/street vibe */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.025)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Renders TOTE BAG silhouette */}
      {cat === "tote" && (
        <g id="tote-graphics">
          {/* Straps */}
          <path
            d="M 140 160 C 140 50, 260 50, 260 160"
            fill="none"
            stroke={theme.silhouetteStroke}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 152 160 C 152 65, 248 65, 248 160"
            fill="none"
            stroke={theme.silhouetteStroke}
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Bag Body */}
          <path
            d="M 110 160 L 290 160 C 295 160, 300 165, 301 172 L 285 342 C 284 352, 274 360, 264 360 L 136 360 C 126 360, 116 352, 115 342 L 99 172 C 100 165, 105 160, 110 160 Z"
            fill={theme.silhouetteFill}
            stroke={theme.silhouetteStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Fabric texture lines */}
          <line x1="110" y1="168" x2="290" y2="168" stroke={theme.silhouetteStroke} strokeWidth="1" opacity="0.5" />
          <path
            d="M 120 350 L 280 350"
            stroke={theme.silhouetteStroke}
            strokeWidth="2"
            strokeDasharray="4, 4"
            opacity="0.5"
          />
        </g>
      )}

      {/* Renders T-SHIRT silhouette */}
      {cat === "tshirt" && (
        <g id="tshirt-graphics">
          {/* Main T-Shirt Path */}
          <path
            d="M 160 80 C 180 94, 220 94, 240 80 L 305 98 C 315 101, 325 110, 330 120 L 355 170 C 360 180, 355 190, 345 192 L 310 200 L 310 350 C 310 360, 300 370, 290 370 L 110 370 C 100 370, 90 360, 90 350 L 90 200 L 55 192 C 45 190, 40 180, 45 170 L 70 120 C 75 110, 85 101, 95 98 Z"
            fill={theme.silhouetteFill}
            stroke={theme.silhouetteStroke}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Collar detail */}
          <path
            d="M 160 80 C 180 94, 220 94, 240 80 C 235 90, 165 90, 160 80 Z"
            fill="none"
            stroke={theme.silhouetteStroke}
            strokeWidth="1.5"
          />
          {/* Sleeve seams */}
          <line x1="110" y1="102" x2="125" y2="200" stroke={theme.silhouetteStroke} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <line x1="290" y1="102" x2="275" y2="200" stroke={theme.silhouetteStroke} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
        </g>
      )}

      {/* Brand Label inside (neck tag or inner pocket detail) */}
      <text
        x="200"
        y={cat === "tshirt" ? "120" : "185"}
        fontFamily="'Bebas Neue', sans-serif"
        fontSize="12"
        fill={theme.silhouetteStroke}
        textAnchor="middle"
        letterSpacing="0.2em"
        opacity="0.8"
      >
        BOHOT SHANDAAR
      </text>

      {/* Typography Overlay */}
      <g id="typography-overlay">
        {lines.map((line, idx) => {
          const isLast = idx === lines.length - 1;
          const currentY = startY + idx * stepY;
          const isLove = line.trim() === "LOVE";
          const isPaise = line.trim() === "BOHOT PAISE";

          return (
            <g key={idx}>
              {/* LOVE crossed out detail */}
              {isLove ? (
                <g>
                  {/* LOVE text */}
                  <text
                    x="200"
                    y={currentY}
                    fontFamily="'Bebas Neue', sans-serif"
                    fontSize="36"
                    fontWeight="bold"
                    fill={theme.textDefault}
                    textAnchor="middle"
                    letterSpacing="0.04em"
                  >
                    {line}
                  </text>
                  {/* Cross out line */}
                  <line
                    x1="160"
                    y1={currentY - 12}
                    x2="240"
                    y2={currentY - 12}
                    stroke="#FF7A00"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </g>
              ) : isPaise ? (
                <g>
                  {/* BOHOT PAISE text underlined */}
                  <text
                    x="200"
                    y={currentY}
                    fontFamily="'Bebas Neue', sans-serif"
                    fontSize="36"
                    fontWeight="bold"
                    fill={theme.textAccent}
                    textAnchor="middle"
                    letterSpacing="0.04em"
                  >
                    {line}
                  </text>
                  {/* Underline */}
                  <line
                    x1="120"
                    y1={currentY + 6}
                    x2="280"
                    y2={currentY + 6}
                    stroke={theme.textAccent}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>
              ) : (
                <text
                  x="200"
                  y={currentY}
                  fontFamily="'Bebas Neue', sans-serif"
                  fontSize={lines.length > 2 ? "32" : "36"}
                  fontWeight="bold"
                  fill={isLast ? theme.textAccent : theme.textDefault}
                  textAnchor="middle"
                  letterSpacing="0.04em"
                  fontStyle={isLast && product.id === "7" ? "italic" : "normal"}
                >
                  {line}
                </text>
              )}
            </g>
          );
        })}
      </g>

      {/* NEW Badge inside the canvas (upper right) */}
      {product.isNew && (
        <g transform="translate(305, 30)">
          <rect
            width="65"
            height="26"
            rx="4"
            fill={theme.badgeBg}
          />
          <text
            x="32.5"
            y="17"
            fontFamily="'Bebas Neue', sans-serif"
            fontSize="12"
            fontWeight="bold"
            fill={theme.badgeText}
            textAnchor="middle"
            letterSpacing="0.15em"
          >
            NEW DROP
          </text>
        </g>
      )}
    </svg>
  );
}
