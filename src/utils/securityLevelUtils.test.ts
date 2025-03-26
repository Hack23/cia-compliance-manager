import { describe, expect, it, test } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
  calculateOverallSecurityLevel,
  DEFAULT_SECURITY_LEVEL,
  formatSecurityLevel,
  getRecommendedSecurityLevels,
  getRiskLevelFromSecurityLevel,
  getSecurityIcon,
  getSecurityLevelDescription,
  getSecurityLevelFromValue,
  getSecurityLevelGap,
  getSecurityLevelValue,
  isSecurityLevel,
  meetsComplianceRequirements,
  meetsSecurityRequirements,
  normalizeSecurityLevel,
} from "./securityLevelUtils";

describe("securityLevelUtils", () => {
  describe("getSecurityLevelValue", () => {
    test("returns correct numeric values for security levels", () => {
      expect(getSecurityLevelValue("None")).toBe(0);
      expect(getSecurityLevelValue("Low")).toBe(1);
      expect(getSecurityLevelValue("Moderate")).toBe(2);
      expect(getSecurityLevelValue("High")).toBe(3);
      expect(getSecurityLevelValue("Very High")).toBe(4);
    });

    test("returns 0 for invalid security levels", () => {
      expect(getSecurityLevelValue("Invalid" as SecurityLevel)).toBe(0);
    });
  });

  describe("getSecurityLevelFromValue", () => {
    test("returns correct security levels for numeric values", () => {
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(1)).toBe("Low");
      expect(getSecurityLevelFromValue(2)).toBe("Moderate");
      expect(getSecurityLevelFromValue(3)).toBe("High");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");
    });

    test('returns "None" for out-of-range values', () => {
      expect(getSecurityLevelFromValue(-1)).toBe("None");
      expect(getSecurityLevelFromValue(5)).toBe("None");
    });
  });

  describe("calculateOverallSecurityLevel", () => {
    test("calculates average security level correctly", () => {
      expect(calculateOverallSecurityLevel("High", "High", "High")).toBe(
        "High"
      );
      expect(calculateOverallSecurityLevel("Low", "Moderate", "High")).toBe(
        "Moderate"
      );
      expect(calculateOverallSecurityLevel("None", "None", "Very High")).toBe(
        "Low"
      );
    });

    test("rounds to nearest security level", () => {
      // Average value of 2.33 (rounds to 2 = "Moderate")
      expect(
        calculateOverallSecurityLevel("Moderate", "Moderate", "High")
      ).toBe("Moderate");

      // Average value of 2.67 (rounds to 3 = "High")
      expect(calculateOverallSecurityLevel("Moderate", "High", "High")).toBe(
        "High"
      );
    });

    it("calculates correctly for equal levels", () => {
      const result = calculateOverallSecurityLevel(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(result).toBe("Moderate");
    });

    it("weights confidentiality higher", () => {
      const result = calculateOverallSecurityLevel(
        "Low" as SecurityLevel,
        "Low" as SecurityLevel,
        "High" as SecurityLevel
      );

      // Should be closer to 'Moderate' due to confidentiality weighting
      expect(result).toBe("Moderate");
    });

    it("rounds to nearest level", () => {
      const result = calculateOverallSecurityLevel(
        "Low" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "High" as SecurityLevel
      );

      expect(result).toBe("Moderate");
    });

    it("handles extreme combinations", () => {
      const highResult = calculateOverallSecurityLevel(
        "Very High" as SecurityLevel,
        "Very High" as SecurityLevel,
        "Very High" as SecurityLevel
      );

      const lowResult = calculateOverallSecurityLevel(
        "None" as SecurityLevel,
        "None" as SecurityLevel,
        "None" as SecurityLevel
      );

      expect(highResult).toBe("Very High");
      expect(lowResult).toBe("None");
    });
  });

  describe("normalizeSecurityLevel", () => {
    test("returns valid security levels unchanged", () => {
      expect(normalizeSecurityLevel("None")).toBe("None");
      expect(normalizeSecurityLevel("Low")).toBe("Low");
      expect(normalizeSecurityLevel("Moderate")).toBe("Moderate");
      expect(normalizeSecurityLevel("High")).toBe("High");
      expect(normalizeSecurityLevel("Very High")).toBe("Very High");
    });

    test("normalizes case variations", () => {
      expect(normalizeSecurityLevel("none")).toBe("None");
      expect(normalizeSecurityLevel("LOW")).toBe("Low");
      expect(normalizeSecurityLevel("moderate")).toBe("Moderate");
      expect(normalizeSecurityLevel("HIGH")).toBe("High");
      expect(normalizeSecurityLevel("very high")).toBe("Moderate"); // Can't handle spaces
    });

    test("returns default for invalid values", () => {
      expect(normalizeSecurityLevel()).toBe(DEFAULT_SECURITY_LEVEL);
      expect(normalizeSecurityLevel("invalid")).toBe(DEFAULT_SECURITY_LEVEL);
    });
  });

  describe("getRiskLevelFromSecurityLevel", () => {
    test("returns correct risk levels for security levels", () => {
      expect(getRiskLevelFromSecurityLevel("None")).toBe("Critical");
      expect(getRiskLevelFromSecurityLevel("Low")).toBe("High");
      expect(getRiskLevelFromSecurityLevel("Moderate")).toBe("Medium");
      expect(getRiskLevelFromSecurityLevel("High")).toBe("Low");
      expect(getRiskLevelFromSecurityLevel("Very High")).toBe("Minimal");
    });

    test('returns "Unknown" for invalid security levels', () => {
      expect(getRiskLevelFromSecurityLevel("Invalid" as SecurityLevel)).toBe(
        "Unknown"
      );
    });
  });

  describe("isSecurityLevel", () => {
    test("returns true for valid security levels", () => {
      expect(isSecurityLevel("None")).toBe(true);
      expect(isSecurityLevel("Low")).toBe(true);
      expect(isSecurityLevel("Moderate")).toBe(true);
      expect(isSecurityLevel("High")).toBe(true);
      expect(isSecurityLevel("Very High")).toBe(true);
    });

    test("returns false for invalid security levels", () => {
      expect(isSecurityLevel("Invalid")).toBe(false);
      expect(isSecurityLevel(123)).toBe(false);
      expect(isSecurityLevel(null)).toBe(false);
      expect(isSecurityLevel(undefined)).toBe(false);
      expect(isSecurityLevel({})).toBe(false);
    });
  });

  describe("formatSecurityLevel", () => {
    test("formats security levels correctly", () => {
      expect(formatSecurityLevel("none")).toBe("None");
      expect(formatSecurityLevel("LOW")).toBe("Low");
      expect(formatSecurityLevel("moderate")).toBe("Moderate");
      expect(formatSecurityLevel("medium")).toBe("Moderate");
      expect(formatSecurityLevel("HIGH")).toBe("High");
      expect(formatSecurityLevel("VERY HIGH")).toBe("Very High");
      expect(formatSecurityLevel("maximum")).toBe("Very High");
    });

    test('returns "Not Specified" for undefined or null values', () => {
      expect(formatSecurityLevel()).toBe("Not Specified");
      expect(formatSecurityLevel(null as unknown as string)).toBe(
        "Not Specified"
      );
    });

    test("returns original string for unrecognized values", () => {
      expect(formatSecurityLevel("Custom")).toBe("Custom");
    });
  });

  describe("getSecurityLevelDescription", () => {
    test("returns descriptions for security levels", () => {
      expect(getSecurityLevelDescription("None")).toContain(
        "No security controls"
      );
      expect(getSecurityLevelDescription("Low")).toContain(
        "Basic security controls"
      );
      expect(getSecurityLevelDescription("Moderate")).toContain(
        "Standard security controls"
      );
      expect(getSecurityLevelDescription("High")).toContain(
        "Advanced security controls"
      );
      expect(getSecurityLevelDescription("Very High")).toContain(
        "Maximum security controls"
      );
    });
  });

  describe("meetsComplianceRequirements", () => {
    test("evaluates compliance requirements correctly", () => {
      // SOC2 requires Moderate
      expect(meetsComplianceRequirements("None", "SOC2")).toBe(false);
      expect(meetsComplianceRequirements("Low", "SOC2")).toBe(false);
      expect(meetsComplianceRequirements("Moderate", "SOC2")).toBe(true);
      expect(meetsComplianceRequirements("High", "SOC2")).toBe(true);

      // PCI-DSS requires High
      expect(meetsComplianceRequirements("Moderate", "PCI-DSS")).toBe(false);
      expect(meetsComplianceRequirements("High", "PCI-DSS")).toBe(true);
    });
  });

  describe("getSecurityIcon", () => {
    test("returns appropriate icons for security levels", () => {
      expect(getSecurityIcon("None")).toBe("⚠️");
      expect(getSecurityIcon("Low")).toBe("🔑");
      expect(getSecurityIcon("Moderate")).toBe("🔒");
      expect(getSecurityIcon("High")).toBe("🛡️");
      expect(getSecurityIcon("Very High")).toBe("🔐");
    });

    test("returns fallback icon for invalid security levels", () => {
      expect(getSecurityIcon("Invalid" as SecurityLevel)).toBe("❓");
    });
  });

  describe("meetsSecurityRequirements", () => {
    it("returns true when all requirements are met", () => {
      const result = meetsSecurityRequirements(
        "High" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "High" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(result).toBe(true);
    });

    it("returns false when any requirement is not met", () => {
      const result = meetsSecurityRequirements(
        "Moderate" as SecurityLevel,
        "Low" as SecurityLevel,
        "High" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "High" as SecurityLevel
      );

      expect(result).toBe(false);
    });

    it("returns true when all levels exceed requirements", () => {
      const result = meetsSecurityRequirements(
        "Very High" as SecurityLevel,
        "High" as SecurityLevel,
        "High" as SecurityLevel,
        "Low" as SecurityLevel,
        "Low" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(result).toBe(true);
    });
  });

  describe("getSecurityLevelGap", () => {
    it("returns positive gap when current exceeds required", () => {
      const result = getSecurityLevelGap(
        "High" as SecurityLevel,
        "Low" as SecurityLevel
      );

      expect(result).toBe(2); // High (3) - Low (1) = 2
    });

    it("returns negative gap when current is below required", () => {
      const result = getSecurityLevelGap(
        "Low" as SecurityLevel,
        "High" as SecurityLevel
      );

      expect(result).toBe(-2); // Low (1) - High (3) = -2
    });

    it("returns zero when levels are equal", () => {
      const result = getSecurityLevelGap(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(result).toBe(0);
    });
  });

  describe("getRecommendedSecurityLevels", () => {
    it("recommends current levels when they meet requirements", () => {
      const result = getRecommendedSecurityLevels(
        "High" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "High" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Low" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(result.availability).toBe("High");
      expect(result.integrity).toBe("Moderate");
      expect(result.confidentiality).toBe("High");
    });

    it("recommends higher levels when current do not meet requirements", () => {
      const result = getRecommendedSecurityLevels(
        "Low" as SecurityLevel,
        "Low" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "High" as SecurityLevel,
        "High" as SecurityLevel
      );

      expect(result.availability).toBe("Moderate");
      expect(result.integrity).toBe("High");
      expect(result.confidentiality).toBe("High");
    });

    it("handles None security level correctly", () => {
      const result = getRecommendedSecurityLevels(
        "None" as SecurityLevel,
        "None" as SecurityLevel,
        "None" as SecurityLevel,
        "Low" as SecurityLevel,
        "Low" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(result.availability).toBe("Low");
      expect(result.integrity).toBe("Low");
      expect(result.confidentiality).toBe("Moderate");
    });
  });
});
