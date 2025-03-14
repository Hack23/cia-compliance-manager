/**
 * Core test utilities module for consistent testing patterns
 */
import { vi } from "vitest";
import { SecurityLevel } from "../../types/cia";

/**
 * Provides standard mocks for option hooks across the application
 */
export function mockCIAOptions() {
  const mockOptions = {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5, opex: 2 },
    Moderate: { capex: 10, opex: 5 },
    High: { capex: 15, opex: 8 },
    "Very High": { capex: 20, opex: 10 },
  };

  return {
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
 * Creates a standardized Chart.js mock that works with vitest hoisting
 */
export function mockChartJs() {
  const mockChartInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
  };

  return {
    __esModule: true,
    default: vi.fn(() => mockChartInstance),
  };
}

/**
 * Unified DOM mock setup for tests requiring browser APIs
 */
export function mockBrowserAPIs() {
  // Mock canvas context
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 200, height: 200 },
    clearRect: vi.fn(),
    fill: vi.fn(),
  });

  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Fix: Use ResizeObserverCallback type for correct type signature
  global.ResizeObserver = class ResizeObserver {
    constructor(callback: ResizeObserverCallback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

/**
 * Create test data by security level
 */
export function createTestDataBySeverity<T>(
  levels: Record<SecurityLevel, T>
): Record<SecurityLevel, T> {
  return levels;
}

/**
 * Helper for creating standardized test IDs
 */
export function createTestId(component: string, purpose: string): string {
  return `test-${component}-${purpose}`;
}
