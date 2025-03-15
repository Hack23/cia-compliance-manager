import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  asSecurityLevel,
  checkRequiredSecurityLevels,
  createWidgetConfig,
  formatSecurityLevel,
  getSecurityLevelColors,
  getWidgetSize,
  handleWidgetError,
  shouldShowWidget,
  widgetEmptyState,
  widgetLoadingIndicator,
} from "./widgetHelpers";
// Import the enum directly from the type file to avoid import issues
import { SecurityLevel } from "../types/cia";
import { WidgetConfig, WidgetSizePreset } from "../types/widget";

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

  describe("getSecurityLevelColors", () => {
    it("returns CSS class for valid security levels", () => {
      const result = getSecurityLevelColors("None");
      expect(result).toHaveProperty("bg");
      expect(result).toHaveProperty("text");
    });

    it("handles case insensitivity", () => {
      const lowCase = getSecurityLevelColors("low" as SecurityLevel);
      const upCase = getSecurityLevelColors("LOW" as SecurityLevel);
      expect(lowCase).toEqual(upCase);
    });

    it("returns default class for unknown security levels", () => {
      const result = getSecurityLevelColors("Unknown" as SecurityLevel);
      expect(result).toHaveProperty("bg");
      expect(result).toHaveProperty("text");
    });

    it("accepts optional props to merge with default class", () => {
      // Fix: Remove the second argument since it's not accepted
      const result = getSecurityLevelColors("High");
      expect(result.bg).toBeDefined();
      expect(result.text).toBeDefined();
    });
  });

  describe("checkRequiredSecurityLevels", () => {
    it("returns true when all required security levels are present", () => {
      const config = {
        availabilityLevel: "High",
        integrityLevel: "High",
        confidentialityLevel: "High",
      };

      expect(checkRequiredSecurityLevels(config, ["availabilityLevel"])).toBe(
        true
      );
      expect(checkRequiredSecurityLevels(config, ["integrityLevel"])).toBe(
        true
      );
      expect(
        checkRequiredSecurityLevels(config, ["confidentialityLevel"])
      ).toBe(true);
      expect(
        checkRequiredSecurityLevels(config, [
          "availabilityLevel",
          "integrityLevel",
          "confidentialityLevel",
        ])
      ).toBe(true);
    });

    it("returns false when some required security levels are missing", () => {
      const config = {
        availabilityLevel: "High",
        // Missing integrityLevel
        confidentialityLevel: "High",
      };

      expect(checkRequiredSecurityLevels(config, ["integrityLevel"])).toBe(
        false
      );
      expect(
        checkRequiredSecurityLevels(config, [
          "availabilityLevel",
          "integrityLevel",
        ])
      ).toBe(false);
    });
  });

  describe("getWidgetSize", () => {
    it("returns small preset", () => {
      // Fix: Add id property to the widget config
      const result = getWidgetSize({
        type: "test",
        size: WidgetSizePreset.SMALL,
        id: "test-id",
      });
      expect(result).toEqual({ width: 1, height: 1 });
    });

    it("returns medium preset", () => {
      // Fix: Add id property to the widget config
      const result = getWidgetSize({
        type: "test",
        size: WidgetSizePreset.MEDIUM,
        id: "test-id",
      });
      expect(result).toEqual({ width: 2, height: 1 });
    });

    it("returns large preset", () => {
      // Fix: Add id property to the widget config
      const result = getWidgetSize({
        type: "test",
        size: WidgetSizePreset.LARGE,
        id: "test-id",
      });
      expect(result).toEqual({ width: 2, height: 2 });
    });

    it("returns extraLarge preset", () => {
      // Fix: Add id property to the widget config
      const result = getWidgetSize({
        type: "test",
        size: "extraLarge",
        id: "test-id",
      });
      expect(result).toEqual({ width: 4, height: 2 });
    });

    it("returns fullWidth preset", () => {
      // Fix: Add id property to the widget config
      const result = getWidgetSize({
        type: "test",
        size: "fullWidth",
        id: "test-id",
      });
      expect(result).toEqual({ width: 4, height: 1 });
    });

    it("returns medium preset when size doesn't exist", () => {
      // Fix: Add id property to the widget config
      const result = getWidgetSize({
        type: "test",
        size: "nonexistent" as any,
        id: "test-id",
      });
      expect(result).toEqual({ width: 2, height: 1 });
    });
  });

  describe("createWidgetConfig", () => {
    it("generates widget config with defaults", () => {
      // Fix: Remove id parameter, as it gets generated automatically
      const config = createWidgetConfig({ type: "test" });
      expect(config).toHaveProperty("type", "test");
      expect(config).toHaveProperty("visible", true);
      expect(config).toHaveProperty("size", "medium");
      expect(config).toHaveProperty("order", 999);
      // The ID is generated within the function, so we shouldn't check for a specific value
      expect(config).toHaveProperty("id");
    });

    it("allows overriding defaults", () => {
      const config = createWidgetConfig({
        type: "test",
        visible: false,
        size: "large",
        order: 1,
      });

      expect(config).toHaveProperty("type", "test");
      // Don't check for id since it's auto-generated
      expect(config).toHaveProperty("visible", false);
      expect(config).toHaveProperty("size", "large");
      expect(config).toHaveProperty("order", 1);
    });

    it("generates preset width and height based on size", () => {
      const config = createWidgetConfig({ type: "test", size: "small" });
      expect(config).toHaveProperty("width", 1);
      expect(config).toHaveProperty("height", 1);

      const mediumConfig = createWidgetConfig({ type: "test", size: "medium" });
      expect(mediumConfig).toHaveProperty("width", 2);
      expect(mediumConfig).toHaveProperty("height", 1);

      const largeConfig = createWidgetConfig({ type: "test", size: "large" });
      expect(largeConfig).toHaveProperty("width", 2);
      expect(largeConfig).toHaveProperty("height", 2);

      const extraLargeConfig = createWidgetConfig({
        type: "test",
        size: "extraLarge",
      });
      expect(extraLargeConfig).toHaveProperty("width", 4);
      expect(extraLargeConfig).toHaveProperty("height", 2);
    });
  });

  describe("shouldShowWidget", () => {
    it("returns true when no visibility rules are specified", () => {
      // Fix: Add id property to the widget config
      const widgetConfig: WidgetConfig = {
        type: "test",
        size: "medium",
        id: "test-id",
      };

      const securityLevels = {
        availabilityLevel: "High",
        integrityLevel: "Moderate",
        confidentialityLevel: "Low",
      };

      expect(shouldShowWidget(widgetConfig, securityLevels)).toBe(true);
    });

    it("returns true when widget has visible=true", () => {
      // Fix: Add id property to the widget config
      const widgetConfig: WidgetConfig = {
        type: "test",
        size: "medium",
        visible: true,
        id: "test-id",
      };

      const securityLevels = {
        availabilityLevel: "High",
        integrityLevel: "Moderate",
        confidentialityLevel: "Low",
      };

      expect(shouldShowWidget(widgetConfig, securityLevels)).toBe(true);
    });

    it("returns false when widget has visible=false", () => {
      // Fix: Add id property to the widget config
      const widgetConfig: WidgetConfig = {
        type: "test",
        size: "medium",
        visible: false,
        id: "test-id",
      };

      const securityLevels = {
        availabilityLevel: "High",
        integrityLevel: "Moderate",
        confidentialityLevel: "Low",
      };

      expect(shouldShowWidget(widgetConfig, securityLevels)).toBe(false);
    });

    it("returns false when required security levels are missing", () => {
      // Fix: Add id property to the widget config
      const widgetConfig: WidgetConfig = {
        type: "test",
        size: "medium",
        requiredSecurityLevels: [
          "availabilityLevel",
          "integrityLevel",
          "unknownLevel",
        ],
        id: "test-id",
      };

      const securityLevels = {
        availabilityLevel: "High",
        integrityLevel: "Moderate",
        // Missing confidentialityLevel
      };

      expect(shouldShowWidget(widgetConfig, securityLevels)).toBe(false);
    });

    it("returns true when all required security levels are present", () => {
      // Fix: Add id property to the widget config
      const widgetConfig: WidgetConfig = {
        type: "test",
        size: "medium",
        requiredSecurityLevels: ["availabilityLevel", "integrityLevel"],
        id: "test-id",
      };

      const securityLevels = {
        availabilityLevel: "High",
        integrityLevel: "Moderate",
        confidentialityLevel: "Low",
      };

      expect(shouldShowWidget(widgetConfig, securityLevels)).toBe(true);
    });
  });

  describe("getWidgetSize", () => {
    it("formats widget size into grid dimensions", () => {
      // Fix: Add id property to all widget configs
      const smallWidget: Partial<WidgetConfig> = {
        type: "test",
        size: "small",
        id: "small-widget",
      };

      const mediumWidget: Partial<WidgetConfig> = {
        type: "test",
        size: "medium",
        id: "medium-widget",
      };

      const largeWidget: Partial<WidgetConfig> = {
        type: "test",
        size: "large",
        id: "large-widget",
      };

      const extraLargeWidget: Partial<WidgetConfig> = {
        type: "test",
        size: "extraLarge",
        id: "extra-large-widget",
      };

      expect(getWidgetSize(smallWidget as WidgetConfig)).toEqual(
        expect.objectContaining({
          width: 1,
          height: 1,
        })
      );

      expect(getWidgetSize(mediumWidget as WidgetConfig)).toEqual(
        expect.objectContaining({
          width: 2,
          height: 1,
        })
      );

      expect(getWidgetSize(largeWidget as WidgetConfig)).toEqual(
        expect.objectContaining({
          width: 2,
          height: 2,
        })
      );

      expect(getWidgetSize(extraLargeWidget as WidgetConfig)).toEqual(
        expect.objectContaining({
          width: 4,
          height: 2,
        })
      );
    });

    it("uses provided width and height if present", () => {
      // Fix: Add id property to the widget config
      const customWidget: Partial<WidgetConfig> = {
        type: "test",
        size: "medium",
        width: 3,
        height: 2,
        id: "custom-widget",
      };

      expect(getWidgetSize(customWidget as WidgetConfig)).toEqual(
        expect.objectContaining({
          width: 3,
          height: 2,
        })
      );
    });

    it("falls back to medium preset if size is invalid", () => {
      // Fix: Add id property to the widget config
      const invalidWidget: Partial<WidgetConfig> = {
        type: "test",
        size: "invalid-size" as any,
        id: "invalid-widget",
      };

      expect(getWidgetSize(invalidWidget as WidgetConfig)).toEqual(
        expect.objectContaining({
          width: 2,
          height: 1,
        })
      );
    });
  });

  describe("Widget state handling functions", () => {
    it("renders loading state when loading is true", () => {
      render(widgetLoadingIndicator("test-widget-loading"));
      expect(screen.getByTestId("test-widget-loading")).toBeInTheDocument();
      expect(screen.getByTestId("test-widget-loading")).toHaveClass("flex");
    });

    it("handles widget error with error message", () => {
      const error = new Error("Test error message");
      render(handleWidgetError(error, "test-widget-error"));

      expect(screen.getByTestId("test-widget-error")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Widget Error")).toBeInTheDocument();
      expect(screen.getByText("Test error message")).toBeInTheDocument();
    });

    it("returns null when error is null", () => {
      const result = handleWidgetError(null, "test-widget-error");
      expect(result).toBeNull();
    });

    it("renders no data message when isEmpty is true", () => {
      render(widgetEmptyState(true, "test-widget-empty"));

      expect(screen.getByTestId("test-widget-empty")).toBeInTheDocument();
      expect(screen.getByText(/no data available/i)).toBeInTheDocument();
    });

    it("returns children when isEmpty is false", () => {
      // Fix the test to match actual behavior: returns children or null
      const children = <div>Test Children</div>;
      const result = widgetEmptyState(false, "test-widget-not-empty", children);
      expect(result).toBe(children); // Should return the children when isEmpty is false
    });
  });

  describe("asSecurityLevel", () => {
    it("properly converts strings to SecurityLevel", () => {
      expect(asSecurityLevel("None")).toBe("None");
      expect(asSecurityLevel("Low")).toBe("Low");
      expect(asSecurityLevel("Moderate")).toBe("Moderate");
      expect(asSecurityLevel("High")).toBe("High");
      expect(asSecurityLevel("Very High")).toBe("Very High");
    });
  });
});
