"use client";

import { useState } from "react";
import Link from "next/link";
import type { Update } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SourceTypeIcon } from "@/components/source-type-icon";
import { ImportanceBadge } from "@/components/importance-badge";
import { CitationChip } from "@/components/citation-chip";
import { CitationSheet } from "@/components/citation-sheet";
import { formatRelativeTime } from "@/lib/utils";
import type { Citation } from "@/lib/types";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function UpdateCard({ update, className }: { update: Update; className?: string }) {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openCitation = (c: Citation) => {
    setSelectedCitation(c);
    setSheetOpen(true);
  };

  return (
  <>
    <Card className={cn(!update.read && "border-l-4 border-l-primary", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <SourceTypeIcon type={update.sourceType} />
            <Badge variant="secondary">{update.subscriptionName}</Badge>
            {!update.read && (
              <span className="h-2 w-2 rounded-full bg-primary" title="Unread" />
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ImportanceBadge importance={update.importance} />
            <span className="text-xs text-muted-foreground">{formatRelativeTime(update.publishedAt)}</span>
          </div>
        </div>
        <h3 className="mt-3 text-base font-semibold leading-snug">{update.headline}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{update.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {update.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {update.citations.map((c) => (
            <CitationChip key={c.id} citation={c} onClick={() => openCitation(c)} />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/ask?q=${encodeURIComponent(`Tell me more about: ${update.headline}`)}`}>
              <MessageSquare className="h-4 w-4" />
              Ask follow-up
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
    <CitationSheet citation={selectedCitation} open={sheetOpen} onOpenChange={setSheetOpen} />
  </>
  );
}
