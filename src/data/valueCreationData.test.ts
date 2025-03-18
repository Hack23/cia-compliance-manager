import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
    getROIEstimateForLevel,
    valueCreationPoints,
    valueCreationTitles,
} from "./valueCreationData";

describe("Value Creation Data", () => {
  const securityLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  describe("Value Creation Points", () => {
    it("should have value points for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(valueCreationPoints[level]).toBeDefined();
        expect(Array.isArray(valueCreationPoints[level])).toBe(true);
        expect(valueCreationPoints[level].length).toBeGreaterThan(0);
      });
    });

    it("should have appropriate content for each level", () => {
      // None level should mention "No security value"
      expect(
        valueCreationPoints.None.some((point) =>
          point.includes("No security value")
        )
      ).toBeTruthy();

      // Very High should mention "Maximum security"
      expect(
        valueCreationPoints["Very High"].some((point) =>
          point.includes("Maximum security")
        )
      ).toBeTruthy();
    });
  });

  describe("Value Creation Titles", () => {
    it("should have appropriate titles for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(valueCreationTitles[level]).toBeDefined();
        expect(typeof valueCreationTitles[level]).toBe("string");
      });
    });

    it("should have expected title format", () => {
      expect(valueCreationTitles.None).toBe("No Security Value");
      expect(valueCreationTitles["Very High"]).toBe("Maximum Security Value");
    });
  });

  describe("ROI Estimate Function", () => {
    it("should return ROI estimates for all security levels", () => {
      securityLevels.forEach((level) => {
        const estimate = getROIEstimateForLevel(level);
        expect(estimate).toBeDefined();
        expect(estimate.value).toBeTruthy();
        expect(estimate.description).toBeTruthy();
      });
    });

    it("should return expected values for key levels", () => {
      // None should have 0% ROI
      expect(getROIEstimateForLevel("None").value).toBe("0%");

      // Very High should have highest ROI
      expect(getROIEstimateForLevel("Very High").value).toBe("500%");
    });
  });

  it("should have valid value creation points for each security level", () => {
    const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
    levels.forEach((level) => {
      expect(valueCreationPoints[level]).toBeInstanceOf(Array);
      expect(valueCreationPoints[level].length).toBeGreaterThan(0);
    });
  });

  it("should have valid value creation titles for each security level", () => {
    expect(valueCreationTitles["None"]).toBe("No Security Value");
    expect(valueCreationTitles["High"]).toBe("Enhanced Security Value");
  });

  it("should return correct ROI estimate for a given security level", () => {
    const roi = getROIEstimateForLevel("Moderate");
    expect(roi).toHaveProperty("returnRate");
    expect(roi.returnRate).toBe("2x");
  });
});
