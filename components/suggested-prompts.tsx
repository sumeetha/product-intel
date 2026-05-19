"use client";

import { Button } from "@/components/ui/button";
import { suggestedPrompts } from "@/lib/fake-llm";
import { Sparkles } from "lucide-react";

export function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {suggestedPrompts.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          className="h-auto justify-start whitespace-normal px-4 py-3 text-left text-sm font-normal"
          onClick={() => onSelect(prompt)}
        >
          <Sparkles className="mr-2 h-4 w-4 shrink-0 text-primary" />
          {prompt}
        </Button>
      ))}
    </div>
  );
}
