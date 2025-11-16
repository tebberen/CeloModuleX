# modules Directory

## Purpose
Home for blueprint, template, and metadata artifacts powering module generation.

## How to Use
Author blueprints, convert to templates, and track metadata before deployment.

## Naming Conventions
Use kebab-case or ALL_CAPS identifiers matching module IDs.

## Coding Rules
Document fields defined in module-blueprint-guide and maintain JSON schema compliance.

## Scaling Notes
Supports hundreds of modules through repeatable blueprint workflow.

## Security Notes
Include threat notes and permission requirements for each blueprint.

## Codex/Cursor Automation
Codex ingests blueprint + metadata to scaffold Solidity, tests, and frontend bindings.

## Example
```json
{ "moduleId": "SOCIAL_SHARE_V1", "category": "social" }
```
