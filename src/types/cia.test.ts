import { describe, expect, it } from "vitest";
import {
  SecurityLevel,
  calculateOverallSecurityLevel,
  getSecurityLevelFromValue,
  getSecurityLevelValue,
  isSecurityLevel,
} from "./cia";
import { CIADetails } from "./cia-services"; // Import from correct location

describe("CIA Types", () => {
  describe("SecurityLevel", () => {
    it("should allow valid security levels", () => {
      // Define valid levels
      const validLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      // Check all valid levels
      validLevels.forEach((level) => {
        expect(isSecurityLevel(level)).toBe(true);
      });

      // Check invalid values
      expect(isSecurityLevel("Invalid")).toBe(false);
      expect(isSecurityLevel(null)).toBe(false);
      expect(isSecurityLevel(undefined)).toBe(false);
      expect(isSecurityLevel(123)).toBe(false);
    });

    it("should convert security levels to numeric values", () => {
      expect(getSecurityLevelValue("None")).toBe(0);
      expect(getSecurityLevelValue("Low")).toBe(1);
      expect(getSecurityLevelValue("Moderate")).toBe(2);
      expect(getSecurityLevelValue("High")).toBe(3);
      expect(getSecurityLevelValue("Very High")).toBe(4);
    });

    it("should convert numeric values to security levels", () => {
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(1)).toBe("Low");
      expect(getSecurityLevelFromValue(2)).toBe("Moderate");
      expect(getSecurityLevelFromValue(3)).toBe("High");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");

      // Handle out-of-range values
      expect(getSecurityLevelFromValue(-1)).toBe("None");
      expect(getSecurityLevelFromValue(5)).toBe("None");
    });

    it("handles edge cases in isSecurityLevel function", () => {
      // Test empty string
      expect(isSecurityLevel("")).toBe(false);
      
      // Test security levels with wrong casing (these should fail as we expect exact matches)
      expect(isSecurityLevel("none")).toBe(false);
      expect(isSecurityLevel("low")).toBe(false);
      expect(isSecurityLevel("MODERATE")).toBe(false);
      
      // Test objects and arrays
      expect(isSecurityLevel({})).toBe(false);
      expect(isSecurityLevel([])).toBe(false);
      
      // Test boolean values
      expect(isSecurityLevel(true)).toBe(false);
      expect(isSecurityLevel(false)).toBe(false);
    });
  });

  describe("calculateOverallSecurityLevel", () => {
    it("should calculate overall security level correctly", () => {
      // All same level
      expect(calculateOverallSecurityLevel("None", "None", "None")).toBe(
        "None"
      );
      expect(calculateOverallSecurityLevel("Low", "Low", "Low")).toBe("Low");
      expect(
        calculateOverallSecurityLevel("Moderate", "Moderate", "Moderate")
      ).toBe("Moderate");
      expect(calculateOverallSecurityLevel("High", "High", "High")).toBe(
        "High"
      );
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "Very High")
      ).toBe("Very High");

      // Mixed levels
      expect(calculateOverallSecurityLevel("Low", "Moderate", "High")).toBe(
        "Moderate"
      );
      expect(calculateOverallSecurityLevel("None", "Low", "Moderate")).toBe(
        "Low"
      );
      expect(calculateOverallSecurityLevel("Low", "Very High", "High")).toBe(
        "High"
      );
      expect(calculateOverallSecurityLevel("None", "None", "Very High")).toBe(
        "Low"
      );
    });
  });

  // Make sure CIADetails can be imported and used
  it("should import CIADetails interface correctly", () => {
    // Create a valid CIADetails object
    const details: CIADetails = {
      description: "Test description",
      technical: "Technical details",
      businessImpact: "Business impact details",
      capex: 100,
      opex: 50,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Recommendation 1", "Recommendation 2"],
    };

    expect(details.description).toBe("Test description");
    expect(details.capex).toBe(100);
    expect(details.opex).toBe(50);
    expect(details.bg).toBe("#ffffff");
    expect(details.text).toBe("#000000");
  });
});
