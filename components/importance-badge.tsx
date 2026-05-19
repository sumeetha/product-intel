import { AlertTriangle, Minus, TrendingUp } from "lucide-react";
import type { Importance } from "@/lib/types";
import { cn } from "@/lib/utils";

const config: Record<Importance, { label: string; icon: typeof AlertTriangle; className: string }> = {
  high: { label: "High", icon: AlertTriangle, className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900" },
  medium: { label: "Medium", icon: TrendingUp, className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900" },
  low: { label: "Low", icon: Minus, className: "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700" },
};

export function ImportanceBadge({ importance, className }: { importance: Importance; className?: string }) {
  const { label, icon: Icon, className: styles } = config[importance];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
        styles,
        className
      )}
    >
      <Icon className="h-3 w-3" aria-hidden />
      {label}
    </span>
  );
}
