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

## Component Architecture

- **Component Organization:**
  - Place reusable UI components in `src/components/UI/`
  - Place business logic components in `src/components/common/`
  - Place feature-specific components in `src/components/widgets/`
  - Keep components small and focused on a single responsibility
  - Extract complex logic into custom hooks in `src/hooks/`

- **Component Patterns:**
  - Use functional components with TypeScript interfaces for props
  - Define prop interfaces in `src/types/componentProps.ts` or `src/types/widget-props.ts`
  - Use React hooks for state management
  - Implement proper error boundaries using `react-error-boundary`
  - Use `React.memo()` for performance optimization when appropriate

## Error Handling

- **Error Handling Strategy:**
  - Use try-catch blocks in service methods and async operations
  - Log errors using the centralized logger from `src/utils/logger.ts`
  - Return `undefined` or appropriate default values instead of throwing errors in most cases
  - Use type guards from `src/utils/typeGuards.ts` for runtime type validation
  - Implement error boundaries for component-level error handling

- **Error Messages:**
  - Provide clear, actionable error messages
  - Include context about what operation failed
  - Never expose sensitive information in error messages
  - Use consistent error message formatting

## Security Considerations

- **Security-First Development:**
  - Never expose sensitive data in logs or error messages
  - Validate all user inputs using type guards
  - Use strict TypeScript settings to catch potential vulnerabilities
  - Follow secure coding practices per `SECURITY.md`
  - Consider security implications for every code change
  - Review security alerts and address them promptly

- **Data Handling:**
  - Sanitize data before display
  - Use parameterized queries/functions to prevent injection
  - Implement proper access controls
  - Follow principle of least privilege

## Performance Optimization

- **Performance Guidelines:**
  - Use `React.memo()` for expensive renders
  - Implement code splitting for large components
  - Optimize bundle size (refer to `budget.json` limits)
  - Lazy load components when appropriate
  - Avoid unnecessary re-renders
  - Use efficient data structures and algorithms

- **Resource Management:**
  - Clean up event listeners and subscriptions
  - Optimize images and assets
  - Monitor bundle size impact
  - Use Vite's build analyzer to identify optimization opportunities

## Documentation Standards

- **Code Documentation:**
  - Use JSDoc comments for all public functions, classes, and interfaces
  - Document complex algorithms and business logic
  - Keep comments up-to-date with code changes
  - Use TypeDoc-compatible documentation format
  - Document parameters, return types, and exceptions

- **Documentation Files:**
  - Update relevant documentation in `docs/` when making architectural changes
  - Keep README.md current with feature changes
  - Update API documentation when modifying public interfaces
  - Document breaking changes clearly

## Common Patterns and Conventions

- **Naming Conventions:**
  - Use PascalCase for components and types
  - Use camelCase for functions, variables, and hooks
  - Use UPPER_SNAKE_CASE for constants
  - Prefix custom hooks with `use`
  - Use descriptive, meaningful names

- **Import Organization:**
  - Group imports: React/external libraries, internal types, internal components, internal utilities
  - Use absolute imports via TypeScript path mapping
  - Avoid circular dependencies

- **File Structure:**
  - Co-locate tests with source files using `.test.ts(x)` extension
  - Keep files focused and under 300 lines when possible
  - Use index files for clean exports

## Code Review Standards

- **Review Checklist:**
  - TypeScript strict mode compliance
  - Reusability: Are existing utilities/components used?
  - Test coverage: Are changes tested?
  - Performance: Any negative impact on bundle size or runtime?
  - Security: Any potential vulnerabilities?
  - Documentation: Are changes documented?
  - Breaking changes: Are they justified and documented?

## Summary

Focus on stability, strict TypeScript usage, and Vite-enhanced testing while reusing existing code. Align all changes with clear business, architectural, and security requirements to achieve a robust v1.0 release.
