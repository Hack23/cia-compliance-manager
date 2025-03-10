import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SecuritySummaryWidget from "./SecuritySummaryWidget";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import { UI_ICONS } from "../../constants/appConstants";
import { vi } from "vitest";
import { SUMMARY_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";

// Mock the BusinessKeyBenefits to ensure consistent test data
vi.mock("../../types/businessImpact", async () => {
  const actual = await vi.importActual("../../types/businessImpact");
  return {
    ...actual,
    BusinessKeyBenefits: {
      NONE: ["No benefits"],
      LOW: ["Basic security benefit"],
      MODERATE: ["Standard security benefit"],
      HIGH: ["Advanced security benefit"],
      VERY_HIGH: ["Maximum security benefit"],
    },
  };
});

// Mock the ciaContentService with all required functions
vi.mock("../../services/ciaContentService", () => ({
  default: {
    getComponentDetails: vi.fn().mockImplementation(() => ({
      description: "Mocked description",
      technical: "Mocked technical details",
    })),
    getBusinessImpact: vi.fn().mockImplementation(() => ({
      summary: "Mocked impact summary",
      financial: { description: "Financial impact", riskLevel: "Medium" },
      operational: { description: "Operational impact", riskLevel: "Low" },
    })),
    getTechnicalImplementation: vi.fn().mockImplementation(() => ({
      description: "Technical implementation details",
    })),
    getRecommendations: vi.fn().mockImplementation(() => ["Recommendation 1"]),
    getROIEstimates: vi.fn().mockImplementation(() => ({
      returnRate: "200%",
      description: "Good ROI",
    })),
  },
  // Add ALL missing exports needed by the SecuritySummaryWidget
  getSecurityLevelDescription: vi
    .fn()
    .mockImplementation((level) => `${level} security level description`),
  getROIEstimate: vi.fn().mockImplementation((level) => ({
    returnRate: level === "None" ? "0%" : "200%",
    description: `${level} ROI description`,
    potentialSavings: "$100,000",
    breakEvenPeriod: "12 months",
  })),
  getTechnicalDescription: vi
    .fn()
    .mockImplementation(
      (component, level) => `${level} ${component} technical description`
    ),
  getBusinessImpactDescription: vi
    .fn()
    .mockImplementation(
      (component, level) => `${level} ${component} business impact description`
    ),
}));

describe("SecuritySummaryWidget", () => {
  // Default props that all tests can use
  const defaultProps = {
    securityLevel: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  };

  it("renders with proper security level", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    // Verify the widget title displays correctly - fixed to use correct test ID
    // Using a more generic approach to find the title
    expect(screen.getByText(/Moderate Security/i)).toBeInTheDocument();
  });

  it("displays appropriate security level icon", () => {
    const { rerender } = render(
      <SecuritySummaryWidget
        securityLevel="Low"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check if security icon is present
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toBeInTheDocument();

    // Test with different security levels
    rerender(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toBeInTheDocument();
  });

  it("expands technical section when clicked", async () => {
    render(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="High"
      />
    );

    // Find and click the technical section header
    const technicalHeader = screen.getByTestId(
      SUMMARY_TEST_IDS.TECHNICAL_SECTION_TOGGLE
    );
    fireEvent.click(technicalHeader);

    // Wait for the section to expand
    await waitFor(() => {
      expect(
        screen.getByTestId(SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION)
      ).toBeInTheDocument();
    });
  });

  it("renders with mixed CIA security levels", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="High"
        integrityLevel="Low"
        confidentialityLevel="Very High"
      />
    );

    // Check that component renders without errors
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_SUMMARY_CONTAINER)
    ).toBeInTheDocument();
  });
});
