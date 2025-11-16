# frontend/src/constants Directory

## Purpose
Generated constants for addresses, chain IDs, module groups, and feature flags.

## How to Use
Sync from MODULE_REGISTRY.json, DEPLOY_MANIFEST.json, and integration-config.json.

## Naming Conventions
SCREAMING_SNAKE_CASE exports like MAIN_HUB_ADDRESS.

## Coding Rules
No logic; export readonly objects and tuples only.

## Scaling Notes
Support multi-chain deployments by namespacing by chain ID.

## Security Notes
Never store secrets or mnemonics in this folder.

## Codex/Cursor Automation
Scripts regenerate these constants after each deployment or registration.

## Example
```ts
export const MAIN_HUB_ADDRESS = { celo: '0x...', base: '0x...' };
```
