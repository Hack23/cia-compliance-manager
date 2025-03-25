import { SECURITY_LEVELS, TEXT_PATTERNS } from "./constants";

// Define a local createSelector function since it's not exported from constants
const createSelector = {
  forWidget: (widgetName: string): string => {
    return `[data-testid*="${widgetName}"], [class*="${widgetName}-widget"], [class*="widget-${widgetName}"]`;
  },
  forComponent: (componentName: string): string => {
    return `[data-testid*="${componentName}"], [class*="${componentName}"]`;
  },
};

/**
 * Common test patterns for widget testing
 */
export const TEST_PATTERNS = {
  /**
   * Test if a widget exists and is visible
   * @param widgetName The name of the widget to check
   */
  widgetExists: (widgetName: string): void => {
    cy.get(createSelector.forWidget(widgetName))
      .should("exist")
      .and("be.visible");
  },

  /**
   * Test if a widget contains expected text
   * @param widgetName The name of the widget
   * @param textPattern The text pattern to check for
   */
  widgetContainsText: (
    widgetName: string,
    textPattern: string | RegExp
  ): void => {
    cy.get(createSelector.forWidget(widgetName)).should(
      "contain.text",
      textPattern
    );
  },

  /**
   * Test if widget content updates when security levels change
   * @param widgetName The name of the widget to test
   */
  widgetRespondsToSecurityChanges: (widgetName: string): void => {
    // Get widget and capture initial text
    cy.get(createSelector.forWidget(widgetName))
      .invoke("text")
      .then((initialText) => {
        // Change security levels
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        // Wait for updates
        cy.wait(500);

        // Verify content changed
        cy.get(createSelector.forWidget(widgetName))
          .invoke("text")
          .should("not.eq", initialText);
      });
  },

  /**
   * Test if a widget shows appropriate content for a component
   * @param widgetName The name of the widget to test
   * @param component The component to check for (availability, integrity, confidentiality)
   */
  widgetShowsComponentContent: (
    widgetName: string,
    component: "availability" | "integrity" | "confidentiality"
  ): void => {
    // Get the appropriate text pattern for the component
    const pattern =
      component === "availability"
        ? TEXT_PATTERNS.AVAILABILITY
        : component === "integrity"
        ? TEXT_PATTERNS.INTEGRITY
        : TEXT_PATTERNS.CONFIDENTIALITY;

    // Check if widget contains appropriate text
    cy.get(createSelector.forWidget(widgetName))
      .invoke("text")
      .should("match", pattern);
  },

  /**
   * Test if business impact is appropriate for security level
   * @param level Security level to test
   */
  businessImpactMatchesLevel: (level: string): void => {
    // Set security levels
    cy.setSecurityLevels(level, level, level);

    // Wait for updates
    cy.wait(500);

    // Check business impact content based on level
    cy.get(createSelector.forWidget("business-impact")).then(($widget) => {
      const text = $widget.text().toLowerCase();

      if (level === SECURITY_LEVELS.LOW) {
        expect(text).to.include("minimal") || expect(text).to.include("low");
      } else if (level === SECURITY_LEVELS.MODERATE) {
        expect(text).to.include("moderate") ||
          expect(text).to.include("medium");
      } else if (level === SECURITY_LEVELS.HIGH) {
        expect(text).to.include("significant") ||
          expect(text).to.include("high");
      }
    });
  },

  /**
   * Test if compliance status matches security level
   * @param level Security level to test
   */
  complianceMatchesLevel: (level: string): void => {
    // Set security levels
    cy.setSecurityLevels(level, level, level);

    // Wait for updates
    cy.wait(500);

    // Check compliance content based on level
    cy.get(createSelector.forWidget("compliance-status")).then(($widget) => {
      const text = $widget.text().toLowerCase();

      if (level === SECURITY_LEVELS.LOW) {
        expect(text).to.match(/minimal|basic|non-compliant|low/i);
      } else if (level === SECURITY_LEVELS.MODERATE) {
        expect(text).to.match(/moderate|partial|some|medium/i);
      } else if (level === SECURITY_LEVELS.HIGH) {
        expect(text).to.match(/compliant|high|meets|sufficient/i);
      }
    });
  },
};

/**
 * Test if widget content updates when security levels change
 * @param widgetSelector The selector for the widget to test
 */
export function testWidgetUpdatesWithSecurityLevels(
  widgetSelector: string
): void {
  it(`${widgetSelector} updates content when security levels change`, () => {
    // Find widget first to verify it exists
    cy.get(widgetSelector)
      .should("exist")
      .then(($widget) => {
        // Get initial content
        const initialContent = $widget.text();

        // Set to low security
        cy.setSecurityLevels("Low", "Low", "Low");
        cy.wait(1000);

        // Get content at low security
        cy.get(widgetSelector).then(($lowWidget) => {
          const lowContent = $lowWidget.text();

          // Change to high security
          cy.setSecurityLevels("High", "High", "High");
          cy.wait(1000);

          // Get content at high security
          cy.get(widgetSelector).then(($highWidget) => {
            const highContent = $highWidget.text();

            // Verify content changes with security levels
            expect(lowContent).not.to.equal(highContent);
          });
        });
      });
  });
}

/**
 * Generate complete test suite for a widget
 * @param widgetName Name of the widget to test
 */
export function generateWidgetTests(widgetName: string): void {
  describe(`${widgetName} Widget Tests`, () => {
    beforeEach(() => {
      cy.visit("/");
      cy.ensureAppLoaded();
    });

    it("should exist and be visible", () => {
      TEST_PATTERNS.widgetExists(widgetName);
    });

    it("should update content when security levels change", () => {
      TEST_PATTERNS.widgetRespondsToSecurityChanges(widgetName);
    });

    it("should show different content at different security levels", () => {
      // Test at low security
      cy.setSecurityLevels(
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.LOW
      );
      cy.wait(500);
      cy.get(createSelector.forWidget(widgetName)).screenshot(
        `${widgetName}-low-security`
      );

      // Test at high security
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );
      cy.wait(500);
      cy.get(createSelector.forWidget(widgetName)).screenshot(
        `${widgetName}-high-security`
      );

      // Visual and text differences should exist
      cy.get(createSelector.forWidget(widgetName)).then(($highWidget) => {
        const highText = $highWidget.text();

        // Change back to low and compare
        cy.setSecurityLevels(
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW
        );
        cy.wait(500);

        cy.get(createSelector.forWidget(widgetName)).then(($lowWidget) => {
          const lowText = $lowWidget.text();
          expect(highText).not.to.equal(lowText);
        });
      });
    });
  });
}

/**
 * Test if a security level selector is working correctly
 */
export function testSecurityLevelSelector(): void {
  describe("Security Level Selector", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.ensureAppLoaded();
    });

    it("should allow selection of different security levels", () => {
      // Test availability selection
      cy.get('[data-testid="availability-select"]').select(
        SECURITY_LEVELS.HIGH
      );
      cy.get('[data-testid="current-availability"]').should(
        "contain",
        SECURITY_LEVELS.HIGH
      );

      // Test integrity selection
      cy.get('[data-testid="integrity-select"]').select(
        SECURITY_LEVELS.MODERATE
      );
      cy.get('[data-testid="current-integrity"]').should(
        "contain",
        SECURITY_LEVELS.MODERATE
      );

      // Test confidentiality selection
      cy.get('[data-testid="confidentiality-select"]').select(
        SECURITY_LEVELS.LOW
      );
      cy.get('[data-testid="current-confidentiality"]').should(
        "contain",
        SECURITY_LEVELS.LOW
      );
    });

    it("should update other widgets when security levels change", () => {
      // Set security levels
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );
      cy.wait(500);

      // Check for updates in summary widget
      cy.get(createSelector.forWidget("security-summary")).should(
        "contain.text",
        SECURITY_LEVELS.HIGH
      );
    });
  });
}

/**
 * Common test patterns used across multiple test files
 * Fix: Remove duplicate imports of SECURITY_LEVELS
 */

/**
 * Generates a standard set of tests for a component
 * @param componentName The name of the component being tested
 * @param selector The CSS selector for the component
 * @param tests A function containing the tests to run
 */
export function generateTests(
  componentName: string,
  selector: string,
  tests: () => void
): void {
  describe(`${componentName} Tests`, () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(selector).should("exist");
    });

    tests();
  });
}

/**
 * Generates a standard set of security level tests
 * @param componentName The name of the component being tested
 * @param selector The CSS selector for the component
 * @param testFn A function to run for each security level
 */
export function generateSecurityTests(
  componentName: string,
  selector: string,
  testFn: (securityLevel: string) => void
): void {
  describe(`${componentName} Security Level Tests`, () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get(selector).should("exist");
    });

    // Use the SECURITY_LEVELS imported at the top
    [
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
    ].forEach((level) => {
      it(`works with ${level} security level`, () => {
        testFn(level);
      });
    });
  });
}
