# contracts/modules/groups Directory

## Purpose
Optional grouping contracts for Social, Talent, Growth, etc.

## How to Use
Create abstract bases or registries per category to share logic.

## Naming Conventions
SocialGroupBase.sol, DefiGroupBase.sol.

## Coding Rules
Expose modifiers and helper functions for modules inheriting from the group.

## Scaling Notes
Allows toggling categories and sharing metadata for 1000+ modules.

## Security Notes
Restrict privileged actions to category maintainers via AccessControl roles.

## Codex/Cursor Automation
Blueprint parser references group contracts when scaffolding module parents.

## Example
```solidity
abstract contract SocialGroupBase { /* ... */ }
```
