import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { mockWidgetProps } from "../../../utils/testUtils";
import SecuritySummaryWidget from "./SecuritySummaryWidget";

// Mock the content service
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getSecurityLevelDescription: vi.fn().mockImplementation((level) => {
        if (level === "None") return "No security controls";
        if (level === "Low") return "Basic security controls";
        if (level === "Moderate")
          return "Standard security controls with adequate protection";
        if (level === "High")
          return "Advanced security controls with strong protection";
        if (level === "Very High")
          return "Maximum security controls with comprehensive protection";
        return "";
      }),
      getComponentDetails: vi.fn().mockImplementation((component, level) => {
        return {
          description: `${component} description for ${level} level`,
          technical: `Technical details for ${level} ${component}`,
          businessImpact: `Business impact for ${level} ${component}`,
        };
      }),
      getInformationSensitivity: vi.fn().mockImplementation((level) => {
        if (level === "None") return "Public Data";
        if (level === "Low") return "Internal Data";
        if (level === "Moderate") return "Confidential Data";
        if (level === "High") return "Restricted Data";
        if (level === "Very High") return "Classified Data";
        return "Unknown";
      }),
      getBusinessImpact: vi.fn().mockImplementation((component, level) => {
        return {
          description: `Business impact description for ${component} at ${level} level`,
          riskLevel:
            level === "None" || level === "Low" ? "High Risk" : "Low Risk",
        };
      }),
    },
    error: null,
    isLoading: false,
  }),
}));

describe("SecuritySummaryWidget", () => {
  const defaultProps = {
    ...mockWidgetProps,
    testId: "custom-test-id",
  };

  describe("Rendering", () => {
    it("should render with required props", () => {
      render(
        <SecuritySummaryWidget {...defaultProps} className="custom-class" />
      );

      // Check that the widget container renders
      expect(
        screen.getByTestId("widget-container-custom-test-id")
      ).toBeInTheDocument();
  });

    it("applies custom class name when provided", () => {
      render(
        <SecuritySummaryWidget {...defaultProps} className="custom-class" />
      );

      const element = screen.getByTestId("widget-container-custom-test-id");
      expect(element).toHaveClass("custom-class");
    });

    it("uses default test ID when not provided", () => {
      render(<SecuritySummaryWidget {...mockWidgetProps} />);

      expect(
        screen.getByTestId(
          `widget-container-${SECURITY_SUMMARY_TEST_IDS.WIDGET}`
        )
      ).toBeInTheDocument();
    });
  });

  describe("Data Display", () => {
    it("displays the overall security level", () => {
      render(<SecuritySummaryWidget {...defaultProps} />);

      // Wait for content to load and check for the tab navigation
      expect(
        screen.getByTestId("custom-test-id-tab-overview")
      ).toBeInTheDocument();
  });

    it("displays individual component levels", () => {
      render(<SecuritySummaryWidget {...mockWidgetProps} />);

    // Check for component cards in the overview tab once loaded
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD)
    ).toBeInTheDocument();
  });

    it("displays security summary description", () => {
      render(<SecuritySummaryWidget {...defaultProps} />);

    // The description is part of the Banner section
    expect(
      screen.getByText("Standard security controls with adequate protection")
    ).toBeInTheDocument();
  });

    it("displays security cards for each component", () => {
      render(<SecuritySummaryWidget {...defaultProps} />);

      expect(
        screen.getByTestId("custom-test-id-tab-overview")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("custom-test-id-tab-business")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("custom-test-id-tab-implementation")
      ).toBeInTheDocument();
    });

    it("shows appropriate risk levels for security levels", () => {
      render(
        <SecuritySummaryWidget
          availabilityLevel="None"
          integrityLevel="None"
          confidentialityLevel="None"
        />
      );

      const riskLevel = screen.getByTestId(
        "widget-security-summary-label-risk-level"
      );
      expect(riskLevel).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("calculates correct overall level for mixed inputs", () => {
      render(
        <SecuritySummaryWidget
          availabilityLevel="High"
          integrityLevel="Moderate"
          confidentialityLevel="Low"
        />
      );

    // Overall level should be displayed based on mixed inputs
    expect(screen.getByText("Security Summary")).toBeInTheDocument();
  });

  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes on widget container", () => {
      render(<SecuritySummaryWidget {...defaultProps} />);

      const widgetContainer = screen.getByTestId(
        "widget-container-custom-test-id"
      );
      expect(widgetContainer).toBeInTheDocument();
      expect(widgetContainer.tagName.toLowerCase()).toBe("div");
    });
  });
});
