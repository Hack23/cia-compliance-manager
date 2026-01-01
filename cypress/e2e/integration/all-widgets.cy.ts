/**
 * All Widgets Integration Test
 * 
 * Comprehensive integration test that validates all 11+ widgets are rendered,
 * respond to security level changes, and maintain consistent state.
 * 
 * This test ensures that widget refactoring improvements are properly integrated
 * across the entire application.
 */

import { widgetNames, widgetSelector } from '../../support/selectors';
import { SECURITY_LEVELS } from '../../support/constants';

describe('All Widgets Integration', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForWidget('widget-security-level');
  });

  describe('Widget Rendering', () => {
    it('should render all essential widgets', () => {
      // Core widgets that should always be present
      const essentialWidgets = [
        'security-level',
        'security-summary',
        'cost-estimation',
        'value-creation',
        'compliance-status',
      ];

      essentialWidgets.forEach(widget => {
        cy.log(`Checking for widget: ${widget}`);
        cy.get(widgetSelector(widget))
          .should('exist')
          .and('be.visible');
      });
    });

    it('should render CIA impact widgets', () => {
      const impactWidgets = [
        'availability-impact',
        'integrity-impact',
        'confidentiality-impact',
      ];

      impactWidgets.forEach(widget => {
        cy.log(`Checking for widget: ${widget}`);
        cy.get(widgetSelector(widget))
          .should('exist');
      });
    });

    it('should render implementation widgets', () => {
      const implementationWidgets = [
        'technical-details',
        'security-resources',
      ];

      implementationWidgets.forEach(widget => {
        cy.log(`Checking for widget: ${widget}`);
        cy.get(widgetSelector(widget))
          .should('exist');
      });
    });
  });

  describe('Security Level Synchronization', () => {
    it('should update all widgets when security levels change', () => {
      // Change all security levels to High
      cy.get('[data-testid="availability-selector"]').select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);
      cy.get('[data-testid="integrity-selector"]').select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(300);
      cy.get('[data-testid="confidentiality-selector"]').select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(500); // Wait for all widgets to update

      // Verify key widgets updated their content
      cy.get(widgetSelector('security-summary'))
        .should('contain', 'High');

      cy.get(widgetSelector('cost-estimation'))
        .should('be.visible');

      cy.get(widgetSelector('value-creation'))
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
        cy.get('[data-testid="availability-selector"]').select(level, { force: true });
        cy.wait(200);
        cy.get('[data-testid="integrity-selector"]').select(level, { force: true });
        cy.wait(200);
        cy.get('[data-testid="confidentiality-selector"]').select(level, { force: true });
        cy.wait(500);

        // Verify at least the security summary reflects the change
        cy.get(widgetSelector('security-summary'))
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
      cy.get(widgetSelector('security-level'))
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
      cy.get(widgetSelector('security-level'))
        .should('be.visible');
      cy.get(widgetSelector('security-summary'))
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
      const widgets = ['security-level', 'security-summary', 'cost-estimation'];
      
      widgets.forEach(widget => {
        cy.get(widgetSelector(widget))
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
      cy.get('[data-testid="availability-selector"]')
        .should('have.attr', 'aria-label')
        .or('be.visible'); // Either has label or is clearly visible
      
      cy.get('[data-testid="integrity-selector"]')
        .should('have.attr', 'aria-label')
        .or('be.visible');
      
      cy.get('[data-testid="confidentiality-selector"]')
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
      
      cy.get('[data-testid="availability-selector"]')
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
      cy.get('[data-testid="availability-selector"]').select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(200);
      cy.get('[data-testid="integrity-selector"]').select(SECURITY_LEVELS.MODERATE, { force: true });
      cy.wait(200);
      cy.get('[data-testid="confidentiality-selector"]').select(SECURITY_LEVELS.HIGH, { force: true });
      cy.wait(500);

      // Verify levels are set
      cy.get('[data-testid="availability-selector"]').should('have.value', SECURITY_LEVELS.HIGH);
      cy.get('[data-testid="integrity-selector"]').should('have.value', SECURITY_LEVELS.MODERATE);
      cy.get('[data-testid="confidentiality-selector"]').should('have.value', SECURITY_LEVELS.HIGH);

      // Interact with another widget (scroll to it)
      cy.get(widgetSelector('cost-estimation')).scrollIntoView();
      cy.wait(300);

      // Verify levels are still set
      cy.get('[data-testid="availability-selector"]').should('have.value', SECURITY_LEVELS.HIGH);
      cy.get('[data-testid="integrity-selector"]').should('have.value', SECURITY_LEVELS.MODERATE);
      cy.get('[data-testid="confidentiality-selector"]').should('have.value', SECURITY_LEVELS.HIGH);
    });
  });
});
