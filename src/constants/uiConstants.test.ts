import { describe, expect, it } from "vitest";
import {
  WIDGET_ICONS,
  BUSINESS_IMPACT_ICONS,
  CIA_COMPONENT_ICONS,
  SECURITY_ICONS,
  SECURITY_LEVEL_COLORS,
  getComponentIcon,
  getBusinessImpactIcon,
  getSecurityIcon,
} from "./uiConstants";
import { CIAComponentType } from "../types/cia-services";

describe("uiConstants", () => {
  describe("WIDGET_ICONS", () => {
    it("contains all expected widget icons", () => {
      expect(WIDGET_ICONS.SECURITY_LEVEL).toBeDefined();
      expect(WIDGET_ICONS.SECURITY_SUMMARY).toBeDefined();
      expect(WIDGET_ICONS.SECURITY_VISUALIZATION).toBeDefined();
      expect(WIDGET_ICONS.COMPLIANCE_STATUS).toBeDefined();
      expect(WIDGET_ICONS.VALUE_CREATION).toBeDefined();
      expect(WIDGET_ICONS.COST_ESTIMATION).toBeDefined();
      expect(WIDGET_ICONS.BUSINESS_IMPACT).toBeDefined();
      expect(WIDGET_ICONS.TECHNICAL_IMPLEMENTATION).toBeDefined();
      expect(WIDGET_ICONS.AVAILABILITY_IMPACT).toBeDefined();
      expect(WIDGET_ICONS.INTEGRITY_IMPACT).toBeDefined();
      expect(WIDGET_ICONS.CONFIDENTIALITY_IMPACT).toBeDefined();
      expect(WIDGET_ICONS.SECURITY_RESOURCES).toBeDefined();
    });

    it("has non-empty icon strings", () => {
      Object.values(WIDGET_ICONS).forEach((icon) => {
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe("BUSINESS_IMPACT_ICONS", () => {
    it("contains all expected business impact category icons", () => {
      expect(BUSINESS_IMPACT_ICONS.financial).toBeDefined();
      expect(BUSINESS_IMPACT_ICONS.operational).toBeDefined();
      expect(BUSINESS_IMPACT_ICONS.reputational).toBeDefined();
      expect(BUSINESS_IMPACT_ICONS.regulatory).toBeDefined();
      expect(BUSINESS_IMPACT_ICONS.strategic).toBeDefined();
    });

    it("has non-empty icon strings", () => {
      Object.values(BUSINESS_IMPACT_ICONS).forEach((icon) => {
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe("CIA_COMPONENT_ICONS", () => {
    it("contains icons for all CIA components", () => {
      expect(CIA_COMPONENT_ICONS.availability).toBeDefined();
      expect(CIA_COMPONENT_ICONS.integrity).toBeDefined();
      expect(CIA_COMPONENT_ICONS.confidentiality).toBeDefined();
    });

    it("has non-empty icon strings", () => {
      Object.values(CIA_COMPONENT_ICONS).forEach((icon) => {
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
      });
    });

    it("has correct type annotation", () => {
      const components: CIAComponentType[] = [
        "availability",
        "integrity",
        "confidentiality",
      ];

      components.forEach((component) => {
        expect(CIA_COMPONENT_ICONS[component]).toBeDefined();
      });
    });
  });

  describe("SECURITY_ICONS", () => {
    it("contains all expected security concept icons", () => {
      expect(SECURITY_ICONS.risk).toBeDefined();
      expect(SECURITY_ICONS.recommendation).toBeDefined();
      expect(SECURITY_ICONS.compliance).toBeDefined();
      expect(SECURITY_ICONS.riskLevel).toBeDefined();
      expect(SECURITY_ICONS.security).toBeDefined();
      expect(SECURITY_ICONS.score).toBeDefined();
      expect(SECURITY_ICONS.details).toBeDefined();
      expect(SECURITY_ICONS.implementation).toBeDefined();
      expect(SECURITY_ICONS.value).toBeDefined();
      expect(SECURITY_ICONS.cost).toBeDefined();
      expect(SECURITY_ICONS.time).toBeDefined();
      expect(SECURITY_ICONS.effort).toBeDefined();
    });

    it("has non-empty icon strings", () => {
      Object.values(SECURITY_ICONS).forEach((icon) => {
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe("SECURITY_LEVEL_COLORS", () => {
    it("contains colors for all security levels", () => {
      expect(SECURITY_LEVEL_COLORS.NONE).toBeDefined();
      expect(SECURITY_LEVEL_COLORS.LOW).toBeDefined();
      expect(SECURITY_LEVEL_COLORS.MODERATE).toBeDefined();
      expect(SECURITY_LEVEL_COLORS.HIGH).toBeDefined();
      expect(SECURITY_LEVEL_COLORS.VERY_HIGH).toBeDefined();
    });

    it("has valid hex color codes", () => {
      Object.values(SECURITY_LEVEL_COLORS).forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe("getComponentIcon", () => {
    it("returns correct icon for valid CIA components", () => {
      expect(getComponentIcon("availability")).toBe(
        CIA_COMPONENT_ICONS.availability
      );
      expect(getComponentIcon("integrity")).toBe(CIA_COMPONENT_ICONS.integrity);
      expect(getComponentIcon("confidentiality")).toBe(
        CIA_COMPONENT_ICONS.confidentiality
      );
    });

    it("returns default icon for invalid component", () => {
      const defaultIcon = "🔵";
      expect(getComponentIcon("invalid" as CIAComponentType)).toBe(defaultIcon);
    });

    it("handles all valid CIA components", () => {
      const components: CIAComponentType[] = [
        "availability",
        "integrity",
        "confidentiality",
      ];

      components.forEach((component) => {
        const icon = getComponentIcon(component);
        expect(icon).toBeDefined();
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
      });
    });
  });

  describe("getBusinessImpactIcon", () => {
    it("returns correct icon for valid business impact categories", () => {
      expect(getBusinessImpactIcon("financial")).toBe(
        BUSINESS_IMPACT_ICONS.financial
      );
      expect(getBusinessImpactIcon("operational")).toBe(
        BUSINESS_IMPACT_ICONS.operational
      );
      expect(getBusinessImpactIcon("reputational")).toBe(
        BUSINESS_IMPACT_ICONS.reputational
      );
      expect(getBusinessImpactIcon("regulatory")).toBe(
        BUSINESS_IMPACT_ICONS.regulatory
      );
      expect(getBusinessImpactIcon("strategic")).toBe(
        BUSINESS_IMPACT_ICONS.strategic
      );
    });

    it("handles case-insensitive category names", () => {
      expect(getBusinessImpactIcon("FINANCIAL")).toBe(
        BUSINESS_IMPACT_ICONS.financial
      );
      expect(getBusinessImpactIcon("Financial")).toBe(
        BUSINESS_IMPACT_ICONS.financial
      );
      expect(getBusinessImpactIcon("financial")).toBe(
        BUSINESS_IMPACT_ICONS.financial
      );
    });

    it("returns default icon for invalid category", () => {
      const defaultIcon = "📊";
      expect(getBusinessImpactIcon("invalid-category")).toBe(defaultIcon);
      expect(getBusinessImpactIcon("")).toBe(defaultIcon);
    });

    it("handles all valid business impact categories", () => {
      const categories = [
        "financial",
        "operational",
        "reputational",
        "regulatory",
        "strategic",
      ];

      categories.forEach((category) => {
        const icon = getBusinessImpactIcon(category);
        expect(icon).toBeDefined();
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
        expect(icon).not.toBe("📊"); // Should not be default
      });
    });
  });

  describe("getSecurityIcon", () => {
    it("returns correct icon for valid security concepts", () => {
      expect(getSecurityIcon("risk")).toBe(SECURITY_ICONS.risk);
      expect(getSecurityIcon("recommendation")).toBe(SECURITY_ICONS.recommendation);
      expect(getSecurityIcon("compliance")).toBe(SECURITY_ICONS.compliance);
      expect(getSecurityIcon("security")).toBe(SECURITY_ICONS.security);
    });

    it("handles case-insensitive concept names", () => {
      expect(getSecurityIcon("RISK")).toBe(SECURITY_ICONS.risk);
      expect(getSecurityIcon("Risk")).toBe(SECURITY_ICONS.risk);
      expect(getSecurityIcon("risk")).toBe(SECURITY_ICONS.risk);
    });

    it("returns default icon for invalid concept", () => {
      const defaultIcon = "🔷";
      expect(getSecurityIcon("invalid-concept")).toBe(defaultIcon);
      expect(getSecurityIcon("")).toBe(defaultIcon);
    });

    it("handles all valid security concepts", () => {
      const concepts = [
        "risk",
        "recommendation",
        "compliance",
        "security",
        "score",
        "details",
        "implementation",
        "value",
        "cost",
        "time",
        "effort",
      ];

      concepts.forEach((concept) => {
        const icon = getSecurityIcon(concept);
        expect(icon).toBeDefined();
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
        expect(icon).not.toBe("🔷"); // Should not be default
      });
    });

    it("normalizes concept names to lowercase", () => {
      // Test that case variations return the same icon
      const upperIcon = getSecurityIcon("VALUE");
      const lowerIcon = getSecurityIcon("value");
      const mixedIcon = getSecurityIcon("Value");

      expect(upperIcon).toBe(lowerIcon);
      expect(lowerIcon).toBe(mixedIcon);
    });
  });
});
