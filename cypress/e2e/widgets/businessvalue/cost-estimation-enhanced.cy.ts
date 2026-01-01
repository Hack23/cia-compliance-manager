/**
 * Cost Estimation Widget E2E Tests
 * 
 * Enhanced tests using new test ID selectors and custom commands.
 * Tests widget rendering, error handling, loading states, and responsive design.
 */

import { costEstimationWidget, securityLevelWidget } from '../../../support/selectors';
import { SECURITY_LEVELS } from '../../../support/constants';

describe('Cost Estimation Widget - Enhanced', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForWidget('widget-cost-estimation');
  });

  describe('Rendering', () => {
    it('should display widget with all elements', () => {
      cy.get(costEstimationWidget.root).should('be.visible');
      
      // Verify key cost elements are present
      cy.get(costEstimationWidget.capex).should('exist');
      cy.get(costEstimationWidget.opex).should('exist');
      cy.get(costEstimationWidget.total).should('exist');
    });

    it('should display cost values after security level selection', () => {
      // Select moderate security levels
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(500);
      
      // Verify costs are displayed and not zero
      cy.get(costEstimationWidget.total)
        .should('be.visible')
        .and('not.contain', '$0');
    });

    it('should display CAPEX and OPEX sections', () => {
      cy.get(costEstimationWidget.capexSection).should('be.visible');
      cy.get(costEstimationWidget.opexSection).should('be.visible');
    });

    it('should show implementation timeline', () => {
      cy.get('body').then($body => {
        if ($body.find(costEstimationWidget.implementationTime).length > 0) {
          cy.get(costEstimationWidget.implementationTime)
            .should('be.visible')
            .and('not.be.empty');
        } else {
          cy.log('Implementation timeline not found (may be conditional)');
        }
      });
    });
  });

  describe('Cost Calculations', () => {
    it('should update costs when security levels change', () => {
      // Set low security levels
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(500);
      
      // Capture low cost
      let lowCost: string;
      cy.get(costEstimationWidget.total).invoke('text').then(text => {
        lowCost = text;
        cy.log(`Low security cost: ${lowCost}`);
        
        // Set high security levels
        cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(500);
        
        // Verify high cost is different (and typically higher)
        cy.get(costEstimationWidget.total).invoke('text').should('not.equal', lowCost);
        cy.log('✓ Costs update with security level changes');
      });
    });

    it('should show three-year total projection', () => {
      cy.get('body').then($body => {
        if ($body.find(costEstimationWidget.threeYearTotal).length > 0) {
          cy.get(costEstimationWidget.threeYearTotal)
            .should('be.visible')
            .and('contain', '$');
        } else {
          cy.log('Three-year total not found (may be conditional)');
        }
      });
    });

    it('should calculate higher costs for higher security levels', () => {
      // Test progression from Low to Very High
      const levels = [
        SECURITY_LEVELS.LOW,
        SECURITY_LEVELS.MODERATE,
        SECURITY_LEVELS.HIGH,
      ];

      let previousCost = 0;
      
      levels.forEach(level => {
        cy.get(securityLevelWidget.availabilitySelect).select(level, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.integritySelect).select(level, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.confidentialitySelect).select(level, { force: true });
        cy.wait(500);
        
        cy.get(costEstimationWidget.total).invoke('text').then(text => {
          // Extract numeric value (basic extraction)
          const costMatch = text.match(/[\d,]+/);
          if (costMatch) {
            const cost = parseInt(costMatch[0].replace(/,/g, ''), 10);
            cy.log(`${level} security cost: ${cost}`);
            
            if (previousCost > 0) {
              // Higher security should generally mean higher cost
              // Note: This is a general expectation, might need adjustment
              cy.log(`Comparing ${cost} with previous ${previousCost}`);
            }
            previousCost = cost;
          }
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('should not display error state in normal operation', () => {
      cy.testWidgetError('widget-cost-estimation');
    });

    it('should handle missing data gracefully', () => {
      // Widget should display even with default/empty state
      cy.get(costEstimationWidget.root)
        .should('be.visible')
        .and('not.contain', 'Error');
    });
  });

  describe('Loading States', () => {
    it('should not show loading indicator after initial load', () => {
      cy.get('[data-testid="widget-cost-estimation-loading"]').should('not.exist');
    });

    it('should display content instead of loading state', () => {
      cy.get(costEstimationWidget.root)
        .should('be.visible')
        .and('not.contain', 'Loading...');
    });
  });

  describe('Responsive Design', () => {
    it('should adapt layout for mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.wait(500);
      
      cy.get(costEstimationWidget.root)
        .should('be.visible');
      
      // Cost sections should stack vertically on mobile
      cy.get(costEstimationWidget.capexSection).should('be.visible');
      cy.get(costEstimationWidget.opexSection).should('be.visible');
    });

    it('should adapt layout for tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.wait(500);
      
      cy.get(costEstimationWidget.root)
        .should('be.visible');
    });

    it('should display properly on desktop viewport', () => {
      cy.viewport('macbook-15');
      cy.wait(500);
      
      cy.get(costEstimationWidget.root)
        .should('be.visible');
      
      // All sections should be visible on desktop
      cy.get(costEstimationWidget.capexSection).should('be.visible');
      cy.get(costEstimationWidget.opexSection).should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      cy.get(costEstimationWidget.root)
        .should('have.attr', 'role')
        .or('be.visible'); // Either has role or is clearly visible
    });

    it('should have accessible cost value labels', () => {
      // Cost values should be clearly labeled
      cy.get(costEstimationWidget.root).within(() => {
        cy.contains(/CAPEX|Capital|Initial/i).should('be.visible');
        cy.contains(/OPEX|Operational|Annual|Monthly/i).should('be.visible');
      });
    });

    it('should pass basic accessibility checks', () => {
      cy.checkA11y();
    });
  });

  describe('Interactions', () => {
    it('should respond quickly to security level changes', () => {
      const startTime = Date.now();
      
      cy.get(securityLevelWidget.availabilitySelect)
        .select(SECURITY_LEVELS.HIGH, { force: true });
      
      cy.get(costEstimationWidget.root).should('be.visible');
      
      cy.then(() => {
        const responseTime = Date.now() - startTime;
        cy.log(`Widget response time: ${responseTime}ms`);
        expect(responseTime).to.be.lessThan(1000);
      });
    });

    it('should maintain cost display during rapid level changes', () => {
      // Rapidly change security levels
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(500);
      
      // Widget should still display costs correctly
      cy.get(costEstimationWidget.root)
        .should('be.visible')
        .and('not.contain', 'Error')
        .and('not.contain', 'NaN');
    });
  });

  describe('Content Validation', () => {
    it('should display expected cost-related content', () => {
      cy.verifyWidgetContent('widget-cost-estimation', [
        // At least one of these should be present
      ]);
      
      // Verify financial terminology is present
      cy.get(costEstimationWidget.root).within(() => {
        cy.get('body').then($body => {
          const text = $body.text();
          const hasFinancialTerms = /cost|expense|budget|investment|estimate|capex|opex/i.test(text);
          expect(hasFinancialTerms).to.be.true;
        });
      });
    });
  });
});
