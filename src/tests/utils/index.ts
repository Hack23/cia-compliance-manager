/**
 * Centralized export of all test utilities for CIA Compliance Manager.
 *
 * ## Organization:
 * - component: Component testing utilities
 * - mock: Mock factories and data
 * - render: Render utilities
 * - security: Security-specific test helpers
 * - dom: DOM testing utilities
 * - chart: Chart.js test helpers
 *
 * @packageDocumentation
 */

// Re-export from component testing utils
export * from "./component";

// Re-export from mock utilities
export * from "./mock";

// Re-export from render utilities
export * from "./render"; // Note: This will work with either .ts or .tsx extension

// Re-export from security utilities
export * from "./security";

// Re-export from DOM utilities
export * from "./dom";

// Re-export from chart utilities
export * from "./chart";

// Legacy re-exports for backward compatibility
import * as securityLevelTestUtils from "../../test/securityLevelTestUtils";
import * as legacyTestHelpers from "../../utils/test-helpers";
import * as legacyTestUtils from "../../utils/test-utils";
import * as legacyTestMocks from "../testMocks";

/**
 * @deprecated Use specific imports from test utils instead.
 * This will be removed in v1.1.0.
 */
export const legacy = {
  ...legacyTestUtils,
  ...legacyTestHelpers,
  ...legacyTestMocks,
  ...securityLevelTestUtils,
};
