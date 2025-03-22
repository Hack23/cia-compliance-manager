# Test Utilities for CIA Compliance Manager

This directory contains a consolidated set of test utilities for the CIA Compliance Manager project. Previously, test utilities were scattered across multiple locations, making them difficult to find and maintain.

## Directory Structure

- **component**: Component testing utilities (matchers, renderers, etc.)
- **mock**: Mock factories and data generators
- **render**: React component rendering utilities
- **security**: Security-specific test helpers (CIA levels, etc.)
- **dom**: DOM testing utilities
- **chart**: Chart.js test helpers

## Usage Examples

```typescript
// Import all utilities from a category
import {
  createMockSecurityLevelState,
  toSecurityLevel,
} from "../tests/utils/security";

// Or import everything
import * as testUtils from "../tests/utils";

// Example: Create mock security level state
const securityState = createMockSecurityLevelState();

// Example: Render with security context
const { container } = renderWithSecurityContext(<MyComponent />, {
  availabilityLevel: "High",
  integrityLevel: "Moderate",
  confidentialityLevel: "High",
});
```

## Transition Plan

All previous utilities have been preserved with re-exports to maintain backward compatibility. However, these re-exports are deprecated and will be removed in v1.1.0. Please update your imports to use the new structure.

### Deprecated Imports

The following import paths are deprecated:

- `src/test/securityLevelTestUtils`
- `src/tests/testMocks`
- `src/utils/test-utils`
- `src/utils/test-helpers`

### New Imports

Use these import paths instead:

- `src/tests/utils/security` (for security level utilities)
- `src/tests/utils/mock` (for mock factories and data)
- `src/tests/utils/render` (for rendering utilities)
- `src/tests/utils/component` (for component testing utilities)
- `src/tests/utils/dom` (for DOM testing utilities)
- `src/tests/utils/chart` (for Chart.js testing utilities)

## Common Tasks

### Setting Up Security Level Test Props

```typescript
import { createSecurityLevelProps } from "../tests/utils/security";

// Create props with default values (all "Moderate")
const props = createSecurityLevelProps();

// Or with custom values
const customProps = createSecurityLevelProps("High", "High", "Very High");
```

### Creating Mock Data

```typescript
import { createMockBusinessImpact } from "../tests/utils/mock";

// Create with defaults
const impact = createMockBusinessImpact();

// Or with custom values
const customImpact = createMockBusinessImpact({
  financial: {
    description: "Custom financial impact",
    riskLevel: "High",
    annualRevenueLoss: "$500,000",
  },
});
```

### Testing Charts

```typescript
import { setupChartTest } from "../tests/utils/chart";

describe("MyChartComponent", () => {
  const { MockChart, mockChartInstance, cleanup } = setupChartTest();

  afterEach(() => {
    cleanup();
  });

  it("renders chart with correct data", () => {
    render(<MyChartComponent data={testData} />);
    expect(MockChart).toHaveBeenCalled();
    expect(mockChartInstance.data.datasets.length).toBe(1);
  });
});
```
