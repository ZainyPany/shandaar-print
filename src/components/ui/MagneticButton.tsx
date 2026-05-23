"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  className,
  as = "button",
  href,
  strength = 25,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    const clamp = (n: number) => Math.max(-strength, Math.min(strength, n));
    x.set(clamp((mx / r.width) * strength * 2));
    y.set(clamp((my / r.height) * strength * 2));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );

  if (as === "a") {
    return (
      <a href={href} className="inline-block">
        {Inner}
      </a>
    );
  }
  return (
    <button {...rest} className="inline-block">
      {Inner}
    </button>
  );
}
