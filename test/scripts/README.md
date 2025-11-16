# test/scripts Directory

## Purpose
Tests for CLI scripts ensuring deploy/register flows behave as expected.

## How to Use
Run with ts-node/jest and mock RPCs using anvil/hardhat network.

## Naming Conventions
deploy-flow.test.ts, register-modules.test.ts.

## Coding Rules
Simulate manifest parsing, RPC calls, and failure handling per deployment guide.

## Scaling Notes
As modules grow, script tests guard against regressions in automation pipelines.

## Security Notes
Mock secrets and ensure scripts never leak env variables in logs.

## Codex/Cursor Automation
CI executes script tests after unit/integration suites before tagging releases.

## Example
```ts
test('deploy manifest', async () => { /* ... */ });
```
