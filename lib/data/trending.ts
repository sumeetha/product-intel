import type { TrendingTopic } from "@/lib/types";

export const trendingTopics: TrendingTopic[] = [
  { id: "t1", label: "AI agents in PM tools", count: 24, change: 18, sparkline: [3, 5, 4, 8, 12, 18, 24] },
  { id: "t2", label: "Linear cycle automation", count: 17, change: 12, sparkline: [2, 4, 6, 8, 10, 14, 17] },
  { id: "t3", label: "Enterprise SSO requests", count: 14, change: -3, sparkline: [18, 16, 15, 14, 15, 14, 14] },
  { id: "t4", label: "Onboarding time-to-value", count: 31, change: 22, sparkline: [5, 8, 12, 15, 20, 26, 31] },
  { id: "t5", label: "Notion pricing changes", count: 9, change: 45, sparkline: [1, 2, 2, 3, 5, 7, 9] },
];
