import {
  TEST_IDS,
  getTestSelector,
  CIA_TEST_IDS,
  WIDGET_TEST_IDS,
  WIDGET_PREFIXES,
  FLEXIBLE_TEST_IDS,
} from "./constants";

// Fix for findSecurityLevelControls command
Cypress.Commands.add("findSecurityLevelControls", () => {
  // Try multiple selector strategies, updated to match DOM
  const selectors = [
    '[data-testid="security-level-selector"]', // Primary ID from DOM analysis
    '[data-testid="widget-security-level-selection"]', // Parent widget from DOM
    '[data-testid*="security-level"]',
    '[data-testid="security-controls"]',
    '[data-testid*="security"][data-testid*="level"]',
    'select[name*="security"], select[name*="level"]',
    'form:contains("Security Level")',
  ];

  // Try each selector in order
  return cy.document().then((doc) => {
    // Try each selector until we find a match
    for (const selector of selectors) {
      const elements = doc.querySelectorAll(selector);
      if (elements.length > 0) {
        cy.log(`Found security level controls with selector: ${selector}`);
        return cy.get(selector);
      }
    }

    // If still not found, look for any select elements that might be security controls
    const selects = doc.querySelectorAll("select");
    for (const select of Array.from(selects)) {
      const text = select.textContent?.toLowerCase() || "";
      const id = select.id?.toLowerCase() || "";
      const name = select.getAttribute("name")?.toLowerCase() || "";

      if (
        text.includes("security") ||
        text.includes("level") ||
        id.includes("security") ||
        id.includes("level") ||
        name.includes("security") ||
        name.includes("level")
      ) {
        cy.log(`Found potential security level control: ${select.outerHTML}`);
        return cy.wrap(select) as unknown as Cypress.Chainable<
          JQuery<HTMLElement>
        >;
      }
    }

    // If still not found, log warning and return empty selector
    cy.log("WARNING: Could not find security level controls with any strategy");
    return cy.get("body").find('[data-testid="nonexistent"]', { log: false });
  }) as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
});

// Fix setSecurityLevels command with proper typings
Cypress.Commands.add(
  "setSecurityLevels",
  (availability?: string, integrity?: string, confidentiality?: string) => {
    cy.findSecurityLevelControls().then(($container: JQuery<HTMLElement>) => {
      if ($container.length === 0) {
        cy.log("No security level controls found - test may fail");
        return;
      }

      // Find select elements within the container
      const $selects = $container.find("select");
      const selectCount = $selects.length;

      cy.log(`Found ${selectCount} select elements`);

      // Assuming first select is availability, second is integrity, third is confidentiality
      if (selectCount >= 3) {
        if (availability) {
          cy.wrap($selects.eq(0)).select(availability, { force: true });
        }

        if (integrity) {
          cy.wrap($selects.eq(1)).select(integrity, { force: true });
        }

        if (confidentiality) {
          cy.wrap($selects.eq(2)).select(confidentiality, { force: true });
        }
      } else if (selectCount > 0) {
        // Try to determine which select is which based on labels or other attributes
        $selects.each((i: number, el: HTMLElement) => {
          const $el = Cypress.$(el);
          const label = $el.prev("label").text().toLowerCase() || "";
          const id = $el.attr("id")?.toLowerCase() || "";
          const name = $el.attr("name")?.toLowerCase() || "";

          if (
            (label.includes("avail") ||
              id.includes("avail") ||
              name.includes("avail")) &&
            availability
          ) {
            cy.wrap($el).select(availability, { force: true });
          } else if (
            (label.includes("integ") ||
              id.includes("integ") ||
              name.includes("integ")) &&
            integrity
          ) {
            cy.wrap($el).select(integrity, { force: true });
          } else if (
            (label.includes("conf") ||
              id.includes("conf") ||
              name.includes("conf")) &&
            confidentiality
          ) {
            cy.wrap($el).select(confidentiality, { force: true });
          }
        });
      } else {
        cy.log("No select elements found within security level controls");
      }

      // Wait for any updates to propagate
      cy.wait(300);
    });
  }
);

// Improved findWidget command with more sophisticated DOM analysis
Cypress.Commands.add("findWidget", (widgetName: string) => {
  // Track attempts for better error reporting
  const attemptedSelectors: string[] = [];
  const startTime = performance.now();

  // Import the getWidgetId function from widget-test-helper
  const { getWidgetId } = require("../e2e/widgets/widget-test-helper");

  return cy.get("body").then(($body) => {
    // Get potential widget IDs from the helper function
    const possibleIds = getWidgetId(widgetName);

    // Try each potential widget ID
    for (const id of possibleIds) {
      const selector = `[data-testid="${id}"]`;
      attemptedSelectors.push(selector);

      if ($body.find(selector).length) {
        cy.log(`Found widget "${widgetName}" using selector: ${selector}`);
        return cy.get(selector).first();
      }
    }

    // If still not found, log available test IDs for better debugging
    const availableTestIds = Array.from($body.find("[data-testid]"))
      .map((el) => el.getAttribute("data-testid"))
      .filter(
        (id) =>
          id && (id.includes("widget") || id.includes(widgetName.toLowerCase()))
      );

    cy.log(
      `Available testIds containing 'widget' or '${widgetName}': ${availableTestIds.join(
        ", "
      )}`
    );

    // If we found any potential matches, try the first one
    if (availableTestIds.length > 0) {
      const potentialMatch = `[data-testid="${availableTestIds[0]}"]`;
      cy.log(`Trying potential match: ${potentialMatch}`);
      return cy.get(potentialMatch);
    }

    // Return empty selector if nothing found
    cy.log(
      `No widget found with name "${widgetName}". Attempted selectors: ${attemptedSelectors.join(
        ", "
      )}`
    );
    return cy.get("body").find('[data-testid="nonexistent"]', { log: false });
  });
});

// Fix verifyContentPresent command with proper typing
Cypress.Commands.add(
  "verifyContentPresent",
  (
    contentPatterns: Array<string | RegExp>
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    cy.get("body").then(($body) => {
      const text = $body.text();
      let matched = false;
      let matchedPattern = null;

      for (const pattern of contentPatterns) {
        if (typeof pattern === "string" && text.includes(pattern)) {
          matched = true;
          matchedPattern = pattern;
          cy.log(`Found content: "${pattern}"`);
          break;
        } else if (pattern instanceof RegExp && pattern.test(text)) {
          matched = true;
          matchedPattern = pattern;
          cy.log(`Found content matching: ${pattern}`);
          break;
        }
      }

      expect(
        matched,
        `Page should contain at least one of the patterns: ${contentPatterns.join(
          ", "
        )}`
      ).to.be.true;
    });

    // Return a proper HTMLElement type instead of HTMLBodyElement
    return cy
      .get("body")
      .then(
        () =>
          cy.wrap(Cypress.$("body")) as Cypress.Chainable<JQuery<HTMLElement>>
      );
  }
);

// Fix for containsText command with proper typing
Cypress.Commands.add("containsText", (text: string): void => {
  cy.get("body").invoke("text").should("include", text);
});

// Enhanced error handling for test failures
Cypress.on("fail", (error, runnable) => {
  // Log test failure with enhanced debug information
  cy.log(`Test failed: ${runnable.title}`);

  // Take screenshots with more descriptive names
  const testPath = Cypress.spec.relative.replace(/\.cy\.ts$/, "");
  const screenshotName = `${testPath}/${runnable.title.replace(
    /\s+/g,
    "-"
  )}-failure`;

  cy.screenshot(screenshotName, { capture: "viewport" });

  // Log more details about the error
  cy.log(`Error name: ${error.name}`);
  cy.log(`Error message: ${error.message}`);

  // For visibility issues, try to debug the element structure
  if (
    error.message.includes("not visible") ||
    error.message.includes("not found")
  ) {
    cy.log("Element visibility issue detected. Adding debug information...");
  }

  // Log important DOM information
  cy.document().then((doc) => {
    cy.log(`Page title: ${doc.title}`);
    cy.log(`Body classes: ${doc.body.className}`);
    cy.log(
      `Number of [data-testid] elements: ${
        doc.querySelectorAll("[data-testid]").length
      }`
    );
    cy.log(`URL at failure: ${doc.location.href}`);

    // Check for any error messages in the DOM
    const errorElements = doc.querySelectorAll(
      '.error, [role="alert"], [class*="error"]'
    );
    if (errorElements.length > 0) {
      cy.log(`Found ${errorElements.length} error elements in the DOM`);
      Array.from(errorElements).forEach((el, i) => {
        cy.log(`Error element ${i + 1}: ${el.textContent?.trim() || ""}`);
      });
    }
  });

  // Check for console errors
  cy.window().then((win: Cypress.AUTWindow) => {
    // If there are any console errors captured, log them
    if (win.consoleErrors && win.consoleErrors.length) {
      cy.log(`Found ${win.consoleErrors.length} console errors:`);
      win.consoleErrors.forEach((err: string, i: number) => {
        cy.log(`Console error ${i + 1}: ${err}`);
      });
    }
  });

  // Throw the original error to fail the test
  throw error;
});

// Add placeholder implementations for other custom commands
Cypress.Commands.add("startMeasurement", (name: string) => {
  cy.log(`Start measurement: ${name}`);
});

Cypress.Commands.add(
  "endMeasurement",
  (name: string, category: string = "general") => {
    cy.log(`End measurement: ${name} (${category})`);
  }
);

// Export empty object at the end
export {};
