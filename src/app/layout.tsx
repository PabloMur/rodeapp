import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "RodeApp",
  description: "Tu compañero para cada aventura sobre dos ruedas. Rutas, listas, clima y más.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://cdn.weatherapi.com" />
        <link rel="preconnect" href="https://img.freepik.com" />
        <link rel="dns-prefetch" href="https://weatherapi-com.p.rapidapi.com" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
