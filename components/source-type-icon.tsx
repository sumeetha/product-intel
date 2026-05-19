import { Globe, FileText, Rss, Video, Mic } from "lucide-react";
import type { SourceType } from "@/lib/types";
import { cn } from "@/lib/utils";

const config: Record<SourceType, { icon: typeof Globe; label: string; className: string }> = {
  web: { icon: Globe, label: "Web", className: "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400" },
  document: { icon: FileText, label: "Document", className: "text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400" },
  feed: { icon: Rss, label: "Feed", className: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400" },
  video: { icon: Video, label: "Video", className: "text-rose-600 bg-rose-50 dark:bg-rose-950 dark:text-rose-400" },
  audio: { icon: Mic, label: "Audio", className: "text-violet-600 bg-violet-50 dark:bg-violet-950 dark:text-violet-400" },
};

export function SourceTypeIcon({
  type,
  showLabel = false,
  className,
}: {
  type: SourceType;
  showLabel?: boolean;
  className?: string;
}) {
  const { icon: Icon, label, className: colorClass } = config[type];
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("flex h-7 w-7 items-center justify-center rounded-md", colorClass)}>
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </span>
      {showLabel && <span className="text-xs text-muted-foreground">{label}</span>}
    </span>
  );
}
