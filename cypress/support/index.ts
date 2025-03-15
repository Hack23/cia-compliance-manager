/**
 * Centralized export of all test helpers and utilities
 * This makes it easier to import helpers across test files
 */

// Export debug helpers
export * from "./debug-helpers";

// Export widget test helpers
export * from "./smart-widget-testing";

// Export constants (if needed by tests)
export {
  FLEXIBLE_TEST_IDS,
  SECURITY_LEVELS,
  WIDGET_TEST_IDS,
} from "./constants";

// Export test patterns for reuse
export * from "./test-patterns";

// DON'T export types directly, as they should be imported separately when needed
// This resolves the "is not a module" error
export const types = "Import types directly from ./types.ts instead";
