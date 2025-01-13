"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((acc, ticket) => {
    return acc + ticket.price * ticket.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
        <p className="text-gray-500">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      <div className="space-y-4">
        {cart.map((ticket) => (
          <div key={ticket.type} className="flex gap-4 bg-card rounded-lg p-4 border">
            <div className="flex-1">
              <h3 className="font-semibold">Ingresso {ticket.type === 'full' ? 'Inteira' : 'Meia'}</h3>
              <div className="mt-2 flex justify-between items-center">
                <span>Quantidade: {ticket.quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeFromCart(ticket.type)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <span className="font-bold">R$ {ticket.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-8">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">R$ {total.toFixed(2)}</span>
        </div>
        <Button className="w-full mt-4">
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}
