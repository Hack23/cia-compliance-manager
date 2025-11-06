/**
 * Comprehensive tests for formatUtils module
 * Testing all formatting functions with edge cases and various input scenarios
 */

import { describe, expect, it } from "vitest";
import {
  formatBudgetPercentage,
  formatCurrency,
  formatCurrencyWithOptions,
  formatDate,
  formatLargeNumber,
  formatNumber,
  formatNumberWithDecimals,
  formatPercentage,
  formatRiskLevel,
  formatSecurityLevel,
  formatTimeframe,
  formatUptime,
  toTitleCase,
} from "./formatUtils";

describe("formatUtils - Comprehensive Coverage", () => {
  describe("toTitleCase", () => {
    it("should convert strings to title case", () => {
      expect(toTitleCase("hello world")).toBe("Hello World");
      expect(toTitleCase("HELLO WORLD")).toBe("Hello World");
      expect(toTitleCase("hELLo WoRLd")).toBe("Hello World");
    });

    it("should handle single words", () => {
      expect(toTitleCase("hello")).toBe("Hello");
      expect(toTitleCase("HELLO")).toBe("Hello");
    });

    it("should handle empty strings", () => {
      expect(toTitleCase("")).toBe("");
    });

    it("should handle special characters", () => {
      // toTitleCase capitalizes words but doesn't split on special chars like - _ .
      expect(toTitleCase("hello-world")).toBe("Hello-world");
      expect(toTitleCase("hello_world")).toBe("Hello_world");
      expect(toTitleCase("hello.world")).toBe("Hello.world");
    });

    it("should preserve spacing", () => {
      expect(toTitleCase("  hello  world  ")).toBe("  Hello  World  ");
    });
  });

  describe("formatPercentage", () => {
    it("should format decimals as percentages with default 0 decimal places", () => {
      expect(formatPercentage(0.5)).toBe("50%");
      expect(formatPercentage(0.75)).toBe("75%");
      expect(formatPercentage(1)).toBe("100%");
      expect(formatPercentage(0)).toBe("0%");
    });

    it("should handle decimal places", () => {
      expect(formatPercentage(0.5555, 2)).toBe("55.55%");
      expect(formatPercentage(0.123456, 3)).toBe("12.346%");
      expect(formatPercentage(0.999, 1)).toBe("99.9%");
    });

    it("should handle edge cases", () => {
      expect(formatPercentage(0, 0)).toBe("0%");
      expect(formatPercentage(1, 0)).toBe("100%");
      expect(formatPercentage(0.001, 2)).toBe("0.10%");
    });

    it("should handle values greater than 1", () => {
      expect(formatPercentage(1.5, 0)).toBe("150%");
      expect(formatPercentage(2, 0)).toBe("200%");
    });

    it("should handle negative values", () => {
      expect(formatPercentage(-0.5, 0)).toBe("-50%");
    });
  });

  describe("formatCurrency", () => {
    it("should format numbers as USD currency by default", () => {
      const result = formatCurrency(1000);
      expect(result).toContain("1,000");
      expect(result).toMatch(/\$|USD/);
    });

    it("should handle zero and negative values", () => {
      const zero = formatCurrency(0);
      expect(zero).toContain("0");
      
      const negative = formatCurrency(-1000);
      expect(negative).toContain("1,000");
    });

    it("should support options object", () => {
      const result = formatCurrency(1000, {
        locale: "en-US",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      expect(result).toMatch(/1,000\.00/);
    });

    it("should support backward compatible string options", () => {
      const result = formatCurrency(1000, "EUR", "de-DE");
      expect(result).toContain("1");
    });

    it("should handle large numbers", () => {
      const result = formatCurrency(1000000);
      expect(result).toContain("1,000,000");
    });

    it("should handle decimal values", () => {
      const result = formatCurrency(1234.56, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      expect(result).toMatch(/1,234\.56/);
    });
  });

  describe("formatCurrencyWithOptions", () => {
    it("should be an alias for formatCurrency", () => {
      expect(formatCurrencyWithOptions).toBe(formatCurrency);
    });

    it("should format with options", () => {
      const result = formatCurrencyWithOptions(1000, {
        locale: "en-US",
        currency: "USD",
      });
      expect(result).toMatch(/1,000/);
    });
  });

  describe("formatSecurityLevel", () => {
    it("should return security level as-is", () => {
      expect(formatSecurityLevel("None")).toBe("None");
      expect(formatSecurityLevel("Low")).toBe("Low");
      expect(formatSecurityLevel("Moderate")).toBe("Moderate");
      expect(formatSecurityLevel("High")).toBe("High");
      expect(formatSecurityLevel("Very High")).toBe("Very High");
    });
  });

  describe("formatRiskLevel", () => {
    it("should add icons to known risk levels", () => {
      expect(formatRiskLevel("Critical Risk")).toContain("⚠️");
      expect(formatRiskLevel("High Risk")).toContain("🔴");
      expect(formatRiskLevel("Medium Risk")).toContain("🟠");
      expect(formatRiskLevel("Low Risk")).toContain("🟡");
      expect(formatRiskLevel("Minimal Risk")).toContain("🟢");
      expect(formatRiskLevel("No Risk")).toContain("✅");
      expect(formatRiskLevel("Unknown Risk")).toContain("❓");
    });

    it("should handle case-insensitive risk levels", () => {
      expect(formatRiskLevel("critical risk")).toContain("⚠️");
      expect(formatRiskLevel("HIGH RISK")).toContain("🔴");
      expect(formatRiskLevel("MeDiUm RiSk")).toContain("🟠");
    });

    it("should use default icon for unknown risk levels", () => {
      expect(formatRiskLevel("Unknown Level")).toContain("❓");
      expect(formatRiskLevel("")).toContain("❓");
    });

    it("should preserve original risk level text", () => {
      expect(formatRiskLevel("Critical Risk")).toContain("Critical Risk");
      expect(formatRiskLevel("High Risk")).toContain("High Risk");
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with locale formatting by default", () => {
      expect(formatNumber(1000)).toBe("1,000");
      expect(formatNumber(1000000)).toBe("1,000,000");
    });

    it("should format with specified decimal places", () => {
      expect(formatNumber(1234.5678, 2)).toBe("1234.57");
      expect(formatNumber(1000, 0)).toBe("1000");
      expect(formatNumber(123.456, 3)).toBe("123.456");
    });

    it("should handle zero and negative values", () => {
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(-1000)).toBe("-1,000");
      expect(formatNumber(-123.45, 2)).toBe("-123.45");
    });

    it("should handle decimal values without specified places", () => {
      const result = formatNumber(1234.56);
      expect(result).toContain("1,234");
    });
  });

  describe("formatNumberWithDecimals", () => {
    it("should format numbers with exact decimal places", () => {
      expect(formatNumberWithDecimals(123.456, 2)).toBe("123.46");
      expect(formatNumberWithDecimals(123, 2)).toBe("123.00");
      expect(formatNumberWithDecimals(123.9, 0)).toBe("124");
    });

    it("should round appropriately", () => {
      expect(formatNumberWithDecimals(1.234, 2)).toBe("1.23");
      expect(formatNumberWithDecimals(1.235, 2)).toBe("1.24");
      expect(formatNumberWithDecimals(1.999, 2)).toBe("2.00");
    });

    it("should handle zero decimal places", () => {
      expect(formatNumberWithDecimals(123.456, 0)).toBe("123");
      expect(formatNumberWithDecimals(123.999, 0)).toBe("124");
    });
  });

  describe("formatBudgetPercentage", () => {
    it("should format CAPEX percentages", () => {
      const result = formatBudgetPercentage(0.15, true);
      expect(result).toContain("15%");
      expect(result).toContain("one-time capital expenditure");
    });

    it("should format OPEX percentages", () => {
      const result = formatBudgetPercentage(0.08, false);
      expect(result).toContain("8%");
      expect(result).toContain("annual operational expenses");
    });

    it("should handle zero and large percentages", () => {
      const zero = formatBudgetPercentage(0, true);
      expect(zero).toContain("0%");
      
      const large = formatBudgetPercentage(1, false);
      expect(large).toContain("100%");
    });
  });

  describe("formatUptime", () => {
    it("should return uptime strings that already have %", () => {
      expect(formatUptime("99.9%")).toBe("99.9%");
      expect(formatUptime("100%")).toBe("100%");
    });

    it("should convert numeric strings to percentages", () => {
      // formatUptime calls formatPercentage with default 0 decimal places
      expect(formatUptime("0.999")).toBe("100%"); // Rounds to 100%
      expect(formatUptime("1")).toBe("100%");
      expect(formatUptime("0.5")).toBe("50%");
    });

    it("should handle non-numeric strings", () => {
      expect(formatUptime("high")).toBe("high");
      expect(formatUptime("N/A")).toBe("N/A");
    });

    it("should handle edge cases", () => {
      expect(formatUptime("0")).toBe("0%");
      expect(formatUptime("")).toBe("");
    });
  });

  describe("formatDate", () => {
    it("should format Date objects", () => {
      const date = new Date("2024-01-15T12:00:00Z");
      const result = formatDate(date);
      expect(result).toMatch(/Jan|January/);
      expect(result).toContain("15");
      expect(result).toContain("2024");
    });

    it("should format date strings", () => {
      const result = formatDate("2024-01-15");
      expect(result).toMatch(/Jan|January/);
      expect(result).toContain("2024");
    });

    it("should accept custom formatting options", () => {
      const date = new Date("2024-01-15T12:00:00Z");
      const result = formatDate(date, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      expect(result).toContain("January");
      expect(result).toContain("2024");
    });

    it("should handle different date formats", () => {
      const date1 = formatDate(new Date("2024-12-31"));
      expect(date1).toContain("2024");
      
      const date2 = formatDate("2024-06-15");
      expect(date2).toContain("2024");
    });
  });

  describe("formatLargeNumber", () => {
    it("should abbreviate billions", () => {
      expect(formatLargeNumber(1000000000)).toBe("1.0B");
      expect(formatLargeNumber(1500000000)).toBe("1.5B");
      expect(formatLargeNumber(10000000000)).toBe("10.0B");
    });

    it("should abbreviate millions", () => {
      expect(formatLargeNumber(1000000)).toBe("1.0M");
      expect(formatLargeNumber(1500000)).toBe("1.5M");
      expect(formatLargeNumber(999000000)).toBe("999.0M");
    });

    it("should abbreviate thousands", () => {
      expect(formatLargeNumber(1000)).toBe("1.0K");
      expect(formatLargeNumber(5500)).toBe("5.5K");
      expect(formatLargeNumber(999000)).toBe("999.0K");
    });

    it("should not abbreviate small numbers", () => {
      expect(formatLargeNumber(999)).toBe("999");
      expect(formatLargeNumber(100)).toBe("100");
      expect(formatLargeNumber(1)).toBe("1");
      expect(formatLargeNumber(0)).toBe("0");
    });

    it("should handle negative values", () => {
      expect(formatLargeNumber(-1000000)).toBe("-1.0M");
      expect(formatLargeNumber(-1000)).toBe("-1.0K");
      expect(formatLargeNumber(-999)).toBe("-999");
    });

    it("should handle edge cases at boundaries", () => {
      expect(formatLargeNumber(999999999)).toBe("1000.0M");
      expect(formatLargeNumber(999999)).toBe("1000.0K");
    });
  });

  describe("formatTimeframe", () => {
    it("should format minutes under 60", () => {
      expect(formatTimeframe(30)).toBe("30 minutes");
      expect(formatTimeframe(1)).toBe("1 minutes");
      expect(formatTimeframe(59)).toBe("59 minutes");
    });

    it("should format hours without remaining minutes", () => {
      expect(formatTimeframe(60)).toBe("1 hours");
      expect(formatTimeframe(120)).toBe("2 hours");
      expect(formatTimeframe(180)).toBe("3 hours");
    });

    it("should format hours with remaining minutes", () => {
      expect(formatTimeframe(90)).toBe("1 hours, 30 minutes");
      expect(formatTimeframe(125)).toBe("2 hours, 5 minutes");
      expect(formatTimeframe(195)).toBe("3 hours, 15 minutes");
    });

    it("should format days without remaining time", () => {
      expect(formatTimeframe(1440)).toBe("1 days");
      expect(formatTimeframe(2880)).toBe("2 days");
    });

    it("should format days with remaining hours", () => {
      expect(formatTimeframe(1500)).toBe("1 days, 1 hours");
      expect(formatTimeframe(1560)).toBe("1 days, 2 hours");
      expect(formatTimeframe(2940)).toBe("2 days, 1 hours");
    });

    it("should handle edge cases", () => {
      expect(formatTimeframe(0)).toBe("0 minutes");
      expect(formatTimeframe(1439)).toBe("23 hours, 59 minutes");
      expect(formatTimeframe(10080)).toBe("7 days");
    });
  });

  describe("Integration tests - Combined formatting", () => {
    it("should format financial data consistently", () => {
      const cost = 125000;
      const formatted = formatCurrency(cost);
      const abbreviated = formatLargeNumber(cost);
      
      expect(formatted).toContain("125,000");
      expect(abbreviated).toBe("125.0K");
    });

    it("should format percentages and uptime consistently", () => {
      const uptimeDecimal = 0.999;
      const percentage = formatPercentage(uptimeDecimal, 1);
      const uptime = formatUptime(uptimeDecimal.toString());
      
      expect(percentage).toBe("99.9%");
      expect(uptime).toBe("100%"); // formatUptime uses 0 decimal places by default
    });

    it("should handle complete business metrics formatting", () => {
      // Simulate formatting a complete business impact scenario
      const implementationCost = 500000;
      const annualSavings = 150000;
      const roi = annualSavings / implementationCost;
      const timeframe = 180; // 3 hours
      
      const costFormatted = formatCurrency(implementationCost);
      const savingsFormatted = formatCurrency(annualSavings);
      const roiFormatted = formatPercentage(roi, 1);
      const timeFormatted = formatTimeframe(timeframe);
      
      expect(costFormatted).toContain("500,000");
      expect(savingsFormatted).toContain("150,000");
      expect(roiFormatted).toBe("30.0%");
      expect(timeFormatted).toBe("3 hours");
    });
  });
});
