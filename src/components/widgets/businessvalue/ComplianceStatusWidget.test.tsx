import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { COMPLIANCE_TEST_IDS } from "../../../constants/testIds";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { ComplianceServiceAdapter } from "../../../services/ComplianceServiceAdapter";
import { SecurityLevel } from "../../../types/cia";
import { CIADataProvider } from "../../../types/cia-services";
import ComplianceStatusWidget from "./ComplianceStatusWidget";

// Create mock class that extends ComplianceServiceAdapter for complete type coverage
class MockComplianceServiceAdapter extends ComplianceServiceAdapter {
  constructor() {
    // Pass minimal data provider to satisfy the parent constructor
    super({} as CIADataProvider);

    // Mock all methods that are used in tests
    this.getComplianceStatus = vi.fn().mockImplementation(() => ({
      compliantFrameworks: ["ISO 27001", "NIST CSF"],
      partiallyCompliantFrameworks: ["GDPR"],
      nonCompliantFrameworks: ["PCI DSS", "HIPAA"],
      remediationSteps: ["Improve security controls", "Document processes"],
      requirements: ["Data protection", "Access control"],
      status: "Partially Compliant",
      complianceScore: 65,
    }));

    this.getComplianceStatusText = vi
      .fn()
      .mockReturnValue("Partially Compliant");

    this.getFrameworkDescription = vi
      .fn()
      .mockImplementation((framework) => `Description for ${framework}`);

    this.getComplianceGapAnalysis = vi
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

    this.getFrameworkRequiredLevel = vi
      .fn()
      .mockImplementation((framework, component) =>
        component === "confidentiality" && framework === "GDPR"
          ? "High"
          : "Moderate"
      );

    // Additional methods
    this.getFrameworkStatus = vi.fn().mockReturnValue({
      status: "Partially Compliant",
      complianceScore: 65,
    });

    // Fix: Use the correct method with appropriate parameters
    this.getCompliantFrameworks = vi
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

    this.getComplianceStatusDetails = vi.fn().mockReturnValue({
      status: "Partially Compliant",
      complianceScore: 65,
      compliantFrameworks: ["ISO 27001", "NIST CSF"],
      partiallyCompliantFrameworks: ["GDPR"],
      nonCompliantFrameworks: ["PCI DSS", "HIPAA"],
    });

    this.getFrameworkComplianceStatus = vi
      .fn()
      .mockReturnValue("partially-compliant");
    this.getFrameworkRequirements = vi
      .fn()
      .mockReturnValue(["Requirement 1", "Requirement 2"]);
    this.isFrameworkApplicable = vi.fn().mockReturnValue(true);
  }
}

// Mock the useComplianceService hook
vi.mock("../../../hooks/useComplianceService", () => ({
  useComplianceService: vi.fn().mockReturnValue({
    complianceService: new MockComplianceServiceAdapter(),
    isLoading: false,
    error: null,
  }),
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
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    expect(screen.getByTestId("test-compliance-widget")).toBeInTheDocument();
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

    // Look for remedy steps or compliance tips
    expect(screen.getByText("Improve security controls")).toBeInTheDocument();
    expect(screen.getByText("Document processes")).toBeInTheDocument();
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
    // Override the mock to simulate loading
    vi.mocked(useComplianceService).mockReturnValueOnce({
      complianceService: new MockComplianceServiceAdapter(),
      isLoading: true,
      error: null,
    });

    await act(async () => {
      render(<ComplianceStatusWidget {...defaultProps} />);
    });

    // Look for loading indicator or message
    const loadingElements = screen.getAllByText(/loading/i);
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it("handles error state", async () => {
    // Override the mock to simulate error
    vi.mocked(useComplianceService).mockReturnValueOnce({
      complianceService: new MockComplianceServiceAdapter(),
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
