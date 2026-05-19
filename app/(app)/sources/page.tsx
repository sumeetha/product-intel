"use client";

import { useState } from "react";
import { sources } from "@/lib/data/sources";
import type { SourceType } from "@/lib/types";
import { SourceConnectorCard } from "@/components/source-connector-card";
import { ConnectSourceSheet } from "@/components/connect-source-sheet";

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

      <ConnectSourceSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        type={activeType}
      />
    </div>
  );
}
