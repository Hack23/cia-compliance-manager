import { beforeEach, describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../types/cia";
import { createTestSecurityMetricsService } from "../utils/serviceTestUtils";
import { SecurityMetricsService } from "./securityMetricsService";

// Convert from hoisted to a regular object
const mockCIAOptions = {
  availabilityOptions: {
    None: {
      description: "No availability controls",
      impact: "Critical business impact",
      capex: 0,
      opex: 0,
    },
    Low: {
      description: "Basic availability controls",
      impact: "High business impact",
      capex: 5000,
      opex: 1000,
    },
    Moderate: {
      description: "Standard availability controls",
      impact: "Medium business impact",
      capex: 15000,
      opex: 3000,
    },
    High: {
      description: "Advanced availability controls",
      impact: "Low business impact",
      capex: 30000,
      opex: 6000,
    },
    "Very High": {
      description: "Maximum availability controls",
      impact: "Minimal business impact",
      capex: 60000,
      opex: 12000,
    },
  },
  integrityOptions: {
    None: {
      description: "No integrity controls",
      impact: "Critical business impact",
      capex: 0,
      opex: 0,
    },
    Low: {
      description: "Basic integrity controls",
      impact: "High business impact",
      capex: 5000,
      opex: 1000,
    },
    Moderate: {
      description: "Standard integrity controls",
      impact: "Medium business impact",
      capex: 15000,
      opex: 3000,
    },
    High: {
      description: "Advanced integrity controls",
      impact: "Low business impact",
      capex: 30000,
      opex: 6000,
    },
    "Very High": {
      description: "Maximum integrity controls",
      impact: "Minimal business impact",
      capex: 60000,
      opex: 12000,
    },
  },
  confidentialityOptions: {
    None: {
      description: "No confidentiality controls",
      impact: "Critical business impact",
      capex: 0,
      opex: 0,
    },
    Low: {
      description: "Basic confidentiality controls",
      impact: "High business impact",
      capex: 7000,
      opex: 1400,
    },
    Moderate: {
      description: "Standard confidentiality controls",
      impact: "Medium business impact",
      capex: 20000,
      opex: 4000,
    },
    High: {
      description: "Advanced confidentiality controls",
      impact: "Low business impact",
      capex: 40000,
      opex: 8000,
    },
    "Very High": {
      description: "Maximum confidentiality controls",
      impact: "Minimal business impact",
      capex: 80000,
      opex: 16000,
    },
  },
  ROI_ESTIMATES: {
    NONE: {
      returnRate: "0%",
      description: "No return on investment",
    },
    LOW: {
      returnRate: "50%",
      description: "Low return on investment",
    },
    MODERATE: {
      returnRate: "200%",
      description: "Moderate return on investment",
    },
    HIGH: {
      returnRate: "350%",
      description: "High return on investment",
    },
    VERY_HIGH: {
      returnRate: "500%",
      description: "Very high return on investment",
    },
  },
};

// Add mocked security levels for testing
const mockSecurityLevels = {
  availabilityLevel: "Moderate" as SecurityLevel,
  integrityLevel: "Moderate" as SecurityLevel,
  confidentialityLevel: "Moderate" as SecurityLevel,
};

describe("SecurityMetricsService", () => {
  let service: SecurityMetricsService;

  beforeEach(() => {
    service = createTestSecurityMetricsService();
  });

  describe("calculateRoi", () => {
    it("should calculate ROI metrics based on security level and implementation cost", () => {
      const roi = service.calculateRoi("Moderate" as SecurityLevel, 10000);

      expect(roi).toHaveProperty("value");
      expect(roi).toHaveProperty("percentage");
      expect(roi).toHaveProperty("description");

      // ROI value should be a string representing currency
      expect(roi.value).toMatch(/\$[0-9,]+/);

      // ROI percentage should be a string with % sign
      expect(roi.percentage).toMatch(/[0-9]+%/);

      // Description should mention ROI or return
      expect(roi.description.toLowerCase()).toContain("return");
    });

    it("should return zero ROI for None security level", () => {
      const roi = service.calculateRoi("None" as SecurityLevel, 10000);

      expect(roi.value).toBe("$0");
      expect(roi.percentage).toBe("0%");
    });

    it("should handle zero implementation cost", () => {
      const roi = service.calculateRoi("High" as SecurityLevel, 0);

      expect(roi.value).toBe("$0");
      expect(roi.percentage).toBe("0%");
    });

    it("should calculate higher ROI for higher security levels", () => {
      const lowRoi = service.calculateRoi("Low" as SecurityLevel, 10000);
      const moderateRoi = service.calculateRoi(
        "Moderate" as SecurityLevel,
        10000
      );
      const highRoi = service.calculateRoi("High" as SecurityLevel, 10000);

      // Extract numeric values from the ROI percentages
      const lowValue = parseInt(lowRoi.percentage);
      const moderateValue = parseInt(moderateRoi.percentage);
      const highValue = parseInt(highRoi.percentage);

      expect(moderateValue).toBeGreaterThan(lowValue);
      expect(highValue).toBeGreaterThan(moderateValue);
    });
  });

  describe("getROIEstimates", () => {
    it("should return ROI estimates for different security levels", () => {
      const estimates = service.getROIEstimates();

      expect(estimates).toHaveProperty("NONE");
      expect(estimates).toHaveProperty("LOW");
      expect(estimates).toHaveProperty("MODERATE");
      expect(estimates).toHaveProperty("HIGH");
      expect(estimates).toHaveProperty("VERY_HIGH");

      // Each estimate should have return rate and description
      Object.values(estimates).forEach((estimate) => {
        expect(estimate).toHaveProperty("returnRate");
        expect(estimate).toHaveProperty("description");
      });
    });
  });

  describe("getSecurityMetrics", () => {
    it("should calculate security metrics for selected security levels", () => {
      const metrics = service.getSecurityMetrics(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(metrics).toHaveProperty("score");
      expect(metrics).toHaveProperty("maxScore");
      expect(metrics).toHaveProperty("percentage");
      expect(metrics).toHaveProperty("totalCapex");
      expect(metrics).toHaveProperty("totalOpex");
      expect(metrics).toHaveProperty("totalCost");
      expect(metrics).toHaveProperty("riskReduction");

      // Score should be numeric and percentage should be a string with % sign
      expect(typeof metrics.score).toBe("number");
      expect(metrics.percentage).toMatch(/[0-9]+%/);

      // Cost properties should be numeric
      expect(typeof metrics.totalCapex).toBe("number");
      expect(typeof metrics.totalOpex).toBe("number");
      expect(typeof metrics.totalCost).toBe("number");

      // Risk reduction should be a string with % sign
      expect(metrics.riskReduction).toMatch(/[0-9]+%/);
    });

    it("should default to availability level when other levels are not provided", () => {
      const metrics = service.getSecurityMetrics("Moderate" as SecurityLevel);

      // The result should be the same as if all levels were set to Moderate
      const fullMetrics = service.getSecurityMetrics(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(metrics.score).toBe(fullMetrics.score);
      expect(metrics.totalCapex).toBe(fullMetrics.totalCapex);
      expect(metrics.totalOpex).toBe(fullMetrics.totalOpex);
    });

    it("should calculate higher scores for higher security levels", () => {
      const lowMetrics = service.getSecurityMetrics(
        "Low" as SecurityLevel,
        "Low" as SecurityLevel,
        "Low" as SecurityLevel
      );

      const highMetrics = service.getSecurityMetrics(
        "High" as SecurityLevel,
        "High" as SecurityLevel,
        "High" as SecurityLevel
      );

      expect(highMetrics.score).toBeGreaterThan(lowMetrics.score);
    });

    it("should calculate correct total cost based on component costs", () => {
      // Mock getComponentDetails to return known values
      vi.spyOn(service as any, "getComponentDetails").mockImplementation(
        (component, level) => {
          return {
            capex: 100,
            opex: 50,
          };
        }
      );

      const metrics = service.getSecurityMetrics(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(metrics.totalCapex).toBe(300); // 100 * 3 components
      expect(metrics.totalOpex).toBe(150); // 50 * 3 components
      expect(metrics.totalCost).toBe(450); // 300 + 150
    });
  });

  describe("getComponentMetrics", () => {
    it("should return metrics for a specific component and security level", () => {
      const metrics = service.getComponentMetrics(
        "availability",
        "Moderate" as SecurityLevel
      );

      expect(metrics).toHaveProperty("component", "availability");
      expect(metrics).toHaveProperty("level", "Moderate");
      expect(metrics).toHaveProperty("value");
      expect(metrics).toHaveProperty("percentage");
      expect(metrics).toHaveProperty("description");
      expect(metrics).toHaveProperty("capex");
      expect(metrics).toHaveProperty("opex");

      // Value should be numeric and percentage should be a string
      expect(typeof metrics.value).toBe("number");
      expect(metrics.percentage).toMatch(/[0-9]+%/);
    });

    it("should handle missing component details", () => {
      // Mock getComponentDetails to return undefined
      vi.spyOn(service as any, "getComponentDetails").mockReturnValueOnce(
        undefined
      );

      const metrics = service.getComponentMetrics(
        "availability",
        "Moderate" as SecurityLevel
      );

      // Should still return metrics with default values
      expect(metrics).toHaveProperty("component", "availability");
      expect(metrics).toHaveProperty("level", "Moderate");
      expect(metrics).toHaveProperty("description");
      expect(metrics.description).toContain("Moderate availability");
      expect(metrics.capex).toBe(0);
      expect(metrics.opex).toBe(0);
    });
  });

  describe("getComponentTechnicalMetrics", () => {
    it("should return technical metrics for a component", () => {
      const metrics = service.getComponentTechnicalMetrics(
        "availability",
        "Moderate" as SecurityLevel
      );

      expect(typeof metrics).toBe("object");
      expect(metrics).toHaveProperty("component", "availability");
      expect(metrics).toHaveProperty("level", "Moderate");

      // All values should be strings
      Object.values(metrics).forEach((value) => {
        expect(typeof value).toBe("string");
      });
    });
  });

  describe("getImpactMetrics", () => {
    it("should return impact metrics for a component", () => {
      const metrics = service.getImpactMetrics(
        "availability",
        "Moderate" as SecurityLevel
      );

      expect(metrics).toHaveProperty("securityLevel", "Moderate");
      expect(metrics).toHaveProperty("riskReduction");
      expect(metrics).toHaveProperty("description");
      expect(metrics).toHaveProperty("technical");
      expect(metrics).toHaveProperty("businessImpact");

      // Should include availability-specific metrics
      expect(metrics).toHaveProperty("uptime");
      expect(metrics).toHaveProperty("rto");
      expect(metrics).toHaveProperty("rpo");
      expect(metrics).toHaveProperty("mttr");
    });

    it("should return integrity-specific metrics", () => {
      const metrics = service.getImpactMetrics(
        "integrity",
        "Moderate" as SecurityLevel
      );

      expect(metrics).toHaveProperty("validationMethod");
    });

    it("should return confidentiality-specific metrics", () => {
      const metrics = service.getImpactMetrics(
        "confidentiality",
        "Moderate" as SecurityLevel
      );

      expect(metrics).toHaveProperty("protectionMethod");
    });

    it("should handle missing component details", () => {
      // Mock getComponentDetails to return undefined
      vi.spyOn(service as any, "getComponentDetails").mockReturnValueOnce(
        undefined
      );

      const metrics = service.getImpactMetrics(
        "availability",
        "Moderate" as SecurityLevel
      );

      // Should still return metrics with default values
      expect(metrics).toHaveProperty("securityLevel", "Moderate");
      expect(metrics).toHaveProperty("technical");
      expect(metrics.technical).toContain("Standard Moderate implementation");
      expect(metrics).toHaveProperty("businessImpact");
      expect(metrics.businessImpact).toContain("Business impact not provided");
    });
  });

  describe("getSecurityLevelDescription", () => {
    it("should return appropriate descriptions for each security level", () => {
      expect(
        service.getSecurityLevelDescription("None" as SecurityLevel)
      ).toContain("No security controls");

      expect(
        service.getSecurityLevelDescription("Low" as SecurityLevel)
      ).toContain("Basic security controls");

      expect(
        service.getSecurityLevelDescription("Moderate" as SecurityLevel)
      ).toContain("Standard security controls");

      expect(
        service.getSecurityLevelDescription("High" as SecurityLevel)
      ).toContain("Robust security controls");

      expect(
        service.getSecurityLevelDescription("Very High" as SecurityLevel)
      ).toContain("Maximum security controls");
    });
  });

  describe("getProtectionLevel", () => {
    it("should return appropriate protection levels for each security level", () => {
      expect(service.getProtectionLevel("None" as SecurityLevel)).toBe(
        "No Protection"
      );
      expect(service.getProtectionLevel("Low" as SecurityLevel)).toBe(
        "Basic Protection"
      );
      expect(service.getProtectionLevel("Moderate" as SecurityLevel)).toBe(
        "Balanced Protection"
      );
      expect(service.getProtectionLevel("High" as SecurityLevel)).toBe(
        "Strong Protection"
      );
      expect(service.getProtectionLevel("Very High" as SecurityLevel)).toBe(
        "Maximum Protection"
      );
    });
  });

  describe("getSecurityIcon", () => {
    it("should return appropriate icons for each security level", () => {
      expect(service.getSecurityIcon("None" as SecurityLevel)).toBe("⚠️");
      expect(service.getSecurityIcon("Low" as SecurityLevel)).toBe("🔑");
      expect(service.getSecurityIcon("Moderate" as SecurityLevel)).toBe("🔓");
      expect(service.getSecurityIcon("High" as SecurityLevel)).toBe("🔒");
      expect(service.getSecurityIcon("Very High" as SecurityLevel)).toBe("🔐");
    });
  });

  describe("getSecurityLevelFromValue", () => {
    it("should return appropriate security levels for numeric values", () => {
      expect(service.getSecurityLevelFromValue(0)).toBe("None");
      expect(service.getSecurityLevelFromValue(1)).toBe("Low");
      expect(service.getSecurityLevelFromValue(2)).toBe("Moderate");
      expect(service.getSecurityLevelFromValue(3)).toBe("High");
      expect(service.getSecurityLevelFromValue(4)).toBe("Very High");
    });

    it("should default to None for invalid values", () => {
      expect(service.getSecurityLevelFromValue(-1)).toBe("None");
      expect(service.getSecurityLevelFromValue(5)).toBe("None");
    });
  });

  describe("calculateSecurityScore", () => {
    it("should calculate security score based on security levels", () => {
      // For Low security levels (value = 1)
      // Score = (1 + 1 + 1) / 12 * 100 = 25
      expect(
        service.calculateSecurityScore(
          "Low" as SecurityLevel,
          "Low" as SecurityLevel,
          "Low" as SecurityLevel
        )
      ).toBe(25);

      // For Moderate security levels (value = 2)
      // Score = (2 + 2 + 2) / 12 * 100 = 50
      expect(
        service.calculateSecurityScore(
          "Moderate" as SecurityLevel,
          "Moderate" as SecurityLevel,
          "Moderate" as SecurityLevel
        )
      ).toBe(50);

      // For High security levels (value = 3)
      // Score = (3 + 3 + 3) / 12 * 100 = 75
      expect(
        service.calculateSecurityScore(
          "High" as SecurityLevel,
          "High" as SecurityLevel,
          "High" as SecurityLevel
        )
      ).toBe(75);

      // For Very High security levels (value = 4)
      // Score = (4 + 4 + 4) / 12 * 100 = 100
      expect(
        service.calculateSecurityScore(
          "Very High" as SecurityLevel,
          "Very High" as SecurityLevel,
          "Very High" as SecurityLevel
        )
      ).toBe(100);
    });

    it("should calculate security score for mixed security levels", () => {
      // For mixed security levels (values = 0, 2, 4)
      // Score = (0 + 2 + 4) / 12 * 100 = 50
      expect(
        service.calculateSecurityScore(
          "None" as SecurityLevel,
          "Moderate" as SecurityLevel,
          "Very High" as SecurityLevel
        )
      ).toBe(50);
    });
  });
});
