import type { Brief } from "@/lib/types";

const d = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

export const briefs: Brief[] = [
  {
    id: "brief-1",
    title: "Weekly Competitor Brief",
    description: "CodeSignal, CoderPad, Codility, HackerEarth — product moves, pricing, and positioning",
    schedule: "Every Monday 8:00 AM",
    lastSent: d(2),
    channels: ["email", "slack"],
    coverGradient: "from-emerald-500 to-green-600",
    markdown: `## Weekly Competitor Brief — May 18, 2026

### Executive summary
High-signal week: CodeSignal's **Cosmo AI Interviewer GA** and CoderPad's **native VS Code Sandbox** are the two moves requiring immediate response. Codility is doubling down on "trust & integrity" positioning in EMEA.

### CodeSignal
- **Cosmo AI Interviewer** went GA — adaptive AI-led first rounds, structured scorecards
- Bundled Develop + Hire pricing cut **30%** for 500+ seat accounts (renewal cohort risk)
- Workday Recruiting integration deepened — two-way scorecards + SCIM

### CoderPad
- Shipped native **VS Code Sandbox** for live interviews (closes realism gap)
- Bulk candidate provisioning API ships — accelerates ATS partner integrations
- G2: leads on interviewer UX (4.7), trails on library depth (3.9 vs our 4.6)

### Codility
- CEO call: plagiarism + GenAI detection cited in **40% of EMEA wins**
- Repositioning around "signal integrity" — directly anchors on AI cheating narrative

### HackerEarth
- Pricing page scraping blocked — likely intentional. Last seen: aggressive $199/mo SMB bundle

### Recommended actions
1. Brief sales on Cosmo positioning vs CodePair (focus: library depth + analytics)
2. Pull forward the VS Code-in-CodePair spike (CoderPad parity)
3. Lock in roadmap commitments on GenAI detection for top 10 renewal accounts`,
    citations: [
      { id: "bc1", sourceId: "src-2", sourceName: "CodeSignal product changelog RSS", sourceType: "feed", excerpt: "Cosmo is now generally available." },
      { id: "bc2", sourceId: "src-23", sourceName: "CoderPad docs — API & integrations", sourceType: "web", excerpt: "Live Sandboxes now boot a real VS Code workspace." },
      { id: "bc3", sourceId: "src-21", sourceName: "Codility press releases (RSS)", sourceType: "feed", excerpt: "Trust and integrity layer part of 40% of EMEA wins." },
    ],
  },
  {
    id: "brief-2",
    title: "Customer Voice — Q2",
    description: "Enterprise & recruiter themes from Gong, Zendesk, NPS, and survey data",
    schedule: "First of month",
    lastSent: d(18),
    channels: ["email"],
    coverGradient: "from-teal-500 to-cyan-600",
    markdown: `## Customer Voice — Q2 2026

### Top themes
1. **AI cheating detection** — top concern in 4 enterprise QBRs, 412-comment Reddit thread, 31 NPS verbatims
2. **Role-based assessment auto-builder** — 31 NPS mentions request "paste JD → assessment in one click"
3. **Reporting & analytics** — 18 recruiter-survey responses cite "can't slice results by role/cohort"

### Enterprise segment
- Renewal risk on 4 accounts pending GenAI detection roadmap commitment
- Win/loss: CoderPad's VS Code Sandbox cited in 2 senior-IC loss interviews
- Workday SCIM gap closed by CodeSignal — mentioned on 3 QBRs

### Recruiter segment
- Codility's new analytics layer referenced by name in surveys
- Greenhouse Marketplace reviews tilting on \"customer support response time\"
- Several teams have reverted to live-only screens to avoid AI detection issues

### Strategic implications
- Trust / signal-integrity is becoming the new battleground (was: question library)
- "AI to grade vs AI to detect" framing is open — we can own one or the other`,
    citations: [
      { id: "bc4", sourceId: "src-8", sourceName: "NPS verbatim dump Q2", sourceType: "document", excerpt: "Paste a JD, get a role-tuned assessment in one click." },
      { id: "bc5", sourceId: "src-14", sourceName: "Q2 recruiter survey (CSV)", sourceType: "document", excerpt: "Codility's new dashboards do this out of the box." },
      { id: "bc6", sourceId: "src-6", sourceName: "Gong — Enterprise QBR calls", sourceType: "audio", excerpt: "Can't justify renewing if candidates slip through with ChatGPT." },
    ],
  },
  {
    id: "brief-3",
    title: "GenAI in Technical Interviews",
    description: "Cross-source digest on AI cheating, proctoring tools, and skills-based hiring",
    schedule: "Bi-weekly",
    lastSent: d(5),
    channels: ["slack", "in_app"],
    coverGradient: "from-orange-500 to-rose-600",
    markdown: `## GenAI in Technical Interviews — May 2026

### Market signals
- Viral HN post on \"acing HackerRank with Cursor\" — 1.2k points, 412 comments
- 3 new AI-detector startups launched on Product Hunt (ProctorIQ, HonestyAI, ClearScreen)
- Codility doubling down on **\"signal integrity\"** as brand pillar
- JPMorgan drops degree requirements for 60% of engineering roles — names \"verified skills assessments\" as replacement

### Implications for HackerRank
- **Detection** is the new buying criterion in enterprise — not library size
- Smaller AI-detector startups are likely acquisition targets within 12 months
- Skills-based hiring tailwind plays well for **Skills Certifications** — under-marketed today
- Live-coding share-of-screen is rising as teams hedge against AI cheating — opportunity for CodePair if we close the VS Code gap

### Recommended narrative
"AI-assisted interviewing without AI-assisted cheating" — a positioning hook that combines our Cosmo-equivalent + first-class detection.`,
    citations: [
      { id: "bc7", sourceId: "src-10", sourceName: "HN Algolia — \"AI cheating coding interview\"", sourceType: "feed", excerpt: "Cursor + a clean keyboard cadence got me through every screen." },
      { id: "bc8", sourceId: "src-9", sourceName: "Product Hunt — proctoring & AI-detector feed", sourceType: "feed", excerpt: "3 new AI-detector startups launched this week." },
      { id: "bc9", sourceId: "src-17", sourceName: "WSJ / TechCrunch — \"skills-based hiring\" feed", sourceType: "feed", excerpt: "JPMorgan will use verified skills assessments in place of degree screening." },
    ],
  },
];

export function getBriefById(id: string) {
  return briefs.find((b) => b.id === id);
}
