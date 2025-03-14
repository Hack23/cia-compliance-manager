import React from "react";
import { describe, expect, it } from "vitest";
import { WIDGET_ICONS, WIDGET_TITLES } from "../constants/coreConstants";
import {
  WIDGET_CONTENT,
  WIDGET_DESCRIPTIONS,
  WidgetConfig,
  WidgetSizePreset,
  WidgetType,
  asSecurityLevel,
  createWidgetConfig,
  evaluateWidgetVisibility,
  filterWidgets,
  formatSecurityLevel,
  getRiskBadgeClass,
  getSecurityLevelColors,
  getWidgetContent,
  getWidgetDescription,
  getWidgetIcon,
  getWidgetSize,
  getWidgetTitle,
  handleWidgetError,
  mapSecurityLevelToSeverity,
  sortWidgetsByPriority,
  widgetEmptyState,
  widgetLoadingIndicator,
} from "./widgetHelpers";

// Define a proper interface for testing React element props
interface ReactElementWithProps {
  type: string | React.ComponentType;
  props: {
    className?: string;
    "aria-label"?: string;
    children?: any;
    "data-testid"?: string;
    [key: string]: any;
  };
}

describe("Widget Helpers", () => {
  describe("getWidgetTitle", () => {
    it("returns the correct title for a given widget type", () => {
      expect(getWidgetTitle(WidgetType.SECURITY_LEVEL)).toBe(
        WIDGET_TITLES[WidgetType.SECURITY_LEVEL as keyof typeof WIDGET_TITLES]
      );
    });

    it("returns fallback for unknown widget type", () => {
      expect(getWidgetTitle("UNKNOWN_TYPE" as WidgetType)).toBe(
        "Unknown Widget"
      );
    });
  });

  describe("getWidgetIcon", () => {
    it("returns the correct icon for a given widget type", () => {
      expect(getWidgetIcon(WidgetType.SECURITY_LEVEL)).toBe(
        WIDGET_ICONS[WidgetType.SECURITY_LEVEL as keyof typeof WIDGET_ICONS]
      );
    });

    it("returns default icon for unknown widget type", () => {
      expect(getWidgetIcon("UNKNOWN_TYPE" as WidgetType)).toBe("help_outline");
    });
  });

  describe("getWidgetDescription", () => {
    it("returns the correct description for a widget type", () => {
      expect(getWidgetDescription(WidgetType.SECURITY_LEVEL)).toBe(
        WIDGET_DESCRIPTIONS[WidgetType.SECURITY_LEVEL]
      );
    });

    it("returns default description for unknown widget type", () => {
      expect(getWidgetDescription("UNKNOWN_TYPE" as WidgetType)).toBe(
        "No description available"
      );
    });
  });

  describe("getWidgetContent", () => {
    it("returns the correct content for a widget type", () => {
      expect(getWidgetContent(WidgetType.SECURITY_LEVEL)).toBe(
        WIDGET_CONTENT[WidgetType.SECURITY_LEVEL]
      );
    });

    it("returns empty string for unknown widget type", () => {
      expect(getWidgetContent("UNKNOWN_TYPE" as WidgetType)).toBe("");
    });
  });

  describe("createWidgetConfig", () => {
    it("creates a widget config with the provided values", () => {
      const config = createWidgetConfig({
        type: WidgetType.SECURITY_LEVEL,
        title: "Custom Title",
        description: "Custom Description",
        icon: "custom_icon",
        priority: 5,
        visible: false,
        size: WidgetSizePreset.LARGE,
      });

      expect(config).toEqual({
        type: WidgetType.SECURITY_LEVEL,
        title: "Custom Title",
        description: "Custom Description",
        icon: "custom_icon",
        priority: 5,
        visible: false,
        size: WidgetSizePreset.LARGE,
      });
    });

    it("uses default values when not provided", () => {
      const config = createWidgetConfig({
        type: WidgetType.SECURITY_LEVEL,
      });

      expect(config).toEqual({
        type: WidgetType.SECURITY_LEVEL,
        title: getWidgetTitle(WidgetType.SECURITY_LEVEL),
        description: getWidgetDescription(WidgetType.SECURITY_LEVEL),
        icon: getWidgetIcon(WidgetType.SECURITY_LEVEL),
        priority: 0,
        visible: true,
        size: WidgetSizePreset.DEFAULT,
      });
    });
  });

  describe("filterWidgets", () => {
    it("filters widgets based on visibility", () => {
      const widgets: WidgetConfig[] = [
        { type: WidgetType.SECURITY_LEVEL, visible: true } as WidgetConfig,
        { type: WidgetType.BUSINESS_IMPACT, visible: false } as WidgetConfig,
        { type: WidgetType.COMPLIANCE_STATUS, visible: true } as WidgetConfig,
      ];

      const filtered = filterWidgets(widgets);
      expect(filtered.length).toBe(2);

      // Use non-null assertion after length check
      if (filtered.length > 0) {
        const firstWidget = filtered[0]!;
        expect(firstWidget.type).toBe(WidgetType.SECURITY_LEVEL);
      }

      if (filtered.length > 1) {
        const secondWidget = filtered[1]!;
        expect(secondWidget.type).toBe(WidgetType.COMPLIANCE_STATUS);
      }
    });
  });

  describe("sortWidgetsByPriority", () => {
    it("sorts widgets by priority", () => {
      const widgets: WidgetConfig[] = [
        { type: "A", priority: 3 } as WidgetConfig,
        { type: "B", priority: 1 } as WidgetConfig,
        { type: "C", priority: 2 } as WidgetConfig,
      ];

      const sorted = sortWidgetsByPriority(widgets);
      expect(sorted.length).toBe(3);

      // Use non-null assertion after length check
      if (sorted.length > 0) {
        const firstWidget = sorted[0]!;
        expect(firstWidget.type).toBe("B");
      }

      if (sorted.length > 1) {
        const secondWidget = sorted[1]!;
        expect(secondWidget.type).toBe("C");
      }

      if (sorted.length > 2) {
        const thirdWidget = sorted[2]!;
        expect(thirdWidget.type).toBe("A");
      }
    });

    it("handles widgets with undefined priority", () => {
      const widgets: WidgetConfig[] = [
        { type: "A", priority: 3 } as WidgetConfig,
        { type: "B" } as WidgetConfig, // undefined priority
        { type: "C", priority: 1 } as WidgetConfig,
      ];

      const sorted = sortWidgetsByPriority(widgets);
      expect(sorted.length).toBe(3);

      // Use non-null assertion after length check
      if (sorted.length > 0) {
        const firstWidget = sorted[0]!;
        expect(firstWidget.type).toBe("B"); // Default 0 priority
      }

      if (sorted.length > 1) {
        const secondWidget = sorted[1]!;
        expect(secondWidget.type).toBe("C");
      }

      if (sorted.length > 2) {
        const thirdWidget = sorted[2]!;
        expect(thirdWidget.type).toBe("A");
      }
    });
  });

  describe("evaluateWidgetVisibility", () => {
    it("returns true when no min/max security levels are defined", () => {
      const widget: WidgetConfig = { type: "Test" };
      expect(evaluateWidgetVisibility(widget, "High")).toBe(true);
    });

    it("returns true when security level is within range", () => {
      const widget: WidgetConfig = {
        type: "Test",
        minSecurityLevel: 2,
        maxSecurityLevel: 4,
      };
      expect(evaluateWidgetVisibility(widget, "High")).toBe(true);
    });

    it("returns false when security level is below minimum", () => {
      const widget: WidgetConfig = {
        type: "Test",
        minSecurityLevel: 3,
      };
      expect(evaluateWidgetVisibility(widget, "Low")).toBe(false);
    });

    it("returns false when security level is above maximum", () => {
      const widget: WidgetConfig = {
        type: "Test",
        maxSecurityLevel: 2,
      };
      expect(evaluateWidgetVisibility(widget, "Very High")).toBe(false);
    });
  });

  describe("getWidgetSize", () => {
    it("returns the widget size if defined", () => {
      const widget: WidgetConfig = {
        type: "Test",
        size: WidgetSizePreset.LARGE,
      };
      expect(getWidgetSize(widget)).toBe(WidgetSizePreset.LARGE);
    });

    it("returns default size if not defined", () => {
      const widget: WidgetConfig = { type: "Test" };
      expect(getWidgetSize(widget)).toBe(WidgetSizePreset.DEFAULT);
    });
  });

  describe("mapSecurityLevelToSeverity", () => {
    it("correctly maps security levels to severity", () => {
      expect(mapSecurityLevelToSeverity("None")).toBe("none");
      expect(mapSecurityLevelToSeverity("Low")).toBe("low");
      expect(mapSecurityLevelToSeverity("Moderate")).toBe("moderate");
      expect(mapSecurityLevelToSeverity("Medium")).toBe("moderate");
      expect(mapSecurityLevelToSeverity("High")).toBe("high");
      expect(mapSecurityLevelToSeverity("Very High")).toBe("very-high");
    });
  });

  describe("getSecurityLevelColors", () => {
    it("returns color objects for security levels", () => {
      const colors = getSecurityLevelColors("High");
      expect(colors).toHaveProperty("bg");
      expect(colors).toHaveProperty("text");
    });
  });

  describe("getRiskBadgeClass", () => {
    it("returns appropriate badge classes for risk levels", () => {
      expect(getRiskBadgeClass("Critical")).toContain("bg-red");
      expect(getRiskBadgeClass("High")).toContain("bg-orange");
      expect(getRiskBadgeClass("Medium")).toContain("bg-yellow");
      expect(getRiskBadgeClass("Low")).toContain("bg-green");
      expect(getRiskBadgeClass("Minimal")).toContain("bg-blue");
      expect(getRiskBadgeClass("Unknown")).toContain("bg-gray");
    });
  });

  describe("asSecurityLevel", () => {
    it("normalizes security level strings", () => {
      expect(asSecurityLevel("high")).toBe("High");
      expect(asSecurityLevel("LOW")).toBe("Low");
      expect(asSecurityLevel("MODERATE")).toBe("Moderate");
      expect(asSecurityLevel("VerY HiGh")).toBe("Very High");
    });

    it("handles null or undefined values", () => {
      expect(asSecurityLevel(undefined)).toBe("None");
      expect(asSecurityLevel(null as unknown as string)).toBe("None");
    });
  });

  describe("formatSecurityLevel", () => {
    it("returns a formatted JSX element", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = formatSecurityLevel(
        "High"
      ) as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("className");
      expect(result.props).toHaveProperty("aria-label");
      expect(result.props["aria-label"]).toBe("Security level: High");
    });

    it("adds 'Security' label when withLabel is true", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = formatSecurityLevel(
        "High",
        true
      ) as unknown as ReactElementWithProps;
      expect(result.props.children).toBe("High Security");
    });
  });

  describe("handleWidgetError", () => {
    it("returns null when no error is provided", () => {
      expect(handleWidgetError(null)).toBeNull();
    });

    it("returns an error component when error is provided", () => {
      const error = new Error("Test error");
      // Fix: Use proper type assertion with the custom interface
      const result = handleWidgetError(
        error
      ) as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("data-testid", "widget-error");
      expect(result.props.children[1].props.children).toBe("Test error");
    });

    it("uses custom testId when provided", () => {
      const error = new Error("Test error");
      // Fix: Use proper type assertion with the custom interface
      const result = handleWidgetError(
        error,
        "test-custom-error"
      ) as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("data-testid", "test-custom-error");
    });
  });

  describe("widgetEmptyState", () => {
    it("returns empty state component with default message", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = widgetEmptyState() as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("data-testid", "widget-empty-state");
      expect(result.props.children.props.children).toBe("No data available");
    });

    it("uses custom message when provided", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = widgetEmptyState(
        "Custom empty message"
      ) as unknown as ReactElementWithProps;
      expect(result.props.children.props.children).toBe("Custom empty message");
    });

    it("uses custom testId when provided", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = widgetEmptyState(
        "Message",
        "custom-empty"
      ) as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("data-testid", "custom-empty");
    });
  });

  describe("widgetLoadingIndicator", () => {
    it("returns loading component with default message", () => {
      // Fix: Use proper type assertion with the custom interface
      const result =
        widgetLoadingIndicator() as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("data-testid", "widget-loading");
      expect(result.props.children.props.children).toBe("Loading...");
    });

    it("uses custom message when provided", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = widgetLoadingIndicator(
        "Custom loading..."
      ) as unknown as ReactElementWithProps;
      expect(result.props.children.props.children).toBe("Custom loading...");
    });

    it("uses custom testId when provided", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = widgetLoadingIndicator(
        "Loading...",
        "custom-loading"
      ) as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("data-testid", "custom-loading");
    });

    it("handles single parameter as testId", () => {
      // Fix: Use proper type assertion with the custom interface
      const result = widgetLoadingIndicator(
        "loading-test-id"
      ) as unknown as ReactElementWithProps;
      expect(result.props).toHaveProperty("data-testid", "loading-test-id");
    });
  });
});
