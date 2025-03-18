import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatLargeNumber,
  formatNumber,
  formatPercentage,
  formatRiskLevel,
  formatTimeframe
} from './formatUtils';

describe('Format Utilities', () => {
  describe('formatCurrency', () => {
    it('formats numbers as currency', () => {
      expect(formatCurrency(1000)).toContain('1,000');
      expect(formatCurrency(1234567)).toContain('1,234,567');
    });

    it('respects currency and locale settings', () => {
      // Since Intl.NumberFormat behavior depends on the runtime environment,
      // we'll test for the presence of currency symbols or codes rather than exact strings
      
      const usdResult = formatCurrency(1000, 'USD');
      expect(usdResult).toMatch(/USD|$|US/);
      
      const eurResult = formatCurrency(1000, 'EUR');
      expect(eurResult).toMatch(/EUR|€/);
      
      // Test that our function doesn't throw for various locales and currencies
      expect(() => formatCurrency(1000, 'USD', 'en-US')).not.toThrow();
      expect(() => formatCurrency(1000, 'EUR', 'de-DE')).not.toThrow();
      expect(() => formatCurrency(1000, 'JPY', 'ja-JP')).not.toThrow();
    });
  });

  describe('formatPercentage', () => {
    it("formats decimal values as percentages", () => {
      expect(formatPercentage(0.75)).toBe("75%");
      expect(formatPercentage(1)).toBe("100%");
      expect(formatPercentage(0)).toBe("0%");
      expect(formatPercentage(0.333, 1)).toBe("33.3%");
    });

    it("handles decimal places correctly", () => {
      expect(formatPercentage(0.5, 0)).toBe("50%");
      expect(formatPercentage(0.5, 1)).toBe("50.0%");
      expect(formatPercentage(0.5, 2)).toBe("50.00%");
    });
  });

  describe("formatDate", () => {
    it("formats dates consistently", () => {
      const testDate = new Date(2023, 0, 15); // January 15, 2023
      const formatted = formatDate(testDate);

      // We can't assert exact string because it depends on the runtime locale
      expect(formatted).toContain("2023");
      expect(formatted).toMatch(/Jan|January/i);
      expect(formatted).toContain("15");
    });

    it("accepts string dates", () => {
      const dateString = "2023-01-15T12:00:00Z";
      const formatted = formatDate(dateString);

      expect(formatted).toContain("2023");
      expect(formatted).toMatch(/Jan|January/i);
      expect(formatted).toContain("15");
    });

    it("accepts custom formatting options", () => {
      const testDate = new Date(2023, 0, 15);
      const formatted = formatDate(testDate, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      expect(formatted).toContain("2023");
      // Should have full month name
      expect(formatted).toMatch(/January/i);
      expect(formatted).toContain("15");
    });
  });

  describe("formatNumber", () => {
    it("formats numbers with specified decimal places", () => {
      expect(formatNumber(10.5678)).toBe("10.57"); // Default 2 decimal places
      expect(formatNumber(10.5, 1)).toBe("10.5");
      expect(formatNumber(10, 0)).toBe("10");
      expect(formatNumber(10.999, 2)).toBe("11.00"); // Rounds correctly
    });
  });

  describe("formatLargeNumber", () => {
    it("abbreviates large numbers", () => {
      expect(formatLargeNumber(1000)).toBe("1.0K");
      expect(formatLargeNumber(1500)).toBe("1.5K");
      expect(formatLargeNumber(1000000)).toBe("1.0M");
      expect(formatLargeNumber(2500000)).toBe("2.5M");
      expect(formatLargeNumber(1000000000)).toBe("1.0B");
      expect(formatLargeNumber(7500000000)).toBe("7.5B");
    });

    it("handles small numbers without abbreviation", () => {
      expect(formatLargeNumber(999)).toBe("999");
      expect(formatLargeNumber(100)).toBe("100");
      expect(formatLargeNumber(0)).toBe("0");
      expect(formatLargeNumber(-500)).toBe("-500");
    });
  });

  describe("formatTimeframe", () => {
    it("formats minutes correctly", () => {
      expect(formatTimeframe(30)).toBe("30 minutes");
      expect(formatTimeframe(1)).toBe("1 minutes");
      expect(formatTimeframe(0)).toBe("0 minutes");
    });

    it("formats hours correctly", () => {
      expect(formatTimeframe(60)).toBe("1 hours");
      expect(formatTimeframe(90)).toBe("1 hours, 30 minutes");
      expect(formatTimeframe(120)).toBe("2 hours");
    });

    it("formats days correctly", () => {
      const day = 24 * 60; // minutes in a day
      expect(formatTimeframe(day)).toBe("1 days");
      expect(formatTimeframe(day + 120)).toBe("1 days, 2 hours");
      expect(formatTimeframe(2 * day)).toBe("2 days");
    });
  });

  describe("formatRiskLevel", () => {
    it("adds appropriate icons to risk levels", () => {
      expect(formatRiskLevel("Critical Risk")).toBe("⚠️ Critical Risk");
      expect(formatRiskLevel("High Risk")).toBe("🔴 High Risk");
      expect(formatRiskLevel("Medium Risk")).toBe("🟠 Medium Risk");
      expect(formatRiskLevel("Moderate Risk")).toBe("🟠 Moderate Risk");
      expect(formatRiskLevel("Low Risk")).toBe("🟡 Low Risk");
      expect(formatRiskLevel("Minimal Risk")).toBe("🟢 Minimal Risk");
      expect(formatRiskLevel("Unknown")).toBe("ℹ️ Unknown");
    });

    it("handles case insensitivity", () => {
      expect(formatRiskLevel("critical")).toBe("⚠️ critical");
      expect(formatRiskLevel("HIGH RISK")).toBe("🔴 HIGH RISK");
    });
  });
});
