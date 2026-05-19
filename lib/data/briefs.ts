import type { Brief } from "@/lib/types";

const d = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

export const briefs: Brief[] = [
  {
    id: "brief-1",
    title: "Weekly Competitor Brief",
    description: "Notion, Linear, Asana, ClickUp — product moves, pricing, and positioning",
    schedule: "Every Monday 8:00 AM",
    lastSent: d(2),
    channels: ["email", "slack"],
    coverGradient: "from-indigo-500 to-violet-600",
    markdown: `## Weekly Competitor Brief — May 12, 2026

### Executive summary
High-signal week: Linear's AI Triage launch and Notion's unlimited AI bundling are the two moves requiring immediate response.

### Linear
- Shipped **AI Triage** for automatic issue routing — watch for enterprise pilots
- API v2 bulk operations enable heavier migration tooling
- G2 reviews: leads on ease of use, weak on reporting (our opportunity)

### Notion
- Removed AI caps on Business/Enterprise — direct competitive threat to our AI add-on
- Calendar two-way Google sync increases platform stickiness

### Asana
- Smart Goals with AI progress tracking targets OKR buyers
- CEO cited AI driving 15% of enterprise upsells on earnings call

### Recommended actions
1. Brief sales on Notion AI bundling talk track
2. Accelerate reporting roadmap narrative for enterprise deals
3. Monitor Linear AI Triage adoption via G2/job postings`,
    citations: [
      { id: "bc1", sourceId: "src-2", sourceName: "Linear Changelog RSS", sourceType: "feed", excerpt: "AI Triage launch announcement" },
      { id: "bc2", sourceId: "src-1", sourceName: "notion.so/blog", sourceType: "web", excerpt: "Unlimited AI on Business tier" },
    ],
  },
  {
    id: "brief-2",
    title: "Customer Voice — Q2",
    description: "Enterprise & SMB themes from Gong, Zendesk, NPS, and surveys",
    schedule: "First of month",
    lastSent: d(18),
    channels: ["email"],
    coverGradient: "from-emerald-500 to-teal-600",
    markdown: `## Customer Voice — Q2 2026

### Top themes
1. **Onboarding friction** — invite flow and integration step confusion
2. **Migration tooling** — Jira import requested 23× in NPS verbatims
3. **Price sensitivity** — SMB churn citing per-seat cost vs ClickUp free tier

### Enterprise segment
- Win/loss: Linear's perceived speed cited in 3 accounts
- Renewal risk: Notion AI bundling mentioned on 2 QBR calls

### SMB segment
- 12 cancellations cited price over features
- Reddit/community mentions increasing for "free alternatives"`,
    citations: [
      { id: "bc3", sourceId: "src-8", sourceName: "NPS verbatim dump Q2", sourceType: "document", excerpt: "Jira migration path requested 23 times" },
      { id: "bc4", sourceId: "src-14", sourceName: "Cancellation survey CSV", sourceType: "document", excerpt: "Price sensitivity in 12 surveys" },
    ],
  },
  {
    id: "brief-3",
    title: "AI Productivity Landscape",
    description: "Cross-source digest on AI agents, copilots, and automation in PM",
    schedule: "Bi-weekly",
    lastSent: d(5),
    channels: ["slack", "in_app"],
    coverGradient: "from-sky-500 to-blue-600",
    markdown: `## AI Productivity Landscape — May 2026

### Market signals
- HN viral post on AI agents replacing standups — 400+ comments
- 4 new AI PM copilots on Product Hunt this week
- Asana and Linear both doubling down on "AI teammate" positioning

### Implications for us
- Buyers expect AI to be **bundled**, not add-on priced
- Autonomous agents for status/blockers becoming table stakes
- Compliance story still weak among startups — our enterprise trust is a moat`,
    citations: [
      { id: "bc5", sourceId: "src-10", sourceName: "HN Algolia — AI agents", sourceType: "feed", excerpt: "AI agents replaced our standup" },
      { id: "bc6", sourceId: "src-9", sourceName: "Product Hunt — AI tools feed", sourceType: "feed", excerpt: "4 new AI PM copilots launched" },
    ],
  },
];

export function getBriefById(id: string) {
  return briefs.find((b) => b.id === id);
}
