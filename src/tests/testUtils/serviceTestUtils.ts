import { vi } from "vitest";
import { createTestDataProvider } from "../../data/testDataProvider";
import { BusinessImpactService } from "../../services/businessImpactService";
import { CIAContentService } from "../../services/ciaContentService";
import { ComplianceService } from "../../services/complianceService";
import { SecurityMetricsService } from "../../services/securityMetricsService";
import { SecurityResourceService } from "../../services/securityResourceService";
import { TechnicalImplementationService } from "../../services/technicalImplementationService";
import { SecurityLevel } from "../../types/cia";

/**
 * Creates a test BusinessImpactService for unit testing
 *
 * @returns A BusinessImpactService instance with test data
 */
export function createTestBusinessImpactService(): BusinessImpactService {
  return new BusinessImpactService(createTestDataProvider());
}

/**
 * Creates a test ComplianceService for unit testing
 *
 * @returns A ComplianceService instance with test data
 */
export function createTestComplianceService(): ComplianceService {
  return new ComplianceService(createTestDataProvider());
}

/**
 * Creates a test SecurityMetricsService for unit testing
 *
 * @returns A SecurityMetricsService instance with test data
 */
export function createTestSecurityMetricsService(): SecurityMetricsService {
  return new SecurityMetricsService(createTestDataProvider());
}

/**
 * Creates a test SecurityResourceService for unit testing
 *
 * @returns A SecurityResourceService instance with test data
 */
export function createTestSecurityResourceService(): SecurityResourceService {
  return new SecurityResourceService(createTestDataProvider());
}

/**
 * Creates a test TechnicalImplementationService for unit testing
 *
 * @returns A TechnicalImplementationService instance with test data
 */
export function createTestTechnicalImplementationService(): TechnicalImplementationService {
  return new TechnicalImplementationService(createTestDataProvider());
}

/**
 * Creates a test CIAContentService for unit testing with mocked dependencies
 *
 * @returns A CIAContentService instance with all dependencies mocked
 */
export function createTestCIAContentService(): CIAContentService {
  // Create base service with test data provider
  const service = new CIAContentService(createTestDataProvider());

  // Use type assertions to bypass private property access restrictions
  const serviceAny = service as any;

  // Mock the business impact service
  serviceAny.businessImpactService = {
    getBusinessImpact: vi.fn().mockReturnValue({
      summary: "Mock business impact summary",
      financial: { description: "Mock financial impact", riskLevel: "Medium" },
      operational: {
        description: "Mock operational impact",
        riskLevel: "Medium",
      },
      reputational: {
        description: "Mock reputational impact",
        riskLevel: "Medium",
      },
    }),
    getBusinessImpactDescription: vi
      .fn()
      .mockReturnValue("Mock business impact description"),
    getDetailedDescription: vi.fn().mockReturnValue({
      summary: "Mock detailed description",
      financial: { description: "Mock financial impact", riskLevel: "Medium" },
      operational: {
        description: "Mock operational impact",
        riskLevel: "Medium",
      },
      reputational: {
        description: "Mock reputational impact",
        riskLevel: "Medium",
      },
    }),
    calculateBusinessImpactLevel: vi.fn().mockReturnValue("Moderate"),
    getCategoryIcon: vi.fn().mockReturnValue("💰"),
  };

  // Mock the compliance service
  serviceAny.complianceService = {
    getComplianceStatus: vi.fn().mockReturnValue({
      status: "Partially Compliant",
      compliantFrameworks: ["NIST CSF", "ISO 27001"],
      partiallyCompliantFrameworks: ["GDPR"],
      nonCompliantFrameworks: ["HIPAA", "PCI DSS"],
      remediationSteps: ["Implement data protection measures"],
      complianceScore: 65,
    }),
    getCompliantFrameworks: vi.fn().mockReturnValue(["NIST CSF", "ISO 27001"]),
    getFrameworkDescription: vi
      .fn()
      .mockReturnValue("Mock framework description"),
    getFrameworkStatus: vi.fn().mockReturnValue("compliant"),
    getComplianceStatusText: vi.fn().mockReturnValue("Partially Compliant"),
    getSupportedFrameworks: vi
      .fn()
      .mockReturnValue([
        { name: "NIST CSF", description: "Cybersecurity Framework" },
      ]),
    getFrameworkRequiredLevel: vi.fn().mockReturnValue("Moderate"),
    isFrameworkApplicable: vi.fn().mockReturnValue(true),
  };

  // Mock the security metrics service
  serviceAny.securityMetricsService = {
    getSecurityMetrics: vi.fn().mockReturnValue({
      score: 6,
      maxScore: 12,
      percentage: "50%",
      totalCapex: 30000,
      totalOpex: 15000,
      totalCost: 45000,
      riskReduction: "50%",
    }),
    getComponentMetrics: vi.fn().mockReturnValue({
      component: "availability",
      level: "Moderate",
      value: 2,
      percentage: "50%",
      description: "Standard security controls",
      capex: 10000,
      opex: 5000,
    }),
    getImpactMetrics: vi.fn().mockReturnValue({
      securityLevel: "Moderate",
      riskReduction: "50%",
      description: "Standard security controls",
      technical: "Standard technical controls",
      businessImpact: "Medium business impact",
    }),
    getSecurityLevelDescription: vi
      .fn()
      .mockReturnValue("Standard security controls"),
    getProtectionLevel: vi.fn().mockReturnValue("Balanced Protection"),
    getSecurityIcon: vi.fn().mockReturnValue("🔓"),
    calculateSecurityScore: vi.fn().mockReturnValue(50),
    calculateRoi: vi.fn().mockReturnValue({
      value: "$150,000",
      percentage: "150%",
      description: "Moderate return on investment",
    }),
  };

  // Mock the technical implementation service
  serviceAny.technicalImplementationService = {
    getTechnicalImplementation: vi.fn().mockReturnValue({
      description: "Mock technical implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "2-4 weeks",
        maintenance: "Monthly reviews",
        expertise: "Security professional",
      },
    }),
    getComponentImplementationDetails: vi.fn().mockReturnValue({
      description: "Mock component implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "2-4 weeks",
        maintenance: "Monthly reviews",
        expertise: "Security professional",
      },
    }),
    getTechnicalDescription: vi
      .fn()
      .mockReturnValue("Mock technical description"),
    getRecommendations: vi
      .fn()
      .mockReturnValue(["Recommendation 1", "Recommendation 2"]),
    getImplementationConsiderations: vi
      .fn()
      .mockReturnValue("Mock implementation considerations"),
    getImplementationTime: vi.fn().mockReturnValue("1-2 months"),
  };

  // Mock the security resource service
  serviceAny.securityResourceService = {
    getValuePoints: vi.fn().mockReturnValue(["Value point 1", "Value point 2"]),
    getSecurityResources: vi.fn().mockReturnValue([
      {
        id: "resource-1",
        title: "Resource 1",
        description: "Mock resource description",
        url: "https://example.com/resource1",
        type: "documentation",
        relevance: 90,
      },
    ]),
  };

  return service;
}

/**
 * Creates mocked implementation of getDefaultSecurityIcon for testing
 *
 * @returns A function that returns security icons based on security level
 */
export function createMockSecurityIconFn() {
  return (level: SecurityLevel) => {
    const icons: Record<SecurityLevel, string> = {
      None: "⚠️",
      Low: "🔑",
      Moderate: "🔓",
      High: "🔒",
      "Very High": "🔐",
    };
    return icons[level] || "❓";
  };
}

/**
 * Creates mocked implementation of getDefaultValuePoints for testing
 *
 * @returns A function that returns value points based on security level
 */
export function createMockValuePointsFn() {
  return (level: SecurityLevel) => {
    if (level === "None") return [];
    return [`Value point for ${level} security`];
  };
}
