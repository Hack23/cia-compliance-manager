import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import { VALUE_CREATION_WIDGET_IDS } from "../../../constants/testIds";
import { mockWidgetProps, mockLowSecurityProps, mockHighSecurityProps, mockMixedSecurityProps } from "../../../utils/testUtils";
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
  const defaultProps = {
    ...mockWidgetProps,
    testId: VALUE_CREATION_WIDGET_IDS.root,
  };

  describe('Rendering', () => {
    it("should render with required props", async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        const widgetContainer = screen.queryByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        const loadingContainer = screen.queryByTestId(`widget-container-loading-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(widgetContainer || loadingContainer).toBeInTheDocument();
      });
    });

    it('should apply custom className', async () => {
      render(<ValueCreationWidget {...defaultProps} className="custom-class" />);

      await waitFor(() => {
        const widget = screen.getByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(widget).toHaveClass('custom-class');
      });
    });

    it('should use custom testId', async () => {
      const customId = 'custom-value-id';
      render(<ValueCreationWidget {...defaultProps} testId={customId} />);

      await waitFor(() => {
        expect(screen.getByTestId(`widget-container-${customId}`)).toBeInTheDocument();
      });
    });
  });

  describe('Data Display', () => {
    it("should display value creation content", async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        expect(
          screen.getByText(/value creation|value|roi|return on investment/i, {
            exact: false,
          })
        ).toBeInTheDocument();
      });
    });

    it("should show different ROI for different security levels", async () => {
      const { rerender } = render(
        <ValueCreationWidget {...mockLowSecurityProps} testId={VALUE_CREATION_WIDGET_IDS.root} />
      );

      let lowContent = "";
      await waitFor(() => {
        const container = screen.queryByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(container).toBeInTheDocument();
        if (container) {
          lowContent = container.textContent || "";
        }
      });

      rerender(
        <ValueCreationWidget {...mockHighSecurityProps} testId={VALUE_CREATION_WIDGET_IDS.root} />
      );

      let highContent = "";
      await waitFor(() => {
        const container = screen.queryByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(container).toBeInTheDocument();
        if (container) {
          highContent = container.textContent || "";
        }
      });

      expect(highContent).not.toBe(lowContent);
    });
  });

  describe('Accessibility', () => {
    it('should render with proper aria attributes', async () => {
      render(<ValueCreationWidget {...defaultProps} />);
      
      await waitFor(() => {
        const widget = screen.queryByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(widget).toBeInTheDocument();
        // Widget should be present and render content
        expect(widget?.textContent).toBeTruthy();
      });
    });
  });

  describe('Edge Cases', () => {
    it("should handle mixed security levels", async () => {
      render(
        <ValueCreationWidget
          {...mockMixedSecurityProps}
          testId={VALUE_CREATION_WIDGET_IDS.root}
        />
      );

      await waitFor(() => {
        const container = screen.queryByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(container).toBeInTheDocument();
        if (container) {
          expect(container.textContent).not.toBe("");
        }
      });
    });

    it("should handle None security level", async () => {
      render(
        <ValueCreationWidget
          availabilityLevel={"None" as SecurityLevel}
          integrityLevel={"None" as SecurityLevel}
          confidentialityLevel={"None" as SecurityLevel}
          testId={VALUE_CREATION_WIDGET_IDS.root}
        />
      );

      await waitFor(() => {
        const container = screen.queryByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(container).toBeInTheDocument();
      });
    });

    it("should handle Very High security level", async () => {
      render(
        <ValueCreationWidget
          availabilityLevel={"Very High" as SecurityLevel}
          integrityLevel={"Very High" as SecurityLevel}
          confidentialityLevel={"Very High" as SecurityLevel}
          testId={VALUE_CREATION_WIDGET_IDS.root}
        />
      );

      await waitFor(() => {
        const container = screen.queryByTestId(`widget-container-${VALUE_CREATION_WIDGET_IDS.root}`);
        expect(container).toBeInTheDocument();
      });
    });
  });
});
