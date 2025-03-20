import { beforeEach, describe, expect, it, vi } from "vitest";
import { createTestDataProvider } from "../data/testDataProvider";
import { SecurityLevel } from "../types/cia";
import { SecurityResourceService } from "./securityResourceService";

// Mock data provider
const mockDataProvider = vi.hoisted(() => ({
  availabilityOptions: {
    None: {
      description: "No availability",
      technical: "No controls",
      businessImpact: "Critical impact", // Add missing properties
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    },
    Low: {
      description: "Low availability",
      technical: "Basic controls",
      businessImpact: "High impact",
      capex: 1000,
      opex: 500,
      bg: "#f8d7da",
      text: "#721c24",
      recommendations: ["Implement basic redundancy"],
    },
    Moderate: {
      description: "Medium availability",
      technical: "Standard controls",
      businessImpact: "Medium impact",
      capex: 2000,
      opex: 1000,
      bg: "#fff3cd",
      text: "#856404",
      recommendations: ["Implement load balancing"],
    },
    High: {
      description: "High availability",
      technical: "Advanced controls",
      businessImpact: "Low impact",
      capex: 4000,
      opex: 1500,
      bg: "#d4edda",
      text: "#155724",
      recommendations: ["Implement geographic redundancy"],
    },
    "Very High": {
      description: "Maximum availability",
      technical: "Maximum controls",
      businessImpact: "Minimal impact",
      capex: 8000,
      opex: 2500,
      bg: "#cce5ff",
      text: "#004085",
      recommendations: ["Implement multi-region failover"],
    },
  },
  integrityOptions: {
    None: { description: "No integrity", technical: "No controls" },
    Low: { description: "Low integrity", technical: "Basic controls" },
    Moderate: {
      description: "Medium integrity",
      technical: "Standard controls",
    },
    High: { description: "High integrity", technical: "Advanced controls" },
    "Very High": {
      description: "Maximum integrity",
      technical: "Maximum controls",
    },
  },
  confidentialityOptions: {
    None: { description: "No confidentiality", technical: "No controls" },
    Low: { description: "Low confidentiality", technical: "Basic controls" },
    Moderate: {
      description: "Medium confidentiality",
      technical: "Standard controls",
    },
    High: {
      description: "High confidentiality",
      technical: "Advanced controls",
    },
    "Very High": {
      description: "Maximum confidentiality",
      technical: "Maximum controls",
    },
  },
  // Add a custom implementation for testing
  getDefaultValuePoints: (level: SecurityLevel) => {
    if (level === "High") {
      return [
        "Custom high value point 1",
        "Custom high value point 2",
        "Custom high value point 3",
      ];
    }
    return [];
  },
}));

describe("SecurityResourceService", () => {
  const dataProvider = createTestDataProvider();
  const resourceService = new SecurityResourceService(dataProvider);

  it("should return a non-empty array of security resources for a given component and level", () => {
    const resources = resourceService.getSecurityResources(
      "availability",
      "High"
    );
    expect(Array.isArray(resources)).toBe(true);
    expect(resources.length).toBeGreaterThan(0);
  });

  let testService: SecurityResourceService;

  beforeEach(() => {
    // Add the missing roiEstimates property and complete other required fields
    const updatedMockDataProvider = {
      ...mockDataProvider,
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No ROI" },
        LOW: { returnRate: "50%", description: "Low ROI" },
        MODERATE: { returnRate: "200%", description: "Moderate ROI" },
        HIGH: { returnRate: "350%", description: "High ROI" },
        VERY_HIGH: { returnRate: "500%", description: "Very High ROI" },
      },
      // Ensure all security levels are present in availabilityOptions
      availabilityOptions: {
        None: {
          description: "No availability",
          technical: "No controls",
          businessImpact: "Critical impact",
          capex: 0,
          opex: 0,
          bg: "#ffffff",
          text: "#000000",
          recommendations: [],
        },
        Low: {
          description: "Low availability",
          technical: "Basic controls",
          businessImpact: "High impact",
          capex: 1000,
          opex: 500,
          bg: "#f8d7da",
          text: "#721c24",
          recommendations: ["Implement basic redundancy"],
        },
        Moderate: {
          description: "Medium availability",
          technical: "Standard controls",
          businessImpact: "Medium impact",
          capex: 2000,
          opex: 1000,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Implement load balancing"],
        },
        High: {
          description: "High availability",
          technical: "Advanced controls",
          businessImpact: "Low impact",
          capex: 4000,
          opex: 1500,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement geographic redundancy"],
        },
        "Very High": {
          description: "Maximum availability",
          technical: "Maximum controls",
          businessImpact: "Minimal impact",
          capex: 8000,
          opex: 2500,
          bg: "#cce5ff",
          text: "#004085",
          recommendations: ["Implement multi-region failover"],
        },
      },
      // Similarly update integrityOptions and confidentialityOptions
      integrityOptions: {
        None: {
          description: "No integrity",
          technical: "No controls",
          businessImpact: "Critical impact",
          capex: 0,
          opex: 0,
          bg: "#ffffff",
          text: "#000000",
          recommendations: [],
        },
        // Add similar properties for other levels...
        Low: {
          description: "Low integrity",
          technical: "Basic controls",
          businessImpact: "High impact",
          capex: 1000,
          opex: 500,
          bg: "#f8d7da",
          text: "#721c24",
          recommendations: ["Implement basic validation"],
        },
        Moderate: {
          description: "Medium integrity",
          technical: "Standard controls",
          businessImpact: "Medium impact",
          capex: 2000,
          opex: 1000,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Implement checksums"],
        },
        High: {
          description: "High integrity",
          technical: "Advanced controls",
          businessImpact: "Low impact",
          capex: 4000,
          opex: 1500,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement digital signatures"],
        },
        "Very High": {
          description: "Maximum integrity",
          technical: "Maximum controls",
          businessImpact: "Minimal impact",
          capex: 8000,
          opex: 2500,
          bg: "#cce5ff",
          text: "#004085",
          recommendations: ["Implement blockchain verification"],
        },
      },
      confidentialityOptions: {
        None: {
          description: "No confidentiality",
          technical: "No controls",
          businessImpact: "Critical impact",
          capex: 0,
          opex: 0,
          bg: "#ffffff",
          text: "#000000",
          recommendations: [],
        },
        // Add similar properties for other levels...
        Low: {
          description: "Low confidentiality",
          technical: "Basic controls",
          businessImpact: "High impact",
          capex: 1000,
          opex: 500,
          bg: "#f8d7da",
          text: "#721c24",
          recommendations: ["Implement basic access control"],
        },
        Moderate: {
          description: "Medium confidentiality",
          technical: "Standard controls",
          businessImpact: "Medium impact",
          capex: 2000,
          opex: 1000,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Implement encryption"],
        },
        High: {
          description: "High confidentiality",
          technical: "Advanced controls",
          businessImpact: "Low impact",
          capex: 4000,
          opex: 1500,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement end-to-end encryption"],
        },
        "Very High": {
          description: "Maximum confidentiality",
          technical: "Maximum controls",
          businessImpact: "Minimal impact",
          capex: 8000,
          opex: 2500,
          bg: "#cce5ff",
          text: "#004085",
          recommendations: ["Implement zero trust architecture"],
        },
      },
    };

    testService = new SecurityResourceService(updatedMockDataProvider);
  });

  describe("getValuePoints", () => {
    it("returns default value points for different security levels", () => {
      const nonePoints = testService.getValuePoints("None");
      const lowPoints = testService.getValuePoints("Low");
      const moderatePoints = testService.getValuePoints("Moderate");
      const veryHighPoints = testService.getValuePoints("Very High");

      // Check that we get value points for each level
      expect(nonePoints.length).toBeGreaterThan(0);
      expect(lowPoints.length).toBeGreaterThan(0);
      expect(moderatePoints.length).toBeGreaterThan(0);
      expect(veryHighPoints.length).toBeGreaterThan(0);

      // Check specific content
      expect(nonePoints[0]).toContain("No security value");
      expect(lowPoints[0]).toContain("Basic security value");
      expect(moderatePoints[0]).toContain("Balanced security value");
      expect(veryHighPoints[0]).toContain("Maximum security value");
    });

    it("uses custom value points from data provider when available", () => {
      // Our mock provides custom value points for "High" level
      const highPoints = testService.getValuePoints("High");

      expect(highPoints.length).toBe(3);
      expect(highPoints[0]).toBe("Custom high value point 1");
      expect(highPoints[1]).toBe("Custom high value point 2");
      expect(highPoints[2]).toBe("Custom high value point 3");
    });

    it("falls back to default value points when custom provider returns empty array", () => {
      // Our mock returns empty array for all levels except "High"
      const moderatePoints = testService.getValuePoints("Moderate");

      expect(moderatePoints.length).toBeGreaterThan(0);
      expect(moderatePoints[0]).toContain("Balanced security value");
    });
  });

  describe("getSecurityResources", () => {
    it("returns resources for all component types", () => {
      const availResources = testService.getSecurityResources(
        "availability",
        "Moderate"
      );
      const intResources = testService.getSecurityResources(
        "integrity",
        "Moderate"
      );
      const confResources = testService.getSecurityResources(
        "confidentiality",
        "Moderate"
      );

      expect(availResources.length).toBeGreaterThan(0);
      expect(intResources.length).toBeGreaterThan(0);
      expect(confResources.length).toBeGreaterThan(0);
    });

    it("returns more specific resources for higher security levels", () => {
      const lowResources = testService.getSecurityResources(
        "availability",
        "Low"
      );
      const highResources = testService.getSecurityResources(
        "availability",
        "High"
      );
      const veryHighResources = testService.getSecurityResources(
        "availability",
        "Very High"
      );

      // All levels should include at least the general resources
      expect(lowResources.length).toBeGreaterThan(0);
      expect(highResources.length).toBeGreaterThan(0);
      expect(veryHighResources.length).toBeGreaterThan(0);

      // Check specific details of resources
      const lowLevelResource = lowResources.find(
        (r) => r.id === "availability-low"
      );
      const highLevelResource = highResources.find(
        (r) => r.id === "availability-high"
      );
      const veryHighLevelResource = veryHighResources.find(
        (r) => r.id === "availability-very-high"
      );

      expect(lowLevelResource).toBeDefined();
      expect(lowLevelResource?.title).toContain("Basic");
      expect(highLevelResource).toBeDefined();
      expect(highLevelResource?.title).toContain("Protection");
      expect(veryHighLevelResource).toBeDefined();
      expect(veryHighLevelResource?.title).toContain("Critical");
    });

    it("includes component-specific resources", () => {
      const availResources = testService.getSecurityResources(
        "availability",
        "Moderate"
      );
      const intResources = testService.getSecurityResources(
        "integrity",
        "Moderate"
      );
      const confResources = testService.getSecurityResources(
        "confidentiality",
        "Moderate"
      );

      const availSpecificResource = availResources.find(
        (r) => r.id === "availability-resources"
      );
      const intSpecificResource = intResources.find(
        (r) => r.id === "integrity-resources"
      );
      const confSpecificResource = confResources.find(
        (r) => r.id === "confidentiality-resources"
      );

      expect(availSpecificResource).toBeDefined();
      expect(availSpecificResource?.title).toContain("Availability");
      expect(intSpecificResource).toBeDefined();
      expect(intSpecificResource?.title).toContain("Integrity");
      expect(confSpecificResource).toBeDefined();
      expect(confSpecificResource?.title).toContain("Protection");
    });

    it("includes relevance scores and tags for resources", () => {
      const resources = testService.getSecurityResources(
        "availability",
        "High"
      );

      resources.forEach((resource) => {
        expect(resource).toHaveProperty("relevance");
        expect(resource.relevance).toBeGreaterThan(0);
        expect(resource.relevance).toBeLessThanOrEqual(100);

        if (resource.tags) {
          expect(Array.isArray(resource.tags)).toBe(true);
          expect(resource.tags.length).toBeGreaterThan(0);
        }
      });
    });

    it("includes URLs for all resources", () => {
      const resources = testService.getSecurityResources(
        "integrity",
        "Moderate"
      );

      resources.forEach((resource) => {
        expect(resource).toHaveProperty("url");
        expect(resource.url).toMatch(/^https?:\/\//);
      });
    });
  });

  describe("Helper methods", () => {
    it("capitalizeFirstLetter correctly capitalizes strings", () => {
      // We can't directly test private methods, so we test it through getSecurityResources
      // which uses capitalizeFirstLetter internally
      const resources = testService.getSecurityResources(
        "availability",
        "Moderate"
      );

      // Find a resource with a capitalized component name in the title
      const componentResource = resources.find(
        (r) => r.title && r.title.includes("Availability")
      );

      expect(componentResource).toBeDefined();
    });
  });
});

import { createTestSecurityResourceService } from "../utils/serviceTestUtils";

describe("SecurityResourceService", () => {
  let service: SecurityResourceService;

  beforeEach(() => {
    service = createTestSecurityResourceService();
  });

  describe("getValuePoints", () => {
    it("should return value points for each security level", () => {
      const levels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      levels.forEach((level) => {
        const valuePoints = service.getValuePoints(level);
        expect(Array.isArray(valuePoints)).toBe(true);
        expect(valuePoints.length).toBeGreaterThan(0);
      });
    });

    it("should return appropriate value points for very high security level", () => {
      const valuePoints = service.getValuePoints("Very High");

      // Check that value points match expected content for Very High
      expect(
        valuePoints.some(
          (point) =>
            point.toLowerCase().includes("maximum") ||
            point.toLowerCase().includes("comprehensive")
        )
      ).toBe(true);
    });

    it("should return appropriate value points for low security level", () => {
      const valuePoints = service.getValuePoints("Low");

      // Check that value points match expected content for Low
      expect(
        valuePoints.some(
          (point) =>
            point.toLowerCase().includes("basic") ||
            point.toLowerCase().includes("minimal")
        )
      ).toBe(true);
    });
  });

  describe("getSecurityResources", () => {
    it("should return security resources for availability", () => {
      const resources = service.getSecurityResources(
        "availability",
        "Moderate" as SecurityLevel
      );

      expect(Array.isArray(resources)).toBe(true);
      expect(resources.length).toBeGreaterThan(0);

      resources.forEach((resource) => {
        expect(resource).toHaveProperty("id");
        expect(resource).toHaveProperty("title");
        expect(resource).toHaveProperty("description");
        expect(resource).toHaveProperty("url");
        expect(resource).toHaveProperty("type");
        expect(resource).toHaveProperty("relevance");
        expect(resource).toHaveProperty("tags");
      });
    });

    it("should return security resources for integrity", () => {
      const resources = service.getSecurityResources(
        "integrity",
        "Moderate" as SecurityLevel
      );

      expect(Array.isArray(resources)).toBe(true);
      expect(resources.length).toBeGreaterThan(0);
    });

    it("should return security resources for confidentiality", () => {
      const resources = service.getSecurityResources(
        "confidentiality",
        "Moderate" as SecurityLevel
      );

      expect(Array.isArray(resources)).toBe(true);
      expect(resources.length).toBeGreaterThan(0);
    });

    it("should return different resources for different security levels", () => {
      const lowResources = service.getSecurityResources(
        "availability",
        "Low" as SecurityLevel
      );

      const highResources = service.getSecurityResources(
        "availability",
        "High" as SecurityLevel
      );

      // At least one resource should be different
      const lowTitles = lowResources.map((r) => r.title);
      const highTitles = highResources.map((r) => r.title);

      expect(lowTitles).not.toEqual(highTitles);
    });

    it("should return component-specific resources", () => {
      const availabilityResources = service.getSecurityResources(
        "availability",
        "Moderate" as SecurityLevel
      );

      const integrityResources = service.getSecurityResources(
        "integrity",
        "Moderate" as SecurityLevel
      );

      const confidentialityResources = service.getSecurityResources(
        "confidentiality",
        "Moderate" as SecurityLevel
      );

      // Each component should have at least one unique resource
      const availabilityTitles = availabilityResources.map((r) => r.title);
      const integrityTitles = integrityResources.map((r) => r.title);
      const confidentialityTitles = confidentialityResources.map(
        (r) => r.title
      );

      expect(
        availabilityTitles.some(
          (title) =>
            !integrityTitles.includes(title) &&
            !confidentialityTitles.includes(title)
        )
      ).toBe(true);

      expect(
        integrityTitles.some(
          (title) =>
            !availabilityTitles.includes(title) &&
            !confidentialityTitles.includes(title)
        )
      ).toBe(true);

      expect(
        confidentialityTitles.some(
          (title) =>
            !availabilityTitles.includes(title) &&
            !integrityTitles.includes(title)
        )
      ).toBe(true);
    });

    it("should include component name in resource titles", () => {
      const resources = service.getSecurityResources(
        "availability",
        "High" as SecurityLevel
      );

      // At least one resource should contain the component name in its title
      expect(
        resources.some((r) => r.title.toLowerCase().includes("availability"))
      ).toBe(true);
    });

    it("should include appropriate tags for resources", () => {
      const lowResources = service.getSecurityResources(
        "availability",
        "Low" as SecurityLevel
      );
      const highResources = service.getSecurityResources(
        "availability",
        "High" as SecurityLevel
      );

      // Low level should have tags like "basic" or "minimal"
      expect(
        lowResources.some((r) =>
          r.tags?.some((tag) => tag === "basic" || tag === "minimal")
        )
      ).toBe(true);

      // High level should have tags like "robust" or "sensitive"
      expect(
        highResources.some((r) =>
          r.tags?.some((tag) => tag === "robust" || tag === "sensitive")
        )
      ).toBe(true);
    });

    it("should return a general security guideline for any component and level", () => {
      const noneResources = service.getSecurityResources(
        "availability",
        "None" as SecurityLevel
      );
      const moderateResources = service.getSecurityResources(
        "integrity",
        "Moderate" as SecurityLevel
      );
      const highResources = service.getSecurityResources(
        "confidentiality",
        "High" as SecurityLevel
      );

      // There should be at least one general guideline in each result
      expect(noneResources.some((r) => r.type === "general")).toBe(true);
      expect(moderateResources.some((r) => r.type === "general")).toBe(true);
      expect(highResources.some((r) => r.type === "general")).toBe(true);
    });
  });
});

import { createSecurityResourceService } from "./securityResourceService";

describe("SecurityResourceService", () => {
  let service: SecurityResourceService;

  beforeEach(() => {
    const testDataProvider = createTestDataProvider();
    service = createSecurityResourceService(testDataProvider);
  });

  describe("getValuePoints", () => {
    it("returns value points for each security level", () => {
      const levels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      levels.forEach((level) => {
        const points = service.getValuePoints(level);

        expect(Array.isArray(points)).toBe(true);
        expect(points.length).toBeGreaterThan(0);

        // Each value point should be a meaningful string
        points.forEach((point) => {
          expect(typeof point).toBe("string");
          expect(point.length).toBeGreaterThan(10);
        });
      });
    });

    it("returns appropriate value points for each security level", () => {
      const nonePoints = service.getValuePoints("None");
      const highPoints = service.getValuePoints("High");

      // "None" points should mention risks or lack of security
      const nonePointsHaveRisks = nonePoints.some(
        (point) =>
          point.toLowerCase().includes("risk") ||
          point.toLowerCase().includes("no ") ||
          point.toLowerCase().includes("lack")
      );

      // "High" points should mention benefits or strong security
      const highPointsHaveStrengths = highPoints.some(
        (point) =>
          point.toLowerCase().includes("strong") ||
          point.toLowerCase().includes("robust") ||
          point.toLowerCase().includes("significant")
      );

      expect(nonePointsHaveRisks).toBe(true);
      expect(highPointsHaveStrengths).toBe(true);
    });
  });

  describe("getSecurityResources", () => {
    it("returns resources for each CIA component and security level", () => {
      const components = ["availability", "integrity", "confidentiality"];
      const levels: SecurityLevel[] = [
        "None",
        "Low",
        "Moderate",
        "High",
        "Very High",
      ];

      components.forEach((component) => {
        levels.forEach((level) => {
          // @ts-expect-error - Type needs refinement but works for testing
          const resources = service.getSecurityResources(component, level);

          expect(Array.isArray(resources)).toBe(true);
          expect(resources.length).toBeGreaterThan(0);

          // Verify resources have required properties
          resources.forEach((resource) => {
            expect(resource).toHaveProperty("id");
            expect(resource).toHaveProperty("title");
            expect(resource).toHaveProperty("description");
            expect(resource).toHaveProperty("url");
            expect(resource).toHaveProperty("type");
            expect(resource).toHaveProperty("relevance");

            // Relevance should be 0-100
            expect(resource.relevance).toBeGreaterThanOrEqual(0);
            expect(resource.relevance).toBeLessThanOrEqual(100);

            // URL should be valid
            expect(resource.url).toMatch(/^https?:\/\//);
          });
        });
      });
    });

    it("returns resources specific to the CIA component", () => {
      const availabilityResources = service.getSecurityResources(
        "availability",
        "Moderate"
      );
      const integrityResources = service.getSecurityResources(
        "integrity",
        "Moderate"
      );
      const confidentialityResources = service.getSecurityResources(
        "confidentiality",
        "Moderate"
      );

      // Each component should have some component-specific resources
      const hasAvailabilitySpecific = availabilityResources.some(
        (r) =>
          r.type === "availability" ||
          r.title.toLowerCase().includes("availability") ||
          r.description.toLowerCase().includes("availability")
      );

      const hasIntegritySpecific = integrityResources.some(
        (r) =>
          r.type === "integrity" ||
          r.title.toLowerCase().includes("integrity") ||
          r.description.toLowerCase().includes("integrity")
      );

      const hasConfidentialitySpecific = confidentialityResources.some(
        (r) =>
          r.type === "confidentiality" ||
          r.title.toLowerCase().includes("confidentiality") ||
          r.description.toLowerCase().includes("confidentiality")
      );

      expect(hasAvailabilitySpecific).toBe(true);
      expect(hasIntegritySpecific).toBe(true);
      expect(hasConfidentialitySpecific).toBe(true);
    });

    it("returns resources specific to the security level", () => {
      const lowResources = service.getSecurityResources(
        "confidentiality",
        "Low"
      );
      const highResources = service.getSecurityResources(
        "confidentiality",
        "High"
      );

      // Low level resources should mention basic or minimal controls
      const hasBasicControls = lowResources.some(
        (r) =>
          r.title.toLowerCase().includes("basic") ||
          r.description.toLowerCase().includes("basic") ||
          r.description.toLowerCase().includes("minimal")
      );

      // High level resources should mention robust or sensitive security
      const hasAdvancedControls = highResources.some(
        (r) =>
          r.title.toLowerCase().includes("sensitive") ||
          r.description.toLowerCase().includes("sensitive") ||
          r.description.toLowerCase().includes("strong")
      );

      expect(hasBasicControls).toBe(true);
      expect(hasAdvancedControls).toBe(true);
    });

    it("includes general resources regardless of component", () => {
      const availabilityResources = service.getSecurityResources(
        "availability",
        "Moderate"
      );
      const integrityResources = service.getSecurityResources(
        "integrity",
        "Moderate"
      );
      const confidentialityResources = service.getSecurityResources(
        "confidentiality",
        "Moderate"
      );

      // Each component should have some general resources
      const availabilityHasGeneral = availabilityResources.some(
        (r) => r.type === "general"
      );
      const integrityHasGeneral = integrityResources.some(
        (r) => r.type === "general"
      );
      const confidentialityHasGeneral = confidentialityResources.some(
        (r) => r.type === "general"
      );

      expect(availabilityHasGeneral).toBe(true);
      expect(integrityHasGeneral).toBe(true);
      expect(confidentialityHasGeneral).toBe(true);
    });
  });

  describe("createSecurityResourceService function", () => {
    it("creates a service instance with provided data provider", () => {
      const dataProvider = createTestDataProvider();
      const service = createSecurityResourceService(dataProvider);

      expect(service).toBeInstanceOf(SecurityResourceService);
    });

    it("creates a service instance without data provider", () => {
      const service = createSecurityResourceService();

      expect(service).toBeInstanceOf(SecurityResourceService);
    });
  });
});

// Create regular variables instead of hoisted exports
const mockSecurityResources = [
  {
    id: "resource-1",
    title: "NIST Cybersecurity Framework",
    description: "Guidelines for improving cybersecurity",
    url: "https://www.nist.gov/cyberframework",
    type: "general",
    relevance: 90,
  },
  {
    id: "resource-2",
    title: "OWASP Top 10",
    description: "Top 10 web application security risks",
    url: "https://owasp.org/www-project-top-ten/",
    type: "integrity",
    relevance: 85,
  },
  {
    id: "resource-3",
    title: "GDPR Documentation",
    description: "Guidelines for GDPR compliance",
    url: "https://gdpr.eu/",
    type: "confidentiality",
    relevance: 80,
  },
  {
    id: "resource-4",
    title: "Site Reliability Engineering Book",
    description: "Google's approach to service management",
    url: "https://sre.google/sre-book/table-of-contents/",
    type: "availability",
    relevance: 75,
  },
];

const mockValuePoints = {
  None: ["No value points"],
  Low: ["Basic value point 1", "Basic value point 2"],
  Moderate: ["Moderate value point 1", "Moderate value point 2"],
  High: ["High value point 1", "High value point 2"],
  "Very High": ["Very high value point 1", "Very high value point 2"],
};

vi.mock("../data/securityResources", () => ({
  __esModule: true,
  default: mockSecurityResources,
  getResourcesByType: vi
    .fn()
    .mockImplementation((type) =>
      mockSecurityResources.filter((r) => r.type === type)
    ),
}));

// ... existing code ...
