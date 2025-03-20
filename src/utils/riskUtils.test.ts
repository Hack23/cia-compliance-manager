import { describe, expect, it } from "vitest";
import { StatusBadgeVariant } from "../components/common/StatusBadge";
import { RISK_LEVELS } from "../constants/riskConstants";
import { SecurityLevel } from "../types/cia";
import {
  calculateCombinedRiskLevel,
  calculateRiskScore,
  getFormattedRiskLevel,
  getRiskBadgeVariant,
  getRiskLevelFromSecurityLevel,
  getRiskScoreFromSecurityLevel,
  getRiskSeverityDescription,
  parseRiskLevel
} from "./riskUtils";

describe("Risk Utilities", () => {
  describe("getRiskBadgeVariant", () => {
    it("returns correct badge variant for each risk level", () => {
      // Test each risk level
      expect(getRiskBadgeVariant("Critical")).toBe("error" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("High")).toBe("warning" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("Medium")).toBe("info" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("Moderate")).toBe("info" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("Low")).toBe("success" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("Minimal")).toBe("success" as StatusBadgeVariant);
    });

    it("handles case-insensitive matching", () => {
      expect(getRiskBadgeVariant("critical")).toBe("error" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("HIGH")).toBe("warning" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("medium")).toBe("info" as StatusBadgeVariant);
    });

    it("returns neutral for undefined risk level", () => {
      expect(getRiskBadgeVariant(undefined)).toBe("neutral" as StatusBadgeVariant);
    });

    it("returns neutral for unknown risk level", () => {
      expect(getRiskBadgeVariant("Unknown")).toBe("neutral" as StatusBadgeVariant);
      expect(getRiskBadgeVariant("NonExistentRisk")).toBe("neutral" as StatusBadgeVariant);
    });
  });

  describe("getRiskLevelFromSecurityLevel", () => {
    it("maps security levels to risk levels correctly", () => {
      expect(getRiskLevelFromSecurityLevel("None")).toBe("Critical");
      expect(getRiskLevelFromSecurityLevel("Low")).toBe("High");
      expect(getRiskLevelFromSecurityLevel("Moderate")).toBe("Medium");
      expect(getRiskLevelFromSecurityLevel("High")).toBe("Low");
      expect(getRiskLevelFromSecurityLevel("Very High")).toBe("Minimal");
    });

    it("returns 'Unknown' for invalid security levels", () => {
      expect(getRiskLevelFromSecurityLevel("NotALevel" as SecurityLevel)).toBe("Unknown");
    });
  });

  describe("getFormattedRiskLevel", () => {
    it("returns formatted risk level with 'Risk' suffix", () => {
      expect(getFormattedRiskLevel("None")).toBe(RISK_LEVELS.CRITICAL);
      expect(getFormattedRiskLevel("Low")).toBe(RISK_LEVELS.HIGH);
      expect(getFormattedRiskLevel("Moderate")).toBe(RISK_LEVELS.MEDIUM);
      expect(getFormattedRiskLevel("High")).toBe(RISK_LEVELS.LOW);
      expect(getFormattedRiskLevel("Very High")).toBe(RISK_LEVELS.MINIMAL);
    });

    it("returns unknown risk level for invalid input", () => {
      expect(getFormattedRiskLevel("NotALevel" as SecurityLevel)).toBe(RISK_LEVELS.UNKNOWN);
    });
  });

  describe("calculateRiskScore", () => {
    it("calculates risk score based on security level", () => {
      expect(calculateRiskScore("None")).toBe(0);
      expect(calculateRiskScore("Low")).toBe(25);
      expect(calculateRiskScore("Moderate")).toBe(50);
      expect(calculateRiskScore("High")).toBe(75);
      expect(calculateRiskScore("Very High")).toBe(100);
    });

    it("returns 0 for invalid security level", () => {
      expect(calculateRiskScore("NotALevel" as SecurityLevel)).toBe(0);
    });
  });

  describe("getRiskSeverityDescription", () => {
    it("provides appropriate descriptions for risk levels", () => {
      expect(getRiskSeverityDescription("Critical")).toContain("Immediate action required");
      expect(getRiskSeverityDescription("High")).toContain("Urgent remediation");
      expect(getRiskSeverityDescription("Medium")).toContain("Planned remediation");
      expect(getRiskSeverityDescription("Low")).toContain("normal operations");
      expect(getRiskSeverityDescription("Minimal")).toContain("Acceptable risk");
    });

    it("provides unknown description for invalid risk levels", () => {
      expect(getRiskSeverityDescription("NotARiskLevel")).toContain("Unable to determine");
    });
  });

  describe("calculateCombinedRiskLevel", () => {
    it("returns highest risk level from multiple security levels", () => {
      // When both are the same level
      expect(calculateCombinedRiskLevel(["Moderate", "Moderate"])).toBe("Medium");

      // When there are mixed levels, should return the highest risk (lowest security)
      expect(calculateCombinedRiskLevel(["High", "Low"])).toBe("High");
      expect(calculateCombinedRiskLevel(["Very High", "None", "Low"])).toBe("Critical");
      expect(calculateCombinedRiskLevel(["High", "Very High", "Moderate"])).toBe("Medium");
    });

    it("returns 'Unknown' for empty input", () => {
      expect(calculateCombinedRiskLevel([])).toBe("Unknown");
    });

    it("handles invalid security levels", () => {
      expect(calculateCombinedRiskLevel(["NotALevel" as SecurityLevel])).toBe("Unknown");
    });
  });

  describe("getRiskScoreFromSecurityLevel", () => {
    it("returns higher risk score for lower security levels", () => {
      // Higher return value means higher risk
      expect(getRiskScoreFromSecurityLevel("None")).toBe(100); // Highest risk
      expect(getRiskScoreFromSecurityLevel("Low")).toBe(75);
      expect(getRiskScoreFromSecurityLevel("Moderate")).toBe(50);
      expect(getRiskScoreFromSecurityLevel("High")).toBe(25);
      expect(getRiskScoreFromSecurityLevel("Very High")).toBe(0); // Lowest risk
    });

    it("returns highest risk for invalid levels", () => {
      expect(getRiskScoreFromSecurityLevel("NotALevel" as SecurityLevel)).toBe(100);
    });
  });

  describe("parseRiskLevel", () => {
    it("converts risk level strings to numeric values", () => {
      expect(parseRiskLevel("Critical")).toBe(4);
      expect(parseRiskLevel("High")).toBe(3);
      expect(parseRiskLevel("Medium")).toBe(2);
      expect(parseRiskLevel("Moderate")).toBe(2);
      expect(parseRiskLevel("Low")).toBe(1);
      expect(parseRiskLevel("Minimal")).toBe(0);
    });

    it("returns default value for non-numeric strings", () => {
      expect(parseRiskLevel("high")).toBe(3);
      expect(parseRiskLevel("low")).toBe(1);
    });

    it("handles numeric values directly", () => {
      expect(parseRiskLevel("4")).toBe(4);
      expect(parseRiskLevel("0")).toBe(0);
    });

    it("handles null and undefined values", () => {
      expect(parseRiskLevel(null)).toBe(0);
      expect(parseRiskLevel(undefined)).toBe(0);
    });

    it("handles unexpected input formats", () => {
      expect(parseRiskLevel("not a risk level")).toBe(0);
      expect(parseRiskLevel("")).toBe(0);
    });
  });
});
