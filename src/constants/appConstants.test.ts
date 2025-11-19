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
  mapOptionsToConstants,
} from "./appConstants";
import { CIADetails } from "../types/cia-services";

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

  describe("mapOptionsToConstants", () => {
    const mockOptions: Record<string, CIADetails> = {
      None: {
        description: "None description",
        impact: "None impact",
        technical: "None technical",
        businessImpact: "None business impact",
        recommendations: [],
        capex: 0,
        opex: 0,
        bg: "#fff",
        text: "#000",
      },
      Low: {
        description: "Low description",
        impact: "Low impact",
        technical: "Low technical",
        businessImpact: "Low business impact",
        recommendations: ["Low recommendation"],
        capex: 5,
        opex: 2,
        bg: "#fef",
        text: "#111",
      },
      Moderate: {
        description: "Moderate description",
        impact: "Moderate impact",
        technical: "Moderate technical",
        businessImpact: "Moderate business impact",
        recommendations: ["Moderate recommendation"],
        capex: 10,
        opex: 5,
        bg: "#eee",
        text: "#222",
      },
      High: {
        description: "High description",
        impact: "High impact",
        technical: "High technical",
        businessImpact: "High business impact",
        recommendations: ["High recommendation"],
        capex: 15,
        opex: 8,
        bg: "#ddd",
        text: "#333",
      },
      "Very High": {
        description: "Very High description",
        impact: "Very High impact",
        technical: "Very High technical",
        businessImpact: "Very High business impact",
        recommendations: ["Very High recommendation"],
        capex: 20,
        opex: 10,
        bg: "#ccc",
        text: "#444",
      },
    };

    it("returns undefined values when options is null", () => {
      const result = mapOptionsToConstants(null as unknown as Record<string, CIADetails>, "description");

      expect(Object.values(result).every(v => v === undefined)).toBe(true);
    });

    it("returns undefined values when options is undefined", () => {
      const result = mapOptionsToConstants(undefined as unknown as Record<string, CIADetails>, "description");

      expect(Object.values(result).every(v => v === undefined)).toBe(true);
    });

    it("maps description field correctly", () => {
      const result = mapOptionsToConstants(mockOptions, "description");

      expect(result.NONE).toBe("None description");
      expect(result.LOW).toBe("Low description");
      expect(result.MODERATE).toBe("Moderate description");
      expect(result.HIGH).toBe("High description");
      expect(result.VERY_HIGH).toBe("Very High description");
    });

    it("maps impact field correctly", () => {
      const result = mapOptionsToConstants(mockOptions, "impact");

      expect(result.NONE).toBe("None impact");
      expect(result.LOW).toBe("Low impact");
      expect(result.MODERATE).toBe("Moderate impact");
      expect(result.HIGH).toBe("High impact");
      expect(result.VERY_HIGH).toBe("Very High impact");
    });

    it("maps technical field correctly", () => {
      const result = mapOptionsToConstants(mockOptions, "technical");

      expect(result.NONE).toBe("None technical");
      expect(result.LOW).toBe("Low technical");
      expect(result.MODERATE).toBe("Moderate technical");
      expect(result.HIGH).toBe("High technical");
      expect(result.VERY_HIGH).toBe("Very High technical");
    });

    it("applies transform function when provided", () => {
      const transform = (value: string, level: string) => `${level}: ${value}`;
      const result = mapOptionsToConstants(mockOptions, "description", transform);

      expect(result.NONE).toBe("None: None description");
      expect(result.LOW).toBe("Low: Low description");
      expect(result.MODERATE).toBe("Moderate: Moderate description");
      expect(result.HIGH).toBe("High: High description");
      expect(result.VERY_HIGH).toBe("Very High: Very High description");
    });

    it("applies transform function to numeric fields", () => {
      const transform = (value: number | undefined) => value ? value * 2 : 0;
      const result = mapOptionsToConstants(mockOptions, "capex", transform);

      expect(result.NONE).toBe(0);
      expect(result.LOW).toBe(10);
      expect(result.MODERATE).toBe(20);
      expect(result.HIGH).toBe(30);
      expect(result.VERY_HIGH).toBe(40);
    });

    it("handles missing options gracefully", () => {
      const incompleteOptions: Record<string, CIADetails> = {
        Low: mockOptions.Low,
        High: mockOptions.High,
      };

      const result = mapOptionsToConstants(incompleteOptions, "description");

      expect(result.NONE).toBeUndefined();
      expect(result.LOW).toBe("Low description");
      expect(result.MODERATE).toBeUndefined();
      expect(result.HIGH).toBe("High description");
      expect(result.VERY_HIGH).toBeUndefined();
    });

    it("returns values without transform when transform is not provided", () => {
      const result = mapOptionsToConstants(mockOptions, "capex");

      expect(result.NONE).toBe(0);
      expect(result.LOW).toBe(5);
      expect(result.MODERATE).toBe(10);
      expect(result.HIGH).toBe(15);
      expect(result.VERY_HIGH).toBe(20);
    });
  });
});
