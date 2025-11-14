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

    it("handles string variations", () => {
      expect(getSecurityLevelValue("medium")).toBe(2);
      expect(getSecurityLevelValue("veryhigh")).toBe(4);
      expect(getSecurityLevelValue("very high")).toBe(4);
    });

    it("handles whitespace", () => {
      expect(getSecurityLevelValue(" Low ")).toBe(1);
      expect(getSecurityLevelValue(" High ")).toBe(3);
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

    it("handles boundary values", () => {
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");
    });

    it("handles invalid numeric values", () => {
      expect(getSecurityLevelFromValue(10)).toBe("None");
      expect(getSecurityLevelFromValue(-5)).toBe("None");
    });
  });

  describe("calculateOverallSecurityLevel", () => {
    describe("min strategy (default)", () => {
      it("returns the minimum security level", () => {
        expect(
          calculateOverallSecurityLevel("High", "Very High", "Moderate")
        ).toBe("Moderate");
        expect(
          calculateOverallSecurityLevel("Low", "High", "Very High")
        ).toBe("Low");
      });

      it("handles same levels", () => {
        expect(
          calculateOverallSecurityLevel("Moderate", "Moderate", "Moderate")
        ).toBe("Moderate");
      });
    });

    describe("max strategy", () => {
      it("returns the maximum security level", () => {
        expect(
          calculateOverallSecurityLevel("High", "Low", "Moderate", "max")
        ).toBe("High");
        expect(
          calculateOverallSecurityLevel("None", "Low", "Very High", "max")
        ).toBe("Very High");
      });
    });

    describe("avg strategy", () => {
      it("returns the average security level", () => {
        expect(
          calculateOverallSecurityLevel("None", "Low", "Moderate", "avg")
        ).toBe("Low");
        expect(
          calculateOverallSecurityLevel("High", "High", "High", "avg")
        ).toBe("High");
      });

      it("rounds to nearest level", () => {
        expect(
          calculateOverallSecurityLevel("Low", "Moderate", "High", "avg")
        ).toBe("Moderate");
      });
    });

    describe("weighted strategy", () => {
      it("calculates weighted average with confidentiality priority", () => {
        expect(
          calculateOverallSecurityLevel("Low", "Low", "High", "weighted")
        ).toBe("Moderate");
        // None=0, None=0, Very High=4: (0*0.3) + (0*0.3) + (4*0.4) = 1.6, rounds to 2 = Moderate
        expect(
          calculateOverallSecurityLevel("None", "None", "Very High", "weighted")
        ).toBe("Moderate");
      });

      it("handles all high levels", () => {
        expect(
          calculateOverallSecurityLevel("High", "High", "High", "weighted")
        ).toBe("High");
      });

      it("handles all low levels", () => {
        expect(
          calculateOverallSecurityLevel("None", "None", "None", "weighted")
        ).toBe("None");
      });

      it("prioritizes confidentiality in weighted calculation", () => {
        // Low=1, Low=1, Very High=4: (1*0.3) + (1*0.3) + (4*0.4) = 2.2, rounds to 2 = Moderate
        expect(
          calculateOverallSecurityLevel("Low", "Low", "Very High", "weighted")
        ).toBe("Moderate");
      });
    });

    it("uses min strategy as default", () => {
      const resultWithoutStrategy = calculateOverallSecurityLevel(
        "High",
        "Moderate",
        "Low"
      );
      const resultWithMin = calculateOverallSecurityLevel(
        "High",
        "Moderate",
        "Low",
        "min"
      );
      expect(resultWithoutStrategy).toBe(resultWithMin);
      expect(resultWithoutStrategy).toBe("Low");
    });

    it("handles extreme combinations", () => {
      expect(
        calculateOverallSecurityLevel("Very High", "Very High", "Very High", "avg")
      ).toBe("Very High");
      expect(
        calculateOverallSecurityLevel("None", "None", "None", "avg")
      ).toBe("None");
    });
  });

  describe("getNormalizedSecurityValue", () => {
    it("converts security levels to normalized percentage", () => {
      expect(getNormalizedSecurityValue("None")).toBe(0);
      expect(getNormalizedSecurityValue("Low")).toBe(25);
      expect(getNormalizedSecurityValue("Moderate")).toBe(50);
      expect(getNormalizedSecurityValue("High")).toBe(75);
      expect(getNormalizedSecurityValue("Very High")).toBe(100);
    });

    it("returns correct percentage for all levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      const expected = [0, 25, 50, 75, 100];

      levels.forEach((level, index) => {
        expect(getNormalizedSecurityValue(level)).toBe(expected[index]);
      });
    });
  });

  describe("compareSecurityLevels", () => {
    it("returns -1 when first level is lower", () => {
      expect(compareSecurityLevels("Low", "High")).toBe(-1);
      expect(compareSecurityLevels("None", "Moderate")).toBe(-1);
      expect(compareSecurityLevels("Moderate", "Very High")).toBe(-1);
    });

    it("returns 1 when first level is higher", () => {
      expect(compareSecurityLevels("High", "Low")).toBe(1);
      expect(compareSecurityLevels("Moderate", "None")).toBe(1);
      expect(compareSecurityLevels("Very High", "Moderate")).toBe(1);
    });

    it("returns 0 when levels are equal", () => {
      expect(compareSecurityLevels("None", "None")).toBe(0);
      expect(compareSecurityLevels("Low", "Low")).toBe(0);
      expect(compareSecurityLevels("Moderate", "Moderate")).toBe(0);
      expect(compareSecurityLevels("High", "High")).toBe(0);
      expect(compareSecurityLevels("Very High", "Very High")).toBe(0);
    });

    it("handles extreme comparisons", () => {
      expect(compareSecurityLevels("None", "Very High")).toBe(-1);
      expect(compareSecurityLevels("Very High", "None")).toBe(1);
    });

    it("works correctly for all level pairs", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];

      for (let i = 0; i < levels.length; i++) {
        for (let j = 0; j < levels.length; j++) {
          const result = compareSecurityLevels(levels[i], levels[j]);
          if (i < j) {
            expect(result).toBe(-1);
          } else if (i > j) {
            expect(result).toBe(1);
          } else {
            expect(result).toBe(0);
          }
        }
      }
    });
  });
});
