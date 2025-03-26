import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { COMPLIANCE_TEST_IDS } from "../../../constants/testIds";
import { ComplianceServiceAdapter } from "../../../services/ComplianceServiceAdapter";
import { SecurityLevel } from "../../../types/cia";
import ComplianceStatusWidget from "./ComplianceStatusWidget";

// Define the mock service adapter before vi.mock calls - hoisted to top of file
const MockComplianceServiceAdapter = vi.hoisted(
  () =>
    class {
      getComplianceStatus = vi.fn().mockImplementation(() => ({
        compliantFrameworks: ["ISO 27001", "NIST CSF"],
        partiallyCompliantFrameworks: ["GDPR"],
        nonCompliantFrameworks: ["PCI DSS", "HIPAA"],
        remediationSteps: [
          "Address specific gaps in partially compliant frameworks",
          "Document your compliance controls and processes",
        ],
        requirements: ["Data protection", "Access control"],
        status: "Partially Compliant",
        complianceScore: 65,
      }));

      getComplianceStatusText = vi.fn().mockReturnValue("Partially Compliant");

      getFrameworkDescription = vi
        .fn()
        .mockImplementation((framework) => `Description for ${framework}`);

      getComplianceGapAnalysis = vi
        .fn()
        .mockImplementation((a, i, c, framework) => ({
          framework: framework,
          frameworkDescription: `Description for ${framework}`,
          isCompliant: framework === "ISO 27001",
          gaps: framework === "ISO 27001" ? [] : ["Gap 1", "Gap 2"],
          recommendations:
            framework === "ISO 27001"
              ? ["Maintain controls"]
              : ["Recommendation 1", "Recommendation 2"],
          components: {
            availability: {
              current: a,
              required: "Moderate",
              gap: 0,
            },
            integrity: {
              current: i,
              required: "Moderate",
              gap: 0,
            },
            confidentiality: {
              current: c,
              required: framework === "GDPR" ? "High" : "Moderate",
              gap: framework === "GDPR" && c !== "High" ? 1 : 0,
            },
          },
        }));

      getFrameworkRequiredLevel = vi
        .fn()
        .mockImplementation((framework, component) =>
          component === "confidentiality" && framework === "GDPR"
            ? "High"
            : "Moderate"
        );

      getFrameworkStatus = vi.fn().mockReturnValue({
        status: "Partially Compliant",
        complianceScore: 65,
      });

      getCompliantFrameworks = vi
        .fn()
        .mockImplementation(
          (
            availabilityLevel,
            integrityLevel,
            confidentialityLevel,
            complianceType
          ) => {
            if (complianceType === "partial") {
              return ["GDPR"];
            } else if (complianceType === "non-compliant") {
              return ["PCI DSS", "HIPAA"];
            } else {
              // Default to compliant
              return ["ISO 27001", "NIST CSF"];
            }
          }
        );

      getComplianceStatusDetails = vi.fn().mockReturnValue({
        status: "Partially Compliant",
        complianceScore: 65,
        compliantFrameworks: ["ISO 27001", "NIST CSF"],
        partiallyCompliantFrameworks: ["GDPR"],
        nonCompliantFrameworks: ["PCI DSS", "HIPAA"],
      });

      getFrameworkComplianceStatus = vi
        .fn()
        .mockReturnValue("partially-compliant");

      getFrameworkRequirements = vi
        .fn()
        .mockReturnValue(["Requirement 1", "Requirement 2"]);

      isFrameworkApplicable = vi.fn().mockReturnValue(true);
    }
);

// Create a mock function for useComplianceService that will be properly imported - properly hoisted
const mockUseComplianceService = vi.hoisted(() =>
  vi.fn().mockReturnValue({
    complianceService:
      new MockComplianceServiceAdapter() as unknown as ComplianceServiceAdapter,
    isLoading: false,
    error: null,
  })
);

// Mock the hook with both named and default exports
vi.mock("../../../hooks/useComplianceService", () => ({
  __esModule: true,
  default: mockUseComplianceService,
  useComplianceService: mockUseComplianceService,
}));

describe("ComplianceStatusWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    industry: "Technology",
    testId: "test-compliance-widget",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the mock to default state
    mockUseComplianceService.mockReturnValue({
      complianceService:
        new MockComplianceServiceAdapter() as unknown as ComplianceServiceAdapter,
      isLoading: false,
      error: null,
    });
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Update the testId to match the actual rendered testId with prefix
    expect(
      screen.getByTestId("widget-container-test-compliance-widget")
    ).toBeInTheDocument();
  });

  it("displays compliance status summary", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Check for compliance status elements
    const summary = screen.queryByTestId(
      COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_SUMMARY
    );
    if (summary) {
      expect(summary).toBeInTheDocument();
    }

    // Look for compliance status badge or any element containing compliance status text
    const statusElements = screen.getAllByText(/Partially Compliant/i);
    expect(statusElements.length).toBeGreaterThan(0);

    // Check for compliance score
    const scoreElement = screen.getByText(/65%/);
    expect(scoreElement).toBeInTheDocument();
  });

  it("displays compliant frameworks", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Look for ISO 27001 entry
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
    expect(screen.getByText("NIST CSF")).toBeInTheDocument();
  });

  it("displays partially compliant frameworks", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Look for GDPR entry
    expect(screen.getByText("GDPR")).toBeInTheDocument();
  });

  it("displays non-compliant frameworks", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Look for non-compliant frameworks
    expect(screen.getByText("PCI DSS")).toBeInTheDocument();
    expect(screen.getByText("HIPAA")).toBeInTheDocument();
  });

  it("shows framework gap analysis when framework is clicked", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Initially no gap analysis visible
    const pciDss = screen.getByText("PCI DSS");

    // Click on a non-compliant framework
    await act(async () => {
      fireEvent.click(pciDss);
    });

    // Gap analysis should now be visible
    // Look for gap entries
    expect(screen.getByText("Gap 1")).toBeInTheDocument();
    expect(screen.getByText("Gap 2")).toBeInTheDocument();

    // Look for recommendations
    expect(screen.getByText("Recommendation 1")).toBeInTheDocument();
    expect(screen.getByText("Recommendation 2")).toBeInTheDocument();
  });

  it("shows compliance tips", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Update the text to match what's actually rendered
    expect(
      screen.getByText(
        "Address specific gaps in partially compliant frameworks"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Document your compliance controls and processes")
    ).toBeInTheDocument();
  });

  it("shows component requirements in gap analysis", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Click on GDPR to show gap analysis
    const gdpr = screen.getByText("GDPR");

    await act(async () => {
      fireEvent.click(gdpr);
    });

    // After clicking, look for text indicating High requirement for confidentiality
    // This checks that the framework-specific requirements are shown
    expect(screen.getAllByText(/High/i).length).toBeGreaterThan(0);

    // Check for any component labels
    expect(
      screen.getAllByText(/confidentiality/i, { exact: false }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/availability/i, { exact: false }).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/integrity/i, { exact: false }).length
    ).toBeGreaterThan(0);
  });

  it("handles loading state", async () => {
    // Override mock for loading state
    mockUseComplianceService.mockReturnValueOnce({
      complianceService:
        new MockComplianceServiceAdapter() as unknown as ComplianceServiceAdapter,
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Look for the loading spinner element by its test ID instead of text content
    const loadingSpinner = screen.getByTestId(
      "widget-spinner-test-compliance-widget"
    );
    expect(loadingSpinner).toBeInTheDocument();

    // Also check for the loading container test ID which includes "loading" in the name
    expect(
      screen.getByTestId(
        "widget-container-loading-container-test-compliance-widget"
      )
    ).toBeInTheDocument();
  });

  it("handles error state", async () => {
    // Override mock for error state
    mockUseComplianceService.mockReturnValueOnce({
      complianceService:
        new MockComplianceServiceAdapter() as unknown as ComplianceServiceAdapter,
      isLoading: false,
      error: new Error("Test error message"),
    });

    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Look for error message
    expect(screen.getByText(/error/i, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
  });
});
