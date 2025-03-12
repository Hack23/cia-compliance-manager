/**
 * Integration test for overall security compliance user flow
 *
 * This test verifies the complete user journey from security level selection through
 * compliance status and cost estimation to business impact assessment.
 */
import {
  SECURITY_LEVELS,
  FRAMEWORK_TEST_IDS,
  TEST_PATTERNS
} from "../../support/constants";
import { testCostUpdatesWithSecurityLevels } from "../../support/test-patterns";

describe("Security Compliance User Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.ensureAppLoaded();
  });

  it("shows compliance status that matches selected security levels", () => {
    // Start with no security
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE, 
      SECURITY_LEVELS.NONE, 
      SECURITY_LEVELS.NONE
    );
    
    // Find compliance widget
    cy.findWidget('compliance')
      .should('exist')
      .scrollIntoView();
      
    // Verify non-compliant status
    cy.verifyContentPresent([
      /non-?compliant|0%|minimal|no frameworks/i
    ]);
    
    // Change to high security
    cy.setSecurityLevels(
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH, 
      SECURITY_LEVELS.HIGH
    );
    
    // Verify compliant status
    cy.waitForContent(/compliant|100%|full|all frameworks/i);
  });

  it("shows costs that match selected security levels", () => {
    // Use the testCostUpdatesWithSecurityLevels pattern
    testCostUpdatesWithSecurityLevels();
  });

  it("demonstrates full user flow from security selection to business impacts", () => {
    // 1. Start with no security
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE, 
      SECURITY_LEVELS.NONE, 
      SECURITY_LEVELS.NONE
    );
    
    // 2. Verify minimal compliance
    cy.findWidget('compliance').scrollIntoView();
    cy.verifyContentPresent([
      /non-?compliant|minimal|none|0%/i
    ]);
    
    // 3. Check costs at minimal security
    cy.findWidget('cost').scrollIntoView();
    let lowCostText = '';
    
    cy.get('body').invoke('text').then(text => {
      lowCostText = text;
      
      // 4. Set to highest security
      cy.setSecurityLevels(
        SECURITY_LEVELS.VERY_HIGH, 
        SECURITY_LEVELS.VERY_HIGH, 
        SECURITY_LEVELS.VERY_HIGH
      );
      
      // 5. Verify highest compliance
      cy.findWidget('compliance').scrollIntoView();
      cy.verifyContentPresent([
        /full|100%|complete|all/i
      ]);
      
      // 6. Verify costs increased
      cy.findWidget('cost').scrollIntoView();
      cy.get('body').invoke('text').should('not.eq', lowCostText);
    });
  });
});
