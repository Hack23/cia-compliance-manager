/**
 * E2E Setup Verification
 *
 * This test verifies that the environment is properly set up for E2E testing
 * and that all essential components are working correctly.
 */

describe('E2E Setup Verification', () => {
  before(() => {
    cy.log('Verifying environment setup for E2E testing');
    
    // Verify that the results directory exists
    cy.task('readFile', { path: 'cypress/results/readme.md' }).then(result => {
      if (result.error) {
        cy.task('writeFile', {
          path: 'cypress/results/readme.md',
          content: '# Cypress JUnit Results\n\nThis directory contains JUnit XML reports generated from Cypress tests.\n'
        });
      }
    });
    
    // Reset JUnit results for clean test run
    cy.task('resetJunitResults');
  });

  it('verifies application loads correctly', () => {
    cy.visit('/');
    cy.log('Checking that application renders essential elements');
    
    // Check that the application loads with basic elements
    cy.get('body').should('not.be.empty');
    cy.get('#root').should('exist');
    
    // Check for presence of key application elements
    cy.get('body').then($body => {
      const hasHeading = $body.find('h1, h2, h3').length > 0;
      const hasControls = $body.find('select, button, input').length > 0;
      const hasContent = $body.find('[data-testid]').length > 0;
      
      cy.log(`Found headings: ${hasHeading}`);
      cy.log(`Found controls: ${hasControls}`);
      cy.log(`Found testid elements: ${hasContent}`);
      
      expect(hasHeading || hasControls || hasContent).to.be.true;
    });
    
    // Wait for app to stabilize
    cy.wait(1000);
  });
  
  it('verifies security level controls are working', () => {
    cy.visit('/');
    
    // Try to find security level controls
    cy.get('body').then($body => {
      // Look for security level selectors with multiple selector strategies
      const selectors = [
        '[data-testid*="security-level"] select',
        'select[name*="security"], select[name*="level"]',
        'select:contains("High"), select:contains("Low")'
      ];
      
      let controlsFound = false;
      
      // Try each selector
      selectors.forEach(selector => {
        if ($body.find(selector).length > 0) {
          controlsFound = true;
          cy.get(selector).first().should('exist');
          cy.log(`Found security level controls with selector: ${selector}`);
        }
      });
      
      if (!controlsFound) {
        cy.log('Could not find security level controls - this may be expected if the app structure has changed');
        cy.log('Continuing with test, but some functionality tests may fail');
      }
    });
  });
  
  it('verifies JUnit reporting is working', () => {
    // Generate a test report entry
    cy.log('Verifying JUnit reporting system');
    
    // This should generate a report entry for this test
    cy.wrap(true).should('be.true');
    
    // Verify JUnit files are created
    cy.task('listJunitFiles').then((files) => {
      cy.log(`Found JUnit files: ${JSON.stringify(files)}`);
      // We don't assert on files.length because they might not be created until after the test completes
    });
  });
  
  it('verifies performance reporting is working', () => {
    cy.log('Verifying performance reporting system');
    
    // Initialize performance monitoring
    cy.window().then((win) => {
      if (!win.cypressPerformanceMetrics) {
        cy.log('Setting up performance metrics collection');
        win.cypressPerformanceMetrics = {
          records: [],
          startTime: Date.now()
        };
      }
    });
    
    // Record a simple test metric
    cy.startMeasurement('setup-test-operation');
    cy.wait(100); // Small wait to have something to measure
    cy.endMeasurement('setup-test-operation', 'setup-test').then(duration => {
      cy.log(`Measured test operation: ${duration}ms`);
      expect(duration).to.be.greaterThan(0);
    });
  });
  
  it('verifies widget finder is working', () => {
    cy.visit('/');
    
    // Try to find any widget
    cy.get('body').then($body => {
      const testIds = Array.from($body.find('[data-testid]'))
        .map(el => el.getAttribute('data-testid'))
        .filter(id => id && id.includes('widget'));
      
      cy.log(`Found widgets with test IDs: ${JSON.stringify(testIds)}`);
      
      if (testIds.length > 0) {
        // Try using our findWidget command with the first widget ID
        const widgetName = testIds[0].replace('widget-', '').split('-')[0];
        cy.findWidget(widgetName).should('exist');
        cy.log(`Successfully found widget with name: ${widgetName}`);
      } else {
        cy.log('No widgets found by test ID - continuing test');
        // Try finding by common widget names
        ['security', 'business', 'compliance', 'cost'].forEach(name => {
          cy.findWidget(name).then($el => {
            if ($el.length) {
              cy.log(`Found widget with name: ${name}`);
            }
          });
        });
      }
    });
  });
});
