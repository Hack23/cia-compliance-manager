/**
 * Color Utilities Tests
 *
 * Tests for all color utility functions to ensure consistent
 * color representation of security levels across the application.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { SecurityLevel } from "../types/cia";
import * as colorUtils from "./colorUtils";

describe("Color Utilities", () => {
  describe("getSecurityLevelColorPair", () => {
    it("should return correct color pairs for each security level", () => {
      const noneColors = colorUtils.getSecurityLevelColorPair("None");
      const lowColors = colorUtils.getSecurityLevelColorPair("Low");
      const moderateColors = colorUtils.getSecurityLevelColorPair("Moderate");
      const highColors = colorUtils.getSecurityLevelColorPair("High");
      const veryHighColors = colorUtils.getSecurityLevelColorPair("Very High");

      expect(noneColors).toEqual({ bg: "#f5f5f5", text: "#a0a0a0" });
      expect(lowColors).toEqual({ bg: "#e3f2fd", text: "#1976d2" });
      expect(moderateColors).toEqual({ bg: "#e8f5e9", text: "#2e7d32" });
      expect(highColors).toEqual({ bg: "#fff8e1", text: "#ff8f00" });
      expect(veryHighColors).toEqual({ bg: "#fbe9e7", text: "#d84315" });
    });

    it("should return None colors for invalid security levels", () => {
      // @ts-expect-error - Testing invalid input
      const invalidColors = colorUtils.getSecurityLevelColorPair("Invalid");
      expect(invalidColors).toEqual({ bg: "#f5f5f5", text: "#a0a0a0" });
    });
  });

  describe("getSecurityLevelColorClass", () => {
    it("should return correct color classes for each security level", () => {
      expect(colorUtils.getSecurityLevelColorClass("None")).toBe(
        "text-red-600 dark:text-red-400"
      );
      expect(colorUtils.getSecurityLevelColorClass("Low")).toBe(
        "text-yellow-600 dark:text-yellow-400"
      );
      expect(colorUtils.getSecurityLevelColorClass("Moderate")).toBe(
        "text-blue-600 dark:text-blue-400"
      );
      expect(colorUtils.getSecurityLevelColorClass("High")).toBe(
        "text-green-600 dark:text-green-400"
      );
      expect(colorUtils.getSecurityLevelColorClass("Very High")).toBe(
        "text-purple-600 dark:text-purple-400"
      );
    });

    it("should handle case insensitivity", () => {
      expect(colorUtils.getSecurityLevelColorClass("none")).toBe(
        "text-red-600 dark:text-red-400"
      );
      expect(colorUtils.getSecurityLevelColorClass("LOW")).toBe(
        "text-yellow-600 dark:text-yellow-400"
      );
      expect(colorUtils.getSecurityLevelColorClass("moderate")).toBe(
        "text-blue-600 dark:text-blue-400"
      );
    });

    it("should return default color class for unknown levels", () => {
      expect(colorUtils.getSecurityLevelColorClass("Unknown")).toBe(
        "text-gray-600 dark:text-gray-400"
      );
      expect(colorUtils.getSecurityLevelColorClass("")).toBe(
        "text-gray-600 dark:text-gray-400"
      );
    });
  });

  describe("getSecurityLevelBackground", () => {
    it("should return correct background colors for each security level", () => {
      expect(colorUtils.getSecurityLevelBackground("None")).toBe("#f5f5f5");
      expect(colorUtils.getSecurityLevelBackground("Low")).toBe("#e3f2fd");
      expect(colorUtils.getSecurityLevelBackground("Moderate")).toBe("#e8f5e9");
      expect(colorUtils.getSecurityLevelBackground("High")).toBe("#fff8e1");
      expect(colorUtils.getSecurityLevelBackground("Very High")).toBe(
        "#fbe9e7"
      );
    });

    it("should use color pair background value", () => {
      // Instead of spying, verify the actual return values match
      const level: SecurityLevel = "Moderate";
      const colorPair = colorUtils.getSecurityLevelColorPair(level);
      const background = colorUtils.getSecurityLevelBackground(level);
      expect(background).toBe(colorPair.bg);
    });
  });

  describe("getSecurityLevelBackgroundClass", () => {
    it("should return correct background classes for each security level", () => {
      expect(colorUtils.getSecurityLevelBackgroundClass("None")).toBe(
        "bg-red-100 dark:bg-red-900 dark:bg-opacity-20"
      );
      expect(colorUtils.getSecurityLevelBackgroundClass("Low")).toBe(
        "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20"
      );
      expect(colorUtils.getSecurityLevelBackgroundClass("Moderate")).toBe(
        "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
      );
      expect(colorUtils.getSecurityLevelBackgroundClass("High")).toBe(
        "bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
      );
      expect(colorUtils.getSecurityLevelBackgroundClass("Very High")).toBe(
        "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
      );
    });

    it("should handle case insensitivity", () => {
      expect(colorUtils.getSecurityLevelBackgroundClass("none")).toBe(
        "bg-red-100 dark:bg-red-900 dark:bg-opacity-20"
      );
      expect(colorUtils.getSecurityLevelBackgroundClass("MODERATE")).toBe(
        "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
      );
    });

    it("should return default background class for unknown levels", () => {
      expect(colorUtils.getSecurityLevelBackgroundClass("Unknown")).toBe(
        "bg-gray-100 dark:bg-gray-800 dark:bg-opacity-20"
      );
      expect(colorUtils.getSecurityLevelBackgroundClass("")).toBe(
        "bg-gray-100 dark:bg-gray-800 dark:bg-opacity-20"
      );
    });
  });

  describe("getSecurityLevelTextColor", () => {
    it("should return correct text colors for each security level", () => {
      expect(colorUtils.getSecurityLevelTextColor("None")).toBe("#a0a0a0");
      expect(colorUtils.getSecurityLevelTextColor("Low")).toBe("#1976d2");
      expect(colorUtils.getSecurityLevelTextColor("Moderate")).toBe("#2e7d32");
      expect(colorUtils.getSecurityLevelTextColor("High")).toBe("#ff8f00");
      expect(colorUtils.getSecurityLevelTextColor("Very High")).toBe("#d84315");
    });

    it("should use color pair text value", () => {
      // Instead of spying, verify the actual return values match
      const level: SecurityLevel = "High";
      const colorPair = colorUtils.getSecurityLevelColorPair(level);
      const textColor = colorUtils.getSecurityLevelTextColor(level);
      expect(textColor).toBe(colorPair.text);
    });
  });

  describe("getRiskLevelColor", () => {
    it("should return correct colors for each risk level", () => {
      expect(colorUtils.getRiskLevelColor("Critical")).toBe("#d32f2f");
      expect(colorUtils.getRiskLevelColor("High")).toBe("#f57c00");
      expect(colorUtils.getRiskLevelColor("Medium")).toBe("#fbc02d");
      expect(colorUtils.getRiskLevelColor("Low")).toBe("#4caf50");
      expect(colorUtils.getRiskLevelColor("Minimal")).toBe("#2196f3");
    });

    it("should return Unknown color for invalid risk levels", () => {
      expect(colorUtils.getRiskLevelColor("InvalidRisk")).toBe("#9e9e9e");
      expect(colorUtils.getRiskLevelColor("")).toBe("#9e9e9e");
      expect(colorUtils.getRiskLevelColor("Unknown")).toBe("#9e9e9e");
    });
  });

  describe("getSecurityLevelHexColor", () => {
    beforeEach(() => {
      // Mock document.documentElement.classList
      Object.defineProperty(document.documentElement, "classList", {
        value: {
          contains: vi.fn(),
        },
        configurable: true,
      });
    });

    it("should return light mode colors when not in dark mode", () => {
      // Mock dark mode detection to return false
      vi.spyOn(document.documentElement.classList, "contains").mockReturnValue(
        false
      );

      expect(colorUtils.getSecurityLevelHexColor("None")).toBe("#f44336");
      expect(colorUtils.getSecurityLevelHexColor("Low")).toBe("#ff9800");
      expect(colorUtils.getSecurityLevelHexColor("Moderate")).toBe("#2196f3");
      expect(colorUtils.getSecurityLevelHexColor("High")).toBe("#4caf50");
      expect(colorUtils.getSecurityLevelHexColor("Very High")).toBe("#9c27b0");
    });

    it("should return dark mode colors when in dark mode", () => {
      // Mock dark mode detection to return true
      vi.spyOn(document.documentElement.classList, "contains").mockReturnValue(
        true
      );

      expect(colorUtils.getSecurityLevelHexColor("None")).toBe("#ef5350");
      expect(colorUtils.getSecurityLevelHexColor("Low")).toBe("#ffb74d");
      expect(colorUtils.getSecurityLevelHexColor("Moderate")).toBe("#4fc3f7");
      expect(colorUtils.getSecurityLevelHexColor("High")).toBe("#66bb6a");
      expect(colorUtils.getSecurityLevelHexColor("Very High")).toBe("#ab47bc");
    });

    it("should handle case insensitivity", () => {
      vi.spyOn(document.documentElement.classList, "contains").mockReturnValue(
        false
      );

      expect(colorUtils.getSecurityLevelHexColor("none")).toBe("#f44336");
      expect(colorUtils.getSecurityLevelHexColor("HIGH")).toBe("#4caf50");
    });

    it("should return default gray for unknown levels", () => {
      vi.spyOn(document.documentElement.classList, "contains").mockReturnValue(
        false
      );
      expect(colorUtils.getSecurityLevelHexColor("Unknown")).toBe("#757575");

      vi.spyOn(document.documentElement.classList, "contains").mockReturnValue(
        true
      );
      expect(colorUtils.getSecurityLevelHexColor("Unknown")).toBe("#9e9e9e");
    });
  });

  describe("getSecurityLevelClass", () => {
    it("should return correct CSS class for each security level", () => {
      expect(colorUtils.getSecurityLevelClass("None")).toBe(
        "security-level-none"
      );
      expect(colorUtils.getSecurityLevelClass("Low")).toBe(
        "security-level-low"
      );
      expect(colorUtils.getSecurityLevelClass("Moderate")).toBe(
        "security-level-moderate"
      );
      expect(colorUtils.getSecurityLevelClass("High")).toBe(
        "security-level-high"
      );
      expect(colorUtils.getSecurityLevelClass("Very High")).toBe(
        "security-level-very-high"
      );
    });

    it("should handle complex security level names with spaces", () => {
      const customLevel = "Custom Level Name" as SecurityLevel;
      expect(colorUtils.getSecurityLevelClass(customLevel)).toBe(
        "security-level-custom-level-name"
      );
    });
  });

  describe("getContrastColor", () => {
    it("should return black for light background colors", () => {
      expect(colorUtils.getContrastColor("#FFFFFF")).toBe("#000000"); // White
      expect(colorUtils.getContrastColor("#F5F5F5")).toBe("#000000"); // Light gray
      expect(colorUtils.getContrastColor("#E8F5E9")).toBe("#000000"); // Light green
      expect(colorUtils.getContrastColor("#FFECB3")).toBe("#000000"); // Light amber
    });

    it("should return white for dark background colors", () => {
      expect(colorUtils.getContrastColor("#000000")).toBe("#ffffff"); // Black
      expect(colorUtils.getContrastColor("#1976D2")).toBe("#ffffff"); // Dark blue
      expect(colorUtils.getContrastColor("#D32F2F")).toBe("#ffffff"); // Dark red
      expect(colorUtils.getContrastColor("#212121")).toBe("#ffffff"); // Dark gray
    });

    it("should handle RGB color conversion correctly", () => {
      // 50% luminance boundary test (should be black)
      expect(colorUtils.getContrastColor("#808080")).toBe("#000000");

      // Just below 50% luminance (should be white)
      expect(colorUtils.getContrastColor("#7F7F7F")).toBe("#ffffff");
    });
  });
});
