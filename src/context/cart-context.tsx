"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface Ticket {
  type: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: Ticket[];
  addToCart: (ticket: Ticket) => void;
  removeFromCart: (type: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Ticket[]>([]);

  const addToCart = (ticket: Ticket) => {
    setCart((prevCart) => {
      const existingTicket = prevCart.find((t) => t.type === ticket.type);
      if (existingTicket) {
        return prevCart.map((t) =>
          t.type === ticket.type
            ? { ...t, quantity: t.quantity + ticket.quantity }
            : t
        );
      } else {
        return [...prevCart, ticket];
      }
    });
  };

  const removeFromCart = (type: string) => {
    setCart((prevCart) => prevCart.filter((t) => t.type !== type));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
