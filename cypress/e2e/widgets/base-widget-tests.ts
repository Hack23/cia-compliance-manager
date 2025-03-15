import { SECURITY_LEVELS } from "../../support/constants";

/**
 * Standard setup for all widget tests with improved handling
 * @param widgetName Name of the widget to test
 * @param options Configuration options for the widget test
 */
export function setupWidgetTest(
  widgetName: string,
  options: Record<string, any> = {}
) {
  beforeEach(() => {
    // Log which widget we're setting up to use the widgetName parameter
    cy.log(`Setting up test for "${widgetName}" widget`);

    cy.visit("/");
    cy.ensureAppLoaded();

    // Apply custom viewport if provided in options, otherwise use default
    const viewportWidth = options.viewportWidth || 1920;
    const viewportHeight = options.viewportHeight || 1080;
    cy.viewport(viewportWidth, viewportHeight);

    // Wait longer for initial app load
    cy.wait(1000);

    // Add style to make all widgets visible
    cy.document().then((doc) => {
      const style = doc.createElement("style");
      style.innerHTML = `
        .widget {
          max-height: none !important;
        }
        [data-testid*="widget"] {
          display: block !important;
          opacity: 1 !important; 
          visibility: visible !important;
        }
      `;
      doc.head.appendChild(style);
    });

    // Set high security levels to ensure all widgets are visible
    cy.log(`Setting high security levels for "${widgetName}" widget test`);
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait for security level changes to take effect
    cy.wait(1000);
  });

  // Add error handling for after test completion
  afterEach(function () {
    if (this.currentTest?.state === "failed") {
      cy.log(
        `Test "${this.currentTest.title}" failed for "${widgetName}" widget - capturing debug info`
      );
      cy.debugFailedTest(this.currentTest.title);
    }
  });
}

/**
 * Verifies that a widget exists on the page
 * @param widgetName Name of the widget to check
 */
export function verifyWidgetExists(widgetName: string) {
  it(`${widgetName} widget should exist`, () => {
    cy.findWidget(widgetName).should("exist").scrollIntoView();

    cy.findWidget(widgetName).then(($widget) => {
      // Verify widget has content
      expect($widget.text().trim().length).to.be.greaterThan(0);
    });
  });
}

/**
 * Verifies that a widget updates its content when security levels change
 * @param widgetName Name of the widget to check
 * @param contentPatterns Array of patterns to check in the widget content
 */
export function verifyWidgetUpdatesWithSecurityLevels(
  widgetName: string,
  contentPatterns: Array<string | RegExp> = []
) {
  it(`updates content when security levels change`, () => {
    // Find the widget
    cy.findWidget(widgetName).scrollIntoView();

    // Capture initial content with proper typing and closure approach
    let initialContent = "";

    cy.findWidget(widgetName)
      .invoke("text")
      .then((text) => {
        // Store text content in our closure variable
        initialContent = String(text);

        // Now set security to LOW
        cy.setSecurityLevels(
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW
        );

        cy.wait(500); // Wait for updates

        // Change to HIGH security
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );

        cy.wait(500); // Wait for updates

        // Compare with the captured initialContent directly
        cy.findWidget(widgetName)
          .invoke("text")
          .then((newText) => {
            const newTextStr = String(newText);

            // Content should change after security level update
            expect(newTextStr).not.to.equal(initialContent);

            // If content patterns provided, check for them
            if (contentPatterns.length > 0) {
              const hasAnyPattern = contentPatterns.some((pattern) => {
                if (typeof pattern === "string") {
                  return newTextStr.includes(pattern);
                } else {
                  return pattern.test(newTextStr);
                }
              });

              // Verify at least one pattern matches
              expect(hasAnyPattern).to.be.true;
            }
          });
      });
  });
}

/**
 * Export all test utility functions
 */
export default {
  setupWidgetTest,
  verifyWidgetExists,
  verifyWidgetUpdatesWithSecurityLevels,
};
