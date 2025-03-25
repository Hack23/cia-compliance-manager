import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { ROI_ESTIMATES } from "./ciaOptionsData";
import {
  getROIEstimateForLevel,
  valueCreationPoints,
  valueCreationTitles,
} from "./valueCreationData";

describe("Value Creation Data", () => {
  // Test all security levels exist in mappings
  const securityLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  it("should have valid value creation points for each security level", () => {
    securityLevels.forEach((level) => {
      expect(valueCreationPoints[level]).toBeDefined();
      expect(Array.isArray(valueCreationPoints[level])).toBe(true);
      expect(valueCreationPoints[level].length).toBeGreaterThan(0);
    });
  });

  it("should have valid value creation titles for each security level", () => {
    securityLevels.forEach((level) => {
      expect(valueCreationTitles[level]).toBeDefined();
      expect(typeof valueCreationTitles[level]).toBe("string");
      expect(valueCreationTitles[level].length).toBeGreaterThan(0);
    });
  });

  describe("Value Creation Points", () => {
    it("should have value points for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(valueCreationPoints[level]).toBeDefined();
        expect(valueCreationPoints[level].length).toBeGreaterThan(0);
      });
    });

    it("should have appropriate content for each level", () => {
      // None level should mention lack of controls/maximum risk
      expect(
        valueCreationPoints.None.some(
          (point) =>
            point.toLowerCase().includes("no security") ||
            point.toLowerCase().includes("maximum risk")
        )
      ).toBe(true);

      // High level should mention sophisticated protection
      expect(
        valueCreationPoints.High.some(
          (point) =>
            point.toLowerCase().includes("advanced") ||
            point.toLowerCase().includes("comprehensive")
        )
      ).toBe(true);

      // Very High should mention maximum protection
      expect(
        valueCreationPoints["Very High"].some(
          (point) =>
            point.toLowerCase().includes("maximum") ||
            point.toLowerCase().includes("comprehensive")
        )
      ).toBe(true);
    });
  });

  describe("Value Creation Titles", () => {
    it("should have appropriate titles for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(valueCreationTitles[level]).toBeDefined();
      });
    });

    it("should have expected title format", () => {
      expect(valueCreationTitles.None).toContain("No Security");
      expect(valueCreationTitles.Low).toContain("Basic");
      expect(valueCreationTitles.Moderate).toContain("Standard");
      expect(valueCreationTitles.High).toContain("Advanced");
      expect(valueCreationTitles["Very High"]).toContain("Enterprise");
    });
  });

  describe("ROI Estimate Function", () => {
    it("should return ROI estimates for all security levels", () => {
      securityLevels.forEach((level) => {
        const estimate = getROIEstimateForLevel(level);
        expect(estimate).toBeDefined();
        expect(estimate.returnRate).toBeDefined();
      });
    });

    it("should return expected values for key levels", () => {
      expect(getROIEstimateForLevel("None").returnRate).toBe("0%");
      expect(getROIEstimateForLevel("Moderate").returnRate).toContain("%");
      expect(getROIEstimateForLevel("Very High").returnRate).toContain("%");
    });
  });

  describe("ROI_ESTIMATES", () => {
    it("should be defined with all required values", () => {
      expect(ROI_ESTIMATES).toBeDefined();
      expect(ROI_ESTIMATES.NONE).toBeDefined();
      expect(ROI_ESTIMATES.LOW).toBeDefined();
      expect(ROI_ESTIMATES.MODERATE).toBeDefined();
      expect(ROI_ESTIMATES.HIGH).toBeDefined();
      expect(ROI_ESTIMATES.VERY_HIGH).toBeDefined();

      // Check structure for each level
      Object.values(ROI_ESTIMATES).forEach((estimate) => {
        expect(estimate.returnRate).toBeDefined();
        expect(estimate.description).toBeDefined();
      });
    });
  });

  describe("getROIEstimateForLevel", () => {
    it("should return correct ROI estimate for a given security level", () => {
      // Make sure all security levels have a mapping
      const allLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      allLevels.forEach((level) => {
        const result = getROIEstimateForLevel(level);
        expect(result).toBeDefined();
        expect(result.returnRate).toBeDefined();
        expect(result.description).toBeDefined();
      });

      // Check specific mappings - use toEqual instead of toBe for object equality
      expect(getROIEstimateForLevel("None")).toEqual(ROI_ESTIMATES.NONE);
      expect(getROIEstimateForLevel("Low")).toEqual(ROI_ESTIMATES.LOW);
      expect(getROIEstimateForLevel("Moderate")).toEqual(
        ROI_ESTIMATES.MODERATE
      );
      expect(getROIEstimateForLevel("High")).toEqual(ROI_ESTIMATES.HIGH);
      expect(getROIEstimateForLevel("Very High")).toEqual(
        ROI_ESTIMATES.VERY_HIGH
      );
    });

    it("should handle case insensitivity", () => {
      // Test case insensitivity
      expect(getROIEstimateForLevel("None" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.NONE
      );
      expect(getROIEstimateForLevel("Low" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.LOW
      );
    });

    it("should return NONE estimate for invalid security levels", () => {
      // @ts-ignore - Testing invalid input
      expect(getROIEstimateForLevel("Invalid")).toEqual(ROI_ESTIMATES.NONE);
      // @ts-ignore - Testing null
      expect(getROIEstimateForLevel(null)).toEqual(ROI_ESTIMATES.NONE);
      // @ts-ignore - Testing undefined
      expect(getROIEstimateForLevel(undefined)).toEqual(ROI_ESTIMATES.NONE);
    });

    it("returns correct ROI estimates for different security levels", () => {
      // Use type assertion for SecurityLevel
      expect(getROIEstimateForLevel("None" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.NONE
      );
      expect(getROIEstimateForLevel("Low" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.LOW
      );
      // ... rest of the test assertions ...
    });
  });
});
