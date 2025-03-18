import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { getSecurityLevelFromValue, getSecurityLevelValue } from "./levelValuesUtils";

describe("levelValuesUtils", () => {
  describe("getSecurityLevelValue", () => {
    it("converts security levels to correct numeric values", () => {
      // Test all security levels
      expect(getSecurityLevelValue("None")).toBe(0);
      expect(getSecurityLevelValue("Low")).toBe(1);
      expect(getSecurityLevelValue("Moderate")).toBe(2);
      expect(getSecurityLevelValue("High")).toBe(3);
      expect(getSecurityLevelValue("Very High")).toBe(4);
      
      // Test with strongly typed security levels
      const noneLevel: SecurityLevel = "None";
      expect(getSecurityLevelValue(noneLevel)).toBe(0);
      
      const highLevel: SecurityLevel = "High";
      expect(getSecurityLevelValue(highLevel)).toBe(3);
      
      // Test edge cases
      expect(getSecurityLevelValue("Invalid" as SecurityLevel)).toBe(0);
    });
  });
  
  describe("getSecurityLevelFromValue", () => {
    it("converts numeric values to correct security levels", () => {
      // Test all values
      expect(getSecurityLevelFromValue(0)).toBe("None");
      expect(getSecurityLevelFromValue(1)).toBe("Low");
      expect(getSecurityLevelFromValue(2)).toBe("Moderate");
      expect(getSecurityLevelFromValue(3)).toBe("High");
      expect(getSecurityLevelFromValue(4)).toBe("Very High");
      
      // Test rounding
      expect(getSecurityLevelFromValue(0.4)).toBe("None");
      expect(getSecurityLevelFromValue(0.6)).toBe("Low");
      expect(getSecurityLevelFromValue(1.4)).toBe("Low");
      expect(getSecurityLevelFromValue(1.6)).toBe("Moderate");
      expect(getSecurityLevelFromValue(2.4)).toBe("Moderate");
      expect(getSecurityLevelFromValue(2.6)).toBe("High");
      expect(getSecurityLevelFromValue(3.4)).toBe("High");
      expect(getSecurityLevelFromValue(3.6)).toBe("Very High");
      
      // Test out of range values (should be clamped)
      expect(getSecurityLevelFromValue(-1)).toBe("None");
      expect(getSecurityLevelFromValue(5)).toBe("Very High");
    });
  });
});
