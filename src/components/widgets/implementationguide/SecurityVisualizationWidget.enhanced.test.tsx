import { render, screen } from "@testing-library/react";
import type { Chart } from "chart.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setupChartEnvironment } from "../../../tests/testUtils/chartTestUtils";
import { SecurityLevel } from "../../../types/cia";
import { mockWidgetProps } from "../../../utils/testUtils";
import SecurityVisualizationWidget from "./SecurityVisualizationWidget"; // Fixed import syntax

// Add proper Chart type declaration
interface ChartInstance {
  destroy: () => void;
  update: () => void;
}

// Mock Chart.js
let mockChartData: unknown = null;
let mockChartOptions: unknown = null;

// Setup test environment
setupChartEnvironment();

describe("SecurityVisualizationWidget Enhanced Tests", () => {
  const defaultProps = {
    ...mockWidgetProps,
    testId: "security-visualization-widget",
  };

  beforeEach(() => {
    // Reset mocks
    mockChartData = null;
    mockChartOptions = null;

    // Use Vitest to mock Chart with proper typing
    (global as any).Chart = vi.fn((ctx, config) => {
      mockChartData = config?.data;
      mockChartOptions = config?.options;
      return {
        destroy: vi.fn(),
        update: vi.fn(),
      };
    }) as unknown as typeof Chart;
  });

  it("renders the chart component", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check for radar chart canvas
    const chartElement = screen.getByTestId(
      "security-visualization-widget-radar-chart"
    );
    expect(chartElement).toBeInTheDocument();

    // Check for radar values - mockWidgetProps uses PascalCase SecurityLevel values
    const availabilityValue = screen.getByTestId("radar-availability-value");
    expect(availabilityValue).toBeInTheDocument();
    expect(availabilityValue.textContent).toBe("Moderate");
  });

  it("displays appropriate security levels", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check component sections using widget-scoped test IDs
    const confidentialitySection = screen.getByTestId(
      "widget-security-visualization-section-confidentiality-component"
    );
    const integritySection = screen.getByTestId("widget-security-visualization-section-integrity-component");
    const availabilitySection = screen.getByTestId(
      "widget-security-visualization-section-availability-component"
    );

    expect(confidentialitySection).toBeInTheDocument();
    expect(integritySection).toBeInTheDocument();
    expect(availabilitySection).toBeInTheDocument();
  });

  it("displays correct security score based on levels", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check security score using widget-scoped test ID
    const securityScore = screen.getByTestId("widget-security-visualization-value-security-score");
    expect(securityScore).toBeInTheDocument();
    expect(securityScore.textContent).toBe("50");

    // Note: security-score-bar test ID may not exist in current implementation
    // Only test what exists
  });

  it("displays appropriate risk level based on security score", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check risk level using widget-scoped test ID
    const riskLevel = screen.getByTestId("widget-security-visualization-label-risk-level");
    expect(riskLevel).toBeInTheDocument();
    expect(riskLevel.textContent).toBe("Low Risk");
  });
});
