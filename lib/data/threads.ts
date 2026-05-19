import type { Thread } from "@/lib/types";

const h = (hours: number) => new Date(Date.now() - hours * 3600000).toISOString();

export const threads: Thread[] = [
  {
    id: "thread-1",
    title: "What did CodeSignal ship this month?",
    subscriptionScope: "sub-codesignal",
    updatedAt: h(2),
    messages: [
      {
        id: "m1",
        role: "user",
        content: "What did CodeSignal ship this month?",
        timestamp: h(2.1),
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "CodeSignal shipped three notable updates this month:\n\n1. **Cosmo AI Interviewer (GA)** — adaptive, AI-led first-round interviews with structured scorecards.\n2. **Workday Recruiting deepened integration** — two-way scorecards, role-to-assessment mapping, and SCIM.\n3. **Bundled Develop + Hire pricing cut 30%** for accounts with 500+ technical seats.\n\nCosmo is the highest-signal move — it reframes AI from a feature to the interviewer itself and directly pressures our CodePair positioning. The pricing cut also targets our enterprise renewal cohort.",
        citations: [
          { id: "tc1", sourceId: "src-2", sourceName: "CodeSignal product changelog RSS", sourceType: "feed", excerpt: "Cosmo is now generally available — conduct AI-led interviews with adaptive follow-up questions.", url: "https://codesignal.com/blog" },
          { id: "tc2", sourceId: "src-1", sourceName: "codesignal.com/blog", sourceType: "web", excerpt: "Bundled Develop + Hire pricing is now 30% lower for organizations with 500+ technical seats.", url: "https://codesignal.com/blog" },
        ],
        timestamp: h(2),
      },
    ],
  },
  {
    id: "thread-2",
    title: "What are recruiters saying about AI cheating?",
    subscriptionScope: "sub-ai-cheating",
    updatedAt: h(5),
    messages: [
      {
        id: "m3",
        role: "user",
        content: "What are recruiters saying about AI cheating on coding assessments?",
        timestamp: h(5.2),
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "AI cheating is now the **#1 topic** in your recruiter-voice and enterprise-QBR sources this quarter. Three themes:\n\n1. **Detection trust collapsed** — recruiters say HackerRank and CodeSignal both fail to flag obvious Cursor/Copilot usage; some teams have reverted to live-only screens.\n2. **Renewal risk** — 4 enterprise QBRs last week paused expansion pending a written roadmap commitment on GenAI detection.\n3. **Community noise** — viral HN post (1.2k points) on \"acing HackerRank with Cursor\" is being shared in recruiter Slack channels.\n\nThe gap recruiters describe is signal integrity, not feature parity — keystroke cadence, paste-burst, and intent prompts are what they expect from us.",
        citations: [
          { id: "tc3", sourceId: "src-10", sourceName: "HN Algolia — \"AI cheating coding interview\"", sourceType: "feed", excerpt: "Cursor + a clean keyboard cadence got me through every proctored screen I sat last month." },
          { id: "tc4", sourceId: "src-6", sourceName: "Gong — Enterprise QBR calls", sourceType: "audio", excerpt: "We can't justify renewing if candidates are still slipping through with ChatGPT." },
          { id: "tc5", sourceId: "src-15", sourceName: "Reddit r/recruiting & r/cscareerquestions", sourceType: "feed", excerpt: "We dropped HackerRank screens entirely — went back to live CoderPad sessions." },
        ],
        timestamp: h(5),
      },
    ],
  },
  {
    id: "thread-3",
    title: "How does CoderPad's IDE compare to CodePair?",
    updatedAt: h(24),
    messages: [
      {
        id: "m5",
        role: "user",
        content: "How does CoderPad's new VS Code experience compare to our CodePair?",
        timestamp: h(24.2),
      },
      {
        id: "m6",
        role: "assistant",
        content:
          "CoderPad just shipped a **native VS Code Sandbox** for live interviews — candidates get a real workspace with extensions and Git inside the interview. This closes a long-standing realism gap and is being cited in two enterprise win/loss interviews this month.\n\nOur CodePair still wins on:\n- **Question library depth** — G2 shows 4.6 vs CoderPad's 3.9 on \"assessment library\"\n- **Bundled scoring & analytics** — CoderPad asks teams to bolt on reporting\n\nWe lose on:\n- **\"Feels like real engineering work\"** — VS Code + extensions is a strong narrative for senior IC interviews\n- **G2 interviewer experience** — CoderPad 4.7 vs our 4.3\n\nRecommended counter: prioritize the VS Code-in-CodePair spike on the platform roadmap and brief sales on the library + analytics differentiator.",
        citations: [
          { id: "tc6", sourceId: "src-23", sourceName: "CoderPad docs — API & integrations", sourceType: "web", excerpt: "Live Sandboxes now boot a real VS Code workspace per candidate with extensions and Git.", url: "https://coderpad.io/docs" },
          { id: "tc7", sourceId: "src-3", sourceName: "G2 — CoderPad Reviews (PDF export)", sourceType: "document", excerpt: "Smoothest live coding I've run, but their question bank is thin — we still license HackerRank for screens." },
          { id: "tc8", sourceId: "src-24", sourceName: "Enterprise win/loss interview notes", sourceType: "document", excerpt: "Their VS Code sandbox sealed it for our senior backend loop." },
        ],
        timestamp: h(24),
      },
    ],
  },
];

export function getThreadById(id: string) {
  return threads.find((t) => t.id === id);
}
