import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { BusinessImpactService } from "./businessImpactService";

// This file replaces previous tests that were trying to import private functions
describe("BusinessImpactService Internal Functions", () => {
  let service: BusinessImpactService;

  beforeEach(() => {
    service = new BusinessImpactService(createMockDataProvider());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test the public API instead of attempting to access private functions
  describe("getBusinessImpact returns consistent risk levels", () => {
    it("matches expected risk levels for each security level", () => {
      const none = service.getBusinessImpact("confidentiality", "None");
      const low = service.getBusinessImpact("confidentiality", "Low");
      const moderate = service.getBusinessImpact("confidentiality", "Moderate");
      const high = service.getBusinessImpact("confidentiality", "High");
      const veryHigh = service.getBusinessImpact(
        "confidentiality",
        "Very High",
      );

      expect(none.financial?.riskLevel).toBe("Critical Risk");
      expect(low.financial?.riskLevel).toBe("High Risk");
      expect(moderate.financial?.riskLevel).toBe("Medium Risk");
      expect(high.financial?.riskLevel).toBe("Low Risk");
      expect(veryHigh.financial?.riskLevel).toBe("Minimal Risk");
    });
  });
});
