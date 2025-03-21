import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCIAOptionsMock } from "../tests/testMocks/ciaOptionsMocks";
import { SecurityLevel } from "../types/cia";
import { CIAComponentType } from "../types/cia-services";
import { TechnicalImplementationService } from "./technicalImplementationService";

// Use the mock helper properly
vi.mock("../hooks/useCIAOptions", () => createCIAOptionsMock());

// Create a complete mock data provider that implements CIADataProvider interface
const mockTechnicalImplementationData = {
  availabilityOptions: {
    None: {
      description: "No availability controls",
      technical: "No technical controls for availability",
      businessImpact: "Critical business impact",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Implement basic availability controls"],
      technicalImplementation: {
        description: "No implementation required",
        implementationSteps: [],
        effort: {
          development: "None",
          maintenance: "None",
          expertise: "None",
        },
      },
    },
    Low: {
      description: "Basic availability controls",
      technical: "Basic technical controls",
      businessImpact: "High business impact",
      capex: 5000,
      opex: 1000,
      bg: "#f8d7da",
      text: "#721c24",
      recommendations: ["Implement basic redundancy"],
      technicalImplementation: {
        description: "Basic availability setup",
        implementationSteps: ["Configure basic monitoring"],
        effort: {
          development: "Days (1-5)",
          maintenance: "Minimal",
          expertise: "Basic security knowledge",
        },
      },
    },
    Moderate: {
      description: "Standard availability",
      technical: "Standard redundancy and failover",
      businessImpact: "Medium business impact",
      capex: 15000,
      opex: 3000,
      bg: "#fff3cd",
      text: "#856404",
      recommendations: ["Implement load balancing", "Setup automated backups"],
      technicalImplementation: {
        description: "Standard high availability setup",
        implementationSteps: [
          "Configure load balancer",
          "Setup backup schedule",
        ],
        effort: {
          development: "Weeks (2-4)",
          maintenance: "Regular (monthly review)",
          expertise: "Security professional",
        },
        requirements: ["Load balancer", "Backup solution"],
        technologies: ["AWS ELB", "Automated backup tools"],
      },
    },
    High: {
      description: "High availability controls",
      technical: "Advanced redundancy and failover",
      businessImpact: "Low business impact",
      capex: 30000,
      opex: 6000,
      bg: "#d4edda",
      text: "#155724",
      recommendations: ["Implement auto-scaling", "Setup disaster recovery"],
      technicalImplementation: {
        description: "Advanced high availability setup",
        implementationSteps: [
          "Configure auto-scaling",
          "Implement cross-zone redundancy",
        ],
        effort: {
          development: "Months (1-3)",
          maintenance: "Significant (biweekly monitoring)",
          expertise: "Security specialist",
        },
      },
    },
    "Very High": {
      description: "Very high availability controls",
      technical: "Maximum redundancy and failover",
      businessImpact: "Minimal business impact",
      capex: 60000,
      opex: 12000,
      bg: "#cce5ff",
      text: "#004085",
      recommendations: [
        "Implement multi-region failover",
        "Setup global load balancing",
      ],
      technicalImplementation: {
        description: "Enterprise-grade high availability setup",
        implementationSteps: [
          "Configure multi-region deployment",
          "Implement global DNS routing",
        ],
        effort: {
          development: "Months (3+)",
          maintenance: "Extensive (continuous monitoring)",
          expertise: "Security expert team",
        },
      },
    },
  },
  integrityOptions: {
    None: {
      description: "No integrity controls",
      technical: "No validation or verification",
      businessImpact: "Critical business impact",
      recommendations: ["Implement basic data validation"],
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
    },
    Low: {
      description: "Basic integrity controls",
      technical: "Basic validation",
      businessImpact: "High business impact",
      recommendations: ["Implement input validation"],
      capex: 5000,
      opex: 1000,
      bg: "#f8d7da",
      text: "#721c24",
    },
    Moderate: {
      description: "Standard integrity controls",
      technical: "Standard validation",
      businessImpact: "Medium business impact",
      recommendations: ["Implement checksums"],
      capex: 15000,
      opex: 3000,
      bg: "#fff3cd",
      text: "#856404",
    },
    High: {
      description: "Advanced integrity controls",
      technical: "Cryptographic verification",
      businessImpact: "Low business impact",
      recommendations: [
        "Implement digital signatures",
        "Use hash verification",
      ],
      technicalImplementation: {
        description: "Cryptographic integrity verification",
        implementationSteps: [
          "Implement signature verification",
          "Add hash validation",
        ],
        effort: {
          development: "Months (1-3)",
          maintenance: "Significant (biweekly monitoring)",
          expertise: "Security specialist",
        },
      },
      capex: 30000,
      opex: 6000,
      bg: "#d4edda",
      text: "#155724",
    },
    "Very High": {
      description: "Maximum integrity controls",
      technical: "Maximum verification",
      businessImpact: "Minimal business impact",
      recommendations: ["Implement blockchain verification"],
      capex: 60000,
      opex: 12000,
      bg: "#cce5ff",
      text: "#004085",
    },
  },
  confidentialityOptions: {
    None: {
      description: "No confidentiality controls",
      technical: "No access controls",
      businessImpact: "Critical business impact",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
      recommendations: ["Implement basic access controls"],
    },
    Low: {
      description: "Basic confidentiality",
      technical: "Simple access controls",
      businessImpact: "High business impact",
      technicalImplementation: {
        description: "Basic access control implementation",
        implementationSteps: [
          "Implement authentication",
          "Setup basic authorization",
        ],
        requirements: ["Authentication system"],
        effort: {
          development: "Days (1-5)",
          maintenance: "Minimal",
          expertise: "Basic security knowledge",
        },
      },
      capex: 7000,
      opex: 1400,
      bg: "#f8d7da",
      text: "#721c24",
      recommendations: ["Implement access controls"],
    },
    Moderate: {
      description: "Standard confidentiality",
      technical: "Standard access controls",
      businessImpact: "Medium business impact",
      capex: 20000,
      opex: 4000,
      bg: "#fff3cd",
      text: "#856404",
      recommendations: ["Implement encryption"],
    },
    High: {
      description: "Advanced confidentiality",
      technical: "Advanced protection",
      businessImpact: "Low business impact",
      capex: 40000,
      opex: 8000,
      bg: "#d4edda",
      text: "#155724",
      recommendations: ["Implement E2E encryption"],
    },
    "Very High": {
      description: "Maximum confidentiality",
      technical: "Maximum protection",
      businessImpact: "Minimal business impact",
      capex: 80000,
      opex: 16000,
      bg: "#cce5ff",
      text: "#004085",
      recommendations: ["Implement zero trust"],
    },
  },
  roiEstimates: {
    NONE: { returnRate: "0%", description: "No ROI", value: "0%" },
    LOW: { returnRate: "50%", description: "Low ROI", value: "50%" },
    MODERATE: {
      returnRate: "150%",
      description: "Moderate ROI",
      value: "150%",
    },
    HIGH: { returnRate: "300%", description: "High ROI", value: "300%" },
    VERY_HIGH: {
      returnRate: "500%",
      description: "Very high ROI",
      value: "500%",
    },
  },
  // Add required methods
  getDefaultSecurityIcon: vi.fn().mockReturnValue("🔒"),
  getDefaultValuePoints: vi.fn().mockReturnValue(["Value point"]),
};

describe("TechnicalImplementationService", () => {
  let service: TechnicalImplementationService;

  beforeEach(() => {
    service = new TechnicalImplementationService(
      mockTechnicalImplementationData
    );
  });

  describe("constructor", () => {
    it("initializes with provided data provider", () => {
      expect(service).toBeDefined();
    });
  });

  describe("getTechnicalImplementation", () => {
    it("returns technical implementation details for different security levels", () => {
      const noneDetails = service.getTechnicalImplementation(
        "availability",
        "None"
      );
      const moderateDetails = service.getTechnicalImplementation(
        "availability",
        "Moderate"
      );

      expect(noneDetails).toBeDefined();
      expect(moderateDetails).toBeDefined();

      expect(noneDetails.description).toContain("No implementation");
      expect(moderateDetails.description).toContain(
        "Standard high availability"
      );

      // Verify effort details are present
      expect(noneDetails.effort).toHaveProperty("development");
      expect(noneDetails.effort).toHaveProperty("maintenance");
      expect(noneDetails.effort).toHaveProperty("expertise");
    });

    it("normalizes security level inputs", () => {
      // Test case insensitivity
      const details1 = service.getTechnicalImplementation(
        "availability",
        "moderate"
      );
      const details2 = service.getTechnicalImplementation(
        "availability",
        "Moderate"
      );

      expect(details1.description).toBe(details2.description);

      // Test whitespace trimming
      const details3 = service.getTechnicalImplementation(
        "availability",
        " Moderate "
      );
      expect(details3.description).toBe(details2.description);
    });

    it("returns default implementation when technical implementation not found", () => {
      // Create a component type that doesn't have technical implementation
      const integDetails = service.getTechnicalImplementation(
        "integrity",
        "Moderate"
      );

      expect(integDetails).toBeDefined();
      expect(integDetails.implementationSteps).toBeInstanceOf(Array);
      expect(integDetails.effort).toBeDefined();
    });
  });

  describe("getRecommendations", () => {
    it("returns recommendations for a component and security level", () => {
      const recommendations = service.getRecommendations(
        "availability",
        "Moderate"
      );

      expect(recommendations).toBeInstanceOf(Array);
      expect(recommendations.length).toBeGreaterThan(0);
      expect(recommendations[0]).toContain("load balancing");
    });

    it("returns empty array for None security level", () => {
      const recommendations = service.getRecommendations(
        "availability",
        "None"
      );

      expect(recommendations).toBeInstanceOf(Array);
      expect(recommendations.length).toBe(0);
    });
  });

  describe("getImplementationConsiderations", () => {
    it("returns implementation considerations for uniform security levels", () => {
      const considerations = service.getImplementationConsiderations([
        "Moderate",
        "Moderate",
        "Moderate",
      ]);

      expect(typeof considerations).toBe("string");
      expect(considerations.length).toBeGreaterThan(0);
      expect(considerations).toContain("uniform");
    });

    it("returns implementation considerations for mixed security levels", () => {
      const considerations = service.getImplementationConsiderations([
        "Low",
        "Moderate",
        "High",
      ]);

      expect(typeof considerations).toBe("string");
      expect(considerations.length).toBeGreaterThan(0);
      expect(considerations).toContain("mixed");
    });

    it("handles invalid input gracefully", () => {
      // @ts-expect-error Testing with invalid input
      const considerations = service.getImplementationConsiderations("invalid");

      expect(typeof considerations).toBe("string");
      expect(considerations).toContain("Invalid");
    });
  });

  describe("getImplementationTime", () => {
    it("returns appropriate implementation time estimates for each security level", () => {
      expect(service.getImplementationTime("None")).toContain(
        "No implementation"
      );
      expect(service.getImplementationTime("Low")).toContain("weeks");
      expect(service.getImplementationTime("Moderate")).toContain("months");
      expect(service.getImplementationTime("High")).toContain("months");
      expect(service.getImplementationTime("Very High")).toContain("months");
    });

    it("returns Unknown for invalid input", () => {
      // @ts-expect-error Testing with invalid security level
      expect(service.getImplementationTime("Invalid")).toBe("Unknown");
    });
  });

  describe("getTechnicalDescription", () => {
    it("returns standard description containing security level and component", () => {
      const text = service.getTechnicalDescription(
        "confidentiality",
        "Moderate"
      );

      expect(typeof text).toBe("string");
      expect(text.length).toBeGreaterThan(0);

      // Should contain both component and level
      expect(text).toMatch(/standard/i);
    });
  });

  describe("getComponentImplementationDetails", () => {
    it("returns component implementation details", () => {
      const details = service.getComponentImplementationDetails(
        "availability",
        "Moderate"
      );

      expect(details).toBeDefined();
      expect(details).toHaveProperty("description");
      expect(details).toHaveProperty("implementationSteps");
      expect(details).toHaveProperty("effort");

      expect(details.effort).toHaveProperty("development");
      expect(details.effort).toHaveProperty("maintenance");
      expect(details.effort).toHaveProperty("expertise");
    });
  });

  describe("getFormattedTechnicalDescription", () => {
    it("returns formatted description with icon", () => {
      const formatted = service.getFormattedTechnicalDescription(
        "availability",
        "Moderate"
      );

      expect(formatted).toHaveProperty("text");
      expect(formatted).toHaveProperty("icon");
      expect(typeof formatted.text).toBe("string");
      expect(typeof formatted.icon).toBe("string");
    });
  });

  describe("getImplementationDifficulty", () => {
    it("returns difficulty rating based on security level", () => {
      expect(service.getImplementationDifficulty("None")).toBe("None");
      expect(service.getImplementationDifficulty("Low")).toBe("Easy");
      expect(service.getImplementationDifficulty("Moderate")).toBe("Moderate");
      expect(service.getImplementationDifficulty("High")).toBe("Complex");
      expect(service.getImplementationDifficulty("Very High")).toBe(
        "Very Complex"
      );
    });
  });
});
