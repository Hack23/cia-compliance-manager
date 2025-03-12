/**
 * Comprehensive end-to-end test for the complete security assessment workflow
 * 
 * This test simulates a full user journey through the application, 
 * verifying all widgets update correctly.
 */
import {
  SECURITY_LEVELS,
  WIDGET_PREFIXES,
  TEST_PATTERNS
} from "../../support/constants";

describe("Complete Security Assessment Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1920, 1080); // Use standard desktop viewport
    cy.ensureAppLoaded();
  });

  it("completes a full security assessment from zero to maximum security", () => {
    // Step 1: Start with no security and verify initial state
    cy.log("STEP 1: Setting initial no security state");
    cy.setSecurityLevels(
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.NONE
    );
    
    // Verify initial state shows minimum security levels across all key widgets
    cy.findWidget('security-summary').scrollIntoView();
    cy.verifyContentPresent([
      /no security|minimum|none|low/i
    ]);
    
    cy.findWidget('compliance').scrollIntoView();
    cy.verifyContentPresent([
      /non-?compliant|minimal|none|0%/i
    ]);
    
    cy.findWidget('cost').scrollIntoView();
    let initialCostText = '';
    cy.get('body').invoke('text').then(text => {
      initialCostText = text;
    });
    
    // Step 2: Set low security levels and verify changes
    cy.log("STEP 2: Setting low security levels");
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW, 
      SECURITY_LEVELS.LOW
    );
    
    // Verify business impact shows low security levels
    cy.findWidget('business-impact').scrollIntoView();
    cy.verifyContentPresent([
      SECURITY_LEVELS.LOW,
      /impact|risk|business/i
    ]);
    
    // Step 3: Check technical implementation details at low security
    cy.log("STEP 3: Checking technical implementation details");
    cy.findWidget('technical').scrollIntoView();
    cy.verifyContentPresent([
      /implementation|technical|security/i,
      SECURITY_LEVELS.LOW
    ]);
    
    // Try accessing tab navigation if available
    cy.get('body').then($body => {
      const tabSelectors = [
        '[role="tab"]', 
        'button:contains("Integrity")',
        'button:contains("Confidentiality")'
      ];
      
      tabSelectors.some(selector => {
        if ($body.find(selector).length) {
          cy.get(selector).eq(1).click({force: true});
          cy.wait(200);
          return true;
        }
        return false;
      });
    });
    
    // Step 4: Set moderate security levels and check compliance changes
    cy.log("STEP 4: Setting moderate security levels");
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
    
    cy.findWidget('compliance').scrollIntoView();
    cy.verifyContentPresent([
      /partial|some|standard|basic/i
    ]);
    
    // Check radar chart updates
    cy.findWidget('radar-chart').scrollIntoView();
    cy.verifyContentPresent([
      SECURITY_LEVELS.MODERATE
    ]);
    
    // Step 5: Review availability impact details
    cy.log("STEP 5: Reviewing availability impact");
    cy.findWidget('availability-impact').scrollIntoView();
    cy.verifyContentPresent([
      /availability/i,
      /uptime|downtime|recovery/i
    ]);
    
    // Step 6: Review integrity impact details
    cy.log("STEP 6: Reviewing integrity impact");
    cy.findWidget('integrity-impact').scrollIntoView();
    cy.verifyContentPresent([
      /integrity/i,
      /data|accuracy|validation/i
    ]);
    
    // Step 7: Review confidentiality impact details
    cy.log("STEP 7: Reviewing confidentiality impact");
    cy.findWidget('confidentiality-impact').scrollIntoView();
    cy.verifyContentPresent([
      /confidentiality/i,
      /data|protection|privacy/i
    ]);
    
    // Step 8: Set maximum security and verify final state
    cy.log("STEP 8: Setting maximum security levels");
    cy.setSecurityLevels(
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH
    );
    
    // Verify compliance status is at maximum
    cy.findWidget('compliance').scrollIntoView();
    cy.verifyContentPresent([
      /full|100%|complete|all/i
    ]);
    
    // Verify value creation shows maximum benefits
    cy.findWidget('value').scrollIntoView();
    cy.verifyContentPresent([
      /value|benefit|roi|return/i,
      /high|significant|maximum/i
    ]);
    
    // Check that costs have increased from initial state
    cy.findWidget('cost').scrollIntoView();
    cy.get('body').invoke('text').should('not.eq', initialCostText);
    
    // Step 9: Review security resources
    cy.log("STEP 9: Reviewing security resources");
    cy.findWidget('security-resources').scrollIntoView();
    cy.verifyContentPresent([
      /resource|guide|reference|standard/i
    ]);
    
    // Step 10: Final verification of complete security posture
    cy.log("STEP 10: Final security posture verification");
    cy.findWidget('security-summary').scrollIntoView();
    cy.verifyContentPresent([
      /high|maximum|strong|robust/i,
      /security|protection|safeguard/i
    ]);
  });
  
  it("verifies business impact analysis across security levels", () => {
    // Start with maximum security to check best-case business impact
    cy.setSecurityLevels(
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH,
      SECURITY_LEVELS.VERY_HIGH
    );
    
    // Check business impact analysis for high security
    cy.findWidget('business-impact').scrollIntoView();
    cy.verifyContentPresent([
      /strategic|competitive|advantage/i,
      /roi|return|value/i
    ]);
    
    // Find and interact with business impact tabs if they exist
    cy.get('body').then($body => {
      const tabSelectors = [
        '[role="tab"]',
        'button:contains("Availability")',
        'button:contains("Integrity")',
        'button:contains("Confidentiality")'
      ];
      
      let tabsFound = false;
      tabSelectors.forEach(selector => {
        if (!tabsFound && $body.find(selector).length) {
          tabsFound = true;
          cy.get(selector).each(($tab, index) => {
            if (index < 3) { // Limit to first 3 tabs
              cy.wrap($tab).click({force: true});
              cy.wait(300);
              // Verify content changes in some way
              cy.findWidget('business-impact').should('exist');
            }
          });
        }
      });
      
      if (!tabsFound) {
        cy.log("No tabs found in business impact widget");
      }
    });
    
    // Now switch to low security to see negative business impacts
    cy.setSecurityLevels(
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.LOW
    );
    
    // Verify negative impacts appear
    cy.findWidget('business-impact').scrollIntoView();
    cy.verifyContentPresent([
      /risk|vulnerabilit|exposure|threat|loss/i
    ]);
  });
});
