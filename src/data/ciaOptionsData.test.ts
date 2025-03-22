import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
    availabilityOptions,
    confidentialityOptions,
    integrityOptions,
    ROI_ESTIMATES,
} from "./ciaOptionsData";
import {
    availabilityData,
    confidentialityData,
    integrityData,
    roiEstimatesData,
} from "./security";

describe("CIA Options Data", () => {
  it("should export availability options for all security levels", () => {
    const securityLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    securityLevels.forEach((level) => {
      expect(availabilityOptions[level]).toBeDefined();
      expect(availabilityOptions[level]?.description).toBeTruthy();
    });
  });

  it("should export integrity options for all security levels", () => {
    const securityLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    securityLevels.forEach((level) => {
      expect(integrityOptions[level]).toBeDefined();
      expect(integrityOptions[level]?.description).toBeTruthy();
    });
  });

  it("should export confidentiality options for all security levels", () => {
    const securityLevels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

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
});
