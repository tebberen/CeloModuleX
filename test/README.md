# test Directory

## Purpose
Master QA workspace matching the full test plan requirements.

## How to Use
Run forge/hardhat tests grouped by methodology and maintain coverage badges.

## Naming Conventions
<Feature>Test.t.sol or .test.ts with descriptive suffixes.

## Coding Rules
Follow docs/test-plan mapping for each requirement ID.

## Scaling Notes
Add tests per module automatically via templates and manifest loops.

## Security Notes
Include malicious actor simulations and revert expectation coverage.

## Codex/Cursor Automation
CI executes `forge test`, `hardhat test`, and script tests referencing this tree.

## Example
```solidity
contract MainHubTest is Test { }
```
