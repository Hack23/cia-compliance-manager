import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { getRiskLevelFromSecurityLevel, getRiskScoreFromSecurityLevel } from "./riskUtils";

describe("riskUtils", () => {
  describe("getRiskLevelFromSecurityLevel", () => {
    it("converts security levels to corresponding risk levels", () => {
      // Test all security levels
      expect(getRiskLevelFromSecurityLevel("None")).toBe("Critical");
      expect(getRiskLevelFromSecurityLevel("Low")).toBe("High");
      expect(getRiskLevelFromSecurityLevel("Moderate")).toBe("Medium");
      expect(getRiskLevelFromSecurityLevel("High")).toBe("Low");
      expect(getRiskLevelFromSecurityLevel("Very High")).toBe("Minimal");
      
      // Test with strongly typed security levels
      const noneLevel: SecurityLevel = "None";
      expect(getRiskLevelFromSecurityLevel(noneLevel)).toBe("Critical");
      
      const highLevel: SecurityLevel = "High";
      expect(getRiskLevelFromSecurityLevel(highLevel)).toBe("Low");
    });
  });
  
  describe("getRiskScoreFromSecurityLevel", () => {
    it("calculates risk score from security level", () => {
      // Test all security levels
      expect(getRiskScoreFromSecurityLevel("None")).toBe(100);
      expect(getRiskScoreFromSecurityLevel("Low")).toBe(75);
      expect(getRiskScoreFromSecurityLevel("Moderate")).toBe(50);
      expect(getRiskScoreFromSecurityLevel("High")).toBe(25);
      expect(getRiskScoreFromSecurityLevel("Very High")).toBe(0);
    });
    
    it("handles invalid security level", () => {
      // @ts-expect-error - Testing with invalid input
      expect(getRiskScoreFromSecurityLevel("Invalid")).toBe(100);
    });
  });
});
