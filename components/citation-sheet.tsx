"use client";

import type { Citation } from "@/lib/types";
import { SourceTypeIcon } from "@/components/source-type-icon";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function CitationSheet({
  citation,
  open,
  onOpenChange,
}: {
  citation: Citation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!citation) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <SourceTypeIcon type={citation.sourceType} showLabel />
            {citation.sourceName}
          </SheetTitle>
          <SheetDescription>Source excerpt</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <blockquote className="rounded-lg border-l-4 border-primary bg-muted/50 p-4 text-sm italic leading-relaxed">
            &ldquo;{citation.excerpt}&rdquo;
          </blockquote>
          {citation.url && (
            <Button variant="outline" size="sm" asChild>
              <a href={citation.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open source
              </a>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
