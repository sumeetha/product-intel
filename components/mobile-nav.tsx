"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Bell, Database, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", icon: LayoutDashboard, label: "Home" },
  { href: "/ask", icon: MessageSquare, label: "Ask" },
  { href: "/subscriptions", icon: Bell, label: "Subs" },
  { href: "/sources", icon: Database, label: "Sources" },
  { href: "/briefs", icon: FileText, label: "Briefs" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t bg-card md:hidden">
      {items.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2 text-xs",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
