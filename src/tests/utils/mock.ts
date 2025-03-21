/**
 * Mock factory utilities for CIA Compliance Manager.
 *
 * This file consolidates mock creation functions from:
 * - src/tests/testMocks.ts
 * - src/tests/testUtils/mockFactory.ts
 * - src/utils/test-helpers.ts (mock creation functions)
 *
 * @packageDocumentation
 */

import { vi } from "vitest";

/**
 * Creates a mock business impact assessment
 * @param overrides Overrides for default values
 * @returns Mocked business impact assessment
 */
export function createMockBusinessImpact(overrides = {}) {
  return {
    summary: "Test business impact summary",
    financial: {
      description: "Test financial impact",
      riskLevel: "Medium",
      annualRevenueLoss: "$100,000",
    },
    operational: {
      description: "Test operational impact",
      riskLevel: "Low",
      meanTimeToRecover: "4 hours",
    },
    reputational: {
      description: "Test reputational impact",
      riskLevel: "Medium",
    },
    regulatory: {
      description: "Test regulatory impact",
      riskLevel: "High",
      complianceViolations: ["GDPR", "HIPAA"],
    },
    ...overrides,
  };
}

/**
 * Creates mocked CIA options with consistent data
 * @returns Mocked CIA options
 */
export function createMockCIAOptions() {
  const mockOptions = {
    None: {
      capex: 0,
      opex: 0,
      description: "No security controls implemented",
    },
    Low: {
      capex: 5,
      opex: 2,
      description: "Basic security controls",
    },
    Moderate: {
      capex: 10,
      opex: 5,
      description: "Standard security controls",
    },
    High: {
      capex: 15,
      opex: 8,
      description: "Advanced security controls",
    },
    "Very High": {
      capex: 20,
      opex: 10,
      description: "Maximum security controls",
    },
  };

  return {
    availabilityOptions: { ...mockOptions },
    integrityOptions: { ...mockOptions },
    confidentialityOptions: { ...mockOptions },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: { returnRate: "200%", description: "Moderate ROI" },
      HIGH: { returnRate: "350%", description: "High ROI" },
      VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
    },
  };
}

/**
 * Creates a mock for the useCIAOptions hook
 * @returns Mocked hook implementation
 */
export function mockUseCIAOptionsHook() {
  return vi.fn().mockReturnValue(createMockCIAOptions());
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
