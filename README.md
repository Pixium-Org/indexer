# Pixium Stellar Event Indexer

Listens to Soroban contract events on the Stellar network and syncs on-chain game state into PostgreSQL and Redis.

---

## Overview

The indexer is the bridge between the Stellar blockchain and Pixium's off-chain databases. It subscribes to Soroban contract events (pixel placements, quest completions, votes, etc.), parses them, and writes the results to PostgreSQL for persistence and Redis for fast canvas state reads by the backend.

Without the indexer running, the backend cannot serve up-to-date canvas state or player stats.

---

## Tech Stack

- **Node.js + TypeScript** — runtime and language
- **Stellar SDK** — event streaming and ledger polling
- **PostgreSQL** — persistent store for all indexed game data
- **Redis** — canvas state cache (kept in sync with every pixel event)

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL
- Redis
- Access to a Stellar Horizon or RPC node (testnet or mainnet)

### Install

```bash
npm install
```

### Environment

```bash
cp .env.example .env
```

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pixium
REDIS_URL=redis://localhost:6379
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
CONTRACT_ID=<canvas_contract_address>
START_LEDGER=<ledger_to_start_indexing_from>
```

### Run

```bash
npm run start
```

### Run (Development with watch)

```bash
npm run dev
```

---

## Indexed Events

| Event | Source Contract | Action |
|---|---|---|
| `PixelPlaced` | `canvas` | Update pixel in PostgreSQL; update canvas byte array in Redis |
| `QuestCompleted` | `quests` | Update user quest stats in PostgreSQL |
| `FactionCreated` | `factions` | Insert new faction record |
| `VoteCast` | `votes` | Increment color vote tally |
| `RoundEnded` | `rounds` | Snapshot canvas state; reset round data |

---

## How It Works

```
Stellar Network (Soroban)
        │
        │  Contract Events (PixelPlaced, QuestCompleted, ...)
        ▼
    Indexer
    ├── Parse event payload
    ├── Write to PostgreSQL (persistent record)
    └── Update Redis (canvas state cache)
```

The indexer polls Soroban contract events from the Stellar RPC, starting from a configured ledger. It processes events in order and tracks its last processed ledger so it can resume after a restart without missing or duplicating events.

---

## Project Structure

```
indexer/
├── src/
│   ├── events/
│   │   ├── pixel-placed.ts     # Handle PixelPlaced events
│   │   ├── quest-completed.ts  # Handle QuestCompleted events
│   │   ├── faction-created.ts  # Handle FactionCreated events
│   │   ├── vote-cast.ts        # Handle VoteCast events
│   │   └── round-ended.ts      # Handle RoundEnded events
│   ├── db/
│   │   ├── postgres.ts         # PostgreSQL client and queries
│   │   └── redis.ts            # Redis client and canvas state helpers
│   ├── stellar/
│   │   └── listener.ts         # Stellar event polling / streaming
│   └── index.ts                # Entry point
├── .env.example
└── package.json
```

---

## Resumability

The indexer stores its last processed ledger in PostgreSQL. On restart, it picks up from where it left off — no events are missed or double-processed as long as the database is intact.

---

## Contributing

See the root [contributing guide](#). Run lint and format checks before submitting a PR.

```bash
npm run lint
npm run format
```

Branch format: `feature/<issue-number>-short-description`

---

## Related Repos

- [`onchain`](https://github.com/Pixium-Org/onchain) — Soroban smart contracts (event sources)
- [`backend`](https://github.com/Pixium-Org/backend) — reads the data the indexer writes
- [`frontend`](https://github.com/Pixium-Org/frontend) — Next.js player interface
