import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
  calculateOverallSecurityLevel,
  compareSecurityLevels,
  getNormalizedSecurityValue,
  getSecurityLevelFromValue,
  getSecurityLevelValue,
} from "./levelValuesUtils";

describe("levelValuesUtils", () => {
  describe("getSecurityLevelValue", () => {
    it("converts security levels to correct numeric values", () => {
      expect(getSecurityLevelValue("None")).toBe(0);
      expect(getSecurityLevelValue("Low")).toBe(1);
      expect(getSecurityLevelValue("Moderate")).toBe(2);
      expect(getSecurityLevelValue("High")).toBe(3);
      expect(getSecurityLevelValue("Very High")).toBe(4);

      // Test case insensitivity
      expect(getSecurityLevelValue("none")).toBe(0);
      expect(getSecurityLevelValue("MODERATE")).toBe(2);

      // Test handling of unknown values
      expect(getSecurityLevelValue("unknown" as SecurityLevel)).toBe(0);
      expect(getSecurityLevelValue("" as SecurityLevel)).toBe(0);
    });

    it("handles medium as moderate", () => {
      expect(getSecurityLevelValue("medium")).toBe(2);
      expect(getSecurityLevelValue("MEDIUM")).toBe(2);
    });

    it("handles very high variations", () => {
      expect(getSecurityLevelValue("very high")).toBe(4);
      expect(getSecurityLevelValue("veryhigh")).toBe(4);
      expect(getSecurityLevelValue("VERY HIGH")).toBe(4);
    });
  });

  describe("getSecurityLevelFromValue", () => {
    it("converts numeric values to correct security levels", () => {
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(1)).toBe("Low");
      expect(getSecurityLevelFromValue(2)).toBe("Moderate");
      expect(getSecurityLevelFromValue(3)).toBe("High");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");

      // Check handling of out-of-range values
      expect(getSecurityLevelFromValue(-1)).toBe("None");
      expect(getSecurityLevelFromValue(5)).toBe("None");
    });

    it("handles edge cases", () => {
      expect(getSecurityLevelFromValue(100)).toBe("None");
      expect(getSecurityLevelFromValue(-100)).toBe("None");
    });
  });

  describe("calculateOverallSecurityLevel", () => {
    it("calculates with min strategy (default)", () => {
      expect(
        calculateOverallSecurityLevel("High", "Moderate", "Low")
      ).toBe("Low");
      expect(
        calculateOverallSecurityLevel("Very High", "High", "Moderate")
      ).toBe("Moderate");
    });

    it("calculates with max strategy", () => {
      expect(
        calculateOverallSecurityLevel("High", "Moderate", "Low", "max")
      ).toBe("High");
      expect(
        calculateOverallSecurityLevel("Very High", "High", "Moderate", "max")
      ).toBe("Very High");
    });

    it("calculates with avg strategy", () => {
      expect(
        calculateOverallSecurityLevel("High", "High", "High", "avg")
      ).toBe("High");
      expect(
        calculateOverallSecurityLevel("Low", "Moderate", "High", "avg")
      ).toBe("Moderate");
      expect(
        calculateOverallSecurityLevel("None", "None", "Very High", "avg")
      ).toBe("Low");
    });

    it("calculates with weighted strategy", () => {
      expect(
        calculateOverallSecurityLevel("Low", "Low", "High", "weighted")
      ).toBe("Moderate");
      expect(
        calculateOverallSecurityLevel("None", "None", "Very High", "weighted")
      ).toBe("Moderate"); // 0*0.3 + 0*0.3 + 4*0.4 = 1.6 rounds to 2
      expect(
        calculateOverallSecurityLevel("High", "High", "High", "weighted")
      ).toBe("High");
      expect(
        calculateOverallSecurityLevel("Low", "Moderate", "Very High", "weighted")
      ).toBe("High"); // 1*0.3 + 2*0.3 + 4*0.4 = 2.5 rounds to 3
    });

    it("handles all None levels", () => {
      expect(
        calculateOverallSecurityLevel("None", "None", "None")
      ).toBe("None");
      expect(
        calculateOverallSecurityLevel("None", "None", "None", "max")
      ).toBe("None");
      expect(
        calculateOverallSecurityLevel("None", "None", "None", "avg")
      ).toBe("None");
      expect(
        calculateOverallSecurityLevel("None", "None", "None", "weighted")
      ).toBe("None");
    });

    it("handles all Very High levels", () => {
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "Very High")
      ).toBe("Very High");
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "Very High", "max")
      ).toBe("Very High");
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "Very High", "avg")
      ).toBe("Very High");
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "Very High", "weighted")
      ).toBe("Very High");
    });

    it("handles mixed moderate levels", () => {
      expect(
        calculateOverallSecurityLevel("Moderate", "Moderate", "Moderate")
      ).toBe("Moderate");
      expect(
        calculateOverallSecurityLevel("Low", "Moderate", "Moderate", "avg")
      ).toBe("Moderate");
    });
  });

  describe("getNormalizedSecurityValue", () => {
    it("converts security level to 0-100 scale", () => {
      expect(getNormalizedSecurityValue("None")).toBe(0);
      expect(getNormalizedSecurityValue("Low")).toBe(25);
      expect(getNormalizedSecurityValue("Moderate")).toBe(50);
      expect(getNormalizedSecurityValue("High")).toBe(75);
      expect(getNormalizedSecurityValue("Very High")).toBe(100);
    });

    it("handles all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      const expectedValues = [0, 25, 50, 75, 100];

      levels.forEach((level, index) => {
        expect(getNormalizedSecurityValue(level)).toBe(expectedValues[index]);
      });
    });
  });

  describe("compareSecurityLevels", () => {
    it("returns -1 when A < B", () => {
      expect(compareSecurityLevels("None", "Low")).toBe(-1);
      expect(compareSecurityLevels("Low", "Moderate")).toBe(-1);
      expect(compareSecurityLevels("Moderate", "High")).toBe(-1);
      expect(compareSecurityLevels("High", "Very High")).toBe(-1);
    });

    it("returns 0 when A = B", () => {
      expect(compareSecurityLevels("None", "None")).toBe(0);
      expect(compareSecurityLevels("Low", "Low")).toBe(0);
      expect(compareSecurityLevels("Moderate", "Moderate")).toBe(0);
      expect(compareSecurityLevels("High", "High")).toBe(0);
      expect(compareSecurityLevels("Very High", "Very High")).toBe(0);
    });

    it("returns 1 when A > B", () => {
      expect(compareSecurityLevels("Low", "None")).toBe(1);
      expect(compareSecurityLevels("Moderate", "Low")).toBe(1);
      expect(compareSecurityLevels("High", "Moderate")).toBe(1);
      expect(compareSecurityLevels("Very High", "High")).toBe(1);
    });

    it("handles extreme comparisons", () => {
      expect(compareSecurityLevels("None", "Very High")).toBe(-1);
      expect(compareSecurityLevels("Very High", "None")).toBe(1);
    });
  });
});
