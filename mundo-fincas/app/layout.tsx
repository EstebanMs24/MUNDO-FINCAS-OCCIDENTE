import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mundo Fincas — Alquiler de Fincas en el Occidente Antioqueño",
  description:
    "Descubre y reserva las mejores fincas para alquilar en el occidente antioqueño. Santa Fe de Antioquia, Sopetrán, Olaya, Buriticá y más. Reserva fácil por WhatsApp.",
  keywords:
    "fincas alquiler, occidente antioqueño, Santa Fe de Antioquia, fincas Colombia, alquiler fincas Antioquia, fincas piscina",
  openGraph: {
    title: "Mundo Fincas — Occidente Antioqueño",
    description:
      "Las mejores fincas del occidente antioqueño. Reserva fácil por WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
