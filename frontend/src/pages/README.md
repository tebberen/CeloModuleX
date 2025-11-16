# frontend/src/pages Directory

## Purpose
High-level route components like /modules, /leaderboard, /nft, /profile.

## How to Use
Implement Next.js pages or router entry components referencing services/hooks.

## Naming Conventions
modules.tsx, leaderboard.tsx, nft.tsx.

## Coding Rules
Keep logic declarative and fetch data via hooks/services to preserve SSR compatibility.

## Scaling Notes
Add dynamic [moduleId].tsx pages generated from registry data.

## Security Notes
Gate admin pages by AccessControl roles checked via on-chain calls.

## Codex/Cursor Automation
Cursor generates new module detail pages based on Module Registry entries.

## Example
```tsx
export default function LeaderboardPage() { return <LeaderboardView />; }
```
