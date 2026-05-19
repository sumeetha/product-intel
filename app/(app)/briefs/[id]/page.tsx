import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBriefById } from "@/lib/data/briefs";
import { CitationChip } from "@/components/citation-chip";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
      <header>
        <h1 className="text-2xl font-bold">{brief.title}</h1>
        <p className="text-muted-foreground">{brief.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">{brief.schedule}</p>
      </header>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <ReactMarkdown>{brief.markdown}</ReactMarkdown>
      </article>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
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
