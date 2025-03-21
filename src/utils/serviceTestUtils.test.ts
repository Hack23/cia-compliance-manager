import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../types/cia";
import { CIADetails } from "../types/cia-services";
import {
  createMockDataProvider,
  createTestBusinessImpactService,
  createTestCIAContentService,
  createTestComplianceService,
  createTestSecurityMetricsService,
  createTestSecurityResourceService,
  createTestServiceDataProvider,
  createTestTechnicalImplementationService,
  mockCIAOptionsHook,
} from "./serviceTestUtils";

describe("serviceTestUtils", () => {
  describe("createMockDataProvider", () => {
    it("creates a data provider with default data", () => {
      const dataProvider = createMockDataProvider();

      expect(dataProvider).toHaveProperty("availabilityOptions");
      expect(dataProvider).toHaveProperty("integrityOptions");
      expect(dataProvider).toHaveProperty("confidentialityOptions");
      expect(dataProvider).toHaveProperty("roiEstimates");
    });

    it("allows overriding default data", () => {
      // Create a properly structured CIADetails object
      const customDetails: CIADetails = {
        description: "Custom description",
        technical: "Custom technical details",
        businessImpact: "Custom business impact",
        capex: 100,
        opex: 50,
        bg: "#ffffff",
        text: "#000000",
        recommendations: ["Custom recommendation"],
      };

      // Create a complete record with all security levels
      const availabilityOptions: Record<SecurityLevel, CIADetails> = {
        None: customDetails,
        Low: customDetails,
        Moderate: customDetails,
        High: customDetails,
        "Very High": customDetails,
      };

      const overrides = {
        availabilityOptions,
      };

      const dataProvider = createMockDataProvider(overrides);

      expect(dataProvider.availabilityOptions.None).toHaveProperty(
        "description",
        "Custom description"
      );
    });
  });

  describe("createTestServiceDataProvider", () => {
    it("creates a test data provider", () => {
      const dataProvider = createTestServiceDataProvider();

      expect(dataProvider).toHaveProperty("availabilityOptions");
      expect(dataProvider).toHaveProperty("integrityOptions");
      expect(dataProvider).toHaveProperty("confidentialityOptions");
      expect(dataProvider).toHaveProperty("roiEstimates");
    });
  });

  describe("service creation utilities", () => {
    it("creates test service instances", () => {
      const businessImpactService = createTestBusinessImpactService();
      const complianceService = createTestComplianceService();
      const securityMetricsService = createTestSecurityMetricsService();
      const securityResourceService = createTestSecurityResourceService();
      const technicalImplementationService =
        createTestTechnicalImplementationService();
      const ciaContentService = createTestCIAContentService();

      // Verify services are created successfully
      expect(businessImpactService).toBeDefined();
      expect(complianceService).toBeDefined();
      expect(securityMetricsService).toBeDefined();
      expect(securityResourceService).toBeDefined();
      expect(technicalImplementationService).toBeDefined();
      expect(ciaContentService).toBeDefined();

      // Verify service methods are available
      expect(typeof businessImpactService.getBusinessImpact).toBe("function");
      expect(typeof complianceService.getComplianceStatus).toBe("function");
      expect(typeof securityMetricsService.getSecurityMetrics).toBe("function");
      expect(typeof securityResourceService.getValuePoints).toBe("function");
      expect(
        typeof technicalImplementationService.getTechnicalImplementation
      ).toBe("function");
      expect(typeof ciaContentService.getComponentDetails).toBe("function");
    });

    it("creates services with custom data providers", () => {
      // Create a properly structured CIADetails object for our test
      const customMetrics: CIADetails = {
        description: "Custom metrics",
        technical: "Custom technical metrics",
        businessImpact: "Custom business impact metrics",
        capex: 200,
        opex: 100,
        bg: "#f0f0f0",
        text: "#333333",
        recommendations: ["Custom metrics recommendation"],
      };

      // Create a complete record with all security levels
      const availabilityOptions: Record<SecurityLevel, CIADetails> = {
        None: customMetrics,
        Low: customMetrics,
        Moderate: customMetrics,
        High: customMetrics,
        "Very High": customMetrics,
      };

      // Create a service with the custom data provider
      const securityMetricsService = createTestSecurityMetricsService({
        availabilityOptions,
      });

      expect(securityMetricsService).toBeDefined();
    });
  });

  describe("mockCIAOptionsHook", () => {
    it("creates a mock for useCIAOptions hook", () => {
      const mock = mockCIAOptionsHook();

      expect(mock).toBeDefined();
    });
  });
});
