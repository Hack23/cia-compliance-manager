/**
 * Mock factory utilities for CIA Compliance Manager.
 *
 * This file consolidates mock creation functions.
 *
 * @packageDocumentation
 */

import { vi } from "vitest";
import { createCIAOptionsMock } from "../testUtils";

// Re-export from existing mock files or provide implementations
export { createCIAOptionsMock } from "../testMocks/ciaOptionsMocks";
export { createMockBusinessImpact } from "../testUtils/testData";

// Add a basic implementation if the above imports don't exist
export function createMockSecurityOptions() {
  return {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5000, opex: 2000 },
    Moderate: { capex: 15000, opex: 5000 },
    High: { capex: 50000, opex: 15000 },
    "Very High": { capex: 200000, opex: 50000 },
  };
}

/**
 * Creates a mock for the useCIAOptions hook
 * @returns Mocked hook implementation
 */
export function mockUseCIAOptionsHook() {
  return vi.fn().mockReturnValue(createCIAOptionsMock());
}

/**
 * Creates type guard test utilities
 * @param guard Type guard function to test
 * @param validExample Valid example of the type
 * @param invalidKeys Keys to make invalid for negative tests
 * @returns Test functions for the type guard
 */
export function createTypeGuardTests<T>(
  guard: (value: unknown) => value is T,
  validExample: T,
  invalidKeys: (keyof T)[]
) {
  return {
    testValidObject: () => {
      expect(guard(validExample)).toBe(true);
      expect(guard(null)).toBe(false);
      expect(guard(undefined)).toBe(false);
      expect(guard(123)).toBe(false);
      expect(guard("string")).toBe(false);
      expect(guard([])).toBe(false);
    },
    testInvalidObjects: () => {
      // Test each invalid key variant
      for (const key of invalidKeys) {
        const invalidObject = { ...validExample, [key]: undefined };
        expect(guard(invalidObject)).toBe(false);
      }
    },
  };
}
