# frontend Directory

## Purpose
Complete frontend application implementing modules page, NFT minting, leaderboard, and admin consoles.

## How to Use
Contains Next.js/React code, assets, env configuration, and build scripts.

## Naming Conventions
Directories use kebab-case; components use PascalCase; hooks use camelCase.

## Coding Rules
Follow frontend architecture spec with hooks/services separation and typed APIs.

## Scaling Notes
Dynamic module rendering allows UI to scale beyond 1000 modules.

## Security Notes
Never store secrets; use wallet providers for signing and sanitize metadata.

## Codex/Cursor Automation
Cursor can generate pages/components based on module metadata and ABIs stored here.

## Example
```tsx
export function ModulesPage() { return <ModuleGrid />; }
```
