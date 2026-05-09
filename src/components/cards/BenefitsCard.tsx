"use client";
import { ReactNode } from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const BenefitCard = ({ title, description, icon }: BenefitCardProps) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl min-w-[240px] max-w-[260px] snap-center flex flex-col gap-3 shrink-0">
      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
        {icon}
      </div>
      <h3 className="text-white font-bold text-base">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default BenefitCard;
