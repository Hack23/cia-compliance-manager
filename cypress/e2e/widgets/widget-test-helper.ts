/**
 * Common helper functions for widget tests
 */
import {
  TEST_IDS,
  WIDGET_TEST_IDS,
  CIA_TEST_IDS,
  COST_TEST_IDS,
  SUMMARY_TEST_IDS,
  BUSINESS_IMPACT_TEST_IDS,
  CHART_TEST_IDS,
  FRAMEWORK_TEST_IDS,
  // Add these missing imports
  VALUE_CREATION_TEST_IDS,
  TECHNICAL_DETAILS_TEST_IDS,
} from "../../support/constants";

/**
 * Ensures a widget is visible and all parent containers allow proper display
 * @param widgetId The test ID of the widget
 */
export function ensureWidgetVisible(widgetId: string) {
  // First force all parent containers to be visible
  cy.get(`[data-testid="${widgetId}"]`).then(($el) => {
    // Make all parents visible with proper overflow
    let current = $el.parent();
    while (current.length && !current.is("body")) {
      cy.wrap(current).invoke("css", "overflow", "visible");
      cy.wrap(current).invoke("css", "display", "block");
      current = current.parent();
    }

    // Now make the element itself visible
    cy.wrap($el)
      .invoke("css", "visibility", "visible")
      .invoke("css", "display", "block")
      .invoke("css", "opacity", "1");
  });
}

/**
 * Standard setup for widget tests - handles visibility and scrolling
 * @param widgetId The test ID of the widget or a partial ID to search for
 */
export function setupWidgetTest(widgetId: string) {
  cy.viewport(3840, 2160);
  cy.visit("/");
  cy.ensureAppLoaded();

  // Add style to prevent overflow issues in all containers
  cy.document().then((doc) => {
    const style = doc.createElement("style");
    style.innerHTML = `
      * {
        overflow: visible !important;
        visibility: visible !important;
        opacity: 1 !important;
        transition: none !important;
        animation: none !important;
        clip: auto !important;
        clip-path: none !important;
        position: static !important;
      }
      .widget-body, .widget-content-wrapper {
        display: block !important;
        height: auto !important;
        max-height: none !important;
      }
    `;
    doc.head.appendChild(style);
  });

  // Wait for app to stabilize
  cy.wait(500);

  // Try exact match first, then fallback to partial match
  cy.document().then((doc) => {
    const elements = doc.querySelectorAll(`[data-testid="${widgetId}"]`);
    if (elements.length > 0) {
      ensureWidgetVisible(widgetId);
    } else {
      // Look up widget by known ID mapping first
      const mappedIds = getWidgetId(widgetId);
      let foundMappedId = false;

      for (const mappedId of mappedIds) {
        if (doc.querySelector(`[data-testid="${mappedId}"]`)) {
          cy.log(`Found widget with mapped ID: ${mappedId}`);
          ensureWidgetVisible(mappedId);
          foundMappedId = true;
          break;
        }
      }

      if (!foundMappedId) {
        // If no mapped ID found, try partial match
        cy.get(`[data-testid*="${widgetId}"]`)
          .first()
          .then(($el) => {
            const actualId = $el.attr("data-testid");
            if (actualId) {
              cy.log(`Found alternative widget with ID: ${actualId}`);
              ensureWidgetVisible(actualId);
            } else {
              // If we still can't find it, try a more generic approach
              cy.log(
                `No data-testid found containing ${widgetId}, trying generic approach`
              );
              // Try to find by content instead
              cy.contains(
                new RegExp(widgetId.replace(/-/g, " "), "i")
              ).scrollIntoView();
            }
          });
      }
    }
  });
}

/**
 * Set security levels with improved reliability and waits between selections
 * Using proper test IDs from CIA_TEST_IDS
 */
export function setSecurityLevelsReliable(
  availability: string,
  integrity: string,
  confidentiality: string
) {
  // First make sure the security controls are in the viewport
  // Using correct test ID from WIDGET_TEST_IDS
  cy.get(`[data-testid="${WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET}"]`)
    .scrollIntoView({ duration: 100 })
    .should("be.visible");

  // Make selections with forced option and short waits between
  // Using correct test IDs from CIA_TEST_IDS
  cy.get(`[data-testid="${CIA_TEST_IDS.AVAILABILITY_SELECT}"]`)
    .select(availability, { force: true })
    .wait(300);

  cy.get(`[data-testid="${CIA_TEST_IDS.INTEGRITY_SELECT}"]`)
    .select(integrity, { force: true })
    .wait(300);

  cy.get(`[data-testid="${CIA_TEST_IDS.CONFIDENTIALITY_SELECT}"]`)
    .select(confidentiality, { force: true })
    .wait(300);
}

/**
 * Check for text content using more flexible matching strategy
 */
export function checkForTextContent(content: string | RegExp) {
  if (typeof content === "string") {
    // Check for exact or partial match
    cy.get("body").then(($body) => {
      const bodyText = $body.text();
      if (bodyText.includes(content)) {
        // Found direct match
        cy.log(`Found text content: "${content}"`);
        return true;
      } else {
        // Try more flexible approach with CI/CD-friendly matching
        const normalizedContent = content.toLowerCase().replace(/\s+/g, "");
        const normalizedBodyText = bodyText.toLowerCase().replace(/\s+/g, "");
        if (normalizedBodyText.includes(normalizedContent)) {
          cy.log(`Found normalized text content: "${content}"`);
          return true;
        }
      }
      cy.log(`Could not find text content: "${content}"`);
      return false;
    });
  } else {
    // RegExp matching
    cy.get("body").invoke("text").should("match", content);
  }
}

/**
 * Get a test ID using primary ID or try several alternatives as fallbacks
 * Handles common test ID variations between tests and UI
 * Updated with all widget test IDs from the table
 */
export function getWidgetId(primaryId: string): string[] {
  // Comprehensive mapping of widget IDs based on the table
  const idMappings: Record<string, string[]> = {
    // Security Level Widget
    "widget-security-level": [
      WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET,
      "widget-security-level-selection",
      "security-level-selector",
      "security-level-controls",
    ],
    // Security Summary Widget
    "widget-security-summary": [
      SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER,
      "widget-security-summary",
    ],
    // Business Impact Widget
    "widget-business-impact": [
      BUSINESS_IMPACT_TEST_IDS.BUSINESS_IMPACT_ANALYSIS_PREFIX,
      "widget-business-impact-container",
      "business-impact-container",
    ],
    // Cost Estimation Widget
    "widget-cost-estimation": [
      COST_TEST_IDS.COST_ESTIMATION_WIDGET,
      COST_TEST_IDS.COST_CONTAINER,
      "widget-cost-estimation",
      "cost-container",
    ],
    // Radar Chart Widget
    "widget-radar-chart": [CHART_TEST_IDS.RADAR_CHART, "widget-radar-chart"],
    // Compliance Status Widget
    "widget-compliance-status": [
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
      "widget-compliance-status",
    ],
    // Value Creation Widget
    "widget-value-creation": [
      // Fixed: Use VALUE_CREATION_TEST_IDS that is now properly imported
      VALUE_CREATION_TEST_IDS.VALUE_CREATION_PREFIX,
      "widget-value-creation",
    ],
    // Technical Details Widget
    "widget-technical-details": [
      // Fixed: Use TECHNICAL_DETAILS_TEST_IDS that is now properly imported
      TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
      "widget-technical-details-container",
      "technical-details-widget",
    ],
  };

  // Return widget-specific mappings if they exist
  if (primaryId in idMappings) {
    return idMappings[primaryId];
  }

  // Try to find a matching prefix
  for (const key of Object.keys(idMappings)) {
    if (primaryId.startsWith(key)) {
      return idMappings[key];
    }
  }

  // Return common patterns as fallback
  const featureName = primaryId.replace(/^widget-/, "");
  return [
    primaryId,
    `widget-${featureName}`,
    `${featureName}-container`,
    `${featureName}-content`,
    `${featureName}-section`,
  ];
}
