import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import CostEstimationWidget from "./CostEstimationWidget";

// Mock the hooks
vi.mock("../../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 10, opex: 5 },
      High: { capex: 15, opex: 8 },
      "Very High": { capex: 20, opex: 10 },
    },
    integrityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 10, opex: 5 },
      High: { capex: 15, opex: 8 },
      "Very High": { capex: 20, opex: 10 },
    },
    confidentialityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 10, opex: 5 },
      High: { capex: 15, opex: 8 },
      "Very High": { capex: 20, opex: 10 },
    },
    ROI_ESTIMATES: {
      NONE: {
        returnRate: "0%",
        description: "No security investment means no return",
        potentialSavings: "$0",
        breakEvenPeriod: "N/A",
      },
      LOW: {
        returnRate: "100%",
        description: "Basic security provides minimal return",
        potentialSavings: "$10,000",
        breakEvenPeriod: "24 months",
      },
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good value",
        potentialSavings: "$50,000",
        breakEvenPeriod: "18 months",
      },
      HIGH: {
        returnRate: "350%",
        description: "Advanced security provides significant protection",
        potentialSavings: "$250,000",
        breakEvenPeriod: "12 months",
      },
      VERY_HIGH: {
        returnRate: "500%",
        description: "Maximum security provides optimal protection",
        potentialSavings: "$500,000",
        breakEvenPeriod: "6 months",
      },
    },
  }),
}));

describe("CostEstimationWidget", () => {
  // Define default props
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "test-cost-estimation",
  };

  it("renders without crashing", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByTestId("test-cost-estimation")).toBeInTheDocument();
  });

  it("displays cost estimation title", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText(/cost estimation/i)).toBeInTheDocument();
  });

  it("calculates and displays costs based on security levels", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    
    // Get the content and check for cost indicators
    const content = screen.getByTestId("test-cost-estimation").textContent;
    
    // Check for standard cost terms that should be present
    expect(content).toMatch(/capex|capital|investment|initial cost/i);
    expect(content).toMatch(/opex|operational|maintenance|ongoing cost/i);
  });

  it("updates costs for different security levels", () => {
    // Render with low security levels
    const { rerender } = render(
      <CostEstimationWidget
        availabilityLevel="Low" as SecurityLevel
        integrityLevel="Low" as SecurityLevel
        confidentialityLevel="Low" as SecurityLevel
        testId="test-cost-estimation"
      />
    );
    
    const lowContent = screen.getByTestId("test-cost-estimation").textContent;
    
    // Rerender with high security levels
    rerender(
      <CostEstimationWidget
        availabilityLevel="High" as SecurityLevel
        integrityLevel="High" as SecurityLevel
        confidentialityLevel="High" as SecurityLevel
        testId="test-cost-estimation"
      />
    );
    
    const highContent = screen.getByTestId("test-cost-estimation").textContent;
    
    // Costs should be different between low and high
    expect(lowContent).not.toEqual(highContent);
  });

  it("handles mixed security levels", () => {
    render(
      <CostEstimationWidget
        availabilityLevel="Low" as SecurityLevel
        integrityLevel="Moderate" as SecurityLevel
        confidentialityLevel="High" as SecurityLevel
        testId="test-cost-estimation"
      />
    );
    
    // Content should exist - we're just checking it renders here
    expect(screen.getByTestId("test-cost-estimation").textContent).not.toBe("");
  });

  it("accepts a custom testId", () => {
    const customTestId = "custom-cost-widget";
    render(<CostEstimationWidget {...defaultProps} testId={customTestId} />);
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  // Test breakdown of costs
  it("shows breakdown of costs", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    
    // Test for presence of cost breakdowns
    const content = screen.getByTestId("test-cost-estimation").textContent;
    expect(content).toMatch(/availability|integrity|confidentiality/i);
  });

  // Test for error handling
  it("handles empty security levels gracefully", () => {
    // @ts-ignore - intentionally testing incorrect props
    render(<CostEstimationWidget testId="test-cost-estimation" />);
    
    // Should not crash, component should render something
    expect(screen.getByTestId("test-cost-estimation")).toBeInTheDocument();
  });
});