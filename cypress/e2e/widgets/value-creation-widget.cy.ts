import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Value Creation Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("value-creation");

  // Basic existence test
  verifyWidgetExists("value-creation");

  // Test security level changes affect widget content
  it("updates value metrics when security levels change", () => {
    testSecurityLevelChanges("value-creation");
  });

  // Test value metrics display
  it("displays ROI and value metrics", () => {
    cy.findWidget("value-creation").scrollIntoView();

    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify value metrics
    cy.findWidget("value-creation").within(() => {
      // Check for ROI percentage
      cy.contains(/%/).should("exist");
      cy.contains(/roi|return/i).should("exist");

      // Check for benefits or value points
      cy.contains(/benefit|value|saving/i).should("exist");
    });
  });

  // Test increasing ROI with balanced security levels
  it("shows balanced ROI with moderate security levels", () => {
    cy.findWidget("value-creation").scrollIntoView();

    // Test extremes - very low and very high
    // Set low security first
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.findWidget("value-creation").invoke("text").as("lowValue");

    // Then moderate security
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    cy.findWidget("value-creation").invoke("text").as("moderateValue");

    // Then high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.findWidget("value-creation").invoke("text").as("highValue");

    // Verify metrics changed between levels
    cy.get("@lowValue").then((lowValue) => {
      cy.get("@moderateValue").then((modValue) => {
        cy.get("@highValue").then((highValue) => {
          // They should be different values
          expect(String(lowValue)).not.to.equal(String(modValue));
          expect(String(modValue)).not.to.equal(String(highValue));
        });
      });
    });
  });

  // Test value points display with highest security
  it("shows multiple value points with high security", () => {
    cy.findWidget("value-creation").scrollIntoView();

    // Set high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Count value points or benefits listed
    cy.findWidget("value-creation").within(() => {
      // Look for value points - either as list items or separate sections
      cy.get("li, [data-testid*='value-point'], [class*='value-point']").should(
        "have.length.at.least",
        2
      );
    });
  });
});
