import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ComplianceService } from "../../services/ComplianceServiceAdapter";
import { SecurityLevel } from "../../types/cia";
import ComplianceStatusWidget from "./ComplianceStatusWidget";

// Mock the useCIAOptions hook
vi.mock("../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" },
    },
    integrityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" },
    },
    confidentialityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" },
    },
  }),
}));

// Create a simple mock for COMPLIANCE_TEST_IDS
const COMPLIANCE_TEST_IDS = {
  COMPLIANCE_STATUS_WIDGET: "compliance-status-widget",
  COMPLIANCE_STATUS_BADGE: "compliance-status-badge",
  COMPLIANCE_FRAMEWORK_ITEM: "framework-item",
};

// Remove react-bootstrap mock since we're not using it anymore
vi.mock("react-bootstrap", () => {
  return {}; // Empty mock since we don't use it anymore
});

describe("ComplianceStatusWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    className: "custom-class",
    testId: "custom-test-id",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Store original function for restoration after tests
    const originalGetComplianceStatus = ComplianceService.getComplianceStatus;

    // Mock ComplianceService.getComplianceStatus to return predictable data
    const getComplianceStatusMock = vi.spyOn(
      ComplianceService,
      "getComplianceStatus"
    );

    // Mock implementation
    getComplianceStatusMock.mockImplementation(
      (a: SecurityLevel, i: SecurityLevel, c: SecurityLevel) => {
        return {
          compliantFrameworks: ["ISO 27001", "NIST CSF"],
          partiallyCompliantFrameworks: ["GDPR"],
          nonCompliantFrameworks: ["HIPAA", "PCI DSS"],
          remediationSteps: [
            "Improve security controls",
            "Implement encryption",
          ],
          requirements: ["Data protection", "Access control"],
          status: "Partially Compliant",
          complianceScore: 75, // Add the missing complianceScore property
        };
      }
    );

    // Mock ComplianceService.getComplianceStatusText
    vi.spyOn(ComplianceService, "getComplianceStatusText").mockReturnValue(
      "Compliant with all major frameworks"
    );

    // Mock ComplianceService.getFrameworkDescription
    vi.spyOn(ComplianceService, "getFrameworkDescription").mockReturnValue(
      "Framework description"
    );
  });

  it("renders without crashing", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(screen.getByText("Compliance Status")).toBeInTheDocument();
  });

  it("displays framework compliance information correctly", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    // Check the status badge is displayed
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE)
    ).toBeInTheDocument();
    expect(screen.getByText("Meets basic compliance only")).toBeInTheDocument();

    // Check framework sections
    expect(screen.getByText("Compliant")).toBeInTheDocument();
    expect(screen.getByText("ISO 27001 (Tier 1)")).toBeInTheDocument();

    expect(screen.getByText("Partially Compliant")).toBeInTheDocument();
    expect(screen.getByText("ISO 27001 (Tier 2)")).toBeInTheDocument();

    expect(screen.getByText("Non-Compliant")).toBeInTheDocument();
    expect(screen.getByText("NIST 800-53")).toBeInTheDocument();
  });

  it("displays remediation steps when available", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    expect(screen.getByText("Remediation Steps")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Implement an Information Security Management System (ISMS)"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Develop data protection impact assessments")
    ).toBeInTheDocument();
  });

  it("uses correct styling based on compliance status", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    // Check the badge has appropriate styling
    const badge = screen.getByTestId(
      COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-800");
    expect(badge).toHaveClass("border-yellow-500");
  });

  it("renders with default props", () => {
    const minimalProps = {
      availabilityLevel: "Moderate" as SecurityLevel,
      integrityLevel: "Moderate" as SecurityLevel,
      confidentialityLevel: "Moderate" as SecurityLevel,
    };

    render(<ComplianceStatusWidget {...minimalProps} />);

    // Check the widget container is rendered with correct test ID
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_WIDGET)
    ).toBeInTheDocument();

    // Check compliance badge is displayed
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE)
    ).toBeInTheDocument();

    // Check compliance framework items are displayed
    expect(
      screen.getAllByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM)
        .length
    ).toBeGreaterThan(0);
  });

  it("renders with custom props", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    // Check it renders with custom test ID
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();

    // Check custom class name is applied
    expect(screen.getByTestId("custom-test-id")).toHaveClass("custom-class");
  });

  it("displays compliant frameworks correctly", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    // Check compliant frameworks section exists and has correct frameworks
    const frameworks = screen.getAllByTestId(
      COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM
    );
    expect(frameworks.length).toBeGreaterThan(0);

    // Verify at least one of the mocked frameworks is displayed
    const frameworkTexts = frameworks.map((item) => item.textContent);
    expect(frameworkTexts.some((text) => text?.includes("ISO 27001"))).toBe(
      true
    );
  });

  it("handles different security levels", () => {
    // Set up the mock to return different values based on input
    const getComplianceStatusMock = vi.spyOn(
      ComplianceService,
      "getComplianceStatus"
    );

    // Then override with our mock implementation
    getComplianceStatusMock.mockImplementation(
      (a: SecurityLevel, i: SecurityLevel, c: SecurityLevel) => {
        if (a === "High" && i === "High" && c === "High") {
          return {
            compliantFrameworks: ["ALL_FRAMEWORKS"],
            partiallyCompliantFrameworks: [],
            nonCompliantFrameworks: [],
            remediationSteps: [],
            requirements: ["Maintain compliance"],
            status: "Fully Compliant",
            complianceScore: 100, // Add the missing property
          };
        }
        // Return default mock data for other inputs
        return {
          compliantFrameworks: [],
          partiallyCompliantFrameworks: [],
          nonCompliantFrameworks: ["ALL_FRAMEWORKS"],
          remediationSteps: ["Implement everything"],
          requirements: ["Implement basic security controls"],
          status: "Non-Compliant",
          complianceScore: 0,
        };
      }
    );

    // Mock the status text function as well
    vi.spyOn(ComplianceService, "getComplianceStatusText").mockReturnValue(
      "Compliant with all major frameworks"
    );

    // Render with high security levels
    render(
      <ComplianceStatusWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check the displayed frameworks reflect the high security level
    expect(screen.getByText("ALL_FRAMEWORKS")).toBeInTheDocument();

    // Restore the original mock for other tests
    getComplianceStatusMock.mockRestore();
  });

  it("displays the widget title", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    // Look for the title heading
    expect(screen.getByText("Compliance Status")).toBeInTheDocument();
  });
});
