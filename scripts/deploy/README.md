# scripts/deploy Directory

## Purpose
Contains deployment entrypoints for MainHub, NFT passes, modules, and helpers per chain.

## How to Use
Name scripts deploy-<component>-<chain>.ts and load config from DEPLOY_MANIFEST.

## Naming Conventions
deploy-mainhub-celo.ts, deploy-premium-pass-base.ts.

## Coding Rules
Respect deployment order: libraries → core → NFT → modules → registry sync.

## Scaling Notes
Supports batch deployment of hundreds of modules using manifest loops.

## Security Notes
Check bytecode hash before broadcasting and wait for confirmations.

## Codex/Cursor Automation
Ops bots run these scripts automatically from CI or release runners.

## Example
```ts
await mainHubFactory.deploy(chainConfig.args);
```
