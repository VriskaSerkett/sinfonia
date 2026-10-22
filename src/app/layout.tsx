import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sinfonía — Marketplace de Instrumentos por Presupuesto Real",
  description:
    "Encontrá instrumentos verificados y piezas de luthier ajustadas a tu bolsillo, con honestidad técnica radical sobre su estado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${newsreader.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen bg-[#EDE6D6] text-[#16231C] flex flex-col antialiased selection:bg-[#DFEAE2] selection:text-[#173F2B]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
