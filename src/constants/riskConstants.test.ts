import { describe, expect, it } from "vitest";
import {
  RISK_LEVELS,
  BUSINESS_IMPACT_CATEGORIES,
  BUSINESS_IMPACT_CATEGORY_LIST,
  SECURITY_TO_RISK_MAP,
  RISK_LEVEL_DESCRIPTIONS,
  FINANCIAL_IMPACT,
  OPERATIONAL_IMPACT,
  REPUTATIONAL_IMPACT,
  REGULATORY_IMPACT,
  RISK_MATRIX,
  RISK_SCORE_TO_LEVEL,
  RISK_LEVEL_COLORS,
  RISK_LEVEL_CSS_CLASSES,
  getRiskLevelColor,
  getRiskLevelFromSecurityLevel,
} from "./riskConstants";
import { SecurityLevel } from "../types/cia";

describe("riskConstants", () => {
  describe("RISK_LEVELS", () => {
    it("contains all expected risk levels", () => {
      expect(RISK_LEVELS.MINIMAL).toBe("Minimal");
      expect(RISK_LEVELS.LOW).toBe("Low");
      expect(RISK_LEVELS.MEDIUM).toBe("Medium");
      expect(RISK_LEVELS.HIGH).toBe("High");
      expect(RISK_LEVELS.CRITICAL).toBe("Critical");
      expect(RISK_LEVELS.UNKNOWN).toBe("Unknown");
    });
  });

  describe("BUSINESS_IMPACT_CATEGORIES", () => {
    it("contains all expected categories", () => {
      expect(BUSINESS_IMPACT_CATEGORIES.FINANCIAL).toBe("Financial");
      expect(BUSINESS_IMPACT_CATEGORIES.OPERATIONAL).toBe("Operational");
      expect(BUSINESS_IMPACT_CATEGORIES.REGULATORY).toBe("Regulatory");
      expect(BUSINESS_IMPACT_CATEGORIES.REPUTATIONAL).toBe("Reputational");
      expect(BUSINESS_IMPACT_CATEGORIES.STRATEGIC).toBe("Strategic");
    });
  });

  describe("BUSINESS_IMPACT_CATEGORY_LIST", () => {
    it("contains all expected category names in lowercase", () => {
      expect(BUSINESS_IMPACT_CATEGORY_LIST).toContain("financial");
      expect(BUSINESS_IMPACT_CATEGORY_LIST).toContain("operational");
      expect(BUSINESS_IMPACT_CATEGORY_LIST).toContain("reputational");
      expect(BUSINESS_IMPACT_CATEGORY_LIST).toContain("regulatory");
      expect(BUSINESS_IMPACT_CATEGORY_LIST).toContain("strategic");
    });

    it("has correct number of categories", () => {
      expect(BUSINESS_IMPACT_CATEGORY_LIST.length).toBe(5);
    });
  });

  describe("SECURITY_TO_RISK_MAP", () => {
    it("maps all security levels to risk levels", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      levels.forEach((level) => {
        expect(SECURITY_TO_RISK_MAP[level]).toBeDefined();
        expect(typeof SECURITY_TO_RISK_MAP[level]).toBe("string");
      });
    });

    it("has inverse relationship between security and risk", () => {
      expect(SECURITY_TO_RISK_MAP.None).toBe(RISK_LEVELS.CRITICAL);
      expect(SECURITY_TO_RISK_MAP.Low).toBe(RISK_LEVELS.HIGH);
      expect(SECURITY_TO_RISK_MAP.Moderate).toBe(RISK_LEVELS.MEDIUM);
      expect(SECURITY_TO_RISK_MAP.High).toBe(RISK_LEVELS.LOW);
      expect(SECURITY_TO_RISK_MAP["Very High"]).toBe(RISK_LEVELS.MINIMAL);
    });
  });

  describe("RISK_LEVEL_DESCRIPTIONS", () => {
    it("contains descriptions for all risk levels", () => {
      expect(RISK_LEVEL_DESCRIPTIONS[RISK_LEVELS.MINIMAL]).toBeDefined();
      expect(RISK_LEVEL_DESCRIPTIONS[RISK_LEVELS.LOW]).toBeDefined();
      expect(RISK_LEVEL_DESCRIPTIONS[RISK_LEVELS.MEDIUM]).toBeDefined();
      expect(RISK_LEVEL_DESCRIPTIONS[RISK_LEVELS.HIGH]).toBeDefined();
      expect(RISK_LEVEL_DESCRIPTIONS[RISK_LEVELS.CRITICAL]).toBeDefined();
    });

    it("has non-empty description strings", () => {
      Object.values(RISK_LEVEL_DESCRIPTIONS).forEach((description) => {
        expect(typeof description).toBe("string");
        expect(description.length).toBeGreaterThan(0);
      });
    });
  });

  describe("FINANCIAL_IMPACT", () => {
    it("contains financial impact for all risk levels", () => {
      expect(FINANCIAL_IMPACT[RISK_LEVELS.MINIMAL]).toBeDefined();
      expect(FINANCIAL_IMPACT[RISK_LEVELS.LOW]).toBeDefined();
      expect(FINANCIAL_IMPACT[RISK_LEVELS.MEDIUM]).toBeDefined();
      expect(FINANCIAL_IMPACT[RISK_LEVELS.HIGH]).toBeDefined();
      expect(FINANCIAL_IMPACT[RISK_LEVELS.CRITICAL]).toBeDefined();
    });

    it("has meaningful financial impact descriptions", () => {
      expect(FINANCIAL_IMPACT[RISK_LEVELS.MINIMAL]).toContain("revenue");
      expect(FINANCIAL_IMPACT[RISK_LEVELS.CRITICAL]).toContain("revenue");
    });
  });

  describe("OPERATIONAL_IMPACT", () => {
    it("contains operational impact for all risk levels", () => {
      expect(OPERATIONAL_IMPACT[RISK_LEVELS.MINIMAL]).toBeDefined();
      expect(OPERATIONAL_IMPACT[RISK_LEVELS.LOW]).toBeDefined();
      expect(OPERATIONAL_IMPACT[RISK_LEVELS.MEDIUM]).toBeDefined();
      expect(OPERATIONAL_IMPACT[RISK_LEVELS.HIGH]).toBeDefined();
      expect(OPERATIONAL_IMPACT[RISK_LEVELS.CRITICAL]).toBeDefined();
    });

    it("has meaningful operational impact descriptions", () => {
      expect(OPERATIONAL_IMPACT[RISK_LEVELS.MINIMAL]).toContain("disruption");
      expect(OPERATIONAL_IMPACT[RISK_LEVELS.CRITICAL]).toContain("disruption");
    });
  });

  describe("REPUTATIONAL_IMPACT", () => {
    it("contains reputational impact for all risk levels", () => {
      expect(REPUTATIONAL_IMPACT[RISK_LEVELS.MINIMAL]).toBeDefined();
      expect(REPUTATIONAL_IMPACT[RISK_LEVELS.LOW]).toBeDefined();
      expect(REPUTATIONAL_IMPACT[RISK_LEVELS.MEDIUM]).toBeDefined();
      expect(REPUTATIONAL_IMPACT[RISK_LEVELS.HIGH]).toBeDefined();
      expect(REPUTATIONAL_IMPACT[RISK_LEVELS.CRITICAL]).toBeDefined();
    });

    it("has meaningful reputational impact descriptions", () => {
      expect(REPUTATIONAL_IMPACT[RISK_LEVELS.MINIMAL]).toContain("impact");
      expect(REPUTATIONAL_IMPACT[RISK_LEVELS.CRITICAL]).toContain("impact");
    });
  });

  describe("REGULATORY_IMPACT", () => {
    it("contains regulatory impact for all risk levels", () => {
      expect(REGULATORY_IMPACT[RISK_LEVELS.MINIMAL]).toBeDefined();
      expect(REGULATORY_IMPACT[RISK_LEVELS.LOW]).toBeDefined();
      expect(REGULATORY_IMPACT[RISK_LEVELS.MEDIUM]).toBeDefined();
      expect(REGULATORY_IMPACT[RISK_LEVELS.HIGH]).toBeDefined();
      expect(REGULATORY_IMPACT[RISK_LEVELS.CRITICAL]).toBeDefined();
    });

    it("has meaningful regulatory impact descriptions", () => {
      expect(REGULATORY_IMPACT[RISK_LEVELS.MINIMAL]).toContain("compliant");
      expect(REGULATORY_IMPACT[RISK_LEVELS.CRITICAL]).toContain("penalties");
    });
  });

  describe("RISK_MATRIX", () => {
    it("contains likelihood and impact arrays", () => {
      expect(Array.isArray(RISK_MATRIX.likelihood)).toBe(true);
      expect(Array.isArray(RISK_MATRIX.impact)).toBe(true);
      expect(RISK_MATRIX.likelihood.length).toBe(5);
      expect(RISK_MATRIX.impact.length).toBe(5);
    });

    it("contains scores matrix", () => {
      expect(Array.isArray(RISK_MATRIX.scores)).toBe(true);
      expect(RISK_MATRIX.scores.length).toBe(5);
      expect(RISK_MATRIX.scores[0].length).toBe(5);
    });

    it("has valid likelihood values", () => {
      expect(RISK_MATRIX.likelihood).toContain("Rare");
      expect(RISK_MATRIX.likelihood).toContain("Unlikely");
      expect(RISK_MATRIX.likelihood).toContain("Possible");
      expect(RISK_MATRIX.likelihood).toContain("Likely");
      expect(RISK_MATRIX.likelihood).toContain("Almost Certain");
    });

    it("has valid impact values", () => {
      expect(RISK_MATRIX.impact).toContain("Insignificant");
      expect(RISK_MATRIX.impact).toContain("Minor");
      expect(RISK_MATRIX.impact).toContain("Moderate");
      expect(RISK_MATRIX.impact).toContain("Major");
      expect(RISK_MATRIX.impact).toContain("Catastrophic");
    });
  });

  describe("RISK_SCORE_TO_LEVEL", () => {
    it("maps all scores to risk levels", () => {
      const scores = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 16, 20, 25];
      
      scores.forEach((score) => {
        expect(RISK_SCORE_TO_LEVEL[score]).toBeDefined();
        expect(typeof RISK_SCORE_TO_LEVEL[score]).toBe("string");
      });
    });

    it("maps low scores to minimal/low risk", () => {
      expect(RISK_SCORE_TO_LEVEL[1]).toBe(RISK_LEVELS.MINIMAL);
      expect(RISK_SCORE_TO_LEVEL[2]).toBe(RISK_LEVELS.MINIMAL);
      expect(RISK_SCORE_TO_LEVEL[3]).toBe(RISK_LEVELS.LOW);
    });

    it("maps high scores to critical risk", () => {
      expect(RISK_SCORE_TO_LEVEL[20]).toBe(RISK_LEVELS.CRITICAL);
      expect(RISK_SCORE_TO_LEVEL[25]).toBe(RISK_LEVELS.CRITICAL);
    });

    it("maps medium scores to medium/high risk", () => {
      expect(RISK_SCORE_TO_LEVEL[6]).toBe(RISK_LEVELS.MEDIUM);
      expect(RISK_SCORE_TO_LEVEL[10]).toBe(RISK_LEVELS.HIGH);
      expect(RISK_SCORE_TO_LEVEL[12]).toBe(RISK_LEVELS.HIGH);
    });
  });

  describe("RISK_LEVEL_COLORS", () => {
    it("contains colors for all risk levels", () => {
      expect(RISK_LEVEL_COLORS[RISK_LEVELS.MINIMAL]).toBeDefined();
      expect(RISK_LEVEL_COLORS[RISK_LEVELS.LOW]).toBeDefined();
      expect(RISK_LEVEL_COLORS[RISK_LEVELS.MEDIUM]).toBeDefined();
      expect(RISK_LEVEL_COLORS[RISK_LEVELS.HIGH]).toBeDefined();
      expect(RISK_LEVEL_COLORS[RISK_LEVELS.CRITICAL]).toBeDefined();
    });

    it("has valid hex color codes", () => {
      Object.values(RISK_LEVEL_COLORS).forEach((color) => {
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  describe("RISK_LEVEL_CSS_CLASSES", () => {
    it("contains CSS classes for all risk levels", () => {
      expect(RISK_LEVEL_CSS_CLASSES[RISK_LEVELS.MINIMAL]).toBeDefined();
      expect(RISK_LEVEL_CSS_CLASSES[RISK_LEVELS.LOW]).toBeDefined();
      expect(RISK_LEVEL_CSS_CLASSES[RISK_LEVELS.MEDIUM]).toBeDefined();
      expect(RISK_LEVEL_CSS_CLASSES[RISK_LEVELS.HIGH]).toBeDefined();
      expect(RISK_LEVEL_CSS_CLASSES[RISK_LEVELS.CRITICAL]).toBeDefined();
    });

    it("has valid CSS class structure", () => {
      const minimalClasses = RISK_LEVEL_CSS_CLASSES[RISK_LEVELS.MINIMAL];
      
      expect(minimalClasses.bg).toBeDefined();
      expect(minimalClasses.text).toBeDefined();
      expect(typeof minimalClasses.bg).toBe("string");
      expect(typeof minimalClasses.text).toBe("string");
    });
  });

  describe("getRiskLevelColor", () => {
    it("returns correct color for valid risk levels", () => {
      expect(getRiskLevelColor(RISK_LEVELS.MINIMAL)).toBe(
        RISK_LEVEL_COLORS[RISK_LEVELS.MINIMAL]
      );
      expect(getRiskLevelColor(RISK_LEVELS.LOW)).toBe(
        RISK_LEVEL_COLORS[RISK_LEVELS.LOW]
      );
      expect(getRiskLevelColor(RISK_LEVELS.CRITICAL)).toBe(
        RISK_LEVEL_COLORS[RISK_LEVELS.CRITICAL]
      );
    });

    it("returns default color for invalid risk levels", () => {
      const defaultColor = RISK_LEVEL_COLORS[RISK_LEVELS.MEDIUM];
      expect(getRiskLevelColor("Invalid Risk Level")).toBe(defaultColor);
      expect(getRiskLevelColor("")).toBe(defaultColor);
    });

    it("returns correct color for all valid risk levels", () => {
      expect(getRiskLevelColor(RISK_LEVELS.MEDIUM)).toBe(
        RISK_LEVEL_COLORS[RISK_LEVELS.MEDIUM]
      );
      expect(getRiskLevelColor(RISK_LEVELS.HIGH)).toBe(
        RISK_LEVEL_COLORS[RISK_LEVELS.HIGH]
      );
    });
  });

  describe("getRiskLevelFromSecurityLevel", () => {
    it("returns correct risk level for valid security levels", () => {
      expect(getRiskLevelFromSecurityLevel("None")).toBe(RISK_LEVELS.CRITICAL);
      expect(getRiskLevelFromSecurityLevel("Low")).toBe(RISK_LEVELS.HIGH);
      expect(getRiskLevelFromSecurityLevel("Moderate")).toBe(RISK_LEVELS.MEDIUM);
      expect(getRiskLevelFromSecurityLevel("High")).toBe(RISK_LEVELS.LOW);
      expect(getRiskLevelFromSecurityLevel("Very High")).toBe(RISK_LEVELS.MINIMAL);
    });

    it("returns default risk level for invalid security levels", () => {
      const defaultRisk = RISK_LEVELS.MEDIUM;
      expect(getRiskLevelFromSecurityLevel("Invalid" as SecurityLevel)).toBe(
        defaultRisk
      );
    });

    it("demonstrates inverse relationship", () => {
      // Lowest security = highest risk
      const noneRisk = getRiskLevelFromSecurityLevel("None");
      const veryHighRisk = getRiskLevelFromSecurityLevel("Very High");
      
      expect(noneRisk).toBe(RISK_LEVELS.CRITICAL);
      expect(veryHighRisk).toBe(RISK_LEVELS.MINIMAL);
    });
  });
});
