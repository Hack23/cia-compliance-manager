/**
 * Enhanced test commands for resilient testing
 */

// Enhanced version of setSecurityLevel that tries multiple strategies
// Fix: Use CommandFn signature with string parameter instead of union type
Cypress.Commands.add(
  "selectSecurityLevelEnhanced",
  (category: string, level: string): Cypress.Chainable<void> => {
    // Type guard to validate category at runtime
    if (!["availability", "integrity", "confidentiality"].includes(category)) {
      throw new Error(
        `Invalid category: ${category}. Must be one of: availability, integrity, confidentiality`
      );
    }

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

    // Add void return to satisfy TypeScript
    return cy.wrap(undefined, {
      log: false,
    }) as unknown as Cypress.Chainable<void>;
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
    cy.wait(timeout);
    return cy.wrap(undefined, {
      log: false,
    }) as unknown as Cypress.Chainable<void>;
  }
);

// Check if element exists without failing test if not found
// Fix: Make selector parameter required by removing optional marker
Cypress.Commands.add(
  "doesExist",
  (selector: string): Cypress.Chainable<boolean> => {
    // Ensure selector is required, not optional
    if (!selector) {
      throw new Error("Selector is required");
    }

    return cy.get("body").then(($body) => {
      return $body.find(selector).length > 0;
    }) as unknown as Cypress.Chainable<boolean>;
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
    cy.get(`[data-testid="${widgetTestId}"]`)
      .should("exist")
      .scrollIntoView()
      .contains(expectedContent)
      .should("be.visible");

    return cy.wrap(undefined, {
      log: false,
    }) as unknown as Cypress.Chainable<void>;
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

// Fix for the Chainable<undefined> vs Chainable<void> issue
Cypress.Commands.add("someCommand", (): Cypress.Chainable<void> => {
  // Return type is explicitly void
  cy.log("Command executed");
  // Return cy to maintain chainability with void return type
  return cy.wrap(undefined, {
    log: false,
  }) as unknown as Cypress.Chainable<void>;
});

// Fix the Chainable<JQuery<HTMLElement>> vs Chainable<void>
Cypress.Commands.add(
  "findAndClick",
  (selector: string): Cypress.Chainable<void> => {
    cy.get(selector).click();
    // Return void chainable
    return cy.wrap(undefined, {
      log: false,
    }) as unknown as Cypress.Chainable<void>;
  }
);

// Add command type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Enhanced version of selecting security levels that tries multiple strategies
       * Fixed type to accept string (runtime validation will check specific values)
       */
      selectSecurityLevelEnhanced(
        category: string,
        level: string
      ): Chainable<void>;

      /**
       * Wait for specific content to appear on the page
       */
      waitForContent(
        contentPattern: string | RegExp,
        options?: { timeout: number }
      ): Chainable<boolean>;

      /**
       * Try to click a button that matches text
       */
      tryClickButton(textOrPattern: string | RegExp): Chainable<boolean>;

      /**
       * Wait for application to stabilize
       */
      waitForAppStability(timeout?: number): Chainable<void>;

      /**
       * Check if an element exists without failing
       */
      doesExist(selector: string): Chainable<boolean>;

      /**
       * Check if page contains any of the provided text patterns
       */
      containsAnyText(patterns: Array<string | RegExp>): Chainable<boolean>;

      /**
       * Safely scroll element into view with options
       */
      safeScrollIntoView(
        options?: Partial<ScrollIntoViewOptions>
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Verify widget contains specific content
       */
      verifyWidgetWithContent(
        widgetTestId: string,
        expectedContent: string
      ): Chainable<void>;

      /**
       * Force an element to be visible
       */
      forceVisible(): Chainable<JQuery<HTMLElement>>;

      /**
       * Example command that returns void
       */
      someCommand(): Chainable<void>;

      /**
       * Find and click an element
       */
      findAndClick(selector: string): Chainable<void>;
    }
  }
}

// Export empty to satisfy TypeScript
export {};
