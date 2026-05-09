"use client";
import { ReactNode } from "react";
import { useGoTo } from "@/hooks";

interface HomeCardProps {
  route: string;
  icon: ReactNode;
  label: string;
  variant?: "filled" | "outline";
}

export default function HomeCard({
  route,
  icon,
  label,
  variant = "outline",
}: HomeCardProps) {
  const goto = useGoTo();
  const isFilled = variant === "filled";
  return (
    <div
      className={`h-28 rounded-2xl flex flex-col justify-center items-center gap-2
        cursor-pointer active:scale-95 transition-all select-none
        ${isFilled
          ? "bg-orange-500 hover:bg-orange-400"
          : "bg-zinc-900 border border-zinc-700 hover:border-orange-500"
        }`}
      onClick={() => goto(route)}
    >
      <div className={isFilled ? "text-black" : "text-orange-500"}>{icon}</div>
      <p className={`font-semibold text-sm ${isFilled ? "text-black" : "text-white"}`}>
        {label}
      </p>
    </div>
  );
}
