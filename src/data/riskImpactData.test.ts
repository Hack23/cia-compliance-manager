import { describe, expect, it } from "vitest";
import {
    SecurityLevel,
} from "../types/cia";
import {
    financialImpactByLevel,
    getRiskImpactLabel,
    getRiskLevelFromSecurityLevel,
    operationalImpactByLevel,
    reputationalImpactByLevel
} from "./riskImpactData";

describe("Risk Impact Data", () => {
  const securityLevels: SecurityLevel[] = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Very High",
  ];

  describe("Financial Impact Data", () => {
    it("should have financial impact data for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(financialImpactByLevel[level]).toBeDefined();
        expect(financialImpactByLevel[level].description).toBeTruthy();
        expect(financialImpactByLevel[level].riskLevel).toBeTruthy();
        expect(financialImpactByLevel[level].annualRevenueLoss).toBeTruthy();
      });
    });

    it("should have appropriate risk levels", () => {
      expect(financialImpactByLevel.None.riskLevel).toBe("Critical");
      expect(financialImpactByLevel["Very High"].riskLevel).toBe("Minimal");
    });
  });

  describe("Operational Impact Data", () => {
    it("should have operational impact data for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(operationalImpactByLevel[level]).toBeDefined();
        expect(operationalImpactByLevel[level].description).toBeTruthy();
        expect(operationalImpactByLevel[level].riskLevel).toBeTruthy();
        expect(operationalImpactByLevel[level].meanTimeToRecover).toBeTruthy();
      });
    });

    it("should have appropriate recovery times", () => {
      expect(operationalImpactByLevel.None.meanTimeToRecover).toContain("Weeks");
      expect(operationalImpactByLevel.Low.meanTimeToRecover).toBe("Days");
      expect(operationalImpactByLevel.Moderate.meanTimeToRecover).toBe("Hours");
      expect(operationalImpactByLevel.High.meanTimeToRecover).toBe("Minutes to hours");
      expect(operationalImpactByLevel["Very High"].meanTimeToRecover).toBe("<5 minutes");
    });
  });

  describe("Reputational Impact Data", () => {
    it("should have reputational impact data for all security levels", () => {
      securityLevels.forEach((level) => {
        expect(reputationalImpactByLevel[level]).toBeDefined();
        expect(reputationalImpactByLevel[level].description).toBeTruthy();
        expect(reputationalImpactByLevel[level].riskLevel).toBeTruthy();
      });
    });
  });

  describe("Risk Level Utility Functions", () => {
    it("should convert security levels to risk levels correctly", () => {
      expect(getRiskLevelFromSecurityLevel("None")).toBe("Critical");
      expect(getRiskLevelFromSecurityLevel("Low")).toBe("High");
      expect(getRiskLevelFromSecurityLevel("Moderate")).toBe("Medium");
      expect(getRiskLevelFromSecurityLevel("High")).toBe("Low");
      expect(getRiskLevelFromSecurityLevel("Very High")).toBe("Minimal");

      // Using an invalid input should return Unknown
      expect(getRiskLevelFromSecurityLevel("invalid" as SecurityLevel)).toBe(
        "Unknown"
      );
    });

    it("should return appropriate impact level label", () => {
      expect(getRiskImpactLabel("Critical")).toContain("Severe");
      expect(getRiskImpactLabel("High")).toContain("Major");
      expect(getRiskImpactLabel("Medium")).toContain("Moderate");
      expect(getRiskImpactLabel("Low")).toContain("Minor");
      expect(getRiskImpactLabel("Minimal")).toContain("Negligible");
    });
  });

  it("should map risk level correctly", () => {
    expect(getRiskLevelFromSecurityLevel("None")).toBe("Critical");
  });
});
