import { describe, expect, it } from "vitest";
import {
  DEFAULT_MOCK_OPTIONS,
  DEFAULT_ROI_ESTIMATES,
  DEFAULT_SECURITY_ICONS,
  TEST_SECURITY_LEVELS,
  createMockDataProvider,
} from "./mockTypes";

describe("mockTypes", () => {
  describe("TEST_SECURITY_LEVELS", () => {
    it("provides all security levels", () => {
      expect(TEST_SECURITY_LEVELS).toEqual([
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ]);
    });
  });

  describe("DEFAULT_MOCK_OPTIONS", () => {
    it("provides mock options for all security levels", () => {
      expect(DEFAULT_MOCK_OPTIONS).toHaveProperty("None");
      expect(DEFAULT_MOCK_OPTIONS).toHaveProperty("Low");
      expect(DEFAULT_MOCK_OPTIONS).toHaveProperty("Moderate");
      expect(DEFAULT_MOCK_OPTIONS).toHaveProperty("High");
      expect(DEFAULT_MOCK_OPTIONS).toHaveProperty("Very High");

      // Test option structure
      expect(DEFAULT_MOCK_OPTIONS.None).toHaveProperty("description");
      expect(DEFAULT_MOCK_OPTIONS.None).toHaveProperty("technical");
      expect(DEFAULT_MOCK_OPTIONS.None).toHaveProperty("businessImpact");
      expect(DEFAULT_MOCK_OPTIONS.None).toHaveProperty("capex");
      expect(DEFAULT_MOCK_OPTIONS.None).toHaveProperty("opex");
    });
  });

  describe("DEFAULT_ROI_ESTIMATES", () => {
    it("provides ROI estimates for all security levels", () => {
      expect(DEFAULT_ROI_ESTIMATES).toHaveProperty("NONE");
      expect(DEFAULT_ROI_ESTIMATES).toHaveProperty("LOW");
      expect(DEFAULT_ROI_ESTIMATES).toHaveProperty("MODERATE");
      expect(DEFAULT_ROI_ESTIMATES).toHaveProperty("HIGH");
      expect(DEFAULT_ROI_ESTIMATES).toHaveProperty("VERY_HIGH");

      // Test estimate structure
      expect(DEFAULT_ROI_ESTIMATES.NONE).toHaveProperty("returnRate");
      expect(DEFAULT_ROI_ESTIMATES.NONE).toHaveProperty("description");
      expect(DEFAULT_ROI_ESTIMATES.NONE).toHaveProperty("value");
    });
  });

  describe("DEFAULT_SECURITY_ICONS", () => {
    it("provides icons for all security levels", () => {
      expect(DEFAULT_SECURITY_ICONS).toHaveProperty("None");
      expect(DEFAULT_SECURITY_ICONS).toHaveProperty("Low");
      expect(DEFAULT_SECURITY_ICONS).toHaveProperty("Moderate");
      expect(DEFAULT_SECURITY_ICONS).toHaveProperty("High");
      expect(DEFAULT_SECURITY_ICONS).toHaveProperty("Very High");

      // Check for emoji format
      expect(typeof DEFAULT_SECURITY_ICONS.None).toBe("string");
      expect(DEFAULT_SECURITY_ICONS.None.length).toBeGreaterThan(0);
    });
  });

  describe("createMockDataProvider", () => {
    it("creates a mock data provider with all required properties", () => {
      const dataProvider = createMockDataProvider();

      expect(dataProvider).toHaveProperty("availabilityOptions");
      expect(dataProvider).toHaveProperty("integrityOptions");
      expect(dataProvider).toHaveProperty("confidentialityOptions");
      expect(dataProvider).toHaveProperty("roiEstimates");
      expect(dataProvider).toHaveProperty("getDefaultSecurityIcon");
      expect(dataProvider).toHaveProperty("getDefaultValuePoints");

      // Test the functions
      expect(dataProvider.getDefaultSecurityIcon("Moderate")).toBe("🔓");
      const valuePoints = dataProvider.getDefaultValuePoints("High");
      expect(Array.isArray(valuePoints)).toBe(true);
      expect(valuePoints.length).toBeGreaterThan(0);
    });
  });
});
