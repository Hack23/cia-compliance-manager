import { vi } from "vitest";
import { SecurityLevel } from "../types/cia";

/**
 * Mock security levels for testing
 */
export const DEFAULT_SECURITY_LEVELS = {
  availabilityLevel: "Moderate" as SecurityLevel,
  integrityLevel: "Moderate" as SecurityLevel,
  confidentialityLevel: "Moderate" as SecurityLevel,
};

// Define a regular object that can be exported
// Do NOT use vi.hoisted() for objects that need to be exported
export const mockCIAOptions = {
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
};

/**
 * Mock ROI estimates for testing
 */
export const mockROIEstimates = {
  NONE: { returnRate: "0%", description: "No ROI" },
  LOW: { returnRate: "50%", description: "Low ROI" },
  MODERATE: { returnRate: "200%", description: "Moderate ROI" },
  HIGH: { returnRate: "350%", description: "High ROI" },
  VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
};

// Create mock instance properly with hoisted function
const createMockChartInstance = () => ({
  destroy: vi.fn(),
  update: vi.fn(),
  resize: vi.fn(),
  data: { datasets: [] },
});

/**
 * Creates a properly hoisted mock chart constructor for testing
 */
export function createMockChartConstructor() {
  const mockChartInstance = createMockChartInstance();

  // Create the constructor function with proper typings
  const constructor = vi.fn(
    () => mockChartInstance
  ) as unknown as typeof vi.fn & {
    register: ReturnType<typeof vi.fn>;
    defaults: {
      font: { family: string };
      plugins: { legend: { display: boolean } };
    };
  };

  // Add properties to the constructor
  constructor.register = vi.fn();
  constructor.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: false } },
  };

  return { constructor, instance: mockChartInstance };
}

/**
 * Setup for global DOM mocks (ResizeObserver, etc.)
 * Call this in a beforeEach block
 */
export function setupDomMocks() {
  // Mock ResizeObserver globally
  global.ResizeObserver = class ResizeObserver {
    constructor(callback: ResizeObserverCallback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // Mock requestAnimationFrame
  global.requestAnimationFrame = vi.fn().mockImplementation((callback) => {
    callback(0);
    return 0;
  });

  // Mock canvas context
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 200, height: 200 },
    clearRect: vi.fn(),
    fill: vi.fn(),
  });
}
