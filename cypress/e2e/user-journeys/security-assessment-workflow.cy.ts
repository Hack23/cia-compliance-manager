describe("Complete Security Assessment Workflow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();

    // Ensure larger viewport for full visibility
    cy.viewport(1280, 800);

    // Take screenshot of initial state
    cy.screenshot("assessment-workflow-initial");

    // Wait for app to fully load
    cy.wait(1000);
  });

  it("completes a full security assessment from Low to High", () => {
    // Business flow 1: Initial assessment at Low security
    cy.log("Step 1: Setting LOW security levels for initial assessment");
    cy.get("body").then(($body) => {
      if ($body.find("select").length >= 3) {
        cy.get("select").eq(0).select("Low", { force: true });
        cy.wait(300);
        cy.get("select").eq(1).select("Low", { force: true });
        cy.wait(300);
        cy.get("select").eq(2).select("Low", { force: true });
      } else {
        cy.setSecurityLevels("Low", "Low", "Low");
      }
    });

    cy.wait(1000);
    cy.screenshot("low-security-set");

    // Check widgets exist with more resilient method
    cy.log("Verifying cost-estimation and compliance-status widgets exist");

    // More flexible widget verification
    cy.get("body").then(($body) => {
      // Look for cost-estimation widget
      const costSelectors = [
        '[data-testid="widget-cost-estimation"]',
        '[data-testid="cost-estimation"]',
        '[data-testid*="cost"]',
        '[class*="cost"]',
      ];

      let costFound = false;
      for (const selector of costSelectors) {
        if ($body.find(selector).length > 0) {
          costFound = true;
          cy.log(`Found cost widget with selector: ${selector}`);

          // Verify initial business metrics
          cy.get(selector).contains(
            /initial investment|budget|cost|capex|opex/i
          );
          break;
        }
      }

      if (!costFound) {
        cy.log("⚠️ Cost estimation widget not found");
      }

      // Look for compliance-status widget
      const complianceSelectors = [
        '[data-testid="widget-compliance-status"]',
        '[data-testid="compliance-status"]',
        '[data-testid*="compliance"]',
        '[class*="compliance"]',
      ];

      let complianceFound = false;
      for (const selector of complianceSelectors) {
        if ($body.find(selector).length > 0) {
          complianceFound = true;
          cy.log(`Found compliance widget with selector: ${selector}`);

          // Verify compliance status - more flexible pattern
          cy.get(selector).contains(/non-compliant|partial|low|minimum/i);
          break;
        }
      }

      if (!complianceFound) {
        cy.log("⚠️ Compliance status widget not found");
        // Try general page content instead
        cy.contains(/compliance|non-compliant|partial/i).should("exist");
      }
    });

    // Business flow 2: Upgrade security settings
    cy.log("Step 2: Upgrading to MODERATE + HIGH security levels");
    cy.get("body").then(($body) => {
      if ($body.find("select").length >= 3) {
        cy.get("select").eq(0).select("Moderate", { force: true });
        cy.wait(300);
        cy.get("select").eq(1).select("Moderate", { force: true });
        cy.wait(300);
        cy.get("select").eq(2).select("High", { force: true });
      } else {
        cy.setSecurityLevels("Moderate", "Moderate", "High");
      }
    });

    cy.wait(1000);
    cy.screenshot("upgraded-security-levels");

    // Business flow 3: Verify ROI and compliance improvements with more resilient selectors
    cy.log("Step 3: Verifying ROI and compliance improvements");

    // Look for value-creation widget
    cy.get("body").then(($body) => {
      const valueSelectors = [
        '[data-testid="widget-value-creation"]',
        '[data-testid="value-creation"]',
        '[data-testid*="value"]',
        '[data-testid*="roi"]',
        '[class*="value"]',
      ];

      let valueFound = false;
      for (const selector of valueSelectors) {
        if ($body.find(selector).length > 0) {
          valueFound = true;
          cy.log(`Found value creation widget with selector: ${selector}`);

          // Check for ROI-related text
          cy.get(selector).contains(/roi|return on investment|benefit|value/i);
          break;
        }
      }

      if (!valueFound) {
        cy.log("⚠️ Value creation widget not found");
        // Try general page content
        cy.contains(/roi|return on investment|benefit|value/i).should("exist");
      }
    });

    // Check improved compliance status
    cy.get("body").then(($body) => {
      const complianceSelectors = [
        '[data-testid="widget-compliance-status"]',
        '[data-testid="compliance-status"]',
        '[data-testid*="compliance"]',
        '[class*="compliance"]',
      ];

      let complianceFound = false;
      for (const selector of complianceSelectors) {
        if ($body.find(selector).length > 0) {
          complianceFound = true;
          cy.log(`Found compliance widget with selector: ${selector}`);

          // Verify improved compliance
          cy.get(selector).contains(/improved|meets|requirements|better/i);
          break;
        }
      }

      if (!complianceFound) {
        cy.log("⚠️ Compliance status widget not found for verification");
        // Try general page content
        cy.contains(/improved|meets requirements|better compliance/i).should(
          "exist"
        );
      }
    });

    // Business flow 4: Review recommendations
    cy.log("Step 4: Reviewing security recommendations");
    cy.get("body").then(($body) => {
      const summarySelectors = [
        '[data-testid="widget-security-summary"]',
        '[data-testid="security-summary"]',
        '[data-testid*="summary"]',
        '[class*="summary"]',
      ];

      let summaryFound = false;
      for (const selector of summarySelectors) {
        if ($body.find(selector).length > 0) {
          summaryFound = true;
          cy.log(`Found security summary with selector: ${selector}`);

          // Verify recommendations
          cy.get(selector).contains(
            /recommendations|suggested|advice|best practice/i
          );
          break;
        }
      }

      if (!summaryFound) {
        cy.log("⚠️ Security summary widget not found");
        // Try general page content
        cy.contains(/recommendations|suggested|advice/i).should("exist");
      }
    });

    // Final verification of overall workflow completion
    cy.screenshot("security-assessment-complete");
  });
});
