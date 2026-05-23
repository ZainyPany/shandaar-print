"use client";

import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

type CartCtaRowProps = {
  onAdd: () => void;
  label?: string;
  className?: string;
  compact?: boolean;
};

export default function CartCtaRow({
  onAdd,
  label = "Cart mein daloo",
  className,
  compact = false,
}: CartCtaRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center", className)}>
      <MagneticButton
        onClick={onAdd}
        className={cn(
          "flex items-center justify-center font-meme tracking-[0.14em] uppercase text-bg bg-lime border border-lime rounded-full transition-all duration-300 hover:bg-transparent hover:text-lime cursor-none font-bold",
          compact ? "text-sm px-6 py-2.5" : "text-lg px-8 py-3"
        )}
      >
        {label}
      </MagneticButton>
    </div>
  );
}
