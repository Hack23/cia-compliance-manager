// Add these helper functions at the top before other code
const suppressCanvasErrors = () => {
  return vi.spyOn(console, "error").mockImplementation((msg: unknown) => {
    if (
      typeof msg === "string" &&
      (msg.includes("canvas") || msg.includes("Canvas"))
    ) {
      return;
    }
    if (msg && typeof msg === "object" && "toString" in msg) {
      const msgStr = msg.toString();
      if (msgStr.includes("canvas") || msgStr.includes("Canvas")) {
        return;
      }
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
  // Create a proper constructor function using vi.fn()
  const MockChart = vi.fn(function (this: unknown) {
    return {
      destroy: vi.fn(),
      update: vi.fn(),
      data: {
        labels: ["Availability", "Integrity", "Confidentiality"],
        datasets: [],
      },
      options: {},
    };
  }) as unknown as {
    new (): {
      destroy: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      data: { labels: string[]; datasets: never[] };
      options: Record<string, unknown>;
    };
    register: ReturnType<typeof vi.fn>;
    defaults: {
      font: { family: string };
      plugins: { legend: { display: boolean } };
    };
  };

  // Add static properties to the constructor
  (MockChart as { register: ReturnType<typeof vi.fn> }).register = vi.fn();
  (
    MockChart as {
      defaults: {
        font: { family: string };
        plugins: { legend: { display: boolean } };
      };
    }
  ).defaults = {
    font: { family: "Arial" },
    plugins: { legend: { display: true } },
  };

  return {
    __esModule: true,
    default: MockChart,
  };
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CHART_TEST_IDS } from "../../constants/testIds";
import RadarChart from "./RadarChart";

// Mock Chart.js more comprehensively to avoid canvas issues

describe("RadarChart Component", () => {
  let consoleErrorSpy: ReturnType<typeof suppressCanvasErrors>;

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
