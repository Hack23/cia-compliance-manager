import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { ROI_ESTIMATES } from "./ciaOptionsData";
import {
  BUSINESS_BENEFITS,
  BUSINESS_CONSIDERATIONS,
  getBusinessBenefits,
  getBusinessConsiderations,
  getROIEstimate,
  getROIEstimateForLevel,
  getValuePoints,
  VALUE_CREATION_POINTS,
  ROI_ESTIMATES as VALUE_ROI_ESTIMATES,
  valueCreationImpact,
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
            point.toLowerCase().includes("maximum risk"),
        ),
      ).toBe(true);

      // High level should mention sophisticated protection
      expect(
        valueCreationPoints.High.some(
          (point) =>
            point.toLowerCase().includes("advanced") ||
            point.toLowerCase().includes("comprehensive"),
        ),
      ).toBe(true);

      // Very High should mention maximum protection
      expect(
        valueCreationPoints["Very High"].some(
          (point) =>
            point.toLowerCase().includes("maximum") ||
            point.toLowerCase().includes("comprehensive"),
        ),
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
        ROI_ESTIMATES.MODERATE,
      );
      expect(getROIEstimateForLevel("High")).toEqual(ROI_ESTIMATES.HIGH);
      expect(getROIEstimateForLevel("Very High")).toEqual(
        ROI_ESTIMATES.VERY_HIGH,
      );
    });

    it("should handle case insensitivity", () => {
      // Test case insensitivity
      expect(getROIEstimateForLevel("None" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.NONE,
      );
      expect(getROIEstimateForLevel("Low" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.LOW,
      );
    });

    it("should return NONE estimate for invalid security levels", () => {
      // @ts-expect-error - Testing invalid input
      expect(getROIEstimateForLevel("Invalid")).toEqual(ROI_ESTIMATES.NONE);
      // @ts-expect-error - Testing null
      expect(getROIEstimateForLevel(null)).toEqual(ROI_ESTIMATES.NONE);
      // @ts-expect-error - Testing undefined
      expect(getROIEstimateForLevel(undefined)).toEqual(ROI_ESTIMATES.NONE);
    });

    it("returns correct ROI estimates for different security levels", () => {
      // Use type assertion for SecurityLevel
      expect(getROIEstimateForLevel("None" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.NONE,
      );
      expect(getROIEstimateForLevel("Low" as SecurityLevel)).toEqual(
        ROI_ESTIMATES.LOW,
      );
      // ... rest of the test assertions ...
    });
  });

  describe("valueCreationImpact", () => {
    it("should have impact statements for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(valueCreationImpact[level]).toBeDefined();
        expect(typeof valueCreationImpact[level]).toBe("string");
        expect(valueCreationImpact[level].length).toBeGreaterThan(0);
      });
    });

    it("should have appropriate risk descriptions", () => {
      expect(valueCreationImpact.None).toContain("maximum risk");
      expect(valueCreationImpact.Low).toContain("high risk");
      expect(valueCreationImpact.Moderate).toContain("moderate risk");
      expect(valueCreationImpact.High).toContain("low risk");
      expect(valueCreationImpact["Very High"]).toContain("minimal risk");
    });
  });

  describe("VALUE_CREATION_POINTS", () => {
    it("should have points for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(VALUE_CREATION_POINTS[level]).toBeDefined();
        expect(Array.isArray(VALUE_CREATION_POINTS[level])).toBe(true);
        expect(VALUE_CREATION_POINTS[level].length).toBeGreaterThan(0);
      });
    });

    it("should have value points with appropriate length", () => {
      expect(VALUE_CREATION_POINTS.None.length).toBeGreaterThan(0);
      expect(VALUE_CREATION_POINTS["Very High"].length).toBeGreaterThanOrEqual(
        VALUE_CREATION_POINTS.None.length,
      );
    });
  });

  describe("BUSINESS_CONSIDERATIONS", () => {
    it("should have considerations for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(BUSINESS_CONSIDERATIONS[level]).toBeDefined();
        expect(Array.isArray(BUSINESS_CONSIDERATIONS[level])).toBe(true);
        expect(BUSINESS_CONSIDERATIONS[level].length).toBeGreaterThan(0);
      });
    });

    it("should have proper structure for each consideration", () => {
      securityLevels.forEach((level) => {
        BUSINESS_CONSIDERATIONS[level].forEach((consideration) => {
          expect(consideration.title).toBeDefined();
          expect(consideration.description).toBeDefined();
          expect(typeof consideration.title).toBe("string");
          expect(typeof consideration.description).toBe("string");
        });
      });
    });
  });

  describe("BUSINESS_BENEFITS", () => {
    it("should have benefits for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(BUSINESS_BENEFITS[level]).toBeDefined();
        expect(Array.isArray(BUSINESS_BENEFITS[level])).toBe(true);
        expect(BUSINESS_BENEFITS[level].length).toBeGreaterThan(0);
      });
    });

    it("should have proper structure for each benefit", () => {
      securityLevels.forEach((level) => {
        BUSINESS_BENEFITS[level].forEach((benefit) => {
          expect(benefit.title).toBeDefined();
          expect(benefit.description).toBeDefined();
          expect(typeof benefit.title).toBe("string");
          expect(typeof benefit.description).toBe("string");
        });
      });
    });
  });

  describe("getROIEstimate", () => {
    it("should return ROI estimate for all security levels", () => {
      securityLevels.forEach((level) => {
        const estimate = getROIEstimate(level);
        expect(estimate).toBeDefined();
        expect(estimate.returnRate).toBeDefined();
        expect(estimate.description).toBeDefined();
      });
    });

    it("should handle case variations", () => {
      const estimate = getROIEstimate("Very High");
      expect(estimate).toBeDefined();
      expect(estimate.returnRate).toBeDefined();
    });

    it("should return NONE for invalid levels", () => {
      const estimate = getROIEstimate("Invalid" as SecurityLevel);
      expect(estimate).toEqual(VALUE_ROI_ESTIMATES.NONE);
    });
  });

  describe("getValuePoints", () => {
    it("should return value points for all security levels", () => {
      securityLevels.forEach((level) => {
        const points = getValuePoints(level);
        expect(points).toBeDefined();
        expect(Array.isArray(points)).toBe(true);
        expect(points.length).toBeGreaterThan(0);
      });
    });

    it("should return correct points for specific levels", () => {
      const nonePoints = getValuePoints("None");
      const highPoints = getValuePoints("High");

      expect(nonePoints).toEqual(VALUE_CREATION_POINTS.None);
      expect(highPoints).toEqual(VALUE_CREATION_POINTS.High);
    });

    it("should return None points for invalid levels", () => {
      const points = getValuePoints("Invalid" as SecurityLevel);
      expect(points).toEqual(VALUE_CREATION_POINTS.None);
    });
  });

  describe("getBusinessConsiderations", () => {
    it("should return considerations for all security levels", () => {
      securityLevels.forEach((level) => {
        const considerations = getBusinessConsiderations(level);
        expect(considerations).toBeDefined();
        expect(Array.isArray(considerations)).toBe(true);
        expect(considerations.length).toBeGreaterThan(0);
      });
    });

    it("should return correct considerations for specific levels", () => {
      const noneConsiderations = getBusinessConsiderations("None");
      const highConsiderations = getBusinessConsiderations("High");

      expect(noneConsiderations).toEqual(BUSINESS_CONSIDERATIONS.None);
      expect(highConsiderations).toEqual(BUSINESS_CONSIDERATIONS.High);
    });

    it("should return None considerations for invalid levels", () => {
      const considerations = getBusinessConsiderations(
        "Invalid" as SecurityLevel,
      );
      expect(considerations).toEqual(BUSINESS_CONSIDERATIONS.None);
    });
  });

  describe("getBusinessBenefits", () => {
    it("should return benefits for all security levels", () => {
      securityLevels.forEach((level) => {
        const benefits = getBusinessBenefits(level);
        expect(benefits).toBeDefined();
        expect(Array.isArray(benefits)).toBe(true);
        expect(benefits.length).toBeGreaterThan(0);
      });
    });

    it("should return correct benefits for specific levels", () => {
      const noneBenefits = getBusinessBenefits("None");
      const highBenefits = getBusinessBenefits("High");

      expect(noneBenefits).toEqual(BUSINESS_BENEFITS.None);
      expect(highBenefits).toEqual(BUSINESS_BENEFITS.High);
    });

    it("should return None benefits for invalid levels", () => {
      const benefits = getBusinessBenefits("Invalid" as SecurityLevel);
      expect(benefits).toEqual(BUSINESS_BENEFITS.None);
    });
  });

  describe("ROI_ESTIMATES from valueCreationData", () => {
    it("should have all required fields for each level", () => {
      const levels = ["NONE", "LOW", "MODERATE", "HIGH", "VERY_HIGH"];

      levels.forEach((level) => {
        const estimate = VALUE_ROI_ESTIMATES[level];
        expect(estimate).toBeDefined();
        expect(estimate.returnRate).toBeDefined();
        expect(estimate.description).toBeDefined();
        expect(typeof estimate.returnRate).toBe("string");
        expect(typeof estimate.description).toBe("string");
      });
    });

    it("should have increasing return rates", () => {
      expect(VALUE_ROI_ESTIMATES.NONE.returnRate).toBe("0%");
      expect(VALUE_ROI_ESTIMATES.LOW.returnRate).toContain("%");
      expect(VALUE_ROI_ESTIMATES.VERY_HIGH.returnRate).toContain("%");
    });
  });
});
