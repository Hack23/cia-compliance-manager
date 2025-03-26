# Widget Testing Recipe

This document provides a quick reference for testing widgets in the CIA Compliance Manager application.

## Basic Widget Test Recipe

```typescript
import { createWidgetTests } from "../../support/widget-testing-template";

// Define content patterns to check for in the widget
const contentPatterns = [
  "Widget Title",         // Exact text to find
  /some|regex|pattern/i,  // Regex pattern to match
];

// Optional: Define widget-specific tests
const additionalTests = () => {
  it("performs a widget-specific test", () => {
    // Access the widget using the alias set by the template
    cy.get("@currentWidget").within(() => {
      // Your widget-specific assertions here
      cy.contains("Expected Text").should("exist");
      
      // Take a screenshot for documentation
      cy.screenshot("my-widget-specific-state");
    });
  });
};

// Create the standardized tests
createWidgetTests(
  "Widget Display Name",  // Name shown in test reports
  "widget-id",            // ID used in data-testid attributes
  contentPatterns,
  additionalTests         // Optional: widget-specific tests
);
```

## Testing Different Security Levels

The widget testing template automatically tests security level transitions. If you need additional control:

```typescript
const additionalTests = () => {
  it("shows appropriate content for high security", () => {
    // Change to high security
    cy.setSecurityLevels("High", "High", "High");
    cy.wait(1000);
    
    // Access the widget
    cy.get("@currentWidget").within(() => {
      // Check for high-security specific content
      cy.contains(/advanced|high|enhanced/i).should("exist");
    });
  });
};
```

## Testing Widget Interactions

```typescript
const additionalTests = () => {
  it("responds to user interactions", () => {
    cy.get("@currentWidget").within(() => {
      // Find and click a button
      cy.contains("button", "Details").click();
      
      // Check for expected result
      cy.contains("Additional Information").should("be.visible");
      
      // Take screenshot of new state
      cy.screenshot("widget-after-interaction");
    });
  });
};
```

## Testing Conditional Widgets

Some widgets may only appear under certain conditions. Handle this gracefully:

```typescript
it("shows conditional content when appropriate", () => {
  // Set conditions that should make content appear
  cy.setSecurityLevels("High", "High", "High");
  cy.wait(1000);
  
  // Look for conditional element, allowing for it to not exist
  cy.get("@currentWidget").then($widget => {
    cy.wrap($widget).contains("Conditional Section").then($section => {
      if ($section.length > 0) {
        // Conditional content exists, test it
        cy.wrap($section).should("contain", "expected text");
      } else {
        // Log but don't fail if not found
        cy.log("Conditional content not found - skipping test");
      }
    });
  });
});
```

## Debugging Tips

1. **Take screenshots**: `cy.screenshot("debug-state")` at key points
2. **Log widget state**: `cy.get("@currentWidget").then($w => cy.log($w.text()))`
3. **Find widgets flexibly**: Use `findWidgetFlexibly("widget-name")` for resilient widget finding
4. **Apply test styles**: `applyTestStyles()` to ensure proper widget visibility
5. **Analyze widgets**: `cy.analyzeWidgets()` logs details of all widgets on the page

## Common Patterns for Widget Testing

### Testing Charts/Visualizations
```typescript
it("displays a chart with data", () => {
  cy.get("@currentWidget").within(() => {
    // Charts typically use canvas elements
    cy.get("canvas").should("be.visible");
    
    // Check for legends or data labels
    cy.contains(/legend|data|value|series/i).should("exist");
  });
});
```

### Testing Widget with Tabs
```typescript
it("allows switching between tabs", () => {
  cy.get("@currentWidget").within(() => {
    // Find and click the second tab
    cy.get('[role="tab"]').eq(1).click();
    
    // Check content has changed
    cy.get('[role="tabpanel"]').should("contain", "Expected content");
  });
});
```

### Testing Security Level Indicators
```typescript
it("shows appropriate indicators for security level", () => {
  cy.setSecurityLevels("High", "High", "High");
  cy.wait(1000);
  
  cy.get("@currentWidget").within(() => {
    // Look for high security indicators
    cy.get('[class*="badge"], [class*="indicator"]')
      .should("contain", "High");
  });
});
```
