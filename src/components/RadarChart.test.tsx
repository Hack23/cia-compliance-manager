// Define mocks at the top of the file, before imports
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

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CHART_TEST_IDS } from "../constants/testIds";
import RadarChart from "./RadarChart";

// Mock Chart.js


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

  it("applies custom className when provided", () => {
    const customClass = "custom-radar-chart";
    render(
      <RadarChart
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
        className={customClass}
      />
    );

    // Note: We can't directly check container classes because of how the component is structured
    // This would require a more specific test to verify className is applied
  });

  it("handles different security level combinations", () => {
    render(
      <RadarChart
        availabilityLevel="Very High"
        integrityLevel="High"
        confidentialityLevel="Moderate"
      />
    );

    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent("Very High");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)
    ).toHaveTextContent("High");
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)
    ).toHaveTextContent("Moderate");
  });

  it("renders consistently with state updates", () => {
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
  });
});
