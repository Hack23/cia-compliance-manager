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
export { createMockBusinessImpact } from "../testUtils/testData";

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
export function createTestComplianceService() {
  return {
    // Core Methods
    getComplianceRequirements: vi.fn().mockReturnValue({
      NIST: { minimumLevel: "Moderate" },
      ISO27001: { minimumLevel: "High" },
      GDPR: { minimumLevel: "High" },
      HIPAA: { minimumLevel: "High" },
    }),

    calculateComplianceScore: vi.fn().mockReturnValue(75),

    getComplianceStatus: vi
      .fn()
      .mockImplementation((availLevel, integrLevel, confLevel) => {
        // Adjust return values based on security levels
        if (
          availLevel === "Very High" &&
          integrLevel === "Very High" &&
          confLevel === "Very High"
        ) {
          return {
            compliantFrameworks: [
              "NIST",
              "ISO27001",
              "GDPR",
              "HIPAA",
              "PCI DSS",
            ],
            partiallyCompliantFrameworks: [], // Empty array for Very High
            nonCompliantFrameworks: [],
            remediationSteps: [],
            requirements: ["Maintain current controls"],
            complianceScore: 100,
            status: "Compliant", // Added this missing property
          };
        } else if (
          availLevel === "None" &&
          integrLevel === "None" &&
          confLevel === "None"
        ) {
          return {
            compliantFrameworks: [], // Empty array for None
            partiallyCompliantFrameworks: [],
            nonCompliantFrameworks: [
              "NIST",
              "ISO27001",
              "GDPR",
              "HIPAA",
              "PCI DSS",
            ],
            remediationSteps: ["Implement basic security controls"],
            requirements: ["Implement basic controls"],
            complianceScore: 0,
            status: "Non-Compliant", // Added this missing property
          };
        } else {
          return {
            compliantFrameworks: ["NIST"],
            partiallyCompliantFrameworks: ["ISO27001"],
            nonCompliantFrameworks: ["GDPR", "HIPAA"],
            remediationSteps: ["Implement data protection measures"],
            requirements: ["Implement access controls"],
            complianceScore: 75,
            status: "Compliant", // Added this missing property
          };
        }
      }),

    // Framework Methods
    getSupportedFrameworks: vi.fn().mockReturnValue([
      {
        name: "NIST 800-53",
        description: "National Institute of Standards and Technology",
        requiredAvailabilityLevel: "Moderate",
        requiredIntegrityLevel: "Moderate",
        requiredConfidentialityLevel: "Moderate",
      },
      {
        name: "ISO 27001",
        description: "Information security management",
        requiredAvailabilityLevel: "Moderate",
        requiredIntegrityLevel: "Moderate",
        requiredConfidentialityLevel: "Moderate",
      },
      {
        name: "GDPR",
        description: "General Data Protection Regulation",
        requiredAvailabilityLevel: "Moderate",
        requiredIntegrityLevel: "Moderate",
        requiredConfidentialityLevel: "High",
      },
      {
        name: "HIPAA",
        description: "Health Insurance Portability and Accountability Act",
        requiredAvailabilityLevel: "High",
        requiredIntegrityLevel: "High",
        requiredConfidentialityLevel: "High",
      },
      {
        name: "PCI DSS",
        description: "Payment Card Industry Data Security Standard",
        requiredAvailabilityLevel: "High",
        requiredIntegrityLevel: "High",
        requiredConfidentialityLevel: "High",
      },
    ]),

    getCompliantFrameworks: vi
      .fn()
      .mockReturnValue(["NIST 800-53", "ISO 27001"]),

    getFrameworkDescription: vi.fn().mockImplementation((framework: string) => {
      const descriptions: Record<string, string> = {
        "NIST 800-53":
          "National Institute of Standards and Technology security controls for federal systems",
        "ISO 27001":
          "International standard for information security management systems",
        GDPR: "EU data protection and privacy regulation for EU residents",
        HIPAA:
          "Regulations for protecting sensitive patient health information",
        "PCI DSS":
          "Card industry security standard for handling payment card data",
      };
      return (
        descriptions[framework] ||
        "Security framework for ensuring compliance requirements"
      );
    }),

    getFrameworkStatus: vi.fn().mockReturnValue("compliant"),

    getFrameworkRequiredLevel: vi
      .fn()
      .mockImplementation((framework, component) => {
        if (framework === "HIPAA") return "High";
        if (framework === "PCI DSS" && component === "confidentiality")
          return "Very High";
        if (framework === "GDPR" && component === "confidentiality")
          return "High";
        if (framework === "GDPR" && component === "integrity")
          return "Moderate";
        if (framework === "NIST CSF" && component === "availability")
          return "Low";
        return "Moderate";
      }),

    isFrameworkApplicable: vi.fn().mockReturnValue(true),

    // Additional Framework Methods
    getFrameworkControls: vi.fn().mockImplementation((framework) => {
      // Return empty array for unknown frameworks
      if (framework === "Unknown Framework") {
        return [];
      }
      return ["Access Control", "Encryption", "Authentication"];
    }),

    getFrameworkRequirements: vi.fn().mockImplementation((framework) => {
      // Return empty array for unknown frameworks
      if (framework === "Unknown Framework") {
        return [];
      }
      return [
        "Implement access controls",
        "Protect sensitive data",
        "Regular security assessments",
      ];
    }),

    getRequiredSecurityLevel: vi.fn().mockReturnValue({
      availability: "Moderate" as SecurityLevel,
      integrity: "Moderate" as SecurityLevel,
      confidentiality: "Moderate" as SecurityLevel,
    }),

    isCompliant: vi
      .fn()
      .mockImplementation((framework, availLevel, integrLevel, confLevel) => {
        // Return false for HIPAA with Low security levels
        if (
          framework === "HIPAA" &&
          availLevel === "Low" &&
          integrLevel === "Low" &&
          confLevel === "Low"
        ) {
          return false;
        }
        return true;
      }),

    mapControlsToFrameworks: vi.fn().mockReturnValue({
      "Access Control": ["NIST 800-53", "ISO 27001", "GDPR"],
      Encryption: ["HIPAA", "PCI DSS", "GDPR"],
      Authentication: ["NIST 800-53", "ISO 27001", "HIPAA"],
    }),
  } as unknown as ComplianceService;
}

// Add a basic implementation if the above imports don't exist
export function createMockSecurityOptions() {
  return {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5000, opex: 2000 },
    Moderate: { capex: 15000, opex: 5000 },
    High: { capex: 50000, opex: 15000 },
    "Very High": { capex: 200000, opex: 50000 },
  };
}

/**
 * Creates a mock for the useCIAOptions hook
 * @returns Mocked hook implementation
 */
export function mockUseCIAOptionsHook() {
  return vi.fn().mockReturnValue(createCIAOptionsMock());
}

/**
 * Creates type guard test utilities
 * @param guard Type guard function to test
 * @param validExample Valid example of the type
 * @param invalidKeys Keys to make invalid for negative tests
 * @returns Test functions for the type guard
 */
export function createTypeGuardTests<T>(
  guard: (value: unknown) => value is T,
  validExample: T,
  invalidKeys: (keyof T)[]
): {
  testValidObject: () => void;
  testInvalidObjects: () => void;
} {
  return {
    testValidObject: () => {
      expect(guard(validExample)).toBe(true);
      expect(guard(null)).toBe(false);
      expect(guard(undefined)).toBe(false);
      expect(guard(123)).toBe(false);
      expect(guard("string")).toBe(false);
      expect(guard([])).toBe(false);
    },
    testInvalidObjects: () => {
      // Test each invalid key variant
      for (const key of invalidKeys) {
        const invalidObject = { ...validExample, [key]: undefined };
        expect(guard(invalidObject)).toBe(false);
      }
    },
  };
}
