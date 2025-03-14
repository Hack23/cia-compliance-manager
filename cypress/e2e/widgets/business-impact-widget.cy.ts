import { SECURITY_LEVELS } from "../../support/constants";
import testPatterns from "../../support/test-patterns";

describe("Business Impact Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows business impact of security choices", () => {
    // Find business impact widget
    cy.findWidget("business-impact")
      .should("exist")
      .scrollIntoView()
      .should("be.visible");

    // Verify it contains relevant content
    cy.verifyWidgetContent("business-impact", [
      /impact|effect|influence/i,
      /business|organization/i,
    ]);
  });

  it("updates impact information when security levels change", () => {
    testPatterns.testWidgetUpdatesWithSecurityLevels(
      '[data-testid="business-impact-widget"]',
      {
        initialLevels: [
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
          SECURITY_LEVELS.LOW,
        ],
        newLevels: [
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
        ],
        expectTextChange: true,
      }
    );
  });

  it("has tabs for different CIA components", () => {
    // Find business impact widget
    cy.findWidget("business-impact").scrollIntoView();

    // Test tab navigation
    testPatterns.testTabNavigation('[data-testid="business-impact-widget"]');
  });

  it("shows different metrics for different security levels", () => {
    // Set to low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Store initial metrics
    cy.findWidget("business-impact").invoke("text").as("lowSecurityMetrics");

    // Set to high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify metrics changed
    cy.get("@lowSecurityMetrics").then((lowSecurityText) => {
      cy.findWidget("business-impact")
        .invoke("text")
        .should("not.equal", lowSecurityText);
    });
  });
});
