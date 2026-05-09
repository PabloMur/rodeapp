import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  className?: string;
}

export default function StatCard({ icon, value, label, className = "" }: StatCardProps) {
  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-3 ${className}`}
    >
      <div className="text-orange-500 shrink-0">{icon}</div>
      <div>
        <p className="text-2xl font-bold text-white leading-tight">{value}</p>
        <p className="text-xs text-zinc-400">{label}</p>
      </div>
    </div>
  );
}
