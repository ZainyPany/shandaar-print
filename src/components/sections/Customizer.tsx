"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { 
  Sparkles, 
  Move, 
  RotateCw, 
  Maximize2, 
  ShoppingCart, 
  RefreshCw, 
  Type, 
  Image as ImageIcon 
} from "lucide-react";

// T-shirt size options
const SIZES = ["S", "M", "L", "XL", "XXL"];

// Dynamic sticker background colors
const COLORS = [
  { name: "Shandaar Yellow", value: "#FFD600", text: "#0a0a0a" },
  { name: "Hype Lime", value: "#d4f062", text: "#0a0a0a" },
  { name: "Karachi Orange", value: "#FF7A00", text: "#0a0a0a" },
  { name: "Neon Teal", value: "#4dd0c4", text: "#0a0a0a" },
  { name: "Retro Purple", value: "#7c4dff", text: "#f5f0e8" },
  { name: "Transparent", value: "transparent", text: "#d4f062" }
];

// Custom, lightweight vector SVG components for customizer options
const SaveMeSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <rect x="5" y="5" width="150" height="150" rx="10" fill="#111" stroke="#7c4dff" strokeWidth="4" />
    <rect x="15" y="15" width="130" height="32" rx="4" fill="#7c4dff" />
    <text x="80" y="36" fontFamily="var(--font-bebas)" fontSize="19" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.08em">SAVE FILE</text>
    <text x="80" y="82" fontFamily="var(--font-bebas)" fontSize="26" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.05em">SAVE ME.</text>
    <text x="80" y="112" fontFamily="var(--font-bebas)" fontSize="20" fill="#d4f062" textAnchor="middle" letterSpacing="0.05em">JPG OR PDF?</text>
    <rect x="25" y="132" width="110" height="8" fill="#2e2e3e" rx="2" />
    <rect x="25" y="132" width="75" height="8" fill="#7c4dff" rx="2" />
  </svg>
);

const TensionLeneKaNahiSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <circle cx="80" cy="80" r="70" fill="#0f0f0f" stroke="#4dd0c4" strokeWidth="4" />
    <circle cx="80" cy="80" r="62" fill="none" stroke="#4dd0c4" strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="80" y="56" fontFamily="var(--font-bebas)" fontSize="18" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.1em">TENSION LENE KA</text>
    <text x="80" y="92" fontFamily="var(--font-bebas)" fontSize="32" fill="#4dd0c4" textAnchor="middle" letterSpacing="0.05em">NAHI</text>
    <text x="80" y="122" fontFamily="var(--font-bebas)" fontSize="18" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.1em">DENE KA.</text>
  </svg>
);

const GenZzzSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <rect x="5" y="5" width="150" height="150" rx="8" fill="#111" stroke="#5b9bd5" strokeWidth="4" />
    <path d="M 30 65 L 130 65" stroke="#222" strokeWidth="8" strokeLinecap="round" />
    <path d="M 30 115 L 130 115" stroke="#222" strokeWidth="8" strokeLinecap="round" />
    <text x="80" y="52" fontFamily="var(--font-bebas)" fontSize="26" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.05em">GEN ZZZ</text>
    <text x="80" y="100" fontFamily="var(--font-bebas)" fontSize="36" fill="#5b9bd5" textAnchor="middle" letterSpacing="0.1em">SNOOZE</text>
    <text x="80" y="136" fontFamily="var(--font-epilogue)" fontSize="9" fontWeight="bold" fill="#FF7A00" textAnchor="middle" letterSpacing="0.15em">STATUS: BORN TIRED</text>
  </svg>
);

const DeadInsideSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <rect x="5" y="5" width="150" height="150" rx="16" fill="#151515" stroke="#FF7A00" strokeWidth="4" />
    <path d="M 80 32 L 90 52 H 112 L 94 65 L 101 87 L 80 73 L 59 87 L 66 65 L 48 52 H 70 Z" fill="#FF7A00" />
    <text x="80" y="115" fontFamily="var(--font-bebas)" fontSize="34" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.05em">DEAD INSIDE</text>
    <text x="80" y="138" fontFamily="var(--font-epilogue)" fontSize="10" fill="#888880" textAnchor="middle" letterSpacing="0.1em">BUT STILL VIBING</text>
  </svg>
);

const AiUserSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <rect x="5" y="5" width="150" height="150" fill="#050505" stroke="#d4f062" strokeWidth="3" />
    <rect x="12" y="12" width="136" height="136" fill="none" stroke="#d4f062" strokeWidth="1" strokeDasharray="3, 5" opacity="0.4" />
    <text x="20" y="45" fontFamily="monospace" fontSize="11" fill="#d4f062" textAnchor="start">&gt; RUN CUSTOM_AI</text>
    <text x="20" y="68" fontFamily="monospace" fontSize="11" fill="#f5f0e8" textAnchor="start">&gt; NO THANKS,</text>
    <text x="20" y="90" fontFamily="monospace" fontSize="11" fill="#f5f0e8" textAnchor="start">&gt; I USE AI.</text>
    <text x="20" y="118" fontFamily="monospace" fontSize="9" fill="#888" textAnchor="start">[PROMPT COMPLETE]</text>
    <rect x="20" y="128" width="10" height="12" fill="#d4f062" />
  </svg>
);

const WhatTheNihariSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <rect x="5" y="5" width="150" height="150" rx="12" fill="#0a0a0a" stroke="#FFD600" strokeWidth="4" />
    <path d="M 30 75 Q 80 120 130 75" fill="none" stroke="#FFD600" strokeWidth="4" strokeLinecap="round" />
    <circle cx="80" cy="80" r="16" fill="#FF7A00" stroke="#FFD600" strokeWidth="2" />
    <text x="80" y="46" fontFamily="var(--font-bebas)" fontSize="20" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.1em">WHAT THE</text>
    <text x="80" y="130" fontFamily="var(--font-bebas)" fontSize="28" fill="#FFD600" textAnchor="middle" letterSpacing="0.05em">FAT-FREE NIHARI</text>
  </svg>
);

const PiPiKaHisaabSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <circle cx="80" cy="80" r="70" fill="#0a0a0a" stroke="#FFD600" strokeWidth="3" />
    <circle cx="80" cy="80" r="64" fill="none" stroke="#FFD600" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <text x="80" y="58" fontFamily="var(--font-bebas)" fontSize="20" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.08em">PI PI KA</text>
    <text x="80" y="96" fontFamily="var(--font-bebas)" fontSize="34" fill="#FFD600" textAnchor="middle" letterSpacing="0.05em">HISAAB</text>
    <text x="80" y="126" fontFamily="var(--font-bebas)" fontSize="18" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.08em">LOONGA.</text>
  </svg>
);

const KarachiCertifiedSvg = () => (
  <svg viewBox="0 0 160 160" className="w-[160px] h-[160px] select-none">
    <polygon points="80,10 98,45 138,45 106,70 118,108 80,85 42,108 54,70 22,45 62,45" fill="#FFD600" stroke="#0a0a0a" strokeWidth="2" />
    <text x="80" y="70" fontFamily="var(--font-bebas)" fontSize="18" fill="#0a0a0a" fontWeight="bold" textAnchor="middle">APPROVED</text>
    <text x="80" y="132" fontFamily="var(--font-bebas)" fontSize="16" fill="#f5f0e8" textAnchor="middle" letterSpacing="0.1em">KARACHI STREET LAB</text>
    <text x="80" y="150" fontFamily="var(--font-epilogue)" fontSize="8" fill="#FF7A00" textAnchor="middle" letterSpacing="0.15em">100% COTTON DRIP</text>
  </svg>
);

export default function Customizer() {
  const { addToCart } = useCart();
  const printAreaRef = useRef<HTMLDivElement>(null);

  // Touch device detection to prevent mobile scrolling interference
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    }
  }, []);

  // Customizer States
  const [activeTab, setActiveTab] = useState<"graphic" | "text">("graphic");
  const [selectedSize, setSelectedSize] = useState("L");
  const [scale, setScale] = useState(0.85);
  const [rotate, setRotate] = useState(0);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Selected Graphic state
  const [selectedGraphicId, setSelectedGraphicId] = useState("gen-zzz");
  
  // Custom Text Builder states
  const [customText, setCustomText] = useState("TENSION LENE KA NAHI");
  const [customFont, setCustomFont] = useState("font-meme"); // font-meme, font-display, font-body
  const [customColorObj, setCustomColorObj] = useState(COLORS[0]); // Shandaar Yellow
  const [customBorder, setCustomBorder] = useState(true);

  // List of Graphic options (Originals + Our Creative Custom Presets!)
  const GRAPHICS = [
    {
      id: "gen-zzz",
      name: "Gen Zzz",
      type: "dynamic",
      accent: "#5b9bd5",
      tagline: "Born tired, staying iconic.",
      render: () => <GenZzzSvg />
    },
    {
      id: "dead-inside",
      name: "Dead Inside",
      type: "dynamic",
      accent: "#FF7A00",
      tagline: "Wear it Monday so HR knows.",
      render: () => <DeadInsideSvg />
    },
    {
      id: "no-thanks-ai",
      name: "No Thanks, AI",
      type: "dynamic",
      accent: "#d4f062",
      tagline: "2026's flex. Worn ironically.",
      render: () => <AiUserSvg />
    },
    {
      id: "what-the-nihari",
      name: "Fat-Free Nihari",
      type: "dynamic",
      accent: "#FFD600",
      tagline: "A crime against food, a great tee.",
      render: () => <WhatTheNihariSvg />
    },
    {
      id: "save-me",
      name: "Save Me",
      type: "dynamic",
      accent: "#7c4dff",
      tagline: "For everyone in feedback hell.",
      render: () => <SaveMeSvg />
    },
    {
      id: "pi-pi-hisaab",
      name: "Pi Pi Ka Hisaab",
      type: "dynamic",
      accent: "#FFD600",
      tagline: "The accountant inside you.",
      render: () => <PiPiKaHisaabSvg />
    },
    {
      id: "bohot-shandaar-stamp",
      name: "Shandaar Stamp",
      type: "dynamic",
      accent: "#FFD600",
      tagline: "Karachi's certified street stamp.",
      render: () => <KarachiCertifiedSvg />
    },
    {
      id: "chill-maaro",
      name: "Chill Maaro",
      type: "dynamic",
      accent: "#4dd0c4",
      tagline: "Desi street mantra. Relax bro.",
      render: () => <TensionLeneKaNahiSvg />
    }
  ];

  const currentGraphic = GRAPHICS.find(g => g.id === selectedGraphicId) || GRAPHICS[0];

  // Reset controls
  const handleReset = () => {
    setScale(0.85);
    setRotate(0);
    setPosX(0);
    setPosY(0);
    if (activeTab === "text") {
      setCustomText("TENSION LENE KA NAHI");
      setCustomFont("font-meme");
      setCustomColorObj(COLORS[0]);
      setCustomBorder(true);
    }
  };

  // Preset positioning values
  const applyPreset = (preset: "left" | "center" | "pocket" | "tilted") => {
    if (preset === "left") {
      setScale(0.5);
      setRotate(0);
      setPosX(-30);
      setPosY(-30);
    } else if (preset === "center") {
      setScale(0.9);
      setRotate(0);
      setPosX(0);
      setPosY(0);
    } else if (preset === "pocket") {
      setScale(0.4);
      setRotate(-5);
      setPosX(-35);
      setPosY(-45);
    } else if (preset === "tilted") {
      setScale(0.75);
      setRotate(-12);
      setPosX(10);
      setPosY(15);
    }
  };

  // Add customized item to cart drawer
  const handleAddToCart = () => {
    const graphicName = activeTab === "graphic" ? currentGraphic.name : "Custom Text Print";
    const customTextOption = activeTab === "text" ? customText : undefined;
    
    addToCart("custom-tshirt", {
      size: selectedSize,
      graphicName: graphicName,
      customText: customTextOption
    });
  };

  return (
    <section id="customizer" className="relative py-28 px-4 md:px-8 border-t border-border overflow-hidden select-none bg-bg">
      {/* Absolute Decorative Blobs */}
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-purple opacity-[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute right-10 top-1/3 w-72 h-72 bg-lime opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1400px]">
        {/* Title Block */}
        <div className="mb-16">
          <span className="font-meme text-lime text-lg tracking-[0.25em] uppercase block mb-3">
            // INTERACTIVE LAB
          </span>
          <h2 className="font-meme text-[4.5rem] md:text-[6rem] leading-[0.9] uppercase text-text1">
            SHANDAAR SHIRT <br />
            <span className="text-lime">CUSTOMIZER</span>
          </h2>
          <p className="mt-4 font-body text-base font-light text-text2 max-w-[500px]">
            Apna custom drop design karo inside our interactive studio. Pick a graphic, drag it around, rotate it, resize it, or type your own text!
          </p>
        </div>

        {/* Customizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: T-Shirt interactive preview (5 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center">
            
            {/* The interactive Canvas Container */}
            <div 
              className="relative w-full aspect-[4/5] max-w-[460px] rounded-lg overflow-hidden border border-border/80 bg-surface-2 shadow-2xl flex items-center justify-center p-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Plain Black T Shirt Background */}
              <img 
                src="/products/Plain Black T Shirt.jpg" 
                alt="Plain Black T Shirt" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90 transition-opacity duration-300"
              />

              {/* Dotted Print Area Bounds */}
              <div 
                ref={printAreaRef}
                className={`absolute top-[22%] left-[23%] w-[54%] h-[53%] border-2 rounded-[2px] transition-all duration-300 pointer-events-none flex flex-col justify-between items-center p-2 ${
                  isHovered ? "border-lime/60 bg-lime/[0.01]" : "border-border/40 bg-transparent"
                }`}
              >
                {/* Print area label top left */}
                <div className={`text-[8px] font-meme tracking-widest absolute top-1.5 left-2 transition-opacity duration-300 uppercase ${
                  isHovered ? "text-lime/70 opacity-100" : "text-text2/40 opacity-0"
                }`}>
                  PRINT LIMITS
                </div>
                
                {/* Drag hint in center if nothing else */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
                  isHovered && !isTouch ? "opacity-100" : "opacity-0"
                }`}>
                  <div className="bg-bg/85 backdrop-blur-sm border border-border px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs text-text2 select-none shadow-lg">
                    <Move size={12} className="text-lime animate-pulse" />
                    <span>DRAG GRAPHIC</span>
                  </div>
                </div>
              </div>

              {/* Draggable Print Layer Container */}
              <div className="absolute top-[22%] left-[23%] w-[54%] h-[53%] overflow-visible pointer-events-auto">
                <motion.div
                  drag={!isTouch}
                  dragConstraints={printAreaRef}
                  dragElastic={0.06}
                  dragMomentum={false}
                  animate={{ 
                    scale: scale, 
                    rotate: rotate,
                    x: posX,
                    y: posY
                  }}
                  onDragEnd={(event, info) => {
                    setPosX((prev) => prev + info.delta.x);
                    setPosY((prev) => prev + info.delta.y);
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  className={`absolute inset-0 flex items-center justify-center w-full h-full overflow-visible ${
                    isTouch ? "cursor-default" : "cursor-grab active:cursor-grabbing"
                  }`}
                >
                  {activeTab === "graphic" ? (
                    /* Rendering dynamic custom preset vector graphic */
                    <div className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]">
                      {currentGraphic.render && currentGraphic.render()}
                    </div>
                  ) : (
                    /* Rendering Custom Text Sticker */
                    <div 
                      className="flex flex-col items-center justify-center p-5 text-center select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                      style={{ 
                        backgroundColor: customColorObj.value, 
                        color: customColorObj.text,
                        border: customBorder ? `4px solid ${customColorObj.text}` : "none",
                        boxShadow: customBorder && customColorObj.value !== "transparent" ? `6px 6px 0px ${customColorObj.text}` : "none",
                        width: "180px"
                      }}
                    >
                      <span className={`text-2xl font-bold uppercase break-words w-full leading-none tracking-wide ${customFont}`}>
                        {customText || "CUSTOM TEXT"}
                      </span>
                      <span className="text-[7px] tracking-[0.2em] font-sans font-black mt-2 uppercase opacity-80" style={{ color: customColorObj.text }}>
                        SHANDAAR LAB
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
            
            {/* Visual adjustment guidelines below preview */}
            <p className="text-center font-body text-xs text-text2 mt-4 max-w-[320px] leading-relaxed">
              {isTouch 
                ? "Position your graphic using the fine-tuning slider controls below!" 
                : "Grab the design on the shirt and drag it around! Or use the sliders on the right."}
            </p>
          </div>

          {/* RIGHT COLUMN: Controls Panel (7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-8 bg-surface border border-border/80 rounded-xl p-6 md:p-8 shadow-xl">
            
            {/* Tab Switches (Graphics vs Custom Text) */}
            <div className="flex w-full bg-surface-2 p-1 rounded-lg border border-border/60">
              <button
                onClick={() => { setActiveTab("graphic"); handleReset(); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-meme text-base uppercase tracking-wider transition-all duration-300 cursor-none ${
                  activeTab === "graphic" 
                    ? "bg-lime text-[var(--color-text-dark)] font-bold shadow-md" 
                    : "text-text2 hover:text-text1"
                }`}
              >
                <ImageIcon size={16} />
                SHANDAAR GRAPHICS
              </button>
              <button
                onClick={() => { setActiveTab("text"); handleReset(); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-meme text-base uppercase tracking-wider transition-all duration-300 cursor-none ${
                  activeTab === "text" 
                    ? "bg-lime text-[var(--color-text-dark)] font-bold shadow-md" 
                    : "text-text2 hover:text-text1"
                }`}
              >
                <Type size={16} />
                CUSTOM TEXT BUILDER
              </button>
            </div>

            {/* TAB CONTENTS */}
            {activeTab === "graphic" ? (
              /* Graphic Select Tab */
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-meme text-xl tracking-[0.1em] text-text1 uppercase flex items-center gap-2">
                    <Sparkles size={16} className="text-lime" />
                    1. Select Design
                  </h4>
                  <p className="font-body text-xs text-text2 mt-1">
                    Select a lightweight signature Shandaar graphic designed in pure vector format!
                  </p>
                </div>
                
                {/* Scrollable Grid of designs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[290px] overflow-y-auto pr-1">
                  {GRAPHICS.map((g) => {
                    const isSelected = g.id === selectedGraphicId;
                    return (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGraphicId(g.id)}
                        className={`relative rounded-md border flex flex-col items-center justify-center p-3 select-none transition-all duration-300 cursor-none ${
                          isSelected 
                            ? "bg-surface-2 border-lime shadow-md scale-[1.02]" 
                            : "bg-surface-2/40 border-border hover:border-text2/50"
                        }`}
                      >
                        {/* Selected overlay indicator */}
                        {isSelected && (
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-lime" />
                        )}

                        {/* Preview canvas */}
                        <div className="h-16 w-full flex items-center justify-center mb-2 overflow-hidden">
                          <div className="scale-[0.38] origin-center shrink-0">
                            {g.render && g.render()}
                          </div>
                        </div>

                        {/* Name & Tag */}
                        <span className="font-display text-center text-[10px] font-bold tracking-wide uppercase truncate w-full text-text1">
                          {g.name}
                        </span>
                        
                        {/* Creator tag */}
                        <span className="text-[8px] tracking-widest text-[#FF7A00] font-bold font-sans uppercase scale-[0.9] mt-0.5">
                          DYNAMIC VECTOR
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Custom Text Builder Tab */
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-meme text-xl tracking-[0.1em] text-text1 uppercase flex items-center gap-2">
                    <Sparkles size={16} className="text-lime" />
                    1. Create custom text print
                  </h4>
                  <p className="font-body text-xs text-text2 mt-1">
                    Design a premium streetwear text patch. Type a phrase, pick a font, and select your signature color.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  
                  {/* TEXT INPUT */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-meme text-xs tracking-wider text-text2 uppercase">
                      Type Your Phrase
                    </label>
                    <input 
                      type="text" 
                      maxLength={32}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. SYSTEM OVERLOAD"
                      className="bg-surface-2 border border-border text-text1 px-4 py-3 rounded-[3px] font-meme text-lg tracking-wider focus:outline-none focus:border-lime"
                    />
                  </div>

                  {/* FONT STYLE SELECTION */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="font-meme text-xs tracking-wider text-text2 uppercase">
                      Select Street Font
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Bebas Neue (Tall Bold)", value: "font-meme" },
                        { label: "Syne (Geometric)", value: "font-display" },
                        { label: "Epilogue (Minimal)", value: "font-body" }
                      ].map((f) => (
                        <button
                           key={f.value}
                           onClick={() => setCustomFont(f.value)}
                           className={`px-3 py-2 border rounded-md font-body text-xs font-bold transition-all duration-300 cursor-none text-center ${
                            customFont === f.value
                              ? "bg-lime text-[var(--color-text-dark)] border-lime"
                              : "bg-surface-2/40 border-border text-text1 hover:border-text2"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* COLOR BLOCKS SELECTION */}
                  <div className="flex flex-col gap-2 mt-2">
                    <label className="font-meme text-xs tracking-wider text-text2 uppercase">
                      Sticker Background Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((c) => {
                        const isColorSelected = c.value === customColorObj.value;
                        return (
                          <button
                            key={c.value}
                            onClick={() => setCustomColorObj(c)}
                            title={c.name}
                            className={`w-9 h-9 rounded-full border-2 transition-all duration-200 cursor-none flex items-center justify-center ${
                              isColorSelected 
                                ? "border-lime scale-110" 
                                : "border-border hover:border-text2"
                            }`}
                            style={{ backgroundColor: c.value }}
                          >
                            {/* Inner dot indicator */}
                            {isColorSelected && (
                              <span className="w-1.5 h-1.5 rounded-full bg-text1" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DOUBLE BORDER TOGGLE */}
                  <div className="flex items-center justify-between border-t border-border/60 pt-4 mt-2">
                    <div className="flex flex-col">
                      <span className="font-display text-xs font-black uppercase text-text1">Double Outline Stamp</span>
                      <span className="font-body text-[10px] text-text2 uppercase mt-0.5">Heavy outline for retro look</span>
                    </div>
                    <button
                      onClick={() => setCustomBorder(!customBorder)}
                      className={`relative w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-none ${
                        customBorder ? "bg-lime" : "bg-surface-2"
                      }`}
                    >
                      <motion.div 
                        layout 
                        className="w-4 h-4 rounded-full bg-bg shadow-sm"
                        animate={{ x: customBorder ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* TUNING SLIDERS & PRESETS */}
            <div className="border-t border-border/60 pt-6 flex flex-col gap-6">
              
              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Scale Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-meme tracking-wider uppercase text-text2">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 size={12} className="text-lime" />
                      Graphic Size
                    </span>
                    <span className="text-lime">{Math.round(scale * 100)}%</span>
                  </div>
                  <input 
                    type="range"
                    min="0.3"
                    max="1.4"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-lime h-1 bg-surface-2 rounded-lg cursor-none"
                  />
                </div>

                {/* 2. Rotation Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-meme tracking-wider uppercase text-text2">
                    <span className="flex items-center gap-1.5">
                      <RotateCw size={12} className="text-lime" />
                      Graphic Rotation
                    </span>
                    <span className="text-lime">{rotate}°</span>
                  </div>
                  <input 
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    value={rotate}
                    onChange={(e) => setRotate(parseInt(e.target.value))}
                    className="w-full accent-lime h-1 bg-surface-2 rounded-lg cursor-none"
                  />
                </div>

                {/* 3. Horizontal Offset Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-meme tracking-wider uppercase text-text2">
                    <span className="flex items-center gap-1.5">
                      <Move size={12} className="text-lime" />
                      Horizontal Position
                    </span>
                    <span className="text-lime">{posX > 0 ? `+${Math.round(posX)}` : Math.round(posX)}px</span>
                  </div>
                  <input 
                    type="range"
                    min="-80"
                    max="80"
                    step="1"
                    value={posX}
                    onChange={(e) => setPosX(parseInt(e.target.value))}
                    className="w-full accent-lime h-1 bg-surface-2 rounded-lg cursor-none"
                  />
                </div>

                {/* 4. Vertical Offset Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-meme tracking-wider uppercase text-text2">
                    <span className="flex items-center gap-1.5">
                      <Move size={12} className="text-lime" />
                      Vertical Position
                    </span>
                    <span className="text-lime">{posY > 0 ? `+${Math.round(posY)}` : Math.round(posY)}px</span>
                  </div>
                  <input 
                    type="range"
                    min="-100"
                    max="100"
                    step="1"
                    value={posY}
                    onChange={(e) => setPosY(parseInt(e.target.value))}
                    className="w-full accent-lime h-1 bg-surface-2 rounded-lg cursor-none"
                  />
                </div>

              </div>

              {/* Auto Presets */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="font-meme text-[11px] uppercase tracking-widest text-text2 mr-2">
                  Quick Layouts:
                </span>
                {[
                  { label: "Center print", value: "center" as const },
                  { label: "Pocket patch", value: "left" as const },
                  { label: "Tilted Indie", value: "tilted" as const },
                  { label: "Oversized", value: "center" as const } 
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(p.value)}
                    className="px-3.5 py-1.5 rounded-full border border-border hover:border-lime/50 text-[10px] font-display font-black uppercase text-text2 hover:text-lime transition-all duration-300 cursor-none bg-surface-2/20"
                  >
                    {p.label}
                  </button>
                ))}
                
                {/* Reset button */}
                <button
                  onClick={handleReset}
                  className="ml-auto text-[10px] font-display font-black text-[#FF7A00] uppercase hover:text-lime transition-colors cursor-none flex items-center gap-1"
                >
                  <RefreshCw size={10} />
                  RESET LAB
                </button>
              </div>

            </div>

            {/* SIZE PICKER & ADD TO CART */}
            <div className="border-t border-border/60 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Size Buttons */}
              <div className="flex flex-col gap-2">
                <span className="font-meme text-xs tracking-wider uppercase text-text2">
                  Select Shirt Size
                </span>
                <div className="flex gap-2">
                  {SIZES.map((size) => {
                    const isSelectedSize = size === selectedSize;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 border rounded-md flex items-center justify-center font-display text-xs font-black uppercase transition-all duration-300 cursor-none ${
                          isSelectedSize 
                            ? "bg-lime text-[var(--color-text-dark)] border-lime shadow-md scale-105" 
                            : "bg-surface-2/40 border-border text-text1 hover:border-text2"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Cart CTA */}
              <div className="flex items-center gap-6 sm:ml-auto">
                <div className="flex flex-col items-end">
                  <span className="font-body text-[10px] text-text2 uppercase tracking-widest leading-none mb-1">
                    Custom studio Price
                  </span>
                  <span className="font-meme text-3xl tracking-wide text-lime">
                    PKR 2,600
                  </span>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="bg-lime hover:bg-transparent text-[var(--color-text-dark)] hover:text-lime border border-lime py-4 px-8 rounded-full font-meme text-base uppercase tracking-[0.2em] transition-all duration-400 ease-out flex items-center gap-2 select-none shadow-lg hover:shadow-lime/10 cursor-none font-bold"
                >
                  <ShoppingCart size={16} />
                  APNA DROP BUY KARO
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
