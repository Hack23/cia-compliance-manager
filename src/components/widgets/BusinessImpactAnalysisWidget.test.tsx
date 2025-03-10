import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";
import { BUSINESS_IMPACT_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel, CIAComponentType } from "../../types/cia";

// Mock ciaContentService with all required functions
vi.mock("../../services/ciaContentService", () => ({
  default: {
    getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
      summary: `${level} ${component} business impact summary`,
      operational: {
        description: `${level} ${component} operational impact`,
        riskLevel: level === "None" ? "High Risk" : "Medium Risk",
      },
      financial: {
        description: `${level} ${component} financial impact`,
        riskLevel: level === "None" ? "High Risk" : "Low Risk",
      },
    })),
    getRecommendations: vi
      .fn()
      .mockImplementation((component, level) => [
        `${level} ${component} recommendation 1`,
        `${level} ${component} recommendation 2`,
      ]),
  },
  // Add the missing getCategoryIcon function with proper typing
  getCategoryIcon: vi.fn().mockImplementation((category: CIAComponentType) => {
    // Define icons with proper typing to prevent the TypeScript error
    const icons: Record<CIAComponentType, string> = {
      availability: "⏱️",
      integrity: "✅",
      confidentiality: "🔒",
    };
    return icons[category] || "📊";
  }),
  // Add other necessary functions
  getComponentDescription: vi
    .fn()
    .mockImplementation(
      (component: CIAComponentType, level: SecurityLevel) =>
        `${level} ${component} description`
    ),
  getBusinessPerspective: vi
    .fn()
    .mockImplementation(
      (component: CIAComponentType, level: SecurityLevel) =>
        `${level} ${component} business perspective`
    ),
  // Add the missing getRiskBadgeVariant function that's causing the errors
  getRiskBadgeVariant: vi.fn().mockImplementation((riskLevel: string) => {
    switch (riskLevel) {
      case "High Risk":
        return "danger";
      case "Medium Risk":
        return "warning";
      case "Low Risk":
        return "success";
      default:
        return "info";
    }
  }),
  // Add calculateBusinessImpactLevel function if it's used
  calculateBusinessImpactLevel: vi.fn().mockReturnValue("Medium"),
}));

describe("BusinessImpactAnalysisWidget", () => {
  // Define the default props at the beginning
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "High" as SecurityLevel,
    confidentialityLevel: "Low" as SecurityLevel,
    testId: "test-business-impact",
  };

  it("renders without crashing", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);
    expect(screen.getByTestId("test-business-impact")).toBeInTheDocument();
  });

  it("displays summary and security level", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // We should use getAllByText for elements that may appear multiple times
    const summaryTexts = screen.getAllByText(
      /Low confidentiality business impact summary/i
    );
    expect(summaryTexts.length).toBeGreaterThan(0);
    expect(summaryTexts[0]).toBeInTheDocument();
  });

  it("allows switching between CIA components", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Click the integrity tab
    fireEvent.click(screen.getByTestId("test-business-impact-tab-integrity"));

    // We should use getAllByText for elements that may appear multiple times
    const integrityTexts = screen.getAllByText(
      /High integrity business impact summary/i
    );
    expect(integrityTexts.length).toBeGreaterThan(0);
    expect(integrityTexts[0]).toBeInTheDocument();

    // Click the availability tab
    fireEvent.click(
      screen.getByTestId("test-business-impact-tab-availability")
    );

    // Use getAllByText for potentially duplicated texts
    const availabilityTexts = screen.getAllByText(
      /Moderate availability business impact summary/i
    );
    expect(availabilityTexts.length).toBeGreaterThan(0);
    expect(availabilityTexts[0]).toBeInTheDocument();
  });

  it("displays different impact categories", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check for operational impact section using getAllByText
    const operationalHeaders = screen.getAllByText(/Operational Impact/i);
    expect(operationalHeaders.length).toBeGreaterThan(0);
    expect(operationalHeaders[0]).toBeInTheDocument();

    // Use getAllByText for data that may appear in multiple places
    const operationalImpacts = screen.getAllByText(
      /Low confidentiality operational impact/i
    );
    expect(operationalImpacts.length).toBeGreaterThan(0);
    expect(operationalImpacts[0]).toBeInTheDocument();

    // Check for financial impact section
    // Use getAllByText instead of getByText since there are multiple matches
    const financialHeaders = screen.getAllByText(/Financial Impact/i);
    expect(financialHeaders.length).toBeGreaterThan(0);
    expect(financialHeaders[0]).toBeInTheDocument();

    expect(
      screen.getByText(/Low confidentiality financial impact/i)
    ).toBeInTheDocument();
  });

  it("renders financial metrics for impact analysis", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check for financial risk level
    expect(screen.getByText(/Low Risk/i)).toBeInTheDocument();
  });

  it("renders operational metrics for impact analysis", () => {
    render(<BusinessImpactAnalysisWidget {...defaultProps} />);

    // Check for operational risk level
    expect(screen.getByText(/Medium Risk/i)).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const customTestId = "custom-business-impact";
    render(
      <BusinessImpactAnalysisWidget {...defaultProps} testId={customTestId} />
    );
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });
});
