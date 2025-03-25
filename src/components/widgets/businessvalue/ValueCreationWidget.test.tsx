import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import ValueCreationWidget from "./ValueCreationWidget";

// Mock the hooks
vi.mock("../../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
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

describe("ValueCreationWidget", () => {
  // Define default props
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "test-value-creation",
  };

  it("renders without crashing", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    expect(screen.getByTestId("test-value-creation")).toBeInTheDocument();
  });

  it("displays value creation title", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    expect(
      screen.getByText(/value creation|value|roi|return on investment/i, {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("shows different ROI for different security levels", () => {
    // Render with low security levels
    const { rerender } = render(
      <ValueCreationWidget
        availabilityLevel={"Low" as SecurityLevel}
        integrityLevel={"Low" as SecurityLevel}
        confidentialityLevel={"Low" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    const lowContent = screen.getByTestId("test-value-creation").textContent;

    // Rerender with high security levels
    rerender(
      <ValueCreationWidget
        availabilityLevel={"High" as SecurityLevel}
        integrityLevel={"High" as SecurityLevel}
        confidentialityLevel={"High" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    const highContent = screen.getByTestId("test-value-creation").textContent;

    // ROI information should be different between low and high
    expect(lowContent).not.toEqual(highContent);
  });

  it("handles mixed security levels", () => {
    render(
      <ValueCreationWidget
        availabilityLevel={"Low" as SecurityLevel}
        integrityLevel={"Moderate" as SecurityLevel}
        confidentialityLevel={"High" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    // Content should exist - we're just checking it renders here
    expect(screen.getByTestId("test-value-creation").textContent).not.toBe("");
  });

  it("accepts a custom testId", () => {
    const customTestId = "custom-value-widget";
    render(<ValueCreationWidget {...defaultProps} testId={customTestId} />);
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  // Test for ROI metrics display
  it("displays ROI metrics", () => {
    render(<ValueCreationWidget {...defaultProps} />);

    // Test for presence of ROI metrics
    const content = screen.getByTestId("test-value-creation").textContent;
    expect(content).toMatch(/return|roi|value|benefit|saving/i);
  });

  // Test for error handling
  it("handles empty security levels gracefully", () => {
    // @ts-ignore - intentionally testing incorrect props
    render(<ValueCreationWidget testId="test-value-creation" />);

    // Should not crash, component should render something
    expect(screen.getByTestId("test-value-creation")).toBeInTheDocument();
  });
});
