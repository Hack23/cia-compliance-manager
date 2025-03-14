/**
 * Enhanced test commands for resilient testing
 */

// Enhanced version of setSecurityLevel that tries multiple strategies
Cypress.Commands.add(
  "selectSecurityLevelEnhanced",
  (
    category: "availability" | "integrity" | "confidentiality",
    level: string
  ) => {
    // Find security level controls section
    cy.findSecurityLevelControls().within(() => {
      // Try to find the specific category section
      cy.get(`[data-testid*="${category}"]`).then(($section) => {
        if ($section.length > 0) {
          // If found, find select within this section
          cy.wrap($section).find("select").select(level, { force: true });
        } else {
          // Fallback: try to identify by position or label text
          cy.get("select").each(($select) => {
            const $label = $select.prev("label");
            const labelText = $label.text().toLowerCase();

            if (labelText.includes(category)) {
              cy.wrap($select).select(level, { force: true });
            }
          });
        }
      });
    });
  }
);

// Helper to wait for content to appear
Cypress.Commands.add(
  "waitForContent",
  (
    contentPattern: string | RegExp,
    options?: { timeout: number }
  ): Cypress.Chainable<boolean> => {
    const timeout = options?.timeout || 10000;

    return cy
      .get("body", { timeout })
      .should(($body) => {
        const text = $body.text();
        const matched =
          typeof contentPattern === "string"
            ? text.includes(contentPattern)
            : contentPattern.test(text);

        expect(matched, `Expected to find "${contentPattern}" in page text`).to
          .be.true;
      })
      .then(() => true);
  }
);

// Try to click a button matching text pattern
Cypress.Commands.add(
  "tryClickButton",
  (textOrPattern: string | RegExp): Cypress.Chainable<boolean> => {
    return cy.get("body").then(($body) => {
      const buttons = $body.find("button");
      let clicked = false;

      buttons.each((_, button) => {
        const $button = Cypress.$(button);
        const buttonText = $button.text();

        if (
          (typeof textOrPattern === "string" &&
            buttonText.includes(textOrPattern)) ||
          (textOrPattern instanceof RegExp && textOrPattern.test(buttonText))
        ) {
          cy.wrap($button).click({ force: true });
          clicked = true;
          return false; // break the each loop
        }
      });

      return clicked;
    });
  }
);

// Wait for app stability (useful before assertions)
// Fix: Change return type to Cypress.Chainable<void> to match expected type
Cypress.Commands.add(
  "waitForAppStability",
  (timeout: number = 1000): Cypress.Chainable<void> => {
    // Return type is now void to match the expected type
    return cy.wait(timeout);
  }
);

// Check if element exists without failing test if not found
// Fix: Make selector parameter required by removing optional marker
Cypress.Commands.add(
  "doesExist",
  (selector: string): Cypress.Chainable<boolean> => {
    return cy.get("body").then(($body) => {
      return $body.find(selector).length > 0;
    });
  }
);

// Check if page contains any of the provided text patterns
Cypress.Commands.add(
  "containsAnyText",
  (patterns: Array<RegExp | string>): Cypress.Chainable<boolean> => {
    return cy.get("body").then(($body) => {
      const text = $body.text();

      for (const pattern of patterns) {
        if (
          (typeof pattern === "string" && text.includes(pattern)) ||
          (pattern instanceof RegExp && pattern.test(text))
        ) {
          return true;
        }
      }

      return false;
    });
  }
);

// Override scrollIntoView to handle force option properly
// Fix: Correct type definitions to match Cypress expectations
Cypress.Commands.add(
  "safeScrollIntoView",
  { prevSubject: ["element"] },
  (
    subject: JQuery<HTMLElement>,
    options?: Partial<Cypress.ScrollIntoViewOptions>
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    // Use Cypress.ScrollIntoViewOptions to ensure compatibility
    return cy.wrap(subject).scrollIntoView({
      ...options,
      duration: options?.duration || 100,
    });
  }
);

// Verify widget with specific content
// Fix: Return type to Cypress.Chainable<void> to match expected type
Cypress.Commands.add(
  "verifyWidgetWithContent",
  (widgetTestId: string, expectedContent: string): Cypress.Chainable<void> => {
    return cy
      .get(`[data-testid="${widgetTestId}"]`)
      .should("exist")
      .scrollIntoView()
      .contains(expectedContent)
      .should("be.visible");
  }
);

// Force element to be visible for testing
// Fix: Use ['element'] instead of 'element' for prevSubject
Cypress.Commands.add(
  "forceVisible",
  { prevSubject: ["element"] },
  (subject: JQuery<HTMLElement>): Cypress.Chainable<JQuery<HTMLElement>> => {
    const $el = subject;

    if ($el.length) {
      $el.attr(
        "style",
        "display: block !important; opacity: 1 !important; visibility: visible !important;"
      );
    }

    return cy.wrap($el);
  }
);

// Export empty to satisfy TypeScript
export {};
