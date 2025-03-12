import {
  SECURITY_LEVELS,
  VALUE_CREATION_TEST_IDS,
  TEST_PATTERNS,
} from "../../support/constants";
import { testWidgetUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Value Creation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("identifies business value created by security investments", () => {
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );

    // Find value creation widget using DOM-verified test ID
    cy.get('[data-testid="value-creation-widget"]')
      .should("exist")
      .scrollIntoView();

    // Verify that value content appears
    cy.verifyContentPresent([
      /value/i,
      /benefit/i,
      /investment/i,
      /roi|return/i,
    ]);
  });

  it("connects security investments to business outcomes", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Verify content using DOM-verified test ID
    cy.get('[data-testid="value-creation-widget"]')
      .should("exist")
      .scrollIntoView();

    // Check for business outcomes content
    cy.verifyContentPresent([/business/i, /outcome|result/i, /investment/i]);
  });

  it("shows ROI connections between security and business value", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.HIGH
    );

    // Find value creation widget using DOM-verified test ID
    cy.get('[data-testid="value-creation-widget"]')
      .should("be.visible")
      .then(($widget) => {
        // Look for ROI text
        const text = $widget.text();
        const hasROI = /roi|return on investment/i.test(text);

        if (hasROI) {
          cy.log("Found ROI information in widget");
        } else {
          // If no direct "ROI" mention, check for other value indicators
          cy.verifyContentPresent([
            /value|benefit|saving|cost reduction|payback/i,
          ]);
        }
      });
  });

  it("updates business value metrics when security levels change", () => {
    // Use the test pattern for widget updates with DOM-verified test ID
    testWidgetUpdatesWithSecurityLevels(
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
});
