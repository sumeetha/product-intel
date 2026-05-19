import type { CannedAnswer, Citation } from "@/lib/types";

const cannedAnswers: CannedAnswer[] = [
  {
    keywords: ["linear", "ship", "month", "changelog"],
    answer:
      "This month Linear shipped three notable updates:\n\n1. **AI Triage** — automatic labeling, duplicate detection, and suggested assignees.\n2. **API v2 bulk operations** — batch create/update/archive for up to 100 issues.\n3. **Cycle automation improvements** — smarter rollover for incomplete work.\n\nAI Triage is the highest-signal competitive move.",
    citations: [
      { id: "fa1", sourceId: "src-2", sourceName: "Linear Changelog RSS", sourceType: "feed", excerpt: "AI Triage automatically routes issues based on historical patterns.", url: "https://linear.app/changelog" },
    ],
  },
  {
    keywords: ["onboarding", "complaint", "customer", "friction"],
    answer:
      "Top onboarding complaints this quarter:\n\n1. **Team invite failures** — 42% ticket spike; IT-gated domains block email invites.\n2. **Integration step confusion** — 38% drop-off at connect-integrations step.\n3. **Slow time-to-value** — enterprise NPS cites 3+ days vs competitors' templates.\n\nPriority fix: SSO-aware invites and optional integration skip.",
    citations: [
      { id: "fa2", sourceId: "src-16", sourceName: "Intercom — onboarding tags", sourceType: "feed", excerpt: "Can't invite colleagues — pending but never receive email." },
      { id: "fa3", sourceId: "src-25", sourceName: "Setup wizard screen recordings", sourceType: "video", excerpt: "User abandons at integration step without connecting tools." },
    ],
  },
  {
    keywords: ["notion", "pricing", "ai"],
    answer:
      "Notion removed AI usage caps on Business and Enterprise (was 20/member/month). They're bundling unlimited AI to compete with Microsoft Copilot.\n\nOur $10/user AI add-on with 50-query Pro cap is vulnerable — enterprise Gong calls already mention this as renewal risk.",
    citations: [
      { id: "fa4", sourceId: "src-1", sourceName: "notion.so/blog", sourceType: "web", excerpt: "Removing AI usage caps on Business and Enterprise.", url: "https://notion.so/blog" },
    ],
  },
  {
    keywords: ["churn", "smb", "cancel"],
    answer:
      "SMB churn drivers this month:\n\n- **Price** cited in 12/15 cancellation surveys — 'too expensive for team size'\n- **ClickUp free tier** mentioned as primary switch destination\n- Feature gaps rarely the primary reason — value-per-dollar is the narrative",
    citations: [
      { id: "fa5", sourceId: "src-14", sourceName: "Cancellation survey CSV", sourceType: "document", excerpt: "ClickUp free plan covers our 8-person team." },
    ],
  },
  {
    keywords: ["enterprise", "win", "loss", "linear"],
    answer:
      "Recent enterprise win/loss themes:\n\n- **Losses to Linear**: keyboard UX, sub-100ms interactions, 'feels instant'\n- **Our strengths**: reporting, portfolio views, migration path (when pitched)\n- **Risk**: Notion AI bundling on renewals",
    citations: [
      { id: "fa6", sourceId: "src-6", sourceName: "Gong — Enterprise QBR calls", sourceType: "audio", excerpt: "Switched because Linear felt instant — our board loads were slow." },
      { id: "fa7", sourceId: "src-24", sourceName: "Win/loss interview notes", sourceType: "document", excerpt: "Reporting rollup was deciding factor in our favor vs Linear." },
    ],
  },
];

const defaultAnswer = {
  answer:
    "Based on your connected sources, here's what I found:\n\nThere are **3 high-signal updates** today across Linear, Notion, and enterprise customer voice. Linear's AI Triage and Notion's unlimited AI bundling are the top competitive moves. On the customer side, onboarding invite failures spiked 42%.\n\nTry asking about a specific competitor, customer segment, or topic for a deeper answer.",
  citations: [
    { id: "fd1", sourceId: "src-2", sourceName: "Linear Changelog RSS", sourceType: "feed", excerpt: "AI Triage launch" },
    { id: "fd2", sourceId: "src-1", sourceName: "notion.so/blog", sourceType: "web", excerpt: "Unlimited AI on Business tier" },
    { id: "fd3", sourceId: "src-16", sourceName: "Intercom — onboarding tags", sourceType: "feed", excerpt: "Invite flow tickets up 42%" },
  ] as Citation[],
};

export function matchAnswer(query: string): { answer: string; citations: Citation[] } {
  const lower = query.toLowerCase();
  for (const canned of cannedAnswers) {
    if (canned.keywords.some((kw) => lower.includes(kw))) {
      return { answer: canned.answer, citations: canned.citations };
    }
  }
  return defaultAnswer;
}

export async function streamAnswer(
  query: string,
  onChunk: (text: string) => void,
  onComplete: (citations: Citation[]) => void
): Promise<void> {
  const { answer, citations } = matchAnswer(query);
  const delay = 12;
  for (let i = 0; i < answer.length; i++) {
    onChunk(answer[i]);
    await new Promise((r) => setTimeout(r, delay));
  }
  onComplete(citations);
}

export const suggestedPrompts = [
  "What did Linear ship this month?",
  "Top customer complaints about onboarding",
  "How does Notion's AI pricing compare to ours?",
  "Why are SMB customers churning?",
  "Summarize this week's competitive moves",
  "What are enterprise buyers saying about Linear?",
];
