/**
 * Unified Test Utilities for CIA Compliance Manager
 *
 * This file exports all test utilities from a single entry point,
 * making it easier to find and use the correct utilities.
 *
 * @example
 * // Import everything
 * import * as TestUtils from '../tests';
 *
 * // Or import specific categories
 * import { render, screen } from '../tests/rendering';
 * import { mockChartJs } from '../tests/mocks';
 */

// Re-export categorized utilities
export * from "./utils/chart"; // Chart.js utilities
export * from "./utils/component"; // Component testing utilities
export * from "./utils/dom"; // DOM testing utilities
export * from "./utils/mock"; // Mock factories
export * from "./utils/render"; // Rendering utilities
export * from "./utils/security"; // Security-specific utilities

// Export hook testing utilities
export * from "./testUtils/hookTestUtils";

// DEPRECATED: Export legacy utilities with warnings
// These will be removed in a future version
import * as testMocks from "./testMocks/ciaOptionsMocks";
import * as chartTestUtils from "./testUtils/chartTestUtils";
import * as mockFactory from "./testUtils/mockFactory";

// Add deprecation warnings
const warnDeprecation = (name: string, alternative: string) => {
  console.warn(
    `[DEPRECATED] ${name} is deprecated and will be removed in v1.1. ` +
      `Use ${alternative} instead.`
  );
  return true;
};

// Export legacy utilities with deprecation warnings
export const deprecatedChartUtils = new Proxy(chartTestUtils, {
  get(target, prop) {
    warnDeprecation("chartTestUtils", "utils/chart");
    return target[prop as keyof typeof target];
  },
});

export const deprecatedMockFactory = new Proxy(mockFactory, {
  get(target, prop) {
    warnDeprecation("mockFactory", "utils/mock");
    return target[prop as keyof typeof target];
  },
});

export const deprecatedTestMocks = new Proxy(testMocks, {
  get(target, prop) {
    warnDeprecation("testMocks", "utils/mock");
    return target[prop as keyof typeof target];
  },
});
