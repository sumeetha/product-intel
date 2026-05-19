import { Bell, Mail, MessageSquare } from "lucide-react";
import type { DeliveryChannel } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const icons: Record<DeliveryChannel, { icon: typeof Mail; label: string }> = {
  email: { icon: Mail, label: "Email" },
  slack: { icon: MessageSquare, label: "Slack" },
  in_app: { icon: Bell, label: "In-app" },
};

export function ChannelIcons({ channels }: { channels: DeliveryChannel[] }) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1">
        {channels.map((ch) => {
          const { icon: Icon, label } = icons[ch];
          return (
            <Tooltip key={ch}>
              <TooltipTrigger asChild>
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
