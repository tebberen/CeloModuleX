# contracts/nft Directory

## Purpose
Contracts for Premium Access Pass and any derived token gating logic.

## How to Use
Implement ERC721/ERC1155 tokens referenced by MainHub for premium fee tiers.

## Naming Conventions
PremiumAccessPass.sol, AccessTiers.sol.

## Coding Rules
Follow docs for supply cap, metadata immutability, and AccessControl roles.

## Scaling Notes
Allow creation of new tiers without touching MainHub.

## Security Notes
Ensure mint/burn operations respect multisig + upgrade policies.

## Codex/Cursor Automation
Mint scripts and frontend ABIs are generated from this folder automatically.

## Example
```solidity
contract PremiumAccessPass is ERC721, AccessControl { /* ... */ }
```
