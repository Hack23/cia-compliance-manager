import { vi } from "vitest";

/**
 * Creates a mock Chart.js constructor that can be properly spied on
 * @returns An object with the mock constructor and instance
 */
export function createChartJsMock() {
  const mockInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
    options: {},
  };

  const mockConstructor = vi.fn(() => mockInstance);

  return {
    mockConstructor,
    mockInstance,
    mockModule: {
      __esModule: true,
      default: mockConstructor,
    },
  };
}

/**
 * Creates mocks for DOM APIs commonly needed in tests
 */
export function mockDOMAPIs() {
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
  });

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor(callback: ResizeObserverCallback) {}
    observe() {
      return vi.fn();
    }
    unobserve() {
      return vi.fn();
    }
    disconnect() {
      return vi.fn();
    }
  };

  // Mock requestAnimationFrame
  global.requestAnimationFrame = vi.fn().mockImplementation((cb) => {
    cb(0);
    return 0;
  });
}
