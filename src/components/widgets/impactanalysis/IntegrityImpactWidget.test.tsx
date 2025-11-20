import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import IntegrityImpactWidget from "./IntegrityImpactWidget";

// Mock the useCIAContentService hook
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getComponentDetails: vi.fn().mockImplementation((component, level) => ({
        description: `${level} ${component} description`,
        technical: `${level} ${component} technical details`,
        businessImpact: `${level} ${component} business impact`,
        validationLevel: `${level} validation level`,
        errorRate: `< ${
          level === "None"
            ? "Not monitored"
            : level === "Low"
            ? "5%"
            : level === "Moderate"
            ? "3%" // Changed from 4% to 3% to match test expectations
            : level === "High"
            ? "1%"
            : "0.01%"
        }`,
      })),
      getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
        summary: `${level} ${component} business impact summary`,
        financial: {
          description: `${level} financial impact`,
          riskLevel: level === "None" ? "Critical Risk" : "Medium Risk",
        },
        operational: {
          description: `${level} operational impact`,
          riskLevel: level === "None" ? "Critical Risk" : "Low Risk",
        },
        reputational: {
          description: `${level} reputational impact`,
          riskLevel: level === "None" ? "Critical Risk" : "Medium Risk",
        },
      })),
      getRecommendations: vi
        .fn()
        .mockImplementation((component, level) => [
          `Mock recommendation 1 for ${level}`,
          `Mock recommendation 2 for ${level}`,
        ]),
    },
    error: null,
    isLoading: false,
  }),
}));

// Mock the WidgetContainer component to simplify testing
vi.mock("../../../components/common/WidgetContainer", () => ({
  default: ({
    children,
    title,
    testId,
  }: {
    children: React.ReactNode;
    title: string;
    testId?: string;
  }) => (
    <div data-testid={testId || "widget-container"}>
      <h3>{title}</h3>
      {children}
    </div>
  ),
}));

// Mock BusinessImpactSection component
vi.mock("../../../components/common/BusinessImpactSection", () => ({
  default: ({ impact, testId }: { impact: any; testId?: string }) => (
    <div data-testid={testId || "business-impact-section"}>
      {impact?.summary}
    </div>
  ),
}));

// Mock SecurityLevelBadge component
vi.mock("../../../components/common/SecurityLevelBadge", () => ({
  default: ({ level, testId }: { level: string; testId?: string }) => (
    <div data-testid={testId || "security-level-badge"}>{level}</div>
  ),
}));

describe("IntegrityImpactWidget", () => {
  // Update default props to include all required CIA levels
  const defaultProps = {
    level: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "test-integrity-widget",
  };

  // Helper function to render the component with different props
  const createComponent = (props = {}) => {
    return render(<IntegrityImpactWidget {...defaultProps} {...props} />);
  };

  it("renders without crashing", () => {
    createComponent();
    expect(screen.getByTestId("test-integrity-widget")).toBeInTheDocument();
  });

  it("displays the widget title correctly", () => {
    createComponent();
    expect(screen.getByText("Integrity Impact")).toBeInTheDocument();
  });

  it("displays security level badge", () => {
    createComponent();
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("Moderate");
  });

  it("renders business impact section", () => {
    createComponent();
    expect(
      screen.getByTestId("test-integrity-widget-business-impact-container")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Moderate integrity business impact summary")
    ).toBeInTheDocument();
  });

  it("displays data integrity metrics", () => {
    createComponent();
    expect(screen.getByText("Data Integrity Metrics")).toBeInTheDocument();
    expect(screen.getByText("Data Validation Controls:")).toBeInTheDocument();
    expect(screen.getByText("Moderate validation level")).toBeInTheDocument();
    expect(screen.getByText("Acceptable Error Rate:")).toBeInTheDocument();
    expect(screen.getByText("< 3%")).toBeInTheDocument();
  });

  it("renders recommendations when showExtendedDetails is true", () => {
    createComponent({ showExtendedDetails: true });
    expect(screen.getByText("Recommendations")).toBeInTheDocument();
    expect(
      screen.getByText("Mock recommendation 1 for Moderate")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Mock recommendation 2 for Moderate")
    ).toBeInTheDocument();
  });

  it("doesn't display recommendations when showExtendedDetails is false", () => {
    createComponent({ showExtendedDetails: false });
    expect(screen.queryByText("Recommendations")).not.toBeInTheDocument();
  });

  it("uses the specific integrity level from props when available", () => {
    createComponent({
      level: "Low",
      integrityLevel: "High",
    });
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("High");
  });

  it("uses the integrity level prop correctly", () => {
    createComponent({
      integrityLevel: "Low",
    });
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("Low");
  });

  it("properly handles different security levels", () => {
    // Test with "None" level
    const { unmount: unmountNone } = createComponent({
      integrityLevel: "None" as SecurityLevel,
    });
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("None");

    // Look for the text with the "< " prefix
    expect(screen.getByText(/Not monitored/)).toBeInTheDocument();
    unmountNone();

    // Test with "Very High" level
    createComponent({
      integrityLevel: "Very High" as SecurityLevel,
    });
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("Very High");

    // Look for the text with the "< " prefix
    expect(screen.getByText(/< 0.01%/)).toBeInTheDocument();
  });
});
