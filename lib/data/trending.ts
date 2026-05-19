import type { TrendingTopic } from "@/lib/types";

export const trendingTopics: TrendingTopic[] = [
  { id: "t1", label: "AI cheating detection", count: 38, change: 27, sparkline: [4, 7, 10, 15, 22, 30, 38] },
  { id: "t2", label: "CodeSignal Cosmo interviewer", count: 21, change: 19, sparkline: [2, 4, 6, 9, 13, 17, 21] },
  { id: "t3", label: "Workday & Greenhouse integrations", count: 14, change: -2, sparkline: [17, 16, 15, 14, 15, 14, 14] },
  { id: "t4", label: "Skills-based hiring at F500", count: 29, change: 24, sparkline: [4, 7, 11, 14, 19, 24, 29] },
  { id: "t5", label: "CoderPad VS Code Sandboxes", count: 11, change: 41, sparkline: [1, 2, 3, 4, 6, 9, 11] },
];
