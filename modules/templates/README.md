# modules/templates Directory

## Purpose
Cursor-ready scaffolds for Solidity, tests, and frontend assets derived from blueprints.

## How to Use
Store .tpl files that will be rendered with blueprint values before commit.

## Naming Conventions
<ModuleName>.sol.tpl, <ModuleName>.test.tpl.

## Coding Rules
Use placeholder tokens like {{moduleId}} and maintain compatibility with interfaces.

## Scaling Notes
Templates drastically cut time to add hundreds of modules.

## Security Notes
Highlight manual review sections with TODO comments that must be resolved before deployment.

## Codex/Cursor Automation
Codex replaces placeholders and copies output to contracts/test folders.

## Example
```solidity
// Template for {{moduleId}}
contract {{moduleContract}} is ModuleBase { }
```
