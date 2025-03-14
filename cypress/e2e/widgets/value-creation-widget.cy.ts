import { SECURITY_LEVELS } from "../../support/constants";
import testPatterns from "../../support/test-patterns";

describe("Value Creation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays value creation information", () => {
    cy.findWidget("value-creation")
      .should("exist")
      .and("be.visible")
      .scrollIntoView();

    // Verify it contains value-related content
    cy.verifyWidgetContent("value-creation", [
      /value|benefit|roi|return/i,
      /creation|generation/i,
    ]);
  });

  it("updates value metrics when security levels change", () => {
    testPatterns.testWidgetUpdatesWithSecurityLevels(
      '[data-testid="value-creation-widget"]',
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

  it("shows ROI and other financial metrics", () => {
    cy.findWidget("value-creation").scrollIntoView();

    // Look for ROI and financial metrics
    cy.verifyContentPresent([
      /roi|return on investment/i,
      /break[\s-]?even|payback/i,
      /saving|cost avoidance|benefit/i,
    ]);
  });

  it("displays different value creation levels", () => {
    // Set low security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Store initial value metrics
    cy.findWidget("value-creation").invoke("text").as("lowSecurityValue");

    // Set high security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify metrics changed
    cy.get("@lowSecurityValue").then((lowSecurityText) => {
      cy.findWidget("value-creation")
        .invoke("text")
        .should("not.equal", lowSecurityText);
    });
  });
});
