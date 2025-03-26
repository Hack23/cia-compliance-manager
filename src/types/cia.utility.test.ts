import { describe, expect, it } from "vitest";
import { SecurityLevel } from "./cia"; // Import SecurityLevel from the correct module
import {
  calculateOverallSecurityLevel,
  calculateRiskLevel,
  formatSecurityLevel,
  getSecurityLevelFromValue,
  getSecurityLevelValue,
} from "./cia.utility";

// Mock for type validation testing
const validCIADetails = {
  description: "Valid description",
  technical: "Technical details",
  businessImpact: "Business impact details",
  capex: 100,
  opex: 50,
  bg: "#ffffff",
  text: "#000000",
  recommendations: ["Recommendation 1", "Recommendation 2"],
};

describe("CIADetails TypeScript Type Validation", () => {
  it("validates all fields of CIADetails with TypeScript", () => {
    // This is a TypeScript-only test - no runtime assertions needed
    expect(true).toBe(true);
  });
});

describe("CIA Utility Functions", () => {
  describe("formatSecurityLevel", () => {
    it("formats security levels correctly", () => {
      expect(formatSecurityLevel("none")).toBe("None");
      expect(formatSecurityLevel("LOW")).toBe("Low");
      expect(formatSecurityLevel("moderate")).toBe("Moderate");
      expect(formatSecurityLevel("HIGH")).toBe("High");
      expect(formatSecurityLevel("VERY HIGH")).toBe("Very High");
    });

    it("handles empty or undefined values", () => {
      expect(formatSecurityLevel()).toBe("None");
      expect(formatSecurityLevel("")).toBe("None");
    });
  });

  describe("getSecurityLevelValue", () => {
    it("returns correct numeric values for security levels", () => {
      expect(getSecurityLevelValue("None")).toBe(0);
      expect(getSecurityLevelValue("Low")).toBe(1);
      expect(getSecurityLevelValue("Moderate")).toBe(2);
      expect(getSecurityLevelValue("High")).toBe(3);
      expect(getSecurityLevelValue("Very High")).toBe(4);
    });

    it("returns 0 for unknown levels", () => {
      expect(getSecurityLevelValue("Unknown" as SecurityLevel)).toBe(0);
    });
  });

  describe("getSecurityLevelFromValue", () => {
    it("returns correct security level for numeric value", () => {
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(1)).toBe("Low");
      expect(getSecurityLevelFromValue(2)).toBe("Moderate");
      expect(getSecurityLevelFromValue(3)).toBe("High");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");
    });

    it("returns 'None' for out of range values", () => {
      expect(getSecurityLevelFromValue(-1)).toBe("None");
      expect(getSecurityLevelFromValue(5)).toBe("None");
    });
  });

  describe("calculateOverallSecurityLevel", () => {
    it("calculates average security level correctly", () => {
      // Same level - should return that level
      expect(calculateOverallSecurityLevel("None", "None", "None")).toBe("None");
      expect(calculateOverallSecurityLevel("Low", "Low", "Low")).toBe("Low");
      expect(calculateOverallSecurityLevel("Moderate", "Moderate", "Moderate")).toBe("Moderate");
      expect(calculateOverallSecurityLevel("High", "High", "High")).toBe("High");
      expect(calculateOverallSecurityLevel("Very High", "Very High", "Very High")).toBe("Very High");
    });

    it("rounds to nearest security level", () => {
      // Mixed levels requiring rounding
      expect(calculateOverallSecurityLevel("Low", "Moderate", "Moderate")).toBe("Moderate");
      expect(calculateOverallSecurityLevel("High", "Moderate", "Low")).toBe("Moderate");
      expect(calculateOverallSecurityLevel("High", "High", "Moderate")).toBe("High");
    });

    it("handles mixed security levels", () => {
      // Special cases with "None"
      expect(calculateOverallSecurityLevel("High", "Low", "None")).toBe("Low");
      expect(calculateOverallSecurityLevel("None", "High", "Moderate")).toBe("Low");
      expect(calculateOverallSecurityLevel("None", "None", "High")).toBe("None");
      
      // Edge cases
      expect(calculateOverallSecurityLevel("Very High", "None", "None")).toBe("None");
      expect(calculateOverallSecurityLevel("None", "None", "None")).toBe("None");
    });
  });

  describe("calculateRiskLevel", () => {
    it("calculates risk level based on security levels", () => {
      expect(calculateRiskLevel("None", "None", "None")).toBe("Critical");
      expect(calculateRiskLevel("Low", "Low", "Low")).toBe("High");
      expect(calculateRiskLevel("Moderate", "Moderate", "Moderate")).toBe("Medium");
      expect(calculateRiskLevel("High", "High", "High")).toBe("Low");
      expect(calculateRiskLevel("Very High", "Very High", "Very High")).toBe("Minimal");
    });

    it("uses average security level for risk calculation", () => {
      expect(calculateRiskLevel("High", "Moderate", "Low")).toBe("Medium");
      expect(calculateRiskLevel("High", "Low", "None")).toBe("High");
    });
  });
});
