"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
  type: string;
  price: number;
}

export function AddToCartButton({ type, price }: AddToCartButtonProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const itemInCart = cart.some((item) => item.type === type);
    setIsInCart(itemInCart);
  }, [cart, type]);

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(type);
    } else {
      addToCart({ type, price, quantity: 1 });
    }
    setIsInCart(!isInCart);
  };

  return (
    <Button onClick={handleAddToCart} className="text-white hover:underline">
      {isInCart ? <Trash2 size={16} /> : <ShoppingCart size={16} />}
    </Button>
  );
}
