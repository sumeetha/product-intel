"use client";

import type { Subscription } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChannelIcons } from "@/components/channel-icons";
import { formatRelativeTime } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pause, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const cadenceLabels = { realtime: "Real-time", daily: "Daily", weekly: "Weekly" };

export function SubscriptionCard({
  subscription,
  onPause,
}: {
  subscription: Subscription;
  onPause?: () => void;
}) {
  return (
    <Card className={cn(subscription.paused && "opacity-60")}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={subscription.logoColor}>
                {subscription.logoInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{subscription.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 max-w-[200px]">
                {subscription.description}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onPause}>
                <Pause className="h-4 w-4" /> {subscription.paused ? "Resume" : "Pause"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="secondary">{subscription.sourceCount} sources</Badge>
          <Badge variant="outline">{cadenceLabels[subscription.cadence]}</Badge>
          {subscription.paused && <Badge variant="destructive">Paused</Badge>}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <ChannelIcons channels={subscription.channels} />
          <span className="text-xs text-muted-foreground">
            Updated {formatRelativeTime(subscription.lastUpdate)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
