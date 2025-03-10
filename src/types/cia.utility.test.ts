import { describe, it, expect } from "vitest";
import { CIADetails } from "./cia";
import {
  formatSecurityLevel,
  getSecurityLevelValue,
  getSecurityLevelFromValue,
  calculateOverallSecurityLevel,
  calculateRiskLevel,
} from "./cia";
import { RISK_LEVELS } from "../constants/riskConstants";

/**
 * This test helps ensure TypeScript types are correctly defined
 * by using them in a way that would cause TypeScript compilation errors
 * if they were incorrect.
 */

describe("CIADetails TypeScript Type Validation", () => {
  it("validates all fields of CIADetails with TypeScript", () => {
    // TypeScript helper function that would throw compilation errors
    // if the types are not correct.
    const validateCIADetailsType = (details: CIADetails): void => {
      // String fields - use optional chaining or nullish coalescing to handle undefined
      const desc = details.description || "";
      desc.toLowerCase();

      const impact = details.impact || "";
      impact.toLowerCase();

      const tech = details.technical || "";
      tech.toLowerCase();

      const busImpact = details.businessImpact || "";
      busImpact.toLowerCase();

      // Optional string fields - use optional chaining to handle undefined
      details.bg?.startsWith("#");
      details.text?.startsWith("#");

      // Number fields - use nullish coalescing to handle undefined
      const capex = details.capex ?? 0;
      capex.toFixed(2);

      const opex = details.opex ?? 0;
      opex.toFixed(2);

      // Array field - use optional chaining for undefined
      details.recommendations?.forEach((rec: string) => {
        rec.toLowerCase();
      });
    };

    // Create valid object to pass to our validation function
    const testDetails: CIADetails = {
      description: "Description",
      impact: "Impact description",
      technical: "Technical details",
      businessImpact: "Business impact details",
      capex: 25,
      opex: 15,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Rec 1", "Rec 2"],
    };

    // Won't actually do anything at runtime, but helps TypeScript validation
    validateCIADetailsType(testDetails);

    // Create minimal object
    const minimalDetails: CIADetails = {
      description: "Min",
      impact: "Min",
      technical: "Min",
      businessImpact: "Min",
      capex: 0,
      opex: 0,
      bg: "#fff",
      text: "#000",
      recommendations: [], // Add this as it's required, not optional
    };

    validateCIADetailsType(minimalDetails);

    // Basic test to satisfy Jest
    expect(true).toBeTruthy();
  });
});

describe("CIA Utility Functions", () => {
  describe("formatSecurityLevel", () => {
    it("formats security levels correctly", () => {
      expect(formatSecurityLevel("none")).toBe("None");
      expect(formatSecurityLevel("low")).toBe("Low");
      expect(formatSecurityLevel("moderate")).toBe("Moderate");
    });

    it("handles empty or undefined values", () => {
      expect(formatSecurityLevel("")).toBe("Unknown");
      expect(formatSecurityLevel(undefined as any)).toBe("Unknown");
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
      expect(getSecurityLevelValue("Unknown")).toBe(0);
      expect(getSecurityLevelValue("")).toBe(0);
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
      expect(
        calculateOverallSecurityLevel("Moderate", "Moderate", "Moderate")
      ).toBe("Moderate");
      expect(calculateOverallSecurityLevel("High", "High", "High")).toBe(
        "High"
      );
      expect(
        calculateOverallSecurityLevel("None", "Very High", "Moderate")
      ).toBe("Moderate");
    });

    it("rounds to nearest security level", () => {
      expect(calculateOverallSecurityLevel("None", "Low", "Moderate")).toBe(
        "Low"
      );
      expect(calculateOverallSecurityLevel("Low", "Moderate", "High")).toBe(
        "Moderate"
      );
    });

    it("handles mixed security levels", () => {
      expect(calculateOverallSecurityLevel("None", "Very High", "None")).toBe(
        "Low"
      );
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "None")
      ).toBe("High");
    });
  });

  describe("calculateRiskLevel", () => {
    it("calculates risk level based on security levels", () => {
      expect(calculateRiskLevel("None", "None", "None")).toBe(
        RISK_LEVELS.CRITICAL
      );
      expect(calculateRiskLevel("Low", "Low", "Low")).toBe(RISK_LEVELS.HIGH);
      expect(calculateRiskLevel("Moderate", "Moderate", "Moderate")).toBe(
        RISK_LEVELS.MEDIUM
      );
      expect(calculateRiskLevel("High", "High", "High")).toBe(RISK_LEVELS.LOW);
      expect(calculateRiskLevel("Very High", "Very High", "Very High")).toBe(
        RISK_LEVELS.MINIMAL
      );
    });

    it("uses average security level for risk calculation", () => {
      expect(calculateRiskLevel("None", "Low", "Moderate")).toBe(
        RISK_LEVELS.HIGH
      );
      expect(calculateRiskLevel("Low", "Moderate", "High")).toBe(
        RISK_LEVELS.MEDIUM
      );
    });
  });
});
