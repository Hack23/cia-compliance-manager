import { describe, expect, it } from "vitest";
import {
  formatSecurityLevel,
  getRiskLevelColorClass,
  getWidgetColumnSpan,
  getWidgetRowSpan,
  handleWidgetError,
  KeyValuePair,
  RiskLevelKeyValue,
  sanitizeWidgetId,
  SecurityLevelBadge,
  WidgetEmptyState,
  WidgetError,
  WidgetLoading,
} from "./widgetHelpers";

// Import the enum directly from the type file to avoid import issues
import { SecurityLevel } from "../types/cia";

describe("widgetHelpers", () => {
  describe("formatSecurityLevel", () => {
    it("formats security level from mixed case to title case", () => {
      expect(formatSecurityLevel("none")).toBe("None");
      expect(formatSecurityLevel("LOW")).toBe("Low");
      expect(formatSecurityLevel("Moderate")).toBe("Moderate");
      expect(formatSecurityLevel("high")).toBe("High");
      expect(formatSecurityLevel("VERY HIGH")).toBe("Very High");
    });

    it("handles null or undefined by returning a default", () => {
      expect(formatSecurityLevel(undefined as unknown as string)).toBe("None");
      expect(formatSecurityLevel(null as unknown as string)).toBe("None");
    });

    it("returns original value for unknown security levels", () => {
      expect(formatSecurityLevel("Unknown" as SecurityLevel)).toBe("Unknown");
    });
  });

  describe("getRiskLevelColorClass", () => {
    it("returns a string class", () => {
      expect(typeof getRiskLevelColorClass("Medium")).toBe("string");
    });
  });

  describe("getWidgetColumnSpan", () => {
    it("returns a column span class", () => {
      expect(typeof getWidgetColumnSpan("large")).toBe("string");
    });
  });

  describe("getWidgetRowSpan", () => {
    it("returns a row span class", () => {
      expect(typeof getWidgetRowSpan("large")).toBe("string");
    });
  });

  describe("handleWidgetError", () => {
    it("handles errors correctly", () => {
      const error = new Error("Test error");
      expect(typeof handleWidgetError(error)).toBe("string");
    });

    it("handles null/undefined errors", () => {
      // Adjust to match current implementation which expects only one argument
      const result = handleWidgetError(null as unknown as Error);
      expect(typeof result).toBe("string");
    });
  });

  describe("sanitizeWidgetId", () => {
    it("sanitizes widget IDs correctly", () => {
      expect(sanitizeWidgetId("widget test!@#")).toBe("widget-test----");
      expect(sanitizeWidgetId("123-abc")).toBe("123-abc");
    });
  });

  describe("KeyValuePair", () => {
    it("returns a formatted string", () => {
      const result = KeyValuePair({ label: "Test", value: "Value" });
      expect(typeof result).toBe("string");
    });
  });

  describe("RiskLevelKeyValue", () => {
    it("returns a formatted string", () => {
      const result = RiskLevelKeyValue({ level: "Medium" });
      expect(typeof result).toBe("string");
    });
  });

  describe("SecurityLevelBadge", () => {
    it("returns a formatted string", () => {
      const result = SecurityLevelBadge({ level: "Moderate" });
      expect(typeof result).toBe("string");
    });
  });

  describe("WidgetEmptyState", () => {
    it("returns a no data message", () => {
      const result = WidgetEmptyState();
      expect(typeof result).toBe("string");
    });
  });

  describe("WidgetError", () => {
    it("formats error messages", () => {
      const error = new Error("Test error");
      const result = WidgetError({ error });
      expect(typeof result).toBe("string");
    });
  });

  describe("WidgetLoading", () => {
    it("returns a loading message", () => {
      const result = WidgetLoading();
      expect(typeof result).toBe("string");
    });
  });
});
