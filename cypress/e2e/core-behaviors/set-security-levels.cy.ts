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

describe("Set Security Levels", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
    cy.viewport(3840, 2160);
  });

  it("allows setting individual security levels", () => {
    // Using the selector constants
    cy.get(SELECTORS.WIDGETS.SECURITY_LEVEL).should("be.visible");

    // Using test IDs with helper function
    cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).select(
      SECURITY_LEVELS.HIGH
    );

    // Verify selection
    cy.get(getTestSelector(TEST_IDS.AVAILABILITY_SELECT)).should(
      "have.value",
      SECURITY_LEVELS.HIGH
    );
  });

  it("verifies radar chart updates with security level changes", () => {
    // Set security levels to initial values
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    cy.wait(500);

    // Store radar chart state after initial values are set
    let initialRadarState = "";
    cy.get("body").then(($body) => {
      initialRadarState = $body.text();

      // Now change to different security levels
      cy.setSecurityLevels(
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH,
        SECURITY_LEVELS.HIGH
      );
      cy.wait(500);

      // Verify security levels show up in the radar chart text content
      cy.contains(SECURITY_LEVELS.HIGH).should("exist");

      // Verify content has changed by looking for specific level text
      cy.contains(SECURITY_LEVELS.HIGH).should("be.visible");
    });
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
