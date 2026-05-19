# Product Intel — Design Prototype

A clickable Next.js prototype for product managers to subscribe to competitive and customer intelligence, query updates proactively, and connect knowledge sources.

**This is a UI prototype with dummy data.** No backend, auth, or real LLM calls.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Intelligence inbox — updates feed, trending, brief preview |
| `/ask` | Proactive Q&A with simulated streaming and citations |
| `/subscriptions` | Competitors, customer segments, topics |
| `/sources` | Web, documents, feeds, video, audio connectors |
| `/briefs` | Scheduled digests |
| `/profile` | Identity, workspace, and intelligence activity (avatar menu, top-right) |
| `/settings` | Notification channels, defaults, theme |

## Keyboard shortcut

- **Ctrl+K** (Cmd+K on Mac) — focus the global ask/search bar

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn-style UI primitives
- next-themes, recharts, react-markdown

## Future backend seams

- `lib/data/*` → API client modules
- `lib/fake-llm.ts` → RAG / chat endpoint
