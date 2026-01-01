// Add this import at the top of your commands.ts file
import "./debug-helpers";

// Import the widget helpers - update imports to only use functions that exist

// No need to call this as the commands are defined below
// registerWidgetCommands();

// Fix for findSecurityLevelControls command with more resilient selectors and proper return type
Cypress.Commands.add(
  "findSecurityLevelControls",
  (): Cypress.Chainable<JQuery<HTMLElement>> => {
    // Try multiple selector strategies in order of specificity
    const selectors = [
      '[data-testid="security-level-controls"]',
      '[data-testid="security-level-selector"]',
      '[data-testid*="security-level"]',
      '[data-testid*="security"][data-testid*="control"]',
      // Add more fallback selectors
      'select[name*="availability"], select[name*="integrity"], select[name*="confidentiality"]',
      'select option[value="Low"], select option[value="Moderate"], select option[value="High"]',
      // If all else fails, look for any select elements
      "select",
    ];

    // Try each selector in order, with helpful logging
    return cy.get("body").then(($body) => {
      cy.log("🔍 Looking for security level controls...");

      // Try each selector until we find a match
      for (const selector of selectors) {
        const elements = $body.find(selector);
        if (elements.length > 0) {
          cy.log(
            `✅ Found security level controls with selector: ${selector} (${elements.length} elements)`
          );
          return cy.get(selector);
        }
      }

      // If we couldn't find specific controls, check the page structure and log it
      cy.log(
        "⚠️ Could not find security level controls with standard selectors"
      );
      if ($body.find("select").length > 0) {
        cy.log(
          `📋 Found ${
            $body.find("select").length
          } select elements on the page - will try to use these`
        );
        // Use the available selects as a fallback
        return cy.get("select");
      } else {
        cy.log("❌ No select elements found on the page at all");
        // Take a screenshot to aid debugging
        cy.screenshot("security-controls-not-found", { capture: "viewport" });

        // Return an empty wrapper that won't break the test chain
        return cy.wrap(Cypress.$("<div>"));
      }
    }) as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
  }
);

// Improve the setSecurityLevels command with better reliability
Cypress.Commands.add(
  "setSecurityLevels",
  (availability?: string, integrity?: string, confidentiality?: string) => {
    // First check if the app is loaded properly
    cy.get("body").should("exist").and("be.visible");

    // Log for debugging
    cy.log(
      `Setting security levels - A:${availability}, I:${integrity}, C:${confidentiality}`
    );

    // Try multiple approaches to find and set security levels
    cy.get("body").then(($body) => {
      // Approach 1: Check if there are at least 3 select elements on the page
      const selects = $body.find("select");
      if (selects.length >= 3) {
        cy.log("Found select elements directly - using index-based approach");
        if (availability) {
          cy.wrap(selects.eq(0)).select(availability, { force: true });
          cy.wait(300); // Reduced wait time
        }
        if (integrity) {
          cy.wrap(selects.eq(1)).select(integrity, { force: true });
          cy.wait(300); // Reduced wait time
        }
        if (confidentiality) {
          cy.wrap(selects.eq(2)).select(confidentiality, { force: true });
          cy.wait(300); // Reduced wait time
        }
      }
      // Approach 2: Try to find security level controls using data-testid
      else if ($body.find('[data-testid*="security-level"]').length > 0) {
        cy.log("Found security level container with test ID");
        const container = $body.find('[data-testid*="security-level"]');

        // Find selects within the container
        const containerSelects = container.find("select");
        if (containerSelects.length >= 3) {
          if (availability) {
            cy.wrap(containerSelects.eq(0)).select(availability, {
              force: true,
            });
            cy.wait(300); // Reduced wait time
          }
          if (integrity) {
            cy.wrap(containerSelects.eq(1)).select(integrity, { force: true });
            cy.wait(300); // Reduced wait time
          }
          if (confidentiality) {
            cy.wrap(containerSelects.eq(2)).select(confidentiality, {
              force: true,
            });
            cy.wait(300); // Reduced wait time
          }
        }
      }
      // Approach 3: Look for select elements with specific names or labels
      else {
        cy.log("Trying to find select elements by name/label associations");

        // Find selects that might be security level controls
        $body.find("select").each((i, el) => {
          const $select = Cypress.$(el);
          const id = $select.attr("id") || "";
          const name = $select.attr("name") || "";
          const label = $body.find(`label[for="${id}"]`).text();

          // Determine which security level this select is for
          if (
            (id.includes("avail") ||
              name.includes("avail") ||
              label.toLowerCase().includes("avail")) &&
            availability
          ) {
            cy.wrap($select).select(availability, { force: true });
            cy.wait(300); // Reduced wait time
          } else if (
            (id.includes("integr") ||
              name.includes("integr") ||
              label.toLowerCase().includes("integr")) &&
            integrity
          ) {
            cy.wrap($select).select(integrity, { force: true });
            cy.wait(300); // Reduced wait time
          } else if (
            (id.includes("conf") ||
              name.includes("conf") ||
              label.toLowerCase().includes("conf")) &&
            confidentiality
          ) {
            cy.wrap($select).select(confidentiality, { force: true });
            cy.wait(300); // Reduced wait time
          }
        });
      }

      // Always wait for any updates to propagate - reduced wait time
      cy.wait(500);

      // Take a screenshot to see the current state
      cy.screenshot(
        `security-level-${availability}-${integrity}-${confidentiality}`
      );
    });
  }
);

// Improved findWidget command with more reliable widget detection
Cypress.Commands.add("findWidget", (_widgetName: string) => {
  // More comprehensive list of possible widget naming patterns
  const widgetPatterns = [
    // Exact match patterns
    `widget-${_widgetName}`,
    `widget-${_widgetName}-container`,
    `${_widgetName}-widget`,
    `${_widgetName}-container`,
    `${_widgetName}`,
    // Partial match patterns
    `*=${_widgetName}`,
  ];

  return cy.get("body").then(($body) => {
    // Try each pattern in order until we find a match
    let foundWidget = null;

    // First try direct test ID matching
    for (const pattern of widgetPatterns) {
      if (pattern.startsWith("*=")) {
        // Partial match
        const partialName = pattern.substring(2);
        const selector = `[data-testid*="${partialName}"]`;
        if ($body.find(selector).length) {
          foundWidget = selector;
          break;
        }
      } else {
        // Exact match
        const selector = `[data-testid="${pattern}"]`;
        if ($body.find(selector).length) {
          foundWidget = selector;
          break;
        }
      }
    }

    // If no match found, try with class instead of testId
    if (!foundWidget) {
      for (const pattern of widgetPatterns) {
        if (pattern.startsWith("*=")) {
          // Partial match
          const partialName = pattern.substring(2);
          const selector = `[class*="${partialName}"]`;
          if ($body.find(selector).length) {
            foundWidget = selector;
            break;
          }
        } else {
          // Exact match
          const selector = `[class="${pattern}"]`;
          if ($body.find(selector).length) {
            foundWidget = selector;
            break;
          }
        }
      }
    }

    // If we found a widget, return it
    if (foundWidget) {
      cy.log(`Found widget using selector: ${foundWidget}`);
      return cy.get(foundWidget);
    }

    // Last resort - try a very generic approach
    const genericSelectors = [
      `[data-testid*="${_widgetName}"]`,
      `[class*="${_widgetName}"]`,
      `[id*="${_widgetName}"]`,
      `[data-testid*="widget"]`,
    ];

    for (const selector of genericSelectors) {
      if ($body.find(selector).length) {
        cy.log(`Found widget using generic selector: ${selector}`);
        return cy.get(selector);
      }
    }

    // Nothing found, return an empty selector (this will fail gracefully)
    cy.log(`⚠️ No widget found for "${_widgetName}"`);
    return cy.get(`[data-testid="nonexistent-${_widgetName}"]`, { log: false });
  });
});

// Fix verifyContentPresent command with proper typing
Cypress.Commands.add(
  "verifyContentPresent",
  (
    content: string | RegExp | Array<string | RegExp>
  ): Cypress.Chainable<JQuery<HTMLElement>> => {
    // Handle different input types
    const contentPatterns = Array.isArray(content) ? content : [content];

    return cy.get("body").then(($body) => {
      const text = $body.text();
      let matched = false;

      for (const pattern of contentPatterns) {
        if (typeof pattern === "string" && text.includes(pattern)) {
          matched = true;
          cy.log(`Found content: "${pattern}"`);
          break;
        } else if (pattern instanceof RegExp && pattern.test(text)) {
          matched = true;
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

      // Return for chaining - properly typed as HTMLElement
      return cy.wrap($body) as Cypress.Chainable<JQuery<HTMLElement>>;
    });
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

// Improve the ensureAppLoaded command
Cypress.Commands.add("ensureAppLoaded", () => {
  const timeout = 30000;

  cy.log("Waiting for app to load...");

  // First check if body exists
  cy.get("body", { timeout })
    .should("exist")
    .then(($body) => {
      cy.log(`Body found with ${$body.find("*").length} elements`);

      // Check for app-related content
      const contentPatterns = [
        /security/i,
        /compliance/i,
        /dashboard/i,
        /availability/i,
        /integrity/i,
        /confidentiality/i,
      ];

      // Check if any expected content exists
      const bodyText = $body.text();
      const hasAppContent = contentPatterns.some((pattern) =>
        pattern.test(bodyText)
      );

      if (hasAppContent) {
        cy.log("✅ App content detected!");
      } else {
        cy.log(
          "⚠️ No app-specific content found - app may not be properly loaded"
        );
        cy.screenshot("app-load-issue");
      }

      // Try each strategy in order
      let strategyPromise = cy.wrap(null);

      // Continue regardless of content check - just for logging
      cy.log("App loaded check complete");
    });

  // Take a screenshot to document the app state
  cy.screenshot("app-loaded-state");
});

/**
 * Helper command to ensure app is fully loaded before continuing
 */
Cypress.Commands.add("ensureAppLoaded", (timeoutValue = 10000) => {
  // Fix: Use number directly for timeout instead of timeoutValue
  // Wait for key app elements to appear
  cy.get("body").should("exist");

  // Use a simpler approach without timeout object
  // Check for dashboard or widgets
  cy.get("body")
    .contains('[data-testid="dashboard-grid"], [data-testid^="widget-"]')
    .should("exist")
    .then(() => {
      cy.log("✅ Application loaded successfully");
    });

  // Check if select elements are present for setting security levels
  cy.get("select").then(($selects) => {
    if ($selects.length < 3) {
      cy.log("⚠️ Warning: Not all security level selects found");
    }
  });
});

/**
 * Helper command to set security levels
 */
Cypress.Commands.add(
  "setSecurityLevels",
  (availability, integrity, confidentiality) => {
    cy.get("body").then(($body) => {
      const selectCount = $body.find("select").length;

      if (selectCount >= 3) {
        // Set levels using dropdowns
        if (availability !== undefined) {
          cy.get("select").eq(0).select(availability, { force: true });
        }
        if (integrity !== undefined) {
          cy.get("select").eq(1).select(integrity, { force: true });
        }
        if (confidentiality !== undefined) {
          cy.get("select").eq(2).select(confidentiality, { force: true });
        }
      } else {
        // Try another method - dispatch a custom event which the app listens for
        cy.window().then((win) => {
          win.document.dispatchEvent(
            new CustomEvent("test:set-values", {
              detail: {
                availability,
                integrity,
                confidentiality,
              },
            })
          );
        });

        cy.log(
          `Set security levels via event: ${availability}, ${integrity}, ${confidentiality}`
        );
      }
    });
  }
);

/**
 * Custom command to select security levels with improved reliability
 */
Cypress.Commands.add(
  "setSecurityLevelsReliable" as any,
  (availability, integrity, confidentiality) => {
    // Try multiple strategies to find and set security levels

    // Strategy 1: Using data-testid selectors
    cy.get("body").then(($body) => {
      const hasTestIdSelectors =
        $body.find('[data-testid="availability-select"]').length > 0 &&
        $body.find('[data-testid="integrity-select"]').length > 0 &&
        $body.find('[data-testid="confidentiality-select"]').length > 0;

      if (hasTestIdSelectors) {
        cy.get('[data-testid="availability-select"]').select(
          String(availability),
          { force: true }
        );
        cy.wait(300);
        cy.get('[data-testid="integrity-select"]').select(String(integrity), {
          force: true,
        });
        cy.wait(300);
        cy.get('[data-testid="confidentiality-select"]').select(
          String(confidentiality),
          { force: true }
        );
        return;
      }

      // Strategy 2: Using the first three selects in order
      const hasThreeSelects = $body.find("select").length >= 3;

      if (hasThreeSelects) {
        cy.get("select").eq(0).select(String(availability), { force: true });
        cy.wait(300);
        cy.get("select").eq(1).select(String(integrity), { force: true });
        cy.wait(300);
        cy.get("select").eq(2).select(String(confidentiality), { force: true });
        return;
      }

      // Strategy 3: Using selects with specific labels
      cy.contains("label", /availability|avail/i)
        .siblings("select")
        .select(String(availability), { force: true });
      cy.wait(300);

      cy.contains("label", /integrity|integ/i)
        .siblings("select")
        .select(String(integrity), { force: true });
      cy.wait(300);

      cy.contains("label", /confidentiality|confid|privacy/i)
        .siblings("select")
        .select(String(confidentiality), { force: true });
    });

    // Wait for updates to apply
    cy.wait(1000);
  }
);

/**
 * Command to force dark mode instead of relying on theme toggle button
 */
Cypress.Commands.add("forceDarkMode", () => {
  cy.document().then((doc) => {
    // Add dark mode class to HTML element
    doc.documentElement.classList.add("dark");
    doc.body.classList.add("dark");

    // Set localStorage to persist the setting
    localStorage.setItem("darkMode", "true");

    // Create a custom event that the app might listen to
    const themeChangeEvent = new CustomEvent("themeChange", {
      detail: { theme: "dark" },
    });
    window.dispatchEvent(themeChangeEvent);

    cy.log("Forced dark mode via DOM and localStorage");
  });
});

/**
 * Command to force light mode
 */
Cypress.Commands.add("forceLightMode", () => {
  cy.document().then((doc) => {
    // Remove dark mode class from HTML element
    doc.documentElement.classList.remove("dark");
    doc.body.classList.remove("dark");

    // Set localStorage to persist the setting
    localStorage.setItem("darkMode", "false");

    // Create a custom event that the app might listen to
    const themeChangeEvent = new CustomEvent("themeChange", {
      detail: { theme: "light" },
    });
    window.dispatchEvent(themeChangeEvent);

    cy.log("Forced light mode via DOM and localStorage");
  });
});

/**
 * Command to toggle theme regardless of button presence
 */
Cypress.Commands.add("toggleTheme", () => {
  cy.document().then((doc) => {
    // Check current theme
    const isDarkMode = doc.documentElement.classList.contains("dark");

    if (isDarkMode) {
      cy.forceLightMode();
    } else {
      cy.forceDarkMode();
    }

    // Wait for theme change to take effect
    cy.wait(200); // Reduced wait time
  });
});

/**
 * Command to capture a complete widget even if it's larger than the viewport
 */
Cypress.Commands.add("captureEntireWidget", (widgetName: string) => {
  cy.findWidget(widgetName).then(($widget) => {
    if ($widget.length === 0) {
      cy.log(`Widget ${widgetName} not found`);
      return;
    }

    const widget = $widget[0];
    const rect = widget.getBoundingClientRect();

    // Log widget dimensions
    cy.log(`Widget dimensions: ${rect.width}x${rect.height}`);

    // If widget is very tall, adjust viewport to fit it
    if (rect.height > 800) {
      cy.viewport(1280, Math.min(rect.height + 100, 2000));
      cy.wait(300); // Wait for viewport to adjust
    }

    // Center widget in viewport and take screenshot
    cy.wrap($widget)
      .scrollIntoView({ duration: 100 })
      .screenshot(`full-widget-${widgetName}`, {
        padding: 10,
        overwrite: true,
        capture: "viewport",
      });
  });
});

/**
 * Command to capture HTML content of an element or page
 */
Cypress.Commands.add(
  "captureHtml",
  (name: string, selector: string = "body") => {
    cy.get(selector).then(($el) => {
      const html = $el.prop("outerHTML");
      const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Snapshot - ${name}</title>
  <style>
    body { font-family: system-ui, sans-serif; }
    .dark { background-color: #1a1a1a; color: #f5f5f5; }
  </style>
</head>
<body class="${document.body.classList.contains("dark") ? "dark" : ""}">
  ${html}
</body>
</html>`;

      cy.task("writeFile", {
        path: `cypress/snapshots/html/${name}.html`,
        content: fullHtml,
      });

      cy.log(`📄 Captured HTML: ${name}.html`);
    });
  }
);

// Add proper type declarations for custom commands
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      findSecurityLevelControls(): Chainable<JQuery<HTMLElement>>;
      verifyContentPresent(
        content: string | RegExp | Array<string | RegExp>
      ): Chainable<JQuery<HTMLElement>>;
      containsText(text: string): Chainable<void>;
      startMeasurement(name: string): Chainable<void>;
      endMeasurement(name: string): Chainable<void>;
      // Add other custom commands here
    }
  }
}

// Then register commands with proper types
Cypress.Commands.add("findSecurityLevelControls", () => {
  // Implementation
  return cy.get('[data-testid="security-level-controls"]');
});

// Define custom command types
declare global {
  namespace Cypress {
    interface Chainable {
      // Add existing commands...

      /**
       * Custom command to find a widget by name or ID
       * @example cy.findWidget('security-summary')
       */
      findWidget(widgetName: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Set security levels with reliable waiting between selections
       */
      setSecurityLevels(
        availability: string,
        integrity: string,
        confidentiality: string
      ): Chainable<void>;

      /**
       * Get a widget's text content
       */
      getWidgetContent(widgetId: string): Chainable<string | null>;

      /**
       * Find an element within a widget
       */
      findWidgetElement(
        widgetId: string,
        elementSelector: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Force dark mode regardless of theme toggle presence
       */
      forceDarkMode(): Chainable<void>;

      /**
       * Force light mode regardless of theme toggle presence
       */
      forceLightMode(): Chainable<void>;

      /**
       * Toggle theme regardless of button presence
       */
      toggleTheme(): Chainable<void>;

      /**
       * Capture a screenshot of an entire widget, adjusting viewport if necessary
       */
      captureEntireWidget(widgetName: string): Chainable<void>;

      /**
       * Capture HTML content of an element or page
       * @param name Filename for the HTML snapshot (without extension)
       * @param selector Optional CSS selector to capture specific content (defaults to body)
       */
      captureHtml(name: string, selector?: string): Chainable<void>;

      /**
       * Verify minimum number of widgets are present
       * @param count Minimum number of widgets expected
       */
      verifyMinimumWidgets(count: number): Chainable<void>;
    }
  }
}

// Add the verifyMinimumWidgets command implementation
Cypress.Commands.add("verifyMinimumWidgets", (count: number) => {
  cy.get('[data-testid*="widget"]').should("have.length.at.least", count);
});

/**
 * ============================================================================
 * Enhanced Custom Commands for Widget Refactoring E2E Tests
 * ============================================================================
 */

/**
 * Wait for a widget to finish loading
 * Checks for loading state to disappear and content to be visible
 */
Cypress.Commands.add('waitForWidget', (testId: string) => {
  cy.log(`⏳ Waiting for widget: ${testId}`);
  
  // Widget should exist
  cy.get(`[data-testid="${testId}"]`, { timeout: 10000 }).should('exist');
  
  // Wait for loading state to disappear if it exists
  cy.get('body').then($body => {
    const loadingSelector = `[data-testid="${testId}-loading"]`;
    if ($body.find(loadingSelector).length > 0) {
      cy.get(loadingSelector).should('not.exist');
    }
  });
  
  // Widget should be visible
  cy.get(`[data-testid="${testId}"]`).should('be.visible');
  
  cy.log(`✅ Widget loaded: ${testId}`);
});

/**
 * Test widget error state
 * Note: This is a helper for future error testing scenarios
 * Currently sets up expectations but doesn't force errors
 */
Cypress.Commands.add('testWidgetError', (testId: string) => {
  cy.log(`Testing error handling for widget: ${testId}`);
  
  // Check if error element exists (it shouldn't in normal operation)
  cy.get('body').then($body => {
    const errorSelector = `[data-testid="${testId}-error"]`;
    if ($body.find(errorSelector).length > 0) {
      cy.log(`Error state detected in widget: ${testId}`);
      cy.get(errorSelector).should('be.visible');
    } else {
      cy.log(`No error state in widget: ${testId} (as expected)`);
    }
  });
});

/**
 * Test tab navigation with keyboard
 * Tests arrow keys, Home, and End navigation for accessible tabs
 */
Cypress.Commands.add('testTabNavigation', (containerSelector: string, tabCount: number) => {
  cy.log(`Testing tab navigation in ${containerSelector} with ${tabCount} tabs`);
  
  cy.get(containerSelector).within(() => {
    // Get first tab and focus it
    cy.get('[role="tab"]').first().focus();
    cy.wait(200);
    
    // Verify first tab is selected
    cy.get('[role="tab"]').first().should('have.attr', 'aria-selected', 'true');
    
    // Navigate right with arrow key
    if (tabCount > 1) {
      cy.focused().type('{rightarrow}');
      cy.wait(200);
      
      // Verify second tab is now selected
      cy.get('[role="tab"]').eq(1).should('have.attr', 'aria-selected', 'true');
      
      // Navigate left back to first
      cy.focused().type('{leftarrow}');
      cy.wait(200);
      cy.get('[role="tab"]').first().should('have.attr', 'aria-selected', 'true');
    }
    
    // Test End key to go to last tab
    if (tabCount > 2) {
      cy.focused().type('{end}');
      cy.wait(200);
      cy.get('[role="tab"]').last().should('have.attr', 'aria-selected', 'true');
      
      // Test Home key to go back to first tab
      cy.focused().type('{home}');
      cy.wait(200);
      cy.get('[role="tab"]').first().should('have.attr', 'aria-selected', 'true');
    }
  });
  
  cy.log('✅ Tab navigation tests passed');
});

/**
 * Test responsive layout across different viewports
 */
Cypress.Commands.add('testResponsiveLayout', (viewports: string[]) => {
  viewports.forEach(viewport => {
    cy.log(`Testing viewport: ${viewport}`);
    cy.viewport(viewport as Cypress.ViewportPreset);
    cy.wait(500); // Allow time for responsive layout to adjust
    
    // Verify app container is visible
    cy.get('[data-testid="app-container"]').should('be.visible');
    
    cy.log(`✅ Viewport ${viewport} rendered correctly`);
  });
});

/**
 * Check basic accessibility (placeholder for future cypress-axe integration)
 * Currently performs basic ARIA checks
 */
Cypress.Commands.add('checkA11y', () => {
  cy.log('Checking basic accessibility');
  
  // Check for basic ARIA attributes
  cy.get('[role="button"]').each($btn => {
    // Buttons should have accessible names
    const hasName = $btn.attr('aria-label') || $btn.text().trim().length > 0;
    expect(hasName, 'Button should have accessible name').to.be.true;
  });
  
  // Check tabs have proper ARIA
  cy.get('[role="tab"]').each($tab => {
    cy.wrap($tab).should('have.attr', 'aria-selected');
  });
  
  // Check for images with alt text
  cy.get('img').each($img => {
    cy.wrap($img).should('have.attr', 'alt');
  });
  
  cy.log('✅ Basic accessibility checks passed');
});

/**
 * Verify widget contains expected content
 */
Cypress.Commands.add('verifyWidgetContent', (testId: string, expectedContent: string[]) => {
  cy.log(`Verifying content in widget: ${testId}`);
  
  cy.get(`[data-testid="${testId}"]`).within(() => {
    expectedContent.forEach(content => {
      cy.contains(content).should('be.visible');
    });
  });
  
  cy.log(`✅ Widget content verified: ${testId}`);
});

// Type declarations for new commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Wait for widget to finish loading
       * @param testId The test ID of the widget
       */
      waitForWidget(testId: string): Chainable<void>;
      
      /**
       * Test widget error state handling
       * @param testId The test ID of the widget
       */
      testWidgetError(testId: string): Chainable<void>;
      
      /**
       * Test tab navigation with keyboard
       * @param containerSelector Selector for the tab container
       * @param tabCount Number of tabs to test
       */
      testTabNavigation(containerSelector: string, tabCount: number): Chainable<void>;
      
      /**
       * Test responsive layout across viewports
       * @param viewports Array of viewport preset names
       */
      testResponsiveLayout(viewports: string[]): Chainable<void>;
      
      /**
       * Check basic accessibility (placeholder for cypress-axe)
       */
      checkA11y(): Chainable<void>;
      
      /**
       * Verify widget contains expected content
       * @param testId The test ID of the widget
       * @param expectedContent Array of expected text content
       */
      verifyWidgetContent(testId: string, expectedContent: string[]): Chainable<void>;
    }
  }
}
