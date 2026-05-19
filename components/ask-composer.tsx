"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subscriptions } from "@/lib/data/subscriptions";
import { Send } from "lucide-react";

export function AskComposer({
  onSend,
  disabled,
  initialScope = "all",
}: {
  onSend: (message: string, scope: string) => void;
  disabled?: boolean;
  initialScope?: string;
}) {
  const [input, setInput] = useState("");
  const [scope, setScope] = useState(initialScope);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim(), scope);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-card p-4">
      <div className="flex gap-2 mb-2">
        <Select value={scope} onValueChange={setScope}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Source scope" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {subscriptions.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Ask about competitors, customers, or trends…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
