import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../types/cia";
import { CIAContentService, ROIMetrics } from "./ciaContentService";

describe("CIAContentService ROI Calculations", () => {
  // Create a real service instead of a mocked one for accurate testing
  const mockData = {
    roiEstimates: {
      NONE: { returnRate: "0%", description: "No return", value: "0%" },
      LOW: { returnRate: "50%", description: "Low return", value: "50%" },
      MODERATE: {
        returnRate: "150%",
        description: "Moderate return",
        value: "150%",
      },
      HIGH: { returnRate: "300%", description: "High return", value: "300%" },
      VERY_HIGH: {
        returnRate: "500%",
        description: "Very high return",
        value: "500%",
      },
    },
    // Create proper mock structures for each required property
    availabilityOptions: {
      None: {
        description: "No availability controls",
        technical: "No availability measures",
        businessImpact: "Critical business impact",
        capex: 0,
        opex: 0,
        bg: "#f8d7da",
        text: "#721c24",
        recommendations: [],
      },
      Low: {
        description: "Basic availability",
        technical: "Basic availability measures",
        businessImpact: "High business impact",
        capex: 1000,
        opex: 500,
        bg: "#fff3cd",
        text: "#856404",
        recommendations: [],
      },
      Moderate: {
        description: "Standard availability",
        technical: "Standard availability measures",
        businessImpact: "Medium business impact",
        capex: 5000,
        opex: 2000,
        bg: "#d1ecf1",
        text: "#0c5460",
        recommendations: [],
      },
      High: {
        description: "Enhanced availability",
        technical: "Enhanced availability measures",
        businessImpact: "Low business impact",
        capex: 15000,
        opex: 5000,
        bg: "#d4edda",
        text: "#155724",
        recommendations: [],
      },
      "Very High": {
        description: "Maximum availability",
        technical: "Maximum availability measures",
        businessImpact: "Minimal business impact",
        capex: 30000,
        opex: 10000,
        bg: "#cce5ff",
        text: "#004085",
        recommendations: [],
      },
    },
    integrityOptions: {
      None: {
        description: "No integrity controls",
        technical: "No integrity measures",
        businessImpact: "Critical business impact",
        capex: 0,
        opex: 0,
        bg: "#f8d7da",
        text: "#721c24",
        recommendations: [],
      },
      Low: {
        description: "Basic integrity",
        technical: "Basic integrity measures",
        businessImpact: "High business impact",
        capex: 1000,
        opex: 500,
        bg: "#fff3cd",
        text: "#856404",
        recommendations: [],
      },
      Moderate: {
        description: "Standard integrity",
        technical: "Standard integrity measures",
        businessImpact: "Medium business impact",
        capex: 5000,
        opex: 2000,
        bg: "#d1ecf1",
        text: "#0c5460",
        recommendations: [],
      },
      High: {
        description: "Enhanced integrity",
        technical: "Enhanced integrity measures",
        businessImpact: "Low business impact",
        capex: 15000,
        opex: 5000,
        bg: "#d4edda",
        text: "#155724",
        recommendations: [],
      },
      "Very High": {
        description: "Maximum integrity",
        technical: "Maximum integrity measures",
        businessImpact: "Minimal business impact",
        capex: 30000,
        opex: 10000,
        bg: "#cce5ff",
        text: "#004085",
        recommendations: [],
      },
    },
    confidentialityOptions: {
      None: {
        description: "No confidentiality controls",
        technical: "No confidentiality measures",
        businessImpact: "Critical business impact",
        capex: 0,
        opex: 0,
        bg: "#f8d7da",
        text: "#721c24",
        recommendations: [],
      },
      Low: {
        description: "Basic confidentiality",
        technical: "Basic confidentiality measures",
        businessImpact: "High business impact",
        capex: 1000,
        opex: 500,
        bg: "#fff3cd",
        text: "#856404",
        recommendations: [],
      },
      Moderate: {
        description: "Standard confidentiality",
        technical: "Standard confidentiality measures",
        businessImpact: "Medium business impact",
        capex: 5000,
        opex: 2000,
        bg: "#d1ecf1",
        text: "#0c5460",
        recommendations: [],
      },
      High: {
        description: "Enhanced confidentiality",
        technical: "Enhanced confidentiality measures",
        businessImpact: "Low business impact",
        capex: 15000,
        opex: 5000,
        bg: "#d4edda",
        text: "#155724",
        recommendations: [],
      },
      "Very High": {
        description: "Maximum confidentiality",
        technical: "Maximum confidentiality measures",
        businessImpact: "Minimal business impact",
        capex: 30000,
        opex: 10000,
        bg: "#cce5ff",
        text: "#004085",
        recommendations: [],
      },
    },
    getDefaultSecurityIcon: vi.fn(),
    getDefaultValuePoints: vi.fn(),
  };

  // Create a real service instance with our mock data
  const service = new CIAContentService(mockData);

  describe("calculateRoi", () => {
    it("calculates proper ROI for different security levels", () => {
      const testCases: Array<{
        level: SecurityLevel;
        cost: number;
        expectedResult: Partial<ROIMetrics>;
      }> = [
        {
          level: "None",
          cost: 10000,
          expectedResult: {
            percentage: "0%",
          },
        },
        {
          level: "Low",
          cost: 10000,
          expectedResult: {
            percentage: "50%",
          },
        },
        {
          level: "Moderate",
          cost: 10000,
          expectedResult: {
            percentage: "150%",
          },
        },
        {
          level: "High",
          cost: 10000,
          expectedResult: {
            percentage: "300%",
          },
        },
        {
          level: "Very High",
          cost: 10000,
          expectedResult: {
            percentage: "500%",
          },
        },
      ];

      testCases.forEach((testCase) => {
        const result = service.calculateRoi(testCase.level, testCase.cost);

        expect(result).toBeDefined();
        expect(result).toHaveProperty("value");
        expect(result).toHaveProperty("percentage");
        expect(result).toHaveProperty("description");

        // Match the expected percentage
        expect(result.percentage).toBe(testCase.expectedResult.percentage);

        // For None, value should be $0 regardless of cost
        if (testCase.level === "None") {
          expect(result.value).toBe("$0");
        } else {
          // For other levels, value should be proportional to cost
          expect(
            parseFloat(result.value.replace(/[^0-9.-]+/g, ""))
          ).toBeGreaterThan(0);
        }
      });
    });

    it("handles zero and negative implementation costs", () => {
      const result1 = service.calculateRoi("Moderate", 0);
      const result2 = service.calculateRoi("Moderate", -100);

      expect(result1.value).toBe("$0");
      expect(result2.value).toBe("$0");

      // Percentage should still reflect security level
      expect(result1.percentage).toBe("150%");
      expect(result2.percentage).toBe("150%");
    });
  });

  describe("getROIEstimate", () => {
    it("returns appropriate estimates for each security level", () => {
      expect(service.getROIEstimate("None").returnRate).toBe("0%");
      expect(service.getROIEstimate("Low").returnRate).toBe("50%");
      expect(service.getROIEstimate("Moderate").returnRate).toBe("150%");
      expect(service.getROIEstimate("High").returnRate).toBe("300%");
      expect(service.getROIEstimate("Very High").returnRate).toBe("500%");
    });

    it("handles undefined/null level", () => {
      // @ts-expect-error Testing with undefined
      const result = service.getROIEstimate(undefined);
      expect(result).toBeDefined();
      expect(result.returnRate).toBe("0%");
    });
  });
});
