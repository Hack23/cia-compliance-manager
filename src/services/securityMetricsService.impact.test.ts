import { describe, expect, it } from "vitest";
import {
  TEST_SECURITY_LEVELS,
  createMockDataProvider,
} from "../tests/testMocks/mockTypes";
import {
  createSecurityMetricsService,
  getSecurityMetrics,
} from "./securityMetricsService";

describe("SecurityMetricsService Impact Metrics", () => {
  // Create a test service for all tests
  const service = createSecurityMetricsService(createMockDataProvider());

  describe("calculateImpactMetrics", () => {
    TEST_SECURITY_LEVELS.forEach((level) => {
      it(`calculates impact metrics for uniform ${level} security level`, () => {
        // Access the private method using type assertion
        const impactMetrics = (service as any).calculateImpactMetrics(
          level,
          level,
          level
        );

        // Verify structure
        expect(impactMetrics).toBeDefined();
        expect(impactMetrics.financialImpact).toBeDefined();
        expect(impactMetrics.operationalImpact).toBeDefined();
        expect(impactMetrics.reputationalImpact).toBeDefined();
        expect(impactMetrics.complianceImpact).toBeDefined();
        expect(impactMetrics.securityLevel).toBe(level);

        // Verify that riskReduction is a percentage string
        expect(impactMetrics.riskReduction).toMatch(/\d+%/);
      });
    });

    it("calculates different impact metrics for different security level combinations", () => {
      const lowImpact = (service as any).calculateImpactMetrics(
        "Low",
        "Low",
        "Low"
      );
      const highImpact = (service as any).calculateImpactMetrics(
        "High",
        "High",
        "High"
      );
      const mixedImpact = (service as any).calculateImpactMetrics(
        "None",
        "Moderate",
        "High"
      );

      // Low and high should be different
      expect(lowImpact.financialImpact).not.toBe(highImpact.financialImpact);
      expect(lowImpact.operationalImpact).not.toBe(
        highImpact.operationalImpact
      );
      expect(lowImpact.reputationalImpact).not.toBe(
        highImpact.reputationalImpact
      );
      expect(lowImpact.complianceImpact).not.toBe(highImpact.complianceImpact);

      // Mixed should be unique
      expect(mixedImpact.securityLevel).toBe("Moderate");
    });
  });

  describe("getSecurityMetrics complete implementation", () => {
    it("returns comprehensive security metrics with all required properties", () => {
      // Test with mixed security levels
      const metrics = service.getSecurityMetrics("Moderate", "High", "Low");

      // Verify all required properties are present
      expect(metrics).toHaveProperty("overallScore");
      expect(metrics).toHaveProperty("score");
      expect(metrics).toHaveProperty("maxScore");
      expect(metrics).toHaveProperty("percentage");
      expect(metrics).toHaveProperty("availability");
      expect(metrics).toHaveProperty("integrity");
      expect(metrics).toHaveProperty("confidentiality");
      expect(metrics).toHaveProperty("impactMetrics");
      expect(metrics).toHaveProperty("monitoring");
      expect(metrics).toHaveProperty("resilience");
      expect(metrics).toHaveProperty("compliance");
      expect(metrics).toHaveProperty("benchmarkScore");
      expect(metrics).toHaveProperty("securityMaturity");
      expect(metrics).toHaveProperty("riskReduction");

      // Verify impact metrics specifically
      expect(metrics.impactMetrics).toHaveProperty("financialImpact");
      expect(metrics.impactMetrics).toHaveProperty("operationalImpact");
      expect(metrics.impactMetrics).toHaveProperty("reputationalImpact");
      expect(metrics.impactMetrics).toHaveProperty("complianceImpact");

      // Verify types
      expect(typeof metrics.overallScore).toBe("number");
      expect(typeof metrics.monitoring).toBe("number");
      expect(typeof metrics.resilience).toBe("number");
      expect(typeof metrics.compliance).toBe("number");
      expect(typeof metrics.securityMaturity).toBe("string");
    });

    TEST_SECURITY_LEVELS.forEach((level) => {
      it(`correctly reflects ${level} level in component metrics`, () => {
        const metrics = service.getSecurityMetrics(level, level, level);

        expect(metrics.availability.level).toBe(level);
        expect(metrics.integrity.level).toBe(level);
        expect(metrics.confidentiality.level).toBe(level);

        // Verify uniform security levels result in matching security maturity level
        if (level === "None") expect(metrics.securityMaturity).toBe("Initial");
        if (level === "Low")
          expect(metrics.securityMaturity).toBe("Developing");
        if (level === "Moderate")
          expect(metrics.securityMaturity).toBe("Defined");
        if (level === "High") expect(metrics.securityMaturity).toBe("Managed");
        if (level === "Very High")
          expect(metrics.securityMaturity).toBe("Optimized");
      });
    });
  });

  describe("global API functions", () => {
    it("getSecurityMetrics creates a service and returns metrics", async () => {
      // Fix: Use the imported function instead of accessing it from the global object
      const metrics = await getSecurityMetrics("Low", "Low", "Low");

      expect(metrics).toBeDefined();
      expect(metrics.overallScore).toBeDefined();
      expect(metrics.impactMetrics).toBeDefined();
    });
  });
});
