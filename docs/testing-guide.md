# Testing Guide: Best Practices

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
