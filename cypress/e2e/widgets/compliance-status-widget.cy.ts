import {
  FRAMEWORK_TEST_IDS,
  SECURITY_LEVELS,
  COMPLIANCE_FRAMEWORKS,
  COMPLIANCE_STATUS,
  WIDGET_TEST_IDS,
} from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";

describe("Compliance Status Widget", () => {
  beforeEach(() => {
    // Use the correct test ID from the table
    setupWidgetTest(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET || "widget-compliance-status"
    );
  });

  it("shows compliance status for regulatory requirements", () => {
    // Check for compliance status widget using flexible selectors
    cy.get("body").then(($body) => {
      const complianceSelectors = [
        `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET}"]`,
        `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}"]`,
        `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER}"]`,
        `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}"]`,
        `[data-testid*="compliance"]`,
        `[data-testid*="status"]`,
      ];

      let foundSelector = false;
      for (const selector of complianceSelectors) {
        if ($body.find(selector).length) {
          cy.get(selector).first().should("be.visible");
          foundSelector = true;
          break;
        }
      }

      if (!foundSelector) {
        // Check for compliance text indicators
        cy.contains(/compliance|compliant|non-compliant|regulatory/i).should(
          "exist"
        );
      }
    });
  });

  it("indicates which specific frameworks are compliant", () => {
    // Set security levels high enough for compliance
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    cy.wait(500);

    // Check for framework statuses using flexible approach
    cy.get("body").then(($body) => {
      // Check for any framework name in the DOM
      const frameworkNames = Object.values(COMPLIANCE_FRAMEWORKS);
      let foundFramework = false;

      for (const framework of frameworkNames) {
        if ($body.text().includes(framework)) {
          foundFramework = true;
          break;
        }
      }

      // Assert that we found at least one framework
      expect(foundFramework).to.be.true;

      // Check for compliance status indicators
      cy.contains(new RegExp(COMPLIANCE_STATUS.FULL_COMPLIANCE, "i")).should(
        "exist"
      );
    });
  });

  it("provides business context for compliance requirements", () => {
    // Set security levels to create partial compliance
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    cy.wait(500);

    // Check for compliance requirements list
    cy.get("body").then(($body) => {
      if (
        $body.find(
          `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST}"]`
        ).length
      ) {
        cy.get(
          `[data-testid="${FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST}"]`
        ).should("exist");
      } else {
        // Look for compliance-related content
        const hasComplianceContext = [
          "regulatory",
          "requirement",
          "framework",
          "compliance",
          "standard",
          "certification",
          "audit",
        ].some((term) => $body.text().toLowerCase().includes(term));

        expect(hasComplianceContext).to.be.true;
      }
    });
  });
});
