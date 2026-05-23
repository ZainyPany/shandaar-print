"use client";
import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { products, Product } from "./products";

export type CartItem = {
  id: string;
  qty: number;
  customOptions?: {
    size: string;
    graphicName: string;
    customText?: string;
  };
};

export type DetailedCartItem = {
  product: Product;
  qty: number;
  customOptions?: CartItem["customOptions"];
};

type CartCtx = {
  items: CartItem[];
  detailedItems: DetailedCartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: string, customOptions?: CartItem["customOptions"]) => void;
  removeFromCart: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const clearCart = useCallback(() => setItems([]), []);

  const addToCart = useCallback((id: string, customOptions?: CartItem["customOptions"]) => {
    setItems((prev) => {
      const itemId = customOptions
        ? `custom-tshirt-${customOptions.size}-${customOptions.graphicName}-${customOptions.customText || ""}`.replace(/\s+/g, "-")
        : id;

      const found = prev.find((i) => i.id === itemId);
      if (found) {
        return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: itemId, qty: 1, customOptions }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const changeQty = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev.flatMap((i) => {
        if (i.id !== id) return [i];
        const newQty = i.qty + delta;
        if (newQty <= 0) return [];
        return [{ ...i, qty: newQty }];
      })
    );
  }, []);

  const value = useMemo<CartCtx>(() => {
    const detailedItems: DetailedCartItem[] = items.flatMap((item) => {
      let baseId = item.id;
      if (item.id.startsWith("custom-tshirt")) {
        baseId = "custom-tshirt";
      }

      const product = products.find((p) => p.id === baseId);
      if (!product) return [];

      if (item.customOptions) {
        return [{
          product: {
            ...product,
            id: item.id, // Use unique composite ID so remove/qty hooks target it
            name: `Custom Tee (${item.customOptions.graphicName})`,
            tagline: `Size: ${item.customOptions.size}${item.customOptions.customText ? ` | Text: "${item.customOptions.customText}"` : ""}`,
          },
          qty: item.qty,
          customOptions: item.customOptions
        }];
      }

      return [{ product, qty: item.qty }];
    });

    const count = items.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = detailedItems.reduce((acc, i) => acc + i.qty * i.product.price, 0);

    return {
      items,
      detailedItems,
      isOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      changeQty,
      clearCart,
      count,
      subtotal
    };
  }, [items, isOpen, openCart, closeCart, addToCart, removeFromCart, changeQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

