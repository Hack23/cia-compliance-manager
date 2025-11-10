# Testing Guide: Best Practices

**🔐 ISMS Alignment:** This testing guide implements controls from [Secure Development Policy](https://github.com/Hack23/ISMS-PUBLIC/blob/main/Secure_Development_Policy.md) Section 4.3 - Security Testing Requirements.

## ISMS Testing Standards

Per Hack23 AB's Secure Development Policy, CIA Compliance Manager implements:

- **✅ Unit Testing:** ≥80% line coverage, ≥70% branch coverage (ISMS requirement 4.3.1)
- **✅ Security Testing:** SAST, SCA, DAST, Secret Scanning (ISMS requirement 4.3.2)
- **✅ E2E Testing:** Critical user journeys validated (ISMS requirement 4.3.3)
- **✅ Performance Testing:** Lighthouse 90+ scores (ISMS requirement 4.3.4)

**Evidence:** See [ISMS Implementation Guide](../ISMS_IMPLEMENTATION_GUIDE.md#-testing-strategy--quality-assurance)

---

## Proper Mock Ordering and Hoisting

```typescript
// 1. First, define all mocks before any imports
vi.mock("module-to-mock", () => ({
  __esModule: true,
  default: vi.fn(),
  namedExport: vi.fn(),
}));

// 2. Use standard helpers for common mocks
import { createChartJsMock } from "../tests/mockHelpers";
vi.mock("chart.js/auto", () => createChartJsMock());

// 3. Only after all mocks, import your dependencies
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ComponentToTest from "./ComponentToTest";
```

## Use Standard Mocks

We provide standard mock implementations for common dependencies:

```typescript
// Use these in your vi.mock calls:
import {
  createChartJsMock,
  createCIAOptionsMock,
  createCIAContentServiceMock,
  createMockComponent,
} from "../tests/mockHelpers";
```

## DOM API Mocking

For consistent DOM API mocking (canvas, ResizeObserver, etc.):

```typescript
import { mockBrowserAPIs } from "../tests/testUtils";

beforeEach(() => {
  mockBrowserAPIs();
});
```

## Proper Type Assertions

Avoid using `any` types in tests:

```typescript
// ❌ Bad:
const result = someFunction() as any;

// ✅ Good:
const result = someFunction() as SomeType;
// or
const result = someFunction<SomeType>();
```

## Using vi.mocked for Type Safety

To get proper typing from mocked modules:

```typescript
import { vi } from "vitest";
import Component from "./Component";

// Create the mock
vi.mock("./Component");

// Get the typed mock
const MockedComponent = vi.mocked(Component);

// Now you get proper typing
expect(MockedComponent).toHaveBeenCalledWith({ prop: "value" });
```

## Testing Components with Canvas/Chart.js

When testing components that use Chart.js or canvas:

```typescript
// Use vi.hoisted to make the function available before imports
const mockChartImplementation = vi.hoisted(() => {
  // Create a mock Chart instance
  const mockChartInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  };

  // Create a constructor mock
  const MockChart = vi.fn(() => mockChartInstance);
  MockChart.register = vi.fn();

  return {
    __esModule: true,
    default: MockChart,
    mockChartInstance,
  };
});

// Apply the mock with hoisted implementation
vi.mock("chart.js/auto", () => mockChartImplementation());

// Then mock canvas context in beforeEach
beforeEach(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 200, height: 200 },
    clearRect: vi.fn(),
    fillStyle: null,
    fillRect: vi.fn(),
  });
});
```

## Testing Hooks (React 19 Compatible)

Use our custom React 19 compatible hook testing utilities:

```typescript
import { renderHook, act } from "../tests/testUtils/hookTestUtils";

it("updates state when action is called", () => {
  // Render the hook
  const { result } = renderHook(() => useMyHook());

  // Initial state check
  expect(result.current.value).toBe("initial");

  // Update state with act
  act(() => {
    result.current.setValue("updated");
  });

  // Check updated state
  expect(result.current.value).toBe("updated");
});

// For more complex state tracking:
it("tracks state changes through multiple updates", () => {
  const { history } = trackHookHistory(() => useCounter(0));

  act(() => {
    // Trigger state changes
  });

  expect(history.length).toBeGreaterThan(1);
  expect(history[0]).toBe(0); // Initial state
  expect(history[history.length - 1]).toBe(2); // Final state
});
```
