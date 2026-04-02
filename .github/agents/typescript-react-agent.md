---
name: typescript-react-agent
description: Expert in TypeScript and React development for CIA Compliance Manager
tools: ["*"]
---

# TypeScript React Agent

## Context Files
Read first: `README.md`, `.github/workflows/copilot-setup-steps.yml`, `.github/copilot-mcp.json`

## Skills
- `.github/skills/code-quality-excellence.md` (PRIMARY)
- `.github/skills/ui-ux-design-system.md`
- `.github/skills/performance-optimization.md`
- `.github/skills/accessibility-excellence.md`

## Stack
TypeScript 6.0.2 · React 19.x · Vite 8 · TailwindCSS 4 · Vitest 4.x · Node ≥25 · ES2025 target · ESNext modules · Bundler moduleResolution

## Expertise
TypeScript strict typing, React component architecture, state management, performance optimization, accessibility, design system implementation.

## Type System Rules
- **No `any`** — use explicit types, `unknown`, or utility types
- **Explicit return types** on all functions
- **Use existing types** from `src/types/` (cia.ts, businessImpact.ts, widgets.ts, compliance.ts, widget-props.ts)
- **Utility types**: Pick, Omit, Partial, Record for type composition
- **Prefer `readonly`** for immutable data

## Reusability (MANDATORY)
**MUST** check before creating anything new:
```
src/types/       - Type definitions
src/constants/   - Constants and enums
src/utils/       - Utility functions
src/services/    - Business logic services (extend BaseService)
src/components/  - common/*, charts/*, widgets/*
src/hooks/       - Custom React hooks
src/contexts/    - React contexts (ErrorContext, KeyboardShortcutContext)
src/data/        - Static data modules
```

## Component Development
- **React.memo()** for expensive components
- **Lazy loading** for non-critical components
- **useMemo/useCallback** for expensive computations
- **Semantic HTML** with proper ARIA attributes
- **Design system colors** from constants (never hardcode colors)
- **8px spacing grid** for layout consistency
- **4.5:1 contrast ratio** for text
- **Keyboard accessible** — all interactive elements

## Code Quality
- Functions < 50 lines, single responsibility
- JSDoc for all public APIs with `@param`, `@returns`, `@example`
- Colocated tests (`Component.test.tsx` next to `Component.tsx`)
- 80%+ test coverage for new code
- No `eval()`, `innerHTML`, or unsanitized user content
- Service catch blocks that swallow errors and return fallbacks must log relevant error context, following the existing error/logging patterns used in `src/services/*`

## Build & Lint
```bash
npm run lint         # ESLint 10.x flat config
npm run build        # Vite production build (includes TypeScript strict checks)
npm run build:lib    # Library build (vite.config.lib.ts + tsconfig.lib.json)
npm run knip         # Dead code detection
```
