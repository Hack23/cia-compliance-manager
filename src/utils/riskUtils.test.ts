import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { BusinessImpactDetails } from "../types/cia-services";
import {
  calculateBusinessImpactLevel,
  calculateCombinedRiskLevel,
  calculateRiskScore,
  createBusinessImpact,
  formatRiskLevel,
  getDefaultBusinessImpact,
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
    it("should return business impact for Low security level", () => {
      const result = getDefaultBusinessImpact("availability", "Low");
      expect(result).toBeDefined();
      expect(result.summary).toContain("availability");
      expect(result.summary).toContain("Low");
      expect(result.financial).toBeDefined();
      expect(result.operational).toBeDefined();
    });

    it.each([
      ["None" as SecurityLevel],
      ["Low" as SecurityLevel],
      ["Moderate" as SecurityLevel],
      ["High" as SecurityLevel],
      ["Very High" as SecurityLevel],
    ])("should handle %s security level", (level) => {
      const result = getDefaultBusinessImpact("integrity", level);
      expect(result).toBeDefined();
      expect(result.summary).toContain("integrity");
      expect(result.summary).toContain(level);
      expect(result.financial).toBeDefined();
      expect(result.operational).toBeDefined();
    });

    it("should work for confidentiality component", () => {
      const result = getDefaultBusinessImpact("confidentiality", "High");
      expect(result).toBeDefined();
      expect(result.summary).toContain("confidentiality");
      expect(result.summary).toContain("High");
      expect(result.financial).toBeDefined();
      expect(result.operational).toBeDefined();
      expect(result.reputational).toBeDefined();
    });
  });

  describe("legacy function mappings", () => {
    it("should export getSLAMetrics", () => {
      const metrics = getSLAMetrics("High");
      expect(metrics).toBeDefined();
      expect(metrics.uptime).toBeDefined();
      expect(metrics.rto).toBeDefined();
      expect(metrics.rpo).toBeDefined();
    });

    it("should export getPrivacyImpact", () => {
      const impact = getPrivacyImpact("High");
      expect(impact).toBeDefined();
      expect(impact).toContain("Privacy");
    });

    it("should export getValidationLevel", () => {
      const validation = getValidationLevel("High");
      expect(validation).toBeDefined();
      expect(typeof validation).toBe("string");
      expect(validation).toBe("Enhanced");
    });

    it("should export getErrorRate", () => {
      const errorRate = getErrorRate("High");
      expect(errorRate).toBeDefined();
      expect(typeof errorRate).toBe("string");
      expect(errorRate).toBe("< 1%");
    });

    it("should export createBusinessImpact", () => {
      const impact = createBusinessImpact("availability", "Moderate");
      expect(impact).toBeDefined();
      expect(impact.summary).toContain("availability");
      expect(impact.summary).toContain("Moderate");
    });
  });

  describe("formatRiskLevel", () => {
    it("should format risk levels correctly", () => {
      expect(formatRiskLevel("critical risk")).toBe("Critical Risk");
      expect(formatRiskLevel("HIGH RISK")).toBe("High Risk");
      expect(formatRiskLevel("medium risk")).toBe("Medium Risk");
      expect(formatRiskLevel("low risk")).toBe("Low Risk");
      expect(formatRiskLevel("minimal risk")).toBe("Minimal Risk");
    });

    it("should handle empty string", () => {
      expect(formatRiskLevel("")).toBe("Unknown Risk");
    });

    it("should handle undefined or null", () => {
      expect(formatRiskLevel(null as any)).toBe("Unknown Risk");
      expect(formatRiskLevel(undefined as any)).toBe("Unknown Risk");
    });

    it("should handle mixed case input", () => {
      expect(formatRiskLevel("CrItIcAl RiSk")).toBe("Critical Risk");
    });
  });

  describe("getRiskLevelFromImpactLevel", () => {
    it("should return correct risk level for impact levels", () => {
      expect(getRiskLevelFromImpactLevel("Minimal")).toBe("Low Risk");
      expect(getRiskLevelFromImpactLevel("Low")).toBe("Low Risk");
      expect(getRiskLevelFromImpactLevel("Moderate")).toBe("Low Risk");
      expect(getRiskLevelFromImpactLevel("High")).toBe("High Risk");
      expect(getRiskLevelFromImpactLevel("Very High")).toBe("High Risk");
    });

    it("should return Unknown Risk for invalid impact level", () => {
      expect(getRiskLevelFromImpactLevel("Invalid")).toBe("Unknown Risk");
      expect(getRiskLevelFromImpactLevel("")).toBe("Unknown Risk");
    });
  });

  describe("parseRiskLevel", () => {
    it("should convert risk level to lowercase", () => {
      expect(parseRiskLevel("Critical Risk")).toBe("critical risk");
      expect(parseRiskLevel("HIGH RISK")).toBe("high risk");
      expect(parseRiskLevel("Medium Risk")).toBe("medium risk");
    });

    it("should handle null and undefined", () => {
      expect(parseRiskLevel(null as any)).toBe("");
      expect(parseRiskLevel(undefined as any)).toBe("");
    });

    it("should handle empty string", () => {
      expect(parseRiskLevel("")).toBe("");
    });
  });

  describe("calculateCombinedRiskLevel", () => {
    it("should return highest priority risk level", () => {
      expect(
        calculateCombinedRiskLevel(["Low Risk", "High Risk", "Medium Risk"])
      ).toBe("High Risk");
      expect(
        calculateCombinedRiskLevel(["Critical Risk", "High Risk"])
      ).toBe("Critical Risk");
      expect(calculateCombinedRiskLevel(["Low Risk", "Minimal Risk"])).toBe(
        "Low Risk"
      );
    });

    it("should handle empty array", () => {
      expect(calculateCombinedRiskLevel([])).toBe("Unknown Risk");
    });

    it("should handle null or undefined", () => {
      expect(calculateCombinedRiskLevel(null as any)).toBe("Unknown Risk");
      expect(calculateCombinedRiskLevel(undefined as any)).toBe("Unknown Risk");
    });

    it("should handle single risk level", () => {
      expect(calculateCombinedRiskLevel(["Medium Risk"])).toBe("Medium Risk");
    });

    it("should handle case insensitive matching", () => {
      expect(
        calculateCombinedRiskLevel(["LOW RISK", "high risk", "Critical Risk"])
      ).toBe("Critical Risk");
    });
  });

  describe("getFormattedRiskLevel", () => {
    it("should format risk level with proper capitalization", () => {
      expect(getFormattedRiskLevel("critical risk")).toBe("Critical Risk");
      expect(getFormattedRiskLevel("HIGH RISK")).toBe("High Risk");
      expect(getFormattedRiskLevel("medium risk")).toBe("Medium Risk");
    });

    it("should handle empty string", () => {
      expect(getFormattedRiskLevel("")).toBe("Unknown Risk");
    });

    it("should handle null or undefined", () => {
      expect(getFormattedRiskLevel(null as any)).toBe("Unknown Risk");
      expect(getFormattedRiskLevel(undefined as any)).toBe("Unknown Risk");
    });
  });

  describe("getRiskBadgeVariant", () => {
    it("should return correct badge variant", () => {
      expect(getRiskBadgeVariant("Critical Risk")).toBe("error");
      expect(getRiskBadgeVariant("High Risk")).toBe("warning");
      expect(getRiskBadgeVariant("Medium Risk")).toBe("info");
      expect(getRiskBadgeVariant("Low Risk")).toBe("success");
      expect(getRiskBadgeVariant("Minimal Risk")).toBe("success");
    });

    it("should handle unknown risk level", () => {
      expect(getRiskBadgeVariant("Unknown Risk")).toBe("neutral");
    });
  });

  describe("getRiskScoreFromSecurityLevel", () => {
    it("should return correct risk score for each security level", () => {
      expect(getRiskScoreFromSecurityLevel("None")).toBe(100);
      expect(getRiskScoreFromSecurityLevel("Low")).toBe(75);
      expect(getRiskScoreFromSecurityLevel("Moderate")).toBe(50);
      expect(getRiskScoreFromSecurityLevel("High")).toBe(25);
      expect(getRiskScoreFromSecurityLevel("Very High")).toBe(0);
    });

    it("should return default score for unknown level", () => {
      expect(getRiskScoreFromSecurityLevel("Unknown" as SecurityLevel)).toBe(50);
    });
  });

  describe("getRiskSeverityDescription", () => {
    it("should return description for critical risk", () => {
      const desc = getRiskSeverityDescription("Critical Risk");
      expect(desc).toContain("Critical risk");
      expect(desc).toContain("immediate attention");
    });

    it("should return description for high risk", () => {
      const desc = getRiskSeverityDescription("High Risk");
      expect(desc).toContain("High risk");
      expect(desc).toContain("prompt remediation");
    });

    it("should return description for medium risk", () => {
      const desc = getRiskSeverityDescription("Medium Risk");
      expect(desc).toContain("Moderate risk");
      expect(desc).toContain("planned remediation");
    });

    it("should return description for low risk", () => {
      const desc = getRiskSeverityDescription("Low Risk");
      expect(desc).toContain("Low risk");
      expect(desc).toContain("monitored");
    });

    it("should return description for minimal risk", () => {
      const desc = getRiskSeverityDescription("Minimal Risk");
      expect(desc).toContain("Minimal risk");
      expect(desc).toContain("acceptable");
    });

    it("should return default for unknown risk", () => {
      expect(getRiskSeverityDescription("Unknown")).toBe("Unknown risk level");
    });
  });

  describe("calculateBusinessImpactLevel", () => {
    it("should calculate business impact level correctly", () => {
      expect(
        calculateBusinessImpactLevel("None", "None", "None")
      ).toBe("Minimal");
      expect(
        calculateBusinessImpactLevel("Low", "Low", "Low")
      ).toBe("Low");
      expect(
        calculateBusinessImpactLevel("Moderate", "Moderate", "Moderate")
      ).toBe("Moderate");
      expect(
        calculateBusinessImpactLevel("High", "High", "High")
      ).toBe("High");
      expect(
        calculateBusinessImpactLevel("Very High", "Very High", "Very High")
      ).toBe("Very High");
    });

    it("should handle mixed security levels", () => {
      expect(
        calculateBusinessImpactLevel("Low", "Moderate", "High")
      ).toBe("Moderate");
      expect(
        calculateBusinessImpactLevel("None", "Low", "Low")
      ).toBe("Low");
    });

    it("should round to appropriate level", () => {
      expect(
        calculateBusinessImpactLevel("Moderate", "High", "High")
      ).toBe("High");
      expect(
        calculateBusinessImpactLevel("Low", "Low", "Moderate")
      ).toBe("Low");
    });
  });

  describe("getImplementationComplexity", () => {
    it("should return Low complexity for low security levels", () => {
      expect(
        getImplementationComplexity("None", "None", "Low")
      ).toBe("Low");
    });

    it("should return Moderate complexity for moderate security levels", () => {
      expect(
        getImplementationComplexity("Low", "Moderate", "Moderate")
      ).toBe("Moderate");
    });

    it("should return High complexity for high security levels", () => {
      expect(
        getImplementationComplexity("Moderate", "High", "High")
      ).toBe("High");
    });

    it("should return Very High complexity for very high security levels", () => {
      expect(
        getImplementationComplexity("High", "Very High", "Very High")
      ).toBe("Very High");
    });

    it("should handle mixed security levels", () => {
      expect(
        getImplementationComplexity("None", "Moderate", "High")
      ).toBe("Moderate");
    });
  });

  describe("getHighestImpactArea", () => {
    it("should identify operational as highest impact", () => {
      const availImpact = {
        operational: { riskLevel: "High Risk", description: "High operational risk" },
        financial: { riskLevel: "Low Risk", description: "Low financial risk" },
      };
      const integImpact = {
        operational: { riskLevel: "Low Risk", description: "Low operational risk" },
        financial: { riskLevel: "Low Risk", description: "Low financial risk" },
      };
      const confImpact = {
        reputational: { riskLevel: "Low Risk", description: "Low reputational risk" },
        regulatory: { riskLevel: "Low Risk", description: "Low regulatory risk" },
      };

      const result = getHighestImpactArea(
        availImpact,
        integImpact,
        confImpact
      );
      expect(result).toBe("operational");
    });

    it("should identify financial as highest impact", () => {
      const availImpact = {
        operational: { riskLevel: "Low Risk", description: "Low operational risk" },
        financial: { riskLevel: "High Risk", description: "High financial risk" },
      };
      const integImpact = {
        operational: { riskLevel: "Low Risk", description: "Low operational risk" },
        financial: { riskLevel: "Low Risk", description: "Low financial risk" },
      };
      const confImpact = {
        reputational: { riskLevel: "Low Risk", description: "Low reputational risk" },
        regulatory: { riskLevel: "Low Risk", description: "Low regulatory risk" },
      };

      const result = getHighestImpactArea(
        availImpact,
        integImpact,
        confImpact
      );
      expect(result).toBe("financial");
    });

    it("should return minimal for no high impact areas", () => {
      const availImpact = {
        operational: { riskLevel: "Low Risk", description: "Low operational risk" },
        financial: { riskLevel: "Low Risk", description: "Low financial risk" },
      };
      const integImpact = {
        operational: { riskLevel: "Low Risk", description: "Low operational risk" },
        financial: { riskLevel: "Low Risk", description: "Low financial risk" },
      };
      const confImpact = {
        reputational: { riskLevel: "Low Risk", description: "Low reputational risk" },
        regulatory: { riskLevel: "Low Risk", description: "Low regulatory risk" },
      };

      const result = getHighestImpactArea(
        availImpact,
        integImpact,
        confImpact
      );
      expect(result).toBe("minimal");
    });

    it("should handle multiple high impact areas", () => {
      const availImpact = {
        operational: { riskLevel: "High Risk", description: "High operational risk" },
        financial: { riskLevel: "High Risk", description: "High financial risk" },
      };
      const integImpact = {
        operational: { riskLevel: "High Risk", description: "High operational risk" },
        financial: { riskLevel: "Low Risk", description: "Low financial risk" },
      };
      const confImpact = {
        reputational: { riskLevel: "Low Risk", description: "Low reputational risk" },
        regulatory: { riskLevel: "Low Risk", description: "Low regulatory risk" },
      };

      const result = getHighestImpactArea(
        availImpact,
        integImpact,
        confImpact
      );
      // Implementation doesn't deduplicate, so 3 items (operational, financial, operational) = "multiple"
      expect(result).toBe("multiple");
    });

    it("should return multiple for more than 2 high impact areas", () => {
      const availImpact = {
        operational: { riskLevel: "High Risk", description: "High operational risk" },
        financial: { riskLevel: "High Risk", description: "High financial risk" },
      };
      const integImpact = {
        operational: { riskLevel: "High Risk", description: "High operational risk" },
        financial: { riskLevel: "High Risk", description: "High financial risk" },
      };
      const confImpact = {
        reputational: { riskLevel: "Low Risk", description: "Low reputational risk" },
        regulatory: { riskLevel: "Low Risk", description: "Low regulatory risk" },
      };

      const result = getHighestImpactArea(
        availImpact,
        integImpact,
        confImpact
      );
      expect(result).toBe("multiple");
    });

    it("should handle undefined or null impact objects", () => {
      const result = getHighestImpactArea(
        {} as BusinessImpactDetails,
        {} as BusinessImpactDetails,
        {} as BusinessImpactDetails
      );
      expect(result).toBe("minimal");
    });
  });

  describe("securityLevelToValue", () => {
    it("should convert security levels to correct numeric values", () => {
      expect(securityLevelToValue("None")).toBe(0);
      expect(securityLevelToValue("Low")).toBe(1);
      expect(securityLevelToValue("Moderate")).toBe(2);
      expect(securityLevelToValue("High")).toBe(3);
      expect(securityLevelToValue("Very High")).toBe(4);
    });

    it("should return 0 for invalid security level", () => {
      expect(securityLevelToValue("Invalid" as SecurityLevel)).toBe(0);
    });
  });
});
