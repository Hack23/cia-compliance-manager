/**
 * JUnit Report Verification Utility
 * 
 * This utility provides functions to verify the integrity of JUnit reports
 * and diagnose common issues with test failures.
 */

/**
 * Verify that JUnit reports are being correctly generated
 */
export function verifyJUnitReportsGeneration(): Cypress.Chainable<boolean> {
  return cy.task('listJunitFiles').then((files) => {
    if (Array.isArray(files) && files.length > 0) {
      cy.log(`Found ${files.length} JUnit XML files`);
      return cy.wrap(true);
    } else {
      cy.log('No JUnit XML files found. Checking if directory exists...');
      
      // Check if results directory exists
      return cy.task('readFile', { path: 'cypress/results' }).then(result => {
        if (result.error) {
          cy.log('Results directory may not exist. Attempting to create it...');
          return cy.task('writeFile', {
            path: 'cypress/results/readme.md',
            content: '# Cypress JUnit Results\n\nThis directory contains JUnit XML reports generated from Cypress tests.\n'
          }).then(() => {
            cy.log('Created results directory and placeholder file');
            return cy.wrap(false);
          });
        }
        
        cy.log('Results directory exists but no JUnit files found');
        return cy.wrap(false);
      });
    }
  });
}

/**
 * Analyze test failures in JUnit reports
 * @param specFile Optional spec file to filter by
 */
export function analyzeTestFailures(specFile?: string): Cypress.Chainable<any> {
  return cy.task('listJunitFiles').then((files: string[]) => {
    if (!Array.isArray(files) || files.length === 0) {
      cy.log('No JUnit files found to analyze');
      return cy.wrap({ failures: 0, tests: 0 });
    }
    
    // Filter by spec file if provided
    const relevantFiles = specFile 
      ? files.filter(f => f.includes(specFile))
      : files;
    
    if (relevantFiles.length === 0) {
      cy.log(`No JUnit files found matching spec: ${specFile}`);
      return cy.wrap({ failures: 0, tests: 0 });
    }
    
    // Analyze each file
    const analysisPromises = relevantFiles.map(file => 
      cy.task('readFile', { path: file }).then(result => {
        if (result.error || !result.content) {
          cy.log(`Error reading file ${file}: ${result.error}`);
          return null;
        }
        
        const content = result.content;
        
        // Extract basic test metrics
        const testsMatch = content.match(/tests="(\d+)"/);
        const failuresMatch = content.match(/failures="(\d+)"/);
        const errorsMatch = content.match(/errors="(\d+)"/);
        
        const tests = testsMatch ? parseInt(testsMatch[1]) : 0;
        const failures = failuresMatch ? parseInt(failuresMatch[1]) : 0;
        const errors = errorsMatch ? parseInt(errorsMatch[1]) : 0;
        
        // Extract failure messages
        const failureMessages: string[] = [];
        const failureRegex = /<failure.*?message="(.*?)".*?>/g;
        let match;
        
        while ((match = failureRegex.exec(content)) !== null) {
          failureMessages.push(match[1]);
        }
        
        return {
          file: file,
          tests,
          failures,
          errors,
          failureMessages
        };
      })
    );
    
    // Wait for all analysis to complete
    return cy.wrap(Promise.all(analysisPromises)).then(results => {
      const filteredResults = results.filter(r => r !== null);
      
      // Aggregate stats
      const totalTests = filteredResults.reduce((sum, r) => sum + r.tests, 0);
      const totalFailures = filteredResults.reduce((sum, r) => sum + r.failures, 0);
      const totalErrors = filteredResults.reduce((sum, r) => sum + r.errors, 0);
      
      // List all failure messages
      const allFailureMessages = filteredResults.flatMap(r => r.failureMessages);
      
      // Group similar failures
      const failureGroups: Record<string, number> = {};
      allFailureMessages.forEach(msg => {
        // Simplify message to group similar errors
        const simplifiedMsg = msg
          .replace(/\s+/g, ' ')
          .replace(/\d+px/g, 'NNpx')
          .replace(/\d+ms/g, 'NNms')
          .replace(/(['"]).*?\1/g, '$1...$1')
          .substring(0, 60);
        
        failureGroups[simplifiedMsg] = (failureGroups[simplifiedMsg] || 0) + 1;
      });
      
      // Log summary
      cy.log(`Analysis of ${filteredResults.length} JUnit files`);
      cy.log(`Total tests: ${totalTests}`);
      cy.log(`Total failures: ${totalFailures}`);
      cy.log(`Total errors: ${totalErrors}`);
      
      // Log common failure patterns
      const sortedFailures = Object.entries(failureGroups)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      if (sortedFailures.length > 0) {
        cy.log('Most common failure patterns:');
        sortedFailures.forEach(([pattern, count]) => {
          cy.log(`  - ${pattern} (${count} occurrences)`);
        });
      }
      
      return {
        files: filteredResults.length,
        tests: totalTests,
        failures: totalFailures,
        errors: totalErrors,
        failurePatterns: failureGroups
      };
    });
  });
}

/**
 * Check for common test setup issues
 */
export function checkForCommonSetupIssues(): Cypress.Chainable<string[]> {
  const issues: string[] = [];
  
  // Check for application loading issues
  return cy.visit('/')
    .then(() => {
      return cy.get('body').then($body => {
        // Check if app has basic structure
        if ($body.find('#root').children().length === 0) {
          issues.push('Application may not be loading correctly - empty #root element');
        }
        
        // Check for React error boundaries
        if ($body.find('[role="alert"], .error-boundary').length > 0) {
          issues.push('Found error boundaries in the application - check for React errors');
        }
        
        // Check for common test ID issues
        if ($body.find('[data-testid]').length === 0) {
          issues.push('No elements with data-testid found - tests may fail to find elements');
        }
        
        // Check security level controls are present
        const securityControls = $body.find('select').filter((_, el) => {
          const text = $(el).text().toLowerCase();
          return text.includes('security') || text.includes('level') || 
                 text.includes('high') || text.includes('low');
        });
        
        if (securityControls.length === 0) {
          issues.push('Security level controls not found - core functionality tests may fail');
        }
        
        return cy.wrap(issues);
      });
    });
}

export default {
  verifyJUnitReportsGeneration,
  analyzeTestFailures,
  checkForCommonSetupIssues
};
