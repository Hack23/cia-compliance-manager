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
      Low: {
        description: "Test availability Low",
        technical: "Test technical Low",
        businessImpact: "Test business impact Low",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 5,
        opex: 2,
      },
      Moderate: {
        description: "Test availability Moderate",
        technical: "Test technical Moderate",
        businessImpact: "Test business impact Moderate",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 10,
        opex: 5,
      },
      High: {
        description: "Test availability High",
        technical: "Test technical High",
        businessImpact: "Test business impact High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 15,
        opex: 8,
      },
      "Very High": {
        description: "Test availability Very High",
        technical: "Test technical Very High",
        businessImpact: "Test business impact Very High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 20,
        opex: 10,
      },
    },
    integrityOptions: {
      None: {
        description: "Test integrity None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 0,
        opex: 0,
      },
      Low: {
        description: "Test integrity Low",
        technical: "Test technical Low",
        businessImpact: "Test business impact Low",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 5,
        opex: 2,
      },
      Moderate: {
        description: "Test integrity Moderate",
        technical: "Test technical Moderate",
        businessImpact: "Test business impact Moderate",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 10,
        opex: 5,
      },
      High: {
        description: "Test integrity High",
        technical: "Test technical High",
        businessImpact: "Test business impact High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 15,
        opex: 8,
      },
      "Very High": {
        description: "Test integrity Very High",
        technical: "Test technical Very High",
        businessImpact: "Test business impact Very High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 20,
        opex: 10,
      },
    },
    confidentialityOptions: {
      None: {
        description: "Test confidentiality None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 0,
        opex: 0,
      },
      Low: {
        description: "Test confidentiality Low",
        technical: "Test technical Low",
        businessImpact: "Test business impact Low",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 5,
        opex: 2,
      },
      Moderate: {
        description: "Test confidentiality Moderate",
        technical: "Test technical Moderate",
        businessImpact: "Test business impact Moderate",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 10,
        opex: 5,
      },
      High: {
        description: "Test confidentiality High",
        technical: "Test technical High",
        businessImpact: "Test business impact High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 15,
        opex: 8,
      },
      "Very High": {
        description: "Test confidentiality Very High",
        technical: "Test technical Very High",
        businessImpact: "Test business impact Very High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 20,
        opex: 10,
      },
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
