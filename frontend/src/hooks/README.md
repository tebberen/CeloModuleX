# frontend/src/hooks Directory

## Purpose
Custom hooks managing wallet connections, MainHub stats, NFT access, leaderboard polling.

## How to Use
Wrap viem/wagmi calls and expose typed responses with loading/error states.

## Naming Conventions
useMainHubStats.ts, useExecuteModule.ts.

## Coding Rules
Never mutate global state outside React context and memoize contract instances.

## Scaling Notes
Hook per domain keeps responsibilities clear when modules multiply.

## Security Notes
Handle chain switching, revert reasons, and signature prompts securely.

## Codex/Cursor Automation
Codegen can output typed hooks per ABI within this directory.

## Example
```ts
export function useModuleExecution(moduleId: string) { /* ... */ }
```
