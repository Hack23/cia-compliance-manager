import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { ROI_ESTIMATES } from "./ciaOptionsData";
import { getROIEstimateForLevel, valueCreationPoints, valueCreationTitles } from "./valueCreationData";

describe("Value Creation Data", () => {
  // Test all security levels exist in mappings
  const securityLevels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
  
  it("should have valid value creation points for each security level", () => {
    securityLevels.forEach(level => {
      expect(valueCreationPoints[level]).toBeDefined();
      expect(Array.isArray(valueCreationPoints[level])).toBe(true);
      expect(valueCreationPoints[level].length).toBeGreaterThan(0);
    });
  });
  
  it("should have valid value creation titles for each security level", () => {
    securityLevels.forEach(level => {
      expect(valueCreationTitles[level]).toBeDefined();
      expect(typeof valueCreationTitles[level]).toBe("string");
      expect(valueCreationTitles[level].length).toBeGreaterThan(0);
    });
  });
  
  it("should return correct ROI estimate for a given security level", () => {
    securityLevels.forEach(level => {
      const estimate = getROIEstimateForLevel(level);
      expect(estimate).toBeDefined();
      expect(estimate.returnRate).toBeDefined();
      expect(estimate.description).toBeDefined();
    });
    
    // Check specific mappings
    expect(getROIEstimateForLevel("None")).toBe(ROI_ESTIMATES.NONE);
    expect(getROIEstimateForLevel("Low")).toBe(ROI_ESTIMATES.LOW);
    expect(getROIEstimateForLevel("Moderate")).toBe(ROI_ESTIMATES.MODERATE);
  });
  
  describe("Value Creation Points", () => {
    it("should have value points for all security levels", () => {
      securityLevels.forEach(level => {
        expect(valueCreationPoints[level]).toBeDefined();
        expect(valueCreationPoints[level].length).toBeGreaterThan(0);
      });
    });
    
    it("should have appropriate content for each level", () => {
      // None level should mention lack of controls/maximum risk
      expect(valueCreationPoints.None.some(point => 
        point.toLowerCase().includes("no security") || 
        point.toLowerCase().includes("maximum risk")
      )).toBe(true);
      
      // High level should mention sophisticated protection
      expect(valueCreationPoints.High.some(point => 
        point.toLowerCase().includes("advanced") || 
        point.toLowerCase().includes("comprehensive")
      )).toBe(true);
      
      // Very High should mention maximum protection
      expect(valueCreationPoints["Very High"].some(point => 
        point.toLowerCase().includes("maximum") || 
        point.toLowerCase().includes("comprehensive")
      )).toBe(true);
    });
  });
  
  describe("Value Creation Titles", () => {
    it("should have appropriate titles for all security levels", () => {
      securityLevels.forEach(level => {
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
      securityLevels.forEach(level => {
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
});
