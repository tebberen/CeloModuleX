# integrations/helpers Directory

## Purpose
Shared utilities for integrations such as logging, retry logic, signing, and schema validation.

## How to Use
Import helper modules from partner-specific directories to avoid duplication.

## Naming Conventions
integrationLogger.ts, apiClientFactory.ts.

## Coding Rules
Write composable TypeScript helpers with exhaustive typing and error handling.

## Scaling Notes
One helper update propagates to all partner packages.

## Security Notes
Centralize encryption/signing routines and enforce consistent telemetry.

## Codex/Cursor Automation
Integration scripts rely on these helpers when invoked by CI or Codex.

## Example
```ts
export const integrationLogger = createLogger('integrations');
```
