import React from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { SecurityLevel } from "../types/cia";

/**
 * Consistent CIA level props for component testing
 */
export interface CIALevelProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel;
}

/**
 * Creates standard CIA level props for testing
 */
export const createBasicCIAProps = (
  level: SecurityLevel = "Moderate"
): CIALevelProps => ({
  availabilityLevel: level,
  integrityLevel: level,
  confidentialityLevel: level,
  securityLevel: level,
});

/**
 * Creates mixed CIA level props for testing
 */
export const createMixedCIAProps = (): CIALevelProps => ({
  availabilityLevel: "High",
  integrityLevel: "Moderate",
  confidentialityLevel: "Low",
  securityLevel: "Moderate",
});

/**
 * Mock service function that can be used for multiple services
 */
export const mockServiceFunction = <T extends object>(defaultValue: T) => {
  return vi.fn().mockReturnValue(defaultValue);
};

/**
 * Standard render function with options
 */
export const renderWithProps = <T extends object>(
  Component: React.ComponentType<T>,
  props: T
) => {
  return render(<Component {...props} />);
};

/**
 * Creates mock handlers for CIA level changes
 */
export const createMockHandlers = () => ({
  onAvailabilityChange: vi.fn(),
  onIntegrityChange: vi.fn(),
  onConfidentialityChange: vi.fn(),
  setAvailability: vi.fn(),
  setIntegrity: vi.fn(),
  setConfidentiality: vi.fn(),
});

/**
 * Creates mock CIA service response
 */
export const createMockServiceResponse = () => ({
  description: "Mocked description",
  technical: "Mocked technical details",
  businessImpact: "Mocked business impact",
  recommendations: ["Recommendation 1", "Recommendation 2"],
  uptime: "99.9%",
  capex: 15,
  opex: 10,
  bg: "#cccccc",
  text: "#000000",
});

/**
 * Common mock for ciaContentService
 */
export const mockCIAContentService = () => {
  return {
    getComponentDetails: vi
      .fn()
      .mockImplementation(() => createMockServiceResponse()),
    getBusinessImpact: vi.fn().mockImplementation(() => ({
      summary: "Mocked impact summary",
      financial: { description: "Financial impact", riskLevel: "Medium" },
      operational: { description: "Operational impact", riskLevel: "Low" },
    })),
    getTechnicalImplementation: vi.fn().mockImplementation(() => ({
      description: "Technical implementation details",
      effort: { development: "Low", maintenance: "Low", expertise: "Medium" },
      rto: "4 hours",
      rpo: "1 hour",
    })),
    getRecommendations: vi.fn().mockImplementation(() => ["Recommendation 1"]),
    getROIEstimates: vi.fn().mockImplementation(() => ({
      returnRate: "200%",
      description: "Good ROI",
    })),
  };
};

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
