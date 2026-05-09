"use client";
import { RecoilRoot } from "recoil";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Providers from "@/app/Providers";
import { ReactNode } from "react";

export default function CustomLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <RecoilRoot>
        <div className="min-h-screen bg-black flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </RecoilRoot>
    </Providers>
  );
}
