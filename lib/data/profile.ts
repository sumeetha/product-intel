export interface ProfileActivity {
  label: string;
  value: string;
  hint?: string;
}

export interface UserProfile {
  name: string;
  initials: string;
  role: string;
  team: string;
  email: string;
  timezone: string;
  location: string;
  workspace: string;
  workspacePlan: string;
  joinedAt: string;
  activity: ProfileActivity[];
}

export const userProfile: UserProfile = {
  name: "Alex Morgan",
  initials: "AM",
  role: "Senior Product Manager",
  team: "Assessments & CodePair",
  email: "alex.morgan@hackerrank.com",
  timezone: "America/Los_Angeles (UTC−7)",
  location: "San Francisco, CA",
  workspace: "HackerRank · Product Intel",
  workspacePlan: "Enterprise · 24 seats",
  joinedAt: new Date(Date.now() - 142 * 86400000).toISOString(),
  activity: [
    { label: "Subscriptions", value: "8", hint: "4 competitors · 2 segments · 2 topics" },
    { label: "Sources connected", value: "25", hint: "synced across 5 source types" },
    { label: "Briefs received", value: "23", hint: "last 30 days" },
    { label: "Ask threads", value: "37", hint: "avg. 2.4 follow-ups per thread" },
  ],
};
