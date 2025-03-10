/**
 * Helper functions for reliably finding widgets and components
 * regardless of exact test IDs or structure
 */

/**
 * Find a widget by name or test ID with fallback options
 */
export function findWidget(name: string, testIds: string[]): Cypress.Chainable {
  return cy.get("body").then(($body) => {
    // Try exact test IDs first
    for (const testId of testIds) {
      if ($body.find(`[data-testid="${testId}"]`).length) {
        return cy.get(`[data-testid="${testId}"]`);
      }
    }

    // Try partial test IDs next
    for (const testId of testIds) {
      if ($body.find(`[data-testid*="${testId}"]`).length) {
        return cy.get(`[data-testid*="${testId}"]`);
      }
    }

    // Try text content with case insensitivity
    const nameRegex = new RegExp(name.replace(/[-\s]/g, "[-\\s]?"), "i");
    if ($body.find(`h2:contains(${name}), h3:contains(${name})`).length) {
      return cy.contains(nameRegex);
    }

    // If all else fails, look for a widget or card that might contain the content
    return cy.get(".widget, .card").contains(nameRegex);
  });
}

/**
 * Find a business impact widget reliably
 */
export function findBusinessImpactWidget(): Cypress.Chainable {
  return findWidget("Business Impact", [
    "business-impact-summary",
    "combined-business-impact-widget",
    "business-impact",
    "impact-analysis",
  ]);
}

/**
 * Find a compliance status widget reliably
 */
export function findComplianceWidget(): Cypress.Chainable {
  return findWidget("Compliance", [
    "compliance-status-widget",
    "compliance-frameworks-container",
    "compliance-status",
    "compliance",
  ]);
}

/**
 * Find a compliance widget with ultra-resilient approach
 */
export function findComplianceWidgetResilient(): Cypress.Chainable {
  return cy.get("body").then(($body) => {
    // List of possible selectors from most to least specific
    const selectors = [
      '[data-testid="compliance-status-widget"]',
      '[data-testid="compliance-frameworks-container"]',
      '[data-testid="compliance-status"]',
      '[data-testid="compliance-status-badge"]',
      '[data-testid*="compliance"]',
      '[data-testid*="framework"]',
      '[data-testid*="regulation"]',
    ];

    // Try to find elements using selectors
    for (const selector of selectors) {
      if ($body.find(selector).length > 0) {
        return cy.get(selector).first();
      }
    }

    // If no selectors work, try finding headings or text
    const headingPatterns = [
      /compliance status/i,
      /framework compliance/i,
      /regulatory compliance/i,
      /compliance/i,
    ];

    // Try each heading pattern
    for (const pattern of headingPatterns) {
      if (
        $body
          .find("h1, h2, h3, h4, h5, h6")
          .filter((_, el) => pattern.test(el.textContent || "")).length > 0
      ) {
        return cy.contains(pattern);
      }
    }

    // Finally fall back to any text content
    return cy.contains(/compliance|framework|regulation|standard/i);
  });
}

/**
 * Find a cost estimation widget reliably
 */
export function findCostWidget(): Cypress.Chainable {
  return findWidget("Cost", [
    "cost-container",
    "cost-estimation-content",
    "widget-cost-estimation",
    "cost-estimation",
  ]);
}

/**
 * Find any element with a given pattern in its test ID or content
 */
export function findAnyElement(pattern: string | RegExp): Cypress.Chainable {
  const regex =
    typeof pattern === "string" ? new RegExp(pattern, "i") : pattern;

  return cy.get("body").then(($body) => {
    // Try data-testid attributes first
    const testIdElements = $body.find(`[data-testid]`).filter((_, el) => {
      return regex.test(el.getAttribute("data-testid") || "");
    });

    if (testIdElements.length) {
      return cy.wrap(testIdElements.first());
    }

    // Try text content next
    return cy.contains(regex);
  });
}
