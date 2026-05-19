"use client";

import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { threads as initialThreads } from "@/lib/data/threads";
import { streamAnswer } from "@/lib/fake-llm";
import type { Message, Thread, Citation } from "@/lib/types";
import { MessageBubble } from "@/components/message-bubble";
import { AskComposer } from "@/components/ask-composer";
import { SuggestedPrompts } from "@/components/suggested-prompts";
import { EmptyState } from "@/components/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

function AskPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(initialThreads[0]?.id ?? null);
  const [streaming, setStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const handledInitial = useRef(false);

  const activeThread = threads.find((t) => t.id === activeThreadId);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeThread?.messages, streamContent, scrollToBottom]);

  const sendMessage = useCallback(async (content: string, scope: string) => {
    const userMsg: Message = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    let threadId = activeThreadId;

    if (!threadId) {
      const newThread: Thread = {
        id: `thread-${Date.now()}`,
        title: content.slice(0, 50),
        subscriptionScope: scope !== "all" ? scope : undefined,
        updatedAt: new Date().toISOString(),
        messages: [userMsg],
      };
      setThreads((prev) => [newThread, ...prev]);
      setActiveThreadId(newThread.id);
      threadId = newThread.id;
    } else {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? { ...t, messages: [...t.messages, userMsg], updatedAt: new Date().toISOString() }
            : t
        )
      );
    }

    setStreaming(true);
    setStreamContent("");

    let fullText = "";
    let citations: Citation[] = [];

    await streamAnswer(
      content,
      (chunk) => {
        fullText += chunk;
        setStreamContent(fullText);
      },
      (c) => {
        citations = c;
      }
    );

    const assistantMsg: Message = {
      id: `msg-${Date.now()}-a`,
      role: "assistant",
      content: fullText,
      citations,
      timestamp: new Date().toISOString(),
    };

    const finalThreadId = threadId;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === finalThreadId
          ? { ...t, messages: [...t.messages, assistantMsg], updatedAt: new Date().toISOString() }
          : t
      )
    );

    setStreaming(false);
    setStreamContent("");
  }, [activeThreadId]);

  useEffect(() => {
    if (initialQuery && !handledInitial.current) {
      handledInitial.current = true;
      sendMessage(initialQuery, "all");
    }
  }, [initialQuery, sendMessage]);

  const showEmpty = !activeThread?.messages.length && !streaming && !initialQuery;

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-card/30 lg:flex">
        <div className="border-b p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setActiveThreadId(null)}
          >
            New thread
          </Button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-3">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent threads
          </p>
          <div className="flex min-w-0 flex-col gap-2">
            {threads.map((t) => (
              <div
                key={t.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveThreadId(t.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveThreadId(t.id);
                  }
                }}
                className={cn(
                  "w-full min-w-0 cursor-pointer rounded-lg px-3 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeThreadId === t.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                <p className="line-clamp-2 break-words font-medium leading-snug">
                  {t.title}
                </p>
                <p className="mt-1.5 truncate text-xs text-muted-foreground">
                  {t.messages.length} messages
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <ScrollArea className="flex-1 p-6">
          {showEmpty ? (
            <EmptyState
              icon={MessageSquare}
              title="Ask your intelligence layer"
              description="Query across competitors, customer voice, and market trends. Answers include citations from your connected sources."
            >
              <SuggestedPrompts onSelect={(p) => sendMessage(p, "all")} />
            </EmptyState>
          ) : (
            <div className="mx-auto max-w-3xl space-y-4">
              {activeThread?.messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {streaming && streamContent && (
                <div className="rounded-xl border bg-card px-4 py-3 text-sm max-w-[85%]">
                  <p className="whitespace-pre-wrap">{streamContent}</p>
                  <span className="inline-block w-2 h-4 ml-0.5 bg-primary animate-pulse" />
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>
        <AskComposer onSend={sendMessage} disabled={streaming} />
      </div>
    </div>
  );
}

export default function AskPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <AskPageContent />
    </Suspense>
  );
}
