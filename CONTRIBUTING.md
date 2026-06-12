# Contributing to `indexer`

This repo contains the Stellar event indexer for Pixium — it listens to Soroban contract events and syncs on-chain state into PostgreSQL and Redis.

For general contribution guidelines (branching, commits, code of conduct), see the [org-level contributing guide](https://github.com/Pixium-Org/.github/blob/main/CONTRIBUTING.md).

---

## Prerequisites

- Node.js 20+
- PostgreSQL
- Redis
- Access to a Stellar RPC node (testnet or mainnet)

---

## Setup

```bash
git clone https://github.com/Pixium-Org/indexer.git
cd indexer
npm install
```

Copy the example env file and fill in your values:

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

---

## Running Locally

```bash
# Development (with watch)
npm run dev

# Production
npm run build
npm run start
```

---

## Running Tests

```bash
npm run test
```

---

## Code Style

All PRs must pass lint and format checks:

```bash
npm run lint
npm run format
```

---

## Submitting a PR

1. Fork the repo and create a branch: `feature/<issue-number>-short-description`
2. Make your changes and ensure tests pass
3. Run `npm run lint` and `npm run format`
4. Open a PR targeting the `dev` branch
5. Fill in the PR template and link the issue

---

## Resources

- [Soroban Events Documentation](https://soroban.stellar.org/docs/fundamentals-and-concepts/events)
- [Stellar SDK (JavaScript)](https://stellar.github.io/js-stellar-sdk/)
- [Stellar RPC Reference](https://developers.stellar.org/docs/data/rpc)
