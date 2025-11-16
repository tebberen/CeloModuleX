# contracts Directory

## Purpose
Top-level Solidity workspace for MainHub, modules, libraries, and shared interfaces.

## How to Use
Organize production contracts here and run forge fmt / pnpm hardhat format before pushing.

## Naming Conventions
PascalCase filenames for contracts (MainHub.sol) and camelCase for libs (feeMath.sol).

## Coding Rules
Follow MainHub + fee spec, reuse libraries, avoid duplicate fee or NFT logic.

## Scaling Notes
Structure supports 50-1000 modules through dedicated subfolders and upgrade paths.

## Security Notes
Require static analysis, linting, and inheritance from AccessControl/Pausable patterns.

## Codex/Cursor Automation
Codex scripts scaffold modules here and sync ABIs for frontend consumption.

## Example
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Example {}
```
