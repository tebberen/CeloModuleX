# modules/metadata Directory

## Purpose
Metadata files describing deployed modules, categories, fees, and addresses.

## How to Use
Keep JSON aligned with MODULE_REGISTRY schema for UI + scripts.

## Naming Conventions
MODULE_<ID>.json or <category>-<module>.json.

## Coding Rules
Include fields: moduleId, version, implementation, status, feeType, premium, nftRequired, docsLink.

## Scaling Notes
Registry-based metadata enables automated rendering of hundreds of modules.

## Security Notes
Verify addresses before commit and sign metadata updates when required.

## Codex/Cursor Automation
Registration scripts read metadata files to populate Module Registry on-chain and in JSON manifests.

## Example
```json
{ "moduleId": "SOCIAL_SHARE_V1", "implementation": "0x..." }
```
