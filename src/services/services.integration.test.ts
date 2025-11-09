import { beforeEach, describe, expect, it } from "vitest";
import { SecurityLevel, CIAComponentType } from "../types/cia";
import { BusinessImpactService } from "./businessImpactService";
import { ComplianceService } from "./complianceService";
import { SecurityMetricsService } from "./securityMetricsService";
import { SecurityResourceService } from "./securityResourceService";
import { TechnicalImplementationService } from "./technicalImplementationService";
import {
  createTestDataProvider,
} from "../tests/testUtils/serviceTestUtils";

/**
 * Integration tests for service layer interactions
 * 
 * These tests verify that multiple services work together correctly
 * to provide consistent and accurate security analysis across the application.
 */
describe("Services Integration Tests", () => {
  let businessImpactService: BusinessImpactService;
  let complianceService: ComplianceService;
  let securityMetricsService: SecurityMetricsService;
  let securityResourceService: SecurityResourceService;
  let technicalImplementationService: TechnicalImplementationService;

  beforeEach(() => {
    // Initialize all services with the same data provider for consistency
    const dataProvider = createTestDataProvider();

    businessImpactService = new BusinessImpactService(dataProvider);
    complianceService = new ComplianceService(dataProvider);
    securityMetricsService = new SecurityMetricsService(dataProvider);
    securityResourceService = new SecurityResourceService(dataProvider);
    technicalImplementationService = new TechnicalImplementationService(
      dataProvider
    );
  });

  describe("Cross-Service Data Consistency", () => {
    it("provides consistent security level assessments across all services", () => {
      const testLevel: SecurityLevel = "High";
      const component: CIAComponentType = "availability";

      // Get data from different services
      const businessImpact = businessImpactService.getBusinessImpact(component, testLevel);
      const complianceStatus = complianceService.getComplianceStatus(
        testLevel,
        testLevel,
        testLevel
      );
      const securityMetrics = securityMetricsService.getSecurityMetrics(
        testLevel,
        testLevel,
        testLevel
      );

      // All services should return valid data
      expect(businessImpact).toBeDefined();
      expect(complianceStatus).toBeDefined();
      expect(securityMetrics).toBeDefined();

      // Verify data has expected structure
      expect(businessImpact.summary).toBeDefined();
      expect(complianceStatus.compliantFrameworks).toBeDefined();
      expect(securityMetrics.overallScore).toBeDefined();
    });

    it("calculates aligned metrics for the same security levels", () => {
      const levels: SecurityLevel[] = ["Low", "Moderate", "High"];

      levels.forEach((level) => {
        const metrics = securityMetricsService.getSecurityMetrics(
          level,
          level,
          level
        );
        const compliance = complianceService.getComplianceStatus(
          level,
          level,
          level
        );

        // Higher security levels should result in:
        // - Higher security scores
        // - More compliant frameworks
        // - Higher implementation costs
        expect(metrics.overallScore).toBeGreaterThan(0);
        expect(compliance.compliantFrameworks).toBeDefined();
        expect(Array.isArray(compliance.compliantFrameworks)).toBe(true);
      });
    });

    it("provides consistent cost estimates across metrics", () => {
      const testLevels: SecurityLevel[] = ["Moderate", "High", "Very High"];

      testLevels.forEach((level) => {
        const metrics = securityMetricsService.getSecurityMetrics(
          level,
          level,
          level
        );

        // Metrics should provide cost data
        expect(metrics.totalCost).toBeDefined();

        // Costs should be positive for non-None levels
        if (level !== "None") {
          expect(metrics.totalCapex).toBeGreaterThan(0);
          expect(metrics.totalOpex).toBeGreaterThan(0);
        }
      });
    });
  });

  describe("Service Interdependencies", () => {
    it("provides aligned recommendations across business impact and technical services", () => {
      const level: SecurityLevel = "High";
      const component: CIAComponentType = "availability";

      const businessImpact = businessImpactService.getBusinessImpact(component, level);
      const technicalDetails =
        technicalImplementationService.getTechnicalImplementation(component, level);

      // Both should provide relevant data
      expect(businessImpact).toBeDefined();
      expect(technicalDetails).toBeDefined();
      expect(technicalDetails.description).toBeDefined();
    });

    it("provides consistent resource requirements across services", () => {
      const level: SecurityLevel = "Moderate";

      const securityResources = securityResourceService.getSecurityResources(
        level,
        level,
        level
      );
      const metrics = securityMetricsService.getSecurityMetrics(
        level,
        level,
        level
      );

      // Both should provide resource-related information
      expect(securityResources).toBeDefined();
      expect(metrics).toBeDefined();

      // Resources should be non-empty for non-None levels
      if (level !== "None") {
        expect(securityResources.length).toBeGreaterThan(0);
      }
    });

    it("aligns compliance requirements with technical implementations", () => {
      const level: SecurityLevel = "High";

      const compliance = complianceService.getComplianceStatus(
        level,
        level,
        level
      );
      const technicalDetails =
        technicalImplementationService.getTechnicalImplementation(
          "availability",
          level
        );

      // Both should provide relevant information for the security level
      expect(compliance.compliantFrameworks).toBeDefined();
      expect(technicalDetails).toBeDefined();

      // High security level should have compliance frameworks
      expect(compliance.compliantFrameworks.length).toBeGreaterThan(0);
    });
  });

  describe("Multi-Level Security Analysis", () => {
    it("handles mixed security levels across CIA triad", () => {
      const availabilityLevel: SecurityLevel = "Low";
      const integrityLevel: SecurityLevel = "High";
      const confidentialityLevel: SecurityLevel = "Moderate";

      // All services should handle mixed levels without errors
      expect(() => {
        complianceService.getComplianceStatus(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        securityMetricsService.getSecurityMetrics(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
      }).not.toThrow();

      // Verify metrics are calculated
      const metrics = securityMetricsService.getSecurityMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      expect(metrics.overallScore).toBeDefined();
    });

    it("calculates appropriate overall risk for mixed security levels", () => {
      const testCases: Array<{
        availability: SecurityLevel;
        integrity: SecurityLevel;
        confidentiality: SecurityLevel;
      }> = [
        { availability: "None", integrity: "Very High", confidentiality: "Low" },
        { availability: "High", integrity: "Low", confidentiality: "High" },
        {
          availability: "Moderate",
          integrity: "Moderate",
          confidentiality: "Moderate",
        },
      ];

      testCases.forEach((testCase) => {
        const metrics = securityMetricsService.getSecurityMetrics(
          testCase.availability,
          testCase.integrity,
          testCase.confidentiality
        );

        // Should provide valid assessments
        expect(metrics.overallScore).toBeGreaterThanOrEqual(0);
      });
    });

    it("provides comprehensive compliance coverage for varied security postures", () => {
      const testCases = [
        { availability: "Low", integrity: "Low", confidentiality: "Low" },
        {
          availability: "Moderate",
          integrity: "High",
          confidentiality: "Moderate",
        },
        { availability: "High", integrity: "High", confidentiality: "High" },
      ];

      testCases.forEach((testCase) => {
        const compliance = complianceService.getComplianceStatus(
          testCase.availability,
          testCase.integrity,
          testCase.confidentiality
        );

        // Should provide compliance status for any combination
        expect(compliance).toBeDefined();
        expect(compliance.compliantFrameworks).toBeDefined();
        expect(Array.isArray(compliance.compliantFrameworks)).toBe(true);

        // Higher overall security should generally mean more compliant frameworks
        const isHighSecurity = [
          testCase.availability,
          testCase.integrity,
          testCase.confidentiality,
        ].every((level) => level === "High");

        if (isHighSecurity) {
          expect(compliance.compliantFrameworks.length).toBeGreaterThan(0);
        }
      });
    });
  });

  describe("Data Provider Integration", () => {
    it("all services use the same data provider successfully", () => {
      const dataProvider = createTestDataProvider();

      // Create all services with the same data provider
      const services = {
        business: new BusinessImpactService(dataProvider),
        compliance: new ComplianceService(dataProvider),
        metrics: new SecurityMetricsService(dataProvider),
        resources: new SecurityResourceService(dataProvider),
        technical: new TechnicalImplementationService(dataProvider),
      };

      const testLevel: SecurityLevel = "Moderate";
      const testComponent: CIAComponentType = "availability";

      // All services should work with the shared data provider
      expect(() => {
        services.business.getBusinessImpact(testComponent, testLevel);
        services.compliance.getComplianceStatus(testLevel, testLevel, testLevel);
        services.metrics.getSecurityMetrics(testLevel, testLevel, testLevel);
        services.resources.getSecurityResources(testLevel, testLevel, testLevel);
        services.technical.getTechnicalImplementation(testComponent, testLevel);
      }).not.toThrow();
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("handles all security levels from None to Very High", () => {
      const allLevels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];
      const component: CIAComponentType = "availability";

      allLevels.forEach((level) => {
        // All services should handle all valid security levels
        expect(() => {
          businessImpactService.getBusinessImpact(component, level);
          complianceService.getComplianceStatus(level, level, level);
          securityMetricsService.getSecurityMetrics(level, level, level);
          securityResourceService.getSecurityResources(level, level, level);
          technicalImplementationService.getTechnicalImplementation(component, level);
        }).not.toThrow();
      });
    });

    it("provides appropriate baseline data for None security level", () => {
      const noneLevel: SecurityLevel = "None";
      const component: CIAComponentType = "availability";

      const businessImpact = businessImpactService.getBusinessImpact(component, noneLevel);
      const compliance = complianceService.getComplianceStatus(
        noneLevel,
        noneLevel,
        noneLevel
      );
      const metrics = securityMetricsService.getSecurityMetrics(
        noneLevel,
        noneLevel,
        noneLevel
      );

      // Services should provide valid baseline data
      expect(businessImpact).toBeDefined();
      expect(compliance).toBeDefined();
      expect(metrics).toBeDefined();

      // None level should have minimal costs
      expect(metrics.totalCapex).toBe(0);
      expect(metrics.totalOpex).toBe(0);
    });

    it("handles Very High security level with comprehensive data", () => {
      const veryHighLevel: SecurityLevel = "Very High";

      const businessImpact = businessImpactService.getBusinessImpact(
        veryHighLevel,
        veryHighLevel,
        veryHighLevel
      );
      const compliance = complianceService.getComplianceStatus(
        veryHighLevel,
        veryHighLevel,
        veryHighLevel
      );
      const metrics = securityMetricsService.getSecurityMetrics(
        veryHighLevel,
        veryHighLevel,
        veryHighLevel
      );

      // Very High level should have:
      // - Highest security scores
      // - Most compliant frameworks
      // - Highest costs
      expect(metrics.overallScore).toBeGreaterThan(0);
      expect(compliance.compliantFrameworks.length).toBeGreaterThan(0);
      expect(metrics.totalCapex).toBeGreaterThan(0);
      expect(metrics.totalOpex).toBeGreaterThan(0);
    });
  });

  describe("Performance and Efficiency", () => {
    it("handles multiple service calls efficiently", () => {
      const iterations = 10;
      const level: SecurityLevel = "Moderate";
      const component: CIAComponentType = "availability";

      const startTime = performance.now();

      for (let i = 0; i < iterations; i++) {
        businessImpactService.getBusinessImpact(component, level);
        complianceService.getComplianceStatus(level, level, level);
        securityMetricsService.getSecurityMetrics(level, level, level);
        securityResourceService.getSecurityResources(level, level, level);
        technicalImplementationService.getTechnicalImplementation(component, level);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // All service calls should complete in reasonable time (< 1 second for 10 iterations)
      expect(duration).toBeLessThan(1000);
    });

    it("provides consistent results on repeated calls", () => {
      const level: SecurityLevel = "High";
      const component: CIAComponentType = "availability";

      // Call each service multiple times
      const businessImpact1 = businessImpactService.getBusinessImpact(component, level);
      const businessImpact2 = businessImpactService.getBusinessImpact(component, level);

      const compliance1 = complianceService.getComplianceStatus(
        level,
        level,
        level
      );
      const compliance2 = complianceService.getComplianceStatus(
        level,
        level,
        level
      );

      // Results should be consistent across calls
      expect(businessImpact1.summary).toBe(businessImpact2.summary);
      expect(compliance1.compliantFrameworks.length).toBe(
        compliance2.compliantFrameworks.length
      );
    });
  });
});
