import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import ClientLayout from "./ClientLayout";
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
    <html lang="pt-BR" suppressHydrationWarning className="antialiased">
      <body className={rubik.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
