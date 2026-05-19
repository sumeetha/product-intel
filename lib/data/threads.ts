import type { Thread } from "@/lib/types";

const h = (hours: number) => new Date(Date.now() - hours * 3600000).toISOString();

export const threads: Thread[] = [
  {
    id: "thread-1",
    title: "What did Linear ship this month?",
    subscriptionScope: "sub-linear",
    updatedAt: h(2),
    messages: [
      {
        id: "m1",
        role: "user",
        content: "What did Linear ship this month?",
        timestamp: h(2.1),
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "This month Linear shipped three notable updates:\n\n1. **AI Triage** — automatic labeling, duplicate detection, and suggested assignees for incoming issues.\n2. **API v2 bulk operations** — batch create/update/archive for up to 100 issues per request.\n3. **Cycle automation improvements** — smarter rollover rules for incomplete work.\n\nThe AI Triage launch is the highest-signal change for competitive positioning — it moves Linear toward autonomous workflow management.",
        citations: [
          { id: "tc1", sourceId: "src-2", sourceName: "Linear Changelog RSS", sourceType: "feed", excerpt: "AI Triage automatically routes issues based on historical patterns.", url: "https://linear.app/changelog" },
          { id: "tc2", sourceId: "src-23", sourceName: "Linear docs — API reference", sourceType: "web", excerpt: "Bulk operations support up to 100 issues per request.", url: "https://linear.app/docs/api" },
        ],
        timestamp: h(2),
      },
    ],
  },
  {
    id: "thread-2",
    title: "Top customer complaints about onboarding",
    subscriptionScope: "sub-onboarding",
    updatedAt: h(5),
    messages: [
      {
        id: "m3",
        role: "user",
        content: "What are the top customer complaints about onboarding?",
        timestamp: h(5.2),
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "The top onboarding complaints this quarter are:\n\n1. **Team invite failures** (42% ticket spike) — IT-gated domains don't receive invite emails; users expect Google Workspace auto-provisioning.\n2. **Integration step confusion** (38% wizard drop-off) — unclear which integrations are required vs optional at setup.\n3. **Time-to-first-value** — enterprise NPS cites 3+ days before teams see value vs competitors' guided templates.\n\nRecommended focus: fix invite flow for SSO domains and add a 'skip for now' path on integrations.",
        citations: [
          { id: "tc3", sourceId: "src-16", sourceName: "Intercom — onboarding tags", sourceType: "feed", excerpt: "Can't invite colleagues — says pending but they never get email." },
          { id: "tc4", sourceId: "src-25", sourceName: "Setup wizard screen recordings", sourceType: "video", excerpt: "User hovers over Slack, Jira, GitHub — closes tab without connecting any." },
        ],
        timestamp: h(5),
      },
    ],
  },
  {
    id: "thread-3",
    title: "Notion vs us on AI pricing",
    updatedAt: h(24),
    messages: [
      {
        id: "m5",
        role: "user",
        content: "How does Notion's AI pricing compare to ours?",
        timestamp: h(24.2),
      },
      {
        id: "m6",
        role: "assistant",
        content:
          "Notion recently removed AI usage caps on Business and Enterprise plans (previously 20 responses/member/month). This is a significant competitive move — they're bundling unlimited AI to counter Microsoft Copilot.\n\nOur current model charges $10/user/mo as an add-on with a 50-query cap on Pro. Enterprise buyers in Gong calls have mentioned Notion's bundling as a renewal risk.\n\nConsider: matching unlimited AI on Business tier or repositioning AI as core platform value.",
        citations: [
          { id: "tc5", sourceId: "src-1", sourceName: "notion.so/blog", sourceType: "web", excerpt: "Removing AI usage caps on Business and Enterprise plans.", url: "https://notion.so/blog" },
          { id: "tc6", sourceId: "src-6", sourceName: "Gong — Enterprise QBR calls", sourceType: "audio", excerpt: "Notion threw in unlimited AI — hard to justify your per-seat AI add-on." },
        ],
        timestamp: h(24),
      },
    ],
  },
];

export function getThreadById(id: string) {
  return threads.find((t) => t.id === id);
}
