# scripts Directory

## Purpose
Automation scripts handling deployment, registration, upgrades, and verification.

## How to Use
Write TypeScript/Foundry scripts that read manifests and broadcast transactions deterministically.

## Naming Conventions
kebab-case filenames like deploy-mainhub.ts, register-module.ts.

## Coding Rules
Use async/await, typed config, and manifest driven parameters per deployment guide.

## Scaling Notes
Loop over manifest arrays to process 50-500 modules per run.

## Security Notes
Prompt for confirmations, use multisig signers, and never log secrets.

## Codex/Cursor Automation
CI/CD jobs call these scripts via pnpm or forge script commands.

## Example
```ts
await deploy("MainHub", args);
```
