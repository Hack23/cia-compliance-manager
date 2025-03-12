/**
 * Test debugging utility for diagnosing common Cypress errors
 */

/**
 * Analyzes a failure message to determine the root cause
 * @param errorMessage The error message to analyze
 * @returns An object with diagnosis information
 */
export function analyzeFailure(errorMessage: string) {
  // Check for common error patterns
  const patterns = {
    requireNotDefined: /require is not defined/i,
    moduleNotFound: /cannot find module/i,
    syntaxError: /syntax error|unexpected token/i,
    timeoutError: /timed out|timeout/i,
    assertionError: /expected .* to/i
  };

  const results = Object.entries(patterns).reduce((acc, [key, pattern]) => {
    acc[key] = pattern.test(errorMessage);
    return acc;
  }, {} as Record<string, boolean>);

  // Determine root cause
  let rootCause = 'unknown';
  let solution = '';

  if (results.requireNotDefined) {
    rootCause = 'require-in-browser';
    solution = 'The test is using Node.js require() in a browser context. Use ES modules import/export or webpack/bundler config for browser compatibility.';
  } else if (results.moduleNotFound) {
    rootCause = 'missing-module';
    solution = 'A required module is missing. Check import paths and ensure all dependencies are installed.';
  } else if (results.syntaxError) {
    rootCause = 'syntax-error';
    solution = 'There is a syntax error in the code. Check for typos, missing brackets, or unsupported syntax.';
  }

  return {
    results,
    rootCause,
    solution
  };
}

/**
 * Creates a fix for a specific error
 * @param rootCause The identified root cause
 * @returns Code to fix the issue
 */
export function generateFix(rootCause: string) {
  switch (rootCause) {
    case 'require-in-browser':
      return {
        description: 'Convert Node.js require to browser-compatible import',
        sampleFix: `
// From:
const myModule = require('./my-module');

// To:
import myModule from './my-module';

// Or for dynamic imports:
// Replace with:
import('./my-module').then(myModule => {
  // Use myModule here
});
`
      };
    
    default:
      return {
        description: 'No automatic fix available',
        sampleFix: 'Manual investigation required'
      };
  }
}

// Add Cypress command for quick diagnostics
if (typeof Cypress !== 'undefined') {
  Cypress.Commands.add('diagnoseFailure', (errorMessage: string) => {
    const diagnosis = analyzeFailure(errorMessage);
    cy.log(`Diagnosed root cause: ${diagnosis.rootCause}`);
    cy.log(`Suggested solution: ${diagnosis.solution}`);
    return cy.wrap(diagnosis);
  });
}

export default {
  analyzeFailure,
  generateFix
};
