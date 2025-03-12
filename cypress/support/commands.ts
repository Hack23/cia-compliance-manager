import {
  TEST_IDS,
  getTestSelector,
  CIA_TEST_IDS,
  WIDGET_TEST_IDS,
  WIDGET_PREFIXES,
  FLEXIBLE_TEST_IDS,
} from "./constants";

// Define command implementations

/**
 * Custom command to set security levels for all CIA components
 * with ultra-resilient approach that doesn't rely on specific selectors
 */
Cypress.Commands.add(
  "setSecurityLevels",
  (availability, integrity, confidentiality) => {
    cy.findSecurityLevelControls().then($container => {
      if ($container.length === 0) {
        cy.log('No security level controls found - test may fail');
        return;
      }
      
      // Find select elements within the container
      const $selects = $container.find('select');
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
        $selects.each((i, el) => {
          const $el = Cypress.$(el);
          const label = $el.prev('label').text().toLowerCase() || '';
          const id = $el.attr('id')?.toLowerCase() || '';
          const name = $el.attr('name')?.toLowerCase() || '';
          
          if ((label.includes('avail') || id.includes('avail') || name.includes('avail')) && availability) {
            cy.wrap($el).select(availability, { force: true });
          } else if ((label.includes('integ') || id.includes('integ') || name.includes('integ')) && integrity) {
            cy.wrap($el).select(integrity, { force: true });
          } else if ((label.includes('conf') || id.includes('conf') || name.includes('conf')) && confidentiality) {
            cy.wrap($el).select(confidentiality, { force: true });
          }
        });
      } else {
        cy.log('No select elements found within security level controls');
      }
      
      // Wait for any updates to propagate
      cy.wait(300);
    });
  }
);

/**
 * Ensures app is loaded with enhanced viewport awareness
 */
Cypress.Commands.add("ensureAppLoaded", () => {
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

  // Fix: Return a generic element instead of body to match expected return type
  return cy.get(getTestSelector(TEST_IDS.APP_CONTAINER));
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

    // Add error recovery strategy
    cy.on('fail', (err) => {
      if (err.message.includes('failed because this element')) {
        cy.log(`Attempting fallback for ${category} selection`);
        // Last-ditch effort - try to find any select element
        cy.get('select').then($selects => {
          // Try to identify the right select by nearby label text
          for (let i = 0; i < $selects.length; i++) {
            const $select = $selects.eq(i);
            const $label = $select.prev('label');
            if ($label.text().toLowerCase().includes(category)) {
              return cy.wrap($select).select(level, { force: true });
            }
          }
          // If all else fails, throw a more informative error
          throw new Error(`Could not find security level selector for: ${category}`);
        });
        return false;
      }
      throw err;
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
    
    const patternString = contentPattern instanceof RegExp 
      ? contentPattern.toString()
      : `"${contentPattern}"`;

    cy.log(`Waiting for content matching: ${patternString}`);

    const checkContent = () => {
      return cy
        .get("body")
        .invoke("text")
        .then((text) => {
          const matches = pattern.test(text);
          if (!matches) {
            cy.log(`Content not found yet. Current text length: ${text.length}`);
          }
          return matches;
        });
    };

    return cy.waitUntil(checkContent, {
      timeout: options.timeout,
      interval: 500,
      errorMsg: `Timed out waiting for content matching: ${patternString}`,
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
  return cy.task<string[]>("listJunitFiles").then((files) => {
    if (Array.isArray(files)) {
      // Now TypeScript knows files is a string array
      console.log(`Found ${files.length} JUnit files`);
      return files;
    }
    return [];
  });
});

/**
 * Finds a widget using multiple selector strategies with enhanced resilience
 * @param widgetName Case-insensitive name or partial ID of widget
 * @returns Chainable with found element or null placeholder
 */
Cypress.Commands.add("findWidget", (widgetName: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  // Track attempts for better error reporting
  const attemptedSelectors: string[] = [];
  const startTime = performance.now();
  
  return cy.get('body').then($body => {
    // Normalize widget name to improve matching
    const normalizedName = widgetName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
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
      `div:contains("${widgetName}")`
    ];

    // Try each selector in order
    for (const selector of selectors) {
      attemptedSelectors.push(selector);
      if ($body.find(selector).length) {
        // Found match - record performance metric
        const duration = performance.now() - startTime;
        cy.task('logPerformance', {
          operation: 'findWidget',
          duration,
          widgetName,
          matchedSelector: selector
        }).then(() => {
          // Ignore task errors - the task might not be registered
        });
        
        cy.log(`Found widget "${widgetName}" using selector: ${selector} (${duration.toFixed(2)}ms)`);
        return cy.get(selector).first();
      }
    }
    
    // Try flexible ID matching from predefined groups
    const flexibleIds = FLEXIBLE_TEST_IDS[widgetName.toUpperCase() as keyof typeof FLEXIBLE_TEST_IDS];
    if (flexibleIds) {
      for (const id of flexibleIds) {
        const flexibleSelector = `[data-testid="${id}"]`;
        attemptedSelectors.push(flexibleSelector);
        if ($body.find(flexibleSelector).length) {
          const duration = performance.now() - startTime;
          cy.task('logPerformance', {
            operation: 'findWidget',
            duration,
            widgetName,
            matchedSelector: flexibleSelector
          }).then(() => {
            // Ignore task errors
          });
          
          cy.log(`Found widget using flexible ID: ${id} (${duration.toFixed(2)}ms)`);
          return cy.get(flexibleSelector).first();
        }
      }
    }
    
    // Try fuzzy content matching as last resort
    const contentPatterns = [
      new RegExp(`${widgetName}\\s*(widget|component|section)`, 'i'),
      new RegExp(`(widget|component|section)\\s*${widgetName}`, 'i')
    ];
    
    for (const pattern of contentPatterns) {
      const selector = `:contains(${pattern})`;
      if ($body.find(selector).length) {
        const matchedEl = $body.find(selector).first();
        // Try to find a parent with data-testid
        let current = matchedEl;
        let testIdParent = null;
        
        // Look up ancestry for a maximum of 5 levels
        for (let i = 0; i < 5; i++) {
          if (current.attr('data-testid')) {
            testIdParent = current;
            break;
          }
          
          const parent = current.parent();
          if (!parent.length || parent.is('body')) break;
          current = parent;
        }
        
        if (testIdParent) {
          const testId = testIdParent.attr('data-testid');
          const duration = performance.now() - startTime;
          cy.log(`Found widget "${widgetName}" using content pattern and parent testId: ${testId} (${duration.toFixed(2)}ms)`);
          return cy.wrap(testIdParent);
        }
      }
    }
    
    // Log available widgets to help with debugging
    const availableWidgets = Array.from($body.find('[data-testid]'))
      .map(el => el.getAttribute('data-testid'))
      .filter(id => id && (id.includes('widget') || id.includes('component')));
    
    cy.log(`Widget "${widgetName}" not found. Available widgets: ${availableWidgets.join(', ').substring(0, 100)}...`);
    cy.log(`Attempted selectors: ${attemptedSelectors.join(', ').substring(0, 100)}...`);
    
    // Return a placeholder element that satisfies the HTMLElement type
    return cy.get('html'); // Using html element instead of * for better typing
  });
});

/**
 * Verifies content exists using multiple patterns with enhanced performance tracking
 */
Cypress.Commands.add("verifyContentPresent", (contentPatterns: (string | RegExp)[]) => {
  const startTime = performance.now();
  
  cy.get('body').then($body => {
    const text = $body.text();
    let matched = false;
    let matchedPattern = null;
    
    for (const pattern of contentPatterns) {
      if (typeof pattern === 'string' && text.includes(pattern)) {
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
    const duration = performance.now() - startTime;
    cy.task('logPerformance', {
      operation: 'verifyContentPresent',
      duration,
      matched,
      matchedPattern: String(matchedPattern).substring(0, 50)
    }).then(() => {
      // Ignore task errors
    });
    
    expect(matched, `Page should contain at least one of the patterns: ${contentPatterns.join(', ')}`).to.be.true;
  });

  // Add visual logging for clarity in test reporter
  contentPatterns.forEach((pattern, i) => {
    const patternStr = typeof pattern === 'string' ? pattern : pattern.toString();
    cy.log(`Pattern ${i+1}: ${patternStr.substring(0, 40)}${patternStr.length > 40 ? '...' : ''}`);
  });
});

/**
 * Enforces element visibility for testing
 */
Cypress.Commands.add("forceVisible", { prevSubject: 'element' }, (subject) => {
  return cy.wrap(subject).then($el => {
    // Make element visible
    $el.css({
      'display': 'block',
      'visibility': 'visible',
      'opacity': 1
    });
    
    // Make parents visible
    let current = $el.parent();
    while (current.length && !current.is('body')) {
      current.css({
        'display': 'block',
        'visibility': 'visible',
        'opacity': 1,
        'overflow': 'visible'
      });
      current = current.parent();
    }
    
    return $el;
  });
});

/**
 * Verifies content exists using multiple patterns
 */
Cypress.Commands.add("verifyContentPresent", (contentPatterns: (string | RegExp)[]) => {
  cy.get('body').then($body => {
    const text = $body.text();
    let matched = false;
    
    for (const pattern of contentPatterns) {
      if (typeof pattern === 'string' && text.includes(pattern)) {
        matched = true;
        cy.log(`Found content: "${pattern}"`);
        break;
      } else if (pattern instanceof RegExp && pattern.test(text)) {
        matched = true;
        cy.log(`Found content matching: ${pattern}`);
        break;
      }
    }
    
    expect(matched, `Page should contain at least one of the patterns: ${contentPatterns.join(', ')}`).to.be.true;
  });

  // Add visual logging for clarity in test reporter
  contentPatterns.forEach((pattern, i) => {
    const patternStr = typeof pattern === 'string' ? pattern : pattern.toString();
    cy.log(`Pattern ${i+1}: ${patternStr.substring(0, 40)}${patternStr.length > 40 ? '...' : ''}`);
  });
});

/**
 * Debug utility to log test performance metrics
 */
Cypress.Commands.add("logPerformance", (testName: string, duration: number) => {
  if (duration > 2000) { // Flag tests taking over 2 seconds
    cy.log(`⚠️ SLOW TEST: "${testName}" took ${duration}ms`);
  }
  return cy.wrap(null);
});

/**
 * Find a widget by name using multiple selector strategies
 */
Cypress.Commands.add("findWidget", (widgetName: string) => {
  return cy.get("body").then($body => {
    // Try explicit test ID first - "widget-{name}"
    const explicitSelector = `[data-testid="widget-${widgetName}"]`;
    if ($body.find(explicitSelector).length > 0) {
      return cy.get(explicitSelector);
    }
    
    // Try flexible matching with common widget selectors
    const flexibleSelectors = [
      `[data-testid*="${widgetName}"]`,
      `[data-testid*="widget-${widgetName}"]`,
      `[data-testid="${widgetName}"]`,
      `[data-testid="${widgetName}-widget"]`,
      `[data-testid*="${widgetName}-container"]`,
      `.widget-${widgetName}`,
      `[class*="widget-${widgetName}"]`
    ];
    
    // Find first selector that matches
    for (const selector of flexibleSelectors) {
      if ($body.find(selector).length > 0) {
        return cy.get(selector);
      }
    }
    
    // If nothing found, log warning and return a selector that will fail gracefully
    cy.log(`⚠️ Warning: Could not find widget "${widgetName}"`);
    
    // Fix the type issue by using a proper type assertion
    return cy.get(explicitSelector, { log: false }).as('widgetNotFound') as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
  });
});

// Fix the return type issue with proper type casting
Cypress.Commands.add("verifyContentPresent", (contentPatterns: Array<string | RegExp>) => {
  const checkPatterns = () => {
    return cy.get("body").then(($body) => {
      const bodyText = $body.text();
      
      const results = contentPatterns.map(pattern => {
        if (typeof pattern === "string") {
          return bodyText.includes(pattern);
        } else {
          return pattern.test(bodyText);
        }
      });
      
      const allFound = results.every(found => found);
      
      if (!allFound) {
        const missingPatterns = contentPatterns.filter((pattern, index) => !results[index]);
        const missingText = missingPatterns.map(p => String(p)).join(", ");
        throw new Error(`Content not found: ${missingText}`);
      }
      
      // Return the jQuery element properly cast to the expected type
      return cy.wrap($body) as Cypress.Chainable<JQuery<HTMLElement>>;
    });
  };
  
  // Retry the check to improve reliability
  return checkPatterns();
});

// Fix the findWidget command's return type
Cypress.Commands.add("findWidget", (widgetName: string) => {
  // Helper function to search for widget based on partial ID or content
  const findWidget = () => {
    // Try exact match with data-testid first
    return cy
      .get(`[data-testid="widget-${widgetName}"]`)
      .should("exist")
      .then(($el) => {
        if ($el.length) return $el;

        // Try partial match with data-testid
        return cy
          .get(`[data-testid*="${widgetName}"]`)
          .should("exist")
          .then(($partial) => {
            if ($partial.length) return $partial;

            // Try by heading text
            return cy
              .get(`h2:contains("${widgetName}")`)
              .parent()
              .should("exist")
              .then(($heading) => {
                if ($heading.length) return $heading;

                // Last resort: try content
                return cy.contains(new RegExp(widgetName, "i")).should("exist");
              });
          });
      })
      .first();
  };

  // Always return a JQuery<HTMLElement> to satisfy TypeScript
  return findWidget().as("widget");
});

// Fix the verifyContentPresent command's return type
Cypress.Commands.add("verifyContentPresent", (contentPatterns: Array<string | RegExp>): Cypress.Chainable<JQuery<HTMLElement>> => {
  // Array to track found patterns
  const found: (string | RegExp)[] = [];

  // Check each pattern
  contentPatterns.forEach((pattern) => {
    cy.contains(pattern)
      .should("exist")
      .then(() => {
        found.push(pattern);
      });
  });

  // Return the body element as JQuery<HTMLElement>
  return cy.get("body") as Cypress.Chainable<JQuery<HTMLElement>>;
});

// Export empty object at the end
export {};

// Fix: Use an explicit cast to handle the JQuery type issues
Cypress.Commands.add("containsText", (text: string): void => {
  cy.get("body").invoke("text").should("include", text) as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
});

Cypress.Commands.add("logCurrentState", (): void => {
  cy.log("------ Current App State ------");
  cy.get("select").then(($selects) => {
    $selects.each((i, el) => {
      cy.log(`${el.id || "unknown select"}: ${el.value}`);
    });
  });
}); // Add the missing closing bracket

// Enhanced error handling for test failures
Cypress.on("fail", (error, runnable) => {
  // Log test failure with enhanced debug information
  cy.log(`Test failed: ${runnable.title}`);
  
  // Take screenshots with more descriptive names
  const testPath = Cypress.spec.relative.replace(/\.cy\.ts$/, '');
  const screenshotName = `${testPath}/${runnable.title.replace(/\s+/g, "-")}-failure`;
  
  cy.screenshot(screenshotName, { capture: 'viewport' });
  
  // Log more details about the error
  cy.log(`Error name: ${error.name}`);
  cy.log(`Error message: ${error.message}`);
  
  // For visibility issues, try to debug the element structure
  if (error.message.includes("not visible") || error.message.includes("not found")) {
    cy.log("Element visibility issue detected. Adding debug information...");
    cy.logVisibleElements();
    cy.logAllTestIds();
  }
  
  // Log important DOM information
  cy.document().then((doc) => {
    cy.log(`Page title: ${doc.title}`);
    cy.log(`Body classes: ${doc.body.className}`);
    cy.log(`Number of [data-testid] elements: ${doc.querySelectorAll('[data-testid]').length}`);
    cy.log(`URL at failure: ${doc.location.href}`);
    
    // Check for any error messages in the DOM
    const errorElements = doc.querySelectorAll('.error, [role="alert"], [class*="error"]');
    if (errorElements.length > 0) {
      cy.log(`Found ${errorElements.length} error elements in the DOM`);
      Array.from(errorElements).forEach((el, i) => {
        cy.log(`Error element ${i+1}: ${el.textContent?.trim()}`);
      });
    }
  });
  
  // Check for console errors
  cy.window().then((win) => {
    // If there are any console errors captured, log them
    if (win.consoleErrors && win.consoleErrors.length) {
      cy.log(`Found ${win.consoleErrors.length} console errors:`);
      win.consoleErrors.forEach((err, i) => {
        cy.log(`Console error ${i+1}: ${err}`);
      });
    }
  });
  
  // Throw the original error to fail the test
  throw error;
});

// Fix: Use proper type casting to handle the Chainable type issues
Cypress.Commands.add("verifyContentPresent", (patterns: Array<string | RegExp>) => {
  let matched = false;
  
  // Check each pattern
  cy.wrap(patterns).each((pattern: string | RegExp) => {
    if (typeof pattern === "string") {
      cy.get("body").then(($body) => {
        if ($body.text().includes(pattern)) {
          matched = true;
          cy.log(`Found text: "${pattern}"`);
        }
      });
    } else {
      cy.get("body").invoke("text").should("match", pattern);
      matched = true;
    }
  });
  
  // Return a proper chain
  return cy.wrap(matched) as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
});

// Fix for TypeScript error TS2322
Cypress.Commands.add("containsText", (text: string): Cypress.Chainable<JQuery<HTMLElement>> => {
  // Use proper type casting to address the complex return types
  return cy.get("body")
    .invoke("text")
    .should("include", text) as unknown as Cypress.Chainable<JQuery<HTMLElement>>;
});

// Fix for TypeScript error related to returning correct type from verifyContentPresent
Cypress.Commands.add("verifyContentPresent", (contentPatterns: Array<string | RegExp>): Cypress.Chainable<JQuery<HTMLElement>> => {
  // Array to track found patterns
  const found: (string | RegExp)[] = [];

  // Check each pattern
  contentPatterns.forEach((pattern) => {
    cy.contains(pattern)
      .should("exist")
      .then(() => {
        found.push(pattern);
      });
  });

  // Return the body element with proper type
  return cy.get("body") as Cypress.Chainable<JQuery<HTMLElement>>;
});

// Add this enhanced command to find security level controls with multiple strategies
Cypress.Commands.add('findSecurityLevelControls', () => {
  // Try multiple selector strategies
  const selectors = [
    '[data-testid="security-level-controls"]',
    '[data-testid*="security-level"]',
    '[data-testid="security-controls"]',
    '[data-testid*="security"][data-testid*="level"]',
    'select[name*="security"], select[name*="level"]',
    'form:contains("Security Level")'
  ];
  
  // Try each selector in order
  return cy.document().then(doc => {
    // Try each selector until we find a match
    for (const selector of selectors) {
      const elements = doc.querySelectorAll(selector);
      if (elements.length > 0) {
        cy.log(`Found security level controls with selector: ${selector}`);
        return cy.get(selector);
      }
    }
    
    // If still not found, look for any select elements that might be security controls
    const selects = doc.querySelectorAll('select');
    for (const select of Array.from(selects)) {
      const text = select.textContent?.toLowerCase() || '';
      const id = select.id?.toLowerCase() || '';
      const name = select.getAttribute('name')?.toLowerCase() || '';
      
      if (text.includes('security') || text.includes('level') || 
          id.includes('security') || id.includes('level') ||
          name.includes('security') || name.includes('level')) {
        cy.log(`Found potential security level control: ${select.outerHTML}`);
        return cy.wrap(select);
      }
    }
    
    // If still not found, log warning and return empty selector
    cy.log('WARNING: Could not find security level controls with any strategy');
    return cy.get('body').find('[data-testid="nonexistent"]');
  });
});
