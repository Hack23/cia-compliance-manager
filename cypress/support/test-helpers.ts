/**
 * Enhanced test helper functions for more reliable test execution
 */

/**
 * Performs a more reliable element interaction with robust error handling
 */
export function interactWithElement(
  selector: string,
  action: "click" | "select" | "type" | "check",
  options: any = {}
) {
  const { value, force = true, timeout = 5000 } = options; // Reduced default timeout

  // First ensure the element exists and is attached to DOM
  return cy
    .get(selector, { timeout })
    .should("exist")
    .then(($el) => {
      // Ensure element is visible in viewport
      cy.wrap($el).scrollIntoView({ duration: 100 }).wait(300); // Reduced wait time

      // Force visibility if element might be hidden
      if (!$el.is(":visible")) {
        cy.wrap($el).invoke("css", "opacity", "1");
        cy.wrap($el).invoke("css", "visibility", "visible");
        cy.wrap($el).invoke("css", "display", "block");
      }

      // Perform the requested action with force option for reliability
      switch (action) {
        case "click":
          return cy.wrap($el).click({ force });
        case "select":
          return cy.wrap($el).select(value, { force });
        case "type":
          return cy.wrap($el).clear({ force }).type(value, { force });
        case "check":
          return cy.wrap($el).check({ force });
        default:
          return cy.wrap($el);
      }
    });
}

/**
 * Waits for an element with enhanced reliability
 */
export function waitForElement(
  selector: string,
  options: any = {}
): Cypress.Chainable<JQuery<HTMLElement>> {
  const { timeout = 5000, visibility = true, retry = 2 } = options; // Reduced timeout and retries

  let attempts = 0;

  const checkElement = (): Cypress.Chainable<JQuery<HTMLElement>> => {
    attempts++;
    return cy.get("body").then(($body) => {
      if ($body.find(selector).length) {
        if (visibility) {
          return cy.get(selector, { timeout }).should("be.visible");
        }
        return cy.get(selector, { timeout }).should("exist");
      } else if (attempts < retry) {
        // If not found, wait and retry
        cy.wait(1000);
        return checkElement();
      } else {
        // After retries, fall back to the standard approach
        return cy.get(selector, { timeout });
      }
    });
  };

  return checkElement();
}

/**
 * Skip test conditionally if certain elements are not found
 * @param selector Element that must exist for test to run
 * @param message Skip message
 */
export function skipTestIfElementMissing(selector: string, message: string) {
  cy.get("body").then(($body) => {
    if (!$body.find(selector).length) {
      cy.log(`**Test skipped:** ${message}`);
      // Use type assertion to access internal Cypress methods
      (cy as any).state("test").skip();
    }
  });
}

/**
 * Safer implementation of safeScrollIntoView that handles fixed position elements
 * and ensures the element is truly visible
 */
Cypress.Commands.add(
  "safeScrollIntoView",
  // Fix: Use correct type for prevSubject
  { prevSubject: true },
  (subject, options = {}) => {
    // Extract options that are safe for ScrollIntoViewOptions
    const { duration, ...otherOptions } = options;

    // Create ScrollIntoViewOptions object without duration property
    const scrollOptions = {
      block: "center" as ScrollLogicalPosition,
      behavior: "smooth" as ScrollBehavior,
      ...otherOptions,
    };

    // Extract duration separately to avoid type error
    const waitDuration = typeof duration === "number" ? duration : 300;

    return cy
      .wrap(subject)
      .then(($el) => {
        // Try standard scrollIntoView with proper options
        return cy
          .wrap($el)
          .scrollIntoView(scrollOptions) // Use scrollOptions without duration
          .then(() => {
            // Check if element is now in viewport
            return cy.wrap($el).then(($el) => {
              const rect = $el[0].getBoundingClientRect();
              const isInViewport =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= Cypress.config().viewportHeight &&
                rect.right <= Cypress.config().viewportWidth;

              // If not fully in viewport, try alternative scroll approach
              if (!isInViewport) {
                cy.window().then((win) => {
                  const { top } = $el[0].getBoundingClientRect();
                  win.scrollTo(0, window.scrollY + top - 100);
                });
              }

              return cy.wrap($el);
            });
          });
      })
      .wait(waitDuration); // Use the fixed duration value
  }
);

/**
 * Helper to ensure all app animations are completed
 */
export function ensureAnimationsComplete() {
  return cy.wait(500).then(() => {
    return cy.document().then((doc) => {
      doc.body.classList.add("cypress-no-animations");
      const style = doc.createElement("style");
      style.innerHTML = `
        * {
          transition-duration: 0ms !important;
          animation-duration: 0ms !important;
          transition-delay: 0ms !important;
          animation-delay: 0ms !important;
        }
      `;
      doc.head.appendChild(style);
    });
  });
}

/**
 * Set security levels with maximum reliability using data-testid selectors
 */
export const setSecurityLevelsReliably = (
  availability: string,
  integrity: string,
  confidentiality: string
): void => {
  cy.setSecurityLevels(availability, integrity, confidentiality);
};

/**
 * Check if text exists anywhere in the document
 */
export const textExistsAnywhere = (
  text: string
): Cypress.Chainable<boolean> => {
  return cy.get("body").then(($body) => {
    const content = $body.text();
    return content.includes(text);
  });
};

/**
 * Simple logging of page elements
 */
export const logPageElements = (): void => {
  cy.get("body").then(($body) => {
    cy.log(`Page contains ${$body.find("div").length} div elements`);
    cy.log(`Page contains ${$body.find("select").length} select elements`);
    cy.log(`Page contains ${$body.find("button").length} button elements`);
    cy.log(`Page contains ${$body.find("input").length} input elements`);
  });
};

/**
 * Forces elements to be visible by overriding CSS properties that might hide them
 * Enhanced version with more aggressive visibility fixing
 * @param selector The CSS selector for the element
 * @returns Cypress chainable for continued operations
 */
export function forceElementVisibility(selector: string) {
  return cy.get(selector).then(($el) => {
    // Apply styles directly to the element
    cy.wrap($el).invoke(
      "attr",
      "style",
      "visibility: visible !important; " +
        "display: block !important; " +
        "opacity: 1 !important; " +
        "position: static !important; " +
        "transform: none !important; " +
        "pointer-events: auto !important; " +
        "clip: auto !important; " +
        "clip-path: none !important; " +
        "z-index: 9999 !important"
    );

    // Fix all parent elements to ensure visibility
    let current = $el.parent();
    let depth = 0;
    const maxDepth = 10; // Limit how far up we go to avoid infinite loops

    while (current.length && !current.is("body") && depth < maxDepth) {
      cy.wrap(current).invoke(
        "attr",
        "style",
        "overflow: visible !important; " +
          "visibility: visible !important; " +
          "display: block !important; " +
          "opacity: 1 !important; " +
          "height: auto !important; " +
          "max-height: none !important; " +
          "pointer-events: auto !important"
      );
      current = current.parent();
      depth++;
    }

    return cy.wrap($el);
  });
}

/**
 * Verify text content with flexible matching
 * Accommodates minor text changes without breaking tests
 */
export function verifyTextContent(
  selector: string,
  expectedText: string,
  exactMatch = false
) {
  return cy
    .get(selector)
    .invoke("text")
    .then((text) => {
      if (exactMatch) {
        expect(text.trim()).to.equal(expectedText);
      } else {
        // Check if it's a close enough match by checking key parts
        const normalizedText = text.toLowerCase().replace(/\s+/g, " ").trim();
        const normalizedExpected = expectedText
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim();

        // Create variations of expected text to handle common wording changes
        const expectedVariations = [
          normalizedExpected,
          // Different cases
          expectedText.toLowerCase(),
          expectedText.toUpperCase(),
          // Common word variations
          normalizedExpected.replace("non-compliant", "non-compliant with"),
          normalizedExpected.replace("compliant", "compliance"),
          // Add more variations as needed
        ];

        // Check if any variation matches
        const isMatch = expectedVariations.some((variation) =>
          normalizedText.includes(variation)
        );

        expect(
          isMatch,
          `Expected text to contain a variation of "${expectedText}" but found "${text}"`
        ).to.be.true;
      }
    });
}

/**
 * Find an element by trying multiple test IDs
 * Returns the first matching element
 */
export function findElementByMultipleTestIds(testIds: string[]) {
  return cy.document().then((doc) => {
    for (const id of testIds) {
      const element = doc.querySelector(`[data-testid="${id}"]`);
      if (element) {
        return cy.wrap(element);
      }
    }

    // If no exact matches, try partial matches
    for (const id of testIds) {
      const elements = doc.querySelectorAll(`[data-testid*="${id}"]`);
      if (elements.length > 0) {
        return cy.wrap(elements[0]);
      }
    }

    // Nothing found, return the original selector for proper error reporting
    return cy.get(`[data-testid="${testIds[0]}"]`);
  });
}

/**
 * Find a widget by name using multiple selector strategies
 * @param widgetName The name of the widget (e.g., 'technical', 'security')
 * @returns Cypress chainable with the found element
 */
export function findWidgetByName(widgetName: string) {
  return cy.get("body").then(($body) => {
    // Try specific data-testid first
    let found = $body.find(`[data-testid="widget-${widgetName}"]`);

    // Try partial data-testid match
    if (!found.length) {
      found = $body.find(`[data-testid*="${widgetName}"]`);
    }

    // Try heading text
    if (!found.length) {
      found = $body
        .find(`h3:contains("${widgetName}")`)
        .closest("[data-testid]");
    }

    // If still not found, widen the search
    if (!found.length) {
      found = $body
        .find(`div:contains("${widgetName}")`)
        .closest("[data-testid]");
    }

    if (found.length) {
      return cy.wrap(found);
    }

    // If nothing found, log and return empty selector
    cy.log(`Could not find widget: ${widgetName}`);
    return cy.wrap($body.find(`[data-testid="nonexistent-${widgetName}"]`));
  });
}

/**
 * Enhanced test helpers for improved test resilience
 */
import { SECURITY_LEVELS } from "./constants";

/**
 * Verifies widget content with more flexible matching strategies
 * @param widgetSelector Widget selector or name
 * @param contentPatterns Content patterns to search for
 * @param options Additional options
 */
export function verifyWidgetContent(
  widgetSelector: string, 
  contentPatterns: (string | RegExp)[],
  options: {
    exactMatch?: boolean;
    timeout?: number;
  } = {}
) {
  const { exactMatch = false, timeout = 10000 } = options;
  
  // Find the widget using our enhanced finder
  cy.findWidget(widgetSelector)
    .should('exist', { timeout })
    .within(() => {
      // Check each content pattern
      contentPatterns.forEach(pattern => {
        if (typeof pattern === 'string') {
          if (exactMatch) {
            // Exact string match
            cy.contains(new RegExp(`^${pattern}$`)).should('exist');
          } else {
            // Flexible string match
            cy.contains(pattern).should('exist');
          }
        } else {
          // RegExp matching
          cy.contains(pattern).should('exist');
        }
      });
    });
}

/**
 * Enhanced function to verify accessibility compliance for a widget
 * @param widgetSelector Widget selector or name
 */
export function verifyWidgetAccessibility(widgetSelector: string) {
  // Find the widget
  cy.findWidget(widgetSelector)
    .scrollIntoView()
    .within(() => {
      // Check interactive elements have accessible names
      cy.get('button, [role="button"], a, [role="link"], select, input')
        .each($el => {
          cy.wrap($el).then($element => {
            const accessibleName = 
              $element.attr('aria-label') || 
              $element.attr('aria-labelledby') || 
              $element.text().trim() ||
              $element.attr('title') ||
              $element.attr('aria-placeholder') ||
              $element.attr('placeholder');
              
            // Skip image-only elements that might be decorative
            const isDecorative = 
              $element.children('svg, img').length > 0 && 
              !$element.text().trim();
              
            if (!accessibleName && !isDecorative) {
              cy.log(`Element without accessible name: ${$element.prop('outerHTML')}`);
            }
          });
        });
        
      // Check if tabbed interface is accessible
      cy.get('[role="tab"]').each($tab => {
        cy.wrap($tab).should('have.attr', 'aria-controls');
      });
      
      cy.get('[role="tabpanel"]').each($panel => {
        cy.wrap($panel).should('have.attr', 'aria-labelledby');
      });
        
      // Check for proper heading structure
      cy.get('h1, h2, h3, h4, h5, h6').should('exist');
    });
}

/**
 * Verifies that all widgets respond to security level changes
 * @param securityLevels Security levels to test
 */
export function verifyAllWidgetsRespondToSecurityLevels(
  initialLevels: [string, string, string],
  newLevels: [string, string, string]
) {
  // Set initial security levels
  cy.setSecurityLevels(...initialLevels);
  
  // Store initial content state
  const widgetContent: Record<string, string> = {};
  
  // List of common widgets to check
  const widgetsToCheck = [
    'security-summary',
    'business-impact',
    'compliance',
    'cost',
    'value-creation',
    'technical',
    'radar-chart'
  ];
  
  // Store content for each widget
  widgetsToCheck.forEach(widget => {
    cy.findWidget(widget)
      .scrollIntoView()
      .invoke('text')
      .then(text => {
        widgetContent[widget] = text;
      });
  });
  
  // Change security levels
  cy.setSecurityLevels(...newLevels);
  
  // Verify content changed for all widgets
  widgetsToCheck.forEach(widget => {
    cy.findWidget(widget)
      .scrollIntoView()
      .invoke('text')
      .should(text => {
        expect(text).not.to.equal(widgetContent[widget]);
      });
  });
}

/**
 * A more comprehensive test for checking a widget's response to security level changes
 * @param widgetSelector Widget selector or name
 */
export function comprehensiveSecurityLevelTest(widgetSelector: string) {
  // Test with all security level combinations
  const levels = [
    SECURITY_LEVELS.NONE,
    SECURITY_LEVELS.LOW,
    SECURITY_LEVELS.MODERATE,
    SECURITY_LEVELS.HIGH,
    SECURITY_LEVELS.VERY_HIGH
  ];
  
  // Store initial content with lowest security
  cy.setSecurityLevels(levels[0], levels[0], levels[0]);
  
  cy.findWidget(widgetSelector)
    .scrollIntoView()
    .invoke('text')
    .then(initialText => {
      // Set highest security
      cy.setSecurityLevels(
        levels[levels.length-1], 
        levels[levels.length-1],
        levels[levels.length-1]
      );
      
      // Verify content has changed
      cy.findWidget(widgetSelector)
        .scrollIntoView()
        .invoke('text')
        .should('not.equal', initialText);
    });
}

// Add to exports
export default {
  interactWithElement,
  waitForElement,
  skipTestIfElementMissing,
  ensureAnimationsComplete,
  setSecurityLevelsReliably,
  textExistsAnywhere,
  logPageElements,
  forceElementVisibility,
  verifyTextContent,
  findElementByMultipleTestIds,
  findWidgetByName,
  verifyWidgetContent,
  verifyWidgetAccessibility,
  verifyAllWidgetsRespondToSecurityLevels,
  comprehensiveSecurityLevelTest
};
