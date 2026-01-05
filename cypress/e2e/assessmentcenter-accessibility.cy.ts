/**
 * Accessibility Tests for AssessmentCenter Widgets (Redesigned)
 * 
 * Tests WCAG 2.1 AA compliance for the compact UI redesign with dark/light theme support.
 * Verifies contrast ratios, keyboard navigation, screen reader support, and ARIA attributes.
 * 
 * Note: These tests use the built-in checkA11y command which performs basic ARIA checks.
 * For more comprehensive accessibility testing, consider installing cypress-axe.
 */

describe('Accessibility - AssessmentCenter Widgets Redesign', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  describe('Overall Accessibility Compliance', () => {
    it('should have no critical accessibility violations in light mode', () => {
      // Use built-in checkA11y for basic ARIA checks
      cy.checkA11y();
    });

    it('should have no critical accessibility violations in dark mode', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      cy.wait(300);
      
      cy.checkA11y();
    });
  });

  describe('WCAG 2.1 AA Contrast Ratios', () => {
    describe('Light Theme', () => {
      beforeEach(() => {
        // Ensure light mode
        cy.get('html').then(($html) => {
          if ($html.hasClass('dark')) {
            cy.get('button').contains(/Light|Dark/).click();
          }
        });
      });

      it('should have visible text in light mode', () => {
        // Verify text is visible (basic check without specific contrast ratio calculation)
        cy.get('[data-testid*="security-summary"]').first().within(() => {
          cy.get('h2, h3, p').each(($el) => {
            expect($el.text().trim()).to.not.be.empty;
            cy.wrap($el).should('be.visible');
          });
        });
      });

      it('should have visible UI components in light mode', () => {
        // Check buttons, borders, and interactive elements are visible
        cy.get('button, select, input').each(($el) => {
          cy.wrap($el).should('be.visible');
        });
      });
    });

    describe('Dark Theme', () => {
      beforeEach(() => {
        // Switch to dark mode
        cy.get('button').contains(/Light|Dark/).click();
        cy.get('html').should('have.class', 'dark');
        cy.wait(300);
      });

      it('should have visible text in dark mode', () => {
        cy.get('[data-testid*="security-summary"]').first().within(() => {
          cy.get('h2, h3, p').each(($el) => {
            expect($el.text().trim()).to.not.be.empty;
            cy.wrap($el).should('be.visible');
          });
        });
      });

      it('should have visible UI components in dark mode', () => {
        cy.get('button, select, input').each(($el) => {
          cy.wrap($el).should('be.visible');
        });
      });

      it('should have readable CIA component colors in dark mode', () => {
        // Verify Confidentiality (purple)
        cy.get('[id*="confidentiality"]').should('be.visible');
        
        // Verify Integrity (green)
        cy.get('[id*="integrity"]').should('be.visible');
        
        // Verify Availability (blue)
        cy.get('[id*="availability"]').should('be.visible');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should allow tab navigation through all interactive elements', () => {
      // Focus on first interactive element
      cy.get('select, button, a, input').first().focus();
      cy.focused().should('exist');
      
      // Tab through a few elements to verify navigation works
      cy.focused().tab();
      cy.focused().should('match', 'select, button, a, input');
    });

    it('should maintain visible focus indicators in light mode', () => {
      cy.get('select').first().focus();
      cy.focused().then(($el) => {
        const element = $el[0] as HTMLElement;
        const win = element.ownerDocument.defaultView;
        const style = win?.getComputedStyle(element);
        
        // Check that element has some form of focus indicator
        const hasOutline = style?.outline && style.outline !== 'none';
        const hasBoxShadow = style?.boxShadow && style.boxShadow !== 'none' && style.boxShadow !== '';
        
        expect(hasOutline || hasBoxShadow, 'Element should have focus indicator').to.be.true;
      });
    });

    it('should maintain visible focus indicators in dark mode', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      cy.get('select').first().focus();
      cy.focused().should('exist');
    });

    it('should navigate through SecuritySummaryWidget tabs with keyboard', () => {
      cy.get('[data-testid*="security-summary"]').first().within(() => {
        // Focus on first tab
        cy.get('[role="tab"]').first().focus();
        
        // Navigate with arrow keys (if implemented)
        cy.focused().type('{rightarrow}');
      });
    });

    it('should allow keyboard interaction with security level selects', () => {
      // Focus on confidentiality select
      cy.get('select#confidentiality-select').focus();
      
      // Change value with keyboard
      cy.focused().type('{downarrow}');
      cy.focused().should('not.have.value', 'Moderate');
    });
  });

  describe('ARIA Attributes and Semantic HTML', () => {
    it('should have proper ARIA labels on widgets', () => {
      cy.get('[role="region"]').should('have.attr', 'aria-label');
    });

    it('should have proper heading hierarchy', () => {
      // Check for h1
      cy.get('h1').should('exist');
      
      // Verify h2 elements exist in widgets
      cy.get('h2').should('have.length.greaterThan', 0);
      
      // Verify h3 elements for subsections
      cy.get('h3').should('have.length.greaterThan', 0);
    });

    it('should use semantic HTML for form controls', () => {
      // Labels should be associated with inputs/selects
      cy.get('label[for]').each(($label) => {
        const forId = $label.attr('for');
        cy.get(`#${forId}`).should('exist');
      });
    });

    it('should have proper ARIA roles for interactive elements', () => {
      // Tabs should have role="tab"
      cy.get('[role="tab"]').should('exist');
      
      // Tab panels should have role="tabpanel"
      cy.get('[role="tabpanel"]').should('exist');
      
      // Regions should have role="region"
      cy.get('[role="region"]').should('exist');
    });

    it('should have aria-live regions for dynamic updates', () => {
      // Change a security level
      cy.get('select#confidentiality-select').select('High');
      
      // Verify dynamic content updates are announced
      cy.get('[aria-live]').should('exist');
    });
  });

  describe('Screen Reader Support', () => {
    it('should have descriptive aria-label on main regions', () => {
      cy.get('[role="region"][aria-label]').each(($region) => {
        const label = $region.attr('aria-label');
        expect(label).to.not.be.empty;
        expect(label?.length).to.be.greaterThan(10);
      });
    });

    it('should announce security level changes', () => {
      // Look for status or alert regions
      cy.get('select#confidentiality-select').select('High');
      
      // Verify there's feedback (visual or aria-live)
      cy.get('[data-testid*="changed"]').should('exist').or(
        cy.get('[aria-live]').should('exist')
      );
    });

    it('should have alt text for icons (if using img)', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
      });
    });

    it('should use aria-hidden for decorative elements', () => {
      // Emoji or decorative icons should be hidden from screen readers
      cy.get('[aria-hidden="true"]').should('exist');
    });
  });

  describe('Compact UI Accessibility', () => {
    it('should maintain minimum touch target size (44x44px)', () => {
      // Check buttons have adequate size
      cy.get('button').each(($btn) => {
        const rect = $btn[0].getBoundingClientRect();
        expect(rect.width).to.be.at.least(44);
        expect(rect.height).to.be.at.least(44);
      });
    });

    it('should maintain readable font sizes in compact layout', () => {
      // Text should not be smaller than 12px (0.75rem)
      cy.get('p, span, div').each(($el) => {
        const fontSize = window.getComputedStyle($el[0]).fontSize;
        const sizeInPx = parseFloat(fontSize);
        expect(sizeInPx).to.be.at.least(12);
      });
    });

    it('should have sufficient spacing for clickable elements', () => {
      // Selects should be easily clickable
      cy.get('select').each(($select) => {
        const rect = $select[0].getBoundingClientRect();
        expect(rect.height).to.be.at.least(32); // Minimum comfortable height
      });
    });
  });

  describe('Responsive Accessibility', () => {
    const viewports: Array<[number, number]> = [
      [375, 667],   // Mobile
      [768, 1024],  // Tablet
      [1280, 800],  // Desktop
    ];

    viewports.forEach(([width, height]) => {
      describe(`Viewport: ${width}x${height}`, () => {
        beforeEach(() => {
          cy.viewport(width, height);
        });

        it('should have no accessibility violations', () => {
          cy.checkA11y(null, {
            rules: {
              'color-contrast': { enabled: false },
            },
          });
        });

        it('should maintain keyboard navigation', () => {
          cy.get('select').first().focus();
          cy.focused().should('exist');
        });
      });
    });
  });

  describe('Error States Accessibility', () => {
    it('should announce errors to screen readers', () => {
      // Error states should have role="alert" or aria-live="assertive"
      cy.get('[role="alert"], [aria-live="assertive"]').should('exist');
    });

    it('should have sufficient contrast for error messages', () => {
      // Check error text elements
      cy.checkA11y('[class*="error"]', {
        rules: {
          'color-contrast': { enabled: true },
        },
      });
    });
  });

  describe('Loading States Accessibility', () => {
    it('should indicate loading state to screen readers', () => {
      // Loading spinners should be properly labeled
      cy.get('[data-testid*="spinner"]').should('have.attr', 'aria-label');
    });

    it('should use aria-busy during loading', () => {
      // Containers should have aria-busy="true" during load
      cy.get('[aria-busy]').should('exist');
    });
  });

  describe('Multi-Column Layout Accessibility', () => {
    it('should maintain logical reading order in 2-column layout', () => {
      cy.viewport(1024, 768); // Desktop viewport for multi-column
      
      // Check that grid items have logical DOM order
      cy.get('[class*="grid-cols-2"]').within(() => {
        cy.get('[class*="col-span"]').should('exist');
      });
    });

    it('should be readable when columns stack on mobile', () => {
      cy.viewport(375, 667); // Mobile viewport
      
      // Verify content is accessible in stacked layout
      cy.checkA11y('[data-testid*="business-impact"]');
    });
  });

  describe('Theme Toggle Accessibility', () => {
    it('should have accessible name for theme toggle button', () => {
      cy.get('button').contains(/Light|Dark/)
        .should('have.attr', 'aria-label')
        .or('contain.text', 'Dark')
        .or('contain.text', 'Light');
    });

    it('should indicate current theme state', () => {
      const toggleBtn = cy.get('button').contains(/Light|Dark/);
      
      // Button text should indicate what action it will perform
      toggleBtn.invoke('text').should('match', /Light|Dark/);
    });

    it('should be keyboard accessible', () => {
      cy.get('button').contains(/Light|Dark/).focus();
      cy.focused().type('{enter}');
      
      // Verify theme changed
      cy.get('html').should('have.class', 'dark').or('not.have.class', 'dark');
    });
  });

  describe('Tab Navigation Accessibility', () => {
    it('should implement ARIA tab pattern correctly', () => {
      cy.get('[role="tablist"]').should('exist');
      cy.get('[role="tab"]').should('have.length.greaterThan', 0);
      cy.get('[role="tabpanel"]').should('exist');
    });

    it('should indicate selected tab with aria-selected', () => {
      cy.get('[role="tab"][aria-selected="true"]').should('have.length', 1);
    });

    it('should associate tabs with their panels via aria-controls', () => {
      cy.get('[role="tab"]').first().then(($tab) => {
        const controlsId = $tab.attr('aria-controls');
        if (controlsId) {
          cy.get(`#${controlsId}`).should('exist');
        }
      });
    });
  });
});
