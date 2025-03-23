import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { COST_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import CostEstimationWidget from "./CostEstimationWidget";

// Mock the useCIAOptions hook
vi.mock("../../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { description: "None level", capex: 0, opex: 0 },
      Low: { description: "Low level", capex: 5, opex: 2 },
      Moderate: { description: "Moderate level", capex: 10, opex: 5 },
      High: { description: "High level", capex: 15, opex: 8 },
      "Very High": { description: "Very High level", capex: 20, opex: 10 },
    },
    integrityOptions: {
      None: { description: "None level", capex: 0, opex: 0 },
      Low: { description: "Low level", capex: 5, opex: 2 },
      Moderate: { description: "Moderate level", capex: 10, opex: 5 },
      High: { description: "High level", capex: 15, opex: 8 },
      "Very High": { description: "Very High level", capex: 20, opex: 10 },
    },
    confidentialityOptions: {
      None: { description: "None level", capex: 0, opex: 0 },
      Low: { description: "Low level", capex: 5, opex: 2 },
      Moderate: { description: "Moderate level", capex: 10, opex: 5 },
      High: { description: "High level", capex: 15, opex: 8 },
      "Very High": { description: "Very High level", capex: 20, opex: 10 },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No return" },
      LOW: { returnRate: "50%", description: "Low return" },
      MODERATE: { returnRate: "150%", description: "Moderate return" },
      HIGH: { returnRate: "300%", description: "High return" },
      VERY_HIGH: { returnRate: "500%", description: "Very high return" },
    },
  }),
}));

describe("CostEstimationWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    className: "custom-class",
    testId: "custom-test-id",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Cost Estimation")).toBeInTheDocument();
  });

  it("displays implementation time correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByText("Estimated Implementation Time")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.IMPLEMENTATION_TIME)
    ).toBeInTheDocument();
  });

  it("calculates CAPEX costs correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByText("Implementation Costs (CAPEX)")
    ).toBeInTheDocument();
    // Since each component at Moderate level has a capex of 10, the total should be 30
    const capexSection = screen.getByTestId(COST_TEST_IDS.CAPEX_SECTION);
    expect(capexSection).toBeInTheDocument();

    // Check capex value and percentage
    const percentageDisplay = screen.getByTestId(
      COST_TEST_IDS.CAPEX_PERCENTAGE
    );
    // 30/60 * 100 = 50%
    expect(percentageDisplay.textContent).toBe("50%");
  });

  it("calculates OPEX costs correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Ongoing Maintenance (OPEX)")).toBeInTheDocument();
    // Since each component at Moderate level has an opex of 5, the total should be 15
    const opexSection = screen.getByTestId(COST_TEST_IDS.OPEX_SECTION);
    expect(opexSection).toBeInTheDocument();

    // Check opex percentage
    const percentageDisplay = screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE);
    // 15/30 * 100 = 50%
    expect(percentageDisplay.textContent).toBe("50%");
  });

  it("displays total cost information", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Total Cost of Ownership")).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL)
    ).toBeInTheDocument();
    // Total cost should be CAPEX + (OPEX * 36 months)
    // 30 + (15 * 36) = 30 + 540 = 570
  });

  it("displays ROI information", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Return on Investment")).toBeInTheDocument();
    expect(screen.getByTestId(COST_TEST_IDS.ROI_ESTIMATE)).toHaveTextContent(
      "150%"
    );
  });

  it("handles different security levels", () => {
    // Test with Low security levels
    render(
      <CostEstimationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // With Low security levels, capex should be 15 (5 per component)
    // and opex should be 6 (2 per component)
    expect(screen.getByTestId(COST_TEST_IDS.CAPEX_PERCENTAGE).textContent).toBe(
      "25%"
    ); // 15/60 * 100
    expect(screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE).textContent).toBe(
      "20%"
    ); // 6/30 * 100
    expect(screen.getByTestId(COST_TEST_IDS.ROI_ESTIMATE)).toHaveTextContent(
      "50%"
    );

    // Clean up
    screen.unmount();

    // Test with High security levels
    render(
      <CostEstimationWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // With High security levels, capex should be 45 (15 per component)
    // and opex should be 24 (8 per component)
    expect(screen.getByTestId(COST_TEST_IDS.CAPEX_PERCENTAGE).textContent).toBe(
      "75%"
    ); // 45/60 * 100
    expect(screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE).textContent).toBe(
      "80%"
    ); // 24/30 * 100
    expect(screen.getByTestId(COST_TEST_IDS.ROI_ESTIMATE)).toHaveTextContent(
      "300%"
    );
  });

  it("handles mixed security levels", () => {
    render(
      <CostEstimationWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // With Mixed security levels: High (15), Moderate (10), Low (5) = 30 for capex
    // and High (8), Moderate (5), Low (2) = 15 for opex
    expect(screen.getByTestId(COST_TEST_IDS.CAPEX_PERCENTAGE).textContent).toBe(
      "50%"
    ); // 30/60 * 100
    expect(screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE).textContent).toBe(
      "50%"
    ); // 15/30 * 100
  });

  it("formats currency values correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);

    // Check for currency formatting in various places
    const capexValue = screen.getByTestId(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE);
    expect(capexValue.textContent).toMatch(/\$[0-9,]+/); // Should match currency format

    const opexValue = screen.getByTestId(COST_TEST_IDS.OPEX_ESTIMATE_VALUE);
    expect(opexValue.textContent).toMatch(/\$[0-9,]+/); // Should match currency format

    const totalCost = screen.getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL);
    expect(totalCost.textContent).toMatch(/\$[0-9,]+/); // Should match currency format
  });

  it("renders with custom props", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    const widget = screen.getByTestId("custom-test-id");
    expect(widget).toHaveClass("custom-class");
  });

  it("renders with default props", () => {
    render(
      <CostEstimationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(screen.getByTestId("widget-cost-estimation")).toBeInTheDocument();
  });
});
