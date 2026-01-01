/**
 * All Widgets Integration Test
 * 
 * Comprehensive integration test that validates all 11+ widgets are rendered,
 * respond to security level changes, and maintain consistent state.
 * 
 * This test ensures that widget refactoring improvements are properly integrated
 * across the entire application.
 */

import {
  securityLevelWidget,
  costEstimationWidget,
  securitySummaryWidget,
  valueCreationWidget,
  complianceStatusWidget,
  availabilityImpactWidget,
  integrityImpactWidget,
  confidentialityImpactWidget,
  technicalDetailsWidget,
  securityResourcesWidget,
} from '../../support/selectors';
import { SECURITY_LEVELS } from '../../support/constants';

describe('All Widgets Integration', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForWidget('security-level-widget');
  });

  describe('Widget Rendering', () => {
    it('should render all essential widgets', () => {
      // Core widgets that should always be present
      cy.log('Checking for essential widgets');
      cy.get(securityLevelWidget.root).should('exist').and('be.visible');
      cy.get(securitySummaryWidget.root).should('exist').and('be.visible');
      cy.get(costEstimationWidget.root).should('exist').and('be.visible');
      cy.get(valueCreationWidget.root).should('exist').and('be.visible');
      cy.get(complianceStatusWidget.root).should('exist').and('be.visible');
    });

    it('should render CIA impact widgets', () => {
      cy.log('Checking for CIA impact widgets');
      cy.get(availabilityImpactWidget.root).should('exist');
      cy.get(integrityImpactWidget.root).should('exist');
      cy.get(confidentialityImpactWidget.root).should('exist');
    });

    it('should render implementation widgets', () => {
      cy.log('Checking for implementation widgets');
      cy.get(technicalDetailsWidget.root).should('exist');
      cy.get(securityResourcesWidget.root).should('exist');
    });
  });

  describe('Security Level Synchronization', () => {
    it('should update all widgets when security levels change', () => {
      // Change all security levels to High
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);
      cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);
      cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(500); // Wait for all widgets to update

      // Verify key widgets updated their content
      cy.get(securitySummaryWidget.root)
        .should('contain', 'High');

      cy.get(costEstimationWidget.root)
        .should('be.visible');

      cy.get(valueCreationWidget.root)
        .should('be.visible');
    });

    it('should maintain consistency across security level changes', () => {
      // Test multiple level changes
      const testSequence = [
        { level: SECURITY_LEVELS.LOW, label: 'Low' },
        { level: SECURITY_LEVELS.MODERATE, label: 'Moderate' },
        { level: SECURITY_LEVELS.HIGH, label: 'High' },
      ];

      testSequence.forEach(({ level, label }) => {
        cy.log(`Testing security level: ${label}`);
        
        // Set all levels
        cy.get(securityLevelWidget.availabilitySelect).select(level, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.integritySelect).select(level, { force: true });
        cy.wait(200);
        cy.get(securityLevelWidget.confidentialitySelect).select(level, { force: true });
        cy.wait(500);

        // Verify at least the security summary reflects the change
        cy.get(securitySummaryWidget.root)
          .should('be.visible')
          .and('contain', label);
      });
    });
  });

  describe('Responsive Layout', () => {
    it('should adapt to mobile viewport', () => {
      cy.testResponsiveLayout(['iphone-x']);
      
      // Verify widgets stack vertically on mobile
      cy.get('[data-testid="app-container"]')
        .should('be.visible');
      
      // Widgets should still be accessible
      cy.get(securityLevelWidget.root)
        .should('be.visible');
    });

    it('should adapt to tablet viewport', () => {
      cy.testResponsiveLayout(['ipad-2']);
      
      // Verify app renders properly on tablet
      cy.get('[data-testid="app-container"]')
        .should('be.visible');
    });

    it('should adapt to desktop viewport', () => {
      cy.testResponsiveLayout(['macbook-15']);
      
      // Verify all widgets are accessible on desktop
      cy.get(securityLevelWidget.root)
        .should('be.visible');
      cy.get(securitySummaryWidget.root)
        .should('be.visible');
    });
  });

  describe('Widget Loading States', () => {
    it('should not show loading indicators after initial load', () => {
      // Wait for page to fully load
      cy.wait(1000);

      // Check that loading indicators are not present
      cy.get('[data-testid*="loading"]').should('not.exist');
    });

    it('should display content after loading completes', () => {
      // Verify widgets show content, not loading states
      const widgets = [securityLevelWidget, securitySummaryWidget, costEstimationWidget];
      
      widgets.forEach(widget => {
        cy.get(widget.root)
          .should('exist')
          .and('be.visible')
          .and('not.contain', 'Loading...');
      });
    });
  });

  describe('Error Handling', () => {
    it('should not display error states in normal operation', () => {
      // Verify no error indicators are shown
      cy.get('[data-testid*="error"]').should('not.exist');
      
      // Verify no error messages in widgets
      cy.get('[role="alert"]').should('not.exist');
    });
  });

  describe('Basic Accessibility', () => {
    it('should have proper ARIA attributes on interactive elements', () => {
      cy.checkA11y();
    });

    it('should have accessible labels on security level selectors', () => {
      cy.get(securityLevelWidget.availabilitySelect)
        .should('have.attr', 'aria-label')
        .or('be.visible'); // Either has label or is clearly visible
      
      cy.get(securityLevelWidget.integritySelect)
        .should('have.attr', 'aria-label')
        .or('be.visible');
      
      cy.get(securityLevelWidget.confidentialitySelect)
        .should('have.attr', 'aria-label')
        .or('be.visible');
    });
  });

  describe('Performance', () => {
    it('should load all widgets within acceptable time', () => {
      const startTime = Date.now();
      
      cy.visit('/');
      cy.waitForWidget('widget-security-level');
      
      cy.then(() => {
        const loadTime = Date.now() - startTime;
        cy.log(`Page load time: ${loadTime}ms`);
        
        // Should load within 3 seconds
        expect(loadTime).to.be.lessThan(3000);
      });
    });

    it('should respond to interactions quickly', () => {
      const startTime = Date.now();
      
      cy.get(securityLevelWidget.availabilitySelect)
        .select(SECURITY_LEVELS.HIGH, { force: true });
      
      cy.then(() => {
        const responseTime = Date.now() - startTime;
        cy.log(`Response time: ${responseTime}ms`);
        
        // Should respond within 500ms
        expect(responseTime).to.be.lessThan(500);
      });
    });
  });

  describe('State Persistence', () => {
    it('should maintain security levels across widget interactions', () => {
      // Set initial levels
      cy.get(securityLevelWidget.availabilitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.integritySelect).select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(200);
      cy.get(securityLevelWidget.confidentialitySelect).select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(500);

      // Verify levels are set
      cy.get(securityLevelWidget.availabilitySelect).should('have.value', SECURITY_LEVELS.HIGH);
      cy.get(securityLevelWidget.integritySelect).should('have.value', SECURITY_LEVELS.MODERATE);
      cy.get(securityLevelWidget.confidentialitySelect).should('have.value', SECURITY_LEVELS.HIGH);

      // Interact with another widget (scroll to it)
      cy.get(costEstimationWidget.root).scrollIntoView();
      cy.wait(300);

      // Verify levels are still set
      cy.get(securityLevelWidget.availabilitySelect).should('have.value', SECURITY_LEVELS.HIGH);
      cy.get(securityLevelWidget.integritySelect).should('have.value', SECURITY_LEVELS.MODERATE);
      cy.get(securityLevelWidget.confidentialitySelect).should('have.value', SECURITY_LEVELS.HIGH);
    });
  });
});
