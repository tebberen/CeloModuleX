# modules/blueprints Directory

## Purpose
Canonical pre-contract specifications for every module.

## How to Use
One JSON or markdown file per module capturing goal, params, dependencies, QA.

## Naming Conventions
BP-<CATEGORY>-<MODULE>.json.

## Coding Rules
Include version, execution inputs, required hooks, and risk level as required in docs.

## Scaling Notes
Blueprint review ensures quality before coding when scaling to 1000 modules.

## Security Notes
Record potential attack surfaces and mitigations for future audits.

## Codex/Cursor Automation
Blueprint validator reads these files before generating Solidity templates.

## Example
```json
{ "moduleId": "SOCIAL_SHARE_V1", "execution": { "inputs": ["string uri"] } }
```
