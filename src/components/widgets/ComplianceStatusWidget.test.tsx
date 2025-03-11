import React from "react";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ComplianceStatusWidget from "./ComplianceStatusWidget";
import { FRAMEWORK_TEST_IDS } from "../../constants/testIds";
// Import from appConstants instead of complianceConstants
import { COMPLIANCE_STATUS } from "../../constants/appConstants";
import { SecurityLevel } from "../../types/cia";

// Define a type for the framework descriptions to ensure type safety
type FrameworkDescriptions = {
  "SOC 2": string;
  "ISO 27001": string;
  "PCI DSS": string;
  HIPAA: string;
  "NIST 800-53 High": string;
  [key: string]: string; // Allow other string keys for flexibility
};

// Mock the ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComplianceStatus: vi.fn().mockImplementation((level) => {
      if (level === "Low") {
        return {
          status: COMPLIANCE_STATUS.NON_COMPLIANT,
          compliantFrameworks: [],
          nonCompliantFrameworks: ["SOC 2", "ISO 27001"],
          requirements: ["Basic access control", "Minimal security policies"],
        };
      } else if (level === "Moderate") {
        return {
          // Using STANDARD_COMPLIANCE instead of PARTIAL_COMPLIANCE
          status: COMPLIANCE_STATUS.STANDARD_COMPLIANCE,
          compliantFrameworks: ["SOC 2", "ISO 27001"],
          nonCompliantFrameworks: ["HIPAA", "PCI DSS"],
          requirements: [
            "Access controls",
            "Risk assessment",
            "Security awareness training",
          ],
        };
      } else {
        return {
          status: COMPLIANCE_STATUS.FULL_COMPLIANCE,
          compliantFrameworks: [
            "SOC 2",
            "ISO 27001",
            "PCI DSS",
            "HIPAA",
            "NIST 800-53 High",
          ],
          nonCompliantFrameworks: [],
          requirements: [
            "Logical access controls",
            "Change management processes",
            "Risk assessment framework",
            "Security incident management",
            "Data encryption",
            "Network monitoring",
            "Regular vulnerability scanning",
            "Protected health information safeguards",
            "Breach notification protocols",
            "Continuous monitoring",
            "Comprehensive documentation",
            "Strict access controls",
          ],
        };
      }
    }),
  },
  // Add the missing getFrameworkDescription function with proper typing
  getFrameworkDescription: vi.fn().mockImplementation((framework: string) => {
    const descriptions: FrameworkDescriptions = {
      "SOC 2": "System and Organization Controls 2",
      "ISO 27001": "International information security standard",
      "PCI DSS": "Payment Card Industry Data Security Standard",
      HIPAA: "Health Insurance Portability and Accountability Act",
      "NIST 800-53 High": "National Institute of Standards and Technology",
    };
    return descriptions[framework] || `Description for ${framework}`;
  }),
}));

describe("ComplianceStatusWidget", () => {
  it("shows basic compliance for Low security level", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // Check the compliance status badge shows the correct status
    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent("Non-Compliant");

    // Should show at least one framework as compliant
    expect(screen.getByText("Basic access control")).toBeInTheDocument();
    expect(screen.getByText("Minimal security policies")).toBeInTheDocument();
  });

  it("shows standard compliance for Moderate security level", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check the compliance status badge shows the correct status
    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent("Partially Compliant");

    // Instead of looking for exact framework names, check for their descriptions
    // or look for text in list items with data-testid for framework items
    expect(
      screen.getByText("System and Organization Controls 2")
    ).toBeInTheDocument();
    expect(
      screen.getByText("International information security standard")
    ).toBeInTheDocument();

    // Check for requirements which are more reliably accessible as direct text
    expect(screen.getByText("Access controls")).toBeInTheDocument();
    expect(screen.getByText("Risk assessment")).toBeInTheDocument();
  });

  it("shows full compliance for High security level", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check the compliance status badge shows the correct status
    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent("Fully Compliant");
  });

  it("displays compliant frameworks", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check for framework list section
    expect(
      screen.getByTestId(FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER)
    ).toBeInTheDocument();

    // Check that we have framework items
    const frameworks = screen.getAllByTestId(/framework-item-\d+/);
    expect(frameworks.length).toBeGreaterThan(0);
  });

  it("displays compliance requirements", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check that requirements list exists
    expect(
      screen.getByTestId(FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST)
    ).toBeInTheDocument();

    // Check that requirements are displayed
    expect(screen.getByText("Logical access controls")).toBeInTheDocument();
    expect(screen.getByText("Change management processes")).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-compliance-widget";
    render(
      <ComplianceStatusWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
        testId={testId}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
