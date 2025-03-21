/**
 * Service test utilities to simplify testing of service components
 *
 * ## Testing Perspective
 *
 * These utilities provide consistent mock services and test data for unit testing,
 * reducing test preparation code and ensuring consistent test conditions across
 * the application. 🧪
 */

import { vi } from "vitest";
import { createTestDataProvider } from "../data/testDataProvider";
import { BusinessImpactService } from "../services/businessImpactService";
import { CIAContentService } from "../services/ciaContentService";
import { ComplianceService } from "../services/complianceService";
import { SecurityMetricsService } from "../services/securityMetricsService";
import { SecurityResourceService } from "../services/securityResourceService";
import { TechnicalImplementationService } from "../services/technicalImplementationService";
import { SecurityLevel } from "../types/cia";
import { CIADataProvider } from "../types/cia-services";

// Default test security levels - not exported as a hoisted variable
const defaultSecurityLevels: Record<string, SecurityLevel> = {
  availabilityLevel: "Moderate" as SecurityLevel,
  integrityLevel: "Moderate" as SecurityLevel,
  confidentialityLevel: "Moderate" as SecurityLevel,
};

/**
 * Create a mock security level options for testing (not using hoisted)
 */
const createMockCIAOptions = () => ({
  None: {
    capex: 0,
    opex: 0,
    description: "No security controls implemented",
    technical: "No controls",
    businessImpact: "Critical",
  },
  Low: {
    capex: 5,
    opex: 2,
    description: "Basic security controls",
    technical: "Basic controls",
    businessImpact: "High",
  },
  Moderate: {
    capex: 10,
    opex: 5,
    description: "Standard security controls",
    technical: "Standard controls",
    businessImpact: "Medium",
  },
  High: {
    capex: 15,
    opex: 8,
    description: "Advanced security controls",
    technical: "Advanced controls",
    businessImpact: "Low",
  },
  "Very High": {
    capex: 20,
    opex: 10,
    description: "Maximum security controls",
    technical: "Maximum controls",
    businessImpact: "Minimal",
  },
});

/**
 * Create a mock data provider with specific overrides
 *
 * @param overrides - Properties to override in the test data provider
 * @returns Test data provider with overrides
 */
export function createMockDataProvider(
  overrides: Partial<CIADataProvider> = {}
): CIADataProvider {
  return {
    ...createTestDataProvider(),
    ...overrides,
  };
}

/**
 * Create a test instance of SecurityMetricsService
 *
 * @param overrides - Optional data provider overrides
 * @returns Test SecurityMetricsService instance
 */
export function createTestSecurityMetricsService(
  overrides: Partial<CIADataProvider> = {}
): SecurityMetricsService {
  const dataProvider = createMockDataProvider(overrides);
  return new SecurityMetricsService(dataProvider);
}

/**
 * Create a test instance of BusinessImpactService
 *
 * @param overrides - Optional data provider overrides
 * @returns Test BusinessImpactService instance
 */
export function createTestBusinessImpactService(
  overrides: Partial<CIADataProvider> = {}
): BusinessImpactService {
  const dataProvider = createMockDataProvider(overrides);
  return new BusinessImpactService(dataProvider);
}

/**
 * Create a test instance of SecurityResourceService
 *
 * @param overrides - Optional data provider overrides
 * @returns Test SecurityResourceService instance
 */
export function createTestSecurityResourceService(
  overrides: Partial<CIADataProvider> = {}
): SecurityResourceService {
  const dataProvider = createMockDataProvider(overrides);
  return new SecurityResourceService(dataProvider);
}

/**
 * Create a test instance of TechnicalImplementationService
 *
 * @param overrides - Optional data provider overrides
 * @returns Test TechnicalImplementationService instance
 */
export function createTestTechnicalImplementationService(
  overrides: Partial<CIADataProvider> = {}
): TechnicalImplementationService {
  const dataProvider = createMockDataProvider(overrides);
  return new TechnicalImplementationService(dataProvider);
}

/**
 * Create a test instance of ComplianceService
 *
 * @param overrides - Optional data provider overrides
 * @returns Test ComplianceService instance
 */
export function createTestComplianceService(
  overrides: Partial<CIADataProvider> = {}
): ComplianceService {
  const dataProvider = createMockDataProvider(overrides);
  return new ComplianceService(dataProvider);
}

/**
 * Standard mock for CIA security levels
 */
export const mockSecurityLevels = {
  availabilityLevel: "Moderate" as SecurityLevel,
  integrityLevel: "Moderate" as SecurityLevel,
  confidentialityLevel: "Moderate" as SecurityLevel,
};

/**
 * Create hoisted Vitest mock for security level options
 */
export const mockCIAOptions = vi.hoisted(() => ({
  None: {
    capex: 0,
    opex: 0,
    description: "No security controls implemented",
  },
  Low: {
    capex: 5,
    opex: 2,
    description: "Basic security controls",
  },
  Moderate: {
    capex: 10,
    opex: 5,
    description: "Standard security controls",
  },
  High: {
    capex: 15,
    opex: 8,
    description: "Advanced security controls",
  },
  "Very High": {
    capex: 20,
    opex: 10,
    description: "Maximum security controls",
  },
}));

/**
 * Mock service response for common CIA options
 */
export function mockCIAOptionsHook() {
  return vi.mock("../hooks/useCIAOptions", () => ({
    __esModule: true,
    useCIAOptions: () => ({
      availabilityOptions: mockCIAOptions,
      integrityOptions: mockCIAOptions,
      confidentialityOptions: mockCIAOptions,
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%", description: "No ROI" },
        LOW: { returnRate: "50%", description: "Low ROI" },
        MODERATE: { returnRate: "200%", description: "Moderate ROI" },
        HIGH: { returnRate: "350%", description: "High ROI" },
        VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
      },
    }),
    // Export constants directly as well
    availabilityOptions: mockCIAOptions,
    integrityOptions: mockCIAOptions,
    confidentialityOptions: mockCIAOptions,
  }));
}

/**
 * Create a test data provider for service testing
 * @returns CIADataProvider instance with test data
 */
export function createTestServiceDataProvider(): CIADataProvider {
  return createTestDataProvider();
}

/**
 * Create a CIA content service for testing
 * @param customDataProvider Optional custom data provider
 * @returns CIAContentService instance
 */
export function createTestCIAContentService(
  customDataProvider?: CIADataProvider
): CIAContentService {
  const dataProvider = customDataProvider || createTestServiceDataProvider();
  return new CIAContentService(dataProvider);
}
