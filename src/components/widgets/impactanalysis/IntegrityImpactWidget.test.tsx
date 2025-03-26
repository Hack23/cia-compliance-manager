import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import IntegrityImpactWidget from "./IntegrityImpactWidget";

// Mock the useCIAContentService hook
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getIntegrityDetails: vi.fn().mockImplementation((level: string) => ({
        description: `Mock description for integrity at ${level} level`,
        technical: `Mock technical details for integrity at ${level} level`,
        businessImpact: `Mock business impact for integrity at ${level} level`,
        recommendations: [
          `Mock recommendation 1 for ${level}`,
          `Mock recommendation 2 for ${level}`,
        ],
        validationMethod: `${level} validation method`,
        metrics: {
          dataAccuracy: `${level} data accuracy`,
          dataValidation: `${level} data validation`,
        },
      })),
      getBusinessImpact: vi
        .fn()
        .mockImplementation((component: string, level: string) => ({
          description: `Mock business impact for ${component} at ${level} level`,
          financial: {
            description: `Mock financial impact for ${component} at ${level} level`,
            riskLevel: "Medium Risk",
          },
          operational: {
            description: `Mock operational impact for ${component} at ${level} level`,
            riskLevel: "Low Risk",
          },
        })),
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
      {impact?.description}
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
  const defaultProps = {
    level: "Moderate" as SecurityLevel,
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
    // Use the correct testId that's used in the actual component
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("Moderate");
  });

  it("renders technical implementation section", () => {
    createComponent();

    // Look for the technical description section
    const descriptionSection = screen.getByTestId(
      "test-integrity-widget-description"
    );
    expect(descriptionSection).toBeInTheDocument();

    // Check for the mock description within this section
    expect(descriptionSection.textContent).toContain(
      "Mock description for integrity at Moderate level"
    );
  });

  it("renders business impact section", () => {
    createComponent();
    expect(
      screen.getByText(/Mock business impact for integrity at Moderate level/)
    ).toBeInTheDocument();
  });

  it("renders recommendations section", () => {
    createComponent();
    expect(
      screen.getByText(/Mock recommendation 1 for Moderate/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Mock recommendation 2 for Moderate/)
    ).toBeInTheDocument();
  });

  it("displays the none level correctly", () => {
    createComponent({
      level: "None" as SecurityLevel,
      availabilityLevel: "None" as SecurityLevel,
      integrityLevel: "None" as SecurityLevel,
      confidentialityLevel: "None" as SecurityLevel,
    });
    // Use the correct testId
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("None");
  });

  it("displays the low level correctly", () => {
    createComponent({
      level: "Low" as SecurityLevel,
      availabilityLevel: "Low" as SecurityLevel,
      integrityLevel: "Low" as SecurityLevel,
      confidentialityLevel: "Low" as SecurityLevel,
    });
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("Low");
  });

  it("displays the high level correctly", () => {
    createComponent({
      level: "High" as SecurityLevel,
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
    });
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("High");
  });

  it("displays the very high level correctly", () => {
    createComponent({
      level: "Very High" as SecurityLevel,
      availabilityLevel: "Very High" as SecurityLevel,
      integrityLevel: "Very High" as SecurityLevel,
      confidentialityLevel: "Very High" as SecurityLevel,
    });
    expect(
      screen.getByTestId("test-integrity-widget-integrity-badge")
    ).toHaveTextContent("Very High");
  });
});
