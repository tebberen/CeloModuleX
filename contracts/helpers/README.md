# contracts/helpers Directory

## Purpose
Mock modules, receivers, and testing helpers used by QA and integrations.

## How to Use
Deploy deterministic helper contracts for scripts and fuzz tests.

## Naming Conventions
MockModuleConsumer.sol, DummyFeeReceiver.sol.

## Coding Rules
Keep logic simple; no production funds should touch helpers.

## Scaling Notes
Reusable scaffolding for verifying 1000+ modules locally.

## Security Notes
Mark helpers as non-production and blocklist from manifests.

## Codex/Cursor Automation
Codex generates helper contracts when blueprint validation needs deterministic actors.

## Example
```solidity
contract MockFeeReceiver { function onFeeReceived(uint256) external {} }
```
