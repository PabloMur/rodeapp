import { ReactNode } from "react";

type Variant = "default" | "elevated" | "bordered";

interface CardProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-zinc-900",
  elevated: "bg-zinc-900 shadow-xl shadow-black/50",
  bordered: "bg-zinc-900 border border-zinc-700",
};

export default function Card({ children, variant = "default", className = "", onClick }: CardProps) {
  const interactive = onClick
    ? "cursor-pointer hover:bg-zinc-800 active:scale-[0.98] transition-all"
    : "";
  return (
    <div
      className={`rounded-2xl p-4 ${variantStyles[variant]} ${interactive} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
