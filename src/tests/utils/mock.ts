/**
 * Mock factory utilities for CIA Compliance Manager.
 *
 * This file consolidates mock creation functions.
 *
 * @packageDocumentation
 */

import { vi } from "vitest";
import { CIAContentService } from "../../services/ciaContentService";
import { ComplianceService } from "../../services/complianceService";
import { CIAComponent, SecurityLevel } from "../../types/cia";
import { createCIAOptionsMock } from "../testMocks/ciaOptionsMocks";

// Re-export from existing mock files or provide implementations
export { createCIAOptionsMock } from "../testMocks/ciaOptionsMocks";

/**
 * Creates a test instance of CIAContentService
 * @returns Mocked CIAContentService
 */
export function createTestCIAContentService() {
  const ciaOptions = createCIAOptionsMock();

  return {
    // Core Methods
    getOptions: vi.fn().mockReturnValue(ciaOptions),
    getCIAOptions: vi.fn().mockImplementation((component: CIAComponent) => {
      if (component === "availability") return ciaOptions.availabilityOptions;
      if (component === "integrity") return ciaOptions.integrityOptions;
      if (component === "confidentiality")
        return ciaOptions.confidentialityOptions;
      // Return an object with a None property for invalid components
      return { None: { description: "Invalid component" } };
    }),

    // CIA Component Details
    getComponentDetails: vi.fn().mockImplementation((component, level) => {
      // Return undefined for null or invalid inputs
      if (
        component === null ||
        level === null ||
        component === undefined ||
        level === undefined ||
        component === "invalid" ||
        level === "Invalid"
      ) {
        return undefined;
      }

      return {
        description: "Test component description",
        technical: "Test technical details",
        businessImpact: "Test business impact",
        recommendations: ["Test recommendation"],
        capex: 10000,
        opex: 2000,
      };
    }),

    getCIATriadDetails: vi.fn().mockReturnValue({
      availability: { description: "Test availability description" },
      integrity: { description: "Test integrity description" },
      confidentiality: { description: "Test confidentiality description" },
    }),

    getDetailBySecurityLevel: vi.fn().mockReturnValue({
      description: "Test security level description",
      recommendations: ["Test recommendation 1", "Test recommendation 2"],
    }),

    // ROI Methods
    getROIEstimate: vi.fn().mockReturnValue({
      returnRate: "150%",
      description: "Test ROI description",
      value: "Good",
    }),

    getROIEstimates: vi.fn().mockReturnValue({
      returnRate: "150%",
      description: "Test ROI description",
      value: "Good",
    }),

    getAllROIEstimates: vi.fn().mockReturnValue({
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: { returnRate: "150%", description: "Moderate ROI" },
      HIGH: { returnRate: "300%", description: "High ROI" },
      VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
    }),

    calculateRoi: vi.fn().mockReturnValue({
      value: "$100,000",
      percentage: "150%",
      description: "Good ROI",
    }),

    // Business Impact Methods
    getBusinessImpact: vi.fn().mockReturnValue({
      summary: "Test business impact summary",
      financial: { description: "Financial impact", riskLevel: "Medium" },
      operational: { description: "Operational impact", riskLevel: "Low" },
      reputational: { description: "Reputational impact", riskLevel: "High" },
    }),

    getDetailedDescription: vi.fn().mockReturnValue({
      summary: "Test detailed description",
      financial: { description: "Financial details", riskLevel: "Medium" },
      operational: { description: "Operational details", riskLevel: "Low" },
      reputational: { description: "Reputational details", riskLevel: "High" },
    }),

    getBusinessImpactDescription: vi
      .fn()
      .mockReturnValue("Test business impact description"),

    // Technical Implementation Methods
    getTechnicalDescription: vi
      .fn()
      .mockReturnValue("Test technical description"),
    getTechnicalImplementation: vi.fn().mockReturnValue({
      description: "Test implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        // Added effort property to fix test
        development: "Weeks (2-4)",
        maintenance: "Regular (monthly review)",
        expertise: "Security professional",
      },
    }),

    // Compliance Methods
    getComplianceStatus: vi.fn().mockReturnValue({
      compliantFrameworks: ["NIST"],
      partiallyCompliantFrameworks: ["ISO27001"],
      nonCompliantFrameworks: ["HIPAA"],
      remediationSteps: ["Implement security controls"],
      status: "Compliant", // Added the missing status property
    }),

    // Security Methods
    getSecurityMetrics: vi.fn().mockReturnValue({
      score: 75,
      maxScore: 100,
      percentage: "75%",
    }),

    getComponentMetrics: vi.fn().mockImplementation((component) => {
      return {
        component: component, // Add this missing property
        level: "Moderate",
        value: 2,
        percentage: "50%",
      };
    }),

    getImpactMetrics: vi.fn().mockReturnValue({
      securityLevel: "Moderate",
      riskReduction: "50%",
    }),

    // Component Information Methods
    getComponentContent: vi.fn().mockReturnValue({
      description: "Test content",
      technical: "Technical details",
      businessImpact: "Business impact",
      recommendations: ["Recommendation"],
    }),

    getBusinessImpactContent: vi
      .fn()
      .mockReturnValue("## Business Impact Summary\nTest impact"),

    getSummaryContent: vi
      .fn()
      .mockReturnValue("## Security Profile Summary\nTest profile"),

    // Helper Methods
    getRecommendations: vi
      .fn()
      .mockReturnValue(["Test recommendation 1", "Test recommendation 2"]),

    getImplementationConsiderations: vi
      .fn()
      .mockReturnValue("Test implementation considerations"),

    getSecurityLevelDescription: vi
      .fn()
      .mockReturnValue("Test security level description"),

    getRiskBadgeVariant: vi.fn().mockReturnValue("warning"),

    getSecurityIcon: vi.fn().mockReturnValue("🔒"),

    getSecurityResources: vi
      .fn()
      .mockReturnValue([
        { id: "1", title: "Resource 1", url: "https://example.com/1" },
      ]),

    getInformationSensitivity: vi.fn().mockImplementation((level) => {
      const labels = {
        None: "Public Data",
        Low: "Internal Data",
        Moderate: "Sensitive Data",
        High: "Confidential Data",
        "Very High": "Restricted Data",
      };
      return labels[level as SecurityLevel] || "Unknown";
    }),

    getComplianceDescription: vi
      .fn()
      .mockReturnValue("Test compliance description"),

    getKeyValuePoints: vi.fn().mockReturnValue(["Key point 1", "Key point 2"]),

    // Integration Methods
    getTotalImplementationTime: vi.fn().mockReturnValue("2-4 months"),

    getRequiredExpertise: vi.fn().mockReturnValue("Security professional"),

    getRecommendedImplementationPlan: vi
      .fn()
      .mockReturnValue("Step 1: Plan\nStep 2: Implement"),

    // Additional methods used in tests
    getImplementationTime: vi.fn().mockReturnValue("2-4 months"),

    getCategoryIcon: vi.fn().mockReturnValue("📊"),

    getBusinessPerspective: vi
      .fn()
      .mockReturnValue("Test business perspective"),

    getProtectionLevel: vi.fn().mockReturnValue("Standard protection"),

    getComponentImplementationDetails: vi.fn().mockReturnValue({
      description: "Test implementation details",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "2-4 weeks",
        maintenance: "Monthly",
        expertise: "Security professional",
      },
    }),
  } as unknown as CIAContentService;
}

/**
 * Creates a test instance of ComplianceService
 * @returns Mocked ComplianceService
 */

