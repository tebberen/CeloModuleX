# frontend/src Directory

## Purpose
Source tree for React/Next code used in the dApp.

## How to Use
Store TypeScript files only; group logic per dedicated subdirectories.

## Naming Conventions
PascalCase components, camelCase hooks, uppercase constants.

## Coding Rules
Enable strict mode, eslint, and dedicated test coverage for hooks/services.

## Scaling Notes
Segmented structure keeps UI manageable as modules multiply.

## Security Notes
Handle wallet errors and data validation gracefully.

## Codex/Cursor Automation
Codex writes codegen outputs (ABIs, hooks) within src as defined by blueprints.

## Example
```ts
import { useMainHub } from './hooks/useMainHub';
```
