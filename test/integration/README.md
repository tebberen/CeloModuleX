# test/integration Directory

## Purpose
Cross-contract tests verifying MainHub-module-NFT interactions end-to-end.

## How to Use
Spin up MainHub, modules, NFTs, and run executeModule flows according to docs.

## Naming Conventions
MainHubIntegration.t.sol, execute-module.e2e.ts.

## Coding Rules
Use forked networks or local chain to mimic production state and update stats.

## Scaling Notes
Batch-run modules by manifest order to maintain coverage for hundreds of contracts.

## Security Notes
Validate that fees, commissions, and stats remain correct even with malicious inputs.

## Codex/Cursor Automation
Integration suite runs nightly or per PR before release.

## Example
```solidity
function test_executePremiumModule() public { /* ... */ }
```
