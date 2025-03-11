import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";
import { CONFIDENTIALITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import ciaContentService from "../../services/ciaContentService";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation((component, level) => ({
      description: `${level} confidentiality description`,
      businessImpact: `${level} confidentiality business impact`,
      protectionMechanism:
        level !== "None" ? `${level} protection mechanism` : undefined,
      technical: `${level} technical implementation`,
    })),
    getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
      summary: `${level} confidentiality business impact summary`,
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
        // Use 'protectionMethod' instead of 'protection' to match the interface
        protectionMethod:
          level !== "None" ? `${level} protection mechanism` : undefined,
        classificationLevel: level,
        informationSensitivity:
          level === "None"
            ? "Public Data"
            : level === "Low"
            ? "Internal Data"
            : level === "Moderate"
            ? "Private Data"
            : "Confidential Data",
      })),
    getRecommendations: vi
      .fn()
      .mockImplementation((component, level) => [
        level === "High"
          ? "Implement multi-factor authentication"
          : "Implement basic authentication",
        level === "High"
          ? "Deploy end-to-end encryption"
          : "Add simple authorization controls",
        level === "High"
          ? "Establish security information management"
          : "Create data classification scheme",
      ]),
  },
  // Add the missing exported functions
  getInformationSensitivity: vi.fn().mockImplementation((level) => {
    if (level === "None") return "Public Data";
    if (level === "Low") return "Internal Data";
    if (level === "Moderate") return "Private Data";
    return "Confidential Data";
  }),
  getProtectionLevel: vi.fn().mockImplementation((level) => {
    if (level === "None") return "No protection";
    if (level === "Low") return "Basic protection";
    if (level === "Moderate") return "Standard protection";
    return "Advanced protection";
  }),
}));

describe("ConfidentialityImpactWidget", () => {
  const defaultProps = {
    confidentialityLevel: "High" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "High" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("High Confidentiality")).toBeInTheDocument();
  });

  it("displays confidentiality description from ciaContentService", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(
      screen.getByTestId(
        CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_DESCRIPTION
      )
    ).toHaveTextContent("High confidentiality description");
  });

  it("displays business impact information", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(
      screen.getByTestId(
        `${CONFIDENTIALITY_IMPACT_TEST_IDS.CONFIDENTIALITY_IMPACT_PREFIX}-business-impact`
      )
    ).toHaveTextContent("High confidentiality business impact summary");
  });

  it("displays reputational and regulatory impact cards", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Reputational Impact")).toBeInTheDocument();
    expect(screen.getByText("Regulatory Impact")).toBeInTheDocument();
  });

  it("renders with different confidentiality levels", () => {
    const { rerender } = render(
      <ConfidentialityImpactWidget {...defaultProps} />
    );
    expect(screen.getByText("High Confidentiality")).toBeInTheDocument();

    rerender(
      <ConfidentialityImpactWidget
        {...defaultProps}
        confidentialityLevel="Low"
      />
    );
    expect(screen.getByText("Low Confidentiality")).toBeInTheDocument();

    rerender(
      <ConfidentialityImpactWidget
        {...defaultProps}
        confidentialityLevel="None"
      />
    );
    expect(screen.getByText("None Confidentiality")).toBeInTheDocument();
  });

  it("renders without errors when options are undefined", () => {
    // Mock the service to return undefined for protection method
    vi.mocked(ciaContentService.getTechnicalImplementation).mockReturnValueOnce(
      {
        description: "Technical implementation",
        implementationSteps: ["Consider implementing basic security controls"],
        effort: {
          development: "Minimal",
          maintenance: "None",
          expertise: "Basic",
        },
      }
    );

    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="None"
        availabilityLevel="None"
        integrityLevel="None"
      />
    );

    // Instead of looking for "protection-level-text", check for classification level
    // which is present in the component's current implementation
    const classificationLevel = screen.getByTestId(
      "confidentiality-impact-classification-level-value"
    );
    expect(classificationLevel).toHaveTextContent("None");
  });

  it("displays recommendations when available", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
      />
    );

    // Updated to use the correct test ID format that's in the component
    expect(
      screen.getByTestId("confidentiality-impact-recommendation-0")
    ).toHaveTextContent("Implement multi-factor authentication");
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-confidentiality-widget";
    render(<ConfidentialityImpactWidget {...defaultProps} testId={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("displays data classification information", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(
      screen.getByText("Data Protection Classification")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("confidentiality-impact-classification-level-value")
    ).toHaveTextContent("High");
    expect(
      screen.getByTestId("confidentiality-impact-information-sensitivity-value")
    ).toHaveTextContent("Confidential Data");
  });
});
