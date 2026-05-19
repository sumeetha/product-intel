"use client";

import type { Citation } from "@/lib/types";
import { SourceTypeIcon } from "@/components/source-type-icon";
import { cn } from "@/lib/utils";

export function CitationChip({
  citation,
  onClick,
  className,
}: {
  citation: Citation;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-muted/50 px-2 py-1 text-xs transition-colors hover:bg-muted",
        className
      )}
    >
      <SourceTypeIcon type={citation.sourceType} />
      <span className="max-w-[120px] truncate font-medium">{citation.sourceName}</span>
    </button>
  );
}
