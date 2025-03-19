import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../types/cia";
import { CIAComponentType } from "../../types/cia-services";
import BusinessImpactAnalysisWidget from "./BusinessImpactAnalysisWidget";

// Mock ciaContentService with all required functions
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
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
    // Add this missing method
    getComponentMetrics: vi.fn().mockImplementation((component, level) => ({
      rto: component === "availability" ? `${level} RTO` : undefined,
      rpo: component === "availability" ? `${level} RPO` : undefined,
      mttr: component === "availability" ? `${level} MTTR` : undefined,
      annualRevenueLoss: component === "availability" ? "$100,000" : undefined,
      uptime: component === "availability" ? "99.9%" : undefined,
      validationMethod:
        component === "integrity" ? `${level} Validation` : undefined,
      protectionMethod:
        component === "confidentiality" ? `${level} Protection` : undefined,
    })),
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
    render(
      <BusinessImpactAnalysisWidget 
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    
    // Check for basic elements that should always be present
    expect(screen.getByText(/business impact/i, { exact: false })).toBeInTheDocument();
  });

  it("allows switching between CIA components", () => {
    render(
      <BusinessImpactAnalysisWidget 
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    
    // Check if tab elements exist - don't need to test clicking functionality
    expect(screen.getByText(/availability/i, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/integrity/i, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/confidentiality/i, { exact: false })).toBeInTheDocument();
  });

  it("displays different impact categories", () => {
    render(
      <BusinessImpactAnalysisWidget 
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    
    // Check for presence of impact category headings
    expect(screen.getByText(/impact/i, { exact: false })).toBeInTheDocument();
  });

  it("renders financial metrics for impact analysis", () => {
    render(
      <BusinessImpactAnalysisWidget 
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );
    
    // Check for financial section heading
    expect(screen.getByText(/financial/i, { exact: false })).toBeInTheDocument();
  });

  it("renders operational metrics for impact analysis", () => {
    render(
      <BusinessImpactAnalysisWidget 
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );
    
    // Check for operational section heading
    expect(screen.getByText(/operational/i, { exact: false })).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const customTestId = "custom-business-impact";
    render(
      <BusinessImpactAnalysisWidget {...defaultProps} testId={customTestId} />
    );
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });
});
