/**
 * Centralized type definitions for custom Cypress commands
 * This file ensures proper TypeScript typing for all custom commands
 */

import "./commands";
import "./debug-helpers";
import "./enhanced-commands";

// Re-export types from all modules
export * from "./types";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Debug failed test with comprehensive info
       * @param testName - Name of the test that failed
       * @example cy.debugFailedTest('my test name')
       */
      debugFailedTest(testName: string): Chainable<null>;

      /**
       * Mount a React component for component testing
       */
      mount: typeof import("cypress/react").mount;
    }
  }
}
