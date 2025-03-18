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
      businessImpact: "Critical impact",  // Add missing properties
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
      recommendations: []
    },
    Low: { 
      description: "Low availability", 
      technical: "Basic controls",
      businessImpact: "High impact", 
      capex: 1000,
      opex: 500,
      bg: "#f8d7da",
      text: "#721c24",
      recommendations: ["Implement basic redundancy"]
    },
    Moderate: { 
      description: "Medium availability", 
      technical: "Standard controls",
      businessImpact: "Medium impact", 
      capex: 2000,
      opex: 1000,
      bg: "#fff3cd",
      text: "#856404",
      recommendations: ["Implement load balancing"]
    },
    High: { 
      description: "High availability", 
      technical: "Advanced controls",
      businessImpact: "Low impact", 
      capex: 4000,
      opex: 1500,
      bg: "#d4edda",
      text: "#155724",
      recommendations: ["Implement geographic redundancy"]
    },
    "Very High": { 
      description: "Maximum availability", 
      technical: "Maximum controls",
      businessImpact: "Minimal impact", 
      capex: 8000,
      opex: 2500,
      bg: "#cce5ff",
      text: "#004085",
      recommendations: ["Implement multi-region failover"]
    }
  },
  integrityOptions: {
    None: { description: "No integrity", technical: "No controls" },
    Low: { description: "Low integrity", technical: "Basic controls" },
    Moderate: { description: "Medium integrity", technical: "Standard controls" },
    High: { description: "High integrity", technical: "Advanced controls" },
    "Very High": { description: "Maximum integrity", technical: "Maximum controls" }
  },
  confidentialityOptions: {
    None: { description: "No confidentiality", technical: "No controls" },
    Low: { description: "Low confidentiality", technical: "Basic controls" },
    Moderate: { description: "Medium confidentiality", technical: "Standard controls" },
    High: { description: "High confidentiality", technical: "Advanced controls" },
    "Very High": { description: "Maximum confidentiality", technical: "Maximum controls" }
  },
  // Add a custom implementation for testing
  getDefaultValuePoints: (level: SecurityLevel) => {
    if (level === "High") {
      return [
        "Custom high value point 1",
        "Custom high value point 2",
        "Custom high value point 3"
      ];
    }
    return [];
  }
}));

describe("SecurityResourceService", () => {
  const dataProvider = createTestDataProvider();
  const resourceService = new SecurityResourceService(dataProvider);

  it("should return a non-empty array of security resources for a given component and level", () => {
    const resources = resourceService.getSecurityResources("availability", "High");
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
        VERY_HIGH: { returnRate: "500%", description: "Very High ROI" }
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
          recommendations: []
        },
        Low: { 
          description: "Low availability", 
          technical: "Basic controls",
          businessImpact: "High impact", 
          capex: 1000,
          opex: 500,
          bg: "#f8d7da",
          text: "#721c24",
          recommendations: ["Implement basic redundancy"]
        },
        Moderate: { 
          description: "Medium availability", 
          technical: "Standard controls",
          businessImpact: "Medium impact", 
          capex: 2000,
          opex: 1000,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Implement load balancing"]
        },
        High: { 
          description: "High availability", 
          technical: "Advanced controls",
          businessImpact: "Low impact", 
          capex: 4000,
          opex: 1500,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement geographic redundancy"]
        },
        "Very High": { 
          description: "Maximum availability", 
          technical: "Maximum controls",
          businessImpact: "Minimal impact", 
          capex: 8000,
          opex: 2500,
          bg: "#cce5ff",
          text: "#004085",
          recommendations: ["Implement multi-region failover"]
        }
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
          recommendations: []
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
          recommendations: ["Implement basic validation"]
        },
        Moderate: { 
          description: "Medium integrity", 
          technical: "Standard controls", 
          businessImpact: "Medium impact",
          capex: 2000,
          opex: 1000,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Implement checksums"]
        },
        High: { 
          description: "High integrity", 
          technical: "Advanced controls", 
          businessImpact: "Low impact",
          capex: 4000,
          opex: 1500,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement digital signatures"]
        },
        "Very High": { 
          description: "Maximum integrity", 
          technical: "Maximum controls", 
          businessImpact: "Minimal impact",
          capex: 8000,
          opex: 2500,
          bg: "#cce5ff",
          text: "#004085",
          recommendations: ["Implement blockchain verification"]
        }
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
          recommendations: []
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
          recommendations: ["Implement basic access control"]
        },
        Moderate: { 
          description: "Medium confidentiality", 
          technical: "Standard controls", 
          businessImpact: "Medium impact",
          capex: 2000,
          opex: 1000,
          bg: "#fff3cd",
          text: "#856404",
          recommendations: ["Implement encryption"] 
        },
        High: { 
          description: "High confidentiality", 
          technical: "Advanced controls", 
          businessImpact: "Low impact",
          capex: 4000,
          opex: 1500,
          bg: "#d4edda",
          text: "#155724",
          recommendations: ["Implement end-to-end encryption"]
        },
        "Very High": { 
          description: "Maximum confidentiality", 
          technical: "Maximum controls", 
          businessImpact: "Minimal impact",
          capex: 8000,
          opex: 2500,
          bg: "#cce5ff",
          text: "#004085",
          recommendations: ["Implement zero trust architecture"]
        }
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
      const availResources = testService.getSecurityResources("availability", "Moderate");
      const intResources = testService.getSecurityResources("integrity", "Moderate");
      const confResources = testService.getSecurityResources("confidentiality", "Moderate");
      
      expect(availResources.length).toBeGreaterThan(0);
      expect(intResources.length).toBeGreaterThan(0);
      expect(confResources.length).toBeGreaterThan(0);
    });

    it("returns more specific resources for higher security levels", () => {
      const lowResources = testService.getSecurityResources("availability", "Low");
      const highResources = testService.getSecurityResources("availability", "High");
      const veryHighResources = testService.getSecurityResources("availability", "Very High");
      
      // All levels should include at least the general resources
      expect(lowResources.length).toBeGreaterThan(0);
      expect(highResources.length).toBeGreaterThan(0);
      expect(veryHighResources.length).toBeGreaterThan(0);
      
      // Check specific details of resources
      const lowLevelResource = lowResources.find(r => r.id === "availability-low");
      const highLevelResource = highResources.find(r => r.id === "availability-high");
      const veryHighLevelResource = veryHighResources.find(r => r.id === "availability-very-high");
      
      expect(lowLevelResource).toBeDefined();
      expect(lowLevelResource?.title).toContain("Basic");
      expect(highLevelResource).toBeDefined();
      expect(highLevelResource?.title).toContain("Protection");
      expect(veryHighLevelResource).toBeDefined();
      expect(veryHighLevelResource?.title).toContain("Critical");
    });
    
    it("includes component-specific resources", () => {
      const availResources = testService.getSecurityResources("availability", "Moderate");
      const intResources = testService.getSecurityResources("integrity", "Moderate");
      const confResources = testService.getSecurityResources("confidentiality", "Moderate");
      
      const availSpecificResource = availResources.find(r => r.id === "availability-resources");
      const intSpecificResource = intResources.find(r => r.id === "integrity-resources");
      const confSpecificResource = confResources.find(r => r.id === "confidentiality-resources");
      
      expect(availSpecificResource).toBeDefined();
      expect(availSpecificResource?.title).toContain("Availability");
      expect(intSpecificResource).toBeDefined();
      expect(intSpecificResource?.title).toContain("Integrity");
      expect(confSpecificResource).toBeDefined();
      expect(confSpecificResource?.title).toContain("Protection");
    });
    
    it("includes relevance scores and tags for resources", () => {
      const resources = testService.getSecurityResources("availability", "High");
      
      resources.forEach(resource => {
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
      const resources = testService.getSecurityResources("integrity", "Moderate");
      
      resources.forEach(resource => {
        expect(resource).toHaveProperty("url");
        expect(resource.url).toMatch(/^https?:\/\//);
      });
    });
  });

  describe("Helper methods", () => {
    it("capitalizeFirstLetter correctly capitalizes strings", () => {
      // We can't directly test private methods, so we test it through getSecurityResources
      // which uses capitalizeFirstLetter internally
      const resources = testService.getSecurityResources("availability", "Moderate");
      
      // Find a resource with a capitalized component name in the title
      const componentResource = resources.find(r => 
        r.title && r.title.includes("Availability")
      );
      
      expect(componentResource).toBeDefined();
    });
  });
});
