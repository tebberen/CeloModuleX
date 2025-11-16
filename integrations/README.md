# integrations Directory

## Purpose
Partner integration workspace for Talent Protocol, Self ID, Celo AI, and future partners.

## How to Use
Include SDK adapters, ABI bindings, config docs, and tests per integration.

## Naming Conventions
kebab-case directories per partner with TypeScript or Solidity files inside.

## Coding Rules
Provide typed clients and follow integration spec for pre-setup steps.

## Scaling Notes
New partners get their own subfolder plus README + config references.

## Security Notes
Store credentials in env only and document scopes per partner.

## Codex/Cursor Automation
Multi-chain scripts load integration helpers from this directory during deployments.

## Example
client.ts, schema.graphql
