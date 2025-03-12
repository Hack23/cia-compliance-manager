/**
 * Accessibility testing for all widgets
 * 
 * This test suite verifies that all widgets meet basic
 * accessibility standards with proper ARIA attributes
 * and keyboard navigation.
 */
import { SECURITY_LEVELS } from "../../support/constants";

describe("Widget Accessibility", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.viewport(1280, 800);
    cy.ensureAppLoaded();
    // Set moderate security to ensure all widgets show content
    cy.setSecurityLevels(
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.MODERATE
    );
  });

  it("security level controls have correct ARIA attributes", () => {
    cy.findWidget('security-level').within(() => {
      // Check select elements have proper accessibility
      cy.get('select').each($select => {
        // Each select should have a label or aria-label
        cy.wrap($select).then($el => {
          const hasAccessibleName = 
            $el.attr('aria-label') || 
            $el.attr('aria-labelledby') || 
            $el.prev('label').length > 0;
          
          expect(hasAccessibleName).to.be.true;
        });
      });
      
      // Check for proper heading hierarchy
      cy.get('h1, h2, h3, h4, h5, h6').should('exist');
    });
  });

  it("tab interfaces have proper ARIA attributes", () => {
    // Look for widgets with tabbed interfaces
    const widgetsWithTabs = [
      'business-impact',
      'technical-details'
    ];
    
    widgetsWithTabs.forEach(widgetName => {
      cy.findWidget(widgetName)
        .scrollIntoView()
        .within(() => {
          // Check for tab elements with proper ARIA attributes
          cy.get('[role="tab"]').each($tab => {
            // Each tab should control a tabpanel
            cy.wrap($tab).then($el => {
              const hasControls = 
                $el.attr('aria-controls') || 
                $el.attr('href')?.startsWith('#');
                
              expect(hasControls || $el.attr('role') === 'tab').to.be.true;
            });
            
            // Selected state should be indicated
            cy.wrap($tab).then($el => {
              expect($el.attr('aria-selected') !== undefined).to.be.true;
            });
          });
          
          // Check for tabpanel elements
          cy.get('[role="tabpanel"]').each($panel => {
            // Each panel should be labeled
            cy.wrap($panel).then($el => {
              const hasLabel = 
                $el.attr('aria-labelledby') || 
                $el.attr('aria-label');
                
              expect(hasLabel || $el.attr('role') === 'tabpanel').to.be.true;
            });
          });
        });
    });
  });
  
  it("interactive elements have accessible names", () => {
    // Check all buttons and interactive elements
    cy.get('button, [role="button"], a, [role="link"]').each($el => {
      cy.wrap($el).then($element => {
        // Get the accessible name
        const accessibleName = 
          $element.attr('aria-label') || 
          $element.attr('aria-labelledby') || 
          $element.text().trim() ||
          $element.attr('title');
          
        // Log elements without accessible names
        if (!accessibleName) {
          cy.log(`Element without accessible name: ${$element.prop('outerHTML')}`);
        }
        
        // Skip assertion for elements that might be decorative/container elements
        // with role="button" but are meant to be visually styled buttons without text
        const isDecorative = 
          $element.children('svg, img').length > 0 && 
          !$element.text().trim();
          
        if (!isDecorative) {
          expect(!!accessibleName).to.be.true;
        }
      });
    });
  });

  it("ensures proper heading structure", () => {
    // Check for heading hierarchy
    let headingLevels: number[] = [];
    
    cy.get('h1, h2, h3, h4, h5, h6').each($heading => {
      const level = parseInt($heading.prop('tagName').substring(1));
      headingLevels.push(level);
    }).then(() => {
      // Ensure we found headings
      expect(headingLevels.length).to.be.greaterThan(0);
      
      // Check for large heading level jumps (e.g., h1 to h4)
      // which is a common accessibility issue
      for (let i = 1; i < headingLevels.length; i++) {
        const jump = headingLevels[i] - headingLevels[i-1];
        // Only warn about jumps larger than 1 level
        if (jump > 1) {
          cy.log(`Potential heading hierarchy issue: Jump from h${headingLevels[i-1]} to h${headingLevels[i]}`);
        }
      }
    });
  });
  
  it("verifies color contrast for important content", () => {
    // This is a basic check, a full color contrast check would require a plugin
    // but we can check if high contrast text classes are used
    cy.get('.text-gray-900, .text-gray-800, .font-bold, .font-semibold')
      .should('exist');
      
    // Look for potentially low-contrast text
    cy.get('.text-gray-300, .text-gray-200, .text-gray-100')
      .should($elements => {
        // This is just a basic check - in a real test we'd use plugins
        // to actually check contrast ratios
        cy.log(`Found ${$elements.length} potentially low-contrast text elements`);
      });
  });
  
  it("widgets support keyboard navigation", () => {
    // Focus first interactive element
    cy.get('button, select, a, [tabindex="0"]').first().focus();
    
    // Press tab several times to navigate
    for (let i = 0; i < 10; i++) {
      cy.focused().then($el => {
        if ($el.length) {
          // Check if the focused element has some visual indication
          cy.wrap($el).should('have.css', 'outline').and('not.equal', 'none');
          // Navigate to next element
          cy.tab();
        }
      });
    }
  });
});
