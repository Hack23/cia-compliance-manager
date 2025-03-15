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
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
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
