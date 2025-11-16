# integrations/celo-ai Directory

## Purpose
Celo AI orchestration helpers powering blueprint scoring and AI-assisted modules.

## How to Use
Store prompt templates, API clients, and automation scripts for AI backed flows.

## Naming Conventions
aiOrchestrator.ts, prompt-library.md.

## Coding Rules
Follow AI safety guardrails and log inference metadata for audits.

## Scaling Notes
Allows AI-assisted blueprint reviews for hundreds of modules simultaneously.

## Security Notes
Redact sensitive data before sending to AI endpoints and store keys in env.

## Codex/Cursor Automation
Codex automation consumes prompts here to evaluate module proposals.

## Example
```ts
export async function scoreModuleIdea(prompt: string) { /* ... */ }
```
