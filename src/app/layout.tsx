import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CartProvider } from "@/context/cart-context";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dionor - Plataforma de Eventos",
  description: "Encontre e compre ingressos para os melhores eventos.",
  keywords: ["eventos", "festas", "ingressos", "tickets", "shows"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={rubik.className}>
        <CartProvider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
