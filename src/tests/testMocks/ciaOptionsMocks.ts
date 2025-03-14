import { vi } from "vitest";

/**
 * Creates standardized CIA options mock that works with vi.mock hoisting
 * Set to match the expected values in tests
 */
export function createCIAOptionsMock(customization = {}) {
  const baseMockOptions = {
    availabilityOptions: {
      None: {
        description: "Test availability None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
      },
      // ...similar for other levels
    },
    integrityOptions: {
      None: {
        description: "Test integrity None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
      },
      // ...similar for other levels
    },
    confidentialityOptions: {
      None: {
        description: "Test confidentiality None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
      },
      // ...similar for other levels
    },
    ROI_ESTIMATES: {
      NONE: {
        returnRate: "0%",
        description: "No ROI",
      },
      LOW: {
        returnRate: "50%",
        description: "Low ROI",
      },
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good value",
      },
      HIGH: {
        returnRate: "350%",
        description: "High ROI",
      },
      VERY_HIGH: {
        returnRate: "500%",
        description: "Very high ROI",
      },
    },
  };

  // Apply any customizations
  const mockOptions = { ...baseMockOptions, ...customization };

  return {
    __esModule: true,
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
    useCIAOptions: vi.fn().mockReturnValue(mockOptions),
    default: mockOptions,
  };
}

/**
 * Creates standardized Chart.js mock that works with vi.mock hoisting
 */
export function createChartJsMock() {
  const mockInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  };

  return {
    __esModule: true,
    default: vi.fn().mockReturnValue(mockInstance),
  };
}
