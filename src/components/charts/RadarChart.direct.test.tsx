// Add these helper functions at the top before other code
const suppressCanvasErrors = () => {
  return vi.spyOn(console, "error").mockImplementation((msg) => {
    if (
      msg?.toString().includes("canvas") ||
      msg?.toString().includes("Canvas")
    ) {
      return;
    }
    // Let other errors through
    console.warn("Console error:", msg);
  });
};

const mockCanvasContext = () => {
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    canvas: { width: 100, height: 100 },
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    stroke: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
  });
};

// Define mocks at the top of the file, before imports
vi.mock("chart.js/auto", () => {
  const mockChart = vi.fn().mockImplementation(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
    data: {
      labels: ["Availability", "Integrity", "Confidentiality"],
      datasets: [],
    },
    options: {},
  })) as ChartMock;

  // Add properties to the mockChart function
  mockChart.register = vi.fn();
  mockChart.defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: true } },
  };

  return {
    __esModule: true,
    default: mockChart,
  };
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CHART_TEST_IDS } from "../../constants/testIds";
import RadarChart from "./RadarChart";

// Define type for the Chart mock to include register and defaults properties
type ChartMock = ReturnType<typeof vi.fn> & {
  register: ReturnType<typeof vi.fn>;
  defaults: {
    font: { family: string };
    plugins: { legend: { display: boolean } };
  };
};

// Mock Chart.js more comprehensively to avoid canvas issues

describe("RadarChart Component", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Suppress expected Canvas-related console errors
    consoleErrorSpy = suppressCanvasErrors();

    // Set up a more complete canvas mock
    mockCanvasContext();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("creates a canvas element for the chart", () => {
    const { container } = render(
      <RadarChart
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // Verify the canvas element is created
    const canvasElement = container.querySelector("canvas");
    expect(canvasElement).toBeInTheDocument();
    expect(screen.getByTestId(CHART_TEST_IDS.RADAR_CHART)).toBeInTheDocument();
  });

  it("renders without errors with chart context", () => {
    render(
      <RadarChart
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    expect(screen.getByTestId(CHART_TEST_IDS.RADAR_CHART)).toBeInTheDocument();
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith("2d");
  });

  it("displays security levels as text values", () => {
    const { rerender } = render(
      <RadarChart
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    // Display values should reflect the current levels
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent("None");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)
    ).toHaveTextContent("None");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)
    ).toHaveTextContent("None");

    // Test with different combinations of security levels
    rerender(
      <RadarChart
        availabilityLevel="Very High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Updated values should be reflected
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent("Very High");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)
    ).toHaveTextContent("Moderate");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)
    ).toHaveTextContent("Low");
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-radar-chart";
    render(
      <RadarChart
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
        testId={testId}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
