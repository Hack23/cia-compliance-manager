import {
  SECURITY_LEVELS,
  SUMMARY_TEST_IDS
} from "../../support/constants";
import { setupWidgetTest, testSecurityLevelChanges } from "./widget-test-helper";

describe("Security Summary Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("displays current security posture summary", () => {
    // Find security summary widget using our enhanced finder
    cy.findWidget('security-summary')
      .should('exist')
      .scrollIntoView();
    
    // Verify security-related content is present
    cy.verifyContentPresent([
      /security/i,
      /level/i,
      /rating/i,
      /summary/i
    ]);
  });

  it("updates security summary when security levels change", () => {
    // Use our test pattern for security level changes
    testSecurityLevelChanges('security-summary');
  });

  it("shows security recommendations based on current levels", () => {
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    // Find security summary widget
    cy.findWidget('security-summary')
      .should('exist')
      .scrollIntoView();
    
    // Check for recommendations section
    cy.verifyContentPresent([
      /recommend/i,
      /suggest/i,
      /best practice/i
    ]);
  });

  it("displays CIA component security levels", () => {
    // Set different security levels for each component
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW
    );
    
    // Verify each level appears in the summary
    cy.verifyContentPresent([
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.LOW,
      /availability/i,
      /integrity/i,
      /confidentiality/i
    ]);
  });
});
