import { describe, expect, it } from "vitest";
import {
  asSecurityLevel,
  categorySpecific,
  createCompoundTestId,
  createContextualTestId,
  createDynamicTestId,
  createTestId,
  createWidgetTestId,
  getTestId,
  TEST_HELPERS,
} from "./testIds";

describe("testIds utility functions", () => {
  describe("createCompoundTestId", () => {
    it("joins prefix and suffix with hyphen", () => {
      expect(createCompoundTestId("button", "submit")).toBe("button-submit");
      expect(createCompoundTestId("form", "login")).toBe("form-login");
    });
  });

  describe("createContextualTestId", () => {
    it("creates component-specific test IDs", () => {
      expect(createContextualTestId("dashboard", "header")).toBe(
        "dashboard-header"
      );
      expect(createContextualTestId("widget", "content")).toBe(
        "widget-content"
      );
    });
  });

  describe("getTestId", () => {
    it("creates a hyphenated test ID from prefix and id", () => {
      expect(getTestId("button", "submit")).toBe("button-submit");
      expect(getTestId("form", "login")).toBe("form-login");
    });
  });

  describe("createDynamicTestId", () => {
    it("valuePoint creates indexed test ID", () => {
      expect(createDynamicTestId.valuePoint(1)).toBe("value-point-1");
      expect(createDynamicTestId.valuePoint(5)).toBe("value-point-5");
    });

    it("implementationStep creates indexed test ID", () => {
      expect(createDynamicTestId.implementationStep(1)).toBe(
        "implementation-step-1"
      );
      expect(createDynamicTestId.implementationStep(3)).toBe(
        "implementation-step-3"
      );
    });

    it("techStack creates indexed test ID", () => {
      expect(createDynamicTestId.techStack(1)).toBe("tech-stack-1");
    });

    it("considerationItem creates indexed test ID", () => {
      expect(createDynamicTestId.considerationItem(2)).toBe(
        "consideration-item-2"
      );
    });

    it("considerationDescription creates indexed test ID", () => {
      expect(createDynamicTestId.considerationDescription(3)).toBe(
        "consideration-description-3"
      );
    });

    it("impactType creates indexed test ID", () => {
      expect(createDynamicTestId.impactType(1)).toBe("impact-type-1");
    });

    it("impactTypeKv creates indexed test ID", () => {
      expect(createDynamicTestId.impactTypeKv(2)).toBe("impact-type-kv-2");
    });

    it("riskBadge creates indexed test ID", () => {
      expect(createDynamicTestId.riskBadge(3)).toBe("risk-badge-3");
    });

    it("benefitItem creates indexed test ID", () => {
      expect(createDynamicTestId.benefitItem(1)).toBe("benefit-item-1");
    });

    it("keyBenefit creates indexed test ID", () => {
      expect(createDynamicTestId.keyBenefit(2)).toBe("key-benefit-2");
    });

    it("framework creates indexed test ID", () => {
      expect(createDynamicTestId.framework(1)).toBe("framework-1");
    });

    it("frameworkStatus creates framework-specific test ID", () => {
      expect(createDynamicTestId.frameworkStatus("iso27001")).toBe(
        "framework-status-iso27001"
      );
    });

    it("categorySpecific creates category-specific test ID", () => {
      expect(createDynamicTestId.categorySpecific("impact", "Financial")).toBe(
        "impact-financial"
      );
    });

    it("option creates level-specific test ID", () => {
      expect(createDynamicTestId.option("High")).toBe("option-High");
    });

    it("widgetId creates widget-specific test ID", () => {
      expect(createDynamicTestId.widgetId("security")).toBe("widget-security");
    });

    it("menuItem creates indexed test ID", () => {
      expect(createDynamicTestId.menuItem(1)).toBe("menu-item-1");
      expect(createDynamicTestId.menuItem(3)).toBe("menu-item-3");
    });

    it("securityLevel creates level-specific test ID", () => {
      expect(createDynamicTestId.securityLevel("High")).toBe("security-level-High");
      expect(createDynamicTestId.securityLevel("Moderate")).toBe("security-level-Moderate");
    });

    it("complianceControl creates control-specific test ID", () => {
      expect(createDynamicTestId.complianceControl("ac-1")).toBe("compliance-control-ac-1");
      expect(createDynamicTestId.complianceControl("sc-7")).toBe("compliance-control-sc-7");
    });

    it("impactItem creates indexed test ID", () => {
      expect(createDynamicTestId.impactItem(1)).toBe("impact-item-1");
      expect(createDynamicTestId.impactItem(5)).toBe("impact-item-5");
    });

    it("complianceFramework creates normalized framework test ID", () => {
      expect(createDynamicTestId.complianceFramework("ISO 27001")).toBe(
        "compliance-framework-iso-27001"
      );
      expect(createDynamicTestId.complianceFramework("NIST 800-53")).toBe(
        "compliance-framework-nist-800-53"
      );
    });

    it("securityResource creates indexed test ID", () => {
      expect(createDynamicTestId.securityResource(1)).toBe("security-resource-1");
      expect(createDynamicTestId.securityResource(10)).toBe("security-resource-10");
    });

    it("categorySpecific handles various category formats", () => {
      expect(createDynamicTestId.categorySpecific("impact", "financial")).toBe(
        "impact-financial"
      );
      expect(createDynamicTestId.categorySpecific("risk", "OPERATIONAL")).toBe(
        "risk-operational"
      );
      expect(createDynamicTestId.categorySpecific("metric", "ReputationAL")).toBe(
        "metric-reputational"
      );
    });
  });

  describe("TEST_HELPERS", () => {
    it("getValuePointsForLevel returns expected value points", () => {
      // Mock the VALUE_CREATION_POINTS if needed for this test
      expect(typeof TEST_HELPERS.getValuePointsForLevel).toBe("function");
    });

    it("toSecurityLevel converts string to SecurityLevel type", () => {
      expect(TEST_HELPERS.toSecurityLevel("High")).toBe("High");
    });
  });

  describe("asSecurityLevel", () => {
    it("converts string to SecurityLevel type", () => {
      expect(asSecurityLevel("High")).toBe("High");
      expect(asSecurityLevel("Low")).toBe("Low");
      expect(asSecurityLevel("None")).toBe("None");
    });
  });

  describe("createTestId", () => {
    it("creates test ID from single part", () => {
      expect(createTestId("widget")).toBe("widget");
    });

    it("creates test ID from multiple parts", () => {
      expect(createTestId("widget", "security", "level")).toBe("widget-security-level");
      expect(createTestId("button", "submit", "form")).toBe("button-submit-form");
    });

    it("normalizes parts to kebab-case", () => {
      expect(createTestId("Security Level")).toBe("security-level");
      expect(createTestId("Cost Estimation")).toBe("cost-estimation");
    });

    it("filters out empty parts", () => {
      expect(createTestId("widget", "", "content")).toBe("widget-content");
      expect(createTestId("", "button", "")).toBe("button");
    });

    it("handles parts with multiple spaces", () => {
      expect(createTestId("Security   Level   Widget")).toBe("security-level-widget");
    });
  });

  describe("createWidgetTestId", () => {
    it("creates widget test ID factory", () => {
      const widgetIds = createWidgetTestId("cost-estimation");
      expect(widgetIds.root).toBe("widget-cost-estimation");
    });

    it("normalizes widget name to kebab-case", () => {
      const widgetIds = createWidgetTestId("Security Summary");
      expect(widgetIds.root).toBe("widget-security-summary");
    });

    it("generates section IDs", () => {
      const widgetIds = createWidgetTestId("cost-estimation");
      expect(widgetIds.section("capex")).toBe("widget-cost-estimation-section-capex");
      expect(widgetIds.section("opex")).toBe("widget-cost-estimation-section-opex");
    });

    it("generates button IDs", () => {
      const widgetIds = createWidgetTestId("security-level");
      expect(widgetIds.button("submit")).toBe("widget-security-level-button-submit");
      expect(widgetIds.button("cancel")).toBe("widget-security-level-button-cancel");
    });

    it("generates value IDs", () => {
      const widgetIds = createWidgetTestId("cost");
      expect(widgetIds.value("total")).toBe("widget-cost-value-total");
      expect(widgetIds.value("capex")).toBe("widget-cost-value-capex");
    });

    it("generates label IDs", () => {
      const widgetIds = createWidgetTestId("security");
      expect(widgetIds.label("level")).toBe("widget-security-label-level");
      expect(widgetIds.label("description")).toBe("widget-security-label-description");
    });

    it("generates icon IDs", () => {
      const widgetIds = createWidgetTestId("widget");
      expect(widgetIds.icon("info")).toBe("widget-widget-icon-info");
      expect(widgetIds.icon("warning")).toBe("widget-widget-icon-warning");
    });

    it("generates input IDs", () => {
      const widgetIds = createWidgetTestId("form");
      expect(widgetIds.input("name")).toBe("widget-form-input-name");
      expect(widgetIds.input("email")).toBe("widget-form-input-email");
    });

    it("generates list IDs", () => {
      const widgetIds = createWidgetTestId("menu");
      expect(widgetIds.list("items")).toBe("widget-menu-list-items");
    });

    it("generates item IDs", () => {
      const widgetIds = createWidgetTestId("menu");
      expect(widgetIds.item("first")).toBe("widget-menu-item-first");
    });

    it("generates card IDs", () => {
      const widgetIds = createWidgetTestId("dashboard");
      expect(widgetIds.card("summary")).toBe("widget-dashboard-card-summary");
    });

    it("generates header IDs without name", () => {
      const widgetIds = createWidgetTestId("widget");
      expect(widgetIds.header()).toBe("widget-widget-header");
    });

    it("generates header IDs with name", () => {
      const widgetIds = createWidgetTestId("widget");
      expect(widgetIds.header("main")).toBe("widget-widget-header-main");
      expect(widgetIds.header("sub")).toBe("widget-widget-header-sub");
    });

    it("generates content IDs without name", () => {
      const widgetIds = createWidgetTestId("widget");
      expect(widgetIds.content()).toBe("widget-widget-content");
    });

    it("generates content IDs with name", () => {
      const widgetIds = createWidgetTestId("widget");
      expect(widgetIds.content("main")).toBe("widget-widget-content-main");
      expect(widgetIds.content("secondary")).toBe("widget-widget-content-secondary");
    });

    it("generates footer IDs without name", () => {
      const widgetIds = createWidgetTestId("widget");
      expect(widgetIds.footer()).toBe("widget-widget-footer");
    });

    it("generates footer IDs with name", () => {
      const widgetIds = createWidgetTestId("widget");
      expect(widgetIds.footer("actions")).toBe("widget-widget-footer-actions");
      expect(widgetIds.footer("info")).toBe("widget-widget-footer-info");
    });
  });

  describe("categorySpecific", () => {
    it("creates category-specific test ID", () => {
      expect(categorySpecific("impact", "financial")).toBe("impact-financial");
      expect(categorySpecific("risk", "operational")).toBe("risk-operational");
    });
  });

  describe("TEST_HELPERS", () => {
    it("matchTextAndClass returns a matcher function", () => {
      const matcher = TEST_HELPERS.matchTextAndClass("test", "className");
      expect(typeof matcher).toBe("function");
      
      const mockElement = {
        className: "test-className-other"
      } as Element;
      
      expect(matcher("test content", mockElement)).toBe(true);
      expect(matcher("other content", mockElement)).toBe(false);
      
      const mockElementNoClass = {
        className: "other-class"
      } as Element;
      expect(matcher("test content", mockElementNoClass)).toBe(false);
    });

    it("getValuePointsForLevel returns expected value points", () => {
      // Mock the VALUE_CREATION_POINTS if needed for this test
      expect(typeof TEST_HELPERS.getValuePointsForLevel).toBe("function");
    });

    it("toSecurityLevel converts string to SecurityLevel type", () => {
      expect(TEST_HELPERS.toSecurityLevel("High")).toBe("High");
    });
  });
});
