import { describe, expect, it } from "vitest";
import { createTestCIAContentService } from "../tests/utils/mock";
import { SecurityLevel } from "../types/cia";
import { ROIMetrics } from "./ciaContentService";

describe("CIAContentService ROI Calculations", () => {
  const service = createTestCIAContentService();

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
