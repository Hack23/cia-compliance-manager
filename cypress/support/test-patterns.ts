/**
 * Common test patterns to reduce duplication
 */

/**
 * Standard widget test pattern that verifies a widget exists and updates with security levels
 */
export function testWidgetUpdatesWithSecurityLevels(
  widgetSelector: string,
  contentSelector: string
) {
  // Check widget exists
  cy.get(widgetSelector).should("exist");

  // Get initial content
  cy.get(contentSelector)
    .invoke("text")
    .then((initialText) => {
      // Change security levels
      cy.setSecurityLevels("High", "High", "High");
      cy.wait(500); // Give UI time to update

      // Verify content has changed
      cy.get(contentSelector).invoke("text").should("not.equal", initialText);

      // Change back to verify it's responsive
      cy.setSecurityLevels("Low", "Low", "Low");
      cy.wait(500);

      // Verify content has changed again
      cy.get(contentSelector).invoke("text").should("not.equal", initialText);
    });
}

/**
 * Standard tabbed interface test pattern
 */
export function testTabbedInterface(tabListSelector: string, tabIds: string[]) {
  // Check tab list exists
  cy.get(tabListSelector).should("exist");

  // Test clicking each tab
  tabIds.forEach((tabId, index) => {
    cy.get(`[data-testid="${tabId}"]`).click();
    cy.wait(200);

    // Verify tab panel is visible
    const panelId = tabId.replace("tab-", "panel-");
    cy.get(`[aria-labelledby="${tabId}"]`).should("be.visible");

    // If not the last tab, verify we can navigate to the next one
    if (index < tabIds.length - 1) {
      cy.get(`[data-testid="${tabIds[index + 1]}"]`).should("exist");
    }
  });
}

/**
 * Standard test for checking cost updates when security levels change
 */
export function testCostUpdatesWithSecurityLevels(
  costElementSelector: string,
  securityLevels: {
    low: [string, string, string];
    high: [string, string, string];
  }
) {
  // Start with low security
  cy.setSecurityLevels(...securityLevels.low);
  cy.wait(300);

  // Get initial costs
  cy.get(costElementSelector)
    .invoke("text")
    .then((lowLevelCost) => {
      // Set to high security
      cy.setSecurityLevels(...securityLevels.high);
      cy.wait(300);

      // Costs should change (usually increase)
      cy.get(costElementSelector)
        .invoke("text")
        .should("not.equal", lowLevelCost);
    });
}

/**
 * Helper to verify compliance status updates based on security levels
 */
export function testComplianceStatus(
  complianceElementSelector: string,
  securityLevels: {
    low: [string, string, string];
    high: [string, string, string];
  }
) {
  // Test with low security first
  cy.setSecurityLevels(...securityLevels.low);
  cy.wait(300);

  // Capture initial compliance status
  cy.get(complianceElementSelector)
    .invoke("text")
    .then((lowLevelStatus) => {
      // Now test with high security
      cy.setSecurityLevels(...securityLevels.high);
      cy.wait(300);

      // Verify compliance status has changed
      cy.get(complianceElementSelector)
        .invoke("text")
        .should("not.equal", lowLevelStatus);
    });
}

/**
 * More resilient helper to verify compliance status updates based on security levels
 */
export function testComplianceStatusResilient(securityLevels: {
  low: [string, string, string];
  high: [string, string, string];
}) {
  // First - simply verify we can find compliance-related content
  cy.get("body").then(($body) => {
    const bodyText = $body.text().toLowerCase();
    const hasComplianceTerms = [
      "compliance",
      "compliant",
      "framework",
      "standard",
      "regulation",
      "requirement",
    ].some((term) => bodyText.includes(term));

    expect(hasComplianceTerms).to.be.true;
    cy.log("Found compliance-related terms on the page");
  });

  // Test with low security first - directly manipulate selects
  cy.get("select").each(($select, index) => {
    if (index === 0)
      cy.wrap($select).select(securityLevels.low[0], { force: true }).wait(200);
    if (index === 1)
      cy.wrap($select).select(securityLevels.low[1], { force: true }).wait(200);
    if (index === 2)
      cy.wrap($select).select(securityLevels.low[2], { force: true }).wait(200);
  });
  cy.wait(1000);

  // Capture initial page content
  cy.get("body")
    .invoke("text")
    .then((lowLevelContent) => {
      // Now test with high security - directly manipulate selects
      cy.get("select").each(($select, index) => {
        if (index === 0)
          cy.wrap($select)
            .select(securityLevels.high[0], { force: true })
            .wait(200);
        if (index === 1)
          cy.wrap($select)
            .select(securityLevels.high[1], { force: true })
            .wait(200);
        if (index === 2)
          cy.wrap($select)
            .select(securityLevels.high[2], { force: true })
            .wait(200);
      });
      cy.wait(1000);

      // Verify content has changed
      cy.get("body")
        .invoke("text")
        .then((highLevelContent) => {
          // Check if content has changed with higher security levels
          expect(highLevelContent).not.to.equal(lowLevelContent);

          // Also check for text specific to high security (optional)
          expect(highLevelContent.toLowerCase()).to.include(
            securityLevels.high[0].toLowerCase()
          );
          cy.log("Content changed after setting higher security levels");
        });
    });
}
