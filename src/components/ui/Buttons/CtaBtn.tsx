"use client";
import { useCTA } from "@/hooks/index";

export default function CtaBtn() {
  const callToAction = useCTA();
  return (
    <button
      className="z-20 text-black bg-orange-500 font-bold text-xl px-10 py-4 rounded-2xl
        hover:bg-orange-400 active:scale-95 transition-all m-4 w-[90%] sm:w-[320px]
        shadow-2xl shadow-orange-500/30"
      onClick={callToAction}
    >
      Comenzar
    </button>
  );
}
