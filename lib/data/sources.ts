import type { Source } from "@/lib/types";

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600000).toISOString();

export const sources: Source[] = [
  { id: "src-1", name: "codesignal.com/blog", type: "web", subscriptionId: "sub-codesignal", status: "synced", lastSync: hoursAgo(1), itemCount: 138, url: "https://codesignal.com/blog" },
  { id: "src-2", name: "CodeSignal product changelog RSS", type: "feed", subscriptionId: "sub-codesignal", status: "synced", lastSync: hoursAgo(0.5), itemCount: 76 },
  { id: "src-3", name: "G2 — CoderPad Reviews (PDF export)", type: "document", subscriptionId: "sub-coderpad", status: "synced", lastSync: hoursAgo(24), itemCount: 312 },
  { id: "src-4", name: "CoderPad CEO @ Recruiting Brainfood (YouTube)", type: "video", subscriptionId: "sub-coderpad", status: "synced", lastSync: hoursAgo(48), itemCount: 1, url: "https://youtube.com/watch?v=coderpad-brainfood" },
  { id: "src-5", name: "HackerEarth pricing page", type: "web", subscriptionId: "sub-hackerearth", status: "error", lastSync: hoursAgo(72), itemCount: 14, url: "https://hackerearth.com/recruit/pricing" },
  { id: "src-6", name: "Gong — Enterprise QBR calls", type: "audio", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(2), itemCount: 64 },
  { id: "src-7", name: "Zendesk export — Enterprise tier", type: "document", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(6), itemCount: 1487 },
  { id: "src-8", name: "NPS verbatim dump Q2", type: "document", subscriptionId: "sub-enterprise", status: "syncing", lastSync: hoursAgo(0.2), itemCount: 523 },
  { id: "src-9", name: "Product Hunt — proctoring & AI-detector feed", type: "feed", subscriptionId: "sub-ai-cheating", status: "synced", lastSync: hoursAgo(3), itemCount: 51 },
  { id: "src-10", name: "HN Algolia — \"AI cheating coding interview\"", type: "feed", subscriptionId: "sub-ai-cheating", status: "synced", lastSync: hoursAgo(1), itemCount: 188 },
  { id: "src-11", name: "CodeSignal Cosmo launch webinar", type: "video", subscriptionId: "sub-codesignal", status: "synced", lastSync: hoursAgo(120), itemCount: 1 },
  { id: "src-12", name: "\"Talent Talks\" podcast — CoderPad ep.", type: "audio", subscriptionId: "sub-coderpad", status: "synced", lastSync: hoursAgo(168), itemCount: 1 },
  { id: "src-13", name: "codility.com/blog", type: "web", subscriptionId: "sub-codility", status: "synced", lastSync: hoursAgo(12), itemCount: 64 },
  { id: "src-14", name: "Q2 recruiter survey (CSV)", type: "document", subscriptionId: "sub-recruiter-voice", status: "synced", lastSync: hoursAgo(8), itemCount: 142 },
  { id: "src-15", name: "Reddit r/recruiting & r/cscareerquestions", type: "feed", subscriptionId: "sub-recruiter-voice", status: "synced", lastSync: hoursAgo(2), itemCount: 612 },
  { id: "src-16", name: "Greenhouse Marketplace reviews", type: "feed", subscriptionId: "sub-recruiter-voice", status: "synced", lastSync: hoursAgo(4), itemCount: 287 },
  { id: "src-17", name: "WSJ / TechCrunch — \"skills-based hiring\" feed", type: "feed", subscriptionId: "sub-skills-hiring", status: "synced", lastSync: hoursAgo(1), itemCount: 92 },
  { id: "src-18", name: "Codility competitive battlecard (deck)", type: "document", subscriptionId: "sub-codility", status: "synced", lastSync: hoursAgo(240), itemCount: 1 },
  { id: "src-19", name: "CoderPad YouTube channel", type: "video", subscriptionId: "sub-coderpad", status: "syncing", lastSync: hoursAgo(0.5), itemCount: 47 },
  { id: "src-20", name: "Customer Advisory Board recording", type: "audio", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(96), itemCount: 3 },
  { id: "src-21", name: "Codility press releases (RSS)", type: "feed", subscriptionId: "sub-codility", status: "synced", lastSync: hoursAgo(5), itemCount: 38 },
  { id: "src-22", name: "codesignal.com/status", type: "web", subscriptionId: "sub-codesignal", status: "synced", lastSync: hoursAgo(0.25), itemCount: 21 },
  { id: "src-23", name: "CoderPad docs — API & integrations", type: "web", subscriptionId: "sub-coderpad", status: "synced", lastSync: hoursAgo(6), itemCount: 173 },
  { id: "src-24", name: "Enterprise win/loss interview notes", type: "document", subscriptionId: "sub-enterprise", status: "synced", lastSync: hoursAgo(36), itemCount: 22 },
  { id: "src-25", name: "LinkedIn Talent Insights — skills-graph signals", type: "feed", subscriptionId: "sub-skills-hiring", status: "synced", lastSync: hoursAgo(72), itemCount: 41 },
];

export function getSourcesByType(type: Source["type"]) {
  return sources.filter((s) => s.type === type);
}

export function getSourceById(id: string) {
  return sources.find((s) => s.id === id);
}
