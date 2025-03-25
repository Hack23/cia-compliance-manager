# Test Utilities for CIA Compliance Manager

This directory contains test utilities for writing consistent, maintainable tests for the CIA Compliance Manager.

## Quick Start

Import test utilities from the main entry point:

```typescript
// Import all utilities
import * as TestUtils from "../tests";

// Or import specific utilities
import { renderWithSecurityContext } from "../tests";
import { createTestCIAContentService } from "../tests";
```

## Available Utilities

### Rendering Components

Use these utilities to render components with the proper context:

```typescript
// Render a component with security context
const { container } = renderWithSecurityContext(<MyComponent />, {
  availabilityLevel: "High",
  integrityLevel: "Moderate",
  confidentialityLevel: "High",
});

// Render a component with theme context
const { container } = renderWithTheme(<MyComponent />, "dark");
```

### Testing Hooks

Use these utilities to test custom hooks:

```typescript
import { renderHook, act } from "../tests";

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
```

### Mocking Chart.js

Use these utilities to mock Chart.js in your tests:

```typescript
import { setupChartTest } from "../tests";

describe("MyChartComponent", () => {
  const { mockChartInstance, cleanup } = setupChartTest();

  afterEach(() => {
    cleanup();
  });

  it("renders chart with correct data", () => {
    render(<MyChartComponent data={testData} />);
    expect(mockChartInstance.data.datasets.length).toBe(1);
  });
});
```

### Mocking Services

Use these utilities to create mock services:

```typescript
import { createTestCIAContentService } from "../tests";

describe("MyComponent", () => {
  it("displays CIA content", () => {
    // Create a mock service
    const mockService = createTestCIAContentService();

    // Render with the mock service
    render(<MyComponent ciaContentService={mockService} />);

    // Assert component behavior
    expect(screen.getByText("Test technical description")).toBeInTheDocument();
  });
});
```

## Deprecated Utilities

The following utilities are deprecated and will be removed in v1.1:

- `src/tests/testUtils/chartTestUtils.ts` → Use `src/tests/utils/chart.ts` instead
- `src/tests/testUtils/mockFactory.ts` → Use `src/tests/utils/mock.ts` instead
- `src/tests/testMocks/ciaOptionsMocks.ts` → Use `src/tests/utils/mock.ts` instead

## Adding New Test Utilities

When adding new test utilities:

1. Add to the appropriate category in `src/tests/utils/`
2. Export from the main `src/tests/index.ts` file
3. Add documentation with examples
4. Ensure proper TypeScript typing
