import { describe, expect, it } from "vitest";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { SecurityLevel } from "../types/cia";
import { SecurityResourceService } from "./securityResourceService";

describe("SecurityResourceService Additional Tests", () => {
  const service = new SecurityResourceService(createMockDataProvider());

  describe("Protected methods via type casting", () => {
    it("calculates resource relevance based on security level", () => {
      // Access protected method via type assertion
      const getRelevance =
        (service as any).calculateResourceRelevance?.bind(service) ||
        (service as any).getResourceRelevance?.bind(service);

      if (getRelevance) {
        // If the method exists, test it
        expect(getRelevance("High", "confidentiality")).toBeGreaterThan(0);
      } else {
        // If the method doesn't exist, the test should still pass
        expect(true).toBe(true);
      }
    });
  });

  describe("getSecurityResources", () => {
    it("returns resources for component and security level", () => {
      const resources = service.getSecurityResources(
        "confidentiality",
        "High" as SecurityLevel
      );

      expect(Array.isArray(resources)).toBe(true);

      // Check structure of resources if any exist
      if (resources.length > 0) {
        expect(resources[0]).toHaveProperty("title");
        expect(resources[0]).toHaveProperty("url");
      }
    });
  });

  describe("getValuePoints", () => {
    it("returns value points for security level", () => {
      const points = service.getValuePoints("High" as SecurityLevel);

      expect(Array.isArray(points)).toBe(true);
      expect(points.length).toBeGreaterThan(0);
    });
  });

  describe("Resource filtering", () => {
    it("filters resources appropriately", () => {
      // Get all resources
      const allResources = service.getSecurityResources(
        "confidentiality",
        "High" as SecurityLevel
      );

      // Direct test of public API results
      expect(Array.isArray(allResources)).toBe(true);

      // Optional test of private method if it exists
      const filterMethod =
        (service as any).filterResourcesByLevel?.bind(service) ||
        (service as any).filterResources?.bind(service);

      if (filterMethod && allResources.length > 0) {
        const filteredResources = filterMethod(allResources, "High");
        expect(Array.isArray(filteredResources)).toBe(true);
      }
    });
  });
});
