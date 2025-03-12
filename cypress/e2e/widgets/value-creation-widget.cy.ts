import {
  SECURITY_LEVELS,
  VALUE_CREATION_TEST_IDS,
  TEST_PATTERNS
} from "../../support/constants";

describe("Value Creation Widget", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("identifies business value created by security investments", () => {
    // Use the new findWidget command to locate the widget
    cy.findWidget('value-creation')
      .should('exist')
      .scrollIntoView();
    
    // Set moderate security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE, 
      SECURITY_LEVELS.MODERATE
    );
    
    // Verify that value content appears
    cy.verifyContentPresent([
      /value/i, 
      /benefit/i,
      /investment/i,
      /roi/i
    ]);
  });

  it("connects security investments to business outcomes", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Use widget content verification helper
    cy.verifyWidgetContent('value-creation', [
      /business/i,
      /outcome/i,
      /investment/i
    ]);
  });

  it("shows ROI connections between security and business value", () => {
    // Set security levels
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Find value creation widget
    cy.findWidget('value-creation')
      .should('be.visible')
      .and('contain', 'ROI');
  });
});
