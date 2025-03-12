/**
 * Diagnose "require is not defined" errors in tests
 *
 * This test helps identify which files are using Node.js require()
 * in a browser context, causing tests to fail.
 */
import { analyzeFailure } from '../../support/test-debugger';

describe('Node.js require() Error Diagnosis', () => {
  it('checks for require() calls in test files', () => {
    // Get test files that might use require
    cy.task('listFiles', 'cypress/e2e/**/*.ts').then((files: string[]) => {
      if (!Array.isArray(files)) {
        cy.log('No files found to analyze');
        return;
      }
      
      cy.log(`Analyzing ${files.length} test files for require() usage`);
      
      // For each file, check for require usage
      const requireCheckPromises = files.map(file => 
        cy.task('readFile', { path: file }).then(result => {
          if (result.error || !result.content) return null;
          
          const content = result.content;
          // Look for require statements
          const requireMatches = content.match(/require\s*\(['"](.*)['"]\)/g);
          
          if (requireMatches && requireMatches.length > 0) {
            return {
              file,
              requireStatements: requireMatches,
              count: requireMatches.length
            };
          }
          
          return null;
        })
      );
      
      // Wait for all file checks to complete
      cy.wrap(Promise.all(requireCheckPromises)).then(results => {
        // Filter out null results
        const filesWithRequire = results.filter(r => r !== null);
        
        if (filesWithRequire.length === 0) {
          cy.log('No explicit require() calls found in test files');
          cy.log('Issue may be in imported modules or dynamic requires');
        } else {
          cy.log(`Found ${filesWithRequire.length} files with require() calls:`);
          
          // Log each file and its require statements
          filesWithRequire.forEach(item => {
            cy.log(`File: ${item.file}`);
            cy.log(`  - ${item.count} require statements`);
            item.requireStatements.forEach(stmt => {
              cy.log(`  - ${stmt}`);
            });
          });
          
          // Provide solution
          cy.log('SOLUTION: Convert these require() calls to ES module imports');
          cy.log('Example: Change "const x = require(\'y\')" to "import x from \'y\'"');
        }
      });
    });
  });
  
  it('suggests a fix for constants.ts if needed', () => {
    cy.task('readFile', { path: 'cypress/support/constants.ts' }).then(result => {
      if (result.error || !result.content) return;
      
      const content = result.content;
      if (content.includes('require(')) {
        cy.log('Found require() in constants.ts - this is likely causing issues');
        cy.log('Suggested fix for constants.ts:');
        cy.log(`
// Instead of:
export const CONSTANTS = require('../../src/constants');

// Use:
import { CONSTANTS } from '../../src/constants';
export { CONSTANTS };

// Or for default exports:
import CONSTANTS from '../../src/constants';
export { CONSTANTS };
        `);
      }
    });
  });
});
