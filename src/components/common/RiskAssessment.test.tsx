import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import RiskAssessment from "./RiskAssessment";

// Mock the utility functions used by this component
vi.mock("../../utils", async () => {
  const actual = (await vi.importActual("../../utils")) as object;
  return {
    ...actual,
    getRiskLevelFromSecurityLevel: vi.fn((level: SecurityLevel) => {
      switch (level) {
        case "None":
          return "Critical Risk";
        case "Low":
          return "High Risk";
        case "Moderate":
          return "Medium Risk";
        case "High":
          return "Low Risk";
        case "Very High":
          return "Minimal Risk";
        default:
          return "Unknown Risk";
      }
    }),
    getRiskScoreFromSecurityLevel: vi.fn((level: SecurityLevel) => {
      switch (level) {
        case "None":
          return 100;
        case "Low":
          return 75;
        case "Moderate":
          return 50;
        case "High":
          return 25;
        case "Very High":
          return 0;
        default:
          return 0;
      }
    }),
  };
});

describe("RiskAssessment", () => {
  it("renders compact version correctly", () => {
    render(
      <RiskAssessment securityLevel="Moderate" compact testId="risk-test" />
    );

    // Should show "Risk:" label and a badge
    expect(screen.getByText("Risk:")).toBeInTheDocument();
    expect(screen.getByTestId("risk-test-level")).toBeInTheDocument();

    // Should not render the progress bar or description
    expect(screen.queryByTestId("risk-test-score")).not.toBeInTheDocument();
  });

  it("renders full version correctly", () => {
    render(<RiskAssessment securityLevel="Moderate" testId="risk-test" />);

    // Should render header, badge, progress bar, and description
    expect(screen.getByText("Risk Assessment")).toBeInTheDocument();
    expect(screen.getByTestId("risk-test-level")).toBeInTheDocument();
    expect(screen.getByTestId("risk-test-score")).toBeInTheDocument();

    // Description should be present for medium risk
    const description = screen.getByText(
      /Moderate risk that should be managed with appropriate controls./i
    );
    expect(description).toBeInTheDocument();
  });

  it("shows correct risk level for each security level", () => {
    const { rerender } = render(
      <RiskAssessment securityLevel="None" testId="risk-test" />
    );
    expect(screen.getByTestId("risk-test-level")).toHaveTextContent(
      "Critical Risk"
    );

    rerender(<RiskAssessment securityLevel="Low" testId="risk-test" />);
    expect(screen.getByTestId("risk-test-level")).toHaveTextContent(
      "High Risk"
    );

    rerender(<RiskAssessment securityLevel="Moderate" testId="risk-test" />);
    expect(screen.getByTestId("risk-test-level")).toHaveTextContent(
      "Medium Risk"
    );

    rerender(<RiskAssessment securityLevel="High" testId="risk-test" />);
    expect(screen.getByTestId("risk-test-level")).toHaveTextContent("Low Risk");

    rerender(<RiskAssessment securityLevel="Very High" testId="risk-test" />);
    expect(screen.getByTestId("risk-test-level")).toHaveTextContent(
      "Minimal Risk"
    );
  });

  it("displays correct progress bar width based on risk score", () => {
    const { rerender } = render(
      <RiskAssessment securityLevel="None" testId="risk-test" />
    );
    let progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar).toHaveStyle({ width: "100%" });

    rerender(<RiskAssessment securityLevel="Low" testId="risk-test" />);
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar).toHaveStyle({ width: "75%" });

    rerender(<RiskAssessment securityLevel="Moderate" testId="risk-test" />);
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar).toHaveStyle({ width: "50%" });

    rerender(<RiskAssessment securityLevel="High" testId="risk-test" />);
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar).toHaveStyle({ width: "25%" });

    rerender(<RiskAssessment securityLevel="Very High" testId="risk-test" />);
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar).toHaveStyle({ width: "0%" });
  });

  it("uses correct color for risk levels", () => {
    const { rerender } = render(
      <RiskAssessment securityLevel="None" testId="risk-test" />
    );
    // Critical risk (score > 70) should be red
    let progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar.className).toContain("bg-red-500");

    rerender(<RiskAssessment securityLevel="Low" testId="risk-test" />);
    // High risk (score > 70) should be red
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar.className).toContain("bg-red-500");

    rerender(<RiskAssessment securityLevel="Moderate" testId="risk-test" />);
    // Medium risk (score > 40 and <= 70) should be yellow
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar.className).toContain("bg-yellow-500");

    rerender(<RiskAssessment securityLevel="High" testId="risk-test" />);
    // Low risk (score <= 40) should be green
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar.className).toContain("bg-green-500");

    rerender(<RiskAssessment securityLevel="Very High" testId="risk-test" />);
    // Minimal risk (score = 0) should be green
    progressBar = screen.getByTestId("risk-test-score");
    expect(progressBar.className).toContain("bg-green-500");
  });

  it("shows appropriate risk descriptions", () => {
    const { rerender } = render(
      <RiskAssessment securityLevel="None" testId="risk-test" />
    );
    expect(
      screen.getByText(/Critical risk requires immediate action/i)
    ).toBeInTheDocument();

    rerender(<RiskAssessment securityLevel="Low" testId="risk-test" />);
    expect(
      screen.getByText(/High risk should be addressed with priority/i)
    ).toBeInTheDocument();

    rerender(<RiskAssessment securityLevel="Moderate" testId="risk-test" />);
    expect(
      screen.getByText(/Moderate risk that should be managed/i)
    ).toBeInTheDocument();

    rerender(<RiskAssessment securityLevel="High" testId="risk-test" />);
    expect(
      screen.getByText(/Low risk with limited potential/i)
    ).toBeInTheDocument();

    rerender(<RiskAssessment securityLevel="Very High" testId="risk-test" />);
    expect(
      screen.getByText(/Minimal risk with negligible potential/i)
    ).toBeInTheDocument();
  });
});
