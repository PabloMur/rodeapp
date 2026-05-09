import Link from "next/link";
import { Bike } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="bg-orange-500 w-full flex justify-between items-center px-5 h-[12vh]">
      <Link href="/" className="flex items-center gap-2">
        <Bike size={24} className="text-black" />
        <span className="text-black font-bold text-lg">RodeApp</span>
      </Link>
      <Link
        href="/login"
        className="bg-black text-white font-semibold px-4 py-2 rounded-xl text-sm
          hover:bg-zinc-800 transition-colors"
      >
        Ingresar
      </Link>
    </nav>
  );
}
