import { describe, expect, it } from "vitest";
import {
  createMockBusinessImpact,
  createMockCIAOptions,
  createTypeGuardTests,
  setupChartJsMock,
} from "./test-helpers";

describe("Test Helpers", () => {
  describe("createMockBusinessImpact", () => {
    it("creates default mock BusinessImpactDetails", () => {
      const impact = createMockBusinessImpact();

      expect(impact).toHaveProperty("summary");
      expect(impact).toHaveProperty("financial");
      expect(impact).toHaveProperty("operational");

      expect(impact.financial).toHaveProperty("description");
      expect(impact.financial).toHaveProperty("riskLevel");
      expect(impact.operational).toHaveProperty("description");
      expect(impact.operational).toHaveProperty("riskLevel");
    });

    it("allows overriding properties", () => {
      const customFinancial = {
        description: "Custom financial impact",
        riskLevel: "Critical",
      };

      const impact = createMockBusinessImpact({
        summary: "Custom summary",
        financial: customFinancial,
      });

      expect(impact.summary).toBe("Custom summary");
      expect(impact.financial).toEqual(customFinancial);
      expect(impact.operational).toBeDefined(); // Default still present
    });
  });

  describe("createMockCIAOptions", () => {
    it("creates mock CIA options with expected structure", () => {
      const options = createMockCIAOptions();

      expect(options).toHaveProperty("availabilityOptions");
      expect(options).toHaveProperty("integrityOptions");
      expect(options).toHaveProperty("confidentialityOptions");
      expect(options).toHaveProperty("ROI_ESTIMATES");

      // Test a few expected values
      expect(options.availabilityOptions.None).toHaveProperty("capex", 0);
      expect(options.availabilityOptions.Low).toHaveProperty("capex", 5);
      expect(options.ROI_ESTIMATES.NONE).toHaveProperty("returnRate", "0%");
      expect(options.ROI_ESTIMATES.HIGH).toHaveProperty("returnRate", "350%");
    });
  });

  describe("createTypeGuardTests", () => {
    // Create example type and guard
    interface TestType {
      id: string;
      name: string;
      value: number;
    }

    const isTestType = (val: unknown): val is TestType => {
      if (!val || typeof val !== "object") return false;
      const obj = val as Partial<TestType>;
      return (
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        typeof obj.value === "number"
      );
    };

    const validExample: TestType = { id: "1", name: "Test", value: 42 };
    const invalidKeys: (keyof TestType)[] = ["id", "name", "value"];

    it("creates test functions for type guards", () => {
      const tests = createTypeGuardTests(isTestType, validExample, invalidKeys);

      expect(tests).toHaveProperty("testValidObject");
      expect(tests).toHaveProperty("testInvalidObjects");
      expect(typeof tests.testValidObject).toBe("function");
      expect(typeof tests.testInvalidObjects).toBe("function");
    });

    it("testValidObject validates correct objects", () => {
      const tests = createTypeGuardTests(isTestType, validExample, invalidKeys);

      // Should not throw
      expect(() => tests.testValidObject()).not.toThrow();
    });

    it("testInvalidObjects rejects invalid objects", () => {
      const tests = createTypeGuardTests(isTestType, validExample, invalidKeys);

      // Should not throw
      expect(() => tests.testInvalidObjects()).not.toThrow();
    });
  });

  describe("setupChartJsMock", () => {
    it("creates Chart.js mock with expected methods", () => {
      const { MockChart, mockChartInstance } = setupChartJsMock();

      expect(MockChart).toBeInstanceOf(Function);
      expect(MockChart.register).toBeInstanceOf(Function);

      expect(mockChartInstance).toHaveProperty("destroy");
      expect(mockChartInstance).toHaveProperty("update");
      expect(mockChartInstance).toHaveProperty("resize");

      expect(mockChartInstance.destroy).toBeInstanceOf(Function);
      expect(mockChartInstance.update).toBeInstanceOf(Function);
      expect(mockChartInstance.resize).toBeInstanceOf(Function);
    });
  });
});
