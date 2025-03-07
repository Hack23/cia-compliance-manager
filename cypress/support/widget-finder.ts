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
