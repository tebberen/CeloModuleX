# contracts/libraries Directory

## Purpose
Pure and internal helper libraries for math, scoring, encoding, and validation.

## How to Use
Import across core/modules to prevent duplicated fee or NFT logic.

## Naming Conventions
FeeMath.sol, ScoreLib.sol, StatsCodec.sol.

## Coding Rules
Only pure/internal functions with clear documentation and SafeCast usage.

## Scaling Notes
Centralized logic makes global upgrades trivial when module count explodes.

## Security Notes
Unit test thoroughly and include invariant coverage for precision sensitive code.

## Codex/Cursor Automation
Codex updates libraries when blueprint formulas change and syncs to modules automatically.

## Example
```solidity
library FeeMath { function calc(uint256 amount) internal pure returns (uint256) { return amount / 10; } }
```
