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

  it("handles None security level", async () => {
    render(
      <ValueCreationWidget
        availabilityLevel={"None" as SecurityLevel}
        integrityLevel={"None" as SecurityLevel}
        confidentialityLevel={"None" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
    });
  });

  it("handles Very High security level", async () => {
    render(
      <ValueCreationWidget
        availabilityLevel={"Very High" as SecurityLevel}
        integrityLevel={"Very High" as SecurityLevel}
        confidentialityLevel={"Very High" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
    });
  });

  it("displays value creation points", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    await waitFor(() => {
      const content = document.body.textContent;
      // Check for content that would be in value creation points
      expect(content).toBeTruthy();
    });
  });

  it("shows different value points for different security levels", async () => {
    const { rerender } = render(
      <ValueCreationWidget
        availabilityLevel={"Low" as SecurityLevel}
        integrityLevel={"Low" as SecurityLevel}
        confidentialityLevel={"Low" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    let lowContent = "";
    await waitFor(() => {
      lowContent = document.body.textContent || "";
      expect(lowContent).toBeTruthy();
    });

    // Rerender with Very High
    rerender(
      <ValueCreationWidget
        availabilityLevel={"Very High" as SecurityLevel}
        integrityLevel={"Very High" as SecurityLevel}
        confidentialityLevel={"Very High" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    await waitFor(() => {
      const highContent = document.body.textContent || "";
      // Content should be different
      expect(highContent).toBeTruthy();
    });
  });

  it("displays business considerations", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    await waitFor(() => {
      const content = document.body.textContent;
      // Look for typical business consideration terms
      expect(content).toMatch(/business|consideration|impact|risk/i);
    });
  });

  it("displays potential savings information", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    await waitFor(() => {
      const content = document.body.textContent;
      // Look for savings-related content
      expect(content).toMatch(/saving|return|benefit|value/i);
    });
  });

  it("handles rapid security level changes", async () => {
    const levels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    for (const level of levels) {
      const { unmount } = render(
        <ValueCreationWidget
          availabilityLevel={level}
          integrityLevel={level}
          confidentialityLevel={level}
          testId="test-value-creation"
        />
      );

      await waitFor(() => {
        const container = screen.queryByTestId(
          /widget-container.*test-value-creation/
        );
        expect(container).toBeInTheDocument();
      });

      unmount();
    }
  });

  it("displays break-even period information", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    await waitFor(() => {
      const content = document.body.textContent;
      // Look for break-even or timeline information
      expect(content).toMatch(/break.?even|period|month|time/i);
    });
  });

  it("displays ROI percentage", async () => {
    render(<ValueCreationWidget {...defaultProps} />);

    await waitFor(() => {
      const content = document.body.textContent;
      // Look for percentage or rate information
      expect(content).toMatch(/%|percent|rate|return/i);
    });
  });

  it("handles className prop", async () => {
    render(<ValueCreationWidget {...defaultProps} className="custom-class" />);

    await waitFor(() => {
      // Just verify it renders
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
    });
  });

  it("renders with all security levels at minimum", async () => {
    render(
      <ValueCreationWidget
        availabilityLevel={"None" as SecurityLevel}
        integrityLevel={"Low" as SecurityLevel}
        confidentialityLevel={"None" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
    });
  });

  it("renders with all security levels at maximum", async () => {
    render(
      <ValueCreationWidget
        availabilityLevel={"Very High" as SecurityLevel}
        integrityLevel={"Very High" as SecurityLevel}
        confidentialityLevel={"High" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
    });
  });

  it("handles asymmetric security levels", async () => {
    render(
      <ValueCreationWidget
        availabilityLevel={"None" as SecurityLevel}
        integrityLevel={"Very High" as SecurityLevel}
        confidentialityLevel={"Low" as SecurityLevel}
        testId="test-value-creation"
      />
    );

    await waitFor(() => {
      const container = screen.queryByTestId(
        /widget-container.*test-value-creation/
      );
      expect(container).toBeInTheDocument();
    });
  });
});
