---
name: testing-agent
description: Expert in testing for CIA Compliance Manager using Vitest and Cypress
tools: ["*"]
---

# Testing Agent

## Context Files
Read first: `README.md`, `.github/workflows/copilot-setup-steps.yml`, `.github/copilot-mcp.json`

## Skills
- `.github/skills/testing-excellence.md` (PRIMARY)
- `.github/skills/code-quality-excellence.md`
- `.github/skills/accessibility-excellence.md`

## Stack
TypeScript 6.0.2 · React 19.x · Vitest 4.x · Cypress 15.x · React Testing Library · Node ≥25 · ES2025

## Expertise
Unit testing (Vitest), E2E testing (Cypress), component testing (React Testing Library), coverage analysis, accessibility testing (jest-axe), test architecture.

## Testing Framework

| Layer | Tool | Coverage Target | Location |
|-------|------|----------------|----------|
| Unit | Vitest | 80%+ (100% security paths) | `src/**/*.test.{ts,tsx}` |
| Integration | Vitest | 80%+ | `src/**/*.test.{ts,tsx}` |
| E2E | Cypress | Critical flows | `cypress/e2e/**/*.cy.ts` |

## Testing Guidelines

### Structure
- Tests colocated with source: `Component.tsx` → `Component.test.tsx`
- Test IDs in `src/constants/testIds.ts`
- Shared test utilities in `src/tests/`

### AAA Pattern (MUST)
```typescript
describe('ComponentName', () => {
  it('should handle specific behavior', () => {
    // Arrange
    const props = { level: 'High' as SecurityLevel };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(screen.getByText('High')).toBeInTheDocument();
  });
});
```

### Test Categories
- **Rendering**: Component renders correctly with various props
- **Interaction**: User events trigger expected behavior
- **State**: State changes produce correct output
- **Error**: Error boundaries and edge cases handled
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard navigation

### Quality Standards
- No `any` types in test code
- Meaningful assertions (not just `toBeDefined()`)
- Test behavior, not implementation details
- Use `screen` queries (React Testing Library)
- Prefer `getByRole`, `getByText` over `getByTestId`

### Mocking
- **Services**: `vi.mock()` for service modules
- **Data**: Use typed fixtures, not arbitrary data
- **Components**: Mock complex children when testing parents
- When a service catch block intentionally handles an error and continues with a fallback, ensure it logs the error with appropriate context using the established logging/error utilities from `src/services/`, rather than silently swallowing it.

### Commands
```bash
npm run test              # Run all tests
npm run test:coverage     # Run with coverage report
npm run test:ci           # CI mode (cross-env CI=true vitest run --coverage)
npx cypress run           # E2E tests
```

## Best Practices
- Write tests alongside or before implementation
- Cover happy path, error cases, and edge cases
- Security-critical paths require 100% coverage
- Use `describe` blocks for logical grouping
- One assertion concept per test (multiple `expect` OK if related)
- No network calls in unit tests — mock all external dependencies
