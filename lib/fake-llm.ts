import type { CannedAnswer, Citation } from "@/lib/types";

const cannedAnswers: CannedAnswer[] = [
  {
    keywords: ["codesignal", "ship", "month", "cosmo"],
    answer:
      "CodeSignal shipped three notable updates this month:\n\n1. **Cosmo AI Interviewer (GA)** — adaptive, AI-led first-round interviews with structured scorecards.\n2. **Workday Recruiting integration deepened** — two-way scorecards, role mapping, and SCIM.\n3. **Bundled Develop + Hire pricing cut 30%** for 500+ seat accounts.\n\nCosmo is the highest-signal move — it reframes AI from a feature into the interviewer itself.",
    citations: [
      { id: "fa1", sourceId: "src-2", sourceName: "CodeSignal product changelog RSS", sourceType: "feed", excerpt: "Cosmo is now generally available — conduct AI-led interviews with adaptive follow-up.", url: "https://codesignal.com/blog" },
    ],
  },
  {
    keywords: ["ai cheating", "cheating", "chatgpt", "cursor", "copilot", "proctoring"],
    answer:
      "AI cheating is the **#1 topic** across recruiter-voice and enterprise-QBR sources this quarter:\n\n1. **Detection trust collapsed** — recruiters say HackerRank and CodeSignal both fail to flag obvious Cursor/Copilot use.\n2. **Renewal risk** — 4 enterprise QBRs paused expansion pending a GenAI-detection roadmap commitment.\n3. **Community noise** — viral HN post (1.2k points) on \"acing HackerRank with Cursor\" being shared in recruiter Slack channels.\n\nThe gap is **signal integrity** (keystroke cadence, paste-burst, intent prompts), not feature parity.",
    citations: [
      { id: "fa2", sourceId: "src-10", sourceName: "HN Algolia — \"AI cheating coding interview\"", sourceType: "feed", excerpt: "Cursor + a clean keyboard cadence got me through every proctored screen." },
      { id: "fa3", sourceId: "src-6", sourceName: "Gong — Enterprise QBR calls", sourceType: "audio", excerpt: "Can't justify renewing if candidates are still slipping through with ChatGPT." },
    ],
  },
  {
    keywords: ["coderpad", "vs code", "ide", "sandbox", "live coding"],
    answer:
      "CoderPad just shipped a **native VS Code Sandbox** for live interviews — real workspace, extensions, Git. This closes a long-standing realism gap for senior IC interviews and shows up in 2 recent loss interviews.\n\nWe still win on **question library depth** (G2: 4.6 vs 3.9) and bundled scoring/analytics. We lose on **interviewer experience** (G2: 4.3 vs 4.7) and \"feels like real engineering work\".\n\nRecommended counter: pull forward VS Code-in-CodePair and brief sales on library + analytics differentiator.",
    citations: [
      { id: "fa4", sourceId: "src-23", sourceName: "CoderPad docs — API & integrations", sourceType: "web", excerpt: "Live Sandboxes now boot a real VS Code workspace per candidate.", url: "https://coderpad.io/docs" },
      { id: "fa5", sourceId: "src-3", sourceName: "G2 — CoderPad Reviews (PDF export)", sourceType: "document", excerpt: "Smoothest live coding I've run, but their question bank is thin." },
    ],
  },
  {
    keywords: ["codility", "trust", "signal", "integrity", "emea"],
    answer:
      "Codility is repositioning around \"signal integrity\" — plagiarism + GenAI detection. CEO cited it as part of **40% of EMEA enterprise upsell** conversations on the last investor update.\n\nThis directly attacks the same renewal cohort flagging AI cheating to us. If we don't move first, Codility will own the \"trustworthy assessments\" narrative in EMEA by end of FY.",
    citations: [
      { id: "fa6", sourceId: "src-21", sourceName: "Codility press releases (RSS)", sourceType: "feed", excerpt: "Trust and integrity layer part of 40% of EMEA enterprise wins.", url: "https://codility.com/press" },
    ],
  },
  {
    keywords: ["recruiter", "ta", "report", "analytics", "survey"],
    answer:
      "Top recruiter pain points from the Q2 survey and Greenhouse Marketplace reviews:\n\n- **Reporting / analytics**: 18 responses cite \"can't slice results by role / cohort / quarter\" — Codility called out by name as having shipped this\n- **Auto-built role assessments**: paste-JD → assessment is the most-requested feature (also #1 in NPS verbatims)\n- **Live-only fallback**: several teams have reverted to live screens to dodge AI-cheating concerns",
    citations: [
      { id: "fa7", sourceId: "src-14", sourceName: "Q2 recruiter survey (CSV)", sourceType: "document", excerpt: "Codility's new dashboards do this out of the box." },
      { id: "fa8", sourceId: "src-15", sourceName: "Reddit r/recruiting & r/cscareerquestions", sourceType: "feed", excerpt: "We dropped HackerRank screens entirely — went back to live CoderPad sessions." },
    ],
  },
  {
    keywords: ["skills-based", "skills based", "degree", "certification", "jpmorgan"],
    answer:
      "Skills-based hiring is accelerating at the F500 tier:\n\n- **JPMorgan** dropped 4-year degree requirements for 60% of engineering roles — citing \"verified skills assessments\" as the replacement signal\n- LinkedIn Talent Insights shows broader Fortune 500 drift in the same direction\n- This is an under-marketed tailwind for **HackerRank Skills Certifications**\n\nRecommended: feature Certifications in the enterprise narrative and target HR analytics teams (not just TA) in outbound.",
    citations: [
      { id: "fa9", sourceId: "src-17", sourceName: "WSJ / TechCrunch — \"skills-based hiring\" feed", sourceType: "feed", excerpt: "JPMorgan will use verified skills assessments in place of degree screening." },
      { id: "fa10", sourceId: "src-25", sourceName: "LinkedIn Talent Insights — skills-graph signals", sourceType: "feed", excerpt: "Broader F500 movement away from degree-gated engineering roles." },
    ],
  },
  {
    keywords: ["enterprise", "win", "loss", "renewal"],
    answer:
      "Recent enterprise win/loss themes:\n\n- **Losses to CoderPad**: VS Code Sandbox cited in 2 senior-IC loop losses\n- **Losses to CodeSignal**: Workday SCIM gap closed before ours did\n- **Wins for us**: question-library depth, bundled scoring + analytics, Skills Certifications\n- **Renewal risk**: 4 accounts on hold pending GenAI-detection roadmap commitment in writing",
    citations: [
      { id: "fa11", sourceId: "src-24", sourceName: "Enterprise win/loss interview notes", sourceType: "document", excerpt: "Their VS Code sandbox sealed it for our senior backend loop." },
      { id: "fa12", sourceId: "src-6", sourceName: "Gong — Enterprise QBR calls", sourceType: "audio", excerpt: "Need a written commitment on GenAI detection before we expand." },
    ],
  },
];

const defaultAnswer = {
  answer:
    "Based on your connected sources, here's what I found:\n\nThere are **3 high-signal updates** today across CodeSignal, AI-cheating sentiment, and enterprise customer voice. CodeSignal's Cosmo AI Interviewer GA and CoderPad's VS Code Sandbox are the top competitive moves. On the customer side, AI cheating is the #1 concern in 4 enterprise QBRs this week.\n\nTry asking about a specific competitor (CodeSignal, CoderPad, Codility, HackerEarth), customer segment, or topic like \"AI cheating\" or \"skills-based hiring\" for a deeper answer.",
  citations: [
    { id: "fd1", sourceId: "src-2", sourceName: "CodeSignal product changelog RSS", sourceType: "feed", excerpt: "Cosmo AI Interviewer GA" },
    { id: "fd2", sourceId: "src-23", sourceName: "CoderPad docs — API & integrations", sourceType: "web", excerpt: "Native VS Code Sandbox for live interviews" },
    { id: "fd3", sourceId: "src-6", sourceName: "Gong — Enterprise QBR calls", sourceType: "audio", excerpt: "GenAI detection cited in 4 of last week's QBRs" },
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
  "What did CodeSignal ship this month?",
  "What are recruiters saying about AI cheating?",
  "How does CoderPad's VS Code Sandbox compare to CodePair?",
  "Why are enterprise renewals stalling?",
  "Summarize this week's competitive moves",
  "How is skills-based hiring trending at F500 companies?",
];
