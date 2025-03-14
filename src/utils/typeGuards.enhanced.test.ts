import { describe, expect, it } from "vitest";
import {
  extractSecurityLevels,
  getImplementationCost,
  hasTagValue,
  isComplianceFramework,
  isComplianceStatus,
  isNumber,
  isROIMetricDetails,
  isSecurityProfile,
  isString,
  isWidgetConfig,
  parseRiskLevel,
} from "./typeGuards";

describe("Additional TypeGuard Functions", () => {
  describe("isString", () => {
    it("correctly identifies string values", () => {
      expect(isString("test")).toBe(true);
      expect(isString("")).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("correctly identifies number values", () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber("123")).toBe(false);
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  describe("isSecurityProfile", () => {
    it("validates a complete security profile", () => {
      const validProfile = {
        availability: "High",
        confidentiality: "Moderate",
        integrity: "Low",
        overall: "Moderate",
        timestamp: new Date().toISOString(),
      };
      expect(isSecurityProfile(validProfile)).toBe(true);
    });

    it("rejects invalid security profiles", () => {
      expect(isSecurityProfile(null)).toBe(false);
      expect(isSecurityProfile({})).toBe(false);
      expect(isSecurityProfile({ availability: "High" })).toBe(false);
    });
  });

  describe("isComplianceStatus", () => {
    it("validates valid compliance status objects", () => {
      const valid = {
        framework: "NIST",
        status: "Compliant",
        details: { controls: 5, implemented: 5 },
      };
      expect(isComplianceStatus(valid)).toBe(true);
    });

    it("rejects invalid compliance status", () => {
      expect(isComplianceStatus(null)).toBe(false);
      expect(isComplianceStatus({})).toBe(false);
      expect(isComplianceStatus({ framework: "NIST" })).toBe(false);
    });
  });

  describe("isComplianceFramework", () => {
    it("validates valid compliance framework objects", () => {
      const valid = {
        id: "NIST",
        name: "NIST Framework",
        version: "1.0",
        controls: [],
      };
      expect(isComplianceFramework(valid)).toBe(true);
    });

    it("rejects invalid compliance frameworks", () => {
      expect(isComplianceFramework(null)).toBe(false);
      expect(isComplianceFramework({})).toBe(false);
      expect(isComplianceFramework({ id: "NIST" })).toBe(false);
    });
  });

  describe("isROIMetricDetails", () => {
    it("validates valid ROI metric details", () => {
      const valid = {
        amount: "$10,000",
        percentage: "20%",
        timeframe: "1 year",
      };
      expect(isROIMetricDetails(valid)).toBe(true);
    });

    it("rejects invalid ROI metric details", () => {
      expect(isROIMetricDetails(null)).toBe(false);
      expect(isROIMetricDetails({})).toBe(false);
      expect(isROIMetricDetails({ amount: 10000 })).toBe(false); // should be string
    });
  });

  describe("isWidgetConfig", () => {
    it("validates valid widget configs", () => {
      const valid = {
        type: "TEST",
        title: "Test Widget",
        visible: true,
      };
      expect(isWidgetConfig(valid)).toBe(true);
    });

    it("rejects invalid widget configs", () => {
      expect(isWidgetConfig(null)).toBe(false);
      expect(isWidgetConfig({})).toBe(false);
      expect(isWidgetConfig({ type: 123 })).toBe(false);
    });
  });

  describe("hasTagValue", () => {
    it("returns true when object has matching tag", () => {
      const obj = { tags: ["important", "security", "compliance"] };
      expect(hasTagValue(obj, "security")).toBe(true);
    });

    it("returns false when object doesn't have matching tag", () => {
      const obj = { tags: ["important", "compliance"] };
      expect(hasTagValue(obj, "security")).toBe(false);
    });

    it("returns false when tags property isn't an array", () => {
      expect(hasTagValue({ tags: "security" }, "security")).toBe(false);
      expect(hasTagValue({}, "security")).toBe(false);
      expect(hasTagValue(null, "security")).toBe(false);
    });
  });

  describe("parseRiskLevel", () => {
    it("correctly parses numeric risk levels", () => {
      expect(parseRiskLevel("5")).toBe(5);
      expect(parseRiskLevel("10")).toBe(10);
    });

    it("returns default value for non-numeric strings", () => {
      expect(parseRiskLevel("high")).toBe(3);
      expect(parseRiskLevel("low")).toBe(1);
    });

    it("handles null and undefined values", () => {
      expect(parseRiskLevel(null)).toBe(0);
      expect(parseRiskLevel(undefined)).toBe(0);
    });
  });

  describe("extractSecurityLevels", () => {
    it("extracts security levels from valid objects", () => {
      const obj = {
        availability: "High",
        confidentiality: "Low",
        integrity: "Moderate",
      };

      const levels = extractSecurityLevels(obj);
      expect(levels).toEqual({
        availability: "High",
        confidentiality: "Low",
        integrity: "Moderate",
      });
    });

    it("provides default values for missing properties", () => {
      const obj = { availability: "High" };

      const levels = extractSecurityLevels(obj);
      expect(levels).toEqual({
        availability: "High",
        confidentiality: "None",
        integrity: "None",
      });
    });

    it("handles null and undefined input", () => {
      expect(extractSecurityLevels(null)).toEqual({
        availability: "None",
        confidentiality: "None",
        integrity: "None",
      });

      expect(extractSecurityLevels(undefined)).toEqual({
        availability: "None",
        confidentiality: "None",
        integrity: "None",
      });
    });
  });

  describe("getImplementationCost", () => {
    it("calculates implementation cost from valid inputs", () => {
      const cost = getImplementationCost({
        capex: 1000,
        opex: 500,
        fte: 2,
      });

      expect(cost).toBeGreaterThan(0);
      expect(typeof cost).toBe("number");
    });

    it("handles missing properties", () => {
      expect(getImplementationCost({ capex: 1000 })).toBe(1000);
      expect(getImplementationCost({})).toBe(0);
    });

    it("handles null and undefined input", () => {
      expect(getImplementationCost(null)).toBe(0);
      expect(getImplementationCost(undefined)).toBe(0);
    });
  });
});
