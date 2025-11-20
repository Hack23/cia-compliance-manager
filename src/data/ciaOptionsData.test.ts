import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { ALL_SECURITY_LEVELS } from "../constants/securityLevels";
import {
    availabilityOptions,
    confidentialityOptions,
    integrityOptions,
    ROI_ESTIMATES,
    defaultCIADataProvider,
    getCIAOptionsForComponent,
    getImplementationDetails,
    getDefaultSLAMetrics,
    getDefaultPrivacyImpact,
    getDefaultValidationLevel,
    getDefaultErrorRate,
} from "./ciaOptionsData";
import {
    availabilityData,
    confidentialityData,
    integrityData,
    roiEstimatesData,
} from "./security";

describe("CIA Options Data", () => {
  const securityLevels = ALL_SECURITY_LEVELS;

  it("should export availability options for all security levels", () => {
    securityLevels.forEach((level) => {
      expect(availabilityOptions[level]).toBeDefined();
      expect(availabilityOptions[level]?.description).toBeTruthy();
    });
  });

  it("should export integrity options for all security levels", () => {
    securityLevels.forEach((level) => {
      expect(integrityOptions[level]).toBeDefined();
      expect(integrityOptions[level]?.description).toBeTruthy();
    });
  });

  it("should export confidentiality options for all security levels", () => {
    securityLevels.forEach((level) => {
      expect(confidentialityOptions[level]).toBeDefined();
      expect(confidentialityOptions[level]?.description).toBeTruthy();
    });
  });

  it("should export ROI estimates for all security levels", () => {
    const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

    levels.forEach((level) => {
      expect(ROI_ESTIMATES[level]).toBeDefined();
      expect(ROI_ESTIMATES[level].description).toBeTruthy();
    });
  });

  it("should include technical implementation details in options", () => {
    // Check that a specific field exists in at least one option
    expect(availabilityOptions["High"]?.technicalImplementation).toBeDefined();
  });

  it("should properly import and re-export data from security modules", () => {
    // Verify that the main ciaOptionsData exports reference the security module data
    expect(availabilityOptions).toBe(availabilityData);
    expect(integrityOptions).toBe(integrityData);
    expect(confidentialityOptions).toBe(confidentialityData);
    expect(ROI_ESTIMATES).toBe(roiEstimatesData);
  });

  describe("ROI Estimates", () => {
    it("should export ROI estimates", () => {
      const roiKeys = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"] as const;
      roiKeys.forEach((level) => {
        expect(ROI_ESTIMATES[level]).toBeDefined();
        expect(ROI_ESTIMATES[level].description).toBeTruthy();
      });
    });
  });

  it("should have availability options for each security level", () => {
    const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
    levels.forEach(level => {
      expect(availabilityOptions[level]).toBeDefined();
    });
  });

  it("should have integrity options for each security level", () => {
    const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
    levels.forEach(level => {
      expect(integrityOptions[level]).toBeDefined();
    });
  });

  it("should have confidentiality options for each security level", () => {
    const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
    levels.forEach(level => {
      expect(confidentialityOptions[level]).toBeDefined();
    });
  });

  it("should have valid ROI estimates", () => {
    expect(ROI_ESTIMATES).toHaveProperty("NONE");
    expect(ROI_ESTIMATES).toHaveProperty("VERY_HIGH");
  });

  describe("defaultCIADataProvider", () => {
    it("should export a default CIA data provider", () => {
      expect(defaultCIADataProvider).toBeDefined();
      expect(defaultCIADataProvider.availabilityOptions).toBeDefined();
      expect(defaultCIADataProvider.integrityOptions).toBeDefined();
      expect(defaultCIADataProvider.confidentialityOptions).toBeDefined();
      expect(defaultCIADataProvider.roiEstimates).toBeDefined();
    });

    it("should have value points functions", () => {
      expect(defaultCIADataProvider.getDefaultValuePoints).toBeDefined();
      expect(typeof defaultCIADataProvider.getDefaultValuePoints).toBe("function");
    });

    it("should have all security levels in availability options", () => {
      securityLevels.forEach((level) => {
        expect(defaultCIADataProvider.availabilityOptions[level]).toBeDefined();
      });
    });

    it("should have all security levels in integrity options", () => {
      securityLevels.forEach((level) => {
        expect(defaultCIADataProvider.integrityOptions[level]).toBeDefined();
      });
    });

    it("should have all security levels in confidentiality options", () => {
      securityLevels.forEach((level) => {
        expect(defaultCIADataProvider.confidentialityOptions[level]).toBeDefined();
      });
    });
  });

  describe("getCIAOptionsForComponent", () => {
    it("should return availability options for availability component", () => {
      const options = getCIAOptionsForComponent("availability");
      expect(options).toBeDefined();
      securityLevels.forEach((level) => {
        expect(options[level]).toBeDefined();
      });
    });

    it("should return integrity options for integrity component", () => {
      const options = getCIAOptionsForComponent("integrity");
      expect(options).toBeDefined();
      securityLevels.forEach((level) => {
        expect(options[level]).toBeDefined();
      });
    });

    it("should return confidentiality options for confidentiality component", () => {
      const options = getCIAOptionsForComponent("confidentiality");
      expect(options).toBeDefined();
      securityLevels.forEach((level) => {
        expect(options[level]).toBeDefined();
      });
    });
  });

  describe("getImplementationDetails", () => {
    it("should return implementation details for all components and levels", () => {
      const components: Array<"availability" | "integrity" | "confidentiality"> = [
        "availability",
        "integrity",
        "confidentiality",
      ];

      components.forEach((component) => {
        securityLevels.forEach((level) => {
          const details = getImplementationDetails(component, level);
          expect(details).toBeDefined();
          expect(details.effort).toBeDefined();
          expect(details.expertise).toBeDefined();
          expect(details.timeframe).toBeDefined();
          expect(typeof details.effort).toBe("string");
          expect(typeof details.expertise).toBe("string");
          expect(typeof details.timeframe).toBe("string");
        });
      });
    });

    it("should return increasing effort with higher security levels", () => {
      const effortOrder = ["Minimal", "Low", "Medium", "Significant", "Extensive"];
      securityLevels.forEach((level, index) => {
        const details = getImplementationDetails("availability", level);
        expect(details.effort).toBe(effortOrder[index]);
      });
    });

    it("should include component-specific expertise modifiers", () => {
      const availDetails = getImplementationDetails("availability", "High");
      const intDetails = getImplementationDetails("integrity", "High");
      const confDetails = getImplementationDetails("confidentiality", "High");

      expect(availDetails.expertise).toContain("infrastructure focus");
      expect(intDetails.expertise).toContain("data management focus");
      expect(confDetails.expertise).toContain("security focus");
    });
  });

  describe("getDefaultSLAMetrics", () => {
    it("should return SLA metrics for all security levels", () => {
      securityLevels.forEach((level) => {
        const metrics = getDefaultSLAMetrics(level);
        expect(metrics).toBeDefined();
        expect(metrics.uptime).toBeDefined();
        expect(metrics.rto).toBeDefined();
        expect(metrics.rpo).toBeDefined();
        expect(metrics.mttr).toBeDefined();
        expect(metrics.sla).toBeDefined();
      });
    });

    it("should return appropriate SLA values for None level", () => {
      const metrics = getDefaultSLAMetrics("None");
      expect(metrics.uptime).toBe("Best effort");
      expect(metrics.sla).toBe("No SLA");
    });

    it("should return appropriate SLA values for Very High level", () => {
      const metrics = getDefaultSLAMetrics("Very High");
      expect(metrics.uptime).toContain("99.999%");
      expect(metrics.sla).toContain("24/7");
    });

    it("should handle invalid security level", () => {
      const metrics = getDefaultSLAMetrics("Invalid" as SecurityLevel);
      expect(metrics.uptime).toBe("Unknown");
      expect(metrics.rto).toBe("Unknown");
    });
  });

  describe("getDefaultPrivacyImpact", () => {
    it("should return privacy impact for all security levels", () => {
      securityLevels.forEach((level) => {
        const impact = getDefaultPrivacyImpact(level);
        expect(impact).toBeDefined();
        expect(typeof impact).toBe("string");
        expect(impact.length).toBeGreaterThan(0);
      });
    });

    it("should return appropriate privacy impact for None level", () => {
      const impact = getDefaultPrivacyImpact("None");
      expect(impact).toBe("No Privacy Controls");
    });

    it("should return appropriate privacy impact for Very High level", () => {
      const impact = getDefaultPrivacyImpact("Very High");
      expect(impact).toBe("Maximum Privacy Controls");
    });

    it("should handle invalid security level", () => {
      const impact = getDefaultPrivacyImpact("Invalid" as SecurityLevel);
      expect(impact).toBe("Unknown Privacy Impact");
    });
  });

  describe("getDefaultValidationLevel", () => {
    it("should return validation level for all security levels", () => {
      securityLevels.forEach((level) => {
        const validation = getDefaultValidationLevel(level);
        expect(validation).toBeDefined();
        expect(typeof validation).toBe("string");
        expect(validation.length).toBeGreaterThan(0);
      });
    });

    it("should return appropriate validation level for None", () => {
      const validation = getDefaultValidationLevel("None");
      expect(validation).toBe("No Validation");
    });

    it("should return appropriate validation level for Very High", () => {
      const validation = getDefaultValidationLevel("Very High");
      expect(validation).toBe("Comprehensive");
    });

    it("should handle invalid security level", () => {
      const validation = getDefaultValidationLevel("Invalid" as SecurityLevel);
      expect(validation).toBe("Unknown");
    });
  });

  describe("getDefaultErrorRate", () => {
    it("should return error rate for all security levels", () => {
      securityLevels.forEach((level) => {
        const errorRate = getDefaultErrorRate(level);
        expect(errorRate).toBeDefined();
        expect(typeof errorRate).toBe("string");
        expect(errorRate.length).toBeGreaterThan(0);
      });
    });

    it("should return appropriate error rate for None", () => {
      const errorRate = getDefaultErrorRate("None");
      expect(errorRate).toBe("Not monitored");
    });

    it("should return appropriate error rate for Very High", () => {
      const errorRate = getDefaultErrorRate("Very High");
      expect(errorRate).toBe("< 0.01%");
    });

    it("should return decreasing error rates with higher security levels", () => {
      const lowRate = getDefaultErrorRate("Low");
      const highRate = getDefaultErrorRate("High");
      expect(lowRate).toContain("5%");
      expect(highRate).toContain("1%");
    });

    it("should handle invalid security level", () => {
      const errorRate = getDefaultErrorRate("Invalid" as SecurityLevel);
      expect(errorRate).toBe("Unknown");
    });
  });
});
