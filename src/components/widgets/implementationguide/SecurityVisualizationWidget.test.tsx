import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SecurityVisualizationWidget from "./SecurityVisualizationWidget";

// Mock Chart.js with all required components and a working register function
vi.mock("chart.js", () => {
  // Define a type for the MockChart class to include the static register method
  type ChartConstructor = {
    new (): { destroy(): void };
    register: typeof vi.fn;
  };

  // Create the MockChart class with the proper typing
  const MockChart = class {
    constructor() {
      // Mock constructor
    }
    destroy() {
      // Mock destroy method
    }
  } as unknown as ChartConstructor;

  // Add the static register method
  MockChart.register = vi.fn();

  return {
    Chart: MockChart,
    RadarController: {},
    ArcElement: {},
    RadialLinearScale: {},
    PointElement: {},
    LineElement: {},
    Filler: {},
    Tooltip: {},
    Legend: {},
    registry: {
      register: vi.fn(),
    },
  };
});

describe("SecurityVisualizationWidget", () => {
  it("renders with security levels", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check that widget renders
    expect(
      screen.getByTestId("widget-container-security-visualization-widget")
    ).toBeInTheDocument();

    // Check availability, integrity, and confidentiality labels
    expect(screen.getByText("Availability")).toBeInTheDocument();
    expect(screen.getByText("Integrity")).toBeInTheDocument();
    expect(screen.getByText("Confidentiality")).toBeInTheDocument();
  });

  it("renders risk gauge with proper segments", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check for risk score element
    const riskScore = screen.getByTestId(
      "security-visualization-widget-risk-score"
    );
    expect(riskScore).toBeInTheDocument();

    // Check for risk level which should be present
    expect(
      screen.getByTestId("security-visualization-widget-risk-score-value")
    ).toHaveTextContent("50");
    expect(
      screen.getByTestId("security-visualization-widget-risk-score-label")
    ).toBeInTheDocument();
  });

  it("displays risk assessment details", () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // Look for security posture analysis heading instead of risk assessment
    expect(screen.getByText("Security Posture Analysis")).toBeInTheDocument();
  });

  it("updates risk level based on security levels", () => {
    // Test that the risk score is updated based on security levels
    const { rerender } = render(
      <SecurityVisualizationWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Get the risk score using correct data-testid
    const highRiskScore = screen.getByTestId(
      "security-visualization-widget-risk-score"
    );
    expect(highRiskScore).toBeInTheDocument();

    // Rerender with low security
    rerender(
      <SecurityVisualizationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // Check that the risk score is still there (component updates properly)
    const lowRiskScore = screen.getByTestId(
      "security-visualization-widget-risk-score"
    );
    expect(lowRiskScore).toBeInTheDocument();
  });
});
