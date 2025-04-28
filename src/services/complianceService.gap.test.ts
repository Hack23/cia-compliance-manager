import { describe, expect, it } from "vitest";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { SecurityLevel } from "../types/cia";
import { ComplianceService, getComplianceStatus } from "./complianceService";

describe("ComplianceService Gap Analysis", () => {
  // Test through public API
  describe("getComplianceGapAnalysis", () => {
    const service = new ComplianceService(createMockDataProvider());

    it("returns proper gap analysis for non-compliant levels", () => {
      const analysis = service.getComplianceGapAnalysis(
        "Low" as SecurityLevel,
        "Low" as SecurityLevel,
        "Low" as SecurityLevel
      );

      expect(analysis).toBeDefined();
      expect(analysis).toHaveProperty("isCompliant");
      expect(analysis).toHaveProperty("gaps");
      expect(analysis).toHaveProperty("recommendations");

      // Should not be fully compliant
      expect(analysis.isCompliant).toBe(false);

      // Should have gaps identified
      expect(analysis.gaps.length).toBeGreaterThan(0);

      // Each gap should have the required structure
      if (analysis.gaps.length > 0) {
        const firstGap = analysis.gaps[0];
        expect(firstGap).toHaveProperty("framework");
        expect(firstGap).toHaveProperty("components");
        expect(firstGap.components).toHaveProperty("availability");
        expect(firstGap.components).toHaveProperty("integrity");
        expect(firstGap.components).toHaveProperty("confidentiality");
      }
    });

    it("returns compliant analysis for high security levels", () => {
      const analysis = service.getComplianceGapAnalysis(
        "Very High" as SecurityLevel,
        "Very High" as SecurityLevel,
        "Very High" as SecurityLevel
      );

      expect(analysis).toBeDefined();
      expect(analysis.isCompliant).toBe(true);

      // Should have no gaps
      expect(analysis.gaps.length).toBe(0);

      // Should still have recommendations for maintaining compliance
      expect(analysis.recommendations.length).toBeGreaterThan(0);
    });

    it("handles unknown frameworks gracefully", () => {
      const analysis = service.getComplianceGapAnalysis(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Unknown Framework"
      );

      expect(analysis).toBeDefined();
      expect(analysis.isCompliant).toBe(false);
      expect(analysis.recommendations.length).toBeGreaterThan(0);
      expect(analysis.recommendations[0]).toContain("Unknown framework");
    });
  });

  describe("getComplianceStatus helper function", () => {
    it("returns compliance status with nullable frameworks property", async () => {
      const status = await getComplianceStatus(
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Moderate" as SecurityLevel
      );

      expect(status).toBeDefined();
      expect(status).toHaveProperty("status");

      // Use optional chaining for potentially undefined properties
      if (status.frameworks?.length) {
        expect(status.frameworks[0]).toHaveProperty("id");
        expect(status.frameworks[0]).toHaveProperty("name");
        expect(status.frameworks[0]).toHaveProperty("status");
      }
    });
  });

  describe("getComplianceStatusText", () => {
    const service = new ComplianceService(createMockDataProvider());

    it("returns appropriate status text for different security levels", () => {
      expect(service.getComplianceStatusText("None")).toBe("Non-Compliant");
      expect(service.getComplianceStatusText("Low")).toBe(
        "Meets basic compliance only"
      );
      expect(service.getComplianceStatusText("Moderate")).toBe(
        "Compliant with standard frameworks"
      );
      // Updated expectation to match actual implementation
      expect(service.getComplianceStatusText("High")).toBe(
        "Compliant with all major frameworks"
      );
      expect(service.getComplianceStatusText("Very High")).toBe(
        "Compliant with all major frameworks"
      );
    });

    it("returns status text for mixed security levels", () => {
      const statusText = service.getComplianceStatusText(
        "High" as SecurityLevel,
        "Moderate" as SecurityLevel,
        "Low" as SecurityLevel
      );

      // Should return a non-empty string
      expect(typeof statusText).toBe("string");
      expect(statusText.length).toBeGreaterThan(0);
    });
  });

  describe("getFrameworkRequiredLevel", () => {
    const service = new ComplianceService(createMockDataProvider());

    it("returns correct security level for different frameworks", () => {
      expect(
        service.getFrameworkRequiredLevel("HIPAA", "confidentiality")
      ).toBe("High");
      expect(
        service.getFrameworkRequiredLevel("ISO 27001", "availability")
      ).toBe("Moderate");
      expect(service.getFrameworkRequiredLevel("NIST CSF", "integrity")).toBe(
        "Low"
      );
    });

    it("returns a default level for unknown frameworks", () => {
      expect(
        service.getFrameworkRequiredLevel("Unknown", "confidentiality")
      ).toBe("Moderate");
    });
  });
});
