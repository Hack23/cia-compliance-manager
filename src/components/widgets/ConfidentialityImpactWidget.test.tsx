import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { CONFIDENTIALITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation((component, level) => {
      if (level === "Unknown") {
        return undefined;
      }
      return {
        description: `${level} ${component} description`,
        businessImpact: `${level} ${component} business impact`,
        protectionMethod:
          level !== "None" ? `${level} protection method` : undefined,
      };
    }),
    getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
      summary: `${level} ${component} business impact summary`,
      reputational: {
        description: `${level} reputational impact`,
        riskLevel: level === "None" ? "High Risk" : "Medium Risk",
      },
      regulatory: {
        description: `${level} regulatory impact`,
        riskLevel: level === "None" ? "High Risk" : "Low Risk",
      },
    })),
    getTechnicalImplementation: vi
      .fn()
      .mockImplementation((component, level) => ({
        description: `${level} technical implementation`,
        implementationSteps: [
          `Step 1 for ${component} at ${level} level`,
          `Step 2 for ${component} at ${level} level`,
          `Step 3 for ${component} at ${level} level`,
          `Step 4 for ${component} at ${level} level`,
        ],
        effort: {
          development: "Medium",
          maintenance: "Ongoing",
          expertise: "Advanced",
        },
        protectionMethod:
          level !== "None" ? `${level} protection method` : undefined,
      })),
    getRecommendations: vi
      .fn()
      .mockImplementation((component, level) => [
        `${level} recommendation 1`,
        `${level} recommendation 2`,
        `${level} recommendation 3`,
        `${level} recommendation 4`,
      ]),
  },
  getInformationSensitivity: vi.fn().mockImplementation((level) => {
    switch (level) {
      case "None":
        return "Public Data"; // Fix to match actual implementation
      case "Low":
        return "Internal Use"; // Fix to match actual implementation
      case "Moderate":
        return "Confidential";
      case "High":
        return "Restricted";
      case "Very High":
        return "Top Secret";
      default:
        return "Unknown";
    }
  }),
  getProtectionLevel: vi.fn().mockImplementation((level) => {
    switch (level) {
      case "None":
        return "No Protection"; // Fix to match actual implementation (capitalization)
      case "Low":
        return "Basic Protection"; // Fix to match actual implementation
      case "Moderate":
        return "Standard Protection";
      case "High":
        return "Enhanced Protection";
      case "Very High":
        return "Maximum Protection";
      default:
        return "Unknown protection";
    }
  }),
}));

describe("ConfidentialityImpactWidget", () => {
  const defaultProps = {
    confidentialityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(
      screen.getByTestId(
        CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_PREFIX
      )
    ).toBeInTheDocument();
  });

  it("displays confidentiality description", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(
      screen.getByText("Moderate confidentiality description")
    ).toBeInTheDocument();
  });

  it("displays protection method when available", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Protection Method:")).toBeInTheDocument();
    expect(screen.getByText("Moderate protection method")).toBeInTheDocument();
  });

  it("doesn't display protection method when not available", () => {
    render(
      <ConfidentialityImpactWidget
        {...defaultProps}
        confidentialityLevel="None"
      />
    );
    expect(screen.queryByText("Protection Method:")).not.toBeInTheDocument();
  });

  it("shows business impact information", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);

    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(
      screen.getByText("Moderate confidentiality business impact summary")
    ).toBeInTheDocument();

    // Check specific impact types
    expect(screen.getByText("Reputational Impact")).toBeInTheDocument();
    expect(
      screen.getByText("Moderate reputational impact")
    ).toBeInTheDocument();

    expect(screen.getByText("Regulatory Impact")).toBeInTheDocument();
    expect(screen.getByText("Moderate regulatory impact")).toBeInTheDocument();
  });

  it("displays technical implementation details", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);

    expect(screen.getByText("Technical Implementation")).toBeInTheDocument();
    expect(
      screen.getByText("Moderate technical implementation")
    ).toBeInTheDocument();

    // Check for implementation steps
    expect(screen.getByText("Implementation Steps")).toBeInTheDocument();
    expect(
      screen.getByText("Step 1 for confidentiality at Moderate level")
    ).toBeInTheDocument();
  });

  it("displays data protection classification", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);

    expect(
      screen.getByText("Data Protection Classification")
    ).toBeInTheDocument();
    expect(screen.getByText("Classification Level")).toBeInTheDocument();
    expect(screen.getByText("Information Sensitivity")).toBeInTheDocument();
    expect(screen.getByText("Confidential")).toBeInTheDocument();
  });

  // Test the show all recommendations toggle - improves branch coverage
  it("shows more recommendations when toggle is clicked", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);

    // Initially only 3 recommendations should be visible
    expect(screen.getByText("Moderate recommendation 1")).toBeInTheDocument();
    expect(screen.getByText("Moderate recommendation 2")).toBeInTheDocument();
    expect(screen.getByText("Moderate recommendation 3")).toBeInTheDocument();
    expect(
      screen.queryByText("Moderate recommendation 4")
    ).not.toBeInTheDocument();

    // Click the show all button
    fireEvent.click(screen.getByText("Show All"));

    // Now all recommendations should be visible
    expect(screen.getByText("Moderate recommendation 1")).toBeInTheDocument();
    expect(screen.getByText("Moderate recommendation 2")).toBeInTheDocument();
    expect(screen.getByText("Moderate recommendation 3")).toBeInTheDocument();
    expect(screen.getByText("Moderate recommendation 4")).toBeInTheDocument();

    // The button should now say "Show Less"
    expect(screen.getByText("Show Less")).toBeInTheDocument();

    // Click show less
    fireEvent.click(screen.getByText("Show Less"));

    // The 4th recommendation should be hidden again
    expect(
      screen.queryByText("Moderate recommendation 4")
    ).not.toBeInTheDocument();
  });

  it("handles error state when details not available", () => {
    render(
      <ConfidentialityImpactWidget
        {...defaultProps}
        confidentialityLevel={"Unknown" as SecurityLevel}
      />
    );

    // Should show error message
    expect(
      screen.getByText("Confidentiality details not available")
    ).toBeInTheDocument();

    // Should render error state in the widget container
    expect(
      screen.getByTestId(
        CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_PREFIX
      )
    ).toHaveTextContent("Confidentiality details not available");
  });

  it("accepts custom testId prop", () => {
    const customTestId = "custom-testid";
    render(
      <ConfidentialityImpactWidget {...defaultProps} testId={customTestId} />
    );

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });
});
