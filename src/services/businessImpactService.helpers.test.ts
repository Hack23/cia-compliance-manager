import { describe, expect, it } from "vitest";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { SecurityLevel } from "../types/cia";
import {
  BusinessImpactService,
  getBusinessImpact,
} from "./businessImpactService";

describe("BusinessImpactService Helper Functions", () => {
  const service = new BusinessImpactService(createMockDataProvider());

  describe("getBusinessImpact function", () => {
    it("returns business impact with all required properties", async () => {
      // Test the exported function
      const impact = await getBusinessImpact(
        "High" as SecurityLevel,
        "High" as SecurityLevel,
        "High" as SecurityLevel
      );

      expect(impact).toBeDefined();
      expect(impact).toHaveProperty("description");
      expect(impact).toHaveProperty("riskLevel");
      expect(impact).toHaveProperty("annualRevenueLoss");
      expect(impact).toHaveProperty("complianceViolations");
      expect(impact).toHaveProperty("meanTimeToRecover");
      expect(impact).toHaveProperty("complianceImpact");
      expect(impact).toHaveProperty("reputationalImpact");

      // Safely check complianceViolations array if it exists
      if (impact.complianceViolations) {
        expect(Array.isArray(impact.complianceViolations)).toBe(true);
        expect(impact.complianceViolations.length).toBeGreaterThan(0);
      }

      // Verify risk level is formatted correctly
      expect(["Critical", "High", "Medium", "Low", "Minimal"]).toContain(
        impact.riskLevel
      );
    });
  });

  describe("getImpactForLevel", () => {
    it("returns correct impact map for each security level", () => {
      // Use type assertion to access private method through any type
      const securityLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      securityLevels.forEach((level) => {
        // Use type assertion to access private method
        const impact = (service as any).getImpactForLevel(level);

        expect(impact).toBeDefined();
        expect(impact).toHaveProperty("financialImpact");
        expect(impact).toHaveProperty("operationalImpact");
        expect(impact).toHaveProperty("reputationalImpact");
      });
    });
  });

  describe("getRiskLevelWithSuffix", () => {
    it("appends 'Risk' to the risk level", () => {
      // Use type assertion to access private method
      const method = (service as any).getRiskLevelWithSuffix.bind(service);

      expect(method("None")).toBe("Critical Risk");
      expect(method("Low")).toBe("High Risk");
      expect(method("Moderate")).toBe("Medium Risk");
      expect(method("High")).toBe("Low Risk");
      expect(method("Very High")).toBe("Minimal Risk");
    });
  });

  describe("getDefaultRevenueLoss", () => {
    it("returns appropriate revenue loss for each security level", () => {
      // Use type assertion to access private method
      const method = (service as any).getDefaultRevenueLoss.bind(service);

      expect(method("None")).toContain(">20%");
      expect(method("Low")).toContain("10-20%");
      expect(method("Moderate")).toContain("5-10%");
      expect(method("High")).toContain("1-5%");
      expect(method("Very High")).toContain("<1%");
    });
  });

  describe("getDefaultRecoveryTime", () => {
    it("returns appropriate recovery time for each security level", () => {
      // Use type assertion to access private method
      const method = (service as any).getDefaultRecoveryTime.bind(service);

      expect(method("None")).toBe("Unpredictable");
      expect(method("Low")).toBe("24-48 hours");
      expect(method("Moderate")).toBe("4-8 hours");
      expect(method("High")).toBe("1 hour");
      expect(method("Very High")).toBe("<15 minutes");
    });
  });
});
