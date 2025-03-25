/**
 * Centralized export of all test helpers and utilities
 * This makes it easier to import helpers across test files
 */

// Export debug helpers
export * from "./debug-helpers";

// First export the smart widget testing
export * from "./smart-widget-testing";

// Export constants (if needed by tests)
export {
  FLEXIBLE_TEST_IDS,
  SECURITY_LEVELS,
  WIDGET_TEST_IDS,
} from "./constants";

// Export test pattern utilities - make sure these exist in test-patterns.ts
// If they don't exist, either create them or comment these out
// export {
//   generateTests,
//   generateSecurityTests,
// } from "./test-patterns";

// Instead, export the functions that we know exist
export {
  createWidgetTests,
  findWidgetFlexibly,
} from "./widget-testing-template";

// Export widget test utilities
export { safelyCheckMatches } from "../e2e/widgets/common-widget-fix";

// DON'T export types directly, as they should be imported separately when needed
// This resolves the "is not a module" error
export const types = "Import types directly from ./types.ts instead";
