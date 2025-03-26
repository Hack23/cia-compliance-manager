import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { getSecurityLevelFromValue, getSecurityLevelValue } from "./levelValuesUtils";

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
  });
});
