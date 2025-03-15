// Use vi.hoisted to make the function available before imports
const mockChartImplementation = vi.hoisted(() => {
  // Create a mock Chart instance that can be accessed by tests
  const mockChartInstance = {
    destroy: vi.fn(),
    update: vi.fn(),
    resize: vi.fn(),
    data: { datasets: [] },
  };

  // Create a constructor mock that we can spy on
  const MockChart = vi.fn(() => mockChartInstance);

  return () => ({
    // Return a factory function that returns the mock object
    __esModule: true,
    default: MockChart,
    // Export the mockChartInstance so it's globally accessible to tests
    mockChartInstance,
    MockChart, // Add this line to export the constructor
  });
});

// Apply the mock with hoisted implementation
vi.mock("chart.js/auto", mockChartImplementation);

// Then import all required modules
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CHART_TEST_IDS } from "../constants/testIds";
import RadarChart from "./RadarChart";

describe("RadarChart Enhanced Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock DOM APIs
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      canvas: { width: 200, height: 200 },
      clearRect: vi.fn(),
      fill: vi.fn(),
    });
  });

  it("responds to window resize events", () => {
    const resizeSpy = vi.spyOn(window, "addEventListener");

    render(
      <RadarChart
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    expect(resizeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    resizeSpy.mockRestore();
  });

  it("updates chart when props change", () => {
    const { rerender } = render(
      <RadarChart
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    rerender(
      <RadarChart
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent("High");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)
    ).toHaveTextContent("High");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)
    ).toHaveTextContent("High");
  });

  it("properly initializes chart data", () => {
    render(
      <RadarChart
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Access the exported mock directly with correct property
    const mockModule = mockChartImplementation();
    expect(mockModule.default).toHaveBeenCalled();
  });

  it("cleans up resources when unmounted", () => {
    const { unmount } = render(
      <RadarChart
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Get the mock instance from our implementation
    const mockModule = mockChartImplementation();

    unmount();

    // Verify destroy was called during cleanup
    expect(mockModule.mockChartInstance.destroy).toHaveBeenCalled();
  });
});
