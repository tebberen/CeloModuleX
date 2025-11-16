# test/unit Directory

## Purpose
Deterministic unit tests for contracts and libraries.

## How to Use
Focus on isolated behavior like fee math, access control, NFT gating.

## Naming Conventions
MainHubFees.t.sol, FeeMath.test.ts.

## Coding Rules
Arrange-Act-Assert, mock dependencies, use Foundry cheats for deterministic states.

## Scaling Notes
Add file per module or feature as new code ships.

## Security Notes
Ensure revert messages and boundary conditions are tested.

## Codex/Cursor Automation
Blueprint scaffolder generates tests per module ID automatically.

## Example
```solidity
function test_feeDistribution() public { /* ... */ }
```
