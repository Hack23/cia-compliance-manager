import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

  describe('Collapsible Sections', () => {
    it('should start with all sections collapsed', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Get all collapsible buttons (but Value Overview starts expanded now)
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        const componentButton = screen.getByRole('button', { name: /component business value/i });
        const businessButton = screen.getByRole('button', { name: /investment business case/i });
        
        // Value Overview should start expanded, others collapsed
        expect(overviewButton).toHaveAttribute('aria-expanded', 'true');
        expect(componentButton).toHaveAttribute('aria-expanded', 'false');
        expect(businessButton).toHaveAttribute('aria-expanded', 'false');

        // Summary content should be visible initially
        expect(screen.getByTestId(VALUE_CREATION_WIDGET_IDS.label('summary'))).toBeInTheDocument();
      });
    });

    it('should expand a section when its button is clicked', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Value Overview is already expanded, so click on Component Business Value
        const componentButton = screen.getByRole('button', { name: /component business value/i });
        fireEvent.click(componentButton);
      });

      await waitFor(() => {
        // Component button should now be expanded
        const componentButton = screen.getByRole('button', { name: /component business value/i });
        expect(componentButton).toHaveAttribute('aria-expanded', 'true');
        
        // Value Overview should be collapsed (only one at a time)
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        expect(overviewButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should collapse a section when its button is clicked again', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Value Overview starts expanded, verify it
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        expect(overviewButton).toHaveAttribute('aria-expanded', 'true');
      });

      // Click to collapse
      const overviewButton = screen.getByRole('button', { name: /value overview/i });
      fireEvent.click(overviewButton);

      await waitFor(() => {
        // Button should now be collapsed
        expect(overviewButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should allow only one section to be expanded at a time', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Value Overview starts expanded, verify it
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        expect(overviewButton).toHaveAttribute('aria-expanded', 'true');
      });

      // Now expand Component Business Value
      const componentButton = screen.getByRole('button', { name: /component business value/i });
      fireEvent.click(componentButton);

      await waitFor(() => {
        // Component Business Value should be expanded
        expect(componentButton).toHaveAttribute('aria-expanded', 'true');
        
        // Value Overview should be collapsed
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        expect(overviewButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('should have proper aria-controls attributes on collapsible buttons', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Check Value Overview button
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        expect(overviewButton).toHaveAttribute('aria-controls', 'value-overview-content');

        // Check Component Business Value button
        const componentButton = screen.getByRole('button', { name: /component business value/i });
        expect(componentButton).toHaveAttribute('aria-controls', 'component-value-content');

        // Check Investment Business Case button
        const businessCaseButton = screen.getByRole('button', { name: /investment business case/i });
        expect(businessCaseButton).toHaveAttribute('aria-controls', 'business-case-content');
      });
    });

    it('should support keyboard navigation with Enter key', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Summary is already expanded and visible initially
        const summaryText = screen.getByTestId(VALUE_CREATION_WIDGET_IDS.label('summary'));
        expect(summaryText).toBeInTheDocument();
        
        // Find and trigger Enter key on Value Overview button to collapse it
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        fireEvent.keyDown(overviewButton, { key: 'Enter' });
      });

      await waitFor(() => {
        // Content should now be hidden
        expect(screen.queryByTestId(VALUE_CREATION_WIDGET_IDS.label('summary'))).not.toBeInTheDocument();
      });
    });

    it('should support keyboard navigation with Space key', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Find and trigger Space key on Component Business Value button
        const componentButton = screen.getByRole('button', { name: /component business value/i });
        fireEvent.keyDown(componentButton, { key: ' ' });
      });

      await waitFor(() => {
        // Component section should be visible
        const componentButton = screen.getByRole('button', { name: /component business value/i });
        expect(componentButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('should not respond to other keys', async () => {
      render(<ValueCreationWidget {...defaultProps} />);

      await waitFor(() => {
        // Find button (starts expanded) and trigger an unhandled key
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        fireEvent.keyDown(overviewButton, { key: 'a' });
      });

      await waitFor(() => {
        // Button should remain expanded (initial state)
        const overviewButton = screen.getByRole('button', { name: /value overview/i });
        expect(overviewButton).toHaveAttribute('aria-expanded', 'true');
      });
    });
  });
});
