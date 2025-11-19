import { describe, expect, it } from "vitest";
import {
  SECURITY_LEVELS,
  SECURITY_LEVEL_VALUES,
  SECURITY_LEVEL_FROM_VALUE,
  SECURITY_LEVEL_DESCRIPTIONS,
  SECURITY_LEVEL_COLOR_MAP,
  SECURITY_LEVEL_CSS_CLASSES,
  ALL_SECURITY_LEVELS,
  getSecurityLevelByValue,
  getSecurityLevelValue,
  riskLevelMappings,
  getRiskLevelForSecurity,
} from "./securityLevels";
import { SecurityLevel } from "../types/cia";

describe("securityLevels", () => {
  describe("SECURITY_LEVELS", () => {
    it("contains all expected security levels", () => {
      expect(SECURITY_LEVELS.NONE).toBe("None");
      expect(SECURITY_LEVELS.LOW).toBe("Low");
      expect(SECURITY_LEVELS.MODERATE).toBe("Moderate");
      expect(SECURITY_LEVELS.HIGH).toBe("High");
      expect(SECURITY_LEVELS.VERY_HIGH).toBe("Very High");
    });

    it("has correct type annotations", () => {
      const levels: SecurityLevel[] = Object.values(SECURITY_LEVELS);
      expect(levels.length).toBe(5);
    });
  });

  describe("SECURITY_LEVEL_VALUES", () => {
    it("contains numeric values for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(SECURITY_LEVEL_VALUES[level]).toBeDefined();
        expect(typeof SECURITY_LEVEL_VALUES[level]).toBe("number");
      });
    });

    it("has increasing values by security level", () => {
      expect(SECURITY_LEVEL_VALUES.None).toBe(0);
      expect(SECURITY_LEVEL_VALUES.Low).toBe(1);
      expect(SECURITY_LEVEL_VALUES.Moderate).toBe(2);
      expect(SECURITY_LEVEL_VALUES.High).toBe(3);
      expect(SECURITY_LEVEL_VALUES["Very High"]).toBe(4);
    });

    it("maintains sequential ordering", () => {
      expect(SECURITY_LEVEL_VALUES.None).toBeLessThan(SECURITY_LEVEL_VALUES.Low);
      expect(SECURITY_LEVEL_VALUES.Low).toBeLessThan(SECURITY_LEVEL_VALUES.Moderate);
      expect(SECURITY_LEVEL_VALUES.Moderate).toBeLessThan(SECURITY_LEVEL_VALUES.High);
      expect(SECURITY_LEVEL_VALUES.High).toBeLessThan(
        SECURITY_LEVEL_VALUES["Very High"]
      );
    });
  });

  describe("SECURITY_LEVEL_FROM_VALUE", () => {
    it("contains all security levels in order", () => {
      expect(SECURITY_LEVEL_FROM_VALUE).toEqual([
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ]);
    });

    it("has correct array length", () => {
      expect(SECURITY_LEVEL_FROM_VALUE.length).toBe(5);
    });

    it("matches SECURITY_LEVEL_VALUES mapping", () => {
      SECURITY_LEVEL_FROM_VALUE.forEach((level, index) => {
        expect(SECURITY_LEVEL_VALUES[level]).toBe(index);
      });
    });
  });

  describe("SECURITY_LEVEL_DESCRIPTIONS", () => {
    it("contains descriptions for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(SECURITY_LEVEL_DESCRIPTIONS[level]).toBeDefined();
        expect(typeof SECURITY_LEVEL_DESCRIPTIONS[level]).toBe("string");
        expect(SECURITY_LEVEL_DESCRIPTIONS[level].length).toBeGreaterThan(0);
      });
    });

    it("has meaningful descriptions", () => {
      expect(SECURITY_LEVEL_DESCRIPTIONS.None).toContain("No security");
      expect(SECURITY_LEVEL_DESCRIPTIONS.Low).toContain("Basic");
      expect(SECURITY_LEVEL_DESCRIPTIONS["Very High"]).toContain("Maximum");
    });
  });

  describe("SECURITY_LEVEL_COLOR_MAP", () => {
    it("contains color pairs for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(SECURITY_LEVEL_COLOR_MAP[level]).toBeDefined();
        expect(SECURITY_LEVEL_COLOR_MAP[level].bg).toBeDefined();
        expect(SECURITY_LEVEL_COLOR_MAP[level].text).toBeDefined();
      });
    });

    it("has valid hex color codes", () => {
      Object.values(SECURITY_LEVEL_COLOR_MAP).forEach((colorPair) => {
        expect(colorPair.bg).toMatch(/^#[0-9a-f]{6}$/i);
        expect(colorPair.text).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe("SECURITY_LEVEL_CSS_CLASSES", () => {
    it("contains CSS classes for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(SECURITY_LEVEL_CSS_CLASSES[level]).toBeDefined();
        expect(SECURITY_LEVEL_CSS_CLASSES[level].bg).toBeDefined();
        expect(SECURITY_LEVEL_CSS_CLASSES[level].text).toBeDefined();
      });
    });

    it("has valid Tailwind CSS class strings", () => {
      Object.values(SECURITY_LEVEL_CSS_CLASSES).forEach((classes) => {
        expect(typeof classes.bg).toBe("string");
        expect(typeof classes.text).toBe("string");
        expect(classes.bg.length).toBeGreaterThan(0);
        expect(classes.text.length).toBeGreaterThan(0);
      });
    });

    it("includes dark mode classes", () => {
      const noneClasses = SECURITY_LEVEL_CSS_CLASSES.None;
      expect(noneClasses.bg).toContain("dark:");
      expect(noneClasses.text).toContain("dark:");
    });
  });

  describe("ALL_SECURITY_LEVELS", () => {
    it("contains all security levels in order", () => {
      expect(ALL_SECURITY_LEVELS).toEqual([
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ]);
    });

    it("has correct array length", () => {
      expect(ALL_SECURITY_LEVELS.length).toBe(5);
    });

    it("matches SECURITY_LEVELS values", () => {
      expect(ALL_SECURITY_LEVELS[0]).toBe(SECURITY_LEVELS.NONE);
      expect(ALL_SECURITY_LEVELS[1]).toBe(SECURITY_LEVELS.LOW);
      expect(ALL_SECURITY_LEVELS[2]).toBe(SECURITY_LEVELS.MODERATE);
      expect(ALL_SECURITY_LEVELS[3]).toBe(SECURITY_LEVELS.HIGH);
      expect(ALL_SECURITY_LEVELS[4]).toBe(SECURITY_LEVELS.VERY_HIGH);
    });
  });

  describe("getSecurityLevelByValue", () => {
    it("returns correct security level for valid values", () => {
      expect(getSecurityLevelByValue(0)).toBe("None");
      expect(getSecurityLevelByValue(1)).toBe("Low");
      expect(getSecurityLevelByValue(2)).toBe("Moderate");
      expect(getSecurityLevelByValue(3)).toBe("High");
      expect(getSecurityLevelByValue(4)).toBe("Very High");
    });

    it("returns None for invalid values", () => {
      expect(getSecurityLevelByValue(-1)).toBe(SECURITY_LEVELS.NONE);
      expect(getSecurityLevelByValue(5)).toBe(SECURITY_LEVELS.NONE);
      expect(getSecurityLevelByValue(100)).toBe(SECURITY_LEVELS.NONE);
    });

    it("handles boundary values", () => {
      expect(getSecurityLevelByValue(0)).toBe("None");
      expect(getSecurityLevelByValue(4)).toBe("Very High");
    });

    it("returns None for undefined/null values", () => {
      expect(getSecurityLevelByValue(undefined as unknown as number)).toBe(
        SECURITY_LEVELS.NONE
      );
    });
  });

  describe("getSecurityLevelValue", () => {
    it("returns correct numeric value for valid security levels", () => {
      expect(getSecurityLevelValue("None")).toBe(0);
      expect(getSecurityLevelValue("Low")).toBe(1);
      expect(getSecurityLevelValue("Moderate")).toBe(2);
      expect(getSecurityLevelValue("High")).toBe(3);
      expect(getSecurityLevelValue("Very High")).toBe(4);
    });

    it("returns 0 for invalid security levels", () => {
      expect(getSecurityLevelValue("Invalid" as SecurityLevel)).toBe(0);
    });

    it("handles all valid security levels consistently", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level, expectedValue) => {
        expect(getSecurityLevelValue(level)).toBe(expectedValue);
      });
    });
  });

  describe("riskLevelMappings", () => {
    it("contains risk mappings for all security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(riskLevelMappings[level]).toBeDefined();
        expect(typeof riskLevelMappings[level]).toBe("string");
      });
    });

    it("has inverse relationship between security and risk", () => {
      expect(riskLevelMappings.None).toBe("Critical");
      expect(riskLevelMappings.Low).toBe("High");
      expect(riskLevelMappings.Moderate).toBe("Medium");
      expect(riskLevelMappings.High).toBe("Low");
      expect(riskLevelMappings["Very High"]).toBe("Minimal");
    });

    it("demonstrates decreasing risk with increasing security", () => {
      // Lower security = higher risk
      const riskValues = {
        Critical: 5,
        High: 4,
        Medium: 3,
        Low: 2,
        Minimal: 1,
      };

      const noneRiskValue = riskValues[riskLevelMappings.None as keyof typeof riskValues];
      const veryHighRiskValue =
        riskValues[riskLevelMappings["Very High"] as keyof typeof riskValues];

      expect(noneRiskValue).toBeGreaterThan(veryHighRiskValue);
    });
  });

  describe("getRiskLevelForSecurity", () => {
    it("returns correct risk level for valid security levels", () => {
      expect(getRiskLevelForSecurity("None")).toBe("Critical");
      expect(getRiskLevelForSecurity("Low")).toBe("High");
      expect(getRiskLevelForSecurity("Moderate")).toBe("Medium");
      expect(getRiskLevelForSecurity("High")).toBe("Low");
      expect(getRiskLevelForSecurity("Very High")).toBe("Minimal");
    });

    it("returns Unknown for invalid security levels", () => {
      expect(getRiskLevelForSecurity("Invalid" as SecurityLevel)).toBe("Unknown");
    });

    it("handles all valid security levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        const riskLevel = getRiskLevelForSecurity(level);
        expect(riskLevel).toBeDefined();
        expect(riskLevel).not.toBe("Unknown");
        expect(typeof riskLevel).toBe("string");
      });
    });

    it("matches riskLevelMappings", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(getRiskLevelForSecurity(level)).toBe(riskLevelMappings[level]);
      });
    });
  });
});
