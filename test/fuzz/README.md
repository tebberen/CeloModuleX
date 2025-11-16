# test/fuzz Directory

## Purpose
Property-based fuzzing of fee calculations, stats increments, and leaderboard scoring.

## How to Use
Use Foundry fuzz/invariant helpers or Echidna for randomness.

## Naming Conventions
FeeFuzz.t.sol, StatsFuzz.t.sol.

## Coding Rules
Define invariants referencing docs/test-plan (e.g., totalFees equals sum of splits).

## Scaling Notes
Add new fuzz suites for each module type to ensure resilience at scale.

## Security Notes
Catch overflow/underflow, access bypass, and double-count issues automatically.

## Codex/Cursor Automation
CI can run targeted fuzz suites with limited iterations, while nightly builds run full seeds.

## Example
```solidity
function testFuzz_execute(uint256 value) public { /* ... */ }
```
