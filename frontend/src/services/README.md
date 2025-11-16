# frontend/src/services Directory

## Purpose
Service layer for contract calls, REST/GraphQL APIs, and analytics endpoints.

## How to Use
Encapsulate viem/ethers clients, leaderboard fetchers, and metadata readers.

## Naming Conventions
mainHubService.ts, leaderboardService.ts.

## Coding Rules
Return promises/observables and avoid direct React imports.

## Scaling Notes
Single service per domain keeps logic shareable across hooks/pages.

## Security Notes
Validate responses, catch RPC errors, and respect rate limits.

## Codex/Cursor Automation
Codex updates service endpoints when manifest or integration configs change.

## Example
```ts
export async function fetchModules() { return registry.modules; }
```
