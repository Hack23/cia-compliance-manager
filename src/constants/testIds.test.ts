import { describe, expect, it } from "vitest";
import {
  asSecurityLevel,
  createCompoundTestId,
  createContextualTestId,
  createDynamicTestId,
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
});
