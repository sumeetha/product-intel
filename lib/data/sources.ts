import type { Source } from "@/lib/types";

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600000).toISOString();

export const sources: Source[] = [
  { id: "src-1", name: "notion.so/blog", type: "web", subscriptionId: "sub-notion", status: "synced", lastSync: hoursAgo(1), itemCount: 142, url: "https://notion.so/blog" },
  { id: "src-2", name: "Linear Changelog RSS", type: "feed", subscriptionId: "sub-linear", status: "synced", lastSync: hoursAgo(0.5), itemCount: 89 },
  { id: "src-3", name: "G2 — Linear Reviews (PDF export)", type: "document", subscriptionId: "sub-linear", status: "synced", lastSync: hoursAgo(24), itemCount: 234 },
  { id: "src-4", name: "Asana Q1 Earnings Call (YouTube)", type: "video", subscriptionId: "sub-asana", status: "synced", lastSync: hoursAgo(48), itemCount: 1, url: "https://youtube.com/watch?v=example" },
  { id: "src-5", name: "ClickUp Pricing Page", type: "web", subscriptionId: "sub-clickup", status: "error", lastSync: hoursAgo(72), itemCount: 12, url: "https://clickup.com/pricing" },
  { id: "src-6", name: "Gong — Enterprise QBR calls", type: "audio", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(2), itemCount: 56 },
  { id: "src-7", name: "Zendesk export — Enterprise", type: "document", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(6), itemCount: 1203 },
  { id: "src-8", name: "NPS verbatim dump Q2", type: "document", subscriptionId: "sub-enterprise", status: "syncing", lastSync: hoursAgo(0.2), itemCount: 412 },
  { id: "src-9", name: "Product Hunt — AI tools feed", type: "feed", subscriptionId: "sub-ai-productivity", status: "synced", lastSync: hoursAgo(3), itemCount: 67 },
  { id: "src-10", name: "HN Algolia — AI agents", type: "feed", subscriptionId: "sub-ai-productivity", status: "synced", lastSync: hoursAgo(1), itemCount: 201 },
  { id: "src-11", name: "Notion AI launch webinar", type: "video", subscriptionId: "sub-notion", status: "synced", lastSync: hoursAgo(120), itemCount: 1 },
  { id: "src-12", name: "Linear podcast — CEO interview", type: "audio", subscriptionId: "sub-linear", status: "synced", lastSync: hoursAgo(168), itemCount: 1 },
  { id: "src-13", name: "asana.com/whats-new", type: "web", subscriptionId: "sub-asana", status: "synced", lastSync: hoursAgo(12), itemCount: 78 },
  { id: "src-14", name: "Cancellation survey CSV", type: "document", subscriptionId: "sub-smb-churn", status: "synced", lastSync: hoursAgo(8), itemCount: 89 },
  { id: "src-15", name: "Reddit r/projectmanagement", type: "feed", subscriptionId: "sub-smb-churn", status: "synced", lastSync: hoursAgo(2), itemCount: 445 },
  { id: "src-16", name: "Intercom — onboarding tags", type: "feed", subscriptionId: "sub-onboarding", status: "synced", lastSync: hoursAgo(4), itemCount: 312 },
  { id: "src-17", name: "Help center analytics API", type: "feed", subscriptionId: "sub-onboarding", status: "synced", lastSync: hoursAgo(1), itemCount: 89 },
  { id: "src-18", name: "Competitive battlecard deck", type: "document", subscriptionId: "sub-notion", status: "synced", lastSync: hoursAgo(240), itemCount: 1 },
  { id: "src-19", name: "ClickUp YouTube channel", type: "video", subscriptionId: "sub-clickup", status: "syncing", lastSync: hoursAgo(0.5), itemCount: 34 },
  { id: "src-20", name: "Customer advisory board recording", type: "audio", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(96), itemCount: 3 },
  { id: "src-21", name: "TechCrunch — productivity RSS", type: "feed", subscriptionId: "sub-ai-productivity", status: "synced", lastSync: hoursAgo(5), itemCount: 156 },
  { id: "src-22", name: "Notion status page", type: "web", subscriptionId: "sub-notion", status: "synced", lastSync: hoursAgo(0.25), itemCount: 23 },
  { id: "src-23", name: "Linear docs — API reference", type: "web", subscriptionId: "sub-linear", status: "synced", lastSync: hoursAgo(6), itemCount: 201 },
  { id: "src-24", name: "Win/loss interview notes", type: "document", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(36), itemCount: 18 },
  { id: "src-25", name: "Setup wizard screen recordings", type: "video", subscriptionId: "sub-onboarding", status: "synced", lastSync: hoursAgo(72), itemCount: 8 },
];

export function getSourcesByType(type: Source["type"]) {
  return sources.filter((s) => s.type === type);
}

export function getSourceById(id: string) {
  return sources.find((s) => s.id === id);
}
