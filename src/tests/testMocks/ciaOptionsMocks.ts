// Use vi.hoisted to create mocks that can be used at the top level
import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";

// Define types for Chart.js mock
interface ChartMock {
  destroy: ReturnType<typeof vi.fn>;
  update: ReturnType<typeof vi.fn>;
  resize: ReturnType<typeof vi.fn>;
  data: { datasets: any[] };
}

interface ChartConstructor extends ReturnType<typeof vi.fn> {
  register: ReturnType<typeof vi.fn>;
  defaults: {
    font: { family: string };
    plugins: { legend: { display: boolean } };
  };
}

// Proper hoisted mock for chart.js
const mockChartInstance = vi.hoisted(
  (): ChartMock => ({
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  })
);

const mockChartConstructor = vi.hoisted((): ChartConstructor => {
  const constructor = vi.fn(() => mockChartInstance) as ChartConstructor;
  constructor.register = vi.fn();
  constructor.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: false } },
  };
  return constructor;
});

// Properly hoisted CIA options mock
const mockCIAOptionsData = vi.hoisted(() => ({
  None: {
    capex: 0,
    opex: 0,
    description: "No security controls implemented",
    technical: "No technical controls",
    businessImpact: "Critical business impact",
    bg: "#ffffff",
    text: "#000000",
    recommendations: [],
  },
  Low: {
    capex: 5,
    opex: 2,
    description: "Basic security controls",
    technical: "Basic technical controls",
    businessImpact: "High business impact",
    bg: "#f8d7da",
    text: "#721c24",
    recommendations: ["Basic recommendation"],
  },
  Moderate: {
    capex: 10,
    opex: 5,
    description: "Standard security controls",
    technical: "Standard technical controls",
    businessImpact: "Medium business impact",
    bg: "#fff3cd",
    text: "#856404",
    recommendations: ["Standard recommendation"],
  },
  High: {
    capex: 15,
    opex: 8,
    description: "Advanced security controls",
    technical: "Advanced technical controls",
    businessImpact: "Low business impact",
    bg: "#d4edda",
    text: "#155724",
    recommendations: ["Advanced recommendation"],
  },
  "Very High": {
    capex: 20,
    opex: 10,
    description: "Maximum security controls",
    technical: "Maximum technical controls",
    businessImpact: "Minimal business impact",
    bg: "#cce5ff",
    text: "#004085",
    recommendations: ["Maximum recommendation"],
  },
}));

const mockROIEstimates = vi.hoisted(() => ({
  NONE: { returnRate: "0%", description: "No ROI", value: "0%" },
  LOW: { returnRate: "50%", description: "Low ROI", value: "50%" },
  MODERATE: { returnRate: "150%", description: "Moderate ROI", value: "150%" },
  HIGH: { returnRate: "300%", description: "High ROI", value: "300%" },
  VERY_HIGH: {
    returnRate: "500%",
    description: "Very high ROI",
    value: "500%",
  },
}));

/**
 * Creates a standard Chart.js mock for testing
 */
export function createChartJsMock() {
  return {
    __esModule: true,
    default: mockChartConstructor,
  };
}

/**
 * Creates a standard CIA options mock for testing
 * @param customization Optional customizations to apply to the mock
 */
export function createCIAOptionsMock(customization: Record<string, any> = {}) {
  const baseMockOptions = {
    availabilityOptions: mockCIAOptionsData,
    integrityOptions: mockCIAOptionsData,
    confidentialityOptions: mockCIAOptionsData,
    roiEstimates: mockROIEstimates,
  };

  // Apply any customizations
  const mockOptions = { ...baseMockOptions, ...customization };

  return {
    __esModule: true,
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    roiEstimates: mockOptions.roiEstimates,
    useCIAOptions: vi.fn().mockReturnValue({
      availabilityOptions: mockOptions.availabilityOptions,
      integrityOptions: mockOptions.integrityOptions,
      confidentialityOptions: mockOptions.confidentialityOptions,
      ROI_ESTIMATES: mockOptions.roiEstimates, // Upper case in hook return
    }),
  };
}

/**
 * Creates a mock security level provider for testing
 */
export function createMockSecurityLevelProvider(customLevels?: {
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
}) {
  return {
    availabilityLevel: customLevels?.availabilityLevel || "Moderate",
    integrityLevel: customLevels?.integrityLevel || "Moderate",
    confidentialityLevel: customLevels?.confidentialityLevel || "Moderate",
    setAvailabilityLevel: vi.fn(),
    setIntegrityLevel: vi.fn(),
    setConfidentialityLevel: vi.fn(),
    resetLevels: vi.fn(),
  };
}
