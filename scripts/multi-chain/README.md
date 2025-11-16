# scripts/multi-chain Directory

## Purpose
Automation for orchestrating deployments across Celo, Base, Jello, or future networks.

## How to Use
Scripts iterate over chain configs defined in integration-config.json and call deploy/register helpers.

## Naming Conventions
multi-chain-sync.ts, bridge-modules.ts.

## Coding Rules
Respect per-chain gas strategies and environment variables described in deployment guide.

## Scaling Notes
Easily extend to new networks by adding config entries without rewriting logic.

## Security Notes
Include chain-specific safety checks (finality, confirmations, pausing).

## Codex/Cursor Automation
Nightly jobs run these scripts to keep multi-chain states aligned.

## Example
```ts
for (const chain of chains) { await deployChain(chain); }
```
