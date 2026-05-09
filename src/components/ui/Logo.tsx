"use client";
import Helmet from "./Helmet";
import { useLogoHook } from "@/hooks";

export default function Logo() {
  const logoHook = useLogoHook();
  return (
    <button
      className="flex items-center gap-2 cursor-pointer"
      onClick={logoHook}
    >
      <Helmet />
      <span className="text-black font-bold text-xl tracking-tight">RodeApp</span>
    </button>
  );
}
