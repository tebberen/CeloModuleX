# frontend/src/components Directory

## Purpose
Reusable UI components such as ModuleCard, FeeBreakdown, NFTBanner, StatsPanel.

## How to Use
Place atomic and composite components with Storybook or docs comments.

## Naming Conventions
PascalCase filenames with matching component exports.

## Coding Rules
Use props interfaces, tailwind or shadcn UI, and avoid direct contract calls inside components.

## Scaling Notes
Component driven approach ensures UI stays maintainable as module catalog grows.

## Security Notes
Sanitize any user-generated content before rendering.

## Codex/Cursor Automation
Codex can append module-specific cards referencing metadata fields.

## Example
```tsx
export const ModuleCard: React.FC<ModuleMeta> = ({ title }) => <div>{title}</div>;
```
