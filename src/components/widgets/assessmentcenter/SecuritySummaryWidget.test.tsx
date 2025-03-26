import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import SecuritySummaryWidget from "./SecuritySummaryWidget";

// Mock dependencies
vi.mock("../../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { description: "None level", businessImpact: "Critical risk" },
      Low: { description: "Low level", businessImpact: "High risk" },
      Moderate: {
        description: "Moderate level",
        businessImpact: "Medium risk",
      },
      High: { description: "High level", businessImpact: "Low risk" },
      "Very High": {
        description: "Very High level",
        businessImpact: "Minimal risk",
      },
    },
    integrityOptions: {
      None: { description: "None level", businessImpact: "Critical risk" },
      Low: { description: "Low level", businessImpact: "High risk" },
      Moderate: {
        description: "Moderate level",
        businessImpact: "Medium risk",
      },
      High: { description: "High level", businessImpact: "Low risk" },
      "Very High": {
        description: "Very High level",
        businessImpact: "Minimal risk",
      },
    },
    confidentialityOptions: {
      None: { description: "None level", businessImpact: "Critical risk" },
      Low: { description: "Low level", businessImpact: "High risk" },
      Moderate: {
        description: "Moderate level",
        businessImpact: "Medium risk",
      },
      High: { description: "High level", businessImpact: "Low risk" },
      "Very High": {
        description: "Very High level",
        businessImpact: "Minimal risk",
      },
    },
  }),
}));

describe("SecuritySummaryWidget", () => {
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
    render(<SecuritySummaryWidget {...defaultProps} />);

    expect(screen.getByText("Security Summary")).toBeInTheDocument();
    // Update to use the correct testId with the widget-container prefix
    expect(
      screen.getByTestId("widget-container-custom-test-id")
    ).toBeInTheDocument();
  });

  it("displays the overall security level", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.OVERALL_LEVEL)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.OVERALL_LEVEL).textContent
    ).toContain("Moderate");
  });

  it("displays individual component levels", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_LEVEL)
    ).toHaveTextContent("Moderate");
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.INTEGRITY_LEVEL)
    ).toHaveTextContent("Moderate");
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_LEVEL)
    ).toHaveTextContent("Moderate");
  });

  it("displays security summary description", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.SUMMARY_DESCRIPTION)
    ).toBeInTheDocument();
  });

  it("calculates correct overall level for mixed inputs", () => {
    render(
      <SecuritySummaryWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Overall level should be "Moderate" when averaging High, Moderate, and Low
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.OVERALL_LEVEL).textContent
    ).toContain("Moderate");
  });

  it("displays security cards for each component", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD)
    ).toBeInTheDocument();
  });

  it("shows appropriate risk levels for security levels", () => {
    render(
      <SecuritySummaryWidget
        availabilityLevel="None"
        integrityLevel="Low"
        confidentialityLevel="High"
      />
    );

    // Check if risk levels are displayed
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_RISK)
    ).toHaveTextContent(/critical/i);
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.INTEGRITY_RISK)
    ).toHaveTextContent(/high/i);
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_RISK)
    ).toHaveTextContent(/low/i);
  });

  it("applies custom class name when provided", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    // Update to use the correct testId with the widget-container prefix
    expect(screen.getByTestId("widget-container-custom-test-id")).toHaveClass(
      "custom-class"
    );
  });

  it("uses default test ID when not provided", () => {
    render(
      <SecuritySummaryWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Update to use the correct testId with the widget-container prefix
    expect(
      screen.getByTestId("widget-container-security-summary-widget")
    ).toBeInTheDocument();
  });
});
