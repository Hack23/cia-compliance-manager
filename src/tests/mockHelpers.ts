import { vi } from "vitest";

// Define a proper type for the Chart mock constructor
type ChartMockConstructor = ReturnType<typeof vi.fn> & {
  register: ReturnType<typeof vi.fn>;
  defaults: {
    font: { family: string };
    plugins: { legend: { display: boolean } };
  };
};

/**
 * Creates standard Chart.js mocks for testing
 * Designed to be used with vi.mock hoisting
 */
export function createChartJsMock() {
  const mockInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  };

  // Cast to the proper type that includes register and defaults
  const mockConstructor = vi.fn(() => mockInstance) as ChartMockConstructor;

  // Add static methods/properties that Chart might have
  mockConstructor.register = vi.fn();
  mockConstructor.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: true } },
  };

  return {
    __esModule: true,
    default: mockConstructor,
    // Also export the mock instance and constructor directly for tests to access
    mockInstance,
    mockConstructor,
  };
}

/**
 * Creates consistent CIA options mocks
 * Designed to be used with vi.mock hoisting
 */
export function createCIAOptionsMock() {
  const mockOptions = {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5, opex: 2 },
    Moderate: { capex: 10, opex: 5 },
    High: { capex: 15, opex: 8 },
    "Very High": { capex: 20, opex: 10 },
  };

  const ROI_ESTIMATES = {
    NONE: { returnRate: "0%" },
    LOW: { returnRate: "100%" },
    MODERATE: { returnRate: "200%" },
    HIGH: { returnRate: "350%" },
    VERY_HIGH: { returnRate: "500%" },
  };

  return {
    __esModule: true,
    default: {
      availabilityOptions: { ...mockOptions },
      integrityOptions: { ...mockOptions },
      confidentialityOptions: { ...mockOptions },
      ROI_ESTIMATES,
    },
    useCIAOptions: vi.fn().mockReturnValue({
      availabilityOptions: { ...mockOptions },
      integrityOptions: { ...mockOptions },
      confidentialityOptions: { ...mockOptions },
      ROI_ESTIMATES,
    }),
    // Export these directly as they might be referenced by importing modules
    availabilityOptions: { ...mockOptions },
    integrityOptions: { ...mockOptions },
    confidentialityOptions: { ...mockOptions },
    ROI_ESTIMATES,
  };
}

/**
 * Creates a comprehensive mock for useCIAOptions with test-friendly values
 * Designed to be used with vi.mock hoisting
 */
export function createCIAOptionsTestMock() {
  // Create test-friendly values that match test expectations
  const mockOptions = {
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
  };

  return {
    __esModule: true,
    default: vi.fn(),
    useCIAOptions: vi.fn().mockReturnValue({
      availabilityOptions: mockOptions,
      integrityOptions: mockOptions,
      confidentialityOptions: mockOptions,
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%", description: "No ROI" },
        LOW: { returnRate: "50%", description: "Low ROI" },
        MODERATE: {
          returnRate: "200%",
          description: "Standard security provides good value",
        },
        HIGH: { returnRate: "350%", description: "High ROI" },
        VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
      },
    }),
    // Direct exports needed by other modules
    availabilityOptions: mockOptions,
    integrityOptions: mockOptions,
    confidentialityOptions: mockOptions,
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good value",
      },
      HIGH: { returnRate: "350%", description: "High ROI" },
      VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
    },
  };
}

/**
 * Creates a mock for widgetRegistry
 * Designed to be used with vi.mock hoisting
 */
export function createWidgetRegistryMock() {
  return {
    __esModule: true,
    default: {
      renderWidget: vi.fn().mockImplementation((id: string, props: any) => ({
        type: "div",
        props: {
          "data-testid": `widget-${id}`,
          children: `Mock Widget ${id}`,
          ...props,
        },
      })),
      renderWidgets: vi.fn().mockReturnValue([]),
      register: vi.fn(),
      get: vi.fn(),
      getAll: vi.fn(),
    },
  };
}

/**
 * Creates a mock component for testing
 * @param testId The test ID to use for the component
 */
export function createMockComponent(testId: string) {
  return vi
    .fn()
    .mockImplementation(
      ({
        children,
        ...props
      }: {
        children?: React.ReactNode;
        [key: string]: any;
      }) => ({
        type: "div",
        props: {
          "data-testid": testId,
          ...props,
          children,
        },
      })
    );
}
