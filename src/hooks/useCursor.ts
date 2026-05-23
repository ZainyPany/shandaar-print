"use client";
import { useEffect, useState } from "react";

export function useCursorPosition() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      // Triggers ring scaling on links, buttons, grid cards, filter pills, and custom components
      setHovering(
        !!t.closest("a, button, .card, .filter-btn, .btn, .cart-btn, [data-cursor='hover']")
      );
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return { pos, hovering };
}

