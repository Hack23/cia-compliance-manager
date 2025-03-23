import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { COMPLIANCE_TEST_IDS } from "../../../constants/testIds";
import useComplianceService from "../../../hooks/useComplianceService";
import { SecurityLevel } from "../../../types/cia";
import ComplianceStatusWidget from "./ComplianceStatusWidget";

// Mock the useComplianceService hook
vi.mock("../../../hooks/useComplianceService", () => ({
  useComplianceService: () => ({
    complianceService: {
      getComplianceStatus: vi.fn((a, i, c) => ({
        compliantFrameworks: ["ISO 27001", "NIST CSF"],
        partiallyCompliantFrameworks: ["GDPR"],
        nonCompliantFrameworks: ["PCI DSS", "HIPAA"],
        remediationSteps: ["Improve security controls", "Document processes"],
        requirements: ["Data protection", "Access control"],
        status: "Partially Compliant",
        complianceScore: 65,
      })),
      getComplianceStatusText: vi.fn(() => "Partially Compliant"),
      getFrameworkDescription: vi.fn(
        (framework) => `Description for ${framework}`
      ),
      getComplianceGapAnalysis: vi.fn((a, i, c, framework) => ({
        isCompliant: framework === "ISO 27001",
        gaps: framework === "ISO 27001" ? [] : ["Gap 1", "Gap 2"],
        recommendations:
          framework === "ISO 27001"
            ? ["Maintain controls"]
            : ["Recommendation 1", "Recommendation 2"],
      })),
      getFrameworkRequiredLevel: vi.fn((framework, component) =>
        component === "confidentiality" && framework === "GDPR"
          ? "High"
          : "Moderate"
      ),
    },
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

  it("renders without crashing", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(screen.getByTestId("test-compliance-widget")).toBeInTheDocument();
  });

  it("displays compliance status summary", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_SUMMARY)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE)
    ).toHaveTextContent("Partially Compliant");
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE)
    ).toHaveTextContent("65%");
  });

  it("displays compliant frameworks", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST)
    ).toBeInTheDocument();
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
    expect(screen.getByText("NIST CSF")).toBeInTheDocument();
  });

  it("displays partially compliant frameworks", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(
      screen.getByTestId(
        COMPLIANCE_TEST_IDS.PARTIALLY_COMPLIANT_FRAMEWORKS_LIST
      )
    ).toBeInTheDocument();
    expect(screen.getByText("GDPR")).toBeInTheDocument();
  });

  it("displays non-compliant frameworks", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.NON_COMPLIANT_FRAMEWORKS_LIST)
    ).toBeInTheDocument();
    expect(screen.getByText("PCI DSS")).toBeInTheDocument();
    expect(screen.getByText("HIPAA")).toBeInTheDocument();
  });

  it("shows framework gap analysis when framework is clicked", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    // Initially no gap analysis
    expect(
      screen.queryByTestId(COMPLIANCE_TEST_IDS.FRAMEWORK_GAP_ANALYSIS)
    ).not.toBeInTheDocument();

    // Click on a non-compliant framework
    const pciDss = screen.getByText("PCI DSS");
    fireEvent.click(pciDss);

    // Gap analysis should now be visible
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.FRAMEWORK_GAP_ANALYSIS)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.SELECTED_FRAMEWORK_STATUS)
    ).toHaveTextContent("Non-Compliant");
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_GAPS_LIST)
    ).toBeInTheDocument();
    expect(screen.getByText("Gap 1")).toBeInTheDocument();
    expect(screen.getByText("Gap 2")).toBeInTheDocument();
  });

  it("shows compliance tips", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_TIPS_LIST)
    ).toBeInTheDocument();
  });

  it("shows component requirements in gap analysis", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);

    // Click on a framework to show gap analysis
    const gdpr = screen.getByText("GDPR");
    fireEvent.click(gdpr);

    // Check component requirements
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.AVAILABILITY_REQUIREMENT)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.INTEGRITY_REQUIREMENT)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.CONFIDENTIALITY_REQUIREMENT)
    ).toBeInTheDocument();

    // Check confidentiality required level for GDPR is "High"
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.CONFIDENTIALITY_REQUIRED_LEVEL)
    ).toHaveTextContent("High");
  });

  it("handles loading state", () => {
    // Override the mock to simulate loading
    vi.mocked(useComplianceService).mockImplementationOnce(() => ({
      complianceService: null,
      isLoading: true,
      error: null,
    }));

    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_LOADING)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_SUMMARY)
    ).toBeInTheDocument();
  });

  it("handles error state", () => {
    // Override the mock to simulate error
    vi.mocked(useComplianceService).mockImplementationOnce(() => ({
      complianceService: null,
      isLoading: false,
      error: new Error("Test error message"),
    }));

    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(
      screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_ERROR)
    ).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
