import { vi } from "vitest";

/**
 * Sets up mocks for chart.js that work properly with vi.mock hoisting
 */
export function setupChartJsMocks() {
  return {
    __esModule: true,
    default: vi.fn().mockImplementation(() => ({
      destroy: vi.fn(),
      update: vi.fn(),
      resize: vi.fn(),
    })),
  };
}

/**
 * Sets up mocks for the CIAOptions hook
 */
export function setupCIAOptionsMocks() {
  const mockOptions = {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5, opex: 2 },
    Moderate: { capex: 10, opex: 5 },
    High: { capex: 15, opex: 8 },
    "Very High": { capex: 20, opex: 10 },
  };

  return {
    __esModule: true,
    default: () => ({
      availabilityOptions: { ...mockOptions },
      integrityOptions: { ...mockOptions },
      confidentialityOptions: { ...mockOptions },
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%" },
        LOW: { returnRate: "100%" },
        MODERATE: { returnRate: "200%" },
        HIGH: { returnRate: "350%" },
        VERY_HIGH: { returnRate: "500%" },
      },
    }),
    useCIAOptions: () => ({
      availabilityOptions: { ...mockOptions },
      integrityOptions: { ...mockOptions },
      confidentialityOptions: { ...mockOptions },
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%" },
        LOW: { returnRate: "100%" },
        MODERATE: { returnRate: "200%" },
        HIGH: { returnRate: "350%" },
        VERY_HIGH: { returnRate: "500%" },
      },
    }),
    availabilityOptions: { ...mockOptions },
    integrityOptions: { ...mockOptions },
    confidentialityOptions: { ...mockOptions },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%" },
      LOW: { returnRate: "100%" },
      MODERATE: { returnRate: "200%" },
      HIGH: { returnRate: "350%" },
      VERY_HIGH: { returnRate: "500%" },
    },
  };
}

/**
 * Sets up mocks for DOM APIs commonly needed in tests
 */
export function setupDOMAPIMocks() {
  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
    writable: true,
  });

  // Mock canvas APIs
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 200, height: 200 },
    clearRect: vi.fn(),
    fill: vi.fn(),
  });
}

/**
 * Sets up mock for ResizeObserver
 */
export function setupResizeObserverMock() {
  global.ResizeObserver = class ResizeObserver {
    constructor(_callback: any) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
