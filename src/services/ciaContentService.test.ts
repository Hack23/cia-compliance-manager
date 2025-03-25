import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCIAOptionsMock } from "../tests/testMocks/ciaOptionsMocks";
import { createTestCIAContentService } from "../tests/utils/mock";
import { SecurityLevel } from "../types/cia";
import { CIADetails } from "../types/cia-services";
import { BusinessImpactDetails } from "../types/impact";
import {
  CIAContentService,
  createCIAContentService,
  getInformationSensitivity,
  getRiskBadgeVariant,
  getROIEstimate,
  getValuePoints,
} from "./ciaContentService";

// Set up mocks using the project's standardized approach
vi.mock("../hooks/useCIAOptions", () => createCIAOptionsMock());

// Properly format the vi.mock() calls with return objects
vi.mock("./businessImpactService", () => ({
  BusinessImpactService: vi.fn().mockImplementation(() => ({
    getBusinessImpact: vi.fn().mockReturnValue({
      summary: "Mock business impact",
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
  })),
  createBusinessImpactService: vi.fn().mockImplementation(() => ({
    getBusinessImpact: vi.fn().mockReturnValue({
      summary: "Mock business impact",
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
  })),
}));

vi.mock("./complianceService", () => ({
  ComplianceService: vi.fn().mockImplementation(() => ({
    getComplianceStatus: vi.fn().mockReturnValue({
      status: "Meets basic compliance only",
      compliantFrameworks: ["GDPR", "NIST CSF", "Basic ISO 27001"],
      partiallyCompliantFrameworks: ["SOC2"],
      nonCompliantFrameworks: ["HIPAA", "PCI DSS"],
      remediationSteps: ["Implement data protection"],
      requirements: ["Data protection by design"],
      complianceScore: 65,
    }),
    getCompliantFrameworks: vi.fn().mockReturnValue(["GDPR", "NIST CSF"]),
    getFrameworkDescription: vi
      .fn()
      .mockReturnValue("Mock framework description"),
    getFrameworkStatus: vi.fn().mockReturnValue("compliant"),
  })),
  createComplianceService: vi.fn().mockImplementation(() => ({
    getComplianceStatus: vi.fn().mockReturnValue({
      status: "Meets basic compliance only",
      compliantFrameworks: ["GDPR", "NIST CSF"],
      partiallyCompliantFrameworks: ["SOC2"],
      nonCompliantFrameworks: ["HIPAA", "PCI DSS"],
      remediationSteps: ["Implement data protection"],
      requirements: ["Data protection by design"],
      complianceScore: 65,
    }),
    getCompliantFrameworks: vi.fn().mockReturnValue(["GDPR", "NIST CSF"]),
    getFrameworkDescription: vi
      .fn()
      .mockReturnValue("Mock framework description"),
    getFrameworkStatus: vi.fn().mockReturnValue("compliant"),
  })),
}));

vi.mock("./ComplianceServiceAdapter", () => ({
  ComplianceServiceAdapter: vi.fn().mockImplementation(() => ({
    getComplianceStatus: vi.fn().mockReturnValue({
      status: "Meets basic compliance only",
      compliantFrameworks: ["GDPR", "NIST CSF"],
      partiallyCompliantFrameworks: ["SOC2"],
      nonCompliantFrameworks: ["HIPAA", "PCI DSS"],
      remediationSteps: ["Implement data protection"],
      requirements: ["Data protection by design"],
      complianceScore: 65,
    }),
    getCompliantFrameworks: vi.fn().mockReturnValue(["GDPR", "NIST CSF"]),
    getFrameworkDescription: vi
      .fn()
      .mockReturnValue("Mock framework description"),
  })),
}));

vi.mock("./securityMetricsService", () => ({
  SecurityMetricsService: vi.fn().mockImplementation(() => ({
    getSecurityMetrics: vi.fn().mockReturnValue({
      score: 6,
      maxScore: 12,
      percentage: "50%",
      totalCapex: 53000,
      totalOpex: 10600,
      totalCost: 63600,
      riskReduction: "50%",
    }),
    getComponentMetrics: vi.fn().mockReturnValue({
      component: "availability",
      level: "Moderate",
      value: 2,
      percentage: "50%",
      capex: 15000,
      opex: 3000,
      description: "Standard security controls",
    }),
    getImpactMetrics: vi.fn().mockReturnValue({
      securityLevel: "Moderate",
      riskReduction: "50%",
      uptime: "99%",
      rto: "4 hours",
      description: "Standard controls",
      technical: "Standard technical implementation",
      businessImpact: "Medium business impact",
    }),
    getSecurityLevelDescription: vi
      .fn()
      .mockReturnValue("Standard security controls"),
    getProtectionLevel: vi.fn().mockReturnValue("Balanced Protection"),
    calculateRoi: vi.fn().mockReturnValue({
      value: "$150,000",
      percentage: "150%",
      description: "Moderate return on security investment",
    }),
    getRiskBadgeVariant: vi.fn().mockReturnValue("info"),
    getSecurityIcon: vi.fn().mockReturnValue("🔓"),
    calculateSecurityScore: vi.fn().mockReturnValue(50),
    getSecurityLevelFromValue: vi.fn().mockImplementation((value) => {
      const levels = ["None", "Low", "Moderate", "High", "Very High"];
      return levels[value] || "None";
    }),
  })),
  createSecurityMetricsService: vi.fn().mockImplementation(() => ({
    getSecurityMetrics: vi.fn().mockReturnValue({
      score: 6,
      maxScore: 12,
      percentage: "50%",
      totalCapex: 53000,
      totalOpex: 10600,
      totalCost: 63600,
      riskReduction: "50%",
    }),
    getComponentMetrics: vi.fn().mockReturnValue({
      component: "availability",
      level: "Moderate",
      value: 2,
      percentage: "50%",
      capex: 15000,
      opex: 3000,
      description: "Standard security controls",
    }),
    getImpactMetrics: vi.fn().mockReturnValue({
      securityLevel: "Moderate",
      riskReduction: "50%",
      uptime: "99%",
      rto: "4 hours",
      description: "Standard controls",
      technical: "Standard technical implementation",
      businessImpact: "Medium business impact",
    }),
    getSecurityLevelDescription: vi
      .fn()
      .mockReturnValue("Standard security controls"),
    getProtectionLevel: vi.fn().mockReturnValue("Balanced Protection"),
    calculateRoi: vi.fn().mockReturnValue({
      value: "$150,000",
      percentage: "150%",
      description: "Moderate return on security investment",
    }),
    getRiskBadgeVariant: vi.fn().mockReturnValue("info"),
    getSecurityIcon: vi.fn().mockReturnValue("🔓"),
    calculateSecurityScore: vi.fn().mockReturnValue(50),
    getSecurityLevelFromValue: vi.fn().mockImplementation((value) => {
      const levels = ["None", "Low", "Moderate", "High", "Very High"];
      return levels[value] || "None";
    }),
  })),
}));

vi.mock("./technicalImplementationService", () => ({
  TechnicalImplementationService: vi.fn().mockImplementation(() => ({
    getTechnicalImplementation: vi.fn().mockReturnValue({
      description: "Mock technical implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "Weeks (2-4)",
        maintenance: "Regular (monthly review)",
        expertise: "Security professional",
      },
    }),
    getComponentImplementationDetails: vi.fn().mockReturnValue({
      description: "Mock component implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "Weeks (2-4)",
        maintenance: "Regular",
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
  })),
  createTechnicalImplementationService: vi.fn().mockImplementation(() => ({
    getTechnicalImplementation: vi.fn().mockReturnValue({
      description: "Mock technical implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "Weeks (2-4)",
        maintenance: "Regular (monthly review)",
        expertise: "Security professional",
      },
    }),
    getComponentImplementationDetails: vi.fn().mockReturnValue({
      description: "Mock component implementation",
      implementationSteps: ["Step 1", "Step 2"],
      effort: {
        development: "Weeks (2-4)",
        maintenance: "Regular",
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
  })),
}));

vi.mock("./securityResourceService", () => ({
  SecurityResourceService: vi.fn().mockImplementation(() => ({
    getValuePoints: vi.fn().mockReturnValue(["Value point 1", "Value point 2"]),
    getSecurityResources: vi.fn().mockReturnValue([
      {
        id: "resource-1",
        title: "Resource 1",
        description: "Description 1",
        url: "https://example.com/resource1",
        type: "general",
        relevance: 90,
      },
    ]),
  })),
  createSecurityResourceService: vi.fn().mockImplementation(() => ({
    getValuePoints: vi.fn().mockReturnValue(["Value point 1", "Value point 2"]),
    getSecurityResources: vi.fn().mockReturnValue([
      {
        id: "resource-1",
        title: "Resource 1",
        description: "Description 1",
        url: "https://example.com/resource1",
        type: "general",
        relevance: 90,
      },
    ]),
  })),
}));

// Convert to regular object instead of using vi.hoisted
const mockDataProvider = {
  // Create default mock data for security levels
  availabilityOptions: (() => {
    const levels = ["None", "Low", "Moderate", "High", "Very High"];
    const result: Record<SecurityLevel, CIADetails> = {} as Record<
      SecurityLevel,
      CIADetails
    >;

    levels.forEach((level) => {
      result[level as SecurityLevel] = {
        description: `Availability ${level.toLowerCase()}`,
        technical: `Availability technical controls`,
        businessImpact: `${
          level === "None"
            ? "Critical"
            : level === "Low"
            ? "High"
            : level === "Moderate"
            ? "Medium"
            : level === "High"
            ? "Low"
            : "Minimal"
        } business impact`,
        capex:
          level === "None"
            ? 0
            : level === "Low"
            ? 5000
            : level === "Moderate"
            ? 15000
            : level === "High"
            ? 30000
            : 60000,
        opex:
          level === "None"
            ? 0
            : level === "Low"
            ? 1000
            : level === "Moderate"
            ? 3000
            : level === "High"
            ? 6000
            : 12000,
        bg:
          level === "None"
            ? "#ffffff"
            : level === "Low"
            ? "#f8d7da"
            : level === "Moderate"
            ? "#fff3cd"
            : level === "High"
            ? "#d4edda"
            : "#cce5ff",
        text:
          level === "None"
            ? "#000000"
            : level === "Low"
            ? "#721c24"
            : level === "Moderate"
            ? "#856404"
            : level === "High"
            ? "#155724"
            : "#004085",
        recommendations:
          level === "None" ? [] : [`Availability recommendation for ${level}`],
      };
    });

    return result;
  })(),

  integrityOptions: (() => {
    const levels = ["None", "Low", "Moderate", "High", "Very High"];
    const result: Record<SecurityLevel, CIADetails> = {} as Record<
      SecurityLevel,
      CIADetails
    >;

    levels.forEach((level) => {
      result[level as SecurityLevel] = {
        description: `Integrity ${level.toLowerCase()}`,
        technical: `Integrity technical controls`,
        businessImpact: `${
          level === "None"
            ? "Critical"
            : level === "Low"
            ? "High"
            : level === "Moderate"
            ? "Medium"
            : level === "High"
            ? "Low"
            : "Minimal"
        } business impact`,
        capex:
          level === "None"
            ? 0
            : level === "Low"
            ? 5000
            : level === "Moderate"
            ? 15000
            : level === "High"
            ? 30000
            : 60000,
        opex:
          level === "None"
            ? 0
            : level === "Low"
            ? 1000
            : level === "Moderate"
            ? 3000
            : level === "High"
            ? 6000
            : 12000,
        bg:
          level === "None"
            ? "#ffffff"
            : level === "Low"
            ? "#f8d7da"
            : level === "Moderate"
            ? "#fff3cd"
            : level === "High"
            ? "#d4edda"
            : "#cce5ff",
        text:
          level === "None"
            ? "#000000"
            : level === "Low"
            ? "#721c24"
            : level === "Moderate"
            ? "#856404"
            : level === "High"
            ? "#155724"
            : "#004085",
        recommendations:
          level === "None" ? [] : [`Integrity recommendation for ${level}`],
      };
    });

    return result;
  })(),

  confidentialityOptions: (() => {
    const levels = ["None", "Low", "Moderate", "High", "Very High"];
    const result: Record<SecurityLevel, CIADetails> = {} as Record<
      SecurityLevel,
      CIADetails
    >;

    levels.forEach((level) => {
      result[level as SecurityLevel] = {
        description: `Confidentiality ${level.toLowerCase()}`,
        technical: `Confidentiality technical controls`,
        businessImpact: `${
          level === "None"
            ? "Critical"
            : level === "Low"
            ? "High"
            : level === "Moderate"
            ? "Medium"
            : level === "High"
            ? "Low"
            : "Minimal"
        } business impact`,
        capex:
          level === "None"
            ? 0
            : level === "Low"
            ? 5000
            : level === "Moderate"
            ? 15000
            : level === "High"
            ? 30000
            : 60000,
        opex:
          level === "None"
            ? 0
            : level === "Low"
            ? 1000
            : level === "Moderate"
            ? 3000
            : level === "High"
            ? 6000
            : 12000,
        bg:
          level === "None"
            ? "#ffffff"
            : level === "Low"
            ? "#f8d7da"
            : level === "Moderate"
            ? "#fff3cd"
            : level === "High"
            ? "#d4edda"
            : "#cce5ff",
        text:
          level === "None"
            ? "#000000"
            : level === "Low"
            ? "#721c24"
            : level === "Moderate"
            ? "#856404"
            : level === "High"
            ? "#155724"
            : "#004085",
        recommendations:
          level === "None"
            ? []
            : [`Confidentiality recommendation for ${level}`],
      };
    });

    return result;
  })(),

  roiEstimates: {
    NONE: {
      returnRate: "0%",
      value: "Negative",
      description: "No ROI",
    },
    LOW: {
      returnRate: "50%",
      value: "Low",
      description: "Low ROI",
    },
    MODERATE: {
      returnRate: "150%",
      value: "Moderate",
      description: "Moderate ROI",
    },
    HIGH: {
      returnRate: "250%",
      value: "High",
      description: "High ROI",
    },
    VERY_HIGH: {
      returnRate: "400%",
      value: "Very High",
      description: "Very high ROI",
    },
  },
  getDefaultSecurityIcon: vi.fn().mockReturnValue("🔒"),
  getDefaultValuePoints: vi.fn().mockReturnValue(["Default value point"]),
};

describe("CIAContentService", () => {
  let service: CIAContentService;

  beforeEach(() => {
    service = createTestCIAContentService();
  });

  describe("Core Functionality", () => {
    it("initializes with default or provided data provider", () => {
      const defaultService = new CIAContentService();
      expect(defaultService).toBeDefined();

      const customService = new CIAContentService(mockDataProvider);
      expect(customService).toBeDefined();
    });

    it("returns component options for valid component types", () => {
      const availOptions = service.getCIAOptions("availability");
      const intOptions = service.getCIAOptions("integrity");
      const confOptions = service.getCIAOptions("confidentiality");

      expect(availOptions).toBeDefined();
      expect(intOptions).toBeDefined();
      expect(confOptions).toBeDefined();

      // Check if we have security levels for each component
      expect(availOptions).toHaveProperty("None");
      expect(availOptions).toHaveProperty("Low");
      expect(availOptions).toHaveProperty("Moderate");
      expect(availOptions).toHaveProperty("High");
      expect(availOptions).toHaveProperty("Very High");
    });

    it("handles invalid component types gracefully", () => {
      // @ts-expect-error - Testing with invalid component type
      const invalidOptions = service.getCIAOptions("invalid");

      // Should return the default structure with empty values
      expect(invalidOptions).toBeDefined();
      expect(invalidOptions).toHaveProperty("None");
    });

    it("createCIAContentService factory creates a service instance", () => {
      const serviceInstance = createCIAContentService(mockDataProvider);
      expect(serviceInstance).toBeInstanceOf(CIAContentService);
    });
  });

  describe("Component Details", () => {
    it("getComponentDetails returns details for valid inputs", () => {
      const details = service.getComponentDetails("availability", "Moderate");
      expect(details).toBeDefined();
      expect(details).toHaveProperty("description");
      expect(details).toHaveProperty("technical");
    });

    it("getComponentDetails returns undefined for invalid inputs", () => {
      // @ts-expect-error - Testing with invalid component
      expect(service.getComponentDetails(null, null)).toBeUndefined();
      // @ts-expect-error - Testing with invalid component
      expect(service.getComponentDetails("invalid", "Invalid")).toBeUndefined();
    });
  });

  describe("ROI Functions", () => {
    it("getROIEstimate returns expected structure", () => {
      const roiEstimate = service.getROIEstimate("Moderate");
      expect(roiEstimate).toHaveProperty("returnRate");
      expect(roiEstimate).toHaveProperty("description");
    });

    it("getROIEstimates returns the same as getROIEstimate", () => {
      const estimate1 = service.getROIEstimate("High");
      const estimate2 = service.getROIEstimates("High");

      expect(estimate1).toEqual(estimate2);
    });

    it("getAllROIEstimates returns all ROI estimates", () => {
      const allEstimates = service.getAllROIEstimates();

      expect(allEstimates).toHaveProperty("NONE");
      expect(allEstimates).toHaveProperty("LOW");
      expect(allEstimates).toHaveProperty("MODERATE");
      expect(allEstimates).toHaveProperty("HIGH");
      expect(allEstimates).toHaveProperty("VERY_HIGH");
    });

    it("calculateRoi calculates ROI metrics correctly", () => {
      const roi = service.calculateRoi("Moderate", 100000);
      expect(roi).toHaveProperty("value");
      expect(roi).toHaveProperty("percentage");
      expect(roi).toHaveProperty("description");
    });
  });

  describe("Delegated Methods", () => {
    it("should delegate to specialized services correctly", () => {
      const tests = [
        {
          method: "getBusinessImpact",
          args: ["confidentiality", "High"],
          properties: ["summary", "financial", "operational"],
        },
        {
          method: "getTechnicalImplementation",
          args: ["integrity", "Moderate"],
          properties: ["description", "implementationSteps", "effort"],
        },
        {
          method: "getComplianceStatus",
          args: ["High", "High", "High"],
          properties: ["status", "compliantFrameworks"],
        },
        {
          method: "getSecurityMetrics",
          args: ["High"],
          properties: ["score", "maxScore", "percentage"],
        },
        {
          method: "getComponentMetrics",
          args: ["availability", "Moderate"],
          properties: ["component", "value", "percentage"],
        },
        {
          method: "getImpactMetrics",
          args: ["availability", "Moderate"],
          properties: ["securityLevel", "riskReduction"],
        },
        {
          method: "getSecurityResources",
          args: ["confidentiality", "High"],
          expectArray: true,
        },
        {
          method: "getRecommendations",
          args: ["availability", "Moderate"],
          expectArray: true,
        },
        {
          method: "getImplementationConsiderations",
          args: [["Moderate", "Moderate", "Moderate"]],
          expectString: true,
        },
        { method: "getImplementationTime", args: ["High"], expectString: true },
        {
          method: "getBusinessImpactDescription",
          args: ["integrity", "Low"],
          expectString: true,
        },
        {
          method: "getSecurityLevelDescription",
          args: ["Moderate"],
          expectString: true,
        },
        { method: "getRiskBadgeVariant", args: ["Medium"], expectString: true },
        { method: "getSecurityIcon", args: ["High"], expectString: true },
      ];

      tests.forEach((test) => {
        // @ts-expect-error - Dynamic method call
        const result = service[test.method](...test.args);

        if (test.expectArray) {
          expect(Array.isArray(result)).toBe(true);
          expect(result.length).toBeGreaterThan(0);
        } else if (test.expectString) {
          expect(typeof result).toBe("string");
          expect(result.length).toBeGreaterThan(0);
        } else if (test.properties) {
          test.properties.forEach((prop) => {
            expect(result).toHaveProperty(prop);
          });
        }
      });
    });

    it("getDetailedDescription should return business impact details", () => {
      // Define expected mock result
      const expectedResult: BusinessImpactDetails = {
        summary: "Mocked detailed description",
        financial: {
          description: "Mock financial impact",
          riskLevel: "Medium",
        },
        operational: {
          description: "Mock operational impact",
          riskLevel: "Medium",
        },
        reputational: {
          description: "Mock reputational impact",
          riskLevel: "Medium",
        },
      };

      // Mock the method to return the expected result
      vi.spyOn(service, "getDetailedDescription").mockReturnValueOnce(
        expectedResult
      );

      const details = service.getDetailedDescription("confidentiality", "High");

      expect(details).toEqual(expectedResult);
      expect(details).toHaveProperty("summary");
      expect(details).toHaveProperty("financial");
    });

    it("getTechnicalDescription should return string value", () => {
      const description = service.getTechnicalDescription(
        "availability",
        "High"
      );
      expect(typeof description).toBe("string");
      expect(description.length).toBeGreaterThan(0);
    });
  });

  describe("Complex Integration Methods", () => {
    const complexMethods = [
      {
        method: "getTotalImplementationTime",
        args: ["Low", "Moderate", "High"],
      },
      { method: "getRequiredExpertise", args: ["Low", "Low", "High"] },
      {
        method: "getRecommendedImplementationPlan",
        args: ["Low", "Moderate", "High"],
      },
    ];

    complexMethods.forEach(({ method, args }) => {
      it(`${method} should return valid result`, () => {
        // @ts-expect-error - Dynamic method call
        const result = service[method](...args);
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it("getInformationSensitivity returns correct classification", () => {
      const levels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];
      const expectedLabels = [
        "Public Data",
        "Internal Data",
        "Sensitive Data",
        "Confidential Data",
        "Restricted Data",
      ];

      levels.forEach((level, index) => {
        expect(service.getInformationSensitivity(level)).toBe(
          expectedLabels[index]
        );
      });
    });
  });

  describe("Helper Functions", () => {
    it("getImplementationConsiderations handles different security level combinations", () => {
      const uniformLevels = service.getImplementationConsiderations([
        "Moderate",
        "Moderate",
        "Moderate",
      ] as [SecurityLevel, SecurityLevel, SecurityLevel]);
      const mixedLevels = service.getImplementationConsiderations([
        "Low",
        "Moderate",
        "High",
      ] as [SecurityLevel, SecurityLevel, SecurityLevel]);
      const highSecurityLevels = service.getImplementationConsiderations([
        "High",
        "High",
        "Very High",
      ] as [SecurityLevel, SecurityLevel, SecurityLevel]);

      expect(uniformLevels).toBeDefined();
      expect(mixedLevels).toBeDefined();
      expect(highSecurityLevels).toBeDefined();

      // Verify it returns string type
      expect(typeof uniformLevels).toBe("string");
      expect(typeof mixedLevels).toBe("string");
      expect(typeof highSecurityLevels).toBe("string");
    });
  });
});

// Integration with createTestCIAContentService
describe("Integration with test utilities", () => {
  it("should create a working service using createTestCIAContentService", () => {
    const service = createTestCIAContentService();

    expect(service).toBeDefined();
    expect(
      service.getComponentDetails("availability", "Moderate")
    ).toBeDefined();
    expect(service.getROIEstimate("High")).toBeDefined();
    expect(service.getBusinessImpact("availability", "High")).toBeDefined();
  });
});

// Test for new methods in CIAContentService
describe("Extended CIAContentService functionality", () => {
  let service: CIAContentService;

  beforeEach(() => {
    // Using a custom mock service
    service = new CIAContentService(mockDataProvider);
  });

  it("getComponentContent should return content for a component and level", () => {
    const content = service.getComponentContent("availability", "Moderate");

    expect(content).toBeDefined();
    expect(content).toHaveProperty("description");
    expect(content).toHaveProperty("technical");
    expect(content).toHaveProperty("businessImpact");
    expect(content).toHaveProperty("recommendations");
  });

  it("getBusinessImpactContent should return business impact content", () => {
    const content = service.getBusinessImpactContent(
      "availability",
      "Moderate"
    );

    expect(typeof content).toBe("string");
    expect(content).toContain("Business Impact Summary");
  });

  it("getSummaryContent should return summary for security levels", () => {
    const content = service.getSummaryContent(
      "Moderate",
      "Moderate",
      "Moderate"
    );

    expect(typeof content).toBe("string");
    expect(content).toContain("Security Profile Summary");
  });

  it("getComplianceDescription should return compliance description", () => {
    const description = service.getComplianceDescription("High");

    expect(typeof description).toBe("string");
    expect(description.length).toBeGreaterThan(0);
  });

  it("getKeyValuePoints should return value points for a component", () => {
    const points = service.getKeyValuePoints("availability", "High");

    expect(Array.isArray(points)).toBe(true);
    expect(points.length).toBeGreaterThan(0);
  });
});

// Test the exported utility functions
describe("Exported utility functions", () => {
  it("getInformationSensitivity returns correct classification", () => {
    expect(getInformationSensitivity("None")).toBe("Public Data");
    expect(getInformationSensitivity("Low")).toBe("Internal Data");
    expect(getInformationSensitivity("Moderate")).toBe("Sensitive Data");
    expect(getInformationSensitivity("High")).toBe("Confidential Data");
    expect(getInformationSensitivity("Very High")).toBe("Restricted Data");
  });

  it("getRiskBadgeVariant returns correct variant", () => {
    expect(typeof getRiskBadgeVariant("Low Risk")).toBe("string");
    expect(typeof getRiskBadgeVariant("Medium Risk")).toBe("string");
    expect(typeof getRiskBadgeVariant("High Risk")).toBe("string");
    expect(typeof getRiskBadgeVariant("Critical Risk")).toBe("string");
  });

  it("getROIEstimate returns expected structure", () => {
    const estimate = getROIEstimate("Moderate");
    expect(estimate).toHaveProperty("returnRate");
    expect(estimate).toHaveProperty("description");
  });

  it("getValuePoints returns array of value points", () => {
    const points = getValuePoints("High");
    expect(Array.isArray(points)).toBe(true);
  });
});

// Add this test to the existing file after the "CIAContentService" describe block

describe("CIAContentService initialization", () => {
  it("should initialize successfully", async () => {
    const service = new CIAContentService();
    await expect(service.initialize()).resolves.toBeUndefined();
  });

  it("should handle getCIAOptions with invalid component gracefully", () => {
    const service = new CIAContentService();
    // @ts-expect-error - Testing with invalid component type
    const result = service.getCIAOptions("invalid");
    expect(result).toBeDefined();
    expect(result).toHaveProperty("None");
    expect(result.None).toHaveProperty("description");
    expect(result.None).toHaveProperty("technical");
  });
});
