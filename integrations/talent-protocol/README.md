# integrations/talent-protocol Directory

## Purpose
Adapters linking MainHub modules to Talent Protocol APIs and attestations.

## How to Use
Store API clients, ABI wrappers, and sample data for talent focused modules.

## Naming Conventions
talentClient.ts, talentConfig.json.

## Coding Rules
Follow integration spec for authentication, caching, and failure handling.

## Scaling Notes
Support multiple module versions referencing the same integration helpers.

## Security Notes
Mask API keys and encrypt secrets, referencing .env.example variables.

## Codex/Cursor Automation
Integration scripts read config here before executing module actions.

## Example
```ts
export async function fetchTalentProfile(handle: string) { /* ... */ }
```
