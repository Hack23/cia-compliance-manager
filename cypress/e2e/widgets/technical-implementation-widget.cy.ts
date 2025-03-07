import { SECURITY_LEVELS } from "../../support/constants";

describe("Technical Implementation Widget", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("/");
    cy.ensureAppLoaded();

    // Set security levels high to ensure we get detailed implementation information
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait for data to load
    cy.wait(500);
  });

  it("provides detailed technical guidance for implementation", () => {
    // Find the technical widget
    cy.get(".widget").filter(":contains('Technical')").as("techWidget");

    cy.get("@techWidget").within(() => {
      // First, explicitly click on the confidentiality tab which contains encryption info
      cy.get('[data-testid="confidentiality-tab"]').click();

      // Now look for encryption-related content in the confidentiality section
      cy.contains(/encryption/i).should("exist");
    });
  });

  it("adapts guidance to different security levels", () => {
    // Test with Low security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    cy.get(".widget")
      .filter(":contains('Technical')")
      .within(() => {
        // Low level should have basic controls
        cy.contains(/basic|minimal/i).should("exist");
      });

    // Test with High security level
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );
    cy.wait(500);

    cy.get(".widget")
      .filter(":contains('Technical')")
      .within(() => {
        // High level should have advanced controls
        cy.contains(/advanced|comprehensive/i).should("exist");
      });
  });

  it("provides technical details useful for implementation planning", () => {
    cy.get(".widget")
      .filter(":contains('Technical')")
      .within(() => {
        // Check for implementation sections
        cy.contains(/implementation steps/i).should("exist");
        cy.contains(/recommended technologies/i).should("exist");
        cy.contains(/resource requirements/i).should("exist");
      });
  });
});
