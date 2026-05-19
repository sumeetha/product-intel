"use client";

import { useState } from "react";
import type { Message, Citation } from "@/lib/types";
import { CitationChip } from "@/components/citation-chip";
import { CitationSheet } from "@/components/citation-sheet";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export function MessageBubble({ message }: { message: Message }) {
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const isUser = message.role === "user";

  return (
    <>
      <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
        <div
          className={cn(
            "max-w-[85%] rounded-xl px-4 py-3 text-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "border bg-card"
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
          {!isUser && message.citations && message.citations.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {message.citations.map((c) => (
                <CitationChip
                  key={c.id}
                  citation={c}
                  onClick={() => {
                    setSelectedCitation(c);
                    setSheetOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <CitationSheet citation={selectedCitation} open={sheetOpen} onOpenChange={setSheetOpen} />
    </>
  );
}
