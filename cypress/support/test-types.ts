/**
 * Shared TypeScript interfaces for Cypress E2E tests
 */

/**
 * Extended Window interface with consoleErrors tracking
 */
export interface WindowWithConsoleErrors extends Window {
  consoleErrors?: string[];
}
