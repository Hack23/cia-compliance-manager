/**
 * Cost Calculation Utilities Tests
 *
 * Tests for all cost calculation utility functions
 * to ensure proper cost calculations across different scenarios.
 */
import { describe, expect, it } from "vitest";
import type { SecurityLevel } from "../types/cia";
import {
  calculateImplementationCost,
  calculateSecurityROI,
  calculateTotalSecurityCost,
  getRecommendedBudgetAllocation,
} from "./costCalculationUtils";

// Add missing Industry type import or definition
type _Industry =
  | "general"
  | "financial"
  | "healthcare"
  | "government"
  | "retail"
  | "technology"
  | "manufacturing";

describe("Cost Calculation Utilities", () => {
  describe("calculateImplementationCost", () => {
    it("should return correct costs for each security level", () => {
      // Test each security level with default parameters
      const noneCost = calculateImplementationCost("None");
      const lowCost = calculateImplementationCost("Low");
      const moderateCost = calculateImplementationCost("Moderate");
      const highCost = calculateImplementationCost("High");
      const veryHighCost = calculateImplementationCost("Very High");

      // Assertions for defaults (medium org size, general industry)
      expect(noneCost).toEqual({ capex: 0, opex: 0 });
      expect(lowCost).toEqual({ capex: 5000, opex: 2000 });
      expect(moderateCost).toEqual({ capex: 15000, opex: 5000 });
      expect(highCost).toEqual({ capex: 50000, opex: 15000 });
      expect(veryHighCost).toEqual({ capex: 200000, opex: 50000 });
    });

    it("should adjust costs based on organization size", () => {
      const level: SecurityLevel = "Moderate";

      const smallOrgCost = calculateImplementationCost(level, "small");
      const mediumOrgCost = calculateImplementationCost(level, "medium");
      const largeOrgCost = calculateImplementationCost(level, "large");
      const enterpriseOrgCost = calculateImplementationCost(
        level,
        "enterprise",
      );

      // Check scale factors are applied correctly
      expect(smallOrgCost.capex).toBeLessThan(mediumOrgCost.capex);
      expect(largeOrgCost.capex).toBeGreaterThan(mediumOrgCost.capex);
      expect(enterpriseOrgCost.capex).toBeGreaterThan(largeOrgCost.capex);

      // Check specific values
      expect(smallOrgCost).toEqual({ capex: 7500, opex: 2500 }); // 0.5x
      expect(mediumOrgCost).toEqual({ capex: 15000, opex: 5000 }); // 1.0x
      expect(largeOrgCost).toEqual({ capex: 37500, opex: 12500 }); // 2.5x
      expect(enterpriseOrgCost).toEqual({ capex: 75000, opex: 25000 }); // 5.0x
    });

    it("should adjust costs based on industry type", () => {
      const level: SecurityLevel = "Moderate";

      const generalCost = calculateImplementationCost(
        level,
        "medium",
        "general",
      );
      const financialCost = calculateImplementationCost(
        level,
        "medium",
        "financial",
      );
      const healthcareCost = calculateImplementationCost(
        level,
        "medium",
        "healthcare",
      );

      // Check industry factors are applied correctly
      expect(financialCost.capex).toBeGreaterThan(generalCost.capex);
      expect(healthcareCost.capex).toBeGreaterThan(generalCost.capex);

      // Check specific values
      expect(generalCost).toEqual({ capex: 15000, opex: 5000 }); // 1.0x
      expect(financialCost).toEqual({ capex: 22500, opex: 7500 }); // 1.5x
      expect(healthcareCost).toEqual({ capex: 25500, opex: 8500 }); // 1.7x
    });

    it("should handle invalid or undefined inputs gracefully", () => {
      // Cast to any to bypass TypeScript checking for testing invalid inputs
      const nullLevelCost = calculateImplementationCost(
        null as unknown as SecurityLevel,
      );
      const undefinedLevelCost = calculateImplementationCost(
        undefined as unknown as SecurityLevel,
      );
      const invalidLevelCost = calculateImplementationCost(
        "Invalid" as unknown as SecurityLevel,
      );
      // Test with valid security level but invalid org size
      const invalidOrgSize = calculateImplementationCost(
        "Moderate",
        "invalid" as "medium",
      );
      // Test with valid security level and org size but invalid industry
      const invalidIndustry = calculateImplementationCost(
        "Moderate",
        "medium",
        "invalid" as "general", // Cast to valid type to bypass type checking for testing
      );

      // All should default gracefully
      expect(nullLevelCost).toEqual({ capex: 0, opex: 0 }); // Default to None
      expect(undefinedLevelCost).toEqual({ capex: 0, opex: 0 }); // Default to None
      expect(invalidLevelCost).toEqual({ capex: 0, opex: 0 }); // Default to None
      expect(invalidOrgSize).toEqual({ capex: 15000, opex: 5000 }); // Default to medium
      expect(invalidIndustry).toEqual({ capex: 15000, opex: 5000 }); // Default to general
    });

    it("should normalize security level case variations", () => {
      // Type assertion to string to test case insensitivity features
      expect(calculateImplementationCost("low" as SecurityLevel)).toEqual(
        calculateImplementationCost("Low"),
      );
      expect(calculateImplementationCost("MODERATE" as SecurityLevel)).toEqual(
        calculateImplementationCost("Moderate"),
      );
      expect(calculateImplementationCost("high" as SecurityLevel)).toEqual(
        calculateImplementationCost("High"),
      );
      expect(calculateImplementationCost("very high" as SecurityLevel)).toEqual(
        calculateImplementationCost("Very High"),
      );
      expect(
        calculateImplementationCost("very   high" as SecurityLevel),
      ).toEqual(calculateImplementationCost("Very High"));
    });

    // Replace invalid security levels with proper ones
    it("handles different security levels", () => {
      // Update assertions to match what calculateImplementationCost actually returns
      const lowResult = calculateImplementationCost("Low");
      expect(lowResult).toHaveProperty("capex");
      expect(lowResult).toHaveProperty("opex");
      expect(lowResult.capex + lowResult.opex).toBeGreaterThan(0);

      const moderateResult = calculateImplementationCost("Moderate");
      expect(moderateResult).toHaveProperty("capex");
      expect(moderateResult).toHaveProperty("opex");

      const highResult = calculateImplementationCost("High");
      expect(highResult).toHaveProperty("capex");
      expect(highResult).toHaveProperty("opex");

      const veryHighResult = calculateImplementationCost("Very High");
      expect(veryHighResult).toHaveProperty("capex");
      expect(veryHighResult).toHaveProperty("opex");
    });

    // For the invalid industry test, use proper type handling
    it("falls back to default industry for invalid inputs", () => {
      // Use type assertion to any to test invalid inputs
      const result = calculateImplementationCost(
        "Moderate",
        "medium",
        "invalid" as any, // Cast to any to bypass type checking for testing
      );

      // Test with properties that actually exist
      expect(result).toHaveProperty("capex");
      expect(result).toHaveProperty("opex");
      expect(result.capex + result.opex).toBeGreaterThan(0);
    });
  });

  describe("calculateTotalSecurityCost", () => {
    it("should calculate total costs across all security components", () => {
      const result = calculateTotalSecurityCost("Low", "Moderate", "High");

      // Check component costs
      expect(result.availabilityCost).toEqual({ capex: 5000, opex: 2000 });
      expect(result.integrityCost).toEqual({ capex: 15000, opex: 5000 });
      expect(result.confidentialityCost).toEqual({ capex: 50000, opex: 15000 });

      // Check totals
      expect(result.totalCapex).toBe(70000); // 5000 + 15000 + 50000
      expect(result.totalOpex).toBe(22000); // 2000 + 5000 + 15000
      expect(result.totalCost).toBe(92000); // 70000 + 22000
    });

    it("should handle all components at same level", () => {
      const result = calculateTotalSecurityCost(
        "Moderate",
        "Moderate",
        "Moderate",
      );

      // All components should have same costs
      expect(result.availabilityCost).toEqual({ capex: 15000, opex: 5000 });
      expect(result.integrityCost).toEqual({ capex: 15000, opex: 5000 });
      expect(result.confidentialityCost).toEqual({ capex: 15000, opex: 5000 });

      // Check totals
      expect(result.totalCapex).toBe(45000); // 15000 × 3
      expect(result.totalOpex).toBe(15000); // 5000 × 3
      expect(result.totalCost).toBe(60000); // 45000 + 15000
    });

    it("should apply organization size and industry factors to all components", () => {
      // Test with enterprise size and financial industry
      const result = calculateTotalSecurityCost(
        "Low",
        "Low",
        "Low",
        "enterprise",
        "financial",
      );

      // Calculate expected values (5000 capex × 5.0 size × 1.5 industry = 37500)
      const expectedCapex = 5000 * 5.0 * 1.5;
      const expectedOpex = 2000 * 5.0 * 1.5;

      // Check a single component
      expect(result.availabilityCost.capex).toBe(expectedCapex);
      expect(result.availabilityCost.opex).toBe(expectedOpex);

      // Check totals (3 identical components)
      expect(result.totalCapex).toBe(expectedCapex * 3);
      expect(result.totalOpex).toBe(expectedOpex * 3);
    });

    it("should handle None security levels with zero costs", () => {
      const result = calculateTotalSecurityCost("None", "None", "None");

      // All components should be zero
      expect(result.availabilityCost).toEqual({ capex: 0, opex: 0 });
      expect(result.integrityCost).toEqual({ capex: 0, opex: 0 });
      expect(result.confidentialityCost).toEqual({ capex: 0, opex: 0 });

      // Check totals
      expect(result.totalCapex).toBe(0);
      expect(result.totalOpex).toBe(0);
      expect(result.totalCost).toBe(0);
    });
  });

  describe("calculateSecurityROI", () => {
    it("should calculate correct ROI metrics", () => {
      const result = calculateSecurityROI(100000, 50, 500000, 3);

      // Annual cost avoidance: 500000 × 0.5 = 250000
      // Total cost avoidance over 3 years: 250000 × 3 = 750000
      // ROI: (750000 - 100000) / 100000 = 6.5
      // ROI percentage: 650%
      // Payback period: (100000 / 250000) × 12 = 4.8 months

      expect(result.roi).toBe(6.5);
      expect(result.roiPercentage).toBe("650%");
      expect(result.paybackPeriodMonths).toBe(4.8);
      expect(result.costAvoidance).toBe(750000);
    });

    it("should use default timeframe of 3 years when not specified", () => {
      const result = calculateSecurityROI(100000, 50, 500000);

      // Same as above test, default timeframe is 3
      expect(result.costAvoidance).toBe(750000); // 250000 × 3
    });

    it("should handle zero security cost edge case", () => {
      const result = calculateSecurityROI(0, 50, 500000, 3);

      // ROI calculation would divide by zero, so expect Infinity
      expect(result.roi).toBe(Infinity);
      expect(result.roiPercentage).toBe("Infinity%");
      expect(result.paybackPeriodMonths).toBe(0);
      expect(result.costAvoidance).toBe(750000);
    });

    it("should handle zero risk reduction edge case", () => {
      const result = calculateSecurityROI(100000, 0, 500000, 3);

      // No risk reduction means no cost avoidance
      expect(result.roi).toBe(-1); // (0 - 100000) / 100000 = -1
      expect(result.roiPercentage).toBe("-100%");
      // Payback period would be infinity, but calculation gives a very large number
      expect(result.paybackPeriodMonths).toBe(Infinity);
      expect(result.costAvoidance).toBe(0);
    });

    it("should handle large values without overflow", () => {
      const result = calculateSecurityROI(1000000, 75, 10000000, 5);

      // Annual cost avoidance: 10000000 × 0.75 = 7500000
      // Total over 5 years: 7500000 × 5 = 37500000
      // ROI: (37500000 - 1000000) / 1000000 = 36.5

      expect(result.roi).toBe(36.5);
      expect(result.roiPercentage).toBe("3650%");
      expect(result.paybackPeriodMonths).toBe(1.6); // (1000000 / 7500000) × 12 = 1.6
      expect(result.costAvoidance).toBe(37500000);
    });
  });

  describe("getRecommendedBudgetAllocation", () => {
    it("should allocate budget proportionally based on security levels", () => {
      const totalBudget = 300000;
      const result = getRecommendedBudgetAllocation(
        totalBudget,
        "Low", // Value 1
        "Moderate", // Value 2
        "High", // Value 3
      );

      // Total value: 1 + 2 + 3 = 6
      // Availability: 1/6 × 300000 = 50000
      // Integrity: 2/6 × 300000 = 100000
      // Confidentiality: 3/6 × 300000 = 150000

      expect(result.availability).toBe(50000);
      expect(result.integrity).toBe(100000);
      expect(result.confidentiality).toBe(150000);
      expect(
        result.availability + result.integrity + result.confidentiality,
      ).toBe(totalBudget);
    });

    it("should handle equal security levels", () => {
      const totalBudget = 300000;
      const result = getRecommendedBudgetAllocation(
        totalBudget,
        "Moderate", // Value 2
        "Moderate", // Value 2
        "Moderate", // Value 2
      );

      // All equal, so should split evenly
      expect(result.availability).toBe(100000);
      expect(result.integrity).toBe(100000);
      expect(result.confidentiality).toBe(100000);
      expect(
        result.availability + result.integrity + result.confidentiality,
      ).toBe(totalBudget);
    });

    it("should handle all None security levels", () => {
      const totalBudget = 300000;
      const result = getRecommendedBudgetAllocation(
        totalBudget,
        "None", // Value 0
        "None", // Value 0
        "None", // Value 0
      );

      // All None (0), so should split evenly
      expect(result.availability).toBe(100000);
      expect(result.integrity).toBe(100000);
      expect(result.confidentiality).toBe(100000);
    });

    it("should handle zero budget edge case", () => {
      const result = getRecommendedBudgetAllocation(
        0,
        "Low",
        "Moderate",
        "High",
      );

      // Zero budget means zero allocation
      expect(result.availability).toBe(0);
      expect(result.integrity).toBe(0);
      expect(result.confidentiality).toBe(0);
    });

    it("should round to nearest integer", () => {
      // Use a budget that's not evenly divisible
      const result = getRecommendedBudgetAllocation(
        100,
        "Low", // Value 1
        "Moderate", // Value 2
        "High", // Value 3
      );

      // Total value: 1 + 2 + 3 = 6
      // Availability: 1/6 × 100 ≈ 16.67...
      // Integrity: 2/6 × 100 ≈ 33.33...
      // Confidentiality: 3/6 × 100 = 50

      // Check they're rounded integers
      expect(Number.isInteger(result.availability)).toBe(true);
      expect(Number.isInteger(result.integrity)).toBe(true);
      expect(Number.isInteger(result.confidentiality)).toBe(true);

      // Check they roughly add up to total budget
      expect(
        result.availability + result.integrity + result.confidentiality,
      ).toBeCloseTo(100, 0);
    });
  });
});
