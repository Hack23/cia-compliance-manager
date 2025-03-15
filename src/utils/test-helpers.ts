import { vi } from "vitest";
import { BusinessImpactDetails } from "../types/cia-services";

/**
 * Creates a mock BusinessImpactDetails object for testing
 */
export function createMockBusinessImpact(
  overrides: Partial<BusinessImpactDetails> = {}
): BusinessImpactDetails {
  return {
    summary: "Test business impact summary",
    financial: {
      description: "Test financial impact",
      riskLevel: "Medium",
      ...overrides.financial,
    },
    operational: {
      description: "Test operational impact",
      riskLevel: "Low",
      ...overrides.operational,
    },
    ...overrides,
  };
}

/**
 * Creates mock CIA options for testing
 */
export function createMockCIAOptions() {
  const mockOptions = {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5, opex: 2 },
    Moderate: { capex: 10, opex: 5 },
    High: { capex: 15, opex: 8 },
    "Very High": { capex: 20, opex: 10 },
  };

  return {
    availabilityOptions: { ...mockOptions },
    integrityOptions: { ...mockOptions },
    confidentialityOptions: { ...mockOptions },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%" },
      LOW: { returnRate: "100%" },
      MODERATE: { returnRate: "200%" },
      HIGH: { returnRate: "350%" },
      VERY_HIGH: { returnRate: "500%" },
    },
  };
}

/**
 * Type guard test helper that creates assertion functions for common tests
 */
export const createTypeGuardTests = <T extends object>(
  guardFunction: (val: unknown) => boolean,
  validExample: T,
  invalidKeys: (keyof T)[]
) => {
  return {
    testValidObject: () => {
      expect(guardFunction(validExample)).toBe(true);
    },
    testInvalidObjects: () => {
      // Test each missing required key
      invalidKeys.forEach((key) => {
        const invalidObj = { ...validExample };
        delete invalidObj[key];
        expect(guardFunction(invalidObj)).toBe(false);
      });

      // Test null and undefined
      expect(guardFunction(null)).toBe(false);
      expect(guardFunction(undefined)).toBe(false);
    },
  };
};

/**
 * Creates a mock for Chart.js to be used in tests
 */
export function setupChartJsMock() {
  const mockChartInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
  };

  // Define a proper type for MockChart that includes the register property
  type MockChartFunction = ReturnType<typeof vi.fn> & {
    register: ReturnType<typeof vi.fn>;
  };

  // Cast the mock function to the appropriate type
  const MockChart = vi.fn(() => mockChartInstance) as MockChartFunction;
  MockChart.register = vi.fn();

  return { MockChart, mockChartInstance };
}
