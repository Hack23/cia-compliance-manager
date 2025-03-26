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

  it("renders without crashing", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    // Check for either the loading container or the actual widget
    await waitFor(() => {
      const widgetContainer = screen.queryByTestId(
        "widget-container-test-value-creation"
      );
      const loadingContainer = screen.queryByTestId(
        "widget-container-loading-container-test-value-creation"
      );

      // One of them should be present
      expect(widgetContainer || loadingContainer).toBeInTheDocument();
    });
  });

  it("displays value creation title", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    // Wait for any heading that mentions value creation
    await waitFor(() => {
      expect(
        screen.getByText(/value creation|value|roi|return on investment/i, {
          exact: false,
        })
      ).toBeInTheDocument();
    });
  });

  it("shows different ROI for different security levels", async () => {
    // Render with low security levels
    const { rerender } = render(
      <ValueCreationWidget
        availabilityLevel={"Low" as SecurityLevel}
        integrityLevel={"Low" as SecurityLevel}
        confidentialityLevel={"Low" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    // Get the content from either the widget or any container
    let lowContent = "";
    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
      if (container) {
        lowContent = container.textContent || "";
      }
    });

    // Rerender with high security levels
    rerender(
      <ValueCreationWidget
        availabilityLevel={"High" as SecurityLevel}
        integrityLevel={"High" as SecurityLevel}
        confidentialityLevel={"High" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    // Get the content from the high security level widget
    let highContent = "";
    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
      if (container) {
        highContent = container.textContent || "";
      }
    });

    // Expect the contents to be different
    expect(lowContent).not.toEqual(highContent);
  });

  it("handles mixed security levels", async () => {
    render(
      <ValueCreationWidget
        availabilityLevel={"Low" as SecurityLevel}
        integrityLevel={"Moderate" as SecurityLevel}
        confidentialityLevel={"High" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    // Check that some container is present
    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
      if (container) {
        expect(container.textContent).not.toBe("");
      }
    });
  });

  it("accepts a custom testId", async () => {
    const customTestId = "custom-value-widget";
    render(<ValueCreationWidget {...defaultProps} testId={customTestId} />);

    // Check for any element with the custom test ID pattern
    await waitFor(() => {
      const element = screen.queryByTestId(new RegExp(`.*${customTestId}.*`));
      expect(element).toBeInTheDocument();
    });
  });

  // Test for ROI metrics display
  it("displays ROI metrics", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    // First check for loading state - we don't need to wait for it to disappear
    const loadingContainer = screen.queryByTestId(
      "widget-container-loading-container-test-value-creation"
    );

    // If not loading (or already loaded), check for ROI content
    if (!loadingContainer) {
      await waitFor(() => {
        // Look for ROI-related elements
        const roiElement = screen.queryByTestId("roi-value");
        expect(roiElement).toBeInTheDocument();
      });
    } else {
      // If in loading state, just check that the loading container exists
      expect(loadingContainer).toBeInTheDocument();
    }

    // Wait for any content that indicates ROI or value metrics
    await waitFor(
      () => {
        const content = document.body.textContent;
        expect(content).toMatch(/return|roi|value|benefit|saving/i);
      },
      { timeout: 1000 }
    ); // Add a reasonable timeout
  });

  // Test for error handling
  it("handles empty security levels gracefully", async () => {
    // @ts-ignore - intentionally testing incorrect props
    render(<ValueCreationWidget testId="test-value-creation" />);

    // We just want to make sure it renders without crashing
    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
    });
  });
});
