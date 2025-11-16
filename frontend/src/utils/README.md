# frontend/src/utils Directory

## Purpose
Utility helpers for formatting values, computing scores, mapping categories, and storing constants.

## How to Use
Keep pure functions that can be unit tested easily.

## Naming Conventions
formatScore.ts, parseModuleId.ts.

## Coding Rules
No side effects; accept parameters and return derived values only.

## Scaling Notes
Shared utilities reduce duplication in 1000-module UI.

## Security Notes
Guard against injection when formatting HTML or URLs.

## Codex/Cursor Automation
Score formulas updated here automatically when docs change.

## Example
```ts
export const formatScore = (value: number) => value.toLocaleString();
```
