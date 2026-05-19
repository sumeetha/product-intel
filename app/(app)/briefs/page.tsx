import { briefs } from "@/lib/data/briefs";
import { BriefCard } from "@/components/brief-card";

export default function BriefsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Briefs</h1>
        <p className="text-muted-foreground">Scheduled and saved intelligence digests</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {briefs.map((b) => (
          <BriefCard key={b.id} brief={b} />
        ))}
      </div>
    </div>
  );
}
