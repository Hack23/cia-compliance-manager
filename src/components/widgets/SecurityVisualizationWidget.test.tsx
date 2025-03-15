import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import SecurityVisualizationWidget from "./SecurityVisualizationWidget";

// Mock RadarChart since it uses canvas which is difficult to test
vi.mock("../RadarChart", () => ({
  default: () => <div data-testid="mock-radar-chart">Mock Radar Chart</div>,
}));

describe("SecurityVisualizationWidget", () => {
  // Mock the useEffect for typing animation
  beforeEach(() => {
    vi.spyOn(React, "useEffect").mockImplementation((f) => f());
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(
      screen.getByText(/Security Profile Visualization/i)
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-radar-chart")).toBeInTheDocument();
  });

  it("displays risk assessment metrics", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check that risk metrics are displayed
    expect(screen.getByTestId("radar-chart-value-at-risk")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart-probability")).toBeInTheDocument();
    expect(screen.getByTestId("radar-chart-risk-score")).toBeInTheDocument();

    // Use specific testId selectors to verify values and add null assertion to ensure elements have textContent
    const metrics = screen.getAllByTestId("metrics-card-title");
    expect(metrics[0]?.textContent).toContain("Value at Risk");
    expect(metrics[1]?.textContent).toContain("Probability");
    expect(metrics[2]?.textContent).toContain("Risk Score");
  });

  it("renders risk gauge with proper segments", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check for the risk gauge elements
    const lowRiskLabel = screen.getByText(/Low Risk/i);
    const highRiskLabel = screen.getByText(/High Risk/i);

    expect(lowRiskLabel).toBeInTheDocument();
    expect(highRiskLabel).toBeInTheDocument();
  });

  it("displays risk mitigation recommendations", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // Check for recommendations section
    expect(
      screen.getByText(/Risk Mitigation Recommendations/i)
    ).toBeInTheDocument();
  });

  it("toggles tip visibility when clicking on recommendations", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // Find a recommendation and click it
    const recommendation = screen.getByText(/Increase your/i);
    fireEvent.click(recommendation);

    // After clicking, implementation tips should be visible
    expect(screen.getByText(/Implementation tips:/i)).toBeInTheDocument();
  });
});
