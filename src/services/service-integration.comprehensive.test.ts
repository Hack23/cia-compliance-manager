/**
 * Comprehensive integration tests for service layer interactions
 * Testing cross-service workflows and data flow
 */

import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { BusinessImpactService } from "../services/businessImpactService";
import { ComplianceService } from "../services/complianceService";
import { SecurityMetricsService } from "../services/securityMetricsService";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";

describe("Service Integration Tests - Holistic System Perspective", () => {
  describe("End-to-end workflow: Security Assessment to Business Impact", () => {
    it("should flow data correctly from security selection to business impact", () => {
      const availability: SecurityLevel = "High";
      const integrity: SecurityLevel = "High";
      const confidentiality: SecurityLevel = "Moderate";

      // Step 1: Calculate business impact with proper data provider
      const dataProvider = createMockDataProvider();
      const businessImpactService = new BusinessImpactService(dataProvider);
      
      const availabilityImpact = businessImpactService.getBusinessImpact("availability", availability);
      const integrityImpact = businessImpactService.getBusinessImpact("integrity", integrity);
      const confidentialityImpact = businessImpactService.getBusinessImpact("confidentiality", confidentiality);

      expect(availabilityImpact).toBeDefined();
      expect(integrityImpact).toBeDefined();
      expect(confidentialityImpact).toBeDefined();

      // Step 2: Get compliance status
      const complianceService = new ComplianceService(dataProvider);
      const complianceStatus = complianceService.getComplianceStatus(
        availability,
        integrity,
        confidentiality
      );

      expect(complianceStatus).toBeDefined();
      expect(complianceStatus.compliantFrameworks).toBeDefined();
      expect(complianceStatus.partiallyCompliantFrameworks).toBeDefined();
      expect(complianceStatus.nonCompliantFrameworks).toBeDefined();

      // Step 3: Calculate security metrics
      const metricsService = new SecurityMetricsService(dataProvider);
      const securityMetrics = metricsService.getSecurityMetrics(
        availability,
        integrity,
        confidentiality
      );

      expect(securityMetrics).toBeDefined();
      expect(securityMetrics.overallScore).toBeGreaterThanOrEqual(0); // Metrics should be calculated

      // Verify data consistency across services
      expect(typeof securityMetrics.overallScore).toBe("number");
      expect(typeof complianceStatus.complianceScore).toBe("number");
    });

    it("should handle None security levels consistently across services", () => {
      const level: SecurityLevel = "None";

      const dataProvider = createMockDataProvider();
      const businessImpactService = new BusinessImpactService(dataProvider);
      const complianceService = new ComplianceService(dataProvider);
      const metricsService = new SecurityMetricsService(dataProvider);

      const impact = businessImpactService.getBusinessImpact("availability", level);
      const compliance = complianceService.getComplianceStatus(level, level, level);
      const metrics = metricsService.getSecurityMetrics(level, level, level);

      // All services should handle None level gracefully
      expect(impact).toBeDefined();
      expect(compliance).toBeDefined();
      expect(metrics).toBeDefined();

      // None level should indicate high risk/low compliance
      expect(compliance.complianceScore).toBeLessThan(50);
      expect(metrics.overallScore).toBeLessThan(50);
    });

    it("should handle Very High security levels consistently across services", () => {
      const level: SecurityLevel = "Very High";

      const dataProvider = createMockDataProvider();
      const businessImpactService = new BusinessImpactService(dataProvider);
      const complianceService = new ComplianceService(dataProvider);
      const metricsService = new SecurityMetricsService(dataProvider);

      const impact = businessImpactService.getBusinessImpact("availability", level);
      const compliance = complianceService.getComplianceStatus(level, level, level);
      const metrics = metricsService.getSecurityMetrics(level, level, level);

      // All services should handle Very High level gracefully
      expect(impact).toBeDefined();
      expect(compliance).toBeDefined();
      expect(metrics).toBeDefined();

      // Very High level should indicate low risk/high compliance
      expect(compliance.complianceScore).toBeGreaterThan(70);
      expect(metrics.overallScore).toBeGreaterThanOrEqual(0); // Metrics should be calculated
    });
  });

  describe("Cross-service data consistency", () => {
    it("should maintain consistent security level interpretations", () => {
      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      const dataProvider = createMockDataProvider();
      const businessImpactService = new BusinessImpactService(dataProvider);
      const complianceService = new ComplianceService(dataProvider);
      const metricsService = new SecurityMetricsService(dataProvider);

      for (const level of levels) {
        const impact = businessImpactService.getBusinessImpact("availability", level);
        const compliance = complianceService.getComplianceStatus(level, level, level);
        const metrics = metricsService.getSecurityMetrics(level, level, level);

        // All services should return valid data
        expect(impact).toBeDefined();
        expect(impact.summary).toBeDefined();
        
        expect(compliance).toBeDefined();
        expect(compliance.complianceScore).toBeGreaterThanOrEqual(0);
        expect(compliance.complianceScore).toBeLessThanOrEqual(100);
        
        expect(metrics).toBeDefined();
        expect(metrics.overallScore).toBeGreaterThanOrEqual(0);
        expect(metrics.overallScore).toBeLessThanOrEqual(100);
      }
    });

    it("should have compliance frameworks consistent with security levels", () => {
      const dataProvider = createMockDataProvider();
      const complianceService = new ComplianceService(dataProvider);

      // Low security should have few compliant frameworks
      const lowCompliance = complianceService.getComplianceStatus("Low", "Low", "Low");
      
      // High security should have many compliant frameworks
      const highCompliance = complianceService.getComplianceStatus("High", "High", "High");
      
      // Very High should have the most compliant frameworks
      const veryHighCompliance = complianceService.getComplianceStatus(
        "Very High",
        "Very High",
        "Very High"
      );

      expect(lowCompliance.compliantFrameworks.length).toBeLessThan(
        highCompliance.compliantFrameworks.length
      );
      expect(highCompliance.compliantFrameworks.length).toBeLessThanOrEqual(
        veryHighCompliance.compliantFrameworks.length
      );
    });

    it("should have metrics that correlate with business impact", () => {
      const dataProvider = createMockDataProvider();
      const businessImpactService = new BusinessImpactService(dataProvider);
      const metricsService = new SecurityMetricsService(dataProvider);

      // Test correlation for different levels
      const testCases: Array<{level: SecurityLevel}> = [
        { level: "Low" },
        { level: "Moderate" },
        { level: "High" },
        { level: "Very High" },
      ];

      const results: Array<{
        level: SecurityLevel;
        riskLevel: string;
        metricsScore: number;
      }> = [];

      for (const testCase of testCases) {
        const impact = businessImpactService.getBusinessImpact("availability", testCase.level);
        const metrics = metricsService.getSecurityMetrics(testCase.level, testCase.level, testCase.level);

        results.push({
          level: testCase.level,
          riskLevel: impact.financial?.riskLevel || "Unknown", // Use financial risk level
          metricsScore: metrics.overallScore,
        });
      }

      // Higher security levels should have higher metrics scores
      for (let i = 1; i < results.length; i++) {
        expect(results[i].metricsScore).toBeGreaterThanOrEqual(results[i - 1].metricsScore);
      }
    });
  });

  describe("Service error handling and edge cases", () => {
    it("should handle mixed security levels gracefully", () => {
      const dataProvider = createMockDataProvider();
      const businessImpactService = new BusinessImpactService(dataProvider);
      const complianceService = new ComplianceService(dataProvider);
      const metricsService = new SecurityMetricsService(dataProvider);

      const mixedScenarios: Array<{
        a: SecurityLevel;
        i: SecurityLevel;
        c: SecurityLevel;
      }> = [
        { a: "None", i: "Very High", c: "Moderate" },
        { a: "High", i: "Low", c: "None" },
        { a: "Low", i: "High", c: "Low" },
        { a: "Moderate", i: "None", c: "Very High" },
      ];

      for (const scenario of mixedScenarios) {
        const availabilityImpact = businessImpactService.getBusinessImpact("availability", scenario.a);
        const integrityImpact = businessImpactService.getBusinessImpact("integrity", scenario.i);
        const confidentialityImpact = businessImpactService.getBusinessImpact("confidentiality", scenario.c);
        
        const compliance = complianceService.getComplianceStatus(scenario.a, scenario.i, scenario.c);
        const metrics = metricsService.getSecurityMetrics(scenario.a, scenario.i, scenario.c);

        // All services should handle mixed levels without errors
        expect(availabilityImpact).toBeDefined();
        expect(integrityImpact).toBeDefined();
        expect(confidentialityImpact).toBeDefined();
        expect(compliance).toBeDefined();
        expect(metrics).toBeDefined();
      }
    });

    it("should handle service initialization consistently", () => {
      // Multiple service instantiations should work correctly
      const dataProvider = createMockDataProvider();
      const service1 = new BusinessImpactService(dataProvider);
      const service2 = new BusinessImpactService(dataProvider);
      const service3 = new ComplianceService(dataProvider);
      const service4 = new SecurityMetricsService(dataProvider);

      const testLevel: SecurityLevel = "High";

      const impact1 = service1.getBusinessImpact("availability", testLevel);
      const impact2 = service2.getBusinessImpact("availability", testLevel);
      
      // Same service type should return consistent results
      expect(impact1.summary).toBe(impact2.summary);

      // Different service types should return valid data
      const compliance = service3.getComplianceStatus(testLevel, testLevel, testLevel);
      const metrics = service4.getSecurityMetrics(testLevel, testLevel, testLevel);

      expect(compliance).toBeDefined();
      expect(metrics).toBeDefined();
    });
  });

  describe("Real-world scenario testing", () => {
    it("should support complete security assessment workflow", () => {
      // Simulating a real security assessment
      const availability: SecurityLevel = "High";
      const integrity: SecurityLevel = "Very High";
      const confidentiality: SecurityLevel = "High";

      // Step 1: Assess business impact
      const dataProvider = createMockDataProvider();
      const businessService = new BusinessImpactService(dataProvider);
      const availabilityImpact = businessService.getBusinessImpact("availability", availability);
      const integrityImpact = businessService.getBusinessImpact("integrity", integrity);
      const confidentialityImpact = businessService.getBusinessImpact("confidentiality", confidentiality);

      // Step 2: Check compliance
      const complianceService = new ComplianceService(dataProvider);
      const complianceStatus = complianceService.getComplianceStatus(
        availability,
        integrity,
        confidentiality
      );

      // Step 3: Calculate metrics and costs
      const metricsService = new SecurityMetricsService(dataProvider);
      const metrics = metricsService.getSecurityMetrics(availability, integrity, confidentiality);

      const roiEstimates = metricsService.getROIEstimates();

      // Verify complete workflow produces consistent results
      expect(availabilityImpact.summary).toBeTruthy();
      expect(integrityImpact.summary).toBeTruthy();
      expect(confidentialityImpact.summary).toBeTruthy();

      expect(complianceStatus.complianceScore).toBeGreaterThan(60); // High security should have good compliance
      expect(complianceStatus.compliantFrameworks.length).toBeGreaterThan(0);

      expect(metrics.overallScore).toBeGreaterThanOrEqual(0); // Metrics should be calculated

      expect(roiEstimates).toBeDefined();
      expect(typeof roiEstimates).toBe("object");
    });
  });

  describe("Performance and scalability tests", () => {
    it("should handle multiple concurrent service calls", () => {
      const dataProvider = createMockDataProvider();
      const services = {
        business: new BusinessImpactService(dataProvider),
        compliance: new ComplianceService(dataProvider),
        metrics: new SecurityMetricsService(dataProvider),
      };

      const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];
      
      // Simulate concurrent calls
      const results = levels.map((level) => ({
        level,
        business: services.business.getBusinessImpact("availability", level),
        compliance: services.compliance.getComplianceStatus(level, level, level),
        metrics: services.metrics.getSecurityMetrics(level, level, level),
      }));

      // All results should be valid
      for (const result of results) {
        expect(result.business).toBeDefined();
        expect(result.compliance).toBeDefined();
        expect(result.metrics).toBeDefined();
      }

      expect(results).toHaveLength(5);
    });

    it("should maintain data integrity across multiple assessments", () => {
      const dataProvider = createMockDataProvider();
      const complianceService = new ComplianceService(dataProvider);
      
      // Run multiple assessments
      const assessments = [
        { a: "High", i: "High", c: "High" },
        { a: "Moderate", i: "Moderate", c: "Moderate" },
        { a: "Low", i: "Low", c: "Low" },
      ] as Array<{ a: SecurityLevel; i: SecurityLevel; c: SecurityLevel }>;

      const results = assessments.map((assessment) =>
        complianceService.getComplianceStatus(assessment.a, assessment.i, assessment.c)
      );

      // Each assessment should return unique but valid results
      expect(results).toHaveLength(3);
      for (const result of results) {
        expect(result.complianceScore).toBeGreaterThanOrEqual(0);
        expect(result.complianceScore).toBeLessThanOrEqual(100);
      }

      // Higher security should have higher compliance scores
      expect(results[0].complianceScore).toBeGreaterThan(results[1].complianceScore);
      expect(results[1].complianceScore).toBeGreaterThan(results[2].complianceScore);
    });
  });
});
