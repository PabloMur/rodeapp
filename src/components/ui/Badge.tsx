type Status = "success" | "warning" | "danger" | "info" | "neutral" | "orange";

interface BadgeProps {
  status?: Status;
  label: string;
  className?: string;
}

const styles: Record<Status, string> = {
  success: "bg-green-900/40 text-green-400 border border-green-700/50",
  warning: "bg-yellow-900/40 text-yellow-400 border border-yellow-700/50",
  danger: "bg-red-900/40 text-red-400 border border-red-700/50",
  info: "bg-blue-900/40 text-blue-400 border border-blue-700/50",
  neutral: "bg-zinc-800 text-zinc-400 border border-zinc-600",
  orange: "bg-orange-900/40 text-orange-400 border border-orange-700/50",
};

export default function Badge({ status = "neutral", label, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-medium ${styles[status]} ${className}`}
    >
      {label}
    </span>
  );
}
