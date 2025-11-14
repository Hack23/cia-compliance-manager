import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
  calculateBusinessImpactLevel,
  calculateCombinedRiskLevel,
  calculateRiskScore,
  createBusinessImpact,
  createDefaultBusinessImpact,
  formatRiskLevel,
  getDefaultBusinessImpact,
  getDefaultComponentImpact,
  getDefaultErrorRate,
  getDefaultPrivacyImpact,
  getDefaultSLAMetrics,
  getDefaultValidationLevel,
  getErrorRate,
  getFormattedRiskLevel,
  getHighestImpactArea,
  getImplementationComplexity,
  getPrivacyImpact,
  getRiskBadgeVariant,
  getRiskLevelFromImpactLevel,
  getRiskLevelFromSecurityLevel,
  getRiskScoreFromSecurityLevel,
  getRiskSeverityDescription,
  getSecurityLevelColorClass,
  getSLAMetrics,
  getStatusBadgeForRiskLevel,
  getValidationLevel,
  parseRiskLevel,
  securityLevelToValue,
} from "./riskUtils";

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

    it("should handle empty string", () => {
      expect(getStatusBadgeForRiskLevel("")).toBe("neutral");
    });

    it("should handle moderate risk", () => {
      expect(getStatusBadgeForRiskLevel("Moderate Risk")).toBe("info");
    });

    it("should handle none risk", () => {
      expect(getStatusBadgeForRiskLevel("None")).toBe("success");
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

  describe("getDefaultBusinessImpact", () => {
    it("should return business impact for each security level", () => {
      const result = getDefaultBusinessImpact("availability", "High");
      expect(result).toBeDefined();
      expect(result.summary).toContain("availability");
      expect(result.summary).toContain("High");
    });

    it.each([
      ["availability", "None"],
      ["availability", "Low"],
      ["availability", "Moderate"],
      ["availability", "High"],
      ["availability", "Very High"],
      ["integrity", "None"],
      ["integrity", "Low"],
      ["integrity", "Moderate"],
      ["integrity", "High"],
      ["integrity", "Very High"],
      ["confidentiality", "None"],
      ["confidentiality", "Low"],
      ["confidentiality", "Moderate"],
      ["confidentiality", "High"],
      ["confidentiality", "Very High"],
    ] as [string, SecurityLevel][])("should handle %s with %s level", (component, level) => {
      const result = getDefaultBusinessImpact(component, level);
      expect(result).toBeDefined();
      expect(result.summary).toContain(component);
      expect(result.summary).toContain(level);
    });
  });

  describe("legacy function mappings", () => {
    it("should export getSLAMetrics", () => {
      const result = getSLAMetrics("High");
      expect(result).toBeDefined();
      expect(result.uptime).toBeDefined();
      expect(result.rto).toBeDefined();
    });

    it("should export getPrivacyImpact", () => {
      const result = getPrivacyImpact("High");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toContain("Privacy");
    });

    it("should export getValidationLevel", () => {
      const result = getValidationLevel("High");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toBe("Enhanced");
    });

    it("should export getErrorRate", () => {
      const result = getErrorRate("High");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
      expect(result).toBe("< 1%");
    });

    it("should export createBusinessImpact", () => {
      const result = createBusinessImpact("availability", "High");
      expect(result).toBeDefined();
      expect(result.summary).toContain("availability");
    });

    it("should export default functions", () => {
      expect(getDefaultSLAMetrics).toBeDefined();
      expect(getDefaultPrivacyImpact).toBeDefined();
      expect(getDefaultValidationLevel).toBeDefined();
      expect(getDefaultErrorRate).toBeDefined();
      expect(createDefaultBusinessImpact).toBeDefined();
    });
  });

  describe("formatRiskLevel", () => {
    it("should format risk level with proper capitalization", () => {
      expect(formatRiskLevel("high risk")).toBe("High Risk");
      expect(formatRiskLevel("CRITICAL RISK")).toBe("Critical Risk");
      expect(formatRiskLevel("low risk")).toBe("Low Risk");
    });

    it("should handle empty string", () => {
      expect(formatRiskLevel("")).toBe("Unknown Risk");
    });
  });

  describe("getRiskLevelFromImpactLevel", () => {
    it("should map impact levels to risk levels correctly", () => {
      expect(getRiskLevelFromImpactLevel("Minimal")).toBe("Low Risk");
      expect(getRiskLevelFromImpactLevel("Low")).toBe("Low Risk");
      expect(getRiskLevelFromImpactLevel("Moderate")).toBe("Low Risk");
      expect(getRiskLevelFromImpactLevel("High")).toBe("High Risk");
      expect(getRiskLevelFromImpactLevel("Very High")).toBe("High Risk");
    });

    it("should handle unknown impact levels", () => {
      expect(getRiskLevelFromImpactLevel("Unknown")).toBe("Unknown Risk");
    });
  });

  describe("parseRiskLevel", () => {
    it("should parse risk level to lowercase", () => {
      expect(parseRiskLevel("High Risk")).toBe("high risk");
      expect(parseRiskLevel("CRITICAL RISK")).toBe("critical risk");
    });

    it("should handle null and undefined", () => {
      expect(parseRiskLevel(undefined as any)).toBe("");
      expect(parseRiskLevel(null as any)).toBe("");
    });
  });

  describe("securityLevelToValue", () => {
    it("should convert security level to numeric value", () => {
      expect(securityLevelToValue("None")).toBe(0);
      expect(securityLevelToValue("Low")).toBe(1);
      expect(securityLevelToValue("Moderate")).toBe(2);
      expect(securityLevelToValue("High")).toBe(3);
      expect(securityLevelToValue("Very High")).toBe(4);
    });

    it("should return 0 for invalid levels", () => {
      expect(securityLevelToValue("Invalid" as SecurityLevel)).toBe(0);
    });
  });

  describe("calculateCombinedRiskLevel", () => {
    it("should return highest priority risk level", () => {
      expect(calculateCombinedRiskLevel(["Low Risk", "High Risk"])).toBe("High Risk");
      expect(calculateCombinedRiskLevel(["Minimal Risk", "Critical Risk", "Low Risk"])).toBe("Critical Risk");
    });

    it("should handle empty array", () => {
      expect(calculateCombinedRiskLevel([])).toBe("Unknown Risk");
    });

    it("should handle null", () => {
      expect(calculateCombinedRiskLevel(null as any)).toBe("Unknown Risk");
    });

    it("should handle medium risk", () => {
      expect(calculateCombinedRiskLevel(["Medium Risk", "Low Risk"])).toBe("Medium Risk");
    });
  });

  describe("getFormattedRiskLevel", () => {
    it("should format risk level with capitalization", () => {
      expect(getFormattedRiskLevel("high risk")).toBe("High Risk");
      expect(getFormattedRiskLevel("critical risk")).toBe("Critical Risk");
    });

    it("should handle empty string", () => {
      expect(getFormattedRiskLevel("")).toBe("Unknown Risk");
    });
  });

  describe("getRiskBadgeVariant", () => {
    it("should return correct badge variant", () => {
      expect(getRiskBadgeVariant("Critical Risk")).toBe("error");
      expect(getRiskBadgeVariant("High Risk")).toBe("warning");
      expect(getRiskBadgeVariant("Medium Risk")).toBe("info");
      expect(getRiskBadgeVariant("Low Risk")).toBe("success");
    });
  });

  describe("getRiskScoreFromSecurityLevel", () => {
    it("should convert security level to risk score", () => {
      expect(getRiskScoreFromSecurityLevel("None")).toBe(100);
      expect(getRiskScoreFromSecurityLevel("Low")).toBe(75);
      expect(getRiskScoreFromSecurityLevel("Moderate")).toBe(50);
      expect(getRiskScoreFromSecurityLevel("High")).toBe(25);
      expect(getRiskScoreFromSecurityLevel("Very High")).toBe(0);
    });

    it("should return 50 for unknown levels", () => {
      expect(getRiskScoreFromSecurityLevel("Unknown" as SecurityLevel)).toBe(50);
    });
  });

  describe("getRiskSeverityDescription", () => {
    it("should return description for each risk level", () => {
      expect(getRiskSeverityDescription("Critical Risk")).toContain("Critical risk");
      expect(getRiskSeverityDescription("High Risk")).toContain("High risk");
      expect(getRiskSeverityDescription("Medium Risk")).toContain("Moderate risk");
      expect(getRiskSeverityDescription("Low Risk")).toContain("Low risk");
      expect(getRiskSeverityDescription("Minimal Risk")).toContain("Minimal risk");
    });

    it("should handle unknown risk levels", () => {
      expect(getRiskSeverityDescription("Unknown")).toBe("Unknown risk level");
    });
  });

  describe("calculateBusinessImpactLevel", () => {
    it("should calculate business impact level correctly", () => {
      expect(calculateBusinessImpactLevel("None", "None", "None")).toBe("Minimal");
      expect(calculateBusinessImpactLevel("Low", "Low", "Low")).toBe("Low");
      expect(calculateBusinessImpactLevel("Moderate", "Moderate", "Moderate")).toBe("Moderate");
      expect(calculateBusinessImpactLevel("High", "High", "High")).toBe("High");
      expect(calculateBusinessImpactLevel("Very High", "Very High", "Very High")).toBe("Very High");
    });

    it("should handle mixed security levels", () => {
      expect(calculateBusinessImpactLevel("Low", "Moderate", "High")).toBe("Moderate");
    });
  });

  describe("getImplementationComplexity", () => {
    it("should calculate implementation complexity", () => {
      expect(getImplementationComplexity("None", "None", "None")).toBe("Low");
      expect(getImplementationComplexity("Low", "Low", "Low")).toBe("Moderate");
      expect(getImplementationComplexity("Moderate", "Moderate", "Moderate")).toBe("Moderate");
      expect(getImplementationComplexity("High", "High", "High")).toBe("High");
      expect(getImplementationComplexity("Very High", "Very High", "Very High")).toBe("Very High");
    });

    it("should handle mixed security levels", () => {
      expect(getImplementationComplexity("None", "Low", "Moderate")).toBe("Moderate");
      expect(getImplementationComplexity("High", "Very High", "Very High")).toBe("Very High");
    });
  });

  describe("getHighestImpactArea", () => {
    it("should identify highest impact area", () => {
      const availabilityImpact = {
        operational: { riskLevel: "High Risk" },
        financial: { riskLevel: "Low Risk" },
      };
      const integrityImpact = {
        operational: { riskLevel: "Low Risk" },
        financial: { riskLevel: "Low Risk" },
      };
      const confidentialityImpact = {
        reputational: { riskLevel: "Low Risk" },
        regulatory: { riskLevel: "Low Risk" },
      };

      expect(getHighestImpactArea(availabilityImpact, integrityImpact, confidentialityImpact)).toBe("operational");
    });

    it("should return minimal when no high impact areas", () => {
      const availabilityImpact = {
        operational: { riskLevel: "Low Risk" },
        financial: { riskLevel: "Low Risk" },
      };
      const integrityImpact = {
        operational: { riskLevel: "Low Risk" },
        financial: { riskLevel: "Low Risk" },
      };
      const confidentialityImpact = {
        reputational: { riskLevel: "Low Risk" },
        regulatory: { riskLevel: "Low Risk" },
      };

      expect(getHighestImpactArea(availabilityImpact, integrityImpact, confidentialityImpact)).toBe("minimal");
    });

    it("should return multiple when more than 2 high impact areas", () => {
      const availabilityImpact = {
        operational: { riskLevel: "High Risk" },
        financial: { riskLevel: "High Risk" },
      };
      const integrityImpact = {
        operational: { riskLevel: "High Risk" },
        financial: { riskLevel: "Low Risk" },
      };
      const confidentialityImpact = {
        reputational: { riskLevel: "Low Risk" },
        regulatory: { riskLevel: "Low Risk" },
      };

      expect(getHighestImpactArea(availabilityImpact, integrityImpact, confidentialityImpact)).toBe("multiple");
    });
  });

  describe("getDefaultComponentImpact", () => {
    it("should return availability impact", () => {
      const result = getDefaultComponentImpact("availability", "High");
      expect(result.summary).toContain("availability");
      expect(result.operational).toBeDefined();
      expect(result.financial).toBeDefined();
    });

    it("should return integrity impact", () => {
      const result = getDefaultComponentImpact("integrity", "High");
      expect(result.summary).toContain("integrity");
      expect(result.operational).toBeDefined();
      expect(result.financial).toBeDefined();
    });

    it("should return confidentiality impact", () => {
      const result = getDefaultComponentImpact("confidentiality", "High");
      expect(result.summary).toContain("confidentiality");
      expect(result.reputational).toBeDefined();
      expect(result.regulatory).toBeDefined();
    });

    it("should handle low security levels differently", () => {
      const lowAvail = getDefaultComponentImpact("availability", "None");
      expect(lowAvail.operational.riskLevel).toBe("High Risk");

      const highAvail = getDefaultComponentImpact("availability", "High");
      expect(highAvail.operational.riskLevel).toBe("Low Risk");
    });
  });
});
