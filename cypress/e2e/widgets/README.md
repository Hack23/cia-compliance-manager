# Widget Testing Framework

This directory contains tests for the various widgets in the CIA Compliance Manager application. The tests use a standardized approach for consistency and reliability.

## Using the Widget Testing Template

All widget tests have been standardized to use the `createWidgetTests` function from the widget testing template. This provides several benefits:

1. **Consistent Testing Pattern**: All widgets are tested the same way
2. **Reduced Duplication**: Common test cases are defined once
3. **Resilient Selectors**: Uses flexible widget finding to handle DOM structure changes
4. **Better Error Handling**: Provides soft-pass behavior when widgets aren't found
5. **Documentation**: Automatically generates screenshots of widgets in different states

### Basic Usage Pattern

```typescript
import { createWidgetTests } from "../../support/widget-testing-template";

// Define content patterns to check for in the widget
const contentPatterns = [
  "Widget Title",
  /some|regex|pattern/i,
  "specific text",
];

// Optional: Define widget-specific tests
const additionalTests = () => {
  it("performs widget-specific test", () => {
    // Use cy.get("@currentWidget") to access the widget
    cy.get("@currentWidget").within(() => {
      // Widget-specific assertions
      cy.contains("Expected text").should("exist");
    });
  });
};

// Create the standardized tests
createWidgetTests(
  "Widget Display Name", // Name shown in test reports
  "widget-id", // ID used in data-testid attributes
  contentPatterns,
  additionalTests // Optional: widget-specific tests
);
```

### Standard Tests Included

Each widget automatically gets the following tests:

1. **Visibility and Content Test**: Verifies the widget is visible and contains expected content
2. **Security Level Responsiveness**: Verifies the widget updates when security levels change
3. **Widget-Specific Tests**: Custom tests for widget-specific functionality (if provided)

## Test Resilience Features

The framework includes several features to make tests more resilient:

- **Flexible Widget Finding**: Tries multiple selector strategies to find widgets
- **Content Pattern Matching**: Uses both exact text and regex patterns
- **Soft Pass Behavior**: Tests don't fail when widgets are missing (helpful for conditional widgets)
- **Enhanced Error Reporting**: Better error messages and automatic screenshots
- **State Visualization**: Automatically takes screenshots in different security level states

## Debugging Widgets

When a widget test fails, check the following:

1. **Screenshots**: Look in `cypress/screenshots` for visual evidence of the issue
2. **Test Output**: The test logs which selectors were tried and what widgets were found
3. **Widget Analysis**: The `analyzeWidgets()` function logs information about all widgets on the page

## Custom Commands for Widget Testing

The framework provides several custom commands:

- `cy.findWidget(widgetName)`: Find widget using flexible selectors
- `cy.setSecurityLevels(avail, integ, confid)`: Set security levels
- `cy.applyTestStyles()`: Apply styles for better widget visualization
- `cy.analyzeWidgets()`: Log information about widgets on the page

## Adding a New Widget Test

1. Create a new file `widget-name.cy.ts` in this directory
2. Import the `createWidgetTests` function
3. Define content patterns specific to this widget
4. Optionally define widget-specific tests
5. Call `createWidgetTests` with the appropriate parameters
