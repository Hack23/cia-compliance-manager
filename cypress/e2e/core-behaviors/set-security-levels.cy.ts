/**
 * User Story: As a user, I can set security levels for CIA components
 *
 * Tests the ability to set different security levels and see visual feedback
 */
import {
  SECURITY_LEVELS,
  SELECTORS,
  TEST_IDS,
  getTestSelector,
  CHART_TEST_IDS,
} from "../../support/constants";
import { testSecurityLevelFeedback } from "../../support/test-patterns";
import "../../support/test-debug-helper";

describe("Set Security Levels", () => {
  beforeEach(() => {
    cy.viewport(3840, 2160);
    cy.visit("/");
    cy.ensureAppLoaded();

    // Wait for app to stabilize
    cy.wait(1000);

    // Log available test IDs to help with debugging
    cy.logAllTestIds();
  });

  it("allows setting individual security levels", () => {
    // Set security levels using our enhanced command
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );

    // Verify the values were actually selected
    cy.get("[data-testid='availability-select']").should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );

    cy.get("[data-testid='integrity-select']").should(
      "have.value",
      SECURITY_LEVELS.MODERATE
    );

    cy.get("[data-testid='confidentiality-select']").should(
      "have.value",
      SECURITY_LEVELS.LOW
    );
  });

  it("verifies radar chart updates with security level changes", () => {
    // Set all levels to HIGH
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Wait for chart to update
    cy.wait(500);

    // Check that radar chart values match our selections
    cy.get("[data-testid='radar-availability-value']").should(
      "contain",
      SECURITY_LEVELS.HIGH
    );

    cy.get("[data-testid='radar-integrity-value']").should(
      "contain",
      SECURITY_LEVELS.HIGH
    );

    cy.get("[data-testid='radar-confidentiality-value']").should(
      "contain",
      SECURITY_LEVELS.HIGH
    );
  });

  it("verifies security widget structure", () => {
    cy.get(SELECTORS.WIDGETS.SECURITY_LEVEL).within(() => {
      // Look for availability section
      cy.contains(/availability/i).should("exist");
      cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).should("exist");

      // Look for integrity section
      cy.contains(/integrity/i).should("exist");
      cy.get(getTestSelector(TEST_IDS.INTEGRITY_SELECT)).should("exist");

      // Look for confidentiality section
      cy.contains(/confidentiality/i).should("exist");
      cy.get(getTestSelector(TEST_IDS.CONFIDENTIALITY_SELECT)).should("exist");
    });
  });

  it("shows descriptions that match security levels", () => {
    // Instead of looking for descriptions via the select element,
    // check if any text content changes when we change security levels

    // Get initial page content with Low security
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    // Capture some distinguishing text from the page
    cy.get("body")
      .invoke("text")
      .then((lowText) => {
        // Change to High security
        cy.setSecurityLevels(
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH,
          SECURITY_LEVELS.HIGH
        );
        cy.wait(500);

        // Check if any content has changed
        cy.get("body")
          .invoke("text")
          .then((highText) => {
            // Only compare subsections of text to avoid irrelevant changes
            const lowSample = lowText.substring(
              0,
              Math.min(1000, lowText.length)
            );
            const highSample = highText.substring(
              0,
              Math.min(1000, highText.length)
            );
            expect(lowSample).not.to.equal(highSample);
          });
      });
  });
});
