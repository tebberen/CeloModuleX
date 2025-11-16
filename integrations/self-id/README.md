# integrations/self-id Directory

## Purpose
Self.ID / Ceramic DID adapters enabling decentralized identity verification.

## How to Use
Store connectors, schemas, and caching utilities used by identity modules.

## Naming Conventions
selfIdConnector.ts, did-schema.json.

## Coding Rules
Implement DID resolution, signature checks, and mapping to MainHub profiles.

## Scaling Notes
Allow verification for thousands of users by batching requests.

## Security Notes
Protect PII by hashing data and following privacy guidelines from docs.

## Codex/Cursor Automation
Nightly sync jobs leverage these helpers to refresh proofs.

## Example
```ts
export function resolveDID(did: string) { /* ... */ }
```
