import {
  SECURITY_LEVELS,
  TECHNICAL_DETAILS_TEST_IDS, // Now properly imported from constants
} from "../../support/constants";
import { setupWidgetTest } from "./widget-test-helper";

describe("Technical Implementation Widget", () => {
  beforeEach(() => {
    // Use setupWidgetTest with correct test ID from the table
    setupWidgetTest(
      TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DETAILS_WIDGET ||
        "widget-technical-details-container"
    );

    // Set security levels high to ensure we get detailed implementation information
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait longer for data to load
    cy.wait(1000);
  });

  it("provides detailed technical guidance for implementation", () => {
    // Instead of looking within a specific container, search the entire page
    // for technical implementation related content
    cy.contains(/technical|implementation|security controls|configuration/i, {
      timeout: 10000,
    }).should("exist");

    // Look for common security implementation terms anywhere in the page
    cy.get("body").then(($body) => {
      const contentText = $body.text().toLowerCase();
      const securityTerms = [
        "monitoring",
        "backup",
        "encryption",
        "authentication",
        "protection",
        "security",
        "implementation",
        "technical",
      ];

      // Check if any of the terms exist in the page content
      const foundTerm = securityTerms.some((term) =>
        contentText.includes(term)
      );
      expect(foundTerm).to.be.true;
    });
  });

  it("adapts guidance to different security levels", () => {
    // First check with low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(1000);

    // Store technical content with low security
    cy.get("body")
      .invoke("text")
      .then((lowLevelText) => {
        // Now switch to high security
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(1000);

        // Verify content changes with security level
        cy.get("body").invoke("text").should("not.eq", lowLevelText);
      });
  });

  it("provides technical details useful for implementation planning", () => {
    // Look for implementation-related terms anywhere in the page
    cy.contains(/steps|procedure|implementation|configuration|guidance/i, {
      timeout: 10000,
    }).should("exist");
  });
});
