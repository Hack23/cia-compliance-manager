# Unit Test Plan for CIA Compliance Manager

**🔐 ISMS Alignment:** This unit test plan implements [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) Section 4.3.1 - Unit Testing Requirements.

## 1. Overview

This document outlines the unit testing strategy for the CIA Compliance Manager application. The application is built using React with TypeScript, and unit tests are implemented using Vitest.

### ISMS Compliance Requirements

Per Hack23 AB's Secure Development Policy, this project maintains:

| 🎯 **Requirement** | 📊 **Target** | ✅ **Current** | 📋 **ISMS Reference** |
|-------------------|--------------|---------------|---------------------|
| **Line Coverage** | ≥80% | 85% | Section 4.3.1.1 |
| **Branch Coverage** | ≥70% | 75% | Section 4.3.1.2 |
| **Test Execution** | Every commit | ✅ Automated | Section 4.3.1.3 |
| **Public Reporting** | Required | ✅ Published | Section 4.3.1.4 |

**Evidence Links:**
- [![CI Tests](https://github.com/Hack23/cia-compliance-manager/actions/workflows/test-and-report.yml/badge.svg)](https://github.com/Hack23/cia-compliance-manager/actions/workflows/test-and-report.yml)
- [Coverage Reports](https://hack23.github.io/cia-compliance-manager/coverage)
- [Test Results](https://hack23.github.io/cia-compliance-manager/test-results)

**See Also:** [ISMS Implementation Guide - Testing Strategy](../ISMS_IMPLEMENTATION_GUIDE.md#-testing-strategy--quality-assurance)

---

## 2. Testing Framework

- **Primary framework**: Vitest
- **Test environment**: JSDOM
- **Coverage tool**: V8 (via Vitest)
- **Target coverage**: 80% line coverage minimum

## 3. Test Organization

### 3.1 File Structure

Unit tests should be placed alongside their implementation files with the `.test.tsx` or `.test.ts` extension:

```
src/
├── components/
│   ├── Component.tsx
│   └── Component.test.tsx
├── utils/
│   ├── helper.ts
│   └── helper.test.ts
```

### 3.2 Test Categories

- **Component tests**: Test React components in isolation with mocked dependencies
- **Utility tests**: Test utility functions, hooks, and services
- **Integration tests**: Test small groups of components working together

## 4. Testing Standards

### 4.1 Component Testing

- Test rendering without crashing
- Test all component props and variations
- Test state changes and user interactions
- Test conditional rendering logic
- Mock external dependencies and services

### 4.2 Test Doubles

- Use mocks for external services and dependencies
- Use test fixtures for complex data structures
- Use fake timers for time-dependent functions

## 5. Code Coverage Requirements

- **Statements**: 80% minimum
- **Branches**: 70% minimum
- **Functions**: 80% minimum
- **Lines**: 80% minimum

## 6. Running Tests

- **Development**: `npm run test`
- **CI/CD**: `npm run test:ci`
- **Coverage report**: `npm run test:coverage`

## 7. Pull Request Requirements

All pull requests must:

- Include tests for new features and bug fixes
- Not decrease the overall code coverage
- Pass all existing tests

## 8. Common Test Patterns

### 8.1 Component Test Example

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Component from "./Component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Component onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 8.2 Utility Function Test Example

```typescript
import { describe, it, expect } from "vitest";
import { formatData } from "./utils";

describe("formatData", () => {
  it("formats data correctly", () => {
    const input = { key: "value" };
    const expected = { formattedKey: "VALUE" };
    expect(formatData(input)).toEqual(expected);
  });

  it("handles empty input", () => {
    expect(formatData({})).toEqual({});
  });
});
```
