# scripts/register Directory

## Purpose
Handles post-deployment registration of modules, metadata, and pricing within MainHub.

## How to Use
Run after deploy to call registerModule and update MODULE_REGISTRY.json.

## Naming Conventions
register-<moduleId>.ts or batch-register.ts.

## Coding Rules
Validate metadata, compute fees, and emit ModuleRegistered events per spec.

## Scaling Notes
Batch registration pipeline loops through metadata for 1000 modules with retries.

## Security Notes
Ensure module implementation is verified and not paused before registration.

## Codex/Cursor Automation
CI triggers register scripts once deployment success is confirmed via manifest.

## Example
```ts
await mainHub.registerModule(manifestEntry);
```
