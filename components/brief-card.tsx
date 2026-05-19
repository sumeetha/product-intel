import Link from "next/link";
import type { Brief } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { ChannelIcons } from "@/components/channel-icons";
import { formatRelativeTime } from "@/lib/utils";
import { Calendar } from "lucide-react";

export function BriefCard({ brief }: { brief: Brief }) {
  return (
    <Link href={`/briefs/${brief.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md h-full">
        <div className={`h-24 bg-gradient-to-br ${brief.coverGradient}`} />
        <CardContent className="p-5">
          <h3 className="font-semibold">{brief.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{brief.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {brief.schedule}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <ChannelIcons channels={brief.channels} />
            <span className="text-xs text-muted-foreground">
              Sent {formatRelativeTime(brief.lastSent)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
