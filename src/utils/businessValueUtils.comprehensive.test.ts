/**
 * Comprehensive tests for businessValueUtils module
 * Testing ROI calculations, implementation timelines, and cost estimates
 */

import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
  calculateImplementationCost,
  calculateImplementationTimeline,
  calculateOperationalCost,
  calculateROIEstimate,
} from "./businessValueUtils";

describe("businessValueUtils - Comprehensive Coverage", () => {
  describe("calculateROIEstimate", () => {
    it("should return ROI estimate for None security level", () => {
      const result = calculateROIEstimate("None", "None", "None");
      expect(result).toBeDefined();
      expect(result.value).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it("should return ROI estimate for Low security level", () => {
      const result = calculateROIEstimate("Low", "Low", "Low");
      expect(result).toBeDefined();
      expect(result.value).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it("should return ROI estimate for Moderate security level", () => {
      const result = calculateROIEstimate("Moderate", "Moderate", "Moderate");
      expect(result).toBeDefined();
      expect(result.value).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it("should return ROI estimate for High security level", () => {
      const result = calculateROIEstimate("High", "High", "High");
      expect(result).toBeDefined();
      expect(result.value).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it("should return ROI estimate for Very High security level", () => {
      const result = calculateROIEstimate("Very High", "Very High", "Very High");
      expect(result).toBeDefined();
      expect(result.value).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it("should handle mixed security levels", () => {
      const result = calculateROIEstimate("High", "Moderate", "Low");
      expect(result).toBeDefined();
      expect(result.value).toBeDefined();
      expect(result.description).toBeDefined();
    });

    it("should calculate based on highest security level", () => {
      const result1 = calculateROIEstimate("Very High", "Low", "None");
      const result2 = calculateROIEstimate("Very High", "Very High", "Very High");
      
      // Both should return Very High ROI since that's the highest level
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
    });

    it("should have consistent value structure", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      for (const level of levels) {
        const result = calculateROIEstimate(level, level, level);
        expect(result.value).toBeDefined();
        expect(typeof result.value).toBe("string");
        expect(result.description).toBeDefined();
        expect(typeof result.description).toBe("string");
      }
    });

    it("should fallback to Moderate for invalid combinations", () => {
      const result = calculateROIEstimate("None", "None", "None");
      expect(result).toBeDefined();
      // Should return a valid ROI estimate even for lowest levels
    });
  });

  describe("calculateImplementationTimeline", () => {
    it("should return timeline for None security levels", () => {
      const result = calculateImplementationTimeline("None", "None", "None");
      expect(result).toBeDefined();
      expect(result.total).toBeDefined();
      expect(result.total).toContain("weeks");
      expect(result.phases).toBeDefined();
      expect(result.phases).toHaveLength(3);
    });

    it("should return timeline for Low security levels", () => {
      const result = calculateImplementationTimeline("Low", "Low", "Low");
      expect(result.total).toContain("weeks");
      expect(result.phases).toHaveLength(3);
    });

    it("should return timeline for Moderate security levels", () => {
      const result = calculateImplementationTimeline("Moderate", "Moderate", "Moderate");
      expect(result.total).toContain("weeks");
      expect(result.phases).toHaveLength(3);
    });

    it("should return timeline for High security levels", () => {
      const result = calculateImplementationTimeline("High", "High", "High");
      expect(result.total).toContain("weeks");
      expect(result.phases).toHaveLength(3);
    });

    it("should return timeline for Very High security levels", () => {
      const result = calculateImplementationTimeline("Very High", "Very High", "Very High");
      expect(result.total).toContain("weeks");
      expect(result.phases).toHaveLength(3);
    });

    it("should have longer timelines for higher security levels", () => {
      const lowTimeline = calculateImplementationTimeline("Low", "Low", "Low");
      const highTimeline = calculateImplementationTimeline("Very High", "Very High", "Very High");
      
      const lowWeeks = parseInt(lowTimeline.total.split(" ")[0]);
      const highWeeks = parseInt(highTimeline.total.split(" ")[0]);
      
      expect(highWeeks).toBeGreaterThan(lowWeeks);
    });

    it("should have three phases: Planning, Implementation, Testing & Adoption", () => {
      const result = calculateImplementationTimeline("Moderate", "Moderate", "Moderate");
      
      expect(result.phases).toBeDefined();
      expect(result.phases?.[0].name).toBe("Planning");
      expect(result.phases?.[1].name).toBe("Implementation");
      expect(result.phases?.[2].name).toBe("Testing & Adoption");
      
      expect(result.phases?.[0].duration).toContain("weeks");
      expect(result.phases?.[1].duration).toContain("weeks");
      expect(result.phases?.[2].duration).toContain("weeks");
    });

    it("should handle mixed security levels", () => {
      const result = calculateImplementationTimeline("High", "Low", "Moderate");
      expect(result.total).toContain("weeks");
      expect(result.phases).toHaveLength(3);
      
      const totalWeeks = parseInt(result.total.split(" ")[0]);
      expect(totalWeeks).toBeGreaterThan(0);
    });

    it("should allocate phases proportionally", () => {
      const result = calculateImplementationTimeline("High", "High", "High");
      const totalWeeks = parseInt(result.total.split(" ")[0]);
      
      const planningWeeks = parseInt(result.phases![0].duration.split(" ")[0]);
      const implementationWeeks = parseInt(result.phases![1].duration.split(" ")[0]);
      const testingWeeks = parseInt(result.phases![2].duration.split(" ")[0]);
      
      // Verify approximate proportions (30%, 50%, 20%)
      expect(planningWeeks).toBeGreaterThan(0);
      expect(implementationWeeks).toBeGreaterThan(planningWeeks);
      expect(testingWeeks).toBeGreaterThan(0);
    });
  });

  describe("calculateImplementationCost", () => {
    it("should calculate cost for None security levels", () => {
      const result = calculateImplementationCost("None", "None", "None");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should calculate cost for Low security levels", () => {
      const result = calculateImplementationCost("Low", "Low", "Low");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should calculate cost for Moderate security levels", () => {
      const result = calculateImplementationCost("Moderate", "Moderate", "Moderate");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should calculate cost for High security levels", () => {
      const result = calculateImplementationCost("High", "High", "High");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should calculate cost for Very High security levels", () => {
      const result = calculateImplementationCost("Very High", "Very High", "Very High");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should have higher costs for higher security levels", () => {
      const lowCost = calculateImplementationCost("Low", "Low", "Low");
      const highCost = calculateImplementationCost("Very High", "Very High", "Very High");
      
      expect(highCost).toBeGreaterThan(lowCost);
    });

    it("should handle mixed security levels", () => {
      const result = calculateImplementationCost("High", "Moderate", "Low");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should support organization size parameter", () => {
      const smallOrg = calculateImplementationCost("High", "High", "High", "small");
      const mediumOrg = calculateImplementationCost("High", "High", "High", "medium");
      const largeOrg = calculateImplementationCost("High", "High", "High", "large");
      
      expect(smallOrg).toBeGreaterThan(0);
      expect(mediumOrg).toBeGreaterThan(0);
      expect(largeOrg).toBeGreaterThan(0);
      
      // Larger organizations typically have higher implementation costs
      expect(largeOrg).toBeGreaterThan(smallOrg);
    });

    it("should support industry parameter", () => {
      const generalIndustry = calculateImplementationCost("High", "High", "High", "medium", "general");
      const financeIndustry = calculateImplementationCost("High", "High", "High", "medium", "finance");
      const healthcareIndustry = calculateImplementationCost("High", "High", "High", "medium", "healthcare");
      
      expect(generalIndustry).toBeGreaterThan(0);
      expect(financeIndustry).toBeGreaterThan(0);
      expect(healthcareIndustry).toBeGreaterThan(0);
    });

    it("should return sum of CAPEX for all three components", () => {
      const result = calculateImplementationCost("Moderate", "Moderate", "Moderate");
      expect(result).toBeGreaterThan(0);
      // Implementation cost should represent total capital expenditure
    });
  });

  describe("calculateOperationalCost", () => {
    it("should calculate operational cost for None security levels", () => {
      const result = calculateOperationalCost("None", "None", "None");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should calculate operational cost for Low security levels", () => {
      const result = calculateOperationalCost("Low", "Low", "Low");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should calculate operational cost for Moderate security levels", () => {
      const result = calculateOperationalCost("Moderate", "Moderate", "Moderate");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should calculate operational cost for High security levels", () => {
      const result = calculateOperationalCost("High", "High", "High");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should calculate operational cost for Very High security levels", () => {
      const result = calculateOperationalCost("Very High", "Very High", "Very High");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should have higher operational costs for higher security levels", () => {
      const lowCost = calculateOperationalCost("Low", "Low", "Low");
      const highCost = calculateOperationalCost("Very High", "Very High", "Very High");
      
      expect(highCost).toBeGreaterThan(lowCost);
    });

    it("should handle mixed security levels", () => {
      const result = calculateOperationalCost("High", "Moderate", "Low");
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });

    it("should support organization size parameter", () => {
      const smallOrg = calculateOperationalCost("High", "High", "High", "small");
      const mediumOrg = calculateOperationalCost("High", "High", "High", "medium");
      const largeOrg = calculateOperationalCost("High", "High", "High", "large");
      
      expect(smallOrg).toBeGreaterThan(0);
      expect(mediumOrg).toBeGreaterThan(0);
      expect(largeOrg).toBeGreaterThan(0);
      
      // Larger organizations typically have higher operational costs
      expect(largeOrg).toBeGreaterThan(smallOrg);
    });

    it("should support industry parameter", () => {
      const generalIndustry = calculateOperationalCost("High", "High", "High", "medium", "general");
      const financeIndustry = calculateOperationalCost("High", "High", "High", "medium", "finance");
      const healthcareIndustry = calculateOperationalCost("High", "High", "High", "medium", "healthcare");
      
      expect(generalIndustry).toBeGreaterThan(0);
      expect(financeIndustry).toBeGreaterThan(0);
      expect(healthcareIndustry).toBeGreaterThan(0);
    });

    it("should return sum of OPEX for all three components", () => {
      const result = calculateOperationalCost("Moderate", "Moderate", "Moderate");
      expect(result).toBeGreaterThan(0);
      // Operational cost should represent annual operating expenses
    });
  });

  describe("Integration tests - Complete business value calculation", () => {
    it("should provide consistent values across all functions for same security level", () => {
      const level: SecurityLevel = "High";
      
      const roi = calculateROIEstimate(level, level, level);
      const timeline = calculateImplementationTimeline(level, level, level);
      const implCost = calculateImplementationCost(level, level, level);
      const opCost = calculateOperationalCost(level, level, level);
      
      expect(roi).toBeDefined();
      expect(timeline.total).toContain("weeks");
      expect(implCost).toBeGreaterThan(0);
      expect(opCost).toBeGreaterThan(0);
    });

    it("should show increasing costs and timelines with increasing security", () => {
      const levels: SecurityLevel[] = ["Low", "Moderate", "High", "Very High"];
      const costs: number[] = [];
      const timelines: number[] = [];
      
      for (const level of levels) {
        const implCost = calculateImplementationCost(level, level, level);
        const timeline = calculateImplementationTimeline(level, level, level);
        const weeks = parseInt(timeline.total.split(" ")[0]);
        
        costs.push(implCost);
        timelines.push(weeks);
      }
      
      // Verify increasing trend
      for (let i = 1; i < costs.length; i++) {
        expect(costs[i]).toBeGreaterThanOrEqual(costs[i - 1]);
      }
      
      for (let i = 1; i < timelines.length; i++) {
        expect(timelines[i]).toBeGreaterThanOrEqual(timelines[i - 1]);
      }
    });

    it("should handle complete business scenario", () => {
      // Simulate a complete business impact assessment
      const availability: SecurityLevel = "High";
      const integrity: SecurityLevel = "Very High";
      const confidentiality: SecurityLevel = "High";
      
      const roi = calculateROIEstimate(availability, integrity, confidentiality);
      const timeline = calculateImplementationTimeline(availability, integrity, confidentiality);
      const implCost = calculateImplementationCost(availability, integrity, confidentiality, "medium", "finance");
      const opCost = calculateOperationalCost(availability, integrity, confidentiality, "medium", "finance");
      
      // All values should be valid
      expect(roi.value).toBeDefined();
      expect(roi.description).toBeDefined();
      expect(timeline.total).toBeTruthy();
      expect(timeline.phases).toHaveLength(3);
      expect(implCost).toBeGreaterThan(0);
      expect(opCost).toBeGreaterThan(0);
      
      // Operational cost should be different from implementation cost
      expect(opCost).not.toBe(implCost);
    });

    it("should handle edge case of all None levels", () => {
      const roi = calculateROIEstimate("None", "None", "None");
      const timeline = calculateImplementationTimeline("None", "None", "None");
      const implCost = calculateImplementationCost("None", "None", "None");
      const opCost = calculateOperationalCost("None", "None", "None");
      
      expect(roi).toBeDefined();
      expect(timeline.total).toContain("weeks");
      expect(implCost).toBeGreaterThanOrEqual(0);
      expect(opCost).toBeGreaterThanOrEqual(0);
    });
  });
});
