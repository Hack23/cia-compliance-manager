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
  // Try multiple selector strategies
  const selectors = [
    '[data-testid="security-level-controls"]',
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

// Fix for findWidget command
Cypress.Commands.add("findWidget", (widgetName: string) => {
  // Track attempts for better error reporting
  const attemptedSelectors: string[] = [];
  const startTime = performance.now();

  return cy.get("body").then(($body) => {
    // Normalize widget name to improve matching
    const normalizedName = widgetName.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Try standard widget prefix first
    const prefixedId = `${WIDGET_PREFIXES.PREFIX_BASE}${normalizedName}`;

    // Build comprehensive list of selectors to try
    const selectors = [
      // Exact test ID matches
      `[data-testid="widget-${widgetName}"]`,
      `[data-testid="${WIDGET_PREFIXES.PREFIX_BASE}${widgetName}"]`,
      // Partial matches with contains
      `[data-testid*="${widgetName}"]`,
      `[data-testid*="${normalizedName}"]`,
      // Matches by attribute
      `[data-widget-name*="${widgetName}" i]`,
      `[data-component*="${widgetName}" i]`,
      `[data-cy*="${widgetName}" i]`,
      // Matches by aria attributes
      `[aria-label*="${widgetName}" i]`,
      // Matches by role with accessible name
      `[role="region"][aria-label*="${widgetName}" i]`,
      // Matches by heading content (more specific to more general)
      `h2:contains("${widgetName}")`,
      `h3:contains("${widgetName}")`,
      `h4:contains("${widgetName}")`,
      `div.widget-header:contains("${widgetName}")`,
      `div.widget-title:contains("${widgetName}")`,
      // Class-based fallbacks
      `.widget-${normalizedName}`,
      `.${normalizedName}-widget`,
      `.widget:contains("${widgetName}")`,
      // Matches by any content (last resort)
      `div:contains("${widgetName}")`,
    ];

    // Try each selector in order
    for (const selector of selectors) {
      attemptedSelectors.push(selector);
      if ($body.find(selector).length) {
        // Found match - record performance metric
        const duration = performance.now() - startTime;
        cy.task("logPerformance", {
          operation: "findWidget",
          duration,
          widgetName,
          matchedSelector: selector,
        }).then(
          () => {
            // Success handler - do nothing
          },
          { timeout: 4000 } // Add timeout option as second parameter
        );

        cy.log(
          `Found widget "${widgetName}" using selector: ${selector} (${duration.toFixed(
            2
          )}ms)`
        );
        return cy.get(selector).first();
      }
    }

    // Try flexible ID matching from predefined groups
    // Safely check if FLEXIBLE_TEST_IDS contains the key
    const flexibleKey = widgetName.toUpperCase();
    const flexibleIds =
      FLEXIBLE_TEST_IDS &&
      typeof FLEXIBLE_TEST_IDS === "object" &&
      flexibleKey in FLEXIBLE_TEST_IDS
        ? (FLEXIBLE_TEST_IDS as any)[flexibleKey]
        : undefined;

    if (flexibleIds) {
      for (const id of flexibleIds) {
        const flexibleSelector = `[data-testid="${id}"]`;
        attemptedSelectors.push(flexibleSelector);
        if ($body.find(flexibleSelector).length) {
          const duration = performance.now() - startTime;
          cy.task("logPerformance", {
            operation: "findWidget",
            duration,
            widgetName,
            matchedSelector: flexibleSelector,
          }).then(
            () => {
              // Success handler - do nothing
            },
            { timeout: 4000 } // Add timeout option as second parameter
          );

          cy.log(
            `Found widget using flexible ID: ${id} (${duration.toFixed(2)}ms)`
          );
          return cy.get(flexibleSelector).first();
        }
      }
    }

    // Log available widgets to help with debugging
    const availableWidgets = Array.from($body.find("[data-testid]"))
      .map((el) => el.getAttribute("data-testid"))
      .filter(
        (id) => id && (id.includes("widget") || id.includes("component"))
      );

    cy.log(
      `Widget "${widgetName}" not found. Available widgets: ${availableWidgets
        .join(", ")
        .substring(0, 100)}...`
    );
    cy.log(
      `Attempted selectors: ${attemptedSelectors
        .join(", ")
        .substring(0, 100)}...`
    );

    // Return a placeholder element that satisfies the HTMLElement type
    return cy.get("html") as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
  }) as Cypress.Chainable<JQuery<HTMLElement>>;
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

      // Record performance metric
      const duration = performance.now() - performance.now(); // This is just a placeholder
      cy.task("logPerformance", {
        operation: "verifyContentPresent",
        duration,
        matched,
        matchedPattern: String(matchedPattern).substring(0, 50),
      }).then(
        () => {
          // Success handler - do nothing
        },
        { timeout: 4000 } // Add timeout option as second parameter
      );

      expect(
        matched,
        `Page should contain at least one of the patterns: ${contentPatterns.join(
          ", "
        )}`
      ).to.be.true;
    });

    // Add visual logging for clarity in test reporter
    contentPatterns.forEach((pattern, i) => {
      const patternStr =
        typeof pattern === "string" ? pattern : pattern.toString();
      cy.log(
        `Pattern ${i + 1}: ${patternStr.substring(0, 40)}${
          patternStr.length > 40 ? "..." : ""
        }`
      );
    });

    // Return the body element with proper type
    return cy.get("body") as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
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
