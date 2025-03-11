import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";
import { CONFIDENTIALITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation((component, level) => {
      if (level === "High") {
        return {
          description: "Advanced confidentiality controls with strong encryption and strict access management.",
          businessImpact: "Sensitive information is well-protected against unauthorized access.",
          protectionMethod: "E2E encryption",
        };
      } else if (level === "Unknown") {
        return {
          description: "Unknown confidentiality description",
          businessImpact: "Unknown confidentiality business impact",
        };
      }
      return {
        description: `${level} confidentiality description`,
        businessImpact: `${level} confidentiality business impact`,
        protectionMethod: level === "None" ? "No protection" : `${level} protection method`,
      };
    }),
    
    getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
      summary: `${level} confidentiality business impact summary`,
      operational: {
        description: `${level} operational impact`,
        riskLevel: level === "None" ? "High Risk" : "Medium Risk",
      },
      financial: {
        description: `${level} financial impact`,
        riskLevel: level === "None" ? "High Risk" : "Low Risk",
      }
    })),
    
    getTechnicalImplementation: vi.fn().mockImplementation((component, level) => ({
      description: `${level} technical implementation`,
      implementationSteps: [
        `Step 1 for ${component} at ${level} level`,
        `Step 2 for ${component} at ${level} level`,
      ],
      effort: {
        development: "Medium",
        maintenance: "Ongoing",
        expertise: "Advanced",
      },
      protectionMethod: level !== "None" ? `${level} Protection Method` : undefined,
    })),
    
    getBusinessPerspective: vi.fn().mockImplementation((component, level) =>
      level !== "Unknown" ? `${level} business perspective` : ""
    ),
    
    getRecommendations: vi.fn().mockImplementation((component, level) => [
      `Deploy ${level} access controls`,
      `Implement ${level} encryption`,
      `Set up ${level} data classification`,
    ]),
    
    getInformationSensitivity: vi.fn().mockImplementation((level) => {
      switch (level) {
        case "None": return "Public Information";
        case "Low": return "Internal Use Only";
        case "Moderate": return "Sensitive Information";
        case "High": return "Confidential Information";
        case "Very High": return "Restricted Information";
        default: return "Not Classified";
      }
    }),
    
    getProtectionLevel: vi.fn().mockImplementation((level) => {
      switch (level) {
        case "None": return "No Protection";
        case "Low": return "Basic Protection";
        case "Moderate": return "Standard Protection";
        case "High": return "Enhanced Protection";
        case "Very High": return "Maximum Protection";
        default: return "Undefined Protection";
      }
    }),
    
    normalizeSecurityLevel: vi.fn().mockImplementation((level) => {
      if (typeof level !== 'string') return "None";
      const normalized = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
      return ["None", "Low", "Moderate", "High", "Very High"].includes(normalized) ? normalized : "None";
    })
  }
}));

describe("ConfidentialityImpactWidget", () => {
  const defaultProps = {
    confidentialityLevel: "High" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("High Confidentiality")).toBeInTheDocument();
  });

  it("displays confidentiality description from ciaContentService", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(
      screen.getByText("Advanced confidentiality controls with strong encryption and strict access management.")
    ).toBeInTheDocument();
  });

  it("displays business impact information", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(
      screen.getByText("High confidentiality business impact summary")
    ).toBeInTheDocument();
  });

  it("displays protection method information", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);

    // Check for protection method label and value
    expect(screen.getByText(/Protection Method/i)).toBeInTheDocument();
    expect(screen.getByText("E2E encryption")).toBeInTheDocument();
  });

  it("renders with different confidentiality levels", () => {
    const { rerender } = render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("High Confidentiality")).toBeInTheDocument();

    rerender(
      <ConfidentialityImpactWidget {...defaultProps} confidentialityLevel="Low" />
    );
    expect(screen.getByText("Low Confidentiality")).toBeInTheDocument();

    rerender(
      <ConfidentialityImpactWidget {...defaultProps} confidentialityLevel="None" />
    );
    expect(screen.getByText("None Confidentiality")).toBeInTheDocument();
  });

  it("handles unknown level gracefully", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel={"Unknown" as SecurityLevel}
        integrityLevel="None"
        availabilityLevel="None"
      />
    );

    // Check that the widget still renders with Unknown level displayed
    expect(screen.getByText("Unknown Confidentiality")).toBeInTheDocument();

    // Check for the description, which is provided by our mock
    expect(
      screen.getByText("Unknown confidentiality description")
    ).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);

    // Check that the section has a region role
    expect(screen.getByRole("region")).toBeInTheDocument();

    // Check that the section has an aria-labelledby attribute
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-labelledby",
      "widget-title-confidentiality-impact"
    );

    // Check that recommendations section exists
    expect(screen.getByText("Recommendations")).toBeInTheDocument();
  });

  it("displays recommendations when available", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);

    // Check for recommendations heading
    expect(screen.getByText("Recommendations")).toBeInTheDocument();

    // Check for actual recommendations based on our mock data
    expect(screen.getByText("Deploy High access controls")).toBeInTheDocument();
    expect(screen.getByText("Implement High encryption")).toBeInTheDocument();
    expect(screen.getByText("Set up High data classification")).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-confidentiality-widget";
    render(<ConfidentialityImpactWidget {...defaultProps} testId={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
