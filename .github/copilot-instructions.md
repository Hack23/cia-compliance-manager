# Copilot Instructions for CIA Compliance Manager (v0.8.x → v1.0 Release)

## Release Priority

- **v1.0 Focus:** Fix bugs, complete current widgets, stabilize existing functionality, and improve test coverage.
- **No New Features:** Do not extend functionality; strictly work on existing components and APIs.

## Coding Guidelines

- **Strict Typing:**

  - _Use explicit types and interfaces; avoid `any` (use `unknown` if needed)_.
  - _Leverage utility types (Pick, Omit, Partial) and always define return types_.
  - _Enable TypeScript's strict options in `tsconfig.json` (e.g., `strictNullChecks`, `noImplicitAny`)_.
  - _See: [link to tsconfig.json]_

- **Reusability - _Mandatory_:**
  - **Always** reuse/extend existing utilities, helpers, constants, components, and types.
    - **Key Reusable Items:**
      - **Types:** `src/types/cia.ts`, `src/types/businessImpact.ts`, `src/types/widgets.ts`, `src/types/compliance.ts`, `src/types/componentProps.ts`, `src/types/widget-props.ts`
      - **Constants:** `src/constants/securityLevels.ts`, `src/constants/businessConstants.ts`, `src/constants/appConstants.ts`, `src/constants/uiConstants.ts`, `src/constants/testIds.ts`
      - **Utilities:** `src/utils/securityLevelUtils.ts`, `src/utils/riskUtils.ts`, `src/utils/formatUtils.ts`, `src/utils/typeGuards.ts`, `src/utils/colorUtils.ts`
      - **Services:** `src/services/ciaContentService.ts`, `src/services/businessImpactService.ts`, `src/services/complianceService.ts`, `src/services/securityMetricsService.ts`, `src/services/BaseService.ts`
      - **Components:** `src/components/UI/*`, `src/components/common/*`, `src/components/charts/RadarChart.tsx`
  - _Avoid creating new types files unless absolutely necessary. Extend existing ones_.
  - _Any new component/type PR MUST justify why existing ones couldn't be reused/extended with a detailed comment_.

## Testing Guidelines

- **Vite & Vitest Integration:**
  - Configure Vite and Vitest for fast feedback and native ESM support.
  - Separate unit and integration tests, leveraging Vite's watch mode and coverage tools.
  - Mock external dependencies using existing helpers with proper TypeScript typings.
- **Quality Standards:**
  - Aim for a minimum of 80% code coverage.
  - Write tests for critical business logic and security paths.

## Summary

Focus on stability, strict TypeScript usage, and Vite-enhanced testing while reusing existing code. Align all changes with clear business, architectural, and security requirements to achieve a robust v1.0 release.
