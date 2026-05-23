"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const easeIntoFocus = cubicBezier(0.22, 1, 0.36, 1);
const easeOutOfFocus = cubicBezier(0, 0, 0.58, 1);
const focusEase: [typeof easeIntoFocus, typeof easeOutOfFocus] = [
  easeIntoFocus,
  easeOutOfFocus,
];

export type MaxWidthToken =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "none";

export type GapToken = 4 | 6 | 8 | 10 | 12 | 14;

export type GridProductItem = {
  id: string;
  src: string;
  name: string;
};

const MAX_WIDTH_CLASS: Record<MaxWidthToken, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  none: "",
};

const GAP_CLASS: Record<GapToken, string> = {
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  14: "gap-14",
};

type Side = "L" | "R";

type TileConfig = {
  aspectRatio: string;
  perspective: number;
  maxTilt: number;
  maxBlur: number;
  rounded: string;
};

function TileImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url("${src}")` }}
    />
  );
}

function CartOverlay({
  productId,
  name,
  onAddToCart,
}: {
  productId: string;
  name: string;
  onAddToCart?: (productId: string) => void;
}) {
  if (!onAddToCart) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <button
        type="button"
        aria-label={`Cart mein daloo — ${name}`}
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(productId);
        }}
        className="pointer-events-auto rounded-full border border-white/25 bg-white/10 px-6 py-3 font-meme text-sm tracking-[0.14em] uppercase text-text1 shadow-lg backdrop-blur-md transition-colors hover:bg-white/20"
      >
        Cart mein daloo
      </button>
    </div>
  );
}

function Tile({
  item,
  side,
  config,
  onAddToCart,
}: {
  item: GridProductItem;
  side: Side;
  config: TileConfig;
  onAddToCart?: (productId: string) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const reduce = useReducedMotion();
  const sign = side === "L" ? -1 : 1;
  const { aspectRatio, perspective, maxTilt, maxBlur, rounded } = config;
  const { src, id: productId, name } = item;

  const blur = useTransform(p, [0, 0.5, 1], [maxBlur, 0, maxBlur], { ease: focusEase });
  const bright = useTransform(p, [0, 0.5, 1], [0, 1, 0], { ease: focusEase });
  const contrast = useTransform(p, [0, 0.5, 1], [4, 1, 4], { ease: focusEase });

  const ty = useTransform(p, [0, 0.5, 1], ["100%", "0%", "-100%"], { ease: focusEase });
  const tz = useTransform(p, [0, 0.5, 1], [300, 0, 300], { ease: focusEase });
  const rx = useTransform(p, [0, 0.5, 1], [maxTilt, 0, -maxTilt], { ease: focusEase });

  const tx = useTransform(
    p,
    [0, 0.5, 1],
    [`${sign * 40}%`, "0%", `${sign * 40}%`],
    { ease: focusEase }
  );
  const rot = useTransform(p, [0, 0.5, 1], [-sign * 5, 0, sign * 5], { ease: focusEase });
  const sk = useTransform(p, [0, 0.5, 1], [sign * 20, 0, -sign * 20], { ease: focusEase });

  const innerSY = useTransform(p, [0, 0.5, 1], [1.8, 1, 1.8], { ease: focusEase });

  const filter = useMotionTemplate`blur(${blur}px) brightness(${bright}) contrast(${contrast})`;

  if (reduce) {
    return (
      <figure ref={ref} className="group relative z-10 m-0">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio, borderRadius: rounded }}
        >
          <TileImage src={src} alt={name} />
          <CartOverlay productId={productId} name={name} onAddToCart={onAddToCart} />
        </div>
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      className="group relative z-10 m-0"
      style={{ perspective, willChange: "transform" }}
    >
      <motion.div
        className="relative w-full overflow-hidden will-change-[filter,transform]"
        style={{
          aspectRatio,
          borderRadius: rounded,
          filter,
          x: tx,
          y: ty,
          z: tz,
          rotate: rot,
          rotateX: rx,
          skewX: sk,
        }}
      >
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            scaleY: innerSY,
            backfaceVisibility: "hidden",
          }}
        >
          <TileImage src={src} alt={name} />
        </motion.div>
        <CartOverlay productId={productId} name={name} onAddToCart={onAddToCart} />
      </motion.div>
    </motion.figure>
  );
}

export type ScrollTiltedGridProps = {
  /** Product tiles to render (image + cart metadata). */
  items: readonly GridProductItem[];
  onAddToCart?: (productId: string) => void;
  loop?: boolean;
  initialCycles?: number;
  aspectRatio?: string;
  maxWidth?: MaxWidthToken;
  gap?: GapToken;
  perspective?: number;
  maxTilt?: number;
  maxBlur?: number;
  rounded?: string;
  className?: string;
};

export function ScrollTiltedGrid({
  items,
  onAddToCart,
  loop = false,
  initialCycles = 3,
  aspectRatio = "3/4",
  maxWidth = "lg",
  gap = 10,
  perspective = 900,
  maxTilt = 70,
  maxBlur = 8,
  rounded = "0.375rem",
  className,
}: ScrollTiltedGridProps) {
  const [cycles, setCycles] = useState(loop ? initialCycles : 1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loop) return;
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCycles((c) => c + 2);
        }
      },
      { rootMargin: "1500px 0px 1500px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loop]);

  const gridItems = useMemo(
    () =>
      loop ? Array.from({ length: cycles }, () => items).flat() : [...items],
    [loop, cycles, items]
  );

  const config = useMemo<TileConfig>(
    () => ({ aspectRatio, perspective, maxTilt, maxBlur, rounded }),
    [aspectRatio, perspective, maxTilt, maxBlur, rounded]
  );

  const gridClass = [
    "mx-auto mt-[20vh] mb-[10vh] grid w-full grid-cols-2 px-6 py-[20vh]",
    MAX_WIDTH_CLASS[maxWidth],
    GAP_CLASS[gap],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={["relative w-full", className].filter(Boolean).join(" ")}>
      <div className={gridClass}>
        {gridItems.map((item, i) => (
          <Tile
            key={`${i}-${item.id}`}
            item={item}
            side={i % 2 === 0 ? "L" : "R"}
            config={config}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {loop ? <div ref={sentinelRef} aria-hidden className="h-px w-full" /> : null}
    </section>
  );
}
