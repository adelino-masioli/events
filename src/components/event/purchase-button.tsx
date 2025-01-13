"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

export function PurchaseButton() {
  const { cart } = useCart();
  const router = useRouter();
  const isDisabled = cart.length === 0;

  const handlePurchaseClick = () => {
    if (!isDisabled) {
      router.push("/cart");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background p-4 md:p-6">
      <div className="container flex items-center justify-between">
        <div className="hidden text-sm text-muted-foreground md:block">
          * Preços sujeitos a taxa de serviço
        </div>
        <Button
          size="lg"
          className="w-full md:w-auto"
          disabled={isDisabled}
          onClick={handlePurchaseClick}
        >
          Comprar Ingressos
        </Button>
      </div>
    </div>
  );
}
