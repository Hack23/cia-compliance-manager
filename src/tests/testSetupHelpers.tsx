import { vi } from "vitest"; // Remove SpyInstance import

/**
 * Helper function to suppress known console errors in tests
 * Particularly useful for Chart.js canvas context errors
 * @returns SpyInstance that can be used to restore the original console.error
 */
export function suppressCanvasErrors(): ReturnType<typeof vi.spyOn> {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation((message) => {
      const knownErrors = [
        "Failed to create chart",
        "Could not get canvas context",
        "can't acquire context",
        "canvas.getContext is not a function",
      ];

      if (
        typeof message === "string" &&
        knownErrors.some((err) => message.includes(err))
      ) {
        return; // Suppress known errors
      }

      // Let other errors through to the console
      console.log("Console error:", message);
    });

  return consoleErrorSpy;
}

/**
 * Mock HTMLCanvasElement.getContext for Chart.js
 * Returns a mock that doesn't throw errors
 * @returns The mocked getContext function
 */
export function mockCanvasContext(): ReturnType<typeof vi.fn> {
  const getContextMock = vi.fn().mockReturnValue({
    canvas: {
      width: 100,
      height: 100,
    },
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn().mockReturnValue({ width: 10 }),
    getImageData: vi.fn().mockReturnValue({
      data: new Uint8ClampedArray(4),
      width: 1,
      height: 1,
    }),
    putImageData: vi.fn(),
    createLinearGradient: vi.fn().mockReturnValue({
      addColorStop: vi.fn(),
    }),
    setTransform: vi.fn(),
    scale: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
  });

  HTMLCanvasElement.prototype.getContext = getContextMock;

  return getContextMock;
}

/**
 * Create a mock Chart.js factory
 * @returns A mock for Chart.js
 */
export function mockChartJs() {
  return {
    __esModule: true,
    default: vi.fn().mockImplementation(() => ({
      destroy: vi.fn(),
      update: vi.fn(),
    })),
  };
}
