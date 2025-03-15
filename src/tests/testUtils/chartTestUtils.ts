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
  // Store mocked elements
  const mockChartInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  };

  // Cast to the proper type that includes register and defaults
  const mockConstructor = vi.fn(
    () => mockChartInstance
  ) as ChartMockConstructor;

  // Add static methods/properties that Chart might have
  mockConstructor.register = vi.fn();
  mockConstructor.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: true } },
  };

  // Create the mock object that will be returned by vi.mock
  const chartMock = {
    __esModule: true,
    default: mockConstructor,
  };

  // Mock Canvas API
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 200, height: 200 },
    clearRect: vi.fn(),
    fill: vi.fn(),
    beginPath: vi.fn(),
    stroke: vi.fn(),
  });

  // Mock browser APIs
  global.ResizeObserver = class ResizeObserver {
    constructor(callback: ResizeObserverCallback) {}
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
