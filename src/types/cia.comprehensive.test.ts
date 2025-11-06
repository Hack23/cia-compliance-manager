/**
 * Comprehensive tests for CIA types module
 * Testing all exported functions with edge cases and integration scenarios
 */

import { describe, expect, it } from "vitest";
import {
  calculateOverallSecurityLevel,
  calculateRiskLevel,
  formatSecurityLevel,
  getSecurityLevelFromValue,
  getSecurityLevelValue,
  isSecurityLevel,
  SecurityLevel,
} from "./cia";

describe("CIA Types - Comprehensive Coverage", () => {
  describe("isSecurityLevel", () => {
    it("should validate all valid security levels", () => {
      expect(isSecurityLevel("None")).toBe(true);
      expect(isSecurityLevel("Low")).toBe(true);
      expect(isSecurityLevel("Moderate")).toBe(true);
      expect(isSecurityLevel("High")).toBe(true);
      expect(isSecurityLevel("Very High")).toBe(true);
    });

    it("should reject non-string values", () => {
      expect(isSecurityLevel(null)).toBe(false);
      expect(isSecurityLevel(undefined)).toBe(false);
      expect(isSecurityLevel(123)).toBe(false);
      expect(isSecurityLevel({})).toBe(false);
      expect(isSecurityLevel([])).toBe(false);
      expect(isSecurityLevel(true)).toBe(false);
    });

    it("should reject invalid string values", () => {
      expect(isSecurityLevel("")).toBe(false);
      expect(isSecurityLevel("invalid")).toBe(false);
      expect(isSecurityLevel("medium")).toBe(false);
      expect(isSecurityLevel("NONE")).toBe(false);
      expect(isSecurityLevel("very high")).toBe(false); // case sensitive
    });
  });

  describe("formatSecurityLevel", () => {
    it("should format lowercase inputs correctly", () => {
      expect(formatSecurityLevel("none")).toBe("None");
      expect(formatSecurityLevel("low")).toBe("Low");
      expect(formatSecurityLevel("moderate")).toBe("Moderate");
      expect(formatSecurityLevel("high")).toBe("High");
      expect(formatSecurityLevel("very high")).toBe("Very High");
    });

    it("should format uppercase inputs correctly", () => {
      expect(formatSecurityLevel("NONE")).toBe("None");
      expect(formatSecurityLevel("LOW")).toBe("Low");
      expect(formatSecurityLevel("MODERATE")).toBe("Moderate");
      expect(formatSecurityLevel("HIGH")).toBe("High");
      expect(formatSecurityLevel("VERY HIGH")).toBe("Very High");
    });

    it("should format mixed case inputs correctly", () => {
      expect(formatSecurityLevel("NoNe")).toBe("None");
      expect(formatSecurityLevel("LoW")).toBe("Low");
      expect(formatSecurityLevel("MoDeRaTe")).toBe("Moderate");
      expect(formatSecurityLevel("HiGh")).toBe("High");
      expect(formatSecurityLevel("VeRy HiGh")).toBe("Very High");
    });

    it("should handle undefined and empty inputs", () => {
      expect(formatSecurityLevel(undefined)).toBe("Unknown");
      expect(formatSecurityLevel("")).toBe("Unknown");
    });

    it("should handle invalid inputs", () => {
      expect(formatSecurityLevel("invalid")).toBe("Unknown");
      expect(formatSecurityLevel("medium")).toBe("Unknown");
      expect(formatSecurityLevel("critical")).toBe("Unknown");
    });
  });

  describe("getSecurityLevelValue", () => {
    it("should convert security levels to correct numeric values", () => {
      expect(getSecurityLevelValue("None")).toBe(0);
      expect(getSecurityLevelValue("Low")).toBe(1);
      expect(getSecurityLevelValue("Moderate")).toBe(2);
      expect(getSecurityLevelValue("High")).toBe(3);
      expect(getSecurityLevelValue("Very High")).toBe(4);
    });

    it("should handle lowercase inputs", () => {
      expect(getSecurityLevelValue("none")).toBe(0);
      expect(getSecurityLevelValue("low")).toBe(1);
      expect(getSecurityLevelValue("moderate")).toBe(2);
      expect(getSecurityLevelValue("high")).toBe(3);
      expect(getSecurityLevelValue("very high")).toBe(4);
    });

    it("should return 0 for invalid inputs", () => {
      expect(getSecurityLevelValue("invalid")).toBe(0);
      expect(getSecurityLevelValue("")).toBe(0);
      expect(getSecurityLevelValue("medium")).toBe(0);
    });

    it("should handle SecurityLevel type inputs", () => {
      const level: SecurityLevel = "High";
      expect(getSecurityLevelValue(level)).toBe(3);
    });
  });

  describe("getSecurityLevelFromValue", () => {
    it("should convert numeric values to correct security levels", () => {
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(1)).toBe("Low");
      expect(getSecurityLevelFromValue(2)).toBe("Moderate");
      expect(getSecurityLevelFromValue(3)).toBe("High");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");
    });

    it("should return None for invalid numeric values", () => {
      expect(getSecurityLevelFromValue(-1)).toBe("None");
      expect(getSecurityLevelFromValue(5)).toBe("None");
      expect(getSecurityLevelFromValue(100)).toBe("None");
      expect(getSecurityLevelFromValue(NaN)).toBe("None");
    });

    it("should handle edge case numeric values", () => {
      expect(getSecurityLevelFromValue(0.5)).toBe("None");
      expect(getSecurityLevelFromValue(3.9)).toBe("None");
    });
  });

  describe("calculateOverallSecurityLevel", () => {
    it("should return Very High when any level is Very High", () => {
      expect(
        calculateOverallSecurityLevel("Very High", "Low", "None")
      ).toBe("Very High");
      expect(
        calculateOverallSecurityLevel("None", "Very High", "Low")
      ).toBe("Very High");
      expect(
        calculateOverallSecurityLevel("Low", "None", "Very High")
      ).toBe("Very High");
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "Very High")
      ).toBe("Very High");
    });

    it("should return High when any level is High and none are Very High", () => {
      expect(
        calculateOverallSecurityLevel("High", "Low", "None")
      ).toBe("High");
      expect(
        calculateOverallSecurityLevel("None", "High", "Low")
      ).toBe("High");
      expect(
        calculateOverallSecurityLevel("Low", "None", "High")
      ).toBe("High");
      expect(
        calculateOverallSecurityLevel("High", "High", "Moderate")
      ).toBe("High");
    });

    it("should return Moderate when any level is Moderate and none are High or Very High", () => {
      expect(
        calculateOverallSecurityLevel("Moderate", "Low", "None")
      ).toBe("Moderate");
      expect(
        calculateOverallSecurityLevel("None", "Moderate", "Low")
      ).toBe("Moderate");
      expect(
        calculateOverallSecurityLevel("Low", "None", "Moderate")
      ).toBe("Moderate");
      expect(
        calculateOverallSecurityLevel("Moderate", "Moderate", "Low")
      ).toBe("Moderate");
    });

    it("should return Low when any level is Low and none are higher", () => {
      expect(
        calculateOverallSecurityLevel("Low", "None", "None")
      ).toBe("Low");
      expect(
        calculateOverallSecurityLevel("None", "Low", "None")
      ).toBe("Low");
      expect(
        calculateOverallSecurityLevel("None", "None", "Low")
      ).toBe("Low");
      expect(
        calculateOverallSecurityLevel("Low", "Low", "Low")
      ).toBe("Low");
    });

    it("should return None when all levels are None", () => {
      expect(
        calculateOverallSecurityLevel("None", "None", "None")
      ).toBe("None");
    });

    it("should handle all possible combinations systematically", () => {
      // Test a comprehensive matrix
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      for (const a of levels) {
        for (const i of levels) {
          for (const c of levels) {
            const result = calculateOverallSecurityLevel(a, i, c);
            expect(isSecurityLevel(result)).toBe(true);
          }
        }
      }
    });
  });

  describe("calculateRiskLevel", () => {
    it("should return CRITICAL for None security level", () => {
      const result = calculateRiskLevel("None", "None", "None");
      expect(result).toBe("Critical");
    });

    it("should return HIGH for Low security level", () => {
      const result = calculateRiskLevel("Low", "None", "None");
      expect(result).toBe("High");
    });

    it("should return MEDIUM for Moderate security level", () => {
      const result = calculateRiskLevel("Moderate", "None", "None");
      expect(result).toBe("Medium");
    });

    it("should return LOW for High security level", () => {
      const result = calculateRiskLevel("High", "None", "None");
      expect(result).toBe("Low");
    });

    it("should return MINIMAL for Very High security level", () => {
      const result = calculateRiskLevel("Very High", "None", "None");
      expect(result).toBe("Minimal");
    });

    it("should calculate risk based on highest security level", () => {
      // Very High takes precedence
      expect(
        calculateRiskLevel("Very High", "Low", "None")
      ).toBe("Minimal");
      
      // High takes precedence when Very High is not present
      expect(
        calculateRiskLevel("High", "Low", "None")
      ).toBe("Low");
      
      // Moderate takes precedence when High and Very High are not present
      expect(
        calculateRiskLevel("Moderate", "Low", "None")
      ).toBe("Medium");
    });

    it("should handle all CIA component combinations", () => {
      // Test various realistic scenarios
      expect(
        calculateRiskLevel("High", "High", "Moderate")
      ).toBe("Low");
      
      expect(
        calculateRiskLevel("Moderate", "Moderate", "Low")
      ).toBe("Medium");
      
      expect(
        calculateRiskLevel("Very High", "High", "High")
      ).toBe("Minimal");
    });
  });

  describe("Integration tests - Full workflow", () => {
    it("should maintain consistency between value conversion and level conversion", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      for (const level of levels) {
        const value = getSecurityLevelValue(level);
        const convertedBack = getSecurityLevelFromValue(value);
        expect(convertedBack).toBe(level);
      }
    });

    it("should maintain consistency between formatting and validation", () => {
      const inputs = ["none", "low", "moderate", "high", "very high"];
      
      for (const input of inputs) {
        const formatted = formatSecurityLevel(input);
        expect(isSecurityLevel(formatted)).toBe(true);
      }
    });

    it("should calculate consistent overall and risk levels", () => {
      const testCases: Array<{
        a: SecurityLevel;
        i: SecurityLevel;
        c: SecurityLevel;
        expectedOverall: SecurityLevel;
        expectedRisk: string;
      }> = [
        { a: "None", i: "None", c: "None", expectedOverall: "None", expectedRisk: "Critical" },
        { a: "Low", i: "Low", c: "Low", expectedOverall: "Low", expectedRisk: "High" },
        { a: "Moderate", i: "Moderate", c: "Moderate", expectedOverall: "Moderate", expectedRisk: "Medium" },
        { a: "High", i: "High", c: "High", expectedOverall: "High", expectedRisk: "Low" },
        { a: "Very High", i: "Very High", c: "Very High", expectedOverall: "Very High", expectedRisk: "Minimal" },
      ];

      for (const testCase of testCases) {
        const overall = calculateOverallSecurityLevel(testCase.a, testCase.i, testCase.c);
        const risk = calculateRiskLevel(testCase.a, testCase.i, testCase.c);
        
        expect(overall).toBe(testCase.expectedOverall);
        expect(risk).toBe(testCase.expectedRisk);
      }
    });
  });

  describe("Edge cases and error handling", () => {
    it("should handle string type coercion gracefully", () => {
      const value = getSecurityLevelValue("High" as any);
      expect(value).toBe(3);
    });

    it("should format and validate consistently", () => {
      const formatted = formatSecurityLevel("VERY HIGH");
      expect(isSecurityLevel(formatted)).toBe(true);
      expect(formatted).toBe("Very High");
    });

    it("should handle boundary numeric values", () => {
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");
      expect(getSecurityLevelFromValue(-100)).toBe("None");
      expect(getSecurityLevelFromValue(1000)).toBe("None");
    });
  });
});
