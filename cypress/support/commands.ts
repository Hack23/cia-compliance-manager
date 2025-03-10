import {
  TEST_IDS,
  getTestSelector,
  CIA_TEST_IDS,
  WIDGET_TEST_IDS,
} from "./constants";

// DO NOT declare types here - they are in types.d.ts
// Remove all "declare global" blocks

// Define command implementations

/**
 * Custom command to set security levels for all CIA components
 * with enhanced reliability for large viewports
 */
Cypress.Commands.add(
  "setSecurityLevels",
  (availability: string, integrity: string, confidentiality: string) => {
    // First try to find the security controls container with more flexible selectors
    cy.get("body").then(($body) => {
      // Try different possible selectors for the security controls container
      const selectors = [
        "[data-testid='security-level-controls']",
        "[data-testid='security-level-selector']",
        "[data-testid='widget-security-level']",
        "[data-testid='widget-security-level-selection']",
        // Fallback to any element containing the security selects
        "div:has([data-testid='confidentiality-select'])",
      ];

      // Find the first selector that exists
      const existingSelector = selectors.find(
        (sel) => $body.find(sel).length > 0
      );

      if (existingSelector) {
        cy.get(existingSelector)
          .scrollIntoView({ duration: 100 })
          .should("be.visible")
          .wait(300);
      } else {
        // If no container found, log and proceed trying to find the individual selects directly
        cy.log(
          "Could not find security level controls container, trying to set values directly"
        );
      }
    });

    // Set availability level with retry logic
    cy.get("[data-testid='availability-select']")
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .then(($el) => {
        if (!$el.is(":disabled")) {
          cy.wrap($el).select(availability, { force: true });
        } else {
          cy.log("Availability select is disabled, waiting...");
          cy.wait(300);
          cy.wrap($el)
            .should("not.be.disabled")
            .select(availability, { force: true });
        }
      })
      .wait(200);

    // Set integrity level with retry logic
    cy.get("[data-testid='integrity-select']")
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .then(($el) => {
        if (!$el.is(":disabled")) {
          cy.wrap($el).select(integrity, { force: true });
        } else {
          cy.log("Integrity select is disabled, waiting...");
          cy.wait(300);
          cy.wrap($el)
            .should("not.be.disabled")
            .select(integrity, { force: true });
        }
      })
      .wait(200);

    // Set confidentiality level with retry logic
    cy.get("[data-testid='confidentiality-select']")
      .should("exist")
      .scrollIntoView()
      .should("be.visible")
      .then(($el) => {
        if (!$el.is(":disabled")) {
          cy.wrap($el).select(confidentiality, { force: true });
        } else {
          cy.log("Confidentiality select is disabled, waiting...");
          cy.wait(300);
          cy.wrap($el)
            .should("not.be.disabled")
            .select(confidentiality, { force: true });
        }
      });

    // Wait for UI to update after all selections
    cy.wait(300);
  }
);

/**
 * Ensures app is loaded with enhanced viewport awareness
 */
Cypress.Commands.add("ensureAppLoaded", () => {
  // Set a large viewport for better visibility
  cy.viewport(3840, 2160);

  // Wait for the app to initialize
  cy.get("body", { timeout: 5000 }) // Reduced timeout
    .should("not.be.empty");

  // Check that main app container exists and is visible
  cy.get(getTestSelector(TEST_IDS.APP_CONTAINER), {
    timeout: 5000, // Reduced timeout
  })
    .should("exist")
    .and("be.visible");

  // Wait for any initial animations or loading to complete
  cy.wait(500); // Reduced wait time

  return cy.wrap(true);
});

/**
 * Retrieves a test ID with proper escaping
 */
Cypress.Commands.add("getByTestId", (selector: string) => {
  return cy.get(`[data-testid="${selector}"]`);
});

/**
 * Navigate to a specific widget with enhanced reliability
 */
Cypress.Commands.add("navigateToWidget", (widgetTestId: string) => {
  // First check if element exists at all
  cy.get("body").then(($body) => {
    const exists = $body.find(`[data-testid="${widgetTestId}"]`).length > 0;

    if (exists) {
      // Fix containers with overflow issues
      cy.get(`[data-testid="${widgetTestId}"]`)
        .parents()
        .each(($el) => {
          // Remove overflow restriction on all parent elements
          cy.wrap($el).invoke("css", "overflow", "visible");
        });

      // Now try to interact with element
      cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 5000 })
        .should("exist")
        .scrollIntoView({ duration: 100, offset: { top: -100, left: 0 } })
        .invoke("css", "visibility", "visible")
        .invoke("css", "opacity", "1")
        .should("be.visible")
        .wait(300);
    } else {
      // Log helpful error for missing elements
      cy.log(`Widget with testId "${widgetTestId}" not found in the DOM`);
      // Take screenshot for debugging
      cy.screenshot(`missing-element-${widgetTestId}`);
      // Continue the test - will fail naturally when element is used
    }
  });
});

/**
 * Enhanced security level selection with fallbacks
 */
Cypress.Commands.add(
  "selectSecurityLevelEnhanced",
  (
    category: "availability" | "integrity" | "confidentiality",
    level: string
  ) => {
    // Primary selector patterns to try (from most specific to most generic)
    const selectors = [
      // Primary test ID format
      `[data-testid="${category}-select"]`,
      // Alternative formats using CIA_TEST_IDS constants
      `[data-testid="${
        CIA_TEST_IDS[
          `${category.toUpperCase()}_SELECT` as keyof typeof CIA_TEST_IDS
        ]
      }"]`,
      `[data-testid="${
        CIA_TEST_IDS[
          `${category.toUpperCase()}_SECTION` as keyof typeof CIA_TEST_IDS
        ]
      }"] select`,
      // Last resort - index-based approach
      `${getTestSelector(WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET)} select`,
      `[data-testid="widget-security-level-selection"] select`,
      `[data-testid="security-level-controls"] select`,
    ];

    // Index fallback for generic select elements as last resort
    let index = 0;
    if (category === "integrity") index = 1;
    if (category === "confidentiality") index = 2;

    // Try each selector in sequence until we find one that works
    cy.get("body").then(($body) => {
      // Find first matching selector that exists in the DOM
      const existingSelector = selectors.find(
        (selector) => $body.find(selector).length > 0
      );

      if (existingSelector) {
        // Use the first working selector
        cy.get(existingSelector, { timeout: 5000 })
          .scrollIntoView()
          .should("be.visible")
          .select(level, { force: true });
      } else {
        // Last resort - use index-based selection
        cy.log(`Using fallback index-based selection for ${category}`);
        cy.get("select", { timeout: 5000 })
          .eq(index)
          .scrollIntoView()
          .select(level, { force: true });
      }
    });
  }
);

/**
 * Try to click a button matching text pattern
 */
Cypress.Commands.add("tryClickButton", (textOrPattern: string | RegExp) => {
  const pattern =
    textOrPattern instanceof RegExp
      ? textOrPattern
      : new RegExp(textOrPattern, "i");

  return cy.get("button", { timeout: 5000 }).then(($buttons) => {
    const $matchingButton = $buttons.filter((_, el) => {
      return pattern.test(el.textContent || "");
    });

    if ($matchingButton.length) {
      cy.wrap($matchingButton).first().click({ force: true });
      return cy.wrap(true);
    } else {
      return cy.wrap(false);
    }
  });
});

/**
 * Wait for content to appear
 */
Cypress.Commands.add(
  "waitForContent",
  (contentPattern: string | RegExp, options = { timeout: 10000 }) => {
    const pattern =
      contentPattern instanceof RegExp
        ? contentPattern
        : new RegExp(contentPattern, "i");

    const checkContent = () => {
      return cy
        .get("body")
        .invoke("text")
        .then((text) => pattern.test(text));
    };

    return cy.waitUntil(checkContent, {
      timeout: options.timeout,
      interval: 500,
      errorMsg: `Timed out waiting for content matching: ${contentPattern}`,
    });
  }
);

/**
 * Tab navigation
 */
Cypress.Commands.add("tab", { prevSubject: ["element"] }, (subject: JQuery) => {
  cy.wrap(subject).trigger("keydown", {
    keyCode: 9,
    which: 9,
    key: "Tab",
    code: "Tab",
    bubbles: true,
  });

  return cy.focused();
});

/**
 * Verify widget has specific content
 */
Cypress.Commands.add(
  "verifyWidgetWithContent",
  (widgetTestId: string, expectedContent: string) => {
    cy.get(`[data-testid="${widgetTestId}"]`, { timeout: 10000 })
      .should("be.visible")
      .invoke("text")
      .should("include", expectedContent);
  }
);

/**
 * Wait for app stability
 */
Cypress.Commands.add("waitForAppStability", (timeout = 2000) => {
  cy.wait(timeout);
});

/**
 * Check if element exists
 */
Cypress.Commands.add(
  "doesExist",
  { prevSubject: "optional" },
  (subject, selector) => {
    if (selector) {
      return cy.get("body").then(($body) => {
        const elements = $body.find(selector);
        return cy.wrap(Boolean(elements && elements.length > 0));
      });
    } else if (subject) {
      return cy.wrap(subject).then((el: any) => {
        return cy.wrap(Boolean(el && el.length > 0));
      });
    } else {
      return cy.wrap(false);
    }
  }
);

/**
 * Check if page contains any matching text patterns
 */
Cypress.Commands.add("containsAnyText", (patterns: Array<RegExp | string>) => {
  return cy.get("body").then(($body) => {
    const bodyText = $body.text();
    const regexPatterns = patterns.map((pattern) =>
      typeof pattern === "string" ? new RegExp(pattern, "i") : pattern
    );
    return cy.wrap(regexPatterns.some((pattern) => pattern.test(bodyText)));
  });
});

/**
 * Safe scrollIntoView that properly handles the force option
 * without TypeScript errors
 */
Cypress.Commands.add(
  "safeScrollIntoView",
  { prevSubject: "element" },
  (subject, options = {}) => {
    // Fix: Use proper ScrollIntoViewOptions with valid ScrollLogicalPosition values
    const defaultOptions = {
      block: "center" as ScrollLogicalPosition,
      behavior: "smooth" as ScrollBehavior,
      ...options,
    };

    cy.wrap(subject).then(($el) => {
      // Use native scrollIntoView with fallback
      try {
        $el[0].scrollIntoView(defaultOptions);
      } catch (err) {
        // Fallback to simpler version if the browser doesn't support options
        $el[0].scrollIntoView();
      }
    });

    // Add a short wait after scrolling to let animations complete
    cy.wait(300);

    return cy.wrap(subject);
  }
);

/**
 * List JUnit files in the results directory
 */
Cypress.Commands.add("listJunitFiles", () => {
  cy.task<string[]>("listJunitFiles").then((files) => {
    if (Array.isArray(files)) {
      // Now TypeScript knows files is a string array
      console.log(`Found ${files.length} JUnit files`);
      return files;
    }
    return [];
  });
});

// Add type declaration for listJunitFiles and fix type issues with 'files'

// Add this near the top of the file, after imports but before command definitions
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to list JUnit files
       */
      listJunitFiles(): Chainable<string[]>;
    }
  }
}

// Define a custom type definition for the Chainable interface
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      forceVisible(): Chainable<Subject>;
      isReactHydrated(): Chainable<boolean>;
      isVisible(): Chainable<boolean>;
      /**
       * Navigate to app and ensure it's loaded properly
       */
      ensureAppLoaded(): void;

      /**
       * Safe scroll into view that handles errors
       */
      safeScrollIntoView(
        options?: Partial<Cypress.ScrollToOptions>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

/**
 * Force element to be visible
 */
Cypress.Commands.add(
  "forceVisible",
  { prevSubject: ["element"] },
  (subject: JQuery<HTMLElement>) => {
    return cy
      .wrap(subject)
      .invoke(
        "attr",
        "style",
        "display: block !important; visibility: visible !important;"
      );
  }
);

/**
 * Check if React app is hydrated
 */
Cypress.Commands.add("isReactHydrated", () => {
  return cy.window().then((win) => {
    return cy.wrap(!!(win as any).__REACT_HYDRATED__);
  });
});

/**
 * Check if element is visible using IntersectionObserver
 */
Cypress.Commands.add(
  "isVisible",
  { prevSubject: ["element"] },
  (subject: JQuery<HTMLElement>) => {
    return cy.wrap(subject).then(($el) => {
      const el = $el[0];
      return new Promise<boolean>((resolve) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              resolve(entry.isIntersecting);
              observer.disconnect();
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      }).then((isVisible) => isVisible); // Directly return the boolean value
    });
  }
);

// Export empty object at the end
export {};
