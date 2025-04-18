import { render, screen } from "@testing-library/react";
import type { Chart } from "chart.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { setupChartEnvironment } from "../../../tests/testUtils/chartTestUtils";
import { SecurityLevel } from "../../../types/cia";
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
    availabilityLevel: "moderate" as SecurityLevel,
    integrityLevel: "moderate" as SecurityLevel,
    confidentialityLevel: "moderate" as SecurityLevel,
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

    // Check for radar values - updated to match actual lowercase values
    const availabilityValue = screen.getByTestId("radar-availability-value");
    expect(availabilityValue).toBeInTheDocument();
    expect(availabilityValue.textContent).toBe("moderate");
  });

  it("displays appropriate security levels", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check component detail sections
    const confidentialityComponent = screen.getByTestId(
      "confidentiality-component"
    );
    const integrityComponent = screen.getByTestId("integrity-component");
    const availabilityComponent = screen.getByTestId("availability-component");

    expect(confidentialityComponent).toBeInTheDocument();
    expect(integrityComponent).toBeInTheDocument();
    expect(availabilityComponent).toBeInTheDocument();

    // Check level indicators - updated to match actual lowercase values
    const confidentialityLevel = screen.getByTestId(
      "confidentiality-level-indicator"
    );
    const integrityLevel = screen.getByTestId("integrity-level-indicator");
    const availabilityLevel = screen.getByTestId(
      "availability-level-indicator"
    );

    expect(confidentialityLevel.textContent).toBe("moderate");
    expect(integrityLevel.textContent).toBe("moderate");
    expect(availabilityLevel.textContent).toBe("moderate");
  });

  it("displays correct security score based on levels", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check security score
    const securityScore = screen.getByTestId("security-score-value");
    expect(securityScore).toBeInTheDocument();
    expect(securityScore.textContent).toBe("50");

    // Check security score bar
    const securityScoreBar = screen.getByTestId("security-score-bar");
    expect(securityScoreBar).toBeInTheDocument();
    expect(securityScoreBar.style.width).toBe("50%");
  });

  it("displays appropriate risk level based on security score", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check risk level
    const riskLevel = screen.getByTestId("risk-level");
    expect(riskLevel).toBeInTheDocument();
    expect(riskLevel.textContent).toBe("High Risk");
  });
});
