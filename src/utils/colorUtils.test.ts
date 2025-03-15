import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import {
  getSecurityLevelBackgroundClass,
  getSecurityLevelColorClass,
  getSecurityLevelHexColor,
} from "./colorUtils";

describe("colorUtils", () => {
  describe("getSecurityLevelColorClass", () => {
    it("returns correct color class for each security level", () => {
      expect(getSecurityLevelColorClass("None")).toBe(
        "text-red-600 dark:text-red-400"
      );
      expect(getSecurityLevelColorClass("Low")).toBe(
        "text-yellow-600 dark:text-yellow-400"
      );
      expect(getSecurityLevelColorClass("Moderate")).toBe(
        "text-blue-600 dark:text-blue-400"
      );
      expect(getSecurityLevelColorClass("High")).toBe(
        "text-green-600 dark:text-green-400"
      );
      expect(getSecurityLevelColorClass("Very High")).toBe(
        "text-purple-600 dark:text-purple-400"
      );
    });

    it("handles case-insensitivity", () => {
      expect(getSecurityLevelColorClass("none")).toBe(
        "text-red-600 dark:text-red-400"
      );
      expect(getSecurityLevelColorClass("MODERATE")).toBe(
        "text-blue-600 dark:text-blue-400"
      );
    });

    it("returns default class for unknown levels", () => {
      expect(getSecurityLevelColorClass("Unknown" as SecurityLevel)).toBe(
        "text-gray-600 dark:text-gray-400"
      );
    });
  });

  describe("getSecurityLevelBackgroundClass", () => {
    it("returns correct background class for each security level", () => {
      expect(getSecurityLevelBackgroundClass("None")).toBe(
        "bg-red-100 dark:bg-red-900 dark:bg-opacity-20"
      );
      expect(getSecurityLevelBackgroundClass("Low")).toBe(
        "bg-yellow-100 dark:bg-yellow-900 dark:bg-opacity-20"
      );
      expect(getSecurityLevelBackgroundClass("Moderate")).toBe(
        "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
      );
      expect(getSecurityLevelBackgroundClass("High")).toBe(
        "bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
      );
      expect(getSecurityLevelBackgroundClass("Very High")).toBe(
        "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
      );
    });
  });

  describe("getSecurityLevelHexColor", () => {
    it("returns a hex color string", () => {
      // Just check that it returns a string - exact colors might vary
      const color = getSecurityLevelHexColor("High");
      expect(typeof color).toBe("string");
      expect(color).toMatch(/#[0-9a-f]{6}/i);
    });
  });
});
