"use client";

import { useState } from "react";
import { sources } from "@/lib/data/sources";
import type { SourceType } from "@/lib/types";
import { SourceConnectorCard } from "@/components/source-connector-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const groups: { type: SourceType; label: string }[] = [
  { type: "web", label: "Web URLs" },
  { type: "document", label: "Documents" },
  { type: "feed", label: "Data Feeds" },
  { type: "video", label: "Video" },
  { type: "audio", label: "Audio" },
];

export default function SourcesPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeType, setActiveType] = useState<SourceType>("web");

  const openAdd = (type: SourceType) => {
    setActiveType(type);
    setSheetOpen(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sources</h1>
        <p className="text-muted-foreground">
          Connect URLs, documents, feeds, video, and audio to your intelligence layer
        </p>
      </div>

      <div className="space-y-6">
        {groups.map(({ type, label }) => (
          <SourceConnectorCard
            key={type}
            type={type}
            label={label}
            sources={sources.filter((s) => s.type === type)}
            onAdd={() => openAdd(type)}
          />
        ))}
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connect {groups.find((g) => g.type === activeType)?.label}</SheetTitle>
            <SheetDescription>Prototype — no data is persisted</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {activeType === "web" && (
              <div className="space-y-2">
                <Label>URL</Label>
                <Input placeholder="https://competitor.com/blog" />
              </div>
            )}
            {activeType === "feed" && (
              <>
                <div className="space-y-2">
                  <Label>RSS / API endpoint</Label>
                  <Input placeholder="https://example.com/feed.xml" />
                </div>
                <div className="space-y-2">
                  <Label>Poll interval</Label>
                  <Input placeholder="Every 1 hour" />
                </div>
              </>
            )}
            {(activeType === "document" || activeType === "video" || activeType === "audio") && (
              <div className="rounded-lg border-2 border-dashed p-8 text-center text-sm text-muted-foreground">
                Drop files here or click to browse
                <p className="mt-1 text-xs">
                  {activeType === "document" && "PDF, DOCX, CSV"}
                  {activeType === "video" && "MP4, MOV, YouTube URL"}
                  {activeType === "audio" && "MP3, WAV, Gong export"}
                </p>
              </div>
            )}
            <Button className="w-full" onClick={() => setSheetOpen(false)}>
              Connect (mock)
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
