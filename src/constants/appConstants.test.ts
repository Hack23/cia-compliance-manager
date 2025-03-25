import { describe, expect, it } from "vitest";
import {
  CIA_DESCRIPTIONS,
  CIA_LABELS,
  IMPLEMENTATION_COSTS,
  SECURITY_LEVEL_COLORS,
  SECURITY_LEVELS,
  SECURITY_RECOMMENDATIONS,
  WIDGET_ICONS,
  WIDGET_TITLES,
} from "./appConstants";

describe("Application Constants", () => {
  describe("SECURITY_LEVEL_COLORS", () => {
    it("should contain the expected security levels", () => {
      // Just verify that the object exists and has the expected keys
      expect(SECURITY_LEVEL_COLORS).toBeDefined();
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("NONE");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("LOW");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("MODERATE");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("HIGH");
      expect(Object.keys(SECURITY_LEVEL_COLORS)).toContain("VERY_HIGH");
    });
  });

  describe("WIDGET_ICONS", () => {
    it("should contain the expected widget icon keys", () => {
      // Just verify that the object exists and has expected properties
      expect(WIDGET_ICONS).toBeDefined();
      expect(typeof WIDGET_ICONS).toBe("object");
      expect(Object.keys(WIDGET_ICONS).length).toBeGreaterThan(0);
    });
  });

  it("should have defined WIDGET_ICONS", () => {
    expect(WIDGET_ICONS).toBeDefined();
    expect(WIDGET_ICONS.SECURITY_LEVEL).toBeDefined();
    expect(WIDGET_ICONS.SECURITY_SUMMARY).toBeDefined();
    expect(WIDGET_ICONS.COMPLIANCE_STATUS).toBeDefined();
    expect(WIDGET_ICONS.VALUE_CREATION).toBeDefined();
    expect(WIDGET_ICONS.COST_ESTIMATION).toBeDefined();
  });

  it("should have defined WIDGET_TITLES", () => {
    expect(WIDGET_TITLES).toBeDefined();
    expect(WIDGET_TITLES.SECURITY_LEVEL).toBeDefined();
    expect(WIDGET_TITLES.SECURITY_SUMMARY).toBeDefined();
    expect(WIDGET_TITLES.COMPLIANCE_STATUS).toBeDefined();
    expect(WIDGET_TITLES.VALUE_CREATION).toBeDefined();
    expect(WIDGET_TITLES.COST_ESTIMATION).toBeDefined();
  });

  it("should have correctly defined SECURITY_LEVELS", () => {
    expect(SECURITY_LEVELS).toBeDefined();
    expect(SECURITY_LEVELS.NONE).toBe("None");
    expect(SECURITY_LEVELS.LOW).toBe("Low");
    expect(SECURITY_LEVELS.MODERATE).toBe("Moderate");
    expect(SECURITY_LEVELS.HIGH).toBe("High");
    expect(SECURITY_LEVELS.VERY_HIGH).toBe("Very High");
  });

  it("should have consistent CIA_LABELS", () => {
    expect(CIA_LABELS).toBeDefined();
    expect(CIA_LABELS.AVAILABILITY).toBe("Availability");
    expect(CIA_LABELS.INTEGRITY).toBe("Integrity");
    expect(CIA_LABELS.CONFIDENTIALITY).toBe("Confidentiality");
  });

  it("should have defined CIA_DESCRIPTIONS", () => {
    expect(CIA_DESCRIPTIONS).toBeDefined();
    expect(CIA_DESCRIPTIONS.AVAILABILITY).toBeDefined();
    expect(CIA_DESCRIPTIONS.INTEGRITY).toBeDefined();
    expect(CIA_DESCRIPTIONS.CONFIDENTIALITY).toBeDefined();
  });

  it("should have defined SECURITY_RECOMMENDATIONS", () => {
    expect(SECURITY_RECOMMENDATIONS).toBeDefined();
    expect(SECURITY_RECOMMENDATIONS.NONE).toBeDefined();
    expect(SECURITY_RECOMMENDATIONS.LOW).toBeDefined();
    expect(SECURITY_RECOMMENDATIONS.MODERATE).toBeDefined();
    expect(SECURITY_RECOMMENDATIONS.HIGH).toBeDefined();
    expect(SECURITY_RECOMMENDATIONS.VERY_HIGH).toBeDefined();
  });

  it("should have defined IMPLEMENTATION_COSTS", () => {
    expect(IMPLEMENTATION_COSTS).toBeDefined();

    const securityLevels = ["None", "Low", "Moderate", "High", "Very High"];
    securityLevels.forEach((level) => {
      expect(IMPLEMENTATION_COSTS[level]).toBeDefined();
      expect(IMPLEMENTATION_COSTS[level].developmentEffort).toBeDefined();
      expect(IMPLEMENTATION_COSTS[level].maintenance).toBeDefined();
      expect(IMPLEMENTATION_COSTS[level].expertise).toBeDefined();
    });
  });

  it("should have consistent naming conventions across constants", () => {
    // Check widget titles match expected format
    Object.keys(WIDGET_TITLES).forEach((key) => {
      expect(typeof WIDGET_TITLES[key as keyof typeof WIDGET_TITLES]).toBe(
        "string"
      );
      expect(
        WIDGET_TITLES[key as keyof typeof WIDGET_TITLES].length
      ).toBeGreaterThan(0);
    });

    // Check widget icons match expected format
    Object.keys(WIDGET_ICONS).forEach((key) => {
      expect(typeof WIDGET_ICONS[key as keyof typeof WIDGET_ICONS]).toBe(
        "string"
      );
      expect(
        WIDGET_ICONS[key as keyof typeof WIDGET_ICONS].length
      ).toBeGreaterThan(0);
    });
  });
});
