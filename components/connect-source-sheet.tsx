"use client";

import { useMemo, useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SourceTypeIcon } from "@/components/source-type-icon";
import { subscriptions } from "@/lib/data/subscriptions";
import type { Importance, SourceType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Info,
  Plus,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

const typeMeta: Record<
  SourceType,
  { label: string; blurb: string; defaultName: string }
> = {
  web: {
    label: "Web URL",
    blurb: "Crawl a page or site and keep it in sync.",
    defaultName: "competitor.com/blog",
  },
  document: {
    label: "Document",
    blurb: "Upload PDFs, decks, exports, or transcripts.",
    defaultName: "Quarterly report.pdf",
  },
  feed: {
    label: "Data Feed",
    blurb: "Pull from RSS, Atom, JSON, or REST endpoints.",
    defaultName: "Linear Changelog RSS",
  },
  video: {
    label: "Video",
    blurb: "Index recordings, webinars, or earnings calls.",
    defaultName: "Earnings call recording",
  },
  audio: {
    label: "Audio",
    blurb: "Transcribe call recordings and podcasts.",
    defaultName: "Customer call",
  },
};

const cadences = [
  { value: "realtime", label: "Real-time (webhook)" },
  { value: "15m", label: "Every 15 minutes" },
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "manual", label: "Manual only" },
];

const languages = [
  { value: "auto", label: "Auto-detect" },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
];

export function ConnectSourceSheet({
  open,
  onOpenChange,
  type,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: SourceType;
}) {
  const meta = typeMeta[type];

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [subscriptionId, setSubscriptionId] = useState<string>("");
  const [importance, setImportance] = useState<Importance>("medium");
  const [cadence, setCadence] = useState("hourly");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  // Type-specific state
  const [crawlDepth, setCrawlDepth] = useState("page");
  const [renderJs, setRenderJs] = useState(false);
  const [respectRobots, setRespectRobots] = useState(true);
  const [includePatterns, setIncludePatterns] = useState("");
  const [excludePatterns, setExcludePatterns] = useState("");

  const [feedFormat, setFeedFormat] = useState("rss");
  const [authType, setAuthType] = useState("none");
  const [authToken, setAuthToken] = useState("");
  const [maxItems, setMaxItems] = useState("50");

  const [videoSource, setVideoSource] = useState("upload");
  const [audioSource, setAudioSource] = useState("upload");

  const [ocr, setOcr] = useState(true);
  const [extractTables, setExtractTables] = useState(true);
  const [redactPii, setRedactPii] = useState(false);
  const [language, setLanguage] = useState("auto");

  const [autoTranscribe, setAutoTranscribe] = useState(true);
  const [diarization, setDiarization] = useState(true);
  const [chapters, setChapters] = useState(true);
  const [detectTopics, setDetectTopics] = useState(true);

  const [notifyNew, setNotifyNew] = useState(true);
  const [autoSummarize, setAutoSummarize] = useState(true);
  const [addToBrief, setAddToBrief] = useState(false);

  const [mockFiles, setMockFiles] = useState<string[]>([]);

  const groupedSubs = useMemo(() => {
    const groups: Record<string, typeof subscriptions> = {
      competitor: [],
      customer_segment: [],
      topic: [],
    };
    for (const s of subscriptions) groups[s.type].push(s);
    return groups;
  }, []);

  const addTag = () => {
    const next = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (next.length) {
      setTags((prev) => Array.from(new Set([...prev, ...next])));
      setTagInput("");
    }
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-xl">
        <SheetHeader className="space-y-2 border-b px-6 pb-4 pt-6 text-left">
          <div className="flex items-start gap-3">
            <SourceTypeIcon type={type} />
            <div className="space-y-1">
              <SheetTitle>Connect {meta.label}</SheetTitle>
              <SheetDescription>{meta.blurb}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5">
          {/* Section 1: Source connection */}
          <Section
            number={1}
            title="Source"
            description="Where should we pull data from?"
          >
            {type === "web" && (
              <>
                <Field label="URL" required>
                  <Input
                    placeholder="https://competitor.com/blog"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Field>
                <Field
                  label="Crawl scope"
                  hint="Controls how far we follow links from the starting URL."
                >
                  <Select value={crawlDepth} onValueChange={setCrawlDepth}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Just this page</SelectItem>
                      <SelectItem value="section">Follow links 1 level deep</SelectItem>
                      <SelectItem value="site">Whole site (sitemap.xml)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </>
            )}

            {type === "feed" && (
              <>
                <Field label="Endpoint" required>
                  <Input
                    placeholder="https://example.com/feed.xml"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Format">
                    <Select value={feedFormat} onValueChange={setFeedFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rss">RSS 2.0</SelectItem>
                        <SelectItem value="atom">Atom</SelectItem>
                        <SelectItem value="json">JSON Feed</SelectItem>
                        <SelectItem value="rest">REST / Custom JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Authentication">
                    <Select value={authType} onValueChange={setAuthType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="api_key">API key header</SelectItem>
                        <SelectItem value="bearer">Bearer token</SelectItem>
                        <SelectItem value="basic">Basic auth</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                {authType !== "none" && (
                  <Field
                    label={authType === "basic" ? "Username:password" : "Token"}
                  >
                    <Input
                      type="password"
                      placeholder={
                        authType === "basic"
                          ? "user:pass"
                          : "sk_live_••••••••••••"
                      }
                      value={authToken}
                      onChange={(e) => setAuthToken(e.target.value)}
                    />
                  </Field>
                )}
              </>
            )}

            {type === "document" && (
              <>
                <DropZone
                  hint="PDF, DOCX, PPTX, CSV, MD, TXT — up to 100 MB each"
                  files={mockFiles}
                  onAdd={() =>
                    setMockFiles((prev) => [
                      ...prev,
                      `document-${prev.length + 1}.pdf`,
                    ])
                  }
                  onRemove={(f) =>
                    setMockFiles((prev) => prev.filter((x) => x !== f))
                  }
                />
              </>
            )}

            {type === "video" && (
              <>
                <Field label="Source">
                  <Select value={videoSource} onValueChange={setVideoSource}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upload">Upload file</SelectItem>
                      <SelectItem value="youtube">YouTube URL</SelectItem>
                      <SelectItem value="vimeo">Vimeo URL</SelectItem>
                      <SelectItem value="loom">Loom URL</SelectItem>
                      <SelectItem value="zoom">Zoom recording</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                {videoSource === "upload" ? (
                  <DropZone
                    hint="MP4, MOV, MKV — up to 4 GB each"
                    files={mockFiles}
                    onAdd={() =>
                      setMockFiles((prev) => [
                        ...prev,
                        `recording-${prev.length + 1}.mp4`,
                      ])
                    }
                    onRemove={(f) =>
                      setMockFiles((prev) => prev.filter((x) => x !== f))
                    }
                  />
                ) : (
                  <Field label="URL" required>
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Field>
                )}
              </>
            )}

            {type === "audio" && (
              <>
                <Field label="Source">
                  <Select value={audioSource} onValueChange={setAudioSource}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upload">Upload file</SelectItem>
                      <SelectItem value="gong">Gong export</SelectItem>
                      <SelectItem value="chorus">Chorus.ai</SelectItem>
                      <SelectItem value="otter">Otter.ai</SelectItem>
                      <SelectItem value="rss">Podcast RSS</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                {audioSource === "upload" || audioSource === "gong" ? (
                  <DropZone
                    hint="MP3, WAV, M4A — up to 1 GB each"
                    files={mockFiles}
                    onAdd={() =>
                      setMockFiles((prev) => [
                        ...prev,
                        `call-${prev.length + 1}.mp3`,
                      ])
                    }
                    onRemove={(f) =>
                      setMockFiles((prev) => prev.filter((x) => x !== f))
                    }
                  />
                ) : (
                  <Field label="URL" required>
                    <Input
                      placeholder="https://example.com/podcast.rss"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Field>
                )}
              </>
            )}

            <Field label="Display name" hint="Defaults to the page or file title.">
              <Input
                placeholder={meta.defaultName}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
          </Section>

          {/* Section 2: Organize */}
          <Section
            number={2}
            title="Organize"
            description="Route this source to the right intelligence track."
          >
            <Field label="Assign to subscription" required>
              <Select value={subscriptionId} onValueChange={setSubscriptionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subscription…" />
                </SelectTrigger>
                <SelectContent>
                  {(["competitor", "customer_segment", "topic"] as const).map(
                    (group) =>
                      groupedSubs[group].length > 0 ? (
                        <SelectGroupLabel key={group} group={group}>
                          {groupedSubs[group].map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectGroupLabel>
                      ) : null
                  )}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Importance">
              <div className="grid grid-cols-3 gap-2">
                {(["high", "medium", "low"] as Importance[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setImportance(level)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-colors",
                      importance === level
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-input text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Tags" hint="Press Enter or use commas to add multiple.">
              <Input
                placeholder="pricing, launch, ai"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                onBlur={addTag}
              />
              {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="rounded-sm opacity-60 hover:opacity-100"
                        aria-label={`Remove ${t}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </Field>
          </Section>

          {/* Section 3: Sync */}
          <Section
            number={3}
            title="Sync schedule"
            description="How often should we refresh this source?"
          >
            <Field label="Cadence">
              <Select value={cadence} onValueChange={setCadence}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cadences.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <ToggleRow
              icon={<Sparkles className="h-4 w-4 text-muted-foreground" />}
              label="Auto-summarize new items"
              description="Generate a 1-sentence summary as items land."
              checked={autoSummarize}
              onChange={setAutoSummarize}
            />
            <ToggleRow
              label="Notify me on new items"
              description="Send a ping to your configured channels."
              checked={notifyNew}
              onChange={setNotifyNew}
            />
            <ToggleRow
              label="Include in scheduled briefs"
              description="Pull from this source when building digest emails."
              checked={addToBrief}
              onChange={setAddToBrief}
            />
          </Section>

          {/* Section 4: Advanced (collapsible) */}
          <div className="rounded-lg border bg-muted/30">
            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                Advanced processing
                <span className="text-xs font-normal text-muted-foreground">
                  Optional
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  advancedOpen && "rotate-180"
                )}
              />
            </button>
            {advancedOpen && (
              <div className="space-y-4 border-t px-4 py-4">
                {type === "web" && (
                  <>
                    <ToggleRow
                      label="Render JavaScript"
                      description="Use a headless browser for SPAs and dynamic content."
                      checked={renderJs}
                      onChange={setRenderJs}
                    />
                    <ToggleRow
                      label="Respect robots.txt"
                      description="Skip pages disallowed by the site."
                      checked={respectRobots}
                      onChange={setRespectRobots}
                    />
                    <Field
                      label="Include patterns"
                      hint="Glob patterns, comma separated."
                    >
                      <Input
                        placeholder="/blog/*, /changelog/*"
                        value={includePatterns}
                        onChange={(e) => setIncludePatterns(e.target.value)}
                      />
                    </Field>
                    <Field label="Exclude patterns">
                      <Input
                        placeholder="/auth/*, /admin/*"
                        value={excludePatterns}
                        onChange={(e) => setExcludePatterns(e.target.value)}
                      />
                    </Field>
                  </>
                )}

                {type === "feed" && (
                  <>
                    <Field label="Max items per poll">
                      <Input
                        type="number"
                        min={1}
                        max={500}
                        value={maxItems}
                        onChange={(e) => setMaxItems(e.target.value)}
                      />
                    </Field>
                    <Field
                      label="Custom headers"
                      hint="One per line, format: Header-Name: value"
                    >
                      <textarea
                        rows={3}
                        placeholder={"User-Agent: ProductIntel/1.0\nAccept: application/json"}
                        className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 font-mono text-xs shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </Field>
                  </>
                )}

                {type === "document" && (
                  <>
                    <ToggleRow
                      label="OCR scanned pages"
                      description="Extract text from image-based PDFs."
                      checked={ocr}
                      onChange={setOcr}
                    />
                    <ToggleRow
                      label="Extract tables"
                      description="Preserve tabular structure for citations."
                      checked={extractTables}
                      onChange={setExtractTables}
                    />
                    <ToggleRow
                      label="Redact PII before indexing"
                      description="Strip emails, phone numbers, and account IDs."
                      checked={redactPii}
                      onChange={setRedactPii}
                    />
                    <Field label="Document language">
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((l) => (
                            <SelectItem key={l.value} value={l.value}>
                              {l.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </>
                )}

                {(type === "video" || type === "audio") && (
                  <>
                    <ToggleRow
                      label="Auto-transcribe"
                      description="Run speech-to-text and index the transcript."
                      checked={autoTranscribe}
                      onChange={setAutoTranscribe}
                    />
                    <ToggleRow
                      label="Speaker diarization"
                      description="Label segments by speaker for cleaner citations."
                      checked={diarization}
                      onChange={setDiarization}
                    />
                    {type === "video" && (
                      <ToggleRow
                        label="Generate chapters"
                        description="Auto-break the recording into navigable sections."
                        checked={chapters}
                        onChange={setChapters}
                      />
                    )}
                    {type === "audio" && (
                      <ToggleRow
                        label="Detect topics"
                        description="Tag segments with detected discussion themes."
                        checked={detectTopics}
                        onChange={setDetectTopics}
                      />
                    )}
                    <Field label="Language">
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((l) => (
                            <SelectItem key={l.value} value={l.value}>
                              {l.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 rounded-lg bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Prototype — connection details are not stored and no real fetch is
              performed.
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t bg-background px-6 py-4">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Connect (mock)</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
          {number}
        </span>
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold leading-none">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="space-y-3 pl-8">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      </div>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-2">
        {icon}
        <div className="space-y-0.5">
          <Label className="text-sm">{label}</Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function SelectGroupLabel({
  group,
  children,
}: {
  group: "competitor" | "customer_segment" | "topic";
  children: React.ReactNode;
}) {
  const label =
    group === "competitor"
      ? "Competitors"
      : group === "customer_segment"
        ? "Customer segments"
        : "Topics";
  return (
    <>
      <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {children}
    </>
  );
}

function DropZone({
  hint,
  files,
  onAdd,
  onRemove,
}: {
  hint: string;
  files: string[];
  onAdd: () => void;
  onRemove: (f: string) => void;
}) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onAdd}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input px-4 py-6 text-center text-sm transition-colors hover:border-primary/40 hover:bg-muted/40"
      >
        <Upload className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">Drop files or click to browse</p>
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        </div>
      </button>
      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((f) => (
            <li
              key={f}
              className="flex items-center justify-between rounded-md border bg-background px-3 py-1.5 text-xs"
            >
              <span className="truncate">{f}</span>
              <button
                type="button"
                onClick={() => onRemove(f)}
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Remove ${f}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Plus className="h-3 w-3" /> Add another
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
