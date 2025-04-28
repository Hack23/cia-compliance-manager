import { describe, expect, it } from "vitest";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { SecurityLevel } from "../types/cia";
import {
  BusinessImpactService,
  getBusinessImpact,
} from "./businessImpactService";

describe("BusinessImpactService Risk Assessment", () => {
  // Test through public API
  describe("Business Impact Risk Levels", () => {
    const service = new BusinessImpactService(createMockDataProvider());

    it("provides appropriate risk levels based on security levels", () => {
      // None security level should result in critical risk
      const noneImpact = service.getBusinessImpact("confidentiality", "None");
      expect(noneImpact.financial?.riskLevel).toBe("Critical Risk");

      // Low security level should result in high risk
      const lowImpact = service.getBusinessImpact("confidentiality", "Low");
      expect(lowImpact.financial?.riskLevel).toBe("High Risk");

      // Medium security level should result in medium risk
      const moderateImpact = service.getBusinessImpact(
        "confidentiality",
        "Moderate"
      );
      expect(moderateImpact.financial?.riskLevel).toBe("Medium Risk");

      // High security level should result in low risk
      const highImpact = service.getBusinessImpact("confidentiality", "High");
      expect(highImpact.financial?.riskLevel).toBe("Low Risk");

      // Very High security level should result in minimal risk
      const veryHighImpact = service.getBusinessImpact(
        "confidentiality",
        "Very High"
      );
      expect(veryHighImpact.financial?.riskLevel).toBe("Minimal Risk");
    });
  });

  describe("calculateBusinessImpactLevel", () => {
    const service = new BusinessImpactService(createMockDataProvider());

    it("calculates correct impact level for different security level combinations", () => {
      // Lower security level should dominate (None)
      expect(
        service.calculateBusinessImpactLevel(
          "None" as SecurityLevel,
          "Moderate" as SecurityLevel,
          "High" as SecurityLevel
        )
      ).toBe("Critical");

      // Lower security level should dominate (Low)
      expect(
        service.calculateBusinessImpactLevel(
          "Low" as SecurityLevel,
          "Moderate" as SecurityLevel,
          "High" as SecurityLevel
        )
      ).toBe("High");

      // Equal security levels
      expect(
        service.calculateBusinessImpactLevel(
          "High" as SecurityLevel,
          "High" as SecurityLevel,
          "High" as SecurityLevel
        )
      ).toBe("Low");
    });
  });

  describe("getBusinessImpact helper function", () => {
    it("returns business impact details with expected properties", async () => {
      const impact = await getBusinessImpact(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(impact).toBeDefined();
      expect(impact).toHaveProperty("description");
      expect(impact).toHaveProperty("riskLevel");
      expect(typeof impact.riskLevel).toBe("string");

      // Optional properties that might be present
      if (impact.annualRevenueLoss) {
        expect(typeof impact.annualRevenueLoss).toBe("string");
      }

      if (impact.meanTimeToRecover) {
        expect(typeof impact.meanTimeToRecover).toBe("string");
      }
    });
  });
});
