# contracts/modules Directory

## Purpose
Source of every executable module orchestrated by MainHub.

## How to Use
Create one contract per module and keep logic minimal, deferring fees/access to MainHub.

## Naming Conventions
<Capability>ModuleV1.sol with explicit version suffix.

## Coding Rules
Implement IModule interface and emit ModuleAction events as described in module spec.

## Scaling Notes
Add category subfolders when module count grows into hundreds.

## Security Notes
Never store user funds; rely on MainHub for validation and limit state changes.

## Codex/Cursor Automation
Cursor consumes templates to generate modules here from /modules/blueprints.

## Example
```solidity
contract SocialShareModule is IModule { /* ... */ }
```
