import Link from "next/link";
import { notFound } from "next/navigation";
import { getBriefById } from "@/lib/data/briefs";
import { CitationChip } from "@/components/citation-chip";
import { ChannelIcons } from "@/components/channel-icons";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default async function BriefDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brief = getBriefById(id);
  if (!brief) notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/briefs">
          <ArrowLeft className="h-4 w-4" />
          Back to briefs
        </Link>
      </Button>

      <div className={`h-2 rounded-full bg-gradient-to-r ${brief.coverGradient}`} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{brief.title}</h1>
        <p className="text-base text-muted-foreground">{brief.description}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {brief.schedule}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            Sent {formatRelativeTime(brief.lastSent)}
          </span>
          <ChannelIcons channels={brief.channels} />
        </div>
      </header>

      <hr className="border-border" />

      <article>
        <Markdown>{brief.markdown}</Markdown>
      </article>

      <section className="rounded-lg border bg-muted/30 p-4">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Citations
        </h2>
        <div className="flex flex-wrap gap-2">
          {brief.citations.map((c) => (
            <CitationChip key={c.id} citation={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
