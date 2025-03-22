import { describe, expect, it, vi } from "vitest";
import { TEST_SECURITY_LEVELS } from "../test";
import { createMockDataProvider } from "../tests/testMocks/mockTypes";
import { SecurityLevel } from "../types/cia";
import { CIAComponentType } from "../types/cia-services";
import { BaseService } from "./BaseService";

// Define a concrete implementation for testing
class TestBaseService extends BaseService {
  // Expose protected methods for testing
  public testGetComponentDetails(
    component: CIAComponentType,
    level: SecurityLevel
  ) {
    return this.getComponentDetails(component, level);
  }

  public testGetCIAOptions(component: CIAComponentType) {
    return this.getCIAOptions(component);
  }

  public testGetRiskLevelFromSecurityLevel(level: SecurityLevel) {
    return this.getRiskLevelFromSecurityLevel(level);
  }

  public testGetSecurityLevelValue(level: SecurityLevel) {
    return this.getSecurityLevelValue(level);
  }

  public testCapitalizeFirstLetter(str: string) {
    return this.capitalizeFirstLetter(str);
  }

  public testGetDefaultSecurityIcon(level: SecurityLevel) {
    return this.getDefaultSecurityIcon(level);
  }

  public testGetValuePoints(level: SecurityLevel) {
    return this.getValuePoints(level);
  }
}

describe("BaseService", () => {
  let baseService: TestBaseService;
  let mockDataProvider: ReturnType<typeof createMockDataProvider>;

  beforeEach(() => {
    mockDataProvider = createMockDataProvider();

    // Set up spies on the mockDataProvider methods
    vi.spyOn(mockDataProvider, "getDefaultSecurityIcon");
    vi.spyOn(mockDataProvider, "getDefaultValuePoints");

    baseService = new TestBaseService(mockDataProvider);
  });

  describe("getComponentDetails", () => {
    it("returns component details for valid component and level", () => {
      const result = baseService.testGetComponentDetails(
        "availability",
        "Moderate"
      );
      expect(result).toBeDefined();
    });

    it("handles errors when getting component details", () => {
      // Mock to throw an error
      vi.spyOn(baseService, "testGetCIAOptions").mockImplementation(() => {
        throw new Error("Test error");
      });

      // Mock the getCIAOptions method to throw an error
      const getCIAOptionsSpy = vi.spyOn(baseService as any, "getCIAOptions");
      getCIAOptionsSpy.mockImplementation(() => {
        throw new Error("Test error");
      });

      const result = baseService.testGetComponentDetails(
        "availability",
        "Moderate"
      );
      expect(result).toBeUndefined();
    });
  });

  describe("getCIAOptions", () => {
    it("returns availability options for availability component", () => {
      const options = baseService.testGetCIAOptions("availability");
      expect(options).toBe(mockDataProvider.availabilityOptions);
    });

    it("returns integrity options for integrity component", () => {
      const options = baseService.testGetCIAOptions("integrity");
      expect(options).toBe(mockDataProvider.integrityOptions);
    });

    it("returns confidentiality options for confidentiality component", () => {
      const options = baseService.testGetCIAOptions("confidentiality");
      expect(options).toBe(mockDataProvider.confidentialityOptions);
    });

    it("returns empty object for invalid component", () => {
      const options = baseService.testGetCIAOptions(
        "invalid" as CIAComponentType
      );
      expect(options).toEqual({});
    });
  });

  describe("getRiskLevelFromSecurityLevel", () => {
    TEST_SECURITY_LEVELS.forEach((level) => {
      it(`returns risk level for ${level}`, () => {
        const risk = baseService.testGetRiskLevelFromSecurityLevel(level);
        expect(typeof risk).toBe("string");
        expect(risk.length).toBeGreaterThan(0);
      });
    });
  });

  describe("getSecurityLevelValue", () => {
    it("returns 0 for None", () => {
      expect(baseService.testGetSecurityLevelValue("None")).toBe(0);
    });

    it("returns 1 for Low", () => {
      expect(baseService.testGetSecurityLevelValue("Low")).toBe(1);
    });

    it("returns 2 for Moderate", () => {
      expect(baseService.testGetSecurityLevelValue("Moderate")).toBe(2);
    });

    it("returns 3 for High", () => {
      expect(baseService.testGetSecurityLevelValue("High")).toBe(3);
    });

    it("returns 4 for Very High", () => {
      expect(baseService.testGetSecurityLevelValue("Very High")).toBe(4);
    });
  });

  describe("capitalizeFirstLetter", () => {
    it("capitalizes first letter of a string", () => {
      expect(baseService.testCapitalizeFirstLetter("test")).toBe("Test");
    });

    it("keeps already capitalized strings unchanged", () => {
      expect(baseService.testCapitalizeFirstLetter("Test")).toBe("Test");
    });

    it("works with empty strings", () => {
      expect(baseService.testCapitalizeFirstLetter("")).toBe("");
    });
  });

  describe("getDefaultSecurityIcon", () => {
    TEST_SECURITY_LEVELS.forEach((level) => {
      it(`gets security icon for ${level}`, () => {
        // First test with provider's function
        const icon = baseService.testGetDefaultSecurityIcon(level);
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
        expect(mockDataProvider.getDefaultSecurityIcon).toHaveBeenCalledWith(
          level
        );
      });
    });

    it("provides fallback icons when provider function is not available", () => {
      // Create provider without the function
      const incompleteProvider = {
        ...mockDataProvider,
        getDefaultSecurityIcon: undefined,
      };

      const incompleteService = new TestBaseService(incompleteProvider);

      TEST_SECURITY_LEVELS.forEach((level) => {
        const icon = incompleteService.testGetDefaultSecurityIcon(level);
        expect(typeof icon).toBe("string");
        expect(icon.length).toBeGreaterThan(0);
      });

      // Also test with unknown level
      const unknownIcon = incompleteService.testGetDefaultSecurityIcon(
        "Unknown" as SecurityLevel
      );
      expect(unknownIcon).toBe("❓");
    });
  });

  describe("getValuePoints", () => {
    TEST_SECURITY_LEVELS.forEach((level) => {
      it(`gets value points for ${level}`, () => {
        const points = baseService.testGetValuePoints(level);
        expect(Array.isArray(points)).toBe(true);
        expect(mockDataProvider.getDefaultValuePoints).toHaveBeenCalledWith(
          level
        );
      });
    });

    it("handles errors when getting value points from provider", () => {
      // Mock to throw error
      vi.spyOn(
        mockDataProvider,
        "getDefaultValuePoints"
      ).mockImplementationOnce(() => {
        throw new Error("Test error");
      });

      const points = baseService.testGetValuePoints("High");
      expect(Array.isArray(points)).toBe(true);
    });

    it("provides default value points when provider function throws or returns empty", () => {
      // Mock to return empty array
      vi.spyOn(mockDataProvider, "getDefaultValuePoints").mockReturnValueOnce(
        []
      );

      const points = baseService.testGetValuePoints("High");
      expect(Array.isArray(points)).toBe(true);
      expect(points.length).toBeGreaterThan(0);
    });
  });
});
