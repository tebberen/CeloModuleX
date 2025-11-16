# scripts/helpers Directory

## Purpose
Shared utilities for reading manifests, formatting logs, loading ABIs, and prompting signers.

## How to Use
Import helper functions from deployment/registration/verification scripts.

## Naming Conventions
manifest-loader.ts, signer-utils.ts.

## Coding Rules
Write pure, well-typed functions returning deterministic data.

## Scaling Notes
Single helper source reduces duplication across hundreds of scripts.

## Security Notes
Validate file signatures and enforce checksum on addresses before usage.

## Codex/Cursor Automation
Codex CLI depends on these helpers to orchestrate module deployment flows.

## Example
```ts
export function loadManifest(path: string) { return JSON.parse(fs.readFileSync(path,'utf8')); }
```
