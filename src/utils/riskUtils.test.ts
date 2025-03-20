import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { calculateRiskScore, getRiskLevelFromSecurityLevel, getSecurityLevelColorClass, getStatusBadgeForRiskLevel } from "./riskUtils";

describe("riskUtils", () => {
  describe("getRiskLevelFromSecurityLevel", () => {
    it("should return correct risk level for security level", () => {
      expect(getRiskLevelFromSecurityLevel("None")).toBe("Critical Risk");
      expect(getRiskLevelFromSecurityLevel("Low")).toBe("High Risk");
      expect(getRiskLevelFromSecurityLevel("Moderate")).toBe("Medium Risk");
      expect(getRiskLevelFromSecurityLevel("High")).toBe("Low Risk");
      expect(getRiskLevelFromSecurityLevel("Very High")).toBe("Minimal Risk");
    });

    it("should handle unexpected values", () => {
      expect(getRiskLevelFromSecurityLevel("Unknown" as SecurityLevel)).toBe("Unknown Risk");
    });
  });

  describe("getStatusBadgeForRiskLevel", () => {
    it("should return correct badge variant for risk level", () => {
      expect(getStatusBadgeForRiskLevel("Critical Risk")).toBe("error");
      expect(getStatusBadgeForRiskLevel("High Risk")).toBe("warning");
      expect(getStatusBadgeForRiskLevel("Medium Risk")).toBe("info");
      expect(getStatusBadgeForRiskLevel("Low Risk")).toBe("success");
      expect(getStatusBadgeForRiskLevel("Minimal Risk")).toBe("success");
    });

    it("should return neutral for unknown risk levels", () => {
      expect(getStatusBadgeForRiskLevel("Unknown Risk")).toBe("neutral");
    });
  });

  describe("getSecurityLevelColorClass", () => {
    it("should return correct color class for security level", () => {
      expect(getSecurityLevelColorClass("None")).toBe("text-red-600 dark:text-red-400");
      expect(getSecurityLevelColorClass("Low")).toBe("text-orange-600 dark:text-orange-400");
      expect(getSecurityLevelColorClass("Moderate")).toBe("text-blue-600 dark:text-blue-400");
      expect(getSecurityLevelColorClass("High")).toBe("text-green-600 dark:text-green-400");
      expect(getSecurityLevelColorClass("Very High")).toBe("text-purple-600 dark:text-purple-400");
    });

    it("should handle unexpected values", () => {
      expect(getSecurityLevelColorClass("Unknown" as SecurityLevel)).toBe("text-gray-600 dark:text-gray-400");
    });
  });

  describe("calculateRiskScore", () => {
    it("should calculate risk score correctly", () => {
      expect(calculateRiskScore("None", "None", "None")).toBe(0);
      expect(calculateRiskScore("Very High", "Very High", "Very High")).toBe(100);
      expect(calculateRiskScore("Moderate", "Moderate", "Moderate")).toBe(50);
      expect(calculateRiskScore("High", "Moderate", "Low")).toBe(50);
    });

    it("should handle mixed security levels", () => {
      expect(calculateRiskScore("High", "Low", "Moderate")).toBe(50);
      expect(calculateRiskScore("None", "High", "Very High")).toBe(42);
    });

    it("should handle unexpected values", () => {
      expect(calculateRiskScore("Unknown" as SecurityLevel, "Moderate", "High")).toBe(42);
    });
  });
});
