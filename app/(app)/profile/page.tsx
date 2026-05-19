"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { userProfile } from "@/lib/data/profile";
import { formatRelativeTime } from "@/lib/utils";
import {
  Building2,
  CalendarClock,
  ExternalLink,
  Mail,
  MapPin,
  Settings as SettingsIcon,
  Shield,
} from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState(userProfile.name);
  const [role, setRole] = useState(userProfile.role);
  const [team, setTeam] = useState(userProfile.team);
  const [email, setEmail] = useState(userProfile.email);
  const [location, setLocation] = useState(userProfile.location);
  const [timezone, setTimezone] = useState(userProfile.timezone);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Your identity, workspace, and intelligence activity
        </p>
      </div>

      {/* Hero card */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20" />
        <CardContent className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          <Avatar className="h-20 w-20 ring-4 ring-card">
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {userProfile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">{userProfile.name}</h2>
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                Senior PM
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {userProfile.role} · {userProfile.team}
            </p>
            <p className="text-xs text-muted-foreground">
              Joined {formatRelativeTime(userProfile.joinedAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings">
                <SettingsIcon className="mr-1.5 h-3.5 w-3.5" />
                Settings
              </Link>
            </Button>
            <Button size="sm">Save changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal info</CardTitle>
          <CardDescription>
            Shown on briefs, comments, and shared threads.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Role">
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </Field>
          <Field label="Team">
            <Input value={team} onChange={(e) => setTeam(e.target.value)} />
          </Field>
          <Field label="Work email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Location">
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>
          <Field label="Timezone">
            <Input value={timezone} onChange={(e) => setTimezone(e.target.value)} />
          </Field>
        </CardContent>
      </Card>

      {/* Workspace */}
      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>
            You're signed in to this Product Intel workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Row
            icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
            label="Workspace"
            value={userProfile.workspace}
            sub={userProfile.workspacePlan}
          />
          <Row
            icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            label="Work email"
            value={userProfile.email}
          />
          <Row
            icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
            label="Location"
            value={userProfile.location}
          />
          <Row
            icon={<CalendarClock className="h-4 w-4 text-muted-foreground" />}
            label="Timezone"
            value={userProfile.timezone}
            sub="Used for digest scheduling and trend windows."
          />
          <Row
            icon={<Shield className="h-4 w-4 text-muted-foreground" />}
            label="Role permissions"
            value="Workspace admin"
            sub="Can invite teammates, manage sources, and edit briefs."
          />
        </CardContent>
      </Card>

      {/* Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Your intelligence activity</CardTitle>
          <CardDescription>
            Snapshot of how you've used Product Intel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {userProfile.activity.map((a) => (
              <div
                key={a.label}
                className="rounded-lg border bg-muted/30 px-4 py-3"
              >
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  {a.label}
                </dt>
                <dd className="mt-1 text-2xl font-semibold tabular-nums">
                  {a.value}
                </dd>
                {a.hint && (
                  <p className="mt-1 text-[11px] text-muted-foreground">{a.hint}</p>
                )}
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/subscriptions">
                View subscriptions
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sources">
                View sources
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/briefs">
                View briefs
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Session */}
      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Session</CardTitle>
          <CardDescription>
            Sign out of this workspace on this device. Prototype only — no real
            session is held.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm">
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      {children}
    </div>
  );
}

function Row({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-background px-3 py-2.5">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
        {sub && <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}
