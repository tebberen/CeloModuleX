# Contributing & Commit Convention Guide

## Prerequisites
- Read every document inside `docs/` before touching contracts or frontend code.
- Install Foundry, pnpm, and Node.js 18+.
- Copy `.env.example` to `.env` and fill required secrets.

## Branch & Commit Rules
- Use feature branches: `feature/<scope>`, `fix/<scope>`, `docs/<scope>`.
- Follow Conventional Commits: `type(scope): summary`.
  - `feat(mainhub): add fee split`
  - `fix(frontend): debounce leaderboard refresh`
  - `docs(modules): add gm module blueprint`
- Maximum line length for commit subject: 72 chars.
- Reference relevant blueprint ID or doc section in commit body.

## Pull Request Checklist
1. Update/verify `DEPLOY_MANIFEST.json`, `MODULE_REGISTRY.json`, and `integration-config.json` if module addresses change.
2. Add/adjust README.md files within touched directories.
3. Run `forge fmt`, `forge test`, `pnpm lint`, and UI snapshots if frontend was touched.
4. Include screenshots for visual changes.
5. Link to blueprint/test-plan section describing your change.

## Code Review Expectations
- Every smart contract change must include unit + integration tests.
- Frontend changes must cover hooks/services plus e2e script tests when applicable.
- Ensure Gas benchmarks are logged for MainHub updates.
- Document new decisions inside `docs/architecture` as ADRs.

## Release Flow Summary
1. Update manifests & metadata.
2. Run deployment dry-run using `scripts/multi-chain`.
3. Submit PR, obtain approvals from Architecture + Security owners.
4. Merge and tag release `vX.Y.Z`.
5. Execute production deployment following `docs/deployment`.
