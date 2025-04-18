import { render } from "@testing-library/react";
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
 * Setup function for Chart.js tests to standardize mocking
 * @returns utilities for testing Chart.js components
 */
export function setupChartTest() {
  // Create a mock Chart instance
  const mockChartInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  };

  // Create a constructor mock with proper type
  const mockConstructor = vi.fn(
    () => mockChartInstance
  ) as ChartMockConstructor;

  // Add static methods/properties that Chart has
  mockConstructor.register = vi.fn();
  mockConstructor.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: false } },
  };

  // Create the chart mock module
  const chartMock = {
    __esModule: true,
    default: mockConstructor,
  };

  // Mock canvas context
  HTMLCanvasElement.prototype.getContext = vi
    .fn()
    .mockImplementation((contextId) => {
      if (contextId === "2d") {
        return {
          canvas: { width: 200, height: 200 },
          clearRect: vi.fn(),
          fill: vi.fn(),
          beginPath: vi.fn(),
          stroke: vi.fn(),
          moveTo: vi.fn(),
          lineTo: vi.fn(),
          arc: vi.fn(),
          fillText: vi.fn(),
          measureText: vi.fn().mockReturnValue({ width: 10 }),
          save: vi.fn(),
          restore: vi.fn(),
          translate: vi.fn(),
          rotate: vi.fn(),
        } as unknown as CanvasRenderingContext2D;
      }
      return null;
    });

  // Mock browser APIs
  global.ResizeObserver = class ResizeObserver {
    constructor(_callback: ResizeObserverCallback) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  global.requestAnimationFrame = vi.fn().mockImplementation((cb) => {
    cb(0);
    return 0;
  });

  return {
    mockChartInstance,
    mockConstructor,
    chartMock,
    renderChart: (component: React.ReactElement) => render(component),
    cleanupMocks: () => {
      vi.clearAllMocks();
      vi.resetAllMocks();
    },
  };
}

/**
 * Creates a properly typed mock for Chart.js that can be used in tests
 *
 * @returns An object containing the mocked Chart class and data collectors
 */
export function createChartMock() {
  // Variables to store chart data for assertions in tests
  let mockChartData: any = null;
  let mockChartOptions: any = null;

  // Create a properly typed mock Chart class
  class MockChart {
    // Define static register method with correct TypeScript typing
    static register = vi.fn();

    data: any;
    options: any;

    constructor(ctx: any, config: any) {
      // Store chart data and options for test assertions
      mockChartData = config.data;
      mockChartOptions = config.options;
      this.data = config.data;
      this.options = config.options;
    }

    destroy = vi.fn();
    update = vi.fn();
    resize = vi.fn();
  }

  // Create the mock module
  const chartModule = {
    Chart: MockChart,
    register: vi.fn(),
    RadarController: {},
    ArcElement: {},
    RadialLinearScale: {},
    PointElement: {},
    LineElement: {},
    Tooltip: {},
    Legend: {},
    // Add other Chart.js components as needed
  };

  // Return both the mock module and data collectors
  return {
    chartModule,
    getMockData: () => mockChartData,
    getMockOptions: () => mockChartOptions,
    resetMockData: () => {
      mockChartData = null;
      mockChartOptions = null;
    },
  };
}

/**
 * Setup function to mock browser APIs required by Chart.js
 */
export function setupChartEnvironment() {
  // Mock ResizeObserver
  window.ResizeObserver =
    window.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

  // Mock canvas context if needed
  // Use proper type assertion to fix TypeScript error
  HTMLCanvasElement.prototype.getContext = vi
    .fn()
    .mockImplementation((contextId) => {
      if (contextId === "2d") {
        return {
          // Add canvas context methods as needed
          clearRect: vi.fn(),
          beginPath: vi.fn(),
          arc: vi.fn(),
          fill: vi.fn(),
          // Add more methods as tests require them
        } as unknown as CanvasRenderingContext2D;
      }
      return null;
    });

  // Return cleanup function
  return () => {
    vi.restoreAllMocks();
  };
}
