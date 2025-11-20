import { describe, expect, it } from "vitest";
import {
  getStatusVariant,
  getRiskColorClass,
  getComplianceStatusText,
} from "./statusUtils";

describe("statusUtils", () => {
  describe("getStatusVariant", () => {
    it("returns error for none level", () => {
      expect(getStatusVariant("none")).toBe("error");
      expect(getStatusVariant("None")).toBe("error");
    });

    it("returns warning for low level", () => {
      expect(getStatusVariant("low")).toBe("warning");
      expect(getStatusVariant("Low")).toBe("warning");
    });

    it("returns info for moderate level", () => {
      expect(getStatusVariant("moderate")).toBe("info");
      expect(getStatusVariant("Moderate")).toBe("info");
    });

    it("returns success for high level", () => {
      expect(getStatusVariant("high")).toBe("success");
      expect(getStatusVariant("High")).toBe("success");
    });

    it("returns purple for very high level", () => {
      expect(getStatusVariant("very high")).toBe("purple");
      expect(getStatusVariant("Very High")).toBe("purple");
    });

    it("returns neutral for unknown levels", () => {
      expect(getStatusVariant("unknown")).toBe("neutral");
      expect(getStatusVariant("")).toBe("neutral");
      expect(getStatusVariant("random")).toBe("neutral");
    });
  });

  describe("getRiskColorClass", () => {
    it("returns green color for Low risk", () => {
      expect(getRiskColorClass("Low")).toBe("text-green-600 dark:text-green-400");
      expect(getRiskColorClass("Low Risk")).toBe("text-green-600 dark:text-green-400");
    });

    it("returns yellow color for Medium risk", () => {
      expect(getRiskColorClass("Medium")).toBe("text-yellow-600 dark:text-yellow-400");
      expect(getRiskColorClass("Medium Risk")).toBe("text-yellow-600 dark:text-yellow-400");
    });

    it("returns orange color for High risk", () => {
      expect(getRiskColorClass("High")).toBe("text-orange-600 dark:text-orange-400");
      expect(getRiskColorClass("High Risk")).toBe("text-orange-600 dark:text-orange-400");
    });

    it("returns red color for Critical risk", () => {
      expect(getRiskColorClass("Critical")).toBe("text-red-600 dark:text-red-400");
      expect(getRiskColorClass("Critical Risk")).toBe("text-red-600 dark:text-red-400");
    });

    it("returns gray color for unknown risk levels", () => {
      expect(getRiskColorClass("Unknown")).toBe("text-gray-600 dark:text-gray-400");
      expect(getRiskColorClass("")).toBe("text-gray-600 dark:text-gray-400");
      expect(getRiskColorClass("Random")).toBe("text-gray-600 dark:text-gray-400");
    });
  });

  describe("getComplianceStatusText", () => {
    it("returns strong compliance for scores >= 80", () => {
      expect(getComplianceStatusText(80)).toBe("Strong compliance position");
      expect(getComplianceStatusText(90)).toBe("Strong compliance position");
      expect(getComplianceStatusText(100)).toBe("Strong compliance position");
    });

    it("returns moderate compliance for scores between 50 and 79", () => {
      expect(getComplianceStatusText(50)).toBe("Moderate compliance position");
      expect(getComplianceStatusText(65)).toBe("Moderate compliance position");
      expect(getComplianceStatusText(79)).toBe("Moderate compliance position");
    });

    it("returns compliance gaps for scores < 50", () => {
      expect(getComplianceStatusText(0)).toBe("Compliance gaps detected");
      expect(getComplianceStatusText(25)).toBe("Compliance gaps detected");
      expect(getComplianceStatusText(49)).toBe("Compliance gaps detected");
    });
  });
});
