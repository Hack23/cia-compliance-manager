import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";
import { BUSINESS_IMPACT_TEST_IDS } from "../../constants/testIds";
import { BusinessImpactDetails } from "../../services/ciaContentService";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => {
  const mockBusinessImpact: BusinessImpactDetails = {
    summary: "Significant business impact with potential financial losses",
    financial: {
      description: "Moderate financial impact with potential revenue loss",
      riskLevel: "Medium Risk",
      annualRevenueLoss: "$100,000 - $500,000",
    },
    operational: {
      description: "Operational disruptions affecting business processes",
      riskLevel: "High Risk",
      meanTimeToRecover: "4-8 hours",
    },
    reputational: {
      description: "Some impact on customer trust and brand reputation",
      riskLevel: "Medium Risk",
    },
    regulatory: {
      description: "Potential compliance issues with industry regulations",
      riskLevel: "Low Risk",
      complianceImpact: "SOC 2, ISO 27001",
    },
    strategic: {
      description: "Limited impact on strategic business initiatives",
      riskLevel: "Low Risk",
      competitiveAdvantage:
        "Moderate advantage over competitors with weaker security",
    },
  };

  return {
    __esModule: true,
    default: {
      getBusinessImpact: vi.fn(() => mockBusinessImpact),
    },
  };
});

describe("BusinessImpactAnalysisWidget", () => {
  const defaultProps = {
    availabilityLevel: "High" as const,
    integrityLevel: "Moderate" as const,
    confidentialityLevel: "High" as const,
  };

  it("renders without crashing", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);
    expect(screen.getByText("Business Impact Analysis")).toBeInTheDocument();
  });

  it("displays summary and security level", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);
    expect(
      screen.getByText("Confidentiality Impact Summary")
    ).toBeInTheDocument();
    expect(screen.getByText("Security Level:")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("allows switching between CIA components", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Default is confidentiality
    expect(
      screen.getByText("Confidentiality Impact Summary")
    ).toBeInTheDocument();

    // Switch to integrity
    fireEvent.click(screen.getByText("🔐 Integrity"));
    expect(screen.getByText("Integrity Impact Summary")).toBeInTheDocument();

    // Switch to availability
    fireEvent.click(screen.getByText("⏱️ Availability"));
    expect(screen.getByText("Availability Impact Summary")).toBeInTheDocument();
  });

  it("allows switching between consideration and benefits tabs", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Default is considerations tab
    expect(screen.getByText("Key Business Considerations")).toBeInTheDocument();

    // Switch to benefits tab
    fireEvent.click(screen.getByTestId(BUSINESS_IMPACT_TEST_IDS.TAB_BENEFITS));
    expect(screen.getByText("Business Benefits")).toBeInTheDocument();
  });

  it("displays different impact categories", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    expect(screen.getByText("Financial Impact")).toBeInTheDocument();
    expect(screen.getByText("Operational Impact")).toBeInTheDocument();
    expect(screen.getByText("Reputational")).toBeInTheDocument();
    expect(screen.getByText("Strategic")).toBeInTheDocument();
    expect(screen.getByText("Regulatory")).toBeInTheDocument();
  });

  it("renders financial metrics for impact analysis", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    expect(
      screen.getByText("Potential Annual Revenue Loss")
    ).toBeInTheDocument();
    expect(screen.getByText("$100,000 - $500,000")).toBeInTheDocument();
  });

  it("renders operational metrics for impact analysis", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    expect(screen.getByText("Mean Time to Recover")).toBeInTheDocument();
    expect(screen.getByText("4-8 hours")).toBeInTheDocument();
  });

  it("displays risk badges with appropriate styling", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check for risk levels displayed
    expect(screen.getByText("Medium Risk")).toBeInTheDocument();
    expect(screen.getByText("High Risk")).toBeInTheDocument();
    expect(screen.getByText("Low Risk")).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const customTestId = "custom-business-impact-widget";
    render(
      <BusinessImpactAnalysisWidget {...defaultProps} testId={customTestId} />
    );

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });
});
