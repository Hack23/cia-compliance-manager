import { vi } from "vitest";
import {
  CIADataProvider,
  CIADetails,
  SecurityLevel,
} from "../../types/cia-services";

/**
 * Mock the DOM APIs that are commonly needed in tests
 */
export function mockDOMAPIs() {
  // Mock canvas context
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 200, height: 200 },
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    arc: vi.fn(),
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

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor(_callback: ResizeObserverCallback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // Mock requestAnimationFrame
  global.requestAnimationFrame = (callback: FrameRequestCallback) => {
    callback(0);
    return 0;
  };
}

/**
 * Create a mocked Chart.js instance
 */
export function createMockChart() {
  return {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
    options: {},
  };
}

/**
 * Create a standardized mock for Chart.js
 */
export function createChartMock() {
  const chartInstance = createMockChart();

  // Create the mock constructor with proper typing
  type ChartConstructor = ReturnType<typeof vi.fn> & {
    register: ReturnType<typeof vi.fn>;
    defaults: {
      font: { family: string };
      plugins: { legend: { display: boolean } };
    };
  };

  const ChartMock = vi.fn(() => chartInstance) as ChartConstructor;
  ChartMock.register = vi.fn();
  ChartMock.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: false } },
  };

  return {
    __esModule: true,
    default: ChartMock,
  };
}

/**
 * Creates a test data provider with mock data for testing
 *
 * @returns A mocked CIADataProvider instance
 */
export function createTestDataProvider(): CIADataProvider {
  return {
    // Remove the getSecurityLevelDetails method that's not in the interface
    // getSecurityLevelRecommendations: vi.fn().mockResolvedValue([]),
    availabilityOptions: {} as Record<SecurityLevel, CIADetails>,
    integrityOptions: {} as Record<SecurityLevel, CIADetails>,
    confidentialityOptions: {} as Record<SecurityLevel, CIADetails>,
    roiEstimates: {} as any,
    getDefaultSecurityIcon: vi.fn(),
    getDefaultValuePoints: vi.fn(),
    getComplianceFrameworks: vi.fn().mockResolvedValue([]),
    getComplianceRequirements: vi.fn().mockResolvedValue({}),
    getBusinessImpact: vi.fn().mockResolvedValue({}),
    getSecurityMetrics: vi.fn().mockResolvedValue({}),
    getSecurityResources: vi.fn().mockResolvedValue([]),
    getSLAMetrics: vi.fn().mockResolvedValue({}),
    getCostEstimates: vi.fn().mockResolvedValue({}),
    getValueCreationMetrics: vi.fn().mockResolvedValue({}),
    getImplementationDetails: vi.fn().mockResolvedValue({}),
    getRemediationSteps: vi.fn().mockResolvedValue([]),
  };
}

/**
 * Creates a typed mock object with all methods mocked
 */
export function createMock<T extends object>(
  implementation: Partial<T> = {}
): T {
  return {
    ...Object.fromEntries(
      Object.getOwnPropertyNames(Object.getPrototypeOf({})).map((key) => [
        key,
        vi.fn(),
      ])
    ),
    ...implementation,
  } as T;
}
