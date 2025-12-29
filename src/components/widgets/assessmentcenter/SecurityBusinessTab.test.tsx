import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecurityBusinessTab, SecurityBusinessTabProps } from "./SecurityBusinessTab";

describe("SecurityBusinessTab", () => {
  const defaultProps: SecurityBusinessTabProps = {
    businessMaturityLevel: "Optimizing",
    businessMaturityDescription: "Advanced security practices with continuous improvement",
    securityScore: 75,
    costDetails: {
      totalCapex: 50000,
      totalOpex: 30000,
      totalCost: 80000,
    },
    testId: "security-business",
    roiEstimate: "18-24 months",
  };

  it("renders without crashing", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(
      screen.getByTestId(defaultProps.testId)
    ).toBeInTheDocument();
  });

  it("displays business value summary section", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(screen.getByText(/business value summary/i)).toBeInTheDocument();
  });

  it("displays business maturity level", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(screen.getByText("Optimizing")).toBeInTheDocument();
  });

  it("displays business maturity description", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(
      screen.getByText(/advanced security practices with continuous improvement/i)
    ).toBeInTheDocument();
  });

  it("uses security score for conditional business messaging", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    // Security score of 75 drives conditional text in ROI and capabilities sections
    expect(screen.getByText(/return from security investments/i)).toBeInTheDocument();
  });

  it("displays formatted total CAPEX", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    // formatCurrency should format 50000 to "$50,000"
    expect(screen.getByText(/\$50,000/)).toBeInTheDocument();
  });

  it("displays formatted total OPEX", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    // formatCurrency should format 30000 to "$30,000"
    expect(screen.getByText(/\$30,000/)).toBeInTheDocument();
  });

  it("displays formatted total cost", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    // formatCurrency should format 80000 to "$80,000"
    expect(screen.getByText(/\$80,000/)).toBeInTheDocument();
  });

  it("displays ROI estimate", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(screen.getByText("18-24 months")).toBeInTheDocument();
  });

  it("displays cost summary section", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(screen.getByText(/cost summary/i)).toBeInTheDocument();
  });

  it("displays ROI in business value section", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(screen.getByText(/estimated roi/i)).toBeInTheDocument();
  });

  it("displays business enablement section", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(screen.getByText(/business enablement/i)).toBeInTheDocument();
  });

  it("handles zero costs", () => {
    const zeroCostsProps = {
      ...defaultProps,
      costDetails: {
        totalCapex: 0,
        totalOpex: 0,
        totalCost: 0,
      },
    };
    
    render(<SecurityBusinessTab {...zeroCostsProps} />);
    expect(
      screen.getByTestId(zeroCostsProps.testId)
    ).toBeInTheDocument();
  });

  it("handles large cost values", () => {
    const largeCostsProps = {
      ...defaultProps,
      costDetails: {
        totalCapex: 1000000,
        totalOpex: 500000,
        totalCost: 1500000,
      },
    };
    
    render(<SecurityBusinessTab {...largeCostsProps} />);
    // formatCurrency should format 1000000 to "$1,000,000"
    expect(screen.getByText(/\$1,000,000/)).toBeInTheDocument();
  });

  it("renders with custom testId", () => {
    const customTestId = "custom-business-tab";
    render(<SecurityBusinessTab {...defaultProps} testId={customTestId} />);
    
    expect(
      screen.getByTestId(customTestId)
    ).toBeInTheDocument();
  });

  it("displays different maturity levels correctly", () => {
    const initialProps = { ...defaultProps, businessMaturityLevel: "Initial" };
    const { rerender } = render(<SecurityBusinessTab {...initialProps} />);
    expect(screen.getByText("Initial")).toBeInTheDocument();

    const managedProps = { ...defaultProps, businessMaturityLevel: "Managed" };
    rerender(<SecurityBusinessTab {...managedProps} />);
    expect(screen.getByText("Managed")).toBeInTheDocument();

    const definedProps = { ...defaultProps, businessMaturityLevel: "Defined" };
    rerender(<SecurityBusinessTab {...definedProps} />);
    expect(screen.getByText("Defined")).toBeInTheDocument();
  });

  it("uses security score for ROI messaging", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    // Security score of 75 should show "Good return from security investments"
    expect(screen.getByText(/return from security investments/i)).toBeInTheDocument();
  });

  it("handles different ROI estimates", () => {
    const shortRoiProps = { ...defaultProps, roiEstimate: "6-12 months" };
    const { rerender } = render(<SecurityBusinessTab {...shortRoiProps} />);
    expect(screen.getByText("6-12 months")).toBeInTheDocument();

    const longRoiProps = { ...defaultProps, roiEstimate: "36-48 months" };
    rerender(<SecurityBusinessTab {...longRoiProps} />);
    expect(screen.getByText("36-48 months")).toBeInTheDocument();
  });

  it("displays business value description", () => {
    render(<SecurityBusinessTab {...defaultProps} />);
    expect(
      screen.getByText(/business value and financial impact/i)
    ).toBeInTheDocument();
  });
});
