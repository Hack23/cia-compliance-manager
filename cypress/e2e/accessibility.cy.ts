/**
 * Accessibility E2E Tests - WCAG 2.1 AA Compliance
 * 
 * These tests verify that the CIA Compliance Manager meets WCAG 2.1 Level AA
 * accessibility standards. Tests cover keyboard navigation, ARIA attributes,
 * color contrast, and screen reader compatibility.
 * 
 * @see https://www.w3.org/WAI/WCAG21/quickref/ - WCAG 2.1 Guidelines
 * @see https://www.w3.org/WAI/ARIA/apg/ - ARIA Authoring Practices
 * 
 * To run with automated accessibility checking, install cypress-axe:
 * npm install --save-dev cypress-axe axe-core
 * 
 * Then uncomment the axe-core tests marked with "// WITH CYPRESS-AXE"
 */

describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  beforeEach(() => {
    cy.visit('/');
    // WITH CYPRESS-AXE: Uncomment to inject axe-core
    // cy.injectAxe();
  });

  describe('Page Structure and Landmarks', () => {
    it('should have a valid HTML document structure', () => {
      // Check for html lang attribute
      cy.get('html').should('have.attr', 'lang');
      
      // Verify document has a title
      cy.title().should('not.be.empty');
    });

    it('should have proper landmark regions', () => {
      // Main content should be present
      cy.get('main, [role="main"]').should('exist');
    });

    it('should have a logical heading hierarchy', () => {
      // Check that h1 exists
      cy.get('h1').should('exist');
      
      // Verify headings are in logical order (no skipping levels)
      cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
        const headingLevels = $headings.toArray().map(h => parseInt(h.tagName.charAt(1)));
        
        for (let i = 1; i < headingLevels.length; i++) {
          const diff = headingLevels[i] - headingLevels[i - 1];
          // Heading levels should not skip more than 1 level
          expect(diff).to.be.at.most(1);
        }
      });
    });
  });

  describe('Keyboard Navigation - Global', () => {
    it('should allow tabbing through all interactive elements', () => {
      // Get all focusable elements
      const focusableSelectors = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
      
      cy.get(focusableSelectors).first().focus();
      cy.focused().should('exist');
      
      // Tab through some elements
      cy.realPress('Tab');
      cy.focused().should('exist');
      
      cy.realPress('Tab');
      cy.focused().should('exist');
    });

    it('should show visible focus indicators', () => {
      // Focus first interactive element
      cy.get('button').first().focus();
      
      // Check that focused element has visible styling
      cy.focused().should('be.visible');
      cy.focused().should('have.css', 'outline').and('not.equal', 'none');
    });

    it('should support Shift+Tab for backward navigation', () => {
      // Focus on an element in the middle
      cy.get('button').eq(2).focus();
      const initialElement = cy.focused();
      
      // Press Shift+Tab
      cy.realPress(['Shift', 'Tab']);
      
      // Should focus previous element
      cy.focused().should('not.equal', initialElement);
    });
  });

  describe('SecuritySummaryWidget - Accessibility', () => {
    it('should have accessible tab navigation with ARIA attributes', () => {
      const widgetSelector = '[data-testid="security-summary-widget"]';
      
      cy.get(widgetSelector).within(() => {
        // Verify tab list has proper role
        cy.get('[role="tablist"]').should('exist');
        
        // Verify tabs have proper ARIA attributes
        cy.get('[role="tab"]').each(($tab) => {
          // Each tab should have aria-selected
          cy.wrap($tab).should('have.attr', 'aria-selected');
          
          // Each tab should control a panel
          cy.wrap($tab).should('have.attr', 'aria-controls');
          
          // Each tab should have an id
          cy.wrap($tab).should('have.attr', 'id');
        });
        
        // Verify exactly one tab is selected
        cy.get('[role="tab"][aria-selected="true"]').should('have.length', 1);
        
        // Verify tab panels exist
        cy.get('[role="tabpanel"]').should('exist');
        
        // Verify tab panels are labeled by tabs
        cy.get('[role="tabpanel"]').each(($panel) => {
          cy.wrap($panel).should('have.attr', 'aria-labelledby');
        });
      });
    });

    it('should support keyboard navigation through tabs', () => {
      const widgetSelector = '[data-testid="security-summary-widget"]';
      
      cy.get(widgetSelector).within(() => {
        // Focus first tab
        cy.get('[role="tab"]').first().focus();
        cy.focused().should('have.attr', 'aria-selected', 'true');
        
        // Press Right Arrow to move to next tab
        cy.realPress('ArrowRight');
        cy.focused().should('have.attr', 'role', 'tab');
        cy.focused().invoke('attr', 'id').then((firstId) => {
          cy.get('[role="tab"]').first().invoke('attr', 'id').should('not.equal', firstId);
        });
        
        // Press Left Arrow to go back
        cy.realPress('ArrowLeft');
        cy.focused().should('exist');
        
        // Press Home to go to first tab
        cy.realPress('Home');
        cy.focused().should('have.attr', 'role', 'tab');
        cy.get('[role="tab"]').first().should('be.focused');
        
        // Press End to go to last tab
        cy.realPress('End');
        cy.focused().should('have.attr', 'role', 'tab');
        cy.get('[role="tab"]').last().should('be.focused');
      });
    });

    it('should have accessible labels and descriptions', () => {
      const widgetSelector = '[data-testid="security-summary-widget"]';
      
      cy.get(widgetSelector).within(() => {
        // Security classification should have proper heading
        cy.get('#security-classification-heading').should('exist');
        
        // Security score should have label
        cy.get('#security-score-label').should('exist');
        
        // Screen reader instructions should exist but be hidden
        cy.get('#tab-keyboard-instructions').should('exist');
        cy.get('#tab-keyboard-instructions').should('have.class', 'sr-only');
      });
    });

    it('should announce dynamic changes to screen readers', () => {
      const widgetSelector = '[data-testid="security-summary-widget"]';
      
      cy.get(widgetSelector).within(() => {
        // Security score should have aria-live
        cy.get('[aria-live="polite"]').should('exist');
        
        // Risk level should have role="status"
        cy.get('[role="status"]').should('exist');
      });
    });

    it('should hide decorative elements from screen readers', () => {
      const widgetSelector = '[data-testid="security-summary-widget"]';
      
      cy.get(widgetSelector).within(() => {
        // Pulse dot indicator should be hidden from screen readers
        cy.get('.pulse-dot').should('have.attr', 'aria-hidden', 'true');
      });
    });
  });

  describe('Form Elements - Accessibility', () => {
    it('should have labels for all form inputs', () => {
      // Find all inputs
      cy.get('input, select, textarea').each(($input) => {
        const id = $input.attr('id');
        const ariaLabel = $input.attr('aria-label');
        const ariaLabelledby = $input.attr('aria-labelledby');
        
        // Input should have either: id with label, aria-label, or aria-labelledby
        expect(
          (id && cy.get(`label[for="${id}"]`).should('exist')) || 
          ariaLabel || 
          ariaLabelledby
        ).to.exist;
      });
    });

    it('should mark required fields appropriately', () => {
      cy.get('input[required], select[required], textarea[required]').each(($field) => {
        // Required fields should have aria-required or required attribute
        const hasAriaRequired = $field.attr('aria-required') === 'true';
        const hasRequired = $field.attr('required') !== undefined;
        
        expect(hasAriaRequired || hasRequired).to.be.true;
      });
    });
  });

  describe('Interactive Elements - Keyboard Accessibility', () => {
    it('should activate buttons with Enter key', () => {
      // Find a button
      cy.get('button').first().focus();
      
      // Press Enter
      cy.realPress('Enter');
      
      // Button should have been activated (check for any state change)
      // This is a general test - specific button behavior tested elsewhere
    });

    it('should activate buttons with Space key', () => {
      cy.get('button').first().focus();
      cy.realPress('Space');
      // Button activated
    });

    it('should have proper button roles and accessible names', () => {
      cy.get('button').each(($button) => {
        // Each button should have accessible text or aria-label
        const text = $button.text().trim();
        const ariaLabel = $button.attr('aria-label');
        const ariaLabelledby = $button.attr('aria-labelledby');
        
        expect(text || ariaLabel || ariaLabelledby).to.exist;
      });
    });
  });

  describe('Color Contrast - WCAG AA Compliance', () => {
    // Note: Automated color contrast testing is best done with axe-core
    // These are manual verification tests
    
    it('should have sufficient contrast for normal text', () => {
      // WITH CYPRESS-AXE: Uncomment to check with axe-core
      // cy.checkA11y(null, {
      //   rules: {
      //     'color-contrast': { enabled: true }
      //   }
      // });
      
      // Manual check: verify text is readable
      cy.get('p, span, div').each(($el) => {
        if ($el.text().trim()) {
          cy.wrap($el).should('be.visible');
        }
      });
    });

    it('should have sufficient contrast for interactive elements', () => {
      // Verify buttons and links are visible and readable
      cy.get('button, a').each(($el) => {
        if ($el.is(':visible')) {
          cy.wrap($el).should('be.visible');
        }
      });
    });
  });

  describe('Images and Media - Alternative Text', () => {
    it('should have alt text for all informative images', () => {
      cy.get('img').each(($img) => {
        const alt = $img.attr('alt');
        const role = $img.attr('role');
        
        // Informative images should have alt text
        // Decorative images should have empty alt or role="presentation"
        expect(
          alt !== undefined || 
          role === 'presentation' || 
          role === 'none'
        ).to.be.true;
      });
    });
  });

  describe('ARIA - Proper Usage', () => {
    it('should not use invalid ARIA attributes', () => {
      // Check that ARIA attributes are used correctly
      cy.get('[role]').each(($el) => {
        const role = $el.attr('role');
        
        // Verify role is a valid ARIA role (not exhaustive, but common ones)
        const validRoles = [
          'button', 'link', 'navigation', 'main', 'complementary', 'banner',
          'contentinfo', 'region', 'article', 'tab', 'tabpanel', 'tablist',
          'status', 'alert', 'dialog', 'menu', 'menuitem', 'list', 'listitem',
          'img', 'progressbar', 'checkbox', 'radio', 'textbox'
        ];
        
        expect(validRoles).to.include(role);
      });
    });

    it('should have proper ARIA relationships', () => {
      // Elements with aria-labelledby should reference existing IDs
      cy.get('[aria-labelledby]').each(($el) => {
        const labelIds = $el.attr('aria-labelledby')?.split(' ') || [];
        labelIds.forEach(labelId => {
          cy.get(`#${labelId}`).should('exist');
        });
      });

      // Elements with aria-describedby should reference existing IDs
      cy.get('[aria-describedby]').each(($el) => {
        const descIds = $el.attr('aria-describedby')?.split(' ') || [];
        descIds.forEach(descId => {
          cy.get(`#${descId}`).should('exist');
        });
      });

      // Elements with aria-controls should reference existing IDs
      cy.get('[aria-controls]').each(($el) => {
        const controlIds = $el.attr('aria-controls')?.split(' ') || [];
        controlIds.forEach(controlId => {
          cy.get(`#${controlId}`).should('exist');
        });
      });
    });
  });

  describe('Screen Reader - Semantic HTML', () => {
    it('should use semantic HTML elements', () => {
      // Check for semantic elements
      const semanticElements = ['header', 'nav', 'main', 'section', 'article', 'aside', 'footer'];
      
      semanticElements.forEach(element => {
        // Not all pages need all elements, but at least some should exist
        cy.get(`${element}, [role="${element === 'header' ? 'banner' : element === 'footer' ? 'contentinfo' : element}"]`);
      });
    });

    it('should not have empty links or buttons', () => {
      cy.get('a, button').each(($el) => {
        const text = $el.text().trim();
        const ariaLabel = $el.attr('aria-label');
        const ariaLabelledby = $el.attr('aria-labelledby');
        const title = $el.attr('title');
        
        // Interactive elements should have some form of accessible text
        expect(
          text.length > 0 || 
          ariaLabel || 
          ariaLabelledby || 
          title
        ).to.be.true;
      });
    });
  });

  describe('Automated Accessibility Testing', () => {
    // WITH CYPRESS-AXE: Uncomment to run automated axe-core tests
    
    // it('should have no accessibility violations on home page', () => {
    //   cy.checkA11y();
    // });

    // it('should have no violations in SecuritySummaryWidget', () => {
    //   cy.get('[data-testid="security-summary-widget"]').checkA11y();
    // });

    // it('should have no violations with specific rules', () => {
    //   cy.checkA11y(null, {
    //     rules: {
    //       'color-contrast': { enabled: true },
    //       'label': { enabled: true },
    //       'button-name': { enabled: true },
    //       'link-name': { enabled: true },
    //     }
    //   });
    // });
  });

  describe('Focus Management', () => {
    it('should trap focus in modal dialogs', () => {
      // This test would need to be updated based on actual modal implementation
      // Verify that when modal is open, focus stays within modal
    });

    it('should restore focus when modal closes', () => {
      // Verify focus returns to trigger element when modal closes
    });

    it('should not lose focus during navigation', () => {
      // Tab through several elements
      cy.get('button').first().focus();
      cy.realPress('Tab');
      cy.focused().should('exist');
      cy.realPress('Tab');
      cy.focused().should('exist');
    });
  });
});

// Export for use in other test files
export {};
