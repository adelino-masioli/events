"use client";

import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CartProvider } from "@/context/cart-context";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/sign-in";

  return (
    <CartProvider>
      <div className="relative flex min-h-screen flex-col">
        {/* Renderize o SiteHeader apenas se não for a página de login */}
        {!isLoginPage && <SiteHeader />}

        <main className="flex-1">{children}</main>

        {/* Renderize o Footer apenas se não for a página de login */}
        {!isLoginPage && <Footer />}
      </div>
    </CartProvider>
  );
}
