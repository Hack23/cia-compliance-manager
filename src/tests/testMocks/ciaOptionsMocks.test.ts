import { describe, expect, it } from "vitest";
import { createCIAOptionsMock, createChartJsMock } from "./ciaOptionsMocks";

describe("ciaOptionsMocks", () => {
  describe("createCIAOptionsMock", () => {
    it("creates a complete CIA options mock with all required structures", () => {
      const mock = createCIAOptionsMock();

      // Check ESModule flag
      expect(mock).toHaveProperty("__esModule", true);

      // Check direct exports
      expect(mock).toHaveProperty("availabilityOptions");
      expect(mock).toHaveProperty("integrityOptions");
      expect(mock).toHaveProperty("confidentialityOptions");
      expect(mock).toHaveProperty("ROI_ESTIMATES");

      // Check hook export
      expect(mock).toHaveProperty("useCIAOptions");
      expect(mock.useCIAOptions).toBeInstanceOf(Function);

      // Check data structure
      const options = mock.availabilityOptions;
      expect(options).toHaveProperty("None");
      expect(options).toHaveProperty("Low");
      expect(options).toHaveProperty("Moderate");
      expect(options).toHaveProperty("High");
      expect(options).toHaveProperty("Very High");

      // Check ROI_ESTIMATES
      expect(mock.ROI_ESTIMATES).toHaveProperty("NONE");
      expect(mock.ROI_ESTIMATES).toHaveProperty("LOW");
      expect(mock.ROI_ESTIMATES).toHaveProperty("MODERATE");
      expect(mock.ROI_ESTIMATES).toHaveProperty("HIGH");
      expect(mock.ROI_ESTIMATES).toHaveProperty("VERY_HIGH");
    });

    it("allows customization of mock options", () => {
      const customOptions = {
        availabilityOptions: {
          None: { capex: 100, opex: 50, custom: "value" },
        },
      };

      const mock = createCIAOptionsMock(customOptions);

      // Check if customization was applied
      expect(mock.availabilityOptions.None).toHaveProperty("capex", 100);
      expect(mock.availabilityOptions.None).toHaveProperty("opex", 50);
      expect(mock.availabilityOptions.None).toHaveProperty("custom", "value");
    });
  });

  describe("createChartJsMock", () => {
    it("creates a Chart.js mock with required methods", () => {
      const mock = createChartJsMock();

      expect(mock).toHaveProperty("__esModule", true);
      expect(mock).toHaveProperty("default");

      // Create a mock chart instance
      const chartInstance = mock.default();

      // Verify instance methods
      expect(chartInstance).toHaveProperty("destroy");
      expect(chartInstance).toHaveProperty("update");
      expect(chartInstance).toHaveProperty("resize");
      expect(chartInstance).toHaveProperty("data");
    });
  });
});
