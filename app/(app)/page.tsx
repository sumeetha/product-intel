"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { updates } from "@/lib/data/updates";
import { trendingTopics } from "@/lib/data/trending";
import { subscriptions } from "@/lib/data/subscriptions";
import { briefs } from "@/lib/data/briefs";
import { UpdateCard } from "@/components/update-card";
import { StatCard } from "@/components/stat-card";
import { TrendSparkline } from "@/components/trend-sparkline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Importance, SourceType } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const [subFilter, setSubFilter] = useState<string>("all");
  const [importanceFilter, setImportanceFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const highSignalToday = updates.filter((u) => u.importance === "high" && !u.read).length;
  const unreadCount = updates.filter((u) => !u.read).length;

  const filtered = useMemo(() => {
    return updates.filter((u) => {
      if (subFilter !== "all" && u.subscriptionId !== subFilter) return false;
      if (importanceFilter !== "all" && u.importance !== importanceFilter) return false;
      if (sourceFilter !== "all" && u.sourceType !== sourceFilter) return false;
      return true;
    });
  }, [subFilter, importanceFilter, sourceFilter]);

  const latestBrief = briefs[0];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-background border p-6">
        <h1 className="text-2xl font-bold tracking-tight">Intelligence inbox</h1>
        <p className="mt-1 text-muted-foreground">
          {highSignalToday} high-signal update{highSignalToday !== 1 ? "s" : ""} today · {unreadCount} unread
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Subscriptions" value={subscriptions.length} />
          <StatCard label="Unread" value={unreadCount} />
          <StatCard label="High signal" value={highSignalToday} />
          <StatCard label="Sources" value={25} subtext="connected" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={subFilter} onValueChange={setSubFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Subscription" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All subscriptions</SelectItem>
            {subscriptions.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={importanceFilter} onValueChange={setImportanceFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Importance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All importance</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Source type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            {(["web", "document", "feed", "video", "audio"] as SourceType[]).map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recent updates
          </h2>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No updates match your filters.</p>
          ) : (
            filtered.map((u) => <UpdateCard key={u.id} update={u} />)
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Trending this week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingTopics.map((t) => (
                <div key={t.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t.label}</span>
                    <span className={t.change >= 0 ? "text-emerald-600" : "text-red-500"}>
                      {t.change >= 0 ? "+" : ""}{t.change}%
                    </span>
                  </div>
                  <TrendSparkline data={t.sparkline} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${latestBrief.coverGradient}`} />
            <CardHeader>
              <CardTitle className="text-base">Brief preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium">{latestBrief.title}</p>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-3">
                {latestBrief.markdown.split("\n").slice(2, 5).join(" ")}
              </p>
              <Button variant="link" className="mt-3 px-0" asChild>
                <Link href={`/briefs/${latestBrief.id}`}>
                  Read full brief <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
