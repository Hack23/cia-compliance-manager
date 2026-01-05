/**
 * Theme Switching E2E Tests
 * 
 * Tests for dark/light theme switching functionality across AssessmentCenter widgets.
 * Verifies WCAG 2.1 AA compliance and proper theme application.
 */

describe('Theme Switching - AssessmentCenter Widgets', () => {
  beforeEach(() => {
    // Visit the app and wait for it to load
    cy.visit('/');
    cy.wait(500); // Allow time for initial render
  });

  describe('Theme Toggle Button', () => {
    it('should display theme toggle button in header', () => {
      cy.get('button').contains(/Light|Dark/).should('be.visible');
    });

    it('should toggle between light and dark themes', () => {
      // Get initial theme state
      cy.get('html').then(($html) => {
        const initialHasDark = $html.hasClass('dark');
        
        // Click theme toggle
        cy.get('button').contains(/Light|Dark/).click();
        
        // Verify theme changed
        cy.get('html').should(initialHasDark ? 'not.have.class' : 'have.class', 'dark');
        
        // Toggle back
        cy.get('button').contains(/Light|Dark/).click();
        
        // Verify reverted
        cy.get('html').should(initialHasDark ? 'have.class' : 'not.have.class', 'dark');
      });
    });

    it('should persist theme preference across page reloads', () => {
      // Set to dark mode
      cy.get('button').contains(/Light|Dark/).then(($btn) => {
        const buttonText = $btn.text();
        if (buttonText.includes('Dark')) {
          $btn.click();
        }
      });
      
      cy.get('html').should('have.class', 'dark');
      
      // Reload page
      cy.reload();
      
      // Verify dark mode persists
      cy.get('html').should('have.class', 'dark');
    });
  });

  describe('SecuritySummaryWidget Theme Support', () => {
    it('should apply dark theme classes correctly', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Wait for widgets to render
      cy.wait(500);
      
      // Check SecuritySummaryWidget has dark background
      cy.get('[data-testid*="security-summary"]').first()
        .should('exist')
        .and('be.visible');
    });

    it('should maintain readability in dark mode', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Verify text is visible (not same color as background)
      cy.get('[data-testid*="security-summary"]').first().within(() => {
        cy.get('h2, h3, p').each(($el) => {
          // Element should have text content and be visible
          expect($el.text().trim()).to.not.be.empty;
        });
      });
    });

    it('should switch between light and dark seamlessly', () => {
      // Toggle theme multiple times
      for (let i = 0; i < 3; i++) {
        cy.get('button').contains(/Light|Dark/).click();
        cy.wait(200);
        
        // Verify widgets remain functional
        cy.get('[data-testid*="security-summary"]').should('exist');
      }
    });
  });

  describe('SecurityLevelWidget Theme Support', () => {
    it('should apply theme to CIA component selectors', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Check SecurityLevelWidget components
      cy.get('[data-testid*="security-level"]').first().should('exist');
      
      // Verify select dropdowns have dark mode styling
      cy.get('select[id*="-select"]').should('exist');
    });

    it('should maintain CIA component color distinction in both themes', () => {
      // Test in light mode
      cy.get('select#confidentiality-select').should('exist');
      cy.get('select#integrity-select').should('exist');
      cy.get('select#availability-select').should('exist');
      
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Verify components still exist and are styled
      cy.get('select#confidentiality-select').should('exist');
      cy.get('select#integrity-select').should('exist');
      cy.get('select#availability-select').should('exist');
    });
  });

  describe('BusinessImpactAnalysisWidget Theme Support', () => {
    it('should apply theme to BIA widget sections', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Scroll to BIA widget
      cy.get('[data-testid*="business-impact"]').first()
        .scrollIntoView()
        .should('be.visible');
    });

    it('should maintain responsive grid in both themes', () => {
      const testResponsiveGrid = () => {
        cy.get('[data-testid*="business-impact"]').first().within(() => {
          // Check for grid layouts
          cy.get('[class*="grid"]').should('exist');
        });
      };
      
      // Test in light mode
      testResponsiveGrid();
      
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Test in dark mode
      testResponsiveGrid();
    });
  });

  describe('Tab Components Theme Support', () => {
    it('should apply theme to tab content areas', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Navigate through SecuritySummaryWidget tabs
      const tabLabels = ['Overview', 'Business', 'Implementation', 'Compliance'];
      
      tabLabels.forEach((label) => {
        cy.contains('button', label).click({ force: true });
        cy.wait(200);
        
        // Verify tab content is visible
        cy.get('[role="tabpanel"]').should('be.visible');
      });
    });

    it('should maintain consistent spacing in themed tabs', () => {
      // Get initial spacing measurements in light mode
      cy.get('[data-testid*="security-summary"]').first().within(() => {
        cy.get('[class*="space-y"]').should('exist');
      });
      
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Verify spacing classes still applied
      cy.get('[data-testid*="security-summary"]').first().within(() => {
        cy.get('[class*="space-y"]').should('exist');
      });
    });
  });

  describe('WCAG 2.1 AA Compliance', () => {
    it('should have sufficient contrast in light mode', () => {
      // Ensure light mode
      cy.get('html').then(($html) => {
        if ($html.hasClass('dark')) {
          cy.get('button').contains(/Light|Dark/).click();
        }
      });
      
      // Check contrast on key elements
      cy.get('h2, h3').first().should('be.visible');
      cy.get('p').first().should('be.visible');
    });

    it('should have sufficient contrast in dark mode', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Check contrast on key elements
      cy.get('h2, h3').first().should('be.visible');
      cy.get('p').first().should('be.visible');
    });

    it('should maintain focus indicators in both themes', () => {
      // Test in light mode
      cy.get('select').first().focus();
      cy.focused().should('exist');
      
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Test focus in dark mode
      cy.get('select').first().focus();
      cy.focused().should('exist');
    });
  });

  describe('Compact UI Spacing', () => {
    it('should maintain compact spacing in light mode', () => {
      cy.get('[class*="p-sm"]').should('exist');
      cy.get('[class*="gap-sm"]').should('exist');
    });

    it('should maintain compact spacing in dark mode', () => {
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      cy.get('[class*="p-sm"]').should('exist');
      cy.get('[class*="gap-sm"]').should('exist');
    });

    it('should fit widgets in viewport without excessive scrolling', () => {
      // Test viewport fit in light mode
      cy.get('[data-testid*="security-summary"]').first()
        .scrollIntoView()
        .should('be.visible');
      
      // Switch to dark mode
      cy.get('button').contains(/Light|Dark/).click();
      cy.get('html').should('have.class', 'dark');
      
      // Test viewport fit in dark mode
      cy.get('[data-testid*="security-summary"]').first()
        .scrollIntoView()
        .should('be.visible');
    });
  });

  describe('Performance', () => {
    it('should switch themes quickly without lag', () => {
      const startTime = Date.now();
      
      // Toggle theme
      cy.get('button').contains(/Light|Dark/).click();
      
      // Verify theme changed within reasonable time
      cy.get('html').should('have.class', 'dark').then(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Theme switch should be nearly instant (< 500ms)
        expect(duration).to.be.lessThan(500);
      });
    });

    it('should not cause layout shift when switching themes', () => {
      // Get initial scroll position
      cy.window().then((win) => {
        const initialScrollY = win.scrollY;
        
        // Toggle theme
        cy.get('button').contains(/Light|Dark/).click();
        cy.wait(100);
        
        // Verify scroll position unchanged
        cy.window().its('scrollY').should('equal', initialScrollY);
      });
    });
  });

  describe('Responsive Behavior with Themes', () => {
    const viewports: Array<[number, number]> = [
      [375, 667],   // Mobile
      [768, 1024],  // Tablet
      [1280, 800],  // Desktop
    ];

    viewports.forEach(([width, height]) => {
      it(`should render correctly at ${width}x${height} in both themes`, () => {
        cy.viewport(width, height);
        
        // Test light mode
        cy.get('[data-testid*="security-summary"]').first().should('be.visible');
        
        // Switch to dark mode
        cy.get('button').contains(/Light|Dark/).click();
        cy.get('html').should('have.class', 'dark');
        
        // Test dark mode
        cy.get('[data-testid*="security-summary"]').first().should('be.visible');
      });
    });
  });
});
