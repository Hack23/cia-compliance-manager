import { describe, expect, it } from "vitest";
import {
  DEFAULT_COST_PARAMS,
  ORGANIZATION_SIZE_MULTIPLIERS,
  INDUSTRY_COST_FACTORS,
  BASE_IMPLEMENTATION_COSTS,
  COST_DISTRIBUTION,
  CURRENCY_OPTIONS,
  IMPLEMENTATION_TIMEFRAMES,
  ROI_CALCULATION_FACTORS,
  BUDGET_SCALE,
  COST_CATEGORIES,
  COST_COMPONENTS,
  SECURITY_LEVEL_CAPEX,
  SECURITY_LEVEL_OPEX,
  IMPLEMENTATION_TIME,
  RESOURCE_SCALE,
  CALCULATION_CONSTANTS,
  formatCurrency,
  formatPercentage,
  calculateTotalCapex,
  calculateTotalOpex,
} from "./costConstants";
import { SecurityLevel } from "../types/cia";

describe("costConstants", () => {
  describe("DEFAULT_COST_PARAMS", () => {
    it("contains all expected default parameters", () => {
      expect(DEFAULT_COST_PARAMS.DEFAULT_ORG_SIZE).toBe("medium");
      expect(DEFAULT_COST_PARAMS.DEFAULT_INDUSTRY).toBe("general");
      expect(DEFAULT_COST_PARAMS.DEFAULT_CURRENCY).toBe("USD");
      expect(DEFAULT_COST_PARAMS.DEFAULT_TIMEFRAME).toBe(6);
    });
  });

  describe("ORGANIZATION_SIZE_MULTIPLIERS", () => {
    it("contains all organization sizes", () => {
      expect(ORGANIZATION_SIZE_MULTIPLIERS.small).toBeDefined();
      expect(ORGANIZATION_SIZE_MULTIPLIERS.medium).toBeDefined();
      expect(ORGANIZATION_SIZE_MULTIPLIERS.large).toBeDefined();
      expect(ORGANIZATION_SIZE_MULTIPLIERS.enterprise).toBeDefined();
    });

    it("has increasing multipliers by size", () => {
      expect(ORGANIZATION_SIZE_MULTIPLIERS.small).toBeLessThan(
        ORGANIZATION_SIZE_MULTIPLIERS.medium
      );
      expect(ORGANIZATION_SIZE_MULTIPLIERS.medium).toBeLessThan(
        ORGANIZATION_SIZE_MULTIPLIERS.large
      );
      expect(ORGANIZATION_SIZE_MULTIPLIERS.large).toBeLessThan(
        ORGANIZATION_SIZE_MULTIPLIERS.enterprise
      );
    });
  });

  describe("INDUSTRY_COST_FACTORS", () => {
    it("contains all expected industries", () => {
      expect(INDUSTRY_COST_FACTORS.healthcare).toBeDefined();
      expect(INDUSTRY_COST_FACTORS.finance).toBeDefined();
      expect(INDUSTRY_COST_FACTORS.government).toBeDefined();
      expect(INDUSTRY_COST_FACTORS.retail).toBeDefined();
      expect(INDUSTRY_COST_FACTORS.technology).toBeDefined();
      expect(INDUSTRY_COST_FACTORS.manufacturing).toBeDefined();
      expect(INDUSTRY_COST_FACTORS.general).toBeDefined();
    });

    it("has numeric values for all industries", () => {
      Object.values(INDUSTRY_COST_FACTORS).forEach((factor) => {
        expect(typeof factor).toBe("number");
        expect(factor).toBeGreaterThan(0);
      });
    });
  });

  describe("BASE_IMPLEMENTATION_COSTS", () => {
    it("contains costs for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(BASE_IMPLEMENTATION_COSTS[level]).toBeDefined();
        expect(BASE_IMPLEMENTATION_COSTS[level].capex).toBeDefined();
        expect(BASE_IMPLEMENTATION_COSTS[level].opex).toBeDefined();
        expect(BASE_IMPLEMENTATION_COSTS[level].fte).toBeDefined();
      });
    });

    it("has increasing costs by security level", () => {
      expect(BASE_IMPLEMENTATION_COSTS.None.capex).toBeLessThan(
        BASE_IMPLEMENTATION_COSTS.Low.capex
      );
      expect(BASE_IMPLEMENTATION_COSTS.Low.capex).toBeLessThan(
        BASE_IMPLEMENTATION_COSTS.Moderate.capex
      );
      expect(BASE_IMPLEMENTATION_COSTS.Moderate.capex).toBeLessThan(
        BASE_IMPLEMENTATION_COSTS.High.capex
      );
      expect(BASE_IMPLEMENTATION_COSTS.High.capex).toBeLessThan(
        BASE_IMPLEMENTATION_COSTS["Very High"].capex
      );
    });
  });

  describe("COST_DISTRIBUTION", () => {
    it("contains distribution for all CIA components", () => {
      expect(COST_DISTRIBUTION.availability).toBeDefined();
      expect(COST_DISTRIBUTION.integrity).toBeDefined();
      expect(COST_DISTRIBUTION.confidentiality).toBeDefined();
    });

    it("has valid distribution percentages", () => {
      const availability = COST_DISTRIBUTION.availability;
      const total = availability.infrastructure + availability.software + availability.personnel;
      expect(total).toBe(100);
    });
  });

  describe("CURRENCY_OPTIONS", () => {
    it("contains all major currencies", () => {
      expect(CURRENCY_OPTIONS.USD).toBeDefined();
      expect(CURRENCY_OPTIONS.EUR).toBeDefined();
      expect(CURRENCY_OPTIONS.GBP).toBeDefined();
      expect(CURRENCY_OPTIONS.JPY).toBeDefined();
    });

    it("has valid currency format structure", () => {
      const usd = CURRENCY_OPTIONS.USD;
      expect(usd.symbol).toBe("$");
      expect(usd.locale).toBe("en-US");
    });
  });

  describe("IMPLEMENTATION_TIMEFRAMES", () => {
    it("contains timeframes for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(IMPLEMENTATION_TIMEFRAMES[level]).toBeDefined();
        expect(typeof IMPLEMENTATION_TIMEFRAMES[level]).toBe("number");
      });
    });

    it("has increasing timeframes by security level", () => {
      expect(IMPLEMENTATION_TIMEFRAMES.None).toBeLessThanOrEqual(
        IMPLEMENTATION_TIMEFRAMES.Low
      );
      expect(IMPLEMENTATION_TIMEFRAMES.Low).toBeLessThan(
        IMPLEMENTATION_TIMEFRAMES.Moderate
      );
      expect(IMPLEMENTATION_TIMEFRAMES.Moderate).toBeLessThan(
        IMPLEMENTATION_TIMEFRAMES.High
      );
    });
  });

  describe("ROI_CALCULATION_FACTORS", () => {
    it("contains breach probability reduction for all levels", () => {
      const reduction = ROI_CALCULATION_FACTORS.breachProbabilityReduction;
      
      expect(reduction.None).toBeDefined();
      expect(reduction.Low).toBeDefined();
      expect(reduction.Moderate).toBeDefined();
      expect(reduction.High).toBeDefined();
      expect(reduction["Very High"]).toBeDefined();
    });

    it("contains average breach costs for all organization sizes", () => {
      const costs = ROI_CALCULATION_FACTORS.averageBreachCosts;
      
      expect(costs.small).toBeDefined();
      expect(costs.medium).toBeDefined();
      expect(costs.large).toBeDefined();
      expect(costs.enterprise).toBeDefined();
    });
  });

  describe("BUDGET_SCALE", () => {
    it("contains all budget sizes", () => {
      expect(BUDGET_SCALE.SMALL).toBeDefined();
      expect(BUDGET_SCALE.MEDIUM).toBeDefined();
      expect(BUDGET_SCALE.LARGE).toBeDefined();
      expect(BUDGET_SCALE.ENTERPRISE).toBeDefined();
    });
  });

  describe("COST_CATEGORIES", () => {
    it("contains all cost category labels", () => {
      expect(COST_CATEGORIES.CAPEX).toBe("Capital Expenditure");
      expect(COST_CATEGORIES.OPEX).toBe("Operational Expenditure");
      expect(COST_CATEGORIES.TOTAL).toBe("Total Cost of Ownership");
      expect(COST_CATEGORIES.ROI).toBe("Return on Investment");
    });
  });

  describe("COST_COMPONENTS", () => {
    it("contains all expected cost components", () => {
      expect(COST_COMPONENTS.HARDWARE).toBeDefined();
      expect(COST_COMPONENTS.SOFTWARE).toBeDefined();
      expect(COST_COMPONENTS.SERVICES).toBeDefined();
      expect(COST_COMPONENTS.LICENSING).toBeDefined();
      expect(COST_COMPONENTS.TRAINING).toBeDefined();
      expect(COST_COMPONENTS.MAINTENANCE).toBeDefined();
      expect(COST_COMPONENTS.SUPPORT).toBeDefined();
      expect(COST_COMPONENTS.STAFFING).toBeDefined();
      expect(COST_COMPONENTS.OVERHEAD).toBeDefined();
    });
  });

  describe("SECURITY_LEVEL_CAPEX", () => {
    it("contains CAPEX for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(SECURITY_LEVEL_CAPEX[level]).toBeDefined();
        expect(typeof SECURITY_LEVEL_CAPEX[level]).toBe("number");
      });
    });

    it("has increasing CAPEX by security level", () => {
      expect(SECURITY_LEVEL_CAPEX.None).toBeLessThan(SECURITY_LEVEL_CAPEX.Low);
      expect(SECURITY_LEVEL_CAPEX.Low).toBeLessThan(SECURITY_LEVEL_CAPEX.Moderate);
      expect(SECURITY_LEVEL_CAPEX.Moderate).toBeLessThan(SECURITY_LEVEL_CAPEX.High);
      expect(SECURITY_LEVEL_CAPEX.High).toBeLessThan(SECURITY_LEVEL_CAPEX["Very High"]);
    });
  });

  describe("SECURITY_LEVEL_OPEX", () => {
    it("contains OPEX for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(SECURITY_LEVEL_OPEX[level]).toBeDefined();
        expect(typeof SECURITY_LEVEL_OPEX[level]).toBe("number");
      });
    });

    it("has increasing OPEX by security level", () => {
      expect(SECURITY_LEVEL_OPEX.None).toBeLessThan(SECURITY_LEVEL_OPEX.Low);
      expect(SECURITY_LEVEL_OPEX.Low).toBeLessThan(SECURITY_LEVEL_OPEX.Moderate);
      expect(SECURITY_LEVEL_OPEX.Moderate).toBeLessThan(SECURITY_LEVEL_OPEX.High);
      expect(SECURITY_LEVEL_OPEX.High).toBeLessThan(SECURITY_LEVEL_OPEX["Very High"]);
    });
  });

  describe("IMPLEMENTATION_TIME", () => {
    it("contains implementation time for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(IMPLEMENTATION_TIME[level]).toBeDefined();
        expect(typeof IMPLEMENTATION_TIME[level]).toBe("number");
      });
    });
  });

  describe("RESOURCE_SCALE", () => {
    it("contains resource scale for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(RESOURCE_SCALE[level]).toBeDefined();
        expect(typeof RESOURCE_SCALE[level]).toBe("number");
      });
    });
  });

  describe("CALCULATION_CONSTANTS", () => {
    it("contains all expected calculation constants", () => {
      expect(CALCULATION_CONSTANTS.MONTHS_PER_YEAR).toBe(12);
      expect(CALCULATION_CONSTANTS.STANDARD_TCO_YEARS).toBe(3);
      expect(CALCULATION_CONSTANTS.BASE_COST_UNIT).toBe(5000);
      expect(CALCULATION_CONSTANTS.ROI_TIMEFRAME_YEARS).toBe(5);
    });
  });

  describe("formatCurrency", () => {
    it("formats USD currency correctly", () => {
      const formatted = formatCurrency(1000);
      expect(formatted).toContain("$");
      expect(formatted).toContain("1,000");
    });

    it("formats different currencies correctly", () => {
      const usd = formatCurrency(1000, "USD");
      expect(usd).toContain("$");
      
      const eur = formatCurrency(1000, "EUR");
      expect(eur).toContain("€");
      
      const gbp = formatCurrency(1000, "GBP");
      expect(gbp).toContain("£");
    });

    it("handles zero amount", () => {
      const formatted = formatCurrency(0);
      expect(formatted).toContain("$");
      expect(formatted).toContain("0");
    });

    it("handles large amounts", () => {
      const formatted = formatCurrency(1000000);
      expect(formatted).toContain("$");
      expect(formatted).toContain("1,000,000");
    });

    it("handles decimal amounts by rounding", () => {
      const formatted = formatCurrency(1234.56);
      expect(formatted).toContain("$");
      // Should be rounded to nearest dollar
      expect(formatted).toContain("1,235");
    });

    it("rounds down correctly at .49 boundary", () => {
      const formatted = formatCurrency(1234.49);
      expect(formatted).toContain("$");
      expect(formatted).toContain("1,234");
    });

    it("rounds up correctly at .50 boundary", () => {
      const formatted = formatCurrency(1234.50);
      expect(formatted).toContain("$");
      expect(formatted).toContain("1,235");
    });

    it("uses default USD when no currency specified", () => {
      const formatted = formatCurrency(500);
      expect(formatted).toContain("$");
    });
  });

  describe("formatPercentage", () => {
    it("formats percentages correctly", () => {
      expect(formatPercentage(50)).toBe("50%");
      expect(formatPercentage(100)).toBe("100%");
      expect(formatPercentage(0)).toBe("0%");
    });

    it("rounds decimal percentages", () => {
      expect(formatPercentage(50.5)).toBe("51%");
      expect(formatPercentage(50.4)).toBe("50%");
      expect(formatPercentage(99.9)).toBe("100%");
    });

    it("handles negative percentages", () => {
      const formatted = formatPercentage(-10);
      expect(formatted).toContain("-10%");
    });

    it("handles very small percentages", () => {
      expect(formatPercentage(0.1)).toBe("0%");
      expect(formatPercentage(0.9)).toBe("1%");
    });
  });

  describe("calculateTotalCapex", () => {
    it("calculates total CAPEX for all levels", () => {
      const total = calculateTotalCapex("Low", "Moderate", "High");
      expect(total).toBe(
        SECURITY_LEVEL_CAPEX.Low +
        SECURITY_LEVEL_CAPEX.Moderate +
        SECURITY_LEVEL_CAPEX.High
      );
    });

    it("returns zero for all None levels", () => {
      const total = calculateTotalCapex("None", "None", "None");
      expect(total).toBe(0);
    });

    it("handles mixed security levels", () => {
      const total = calculateTotalCapex("None", "Low", "Very High");
      expect(total).toBe(
        SECURITY_LEVEL_CAPEX.None +
        SECURITY_LEVEL_CAPEX.Low +
        SECURITY_LEVEL_CAPEX["Very High"]
      );
    });

    it("calculates correctly for all high levels", () => {
      const total = calculateTotalCapex("Very High", "Very High", "Very High");
      expect(total).toBe(SECURITY_LEVEL_CAPEX["Very High"] * 3);
    });
  });

  describe("calculateTotalOpex", () => {
    it("calculates total OPEX for all levels", () => {
      const total = calculateTotalOpex("Low", "Moderate", "High");
      expect(total).toBe(
        SECURITY_LEVEL_OPEX.Low +
        SECURITY_LEVEL_OPEX.Moderate +
        SECURITY_LEVEL_OPEX.High
      );
    });

    it("returns zero for all None levels", () => {
      const total = calculateTotalOpex("None", "None", "None");
      expect(total).toBe(0);
    });

    it("handles mixed security levels", () => {
      const total = calculateTotalOpex("None", "Low", "Very High");
      expect(total).toBe(
        SECURITY_LEVEL_OPEX.None +
        SECURITY_LEVEL_OPEX.Low +
        SECURITY_LEVEL_OPEX["Very High"]
      );
    });

    it("calculates correctly for all high levels", () => {
      const total = calculateTotalOpex("Very High", "Very High", "Very High");
      expect(total).toBe(SECURITY_LEVEL_OPEX["Very High"] * 3);
    });

    it("handles asymmetric security levels", () => {
      const total = calculateTotalOpex("High", "Low", "Moderate");
      expect(total).toBe(
        SECURITY_LEVEL_OPEX.High +
        SECURITY_LEVEL_OPEX.Low +
        SECURITY_LEVEL_OPEX.Moderate
      );
    });
  });
});
