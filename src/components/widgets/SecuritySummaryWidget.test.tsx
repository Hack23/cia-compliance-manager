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
vi.mock("../../services/ciaContentService", () => {
  return {
    default: {
      getComponentDetails: vi.fn().mockImplementation(() => ({
        description: "Test description",
        businessImpact: "Test business impact",
      })),
      getSecurityMetrics: vi.fn().mockReturnValue({
        totalCapex: 45,
        totalOpex: 30,
        capexEstimate: "$225,000",
        opexEstimate: "$60,000/year",
      }),
      getInformationSensitivity: vi.fn().mockImplementation((level: SecurityLevel) => {
        const mapping: Record<SecurityLevel, string> = {
          "None": "Public Information",
          "Low": "Internal Use Only",
          "Moderate": "Sensitive Information",
          "High": "Confidential Information",
          "Very High": "Restricted Information",
        };
        return mapping[level] || "Not Classified";
      }),
      getProtectionLevel: vi.fn().mockImplementation((level: SecurityLevel) => {
        const mapping: Record<SecurityLevel, string> = {
          "None": "No Protection",
          "Low": "Basic Protection", 
          "Moderate": "Standard Protection",
          "High": "Enhanced Protection",
          "Very High": "Maximum Protection",
        };
        return mapping[level] || "Undefined Protection";
      }),
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
    // Add ALL missing exports needed by the SecuritySummaryWidget as named exports
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
    getSecurityIcon: vi.fn().mockImplementation((level: SecurityLevel) => {
      const icons: Record<SecurityLevel, string> = {
        "None": "🔓",
        "Low": "🔐",
        "Moderate": "🔒",
        "High": "🛡️",
        "Very High": "🔰",
      };
      return icons[level] || "🔒";
    }),
    getCategoryIcon: vi.fn().mockImplementation((category: string) => {
      const icons: Record<string, string> = {
        availability: "⏱️",
        integrity: "✅",
        confidentiality: "🔒",
      };
      return icons[category] || "📊";
    }),
  };
});

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

    // Be more specific in our selector to avoid multiple matches
    // Look for an h3 element with "Moderate Security" text
    expect(
      screen.getByRole("heading", { name: /moderate security/i, level: 3 })
    ).toBeInTheDocument();
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

    // Use a more specific selector instead of just testId since there are multiple elements with the same testId
    expect(
      screen.getByRole("region", { name: /security summary/i })
    ).toBeInTheDocument();
    
    // Alternatively, verify component renders by checking for specific elements within it
    expect(screen.getByTestId("security-icon")).toBeInTheDocument();
    
    // Use getAllByText for elements that might appear multiple times and check the first one
    expect(screen.getAllByText(/moderate security/i)[0]).toBeInTheDocument();
  });
});
