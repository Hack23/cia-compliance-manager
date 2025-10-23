// Create mock objects using vi.hoisted for proper hoisting
const mockChartInstance = vi.hoisted(() => ({
  destroy: vi.fn(),
  update: vi.fn(),
  resize: vi.fn(),
  data: { datasets: [] },
}));

// Define a type for the Chart mock constructor to include its static properties
type ChartMockConstructor = ReturnType<typeof vi.fn> & {
  register: ReturnType<typeof vi.fn>;
  defaults: {
    font: { family: string };
    plugins: { legend: { display: boolean } };
  };
};

const mockChartConstructor = vi.hoisted(() => {
  const constructor = vi.fn(function () {
    return mockChartInstance;
  });
  return constructor as ChartMockConstructor;
});

// Add these properties after creating the constructor
vi.hoisted(() => {
  mockChartConstructor.register = vi.fn();
  mockChartConstructor.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: false } },
  };
});

// Apply the mock with the hoisted implementation
vi.mock("chart.js/auto", () => ({
  __esModule: true,
  default: mockChartConstructor,
}));

// Then import all required modules
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CHART_TEST_IDS } from "../../constants/testIds";
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

    // Access the mock constructor directly
    expect(mockChartConstructor).toHaveBeenCalled();
  });

  it("cleans up resources when unmounted", () => {
    const { unmount } = render(
      <RadarChart
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    unmount();

    // Verify destroy was called during cleanup
    expect(mockChartInstance.destroy).toHaveBeenCalled();
  });
});
