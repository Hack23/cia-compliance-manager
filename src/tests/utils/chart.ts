/**
 * Chart.js testing utilities for CIA Compliance Manager.
 *
 * This file consolidates Chart.js-specific test utilities from:
 * - src/tests/testUtils/chartTestUtils.ts
 * - src/utils/test-helpers.ts (chart mocking functions)
 *
 * @packageDocumentation
 */

import { vi } from "vitest";

/**
 * Creates a mock for Chart.js library
 * @returns Mock Chart constructor and instance
 */
export function setupChartJsMock() {
  const mockChartInstance = {
    update: vi.fn(),
    destroy: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
    options: {},
  };

  // Create the mock constructor function
  const MockChart = vi.fn(() => mockChartInstance) as any;

  // Add required Chart.js static methods
  MockChart.register = vi.fn();

  return { MockChart, mockChartInstance };
}

/**
 * Sets up a complete environment for Chart.js tests
 * @returns Test utilities and teardown function
 */
export function setupChartTest() {
  const { MockChart, mockChartInstance } = setupChartJsMock();

  // Mock the Chart.js module
  vi.mock("chart.js", () => ({
    Chart: MockChart,
    registerables: ["mockRegisterables"],
  }));

  // Create a canvas element for testing
  const createCanvasMock = () => {
    const canvas = document.createElement("canvas");

    // Keep the original getContext method for proper typing
    const originalGetContext = canvas.getContext;

    // Create a properly typed mock that preserves the original method signature
    canvas.getContext = vi
      .fn()
      .mockImplementation((contextType: string, options?: any) => {
        // For 2d context, return our mock
        if (contextType === "2d") {
          return {
            clearRect: vi.fn(),
            save: vi.fn(),
            restore: vi.fn(),
            canvas,
            globalAlpha: 1,
            globalCompositeOperation: "source-over",
            drawImage: vi.fn(),
            // Add minimal required properties for a CanvasRenderingContext2D
            fillRect: vi.fn(),
            strokeRect: vi.fn(),
            fillText: vi.fn(),
            measureText: vi.fn(() => ({ width: 10 })),
            // Add more methods as needed
          } as unknown as CanvasRenderingContext2D;
        }

        // Use the original method for other context types to maintain type compatibility
        return originalGetContext.call(canvas, contextType, options);
      });

    return canvas;
  };

  return {
    MockChart,
    mockChartInstance,
    createCanvasMock,
    cleanup: () => {
      vi.resetAllMocks();
    },
  };
}

/**
 * Creates a mock dataset for Chart.js radar charts
 * @param label Dataset label
 * @param data Data points
 * @param color Color for the dataset
 * @returns Formatted dataset object
 */
export function createMockRadarDataset(
  label: string,
  data: number[],
  color: string
) {
  return {
    label,
    data,
    backgroundColor: `${color}33`, // 20% opacity
    borderColor: color,
    borderWidth: 2,
    pointBackgroundColor: color,
    pointBorderColor: "#fff",
    pointHoverBackgroundColor: "#fff",
    pointHoverBorderColor: color,
  };
}
