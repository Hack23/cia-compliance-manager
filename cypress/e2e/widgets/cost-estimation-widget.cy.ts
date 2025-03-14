import { SECURITY_LEVELS } from "../../support/constants";
import { setupWidgetTest, verifyWidgetExists } from "./base-widget-tests";
import { testSecurityLevelChanges } from "./widget-test-helper";

describe("Cost Estimation Widget", () => {
  // Use standard setup for widget tests
  setupWidgetTest("cost-estimation");

  // Basic existence test
  verifyWidgetExists("cost-estimation");

  // Test security level changes affect widget content
  it("updates cost estimates when security levels change", () => {
    testSecurityLevelChanges("cost-estimation");
  });

  // Test cost components exist
  it("displays CAPEX and OPEX estimates", () => {
    cy.findWidget("cost-estimation").scrollIntoView();

    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Verify cost components
    cy.findWidget("cost-estimation").within(() => {
      // Check for CAPEX and OPEX text
      cy.contains(/capex|capital/i).should("exist");
      cy.contains(/opex|operational/i).should("exist");

      // Check for cost values - should contain numbers and possibly currency symbols
      cy.contains(/\d+/).should("exist");
    });
  });

  // Test cost estimates change proportionally with security levels
  it("shows increasing costs with higher security levels", () => {
    cy.findWidget("cost-estimation").scrollIntoView();

    // Test with low security first
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Capture low security costs
    cy.findWidget("cost-estimation").invoke("text").as("lowSecurityCost");

    // Change to high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify costs increased
    cy.get("@lowSecurityCost").then((lowCost) => {
      // Extract numbers from both strings and compare
      cy.findWidget("cost-estimation")
        .invoke("text")
        .then((highCost) => {
          // Extract all numbers from text
          const lowNumbers = String(lowCost).match(/\d+/g)?.map(Number) || [];
          const highNumbers = String(highCost).match(/\d+/g)?.map(Number) || [];

          // Verify we have numbers to compare
          expect(lowNumbers.length).to.be.greaterThan(0);
          expect(highNumbers.length).to.be.greaterThan(0);

          // Get the largest number from each (likely the total cost)
          const maxLow = Math.max(...lowNumbers);
          const maxHigh = Math.max(...highNumbers);

          // High security should cost more than low security
          expect(maxHigh).to.be.greaterThan(maxLow);
        });
    });
  });

  // Test ROI or cost-benefit information is present
  it("provides ROI or cost-benefit information", () => {
    cy.findWidget("cost-estimation").scrollIntoView();

    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Look for ROI or cost-benefit information
    cy.findWidget("cost-estimation").within(() => {
      cy.contains(/roi|return on investment|benefit|saving|value/i).should(
        "exist"
      );
    });
  });
});
