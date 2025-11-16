# test/invariant Directory

## Purpose
Long-running invariant suites ensuring stats + fee balances remain conserved.

## How to Use
Deploy MainHub and modules, then run invariants referencing StatsRegistry + FeeVault.

## Naming Conventions
GlobalStatsInvariant.t.sol.

## Coding Rules
Register invariants for net fees, leaderboard totals, module counts.

## Scaling Notes
Add invariants for new modules or features as they land.

## Security Notes
Guarantees that no module execution can corrupt global state.

## Codex/Cursor Automation
Nightly or release-candidate CI jobs execute invariants with large iteration counts.

## Example
```solidity
contract GlobalInvariant is StdInvariant { /* ... */ }
```
