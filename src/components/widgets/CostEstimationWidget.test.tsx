import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CostEstimationWidget from "./CostEstimationWidget";
import { COST_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import { SecurityLevel } from "../../types/cia";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getSecurityMetrics: vi.fn().mockReturnValue({
      totalCapex: 45,
      totalOpex: 30,
      capexEstimate: "$225000",
      opexEstimate: "$60000/year",
      isSmallSolution: true,
      roi: "350%",
    }),
  },
}));

describe("CostEstimationWidget", () => {
  const defaultProps = {
    availabilityLevel: "High" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "High" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByText("Estimated Implementation Cost")
    ).toBeInTheDocument();
  });

  // Replace all test cases that use totalCapex/totalOpex props directly
  // with the new props structure that uses availabilityLevel, integrityLevel, and confidentialityLevel

  it("displays cost estimates from service", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE)
    ).toHaveTextContent("$225,000");
    expect(
      screen.getByTestId(COST_TEST_IDS.OPEX_ESTIMATE_VALUE)
    ).toHaveTextContent("$60,000/year");
  });

  it("calculates 3-year total cost", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL)
    ).toHaveTextContent("$405,000");
  });

  it("shows correct ROI estimate", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByTestId(COST_TEST_IDS.ROI_ESTIMATE)).toHaveTextContent(
      "350%"
    );
  });

  it("displays progress bars with correct percentages", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COST_TEST_IDS.CAPEX_PERCENTAGE)
    ).toHaveTextContent("25%");
    expect(screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE)).toHaveTextContent(
      "25%"
    );
  });

  it("uses correct cost analysis message for small solution", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COST_TEST_IDS.COST_ANALYSIS_TEXT)
    ).toHaveTextContent(/Basic security implementation/);
  });

  it("uses correct cost analysis message for large solution", () => {
    vi.mocked(ciaContentService.getSecurityMetrics).mockReturnValueOnce({
      totalCapex: 120,
      totalOpex: 80,
      capexEstimate: "$600000",
      opexEstimate: "$160000/year",
      isSmallSolution: false,
      roi: "275%",
    });

    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COST_TEST_IDS.COST_ANALYSIS_TEXT)
    ).toHaveTextContent(/Comprehensive security solution/);
  });
});
