import { SECURITY_LEVELS } from "../../support/constants";

describe("Security Level Selection Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("should exist and be visible", () => {
    // Try multiple selector strategies to find the widget
    cy.findWidget("security-level").should("exist").and("be.visible");
  });

  it("allows setting security levels for all CIA components", () => {
    // Set security levels using the custom command
    cy.setSecurityLevels("High", "Moderate", "Low");

    // Verify the security levels were set
    cy.findSecurityLevelControls().within(() => {
      // Check if select elements contain the expected values
      // The exact selectors might need adjustment based on your DOM
      cy.get("select").eq(0).should("have.value", "High");
      cy.get("select").eq(1).should("have.value", "Moderate");
      cy.get("select").eq(2).should("have.value", "Low");
    });
  });

  it("updates descriptions when security levels change", () => {
    // Set initial security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );

    // Store the initial descriptions
    let initialDescriptions = "";
    cy.findWidget("security-level").then(($widget) => {
      initialDescriptions = $widget.text();

      // Change to high security levels
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );

      // Verify descriptions have changed
      cy.findWidget("security-level")
        .invoke("text")
        .should("not.equal", initialDescriptions);
    });
  });

  it("shows color indicators for different security levels", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH
    );

    // Find the color indicators using data-testid and verify they exist
    cy.get("[data-testid*='color-indicator']")
      .should("exist")
      .and("have.length.at.least", 3);
  });
});
