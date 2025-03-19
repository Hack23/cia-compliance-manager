import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
  getRiskBadgeVariant,
  getRiskLevelFromSecurityLevel,
  getRiskScoreFromSecurityLevel,
  parseRiskLevel
} from "./riskUtils";

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

  describe("getRiskBadgeVariant", () => {
    it("returns appropriate badge variant for different risk levels", () => {
      expect(getRiskBadgeVariant("Critical")).toBe("error");
      expect(getRiskBadgeVariant("High")).toBe("warning");
      expect(getRiskBadgeVariant("Medium")).toBe("info");
      expect(getRiskBadgeVariant("Moderate")).toBe("info");
      expect(getRiskBadgeVariant("Low")).toBe("success");
      expect(getRiskBadgeVariant("Minimal")).toBe("success");
    });

    it("handles undefined risk level gracefully", () => {
      expect(getRiskBadgeVariant(undefined)).toBe("neutral");
    });

    it("handles case insensitivity", () => {
      expect(getRiskBadgeVariant("critical")).toBe("error");
      expect(getRiskBadgeVariant("HIGH")).toBe("warning");
      expect(getRiskBadgeVariant("MeDiUm")).toBe("info");
    });

    it("returns neutral for unknown risk levels", () => {
      expect(getRiskBadgeVariant("Unknown")).toBe("neutral");
      expect(getRiskBadgeVariant("Not a risk level")).toBe("neutral");
    });
  });

  describe("parseRiskLevel", () => {
    it("converts risk level strings to numeric values", () => {
      expect(parseRiskLevel("Critical")).toBe(4);
      expect(parseRiskLevel("High")).toBe(3);
      expect(parseRiskLevel("Medium")).toBe(2);
      expect(parseRiskLevel("Moderate")).toBe(2);
      expect(parseRiskLevel("Low")).toBe(1);
      expect(parseRiskLevel("Minimal")).toBe(0);
    });

    it("handles case insensitivity", () => {
      expect(parseRiskLevel("critical")).toBe(4);
      expect(parseRiskLevel("HIGH")).toBe(3);
      expect(parseRiskLevel("medium")).toBe(2);
    });

    it("handles numeric strings", () => {
      expect(parseRiskLevel("4")).toBe(4);
      expect(parseRiskLevel("3")).toBe(3);
      expect(parseRiskLevel("2")).toBe(2);
      expect(parseRiskLevel("1")).toBe(1);
      expect(parseRiskLevel("0")).toBe(0);
    });

    it("handles null, undefined and unknown values", () => {
      expect(parseRiskLevel(null)).toBe(0);
      expect(parseRiskLevel(undefined)).toBe(0);
      expect(parseRiskLevel("Unknown")).toBe(0);
      expect(parseRiskLevel("Not a risk level")).toBe(0);
    });
  });
});
