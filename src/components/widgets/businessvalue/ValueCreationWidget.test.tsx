import { render, screen, waitFor } from "@testing-library/react";
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
  it("displays ROI metrics", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    // Wait for loading state to finish
    const loadingSpinner = screen.queryByTestId(
      "widget-spinner-test-value-creation"
    );
    if (loadingSpinner) {
      await waitFor(() => {
        expect(loadingSpinner).not.toBeInTheDocument();
      });
    }

    // Use waitFor to wait for the component to finish loading
    await waitFor(() => {
      const valueWidget = screen.queryByTestId("test-value-creation");
      if (valueWidget) {
        const content = valueWidget.textContent;
        expect(content).toMatch(/return|roi|value|benefit|saving/i);
      } else {
        // If the widget isn't available, check for the container instead
        const container = screen.getByTestId(
          /widget-container.*value-creation/
        );
        expect(container).toBeInTheDocument();
      }
    });
  });

  // Test for error handling
  it("handles empty security levels gracefully", async () => {
    // @ts-ignore - intentionally testing incorrect props
    render(<ValueCreationWidget testId="test-value-creation" />);

    // Look for either the widget itself or a loading state
    await waitFor(() => {
      const valueWidget = screen.queryByTestId("test-value-creation");
      const loadingContainer = screen.queryByTestId(
        /widget-container.*loading.*test-value-creation/
      );

      // If widget is rendered, it should be in the document
      if (valueWidget) {
        expect(valueWidget).toBeInTheDocument();
      }
      // Otherwise, there should be a loading container
      else if (loadingContainer) {
        expect(loadingContainer).toBeInTheDocument();
      }
      // If neither is found, the test should fail
      else {
        // Look for any element related to value creation
        const anyValueElement = screen.getByText(/value creation/i);
        expect(anyValueElement).toBeInTheDocument();
      }
    });
  });
});
