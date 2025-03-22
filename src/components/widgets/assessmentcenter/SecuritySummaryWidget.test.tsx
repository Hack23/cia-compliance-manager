import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import SecuritySummaryWidget from "./SecuritySummaryWidget";

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
vi.mock("../../hooks/useCIAContentService", () => {
  return {
    useCIAContentService: () => ({
      ciaContentService: {
        getComponentDetails: vi.fn().mockImplementation(() => ({
          description: "Test description",
          businessImpact: "Test business impact",
          uptime: "99.9%",
          mttr: "1 hour",
          rto: "4 hours",
          rpo: "2 hours",
        })),
        getSecurityMetrics: vi.fn().mockReturnValue({
          totalCapex: 45,
          totalOpex: 30,
          capexEstimate: "$225,000",
          opexEstimate: "$60,000/year",
        }),
        getInformationSensitivity: vi
          .fn()
          .mockImplementation((level: SecurityLevel) => {
            const mapping: Record<SecurityLevel, string> = {
              None: "Public Information",
              Low: "Internal Use Only",
              Moderate: "Sensitive Information",
              High: "Confidential Information",
              "Very High": "Restricted Information",
            };
            return mapping[level] || "Not Classified";
          }),
        getProtectionLevel: vi
          .fn()
          .mockImplementation((level: SecurityLevel) => {
            const mapping: Record<SecurityLevel, string> = {
              None: "No Protection",
              Low: "Basic Protection",
              Moderate: "Standard Protection",
              High: "Enhanced Protection",
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
          validationMethod: "Hash validation",
        })),
        getRecommendations: vi
          .fn()
          .mockImplementation(() => ["Recommendation 1"]),
        getROIEstimates: vi.fn().mockImplementation(() => ({
          returnRate: "200%",
          description: "Moderate ROI description",
        })),
        getSecurityLevelDescription: vi
          .fn()
          .mockImplementation((level) => `${level} security level description`),
        getROIEstimate: vi.fn().mockImplementation((level) => ({
          value: level === "None" ? "0%" : "200%",
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
            (component, level) =>
              `${level} ${component} business impact description`
          ),
        getSecurityIcon: vi.fn().mockImplementation((level: SecurityLevel) => {
          const icons: Record<SecurityLevel, string> = {
            None: "🔓",
            Low: "🔐",
            Moderate: "🔒",
            High: "🛡️",
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
        getRiskBadgeVariant: vi.fn().mockImplementation((riskLevel) => {
          switch (riskLevel) {
            case "Critical Risk":
              return "neutral";
            case "High Risk":
              return "warning";
            case "Medium Risk":
              return "info";
            case "Low Risk":
              return "success";
            case "Minimal Risk":
              return "success";
            default:
              return "neutral";
          }
        }),
        calculateOverallSecurityLevel: vi.fn().mockImplementation(
          (avail, integ, confid) => confid // Just return confidentiality level for simplicity
        ),
        calculateBusinessImpactLevel: vi
          .fn()
          .mockReturnValue("Moderate Business Impact"),
      },
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

    // Use more specific queries to avoid ambiguity with multiple matching elements
    // Look for each level in the summary section which has specific CSS classes
    const summaryContainer = screen.getByTestId(
      SUMMARY_TEST_IDS.SUMMARY_CONTAINER
    );

    // Use specific test IDs to find the containers for each component
    const availSummary = screen.getByTestId(
      `${SUMMARY_TEST_IDS.SUMMARY_CONTAINER}-security-summary-widget-availability-summary`
    );
    const integSummary = screen.getByTestId(
      `${SUMMARY_TEST_IDS.SUMMARY_CONTAINER}-security-summary-widget-integrity-summary`
    );
    const confidSummary = screen.getByTestId(
      `${SUMMARY_TEST_IDS.SUMMARY_CONTAINER}-security-summary-widget-confidentiality-summary`
    );

    // Check the content within each specific container
    expect(availSummary).toHaveTextContent("High");
    expect(integSummary).toHaveTextContent("Low");
    expect(confidSummary).toHaveTextContent("Very High");
  });

  it("renders with default props", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check for important elements
    expect(screen.getByText("Moderate Security")).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toBeInTheDocument();
  });

  it("displays security level icon and description", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_SUMMARY_DESCRIPTION)
    ).toBeInTheDocument();
    // Updated to match the actual text from our mock
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_SUMMARY_DESCRIPTION)
    ).toHaveTextContent("Moderate security level description");
  });

  it("displays ROI estimate", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.ROI_ESTIMATE_SUMMARY)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.ROI_ESTIMATE_PAIR)
    ).toBeInTheDocument();
    // Updated to match the actual text from our mock
    expect(screen.getByText("Moderate ROI description")).toBeInTheDocument();
  });

  // Test section toggles - this improves branch coverage
  it("toggles technical details section", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    // Technical details should be hidden initially
    expect(
      screen.queryByTestId(SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION)
    ).not.toBeInTheDocument();

    // Click the toggle button
    fireEvent.click(
      screen.getByTestId(SUMMARY_TEST_IDS.TECHNICAL_SECTION_TOGGLE)
    );

    // Technical details should now be visible
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.AVAILABILITY_TECH_DETAILS)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.INTEGRITY_TECH_DETAILS)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.CONFIDENTIALITY_TECH_DETAILS)
    ).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(
      screen.getByTestId(SUMMARY_TEST_IDS.TECHNICAL_SECTION_TOGGLE)
    );
    expect(
      screen.queryByTestId(SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION)
    ).not.toBeInTheDocument();
  });

  // Test business impact section toggle
  it("toggles business impact section", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    // Business impact should be hidden initially
    expect(
      screen.queryByTestId(SUMMARY_TEST_IDS.BUSINESS_IMPACT_SECTION)
    ).not.toBeInTheDocument();

    // Click the toggle button
    fireEvent.click(
      screen.getByTestId(SUMMARY_TEST_IDS.BUSINESS_IMPACT_TOGGLE)
    );

    // Business impact should now be visible
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.BUSINESS_IMPACT_SECTION)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.AVAILABILITY_IMPACT_DETAILS)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.INTEGRITY_IMPACT_DETAILS)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.CONFIDENTIALITY_IMPACT_DETAILS)
    ).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(
      screen.getByTestId(SUMMARY_TEST_IDS.BUSINESS_IMPACT_TOGGLE)
    );
    expect(
      screen.queryByTestId(SUMMARY_TEST_IDS.BUSINESS_IMPACT_SECTION)
    ).not.toBeInTheDocument();
  });

  // Test metrics section toggle
  it("toggles metrics section", () => {
    render(<SecuritySummaryWidget {...defaultProps} />);

    // Metrics should be hidden initially
    expect(
      screen.queryByTestId(SUMMARY_TEST_IDS.METRICS_SECTION)
    ).not.toBeInTheDocument();

    // Click the toggle button
    fireEvent.click(screen.getByTestId(SUMMARY_TEST_IDS.METRICS_TOGGLE));

    // Metrics should now be visible
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.METRICS_SECTION)
    ).toBeInTheDocument();

    // Click again to hide
    fireEvent.click(screen.getByTestId(SUMMARY_TEST_IDS.METRICS_TOGGLE));
    expect(
      screen.queryByTestId(SUMMARY_TEST_IDS.METRICS_SECTION)
    ).not.toBeInTheDocument();
  });
});
