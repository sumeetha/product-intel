"use client";

import { useState } from "react";
import { subscriptions as initialSubscriptions } from "@/lib/data/subscriptions";
import type { Subscription, SubscriptionType } from "@/lib/types";
import { SubscriptionCard } from "@/components/subscription-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState(initialSubscriptions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<SubscriptionType>("competitor");

  const filterByType = (type: SubscriptionType) => subs.filter((s) => s.type === type);

  const handlePause = (id: string) => {
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, paused: !s.paused } : s))
    );
  };

  const handleCreate = () => {
    const newSub: Subscription = {
      id: `sub-${Date.now()}`,
      name: newName,
      type: newType,
      description: "New subscription — configure sources next",
      logoInitials: newName.slice(0, 2).toUpperCase(),
      logoColor: "bg-primary text-primary-foreground",
      sourceCount: 0,
      cadence: "daily",
      channels: ["in_app"],
      lastUpdate: new Date().toISOString(),
      paused: false,
    };
    setSubs((prev) => [...prev, newSub]);
    setDialogOpen(false);
    setStep(1);
    setNewName("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-muted-foreground">Track competitors, customer segments, and topics</p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          New subscription
        </Button>
      </div>

      <Tabs defaultValue="competitor">
        <TabsList>
          <TabsTrigger value="competitor">Competitors</TabsTrigger>
          <TabsTrigger value="customer_segment">Customer Segments</TabsTrigger>
          <TabsTrigger value="topic">Topics</TabsTrigger>
        </TabsList>
        {(["competitor", "customer_segment", "topic"] as SubscriptionType[]).map((type) => (
          <TabsContent key={type} value={type}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filterByType(type).map((s) => (
                <SubscriptionCard
                  key={s.id}
                  subscription={s}
                  onPause={() => handlePause(s.id)}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New subscription — Step {step} of 2</DialogTitle>
            <DialogDescription>
              {step === 1 ? "Name and type" : "Review and create"}
            </DialogDescription>
          </DialogHeader>
          {step === 1 ? (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Monday.com"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={newType} onValueChange={(v) => setNewType(v as SubscriptionType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="competitor">Competitor</SelectItem>
                    <SelectItem value="customer_segment">Customer segment</SelectItem>
                    <SelectItem value="topic">Topic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="py-4 text-sm">
              <p><strong>Name:</strong> {newName}</p>
              <p className="mt-2"><strong>Type:</strong> {newType.replace("_", " ")}</p>
              <p className="mt-2 text-muted-foreground">You can connect sources after creating.</p>
            </div>
          )}
          <DialogFooter>
            {step === 2 && (
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            )}
            {step === 1 ? (
              <Button disabled={!newName.trim()} onClick={() => setStep(2)}>Next</Button>
            ) : (
              <Button onClick={handleCreate}>Create subscription</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
