import { beforeEach, describe, expect, it } from "vitest";
import {
  createMockDataProvider,
  TEST_SECURITY_LEVELS,
} from "../tests/testMocks/mockTypes";
import { CIAComponentType } from "../types/cia-services";
import {
  BusinessImpactService,
  createBusinessImpactService,
} from "./businessImpactService";

// Test data provider setup
const createTestDataProvider = () => {
  const baseProvider = createMockDataProvider();

  // Convert businessImpact from object to string to match interface
  return {
    ...baseProvider,
    availabilityOptions: {
      ...baseProvider.availabilityOptions,
      Moderate: {
        ...baseProvider.availabilityOptions.Moderate,
        businessImpact: "Moderate business impact",
        businessImpactDetails: {
          summary: "Test summary",
          financial: { description: "Financial impact", riskLevel: "Medium" },
          operational: {
            description: "Operational impact",
            riskLevel: "Medium",
          },
          reputational: {
            description: "Reputational impact",
            riskLevel: "Medium",
          },
          regulatory: { description: "Regulatory impact", riskLevel: "Medium" },
        },
      },
    },
  };
};

describe("BusinessImpactService", () => {
  let service: BusinessImpactService;
  let dataProvider: ReturnType<typeof createTestDataProvider>;

  beforeEach(() => {
    dataProvider = createTestDataProvider();
    service = new BusinessImpactService(dataProvider);
  });

  describe("getBusinessImpact", () => {
    const componentsToTest: CIAComponentType[] = [
      "availability",
      "integrity",
      "confidentiality",
    ];

    componentsToTest.forEach((component) => {
      TEST_SECURITY_LEVELS.forEach((level) => {
        it(`returns business impact for ${component} at ${level} level`, () => {
          const impact = service.getBusinessImpact(component, level);

          // Basic validation
          expect(impact).toBeDefined();
          expect(impact).toHaveProperty("summary");
          expect(impact).toHaveProperty("financial");
          expect(impact).toHaveProperty("operational");
          expect(impact).toHaveProperty("reputational");

          // Check structure of impact categories
          expect(impact.financial).toHaveProperty("description");
          expect(impact.financial).toHaveProperty("riskLevel");
          expect(impact.operational).toHaveProperty("description");
          expect(impact.operational).toHaveProperty("riskLevel");
          expect(impact.reputational).toHaveProperty("description");
          expect(impact.reputational).toHaveProperty("riskLevel");
        });
      });
    });

    it("defaults to Moderate level when no level provided", () => {
      const impact = service.getBusinessImpact("availability");
      expect(impact).toBeDefined();
      expect(impact).toHaveProperty("summary");
    });
  });

  describe("getCategoryIcon", () => {
    it("returns financial icon for financial category", () => {
      expect(service.getCategoryIcon("financial")).toBe("💰");
    });

    it("returns operational icon for operational category", () => {
      expect(service.getCategoryIcon("operational")).toBe("⚙️");
    });

    it("returns reputational icon for reputational category", () => {
      expect(service.getCategoryIcon("reputational")).toBe("🏆");
    });

    it("returns strategic icon for strategic category", () => {
      expect(service.getCategoryIcon("strategic")).toBe("🎯");
    });

    it("returns regulatory icon for regulatory category", () => {
      expect(service.getCategoryIcon("regulatory")).toBe("📜");
    });

    it("returns summary icon for summary category", () => {
      expect(service.getCategoryIcon("summary")).toBe("📊");
    });

    it("returns question mark for unknown category", () => {
      expect(service.getCategoryIcon("unknown")).toBe("❓");
    });
  });

  describe("getBusinessImpactDescription", () => {
    const componentsToTest: CIAComponentType[] = [
      "availability",
      "integrity",
      "confidentiality",
    ];

    componentsToTest.forEach((component) => {
      TEST_SECURITY_LEVELS.forEach((level) => {
        it(`returns business impact description for ${component} at ${level} level`, () => {
          const description = service.getBusinessImpactDescription(
            component,
            level
          );

          expect(typeof description).toBe("string");
          expect(description.length).toBeGreaterThan(0);
        });
      });
    });
  });

  describe("getDetailedDescription", () => {
    it("formats detailed description with category and icon", () => {
      const detail = {
        description: "Test description",
        riskLevel: "Medium",
      };

      const description = service.getDetailedDescription("financial", detail);

      expect(typeof description).toBe("string");
      expect(description.length).toBeGreaterThan(0);
      expect(description).toContain("Test description");
    });

    it("handles missing detail", () => {
      const description = service.getDetailedDescription("financial");

      expect(typeof description).toBe("string");
      expect(description.length).toBeGreaterThan(0);
    });
  });

  describe("calculateBusinessImpactLevel", () => {
    it("calculates impact level from all three security levels", () => {
      const level = service.calculateBusinessImpactLevel(
        "High",
        "Moderate",
        "Low"
      );

      expect(typeof level).toBe("string");
      expect(level.length).toBeGreaterThan(0);
    });

    it("uses availability level for all components when others not provided", () => {
      const level = service.calculateBusinessImpactLevel("High");

      expect(typeof level).toBe("string");
      expect(level.length).toBeGreaterThan(0);
    });
  });

  describe("Factory function", () => {
    it("creates a service instance with the provided data provider", () => {
      const customProvider = createTestDataProvider();
      const serviceInstance = createBusinessImpactService(customProvider);

      expect(serviceInstance).toBeInstanceOf(BusinessImpactService);
    });
  });
});
