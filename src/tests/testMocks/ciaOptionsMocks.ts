import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";

/**
 * Interface for customization options when creating CIA options mock
 */
interface CIAOptionsMockCustomization {
  availabilityOptions?: Record<string, any>;
  integrityOptions?: Record<string, any>;
  confidentialityOptions?: Record<string, any>;
  ROI_ESTIMATES?: Record<string, any>;
  useCIAOptions?: Record<string, any>;
}

/**
 * Creates standardized CIA options mock that works with vi.mock hoisting
 * Set to match the expected values in tests
 */
export function createCIAOptionsMock(
  customization: CIAOptionsMockCustomization = {}
) {
  const defaultOptions = {
    None: {
      description: "No security controls",
      technical: "No technical controls implemented",
      businessImpact: "Critical business impact",
      capex: 0,
      opex: 0,
      bg: "#ffffff",
      text: "#000000",
      recommendations: [],
    },
    Low: {
      description: "Basic security controls",
      technical: "Basic technical controls",
      businessImpact: "High business impact",
      capex: 5,
      opex: 2,
      bg: "#f8d7da",
      text: "#721c24",
      recommendations: ["Basic recommendation"],
    },
    Moderate: {
      description: "Standard security controls",
      technical: "Standard technical controls",
      businessImpact: "Medium business impact",
      capex: 10,
      opex: 5,
      bg: "#fff3cd",
      text: "#856404",
      recommendations: ["Standard recommendation"],
    },
    High: {
      description: "Advanced security controls",
      technical: "Advanced technical controls",
      businessImpact: "Low business impact",
      capex: 15,
      opex: 8,
      bg: "#d4edda",
      text: "#155724",
      recommendations: ["Advanced recommendation"],
    },
    "Very High": {
      description: "Maximum security controls",
      technical: "Maximum technical controls",
      businessImpact: "Minimal business impact",
      capex: 20,
      opex: 10,
      bg: "#cce5ff",
      text: "#004085",
      recommendations: ["Maximum recommendation"],
    },
  };

  // Create the mock with the default structure and ESModule flag
  return {
    __esModule: true,

    // Export direct constants to match the original module's exports
    availabilityOptions: {
      ...defaultOptions,
      ...(customization.availabilityOptions || {}),
    },
    integrityOptions: {
      ...defaultOptions,
      ...(customization.integrityOptions || {}),
    },
    confidentialityOptions: {
      ...defaultOptions,
      ...(customization.confidentialityOptions || {}),
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No ROI", value: "0%" },
      LOW: { returnRate: "50%", description: "Low ROI", value: "50%" },
      MODERATE: {
        returnRate: "150%",
        description: "Moderate ROI",
        value: "150%",
      },
      HIGH: { returnRate: "300%", description: "High ROI", value: "300%" },
      VERY_HIGH: {
        returnRate: "500%",
        description: "Very high ROI",
        value: "500%",
      },
      ...(customization.ROI_ESTIMATES || {}),
    },

    // Add the hook implementation that returns the data
    useCIAOptions: vi.fn().mockReturnValue({
      availabilityOptions: {
        ...defaultOptions,
        ...(customization.availabilityOptions || {}),
      },
      integrityOptions: {
        ...defaultOptions,
        ...(customization.integrityOptions || {}),
      },
      confidentialityOptions: {
        ...defaultOptions,
        ...(customization.confidentialityOptions || {}),
      },
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%", description: "No ROI", value: "0%" },
        LOW: { returnRate: "50%", description: "Low ROI", value: "50%" },
        MODERATE: {
          returnRate: "150%",
          description: "Moderate ROI",
          value: "150%",
        },
        HIGH: { returnRate: "300%", description: "High ROI", value: "300%" },
        VERY_HIGH: {
          returnRate: "500%",
          description: "Very high ROI",
          value: "500%",
        },
        ...(customization.ROI_ESTIMATES || {}),
      },
      getDefaultSecurityIcon: vi
        .fn()
        .mockImplementation((level: SecurityLevel) => {
          const securityIcons: Record<SecurityLevel, string> = {
            None: "⚠️",
            Low: "🔑",
            Moderate: "🔓",
            High: "🔒",
            "Very High": "🔐",
          };
          return securityIcons[level] || "❓";
        }),
      getDefaultValuePoints: vi
        .fn()
        .mockImplementation((level: SecurityLevel) => {
          return level === "None" ? [] : [`Value point for ${level}`];
        }),
      ...(customization.useCIAOptions || {}),
    }),
  };
}

/**
 * Type for Chart.js mock constructor with additional properties
 */
interface ChartMockConstructor {
  (): {
    destroy: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    resize: ReturnType<typeof vi.fn>;
    data: { datasets: never[] };
  };
  register: ReturnType<typeof vi.fn>;
  defaults: {
    font: { family: string };
    plugins: {
      legend: { display: boolean };
      tooltip: { enabled: boolean };
    };
  };
}

/**
 * Creates standardized Chart.js mock that works with vi.mock hoisting
 */
export function createChartJsMock() {
  const mockChartInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  };

  // Create the mock constructor and cast it to the extended type
  const mockConstructor = vi.fn(
    () => mockChartInstance
  ) as unknown as ChartMockConstructor;

  // Add static properties and methods to the constructor
  mockConstructor.register = vi.fn();
  mockConstructor.defaults = {
    font: { family: "Arial" },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return {
    __esModule: true,
    default: mockConstructor,
  };
}
