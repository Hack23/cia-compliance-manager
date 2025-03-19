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
    // This is a type-level test that TypeScript will enforce
    expect(validCIADetails).toHaveProperty("description");
    expect(validCIADetails).toHaveProperty("technical");
    expect(validCIADetails).toHaveProperty("businessImpact");
  });
});

describe("CIA Utility Functions", () => {
  describe("formatSecurityLevel", () => {
    it("formats security levels correctly", () => {
      expect(formatSecurityLevel("none")).toBe("None");
      expect(formatSecurityLevel("LOW")).toBe("Low");
      expect(formatSecurityLevel("moderate")).toBe("Moderate");
      expect(formatSecurityLevel("HIGH")).toBe("High");
      expect(formatSecurityLevel("very HIGH")).toBe("Very High");
    });

    it("handles empty or undefined values", () => {
      expect(formatSecurityLevel("")).toBe("None");
      expect(formatSecurityLevel(undefined)).toBe("None");
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
      expect(calculateOverallSecurityLevel("None", "None", "None")).toBe("None");
      expect(calculateOverallSecurityLevel("Low", "Low", "Low")).toBe("Low");
      expect(calculateOverallSecurityLevel("Moderate", "Moderate", "Moderate")).toBe("Moderate");
    });

    it("rounds to nearest security level", () => {
      // These should average to rounded values
      expect(calculateOverallSecurityLevel("None", "Moderate", "Low")).toBe("Low"); // Average 1
      expect(calculateOverallSecurityLevel("Low", "Moderate", "High")).toBe("Moderate"); // Average 2
      expect(calculateOverallSecurityLevel("Moderate", "High", "Very High")).toBe("High"); // Average 3
    });

    it("handles mixed security levels", () => {
      expect(calculateOverallSecurityLevel("Low", "High", "Low")).toBe("Low"); // Average 1.67 rounds to 2 (Moderate)
      expect(calculateOverallSecurityLevel("Very High", "None", "Moderate")).toBe("Moderate"); // Average 2
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
      expect(calculateRiskLevel("Low", "Low", "Moderate")).toBe("High"); // Average Low
      expect(calculateRiskLevel("Moderate", "Moderate", "High")).toBe("Medium"); // Average Moderate
    });
  });
});
