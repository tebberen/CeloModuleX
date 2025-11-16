# scripts/verification Directory

## Purpose
Scripts that verify contracts on explorers (CeloScan, Basescan, etc.).

## How to Use
Provide address, constructor args, and source path from manifest to verification CLI.

## Naming Conventions
verify-mainhub.ts, verify-module-batch.ts.

## Coding Rules
Use Hardhat/Foundry verify tasks and handle rate limits with retries.

## Scaling Notes
Batch verify dozens of contracts quickly by queueing requests.

## Security Notes
Store API keys in .env and do not echo to logs.

## Codex/Cursor Automation
CI job triggers verification once deployment is complete and confirmed.

## Example
```ts
await hre.run('verify:verify', { address, constructorArguments });
```
