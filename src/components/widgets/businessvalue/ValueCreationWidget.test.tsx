import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { VALUE_CREATION_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import ValueCreationWidget from "./ValueCreationWidget";

// Mock the useCIAOptions hook
vi.mock("../../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" },
    },
    integrityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" },
    },
    confidentialityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No return" },
      LOW: { returnRate: "50%", description: "Low return" },
      MODERATE: { returnRate: "150%", description: "Moderate return" },
      HIGH: { returnRate: "300%", description: "High return" },
      VERY_HIGH: { returnRate: "500%", description: "Very high return" },
    },
    getValuePoints: (level: SecurityLevel) => {
      const valuePoints = {
        None: ["No significant value points"],
        Low: ["Basic value point 1", "Basic value point 2"],
        Moderate: ["Moderate value point 1", "Moderate value point 2"],
        High: ["High value point 1", "High value point 2"],
        "Very High": ["Very high value point 1", "Very high value point 2"],
      };
      return valuePoints[level] || [];
    },
  }),
}));

describe("ValueCreationWidget", () => {
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
    render(<ValueCreationWidget {...defaultProps} />);
    expect(screen.getByText("Value Creation")).toBeInTheDocument();
  });

  it("displays ROI information correctly", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    expect(screen.getByText("Return on Investment")).toBeInTheDocument();
    expect(
      screen.getByTestId(VALUE_CREATION_TEST_IDS.ROI_VALUE)
    ).toHaveTextContent("150%");
    expect(
      screen.getByTestId(VALUE_CREATION_TEST_IDS.ROI_DESCRIPTION)
    ).toHaveTextContent("Moderate return");
  });

  it("displays value points correctly", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    expect(screen.getByText("Business Value Created")).toBeInTheDocument();
    expect(screen.getByText("Moderate value point 1")).toBeInTheDocument();
    expect(screen.getByText("Moderate value point 2")).toBeInTheDocument();
  });

  it("displays business impact categories", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    expect(screen.getByText("Value Impact by Category")).toBeInTheDocument();
    // Check if financial category is displayed
    expect(screen.getByText("financial")).toBeInTheDocument();
    // Check if operational category is displayed
    expect(screen.getByText("operational")).toBeInTheDocument();
  });

  it("displays recommendations section", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    expect(
      screen.getByText("Value Maximization Recommendations")
    ).toBeInTheDocument();
  });

  it("uses correct styling based on security level", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    const roiValue = screen.getByTestId(VALUE_CREATION_TEST_IDS.ROI_VALUE);
    expect(roiValue).toBeInTheDocument();
  });

  it("handles different security levels appropriately", () => {
    // Test with Low security level
    render(
      <ValueCreationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );
    expect(
      screen.getByTestId(VALUE_CREATION_TEST_IDS.ROI_VALUE)
    ).toHaveTextContent("50%");

    // Clean up
    screen.unmount();

    // Test with High security level
    render(
      <ValueCreationWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );
    expect(
      screen.getByTestId(VALUE_CREATION_TEST_IDS.ROI_VALUE)
    ).toHaveTextContent("300%");
  });

  it("shows different recommendations based on security level", () => {
    // Test with Low security level
    render(
      <ValueCreationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );
    expect(
      screen.getByText(/Increase security levels to achieve positive ROI/)
    ).toBeInTheDocument();

    // Clean up
    screen.unmount();

    // Test with Very High security level
    render(
      <ValueCreationWidget
        availabilityLevel="Very High"
        integrityLevel="Very High"
        confidentialityLevel="Very High"
      />
    );
    expect(
      screen.getByText(
        /Develop premium service offerings with strong security guarantees/
      )
    ).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    render(<ValueCreationWidget {...defaultProps} />);
    expect(screen.getByTestId("custom-test-id")).toHaveClass("custom-class");
  });

  it("renders with default props", () => {
    render(
      <ValueCreationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(screen.getByTestId("widget-value-creation")).toBeInTheDocument();
  });
});
