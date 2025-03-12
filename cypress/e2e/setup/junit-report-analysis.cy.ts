/**
 * JUnit Report Analysis
 *
 * This test analyzes existing JUnit reports to identify patterns
 * in test failures and help diagnose issues.
 */
import { analyzeTestFailures, checkForCommonSetupIssues } from '../../support/junit-report-verifier';

describe('JUnit Report Analysis', () => {
  it('analyzes existing JUnit reports for failure patterns', () => {
    // Analyze all JUnit files
    analyzeTestFailures().then(result => {
      cy.log(`Analysis complete: ${result.tests} tests, ${result.failures} failures`);
      
      // Only proceed with detailed analysis if we have failures
      if (result.failures > 0) {
        // Get common failure categories
        const failureCategories = Object.keys(result.failurePatterns || {});
        
        cy.log(`Found ${failureCategories.length} failure patterns`);
        
        // Check for common failure types
        const visibilityIssues = failureCategories.filter(p => 
          p.includes('not visible') || p.includes('not displayed')
        ).length;
        
        const elementNotFoundIssues = failureCategories.filter(p => 
          p.includes('not found') || p.includes('not exist')
        ).length;
        
        const timeoutIssues = failureCategories.filter(p => 
          p.includes('timeout') || p.includes('timed out')
        ).length;
        
        const assertionIssues = failureCategories.filter(p => 
          p.includes('expected') || p.includes('to be') || p.includes('equal')
        ).length;
        
        // Log analysis results
        cy.log('Failure type breakdown:');
        cy.log(`- Visibility issues: ${visibilityIssues}`);
        cy.log(`- Element not found: ${elementNotFoundIssues}`);
        cy.log(`- Timeout issues: ${timeoutIssues}`);
        cy.log(`- Assertion failures: ${assertionIssues}`);
        
        // Provide recommendations
        cy.log('Recommendations based on failure analysis:');
        
        if (visibilityIssues > 0) {
          cy.log('- Check that elements are visible before interacting with them');
          cy.log('- Consider using {force: true} for element interactions');
          cy.log('- Verify that elements are not hidden by CSS');
        }
        
        if (elementNotFoundIssues > 0) {
          cy.log('- Check selector strategies - elements may have changed');
          cy.log('- Verify data-testid attributes are consistent');
          cy.log('- Add more resilient element finding strategies');
        }
        
        if (timeoutIssues > 0) {
          cy.log('- Increase timeouts for slow operations');
          cy.log('- Check for performance regressions in the application');
          cy.log('- Ensure test environment has adequate resources');
        }
        
        if (assertionIssues > 0) {
          cy.log('- Review test expectations - application behavior may have changed');
          cy.log('- Add more specific assertions with better error messages');
          cy.log('- Consider more flexible assertions for dynamic content');
        }
      } else {
        cy.log('No failures found in JUnit reports, or no reports available');
      }
    });
  });
  
  it('checks for common test setup issues', () => {
    // Check for common setup issues
    checkForCommonSetupIssues().then(issues => {
      if (issues.length === 0) {
        cy.log('✅ No common setup issues detected');
      } else {
        cy.log(`⚠️ Found ${issues.length} potential setup issues:`);
        issues.forEach((issue, i) => {
          cy.log(`${i+1}. ${issue}`);
        });
      }
    });
    
    // Verify application is in a testable state
    cy.visit('/');
    cy.get('body').then($body => {
      // Take an overall app screenshot for reference
      cy.screenshot('app-testability-check', { capture: 'viewport' });
      
      // Check that we can find key application components
      const hasComponents = $body.find('[data-testid], [id], [class*="widget"]').length > 0;
      
      expect(hasComponents, 'Application should render testable components').to.be.true;
    });
  });
});
