import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";
import { BUSINESS_IMPACT_TEST_IDS } from "../../constants/testIds";
import type { BusinessImpactDetails } from "../../services/ciaContentService";

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

    // Check that we show confidentiality impact by default
    expect(screen.getByText(/Confidentiality Impact/i)).toBeInTheDocument();

    // Check that we show security level
    expect(screen.getByText(/Security Level:/i)).toBeInTheDocument();
    expect(screen.getByText(/High/i)).toBeInTheDocument();
  });

  it("allows switching between CIA components", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Default is confidentiality
    expect(screen.getByText(/Confidentiality Impact/i)).toBeInTheDocument();

    // Switch to integrity
    fireEvent.click(screen.getByText(/🔐 Integrity/i));
    expect(screen.getByText(/Integrity Impact/i)).toBeInTheDocument();

    // Switch to availability
    fireEvent.click(screen.getByText(/⏱️ Availability/i));
    expect(screen.getByText(/Availability Impact/i)).toBeInTheDocument();
  });

  it("displays different impact categories", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check for impact category headings
    expect(screen.getByText(/Financial Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Operational Impact/i)).toBeInTheDocument();
  });

  it("renders financial metrics for impact analysis", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check for financial metrics
    expect(
      screen.getByText(/Potential Annual Revenue Loss/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\$100,000 - \$500,000/i)).toBeInTheDocument();
  });

  it("renders operational metrics for impact analysis", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check for operational metrics
    expect(screen.getByText(/Mean Time to Recover/i)).toBeInTheDocument();
    expect(screen.getByText(/4-8 hours/i)).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-business-impact";
    render(<BusinessImpactAnalysisWidget {...defaultProps} testId={testId} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
