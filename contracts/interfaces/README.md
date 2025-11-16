# contracts/interfaces Directory

## Purpose
Interfaces for MainHub, modules, NFT passes, integrations, and helpers.

## How to Use
Define canonical ABI for executeModule, stats hooks, NFT access, and registry interactions.

## Naming Conventions
Prefix files with I such as IMainHub.sol, IModule.sol.

## Coding Rules
Expose external function signatures only and include events when required by spec.

## Scaling Notes
Stable interfaces allow modules and clients to stay compatible across upgrades.

## Security Notes
Interfaces act as source of truth for audits and third-party integrations.

## Codex/Cursor Automation
Cursor generates TypeScript typings directly from interfaces placed here.

## Example
```solidity
interface IModule { function execute(bytes calldata data) external returns (bytes memory); }
```
