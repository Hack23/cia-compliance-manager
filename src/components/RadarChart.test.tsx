import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import RadarChart from "./RadarChart";
import { CHART_TEST_IDS } from "../constants/testIds";

// Mock Chart.js
vi.mock("chart.js/auto", () => {
  return {
    default: class Chart {
      static register() {}
      destroy() {}
      resize() {}
      update() {}
    },
  };
});

describe("RadarChart", () => {
  beforeEach(() => {
    // Mock the canvas context
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      // Add minimal canvas context mock implementation
      canvas: { width: 100, height: 100 },
    });
  });

  it("renders without crashing", () => {
    render(
      <RadarChart
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    expect(screen.getByTestId(CHART_TEST_IDS.RADAR_CHART)).toBeInTheDocument();
  });

  it("displays the correct security level values", () => {
    render(
      <RadarChart
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent("High");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)
    ).toHaveTextContent("Moderate");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)
    ).toHaveTextContent("Low");
  });

  it("handles null or undefined values gracefully", () => {
    // @ts-ignore - intentionally testing with undefined values
    render(<RadarChart />);

    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent("None");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)
    ).toHaveTextContent("None");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)
    ).toHaveTextContent("None");
  });

  it("handles canvas context error gracefully", () => {
    // Force getContext to return null to simulate canvas error
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

    render(
      <RadarChart
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    // Should render the chart container even if canvas fails
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CHART_CONTAINER)
    ).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const customTestId = "custom-chart";
    render(
      <RadarChart
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        testId={customTestId}
      />
    );

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });
});
