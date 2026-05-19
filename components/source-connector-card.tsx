"use client";

import type { Source, SourceType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SourceTypeIcon } from "@/components/source-type-icon";
import { formatRelativeTime } from "@/lib/utils";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyles = {
  synced: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  syncing: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  error: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
};

export function SourceConnectorCard({
  type,
  label,
  sources,
  onAdd,
}: {
  type: SourceType;
  label: string;
  sources: Source[];
  onAdd: () => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <SourceTypeIcon type={type} showLabel />
          {label}
          <Badge variant="secondary">{sources.length}</Badge>
        </CardTitle>
        <Button size="sm" variant="outline" onClick={onAdd}>
          <Plus className="h-4 w-4" />
          Connect new
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Items</th>
                <th className="pb-2 font-medium">Last sync</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{s.name}</td>
                  <td className="py-3">
                    <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium capitalize", statusStyles[s.status])}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-muted-foreground">{s.itemCount.toLocaleString()}</td>
                  <td className="py-3 text-muted-foreground">{formatRelativeTime(s.lastSync)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
