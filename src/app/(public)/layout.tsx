import { ReactNode } from "react";
import Providers from "@/app/Providers";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen bg-black flex flex-col">
        <PublicNavbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
