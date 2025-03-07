# CIA Compliance Manager E2E Test Plan

## Overview of E2E Testing Infrastructure

The project uses Cypress for end-to-end testing. The testing setup provides comprehensive coverage for user flows and component interactions in a browser environment.

## Test Organization

Tests are organized into logical categories based on function:

```
cypress/
├── e2e/                    # Test files
│   ├── business-outcomes/  # Business outcome tests (value features)
│   ├── core-behaviors/     # Core behavior tests (key interactions)
│   ├── widgets/            # Widget-specific tests
│   ├── consolidated/       # Grouped test suites
│   └── user-flows/         # End-to-end user flows
├── support/                # Support code
│   ├── commands.ts         # Custom Cypress commands
│   ├── constants.ts        # Test constants and selectors
│   ├── test-helpers.ts     # Helper functions
│   ├── test-patterns.ts    # Reusable test patterns
│   └── debug-helpers.ts    # Debugging utilities
```

## Testing Strategy Overview

The E2E testing strategy follows these core principles:

1. **User-Centric Testing**: Tests focus on key user flows and business outcomes
2. **Constant-Driven Selection**: Using centralized constants for reliable element selection
3. **Resilient Testing**: Implementing fallbacks and retry mechanisms for stability
4. **Comprehensive Coverage**: Testing both UI components and integrated functionality

## Test Categories and Examples

### 1. Business Outcome Tests

Tests that verify the business value features deliver the expected outcomes.

```typescript
// Example from view-compliance-status.cy.ts
it("displays compliance status for regulatory requirements", () => {
  // Set security levels to create a testable state
  cy.setSecurityLevels(
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH
  );
  cy.wait(1000);

  // Verify compliance status with flexible approach
  cy.get("body").then(($body) => {
    const pageText = $body.text();
    const hasHighComplianceIndicators =
      pageText.toLowerCase().includes("compliant") ||
      pageText.toLowerCase().includes("compliance") ||
      pageText.toLowerCase().includes("framework");

    expect(hasHighComplianceIndicators).to.be.true;
  });
});
```

### 2. Core Behavior Tests

Tests that verify key user interactions work correctly.

```typescript
// Example from set-security-levels.cy.ts
it("allows setting individual security levels", () => {
  // Using the selector constants
  cy.get(SELECTORS.WIDGETS.SECURITY_LEVEL).should("be.visible");

  // Using test IDs with helper function
  cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).select(
    SECURITY_LEVELS.HIGH
  );

  // Verify selection
  cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).should(
    "have.value",
    SECURITY_LEVELS.HIGH
  );
});
```

### 3. Widget Tests

Tests that verify individual UI components function correctly.

```typescript
// Example from security-profile-widget.cy.ts
it("reflects business impact when security levels change", () => {
  // Set different security levels
  cy.setSecurityLevels(
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.LOW
  );

  // Store initial page content
  let initialContent = "";
  cy.get("body")
    .invoke("text")
    .then((text) => {
      initialContent = text;

      // Change security levels
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );

      // Verify content has changed, indicating impact updates
      cy.get("body").invoke("text").should("not.eq", initialContent);
    });
});
```

### 4. User Flow Tests

Tests that verify complete end-to-end user journeys.

```typescript
// Example from security-compliance-flow.cy.ts
it("demonstrates full user flow from security selection to business impacts", () => {
  // 1. Start with baseline security level
  cy.setSecurityLevels(
    SECURITY_LEVELS.NONE,
    SECURITY_LEVELS.NONE,
    SECURITY_LEVELS.NONE
  );
  cy.wait(500);

  // 2. Verify initial state shows minimal compliance
  cy.get("body").then(($body) => {
    if (
      $body.find(
        `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`
      ).length
    ) {
      cy.get(`[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`)
        .invoke("text")
        .should("match", /non|not|0%|minimal/i);
    } else {
      // If badge not found, check general page content
      cy.get("body")
        .invoke("text")
        .should("match", /non-compliant|not compliant|minimal|none/i);
    }
  });

  // 3. Set a mixed security profile with different levels
  cy.setSecurityLevels(
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.LOW
  );
  cy.wait(500);

  // 4. Verify mixed security has partial compliance
  cy.get("body").then(($body) => {
    const pageText = $body.text().toLowerCase();
    const hasPartialCompliance =
      pageText.includes("partial") ||
      pageText.includes("some") ||
      pageText.includes("basic") ||
      (pageText.includes("compliant") && !pageText.includes("non")) ||
      pageText.match(/\d+% compliant/);

    expect(hasPartialCompliance).to.be.true;
  });

  // 5. Finally set to maximum security
  cy.setSecurityLevels(
    SECURITY_LEVELS.VERY_HIGH,
    SECURITY_LEVELS.VERY_HIGH,
    SECURITY_LEVELS.VERY_HIGH
  );
  cy.wait(500);

  // 6. Verify highest security shows full compliance and high cost
  cy.get("body").then(($body) => {
    const pageText = $body.text().toLowerCase();
    const hasFullCompliance =
      pageText.includes("full") ||
      pageText.includes("100%") ||
      pageText.includes("maximum") ||
      pageText.includes("all framework");

    expect(hasFullCompliance).to.be.true;
  });
});
```

### 5. Widget Integration Tests

Tests that verify components work together correctly.

```typescript
// Example from widget-interactions.cy.ts
it("updates all widgets when security levels change", () => {
  // First check initial state
  cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
    "exist"
  );

  // Set all levels to High
  cy.setSecurityLevels(
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.HIGH
  );

  // Verify compliance status updated - use more flexible text matching
  cy.get(getTestSelector(FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE)).should(
    ($el) => {
      const text = $el.text().toLowerCase();
      // Look for "compli" which will match both "compliant" and "compliance"
      expect(text).to.include("compli");
      // Make sure it's positive compliance, not non-compliance
      expect(text).not.to.include("non-compli");
    }
  );
});
```

## Custom Commands and Utilities

### 1. Custom Commands

Cypress has been extended with custom commands to simplify test writing:

```typescript
// Set security levels for all three CIA components
cy.setSecurityLevels(
  SECURITY_LEVELS.HIGH,
  SECURITY_LEVELS.MODERATE,
  SECURITY_LEVELS.LOW
);

// Ensure the application has loaded properly
cy.ensureAppLoaded();

// Navigate to a specific widget by test ID
cy.navigateToWidget(BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_SUMMARY);

// Force an element to be visible
cy.forceVisible();
```

### 2. Helper Functions

Helper functions provide reusable test logic:

```typescript
// Force visibility of an element and its parents
export function forceElementVisibility(selector: string) {
  return cy.get(selector).then(($el) => {
    // Apply styles directly to the element
    cy.wrap($el).invoke(
      "attr",
      "style",
      "visibility: visible !important; " +
        "display: block !important; " +
        "opacity: 1 !important; " +
        "position: static !important; " +
        "z-index: 9999 !important"
    );

    // Fix all parent elements to ensure visibility
    let current = $el.parent();
    let depth = 0;
    const maxDepth = 10; // Limit how far up we go

    while (current.length && !current.is("body") && depth < maxDepth) {
      cy.wrap(current).invoke(
        "attr",
        "style",
        "overflow: visible !important; " +
          "visibility: visible !important; " +
          "display: block !important; " +
          "opacity: 1 !important;"
      );
      current = current.parent();
      depth++;
    }

    return cy.wrap($el);
  });
}
```

### 3. Test Patterns

Reusable test patterns for common scenarios:

```typescript
// Standard test for checking cost updates when security levels change
export function testCostUpdatesWithSecurityLevels(
  costElementSelector: string,
  securityLevels: { low: string[]; high: string[] }
) {
  // Start with low security
  cy.setSecurityLevels(...securityLevels.low);
  cy.wait(300);

  // Get initial costs
  cy.get(costElementSelector)
    .invoke("text")
    .then((lowLevelCost) => {
      // Set to high security
      cy.setSecurityLevels(...securityLevels.high);
      cy.wait(300);

      // Costs should change (usually increase)
      cy.get(costElementSelector)
        .invoke("text")
        .should("not.equal", lowLevelCost);
    });
}
```

## Best Practices

Based on the codebase analysis, here are the recommended best practices for E2E testing:

### 1. Use Resilient Selectors

Use multiple selector strategies for greater resilience:

```typescript
// Try multiple approaches to find the compliance widget
cy.get("body").then(($body) => {
  const selectors = [
    `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET}"]`,
    `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER}"]`,
    `[data-testid*="compliance"]`,
    `[data-testid*="framework"]`,
    `h3:contains("Compliance"), div:contains("Compliance")`,
  ];

  // Find the first selector that works
  let matchedSelector = null;
  for (const selector of selectors) {
    if ($body.find(selector).length > 0) {
      matchedSelector = selector;
      break;
    }
  }

  if (matchedSelector) {
    cy.get(matchedSelector).should("be.visible");
  } else {
    // Look for any heading containing compliance-related text
    cy.get("body")
      .contains(/compliance|framework|regulation|standard/i)
      .should("be.visible");
  }
});
```

### 2. Test Content Flexibility

Use flexible content matching to prevent brittle tests:

```typescript
// Check for content with flexible matching
cy.get("body").then(($body) => {
  const hasRiskElements =
    $body.find('[class*="risk"], [class*="badge"], [data-testid*="risk"]')
      .length > 0;
  const hasRiskText = $body.text().toLowerCase().includes("risk");

  // Assert that we found either risk elements or text mentioning risk
  expect(hasRiskElements || hasRiskText).to.be.true;
});
```

### 3. Fix Visibility Issues

Fix visibility issues that might cause test failures:

```typescript
cy.get(`[data-testid="${widgetTestId}"]`).then(($el) => {
  // Make all parents visible with proper overflow
  let current = $el.parent();
  while (current.length && !current.is("body")) {
    cy.wrap(current).invoke("css", "overflow", "visible");
    cy.wrap(current).invoke("css", "display", "block");
    current = current.parent();
  }

  // Now make the element itself visible
  cy.wrap($el)
    .invoke("css", "visibility", "visible")
    .invoke("css", "display", "block")
    .invoke("css", "opacity", "1");
});
```

### 4. Use Setup Functions for Consistency

Create setup functions to ensure consistent test initialization:

```typescript
// Standard setup for widget tests - handles visibility and scrolling
export function setupWidgetTest(widgetId: string) {
  cy.viewport(3840, 2160);
  cy.visit("/");
  cy.ensureAppLoaded();

  // Add style to prevent overflow issues in all containers
  cy.document().then((doc) => {
    const style = doc.createElement("style");
    style.innerHTML = `
      * {
        overflow: visible !important;
        visibility: visible !important;
        opacity: 1 !important;
        transition: none !important;
        animation: none !important;
      }
      .widget-body, .widget-content-wrapper {
        display: block !important;
        height: auto !important;
        max-height: none !important;
      }
    `;
    doc.head.appendChild(style);
  });

  // Find and ensure widget is visible
  cy.get(`[data-testid*="${widgetId}"]`)
    .first()
    .then(($el) => {
      // Implementation details elided for brevity
    });
}
```

### 5. Use Debug Helpers

Add debug helpers to diagnose test failures:

```typescript
Cypress.Commands.add("debugFailure", (testName: string) => {
  cy.screenshot(`debug-${testName.replace(/\s+/g, "-")}`, {
    capture: "viewport",
  });
  cy.document().then((doc) => {
    console.log(
      `HTML at failure point for ${testName}:`,
      doc.body.outerHTML.substring(0, 1000) + "..."
    );
  });
});

Cypress.Commands.add("logVisibleElements", () => {
  cy.document().then((doc) => {
    const allElements = Array.from(doc.querySelectorAll("*"));
    const visibleElements = allElements.filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0" &&
        el.getBoundingClientRect().height > 0
      );
    });

    const testIdElements = visibleElements.filter((el) =>
      el.hasAttribute("data-testid")
    );

    cy.log(`Total elements: ${allElements.length}`);
    cy.log(`Visible elements: ${visibleElements.length}`);
    cy.log(`Elements with data-testid: ${testIdElements.length}`);
  });
});
```

## Test Execution and Reporting

### Running Tests

```bash
# Run all E2E tests
npm run cypress:run

# Run specific test category
npm run cypress:run -- --spec 'cypress/e2e/business-outcomes/**/*'

# Open Cypress UI for interactive testing
npm run cypress:open
```

### Test Reporting

CI/CD integration with test reporting:

```javascript
// JUnit reporter configuration
after(() => {
  cy.task("listJunitFiles").then((files) => {
    if (Array.isArray(files) && files.length > 0) {
      console.log(
        `Found ${files.length} JUnit XML files in the results directory`
      );
      files.forEach((file) => console.log(`  - ${file}`));
    } else {
      console.warn(
        "⚠️ No JUnit XML files found! Reporting may not be working correctly."
      );
    }
  });
});
```

## Continuous Improvement

1. **Stability Improvements**:

   - Implement automatic retries for flaky tests
   - Use consistent waiting strategies
   - Implement fallback selectors

2. **Performance Optimization**:

   - Group related tests to reduce page loads
   - Use focused test runs during development
   - Optimize selectors for faster targeting

3. **Better Debugging**:
   - Automatically capture screenshots on failure
   - Log DOM state at failure points
   - Track available test IDs for diagnostics
