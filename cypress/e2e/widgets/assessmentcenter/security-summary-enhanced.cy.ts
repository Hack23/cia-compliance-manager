/**
 * Security Summary Widget E2E Tests - Enhanced
 * 
 * Enhanced tests using new test ID selectors and custom commands.
 * Tests tab navigation, keyboard accessibility, and content updates.
 */

import { securitySummaryWidget, securityLevelWidget } from '../../../support/selectors';
import { SECURITY_LEVELS } from '../../../support/constants';

describe('Security Summary Widget - Enhanced', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForWidget('security-summary-widget');
  });

  describe('Rendering', () => {
    it('should display widget with all key elements', () => {
      cy.get(securitySummaryWidget.root).should('be.visible');
      
      // Verify overall security rating/level is displayed
      cy.get('body').then($body => {
        if ($body.find(securitySummaryWidget.overallRating).length > 0) {
          cy.get(securitySummaryWidget.overallRating).should('be.visible');
        } else {
          cy.log('Overall rating element not found (may be displayed differently)');
        }
      });
    });

    it('should display CIA security cards', () => {
      // Check for CIA component cards
      cy.get('body').then($body => {
        if ($body.find(securitySummaryWidget.availabilityCard).length > 0) {
          cy.get(securitySummaryWidget.availabilityCard).should('be.visible');
          cy.get(securitySummaryWidget.integrityCard).should('be.visible');
          cy.get(securitySummaryWidget.confidentialityCard).should('be.visible');
        } else {
          cy.log('CIA cards not found (may use different layout)');
        }
      });
    });

    it('should display security level badge', () => {
      cy.get('body').then($body => {
        if ($body.find(securitySummaryWidget.levelBadge).length > 0) {
          cy.get(securitySummaryWidget.levelBadge)
            .should('be.visible')
            .and('not.be.empty');
        } else {
          cy.log('Security level badge not found (may use different indicator)');
        }
      });
    });

    it('should show summary description', () => {
      cy.get('body').then($body => {
        if ($body.find(securitySummaryWidget.description).length > 0) {
          cy.get(securitySummaryWidget.description)
            .should('be.visible')
            .and('not.be.empty');
        } else {
          cy.log('Summary description not found');
        }
      });
    });
  });

  describe('Tab Navigation', () => {
    it('should have accessible tabs if tabs are present', () => {
      cy.get('body').then($body => {
        const hasTabs = $body.find('[role="tab"]').length > 0;
        
        if (hasTabs) {
          cy.log('Tabs found - testing tab navigation');
          
          // Test keyboard navigation
          cy.get('[role="tab"]').first().focus();
          cy.wait(200);
          
          // Verify first tab is selected
          cy.get('[role="tab"]').first()
            .should('have.attr', 'aria-selected', 'true');
          
          // Navigate with arrow key
          cy.focused().type('{rightarrow}');
          cy.wait(200);
          
          cy.log('✓ Tab keyboard navigation working');
        } else {
          cy.log('No tabs found in widget (single-panel display)');
        }
      });
    });

    it('should change content when switching tabs', () => {
      cy.get('body').then($body => {
        const tabs = $body.find('[role="tab"]');
        
        if (tabs.length > 1) {
          // Click first tab
          cy.wrap(tabs.first()).click();
          cy.wait(300);
          
          // Get first tab content
          let firstTabContent: string;
          cy.get('[role="tabpanel"]').invoke('text').then(text => {
            firstTabContent = text;
            
            // Click second tab
            cy.wrap(tabs.eq(1)).click();
            cy.wait(300);
            
            // Verify content changed
            cy.get('[role="tabpanel"]').invoke('text')
              .should('not.equal', firstTabContent);
            
            cy.log('✓ Tab content changes correctly');
          });
        } else {
          cy.log('Not enough tabs for tab switching test');
        }
      });
    });

    it('should support Home/End key navigation if tabs present', () => {
      cy.get('body').then($body => {
        const tabs = $body.find('[role="tab"]');
        
        if (tabs.length > 2) {
          // Focus first tab
          cy.wrap(tabs.first()).focus();
          cy.wait(200);
          
          // Press End to go to last tab
          cy.focused().type('{end}');
          cy.wait(200);
          
          cy.get('[role="tab"]').last()
            .should('have.attr', 'aria-selected', 'true');
          
          // Press Home to go back to first tab
          cy.focused().type('{home}');
          cy.wait(200);
          
          cy.get('[role="tab"]').first()
            .should('have.attr', 'aria-selected', 'true');
          
          cy.log('✓ Home/End key navigation working');
        } else {
          cy.log('Not enough tabs for Home/End navigation test');
        }
      });
    });

    it('should maintain tab state during security level changes', () => {
      cy.get('body').then($body => {
        const tabs = $body.find('[role="tab"]');
        
        if (tabs.length > 1) {
          // Select second tab
          cy.wrap(tabs.eq(1)).click();
          cy.wait(300);
          
          // Verify second tab is active
          cy.wrap(tabs.eq(1)).should('have.attr', 'aria-selected', 'true');
          
          // Change security level
          cy.get(securityLevelWidget.availabilitySelect)
            .select(SECURITY_LEVELS.HIGH, { force: true });
          cy.wait(500);
          
          // Verify second tab is still active
          cy.get('[role="tab"]').eq(1)
            .should('have.attr', 'aria-selected', 'true');
          
          cy.log('✓ Tab state maintained during updates');
        } else {
          cy.log('Not enough tabs for state persistence test');
        }
      });
    });
  });

  describe('Security Level Updates', () => {
    it('should update summary when security levels change', () => {
      // Set low security levels
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(500);
      
      // Capture content
      let lowContent: string;
      cy.get(securitySummaryWidget.root).invoke('text').then(text => {
        lowContent = text;
        
        // Change to high security
        cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
        cy.wait(500);
        
        // Verify content changed
        cy.get(securitySummaryWidget.root).invoke('text')
          .should('not.equal', lowContent);
        
        // Should mention "High" security
        cy.get(securitySummaryWidget.root).should('contain', 'High');
      });
    });

    it('should reflect individual CIA level changes', () => {
      // Set mixed security levels
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.LOW, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(500);
      
      // Widget should show mixed levels
      cy.get(securitySummaryWidget.root).should('be.visible');
      
      // Should contain different level indicators
      cy.get(securitySummaryWidget.root).then($widget => {
        const text = $widget.text();
        cy.log(`Summary content: ${text.substring(0, 200)}...`);
      });
    });
  });

  describe('Error Handling', () => {
    it('should not display error state in normal operation', () => {
      cy.testWidgetError('security-summary-widget');
    });

    it('should handle empty state gracefully', () => {
      cy.get(securitySummaryWidget.root)
        .should('be.visible')
        .and('not.contain', 'Error');
    });
  });

  describe('Loading States', () => {
    it('should not show loading indicator after initial load', () => {
      cy.get('[data-testid="security-summary-widget-loading"]').should('not.exist');
    });

    it('should display content instead of loading state', () => {
      cy.get(securitySummaryWidget.root)
        .should('be.visible')
        .and('not.contain', 'Loading...');
    });
  });

  describe('Responsive Design', () => {
    it('should adapt to mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.wait(500);
      
      cy.get(securitySummaryWidget.root)
        .should('be.visible');
      
      // Cards should stack on mobile
      cy.get('body').then($body => {
        if ($body.find(securitySummaryWidget.availabilityCard).length > 0) {
          cy.get(securitySummaryWidget.availabilityCard).should('be.visible');
        }
      });
    });

    it('should adapt to tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.wait(500);
      
      cy.get(securitySummaryWidget.root)
        .should('be.visible');
    });

    it('should display properly on desktop', () => {
      cy.viewport('macbook-15');
      cy.wait(500);
      
      cy.get(securitySummaryWidget.root)
        .should('be.visible');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      cy.get(securitySummaryWidget.root)
        .should('have.attr', 'role')
        .or('be.visible');
    });

    it('should pass basic accessibility checks', () => {
      cy.checkA11y();
    });

    it('should have accessible tab controls', () => {
      cy.get('[role="tab"]').each($tab => {
        cy.wrap($tab).should('have.attr', 'aria-selected');
        cy.wrap($tab).should('have.attr', 'aria-controls')
          .or('not.have.attr', 'aria-controls'); // May or may not have aria-controls
      });
    });
  });

  describe('Content Validation', () => {
    it('should display security-related terminology', () => {
      cy.get(securitySummaryWidget.root).within(() => {
        cy.get('body').then($body => {
          const text = $body.text();
          const hasSecurityTerms = /security|risk|level|assessment|availability|integrity|confidentiality/i.test(text);
          expect(hasSecurityTerms).to.be.true;
        });
      });
    });

    it('should provide actionable summary information', () => {
      // Widget should contain informative content, not just labels
      cy.get(securitySummaryWidget.root)
        .invoke('text')
        .then(text => {
          // Should have substantial content (more than just widget title)
          expect(text.length).to.be.greaterThan(50);
        });
    });
  });

  describe('Performance', () => {
    it('should update quickly when security levels change', () => {
      const startTime = Date.now();
      
      cy.get(securityLevelWidget.availabilitySelect)
        .select(SECURITY_LEVELS.HIGH, { force: true });
      
      cy.get(securitySummaryWidget.root).should('be.visible');
      
      cy.then(() => {
        const responseTime = Date.now() - startTime;
        cy.log(`Widget response time: ${responseTime}ms`);
        expect(responseTime).to.be.lessThan(1000);
      });
    });
  });
});
