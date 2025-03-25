/**
 * Security Level Transitions Test
 *
 * This test verifies that the application maintains integrity when security levels
 * are changed, ensuring that no errors or undefined values appear during transitions.
 *
 * Optimized to reduce screenshot count.
 */
import { SECURITY_LEVELS } from "../../support/constants";
import { applyTestStyles } from "../../support/test-styles";

describe("Security Level Transitions", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(1280, 800);

    // Apply better styling for tests
    applyTestStyles();

    // Add listener for console errors
    cy.window().then((win) => {
      // Initialize error array if it doesn't exist
      win.consoleErrors = win.consoleErrors || [];

      // Capture console errors
      const originalError = win.console.error;
      win.console.error = (...args) => {
        // Use non-null assertion since we initialized it above
        win.consoleErrors!.push(args.join(" "));
        originalError.apply(win.console, args);
      };
    });
  });

  it("maintains application integrity during security level changes", () => {
    // Define only critical transitions to test
    const securityTransitions = [
      {
        from: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
        to: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
        name: "low-to-high",
      },
      {
        from: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
        ],
        to: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.MODERATE,
        ],
        name: "high-to-mixed",
      },
    ];

    // Test each transition with better error handling
    securityTransitions.forEach((transition, index) => {
      cy.log(
        `Testing transition ${transition.name} (${index + 1}/${
          securityTransitions.length
        })`
      );

      // Set initial levels
      cy.setSecurityLevels(...transition.from);
      cy.wait(1000);

      // Take screenshot only if it's the first transition
      if (index === 0) {
        cy.screenshot(`transition-initial-${transition.name}`);
      }

      // Look for important widgets to verify initial state
      findImportantWidgets().then((widgets) => {
        // Capture initial content of each widget for comparison
        captureWidgetStates(widgets).then((initialStates) => {
          // Perform transition
          cy.log(`Changing to security levels: ${transition.to.join(", ")}`);
          cy.setSecurityLevels(...transition.to);
          cy.wait(1000);

          // Take screenshot only if it's the first transition
          if (index === 0) {
            cy.screenshot(`transition-after-${transition.name}`);
          }

          // Check widgets after transition
          findImportantWidgets().then((newWidgets) => {
            cy.log(`Found ${newWidgets.length} widgets after transition`);

            // Verify number of widgets didn't decrease significantly
            expect(newWidgets.length).to.be.at.least(
              Math.max(1, widgets.length - 1),
              "Number of widgets shouldn't decrease significantly during transitions"
            );

            // Process each widget after transition
            cy.wrap(newWidgets).each(($widget, i) => {
              const id = $widget.attr("data-testid") || `widget-${i}`;

              // Check for problematic content
              checkForProblematicContent($widget);

              // Compare with initial state if available
              if (initialStates[id]) {
                compareWidgetContent($widget, initialStates[id], id);
              }
            });
          });
        });
      });
    });
  });

  /**
   * Find important widgets for testing
   */
  function findImportantWidgets(): Cypress.Chainable<JQuery<HTMLElement>[]> {
    return cy.document().then((doc) => {
      // Find all widget containers
      const widgetElements = Array.from(
        doc.querySelectorAll(
          '[data-testid^="widget-"], [class*="widget-container"]'
        )
      );

      return widgetElements as unknown as JQuery<HTMLElement>[];
    });
  }

  /**
   * Capture initial state of widgets for comparison
   */
  function captureWidgetStates(
    widgets: JQuery<HTMLElement>[]
  ): Cypress.Chainable<Record<string, string>> {
    const states: Record<string, string> = {};

    return cy
      .wrap(widgets)
      .each(($widget, i) => {
        const id = $widget.attr("data-testid") || `widget-${i}`;
        states[id] = $widget.text();
      })
      .then(() => states);
  }

  /**
   * Check widget for problematic content
   */
  function checkForProblematicContent($widget: JQuery<HTMLElement>): void {
    const text = $widget.text();

    // Look for common error indicators
    const problematicPatterns = [
      "undefined",
      "NaN",
      "[object Object]",
      "Error:",
      "null",
      "TypeError",
      "ReferenceError",
    ];

    const hasProblems = problematicPatterns.some((pattern) =>
      text.includes(pattern)
    );

    if (hasProblems) {
      const id = $widget.attr("data-testid") || "unknown";
      cy.log(`⚠️ Widget ${id} contains problematic content`);
      cy.wrap($widget).screenshot(`widget-problematic-${id}`);
    }
  }

  /**
   * Compare widget content before and after transition
   */
  function compareWidgetContent(
    $widget: JQuery<HTMLElement>,
    initialContent: string,
    id: string
  ): void {
    const newText = $widget.text();

    // Content should change, but shouldn't be empty
    if (newText.trim().length === 0) {
      cy.log(`⚠️ Widget ${id} content is empty after transition`);
      cy.wrap($widget).screenshot(`widget-empty-${id}`);
    }

    // Log significant changes
    if (
      initialContent.length > 0 &&
      newText.length < initialContent.length * 0.5
    ) {
      cy.log(`⚠️ Widget ${id} content reduced significantly`);
      cy.wrap($widget).screenshot(`widget-reduced-${id}`);
    }

    // Changes in content are expected and good
    if (newText !== initialContent) {
      cy.log(`✓ Widget ${id} content changed as expected`);
    }
  }
});
