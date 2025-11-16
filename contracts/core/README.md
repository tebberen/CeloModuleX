# contracts/core Directory

## Purpose
Holds MainHub.sol and other foundational governance/registry contracts.

## How to Use
Limit to contracts shared by every module such as MainHub, FeeRouter, StatsRegistry.

## Naming Conventions
Use descriptive PascalCase like MainHub.sol, GlobalStats.sol.

## Coding Rules
Implement pausable, upgrade-aware, access-controlled logic per architecture spec.

## Scaling Notes
Core contracts should delegate specialized logic to libraries to keep bytecode lean.

## Security Notes
Add modifiers for roles and double entry accounting for fees and stats.

## Codex/Cursor Automation
Codex updates ABIs from this folder for scripts and frontend services.

## Example
```solidity
contract MainHub { /* ... */ }
```
