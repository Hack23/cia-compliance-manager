import { vi } from "vitest";

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
    constructor(callback: ResizeObserverCallback) {}
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
