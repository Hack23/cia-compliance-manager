import { SECURITY_LEVELS } from "../../support/constants";
import testPatterns from "../../support/test-patterns";

describe("Compliance Status Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays compliance status information", () => {
    cy.findWidget("compliance")
      .should("exist")
      .and("be.visible")
      .scrollIntoView();

    // Verify it contains compliance-related content
    cy.verifyWidgetContent("compliance", [
      /compliance|compliant|framework|regulation|standard/i,
      /status|requirement|meet/i,
    ]);
  });

  it("updates compliance status when security levels change", () => {
    // Use the reusable test pattern
    testPatterns.testComplianceStatusResilient({
      low: [SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW, SECURITY_LEVELS.LOW],
      high: [SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH, SECURITY_LEVELS.HIGH],
    });
  });

  it("shows different frameworks or regulations", () => {
    cy.findWidget("compliance").scrollIntoView();

    // Look for common compliance frameworks
    cy.verifyContentPresent([/HIPAA|GDPR|PCI|SOX|ISO|NIST/i]);
  });

  it("displays remediation steps for non-compliant frameworks", () => {
    // Set low security levels to ensure some non-compliance
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    cy.findWidget("compliance").scrollIntoView();

    // Look for remediation content
    cy.verifyContentPresent([/remediation|fix|improve|step|action/i]);
  });
});
