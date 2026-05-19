export type SourceType = "web" | "document" | "feed" | "video" | "audio";
export type Importance = "high" | "medium" | "low";
export type SubscriptionType = "competitor" | "customer_segment" | "topic";
export type Cadence = "realtime" | "daily" | "weekly";
export type DeliveryChannel = "email" | "slack" | "in_app";
export type SourceStatus = "synced" | "syncing" | "error";

export interface Citation {
  id: string;
  sourceId: string;
  sourceName: string;
  sourceType: SourceType;
  excerpt: string;
  url?: string;
}

export interface Subscription {
  id: string;
  name: string;
  type: SubscriptionType;
  description: string;
  logoInitials: string;
  logoColor: string;
  sourceCount: number;
  cadence: Cadence;
  channels: DeliveryChannel[];
  lastUpdate: string;
  paused: boolean;
}

export interface Source {
  id: string;
  name: string;
  type: SourceType;
  subscriptionId: string;
  status: SourceStatus;
  lastSync: string;
  itemCount: number;
  url?: string;
}

export interface Update {
  id: string;
  subscriptionId: string;
  subscriptionName: string;
  headline: string;
  summary: string;
  importance: Importance;
  sourceType: SourceType;
  publishedAt: string;
  read: boolean;
  citations: Citation[];
  tags: string[];
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  timestamp: string;
}

export interface Thread {
  id: string;
  title: string;
  subscriptionScope?: string;
  updatedAt: string;
  messages: Message[];
}

export interface Brief {
  id: string;
  title: string;
  description: string;
  schedule: string;
  lastSent: string;
  channels: DeliveryChannel[];
  coverGradient: string;
  markdown: string;
  citations: Citation[];
}

export interface TrendingTopic {
  id: string;
  label: string;
  count: number;
  change: number;
  sparkline: number[];
}

export interface CannedAnswer {
  keywords: string[];
  answer: string;
  citations: Citation[];
}
