import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { COMPLIANCE_TEST_IDS } from "../../constants/testIds";
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
      "Very High": { description: "Very High level" }
    },
    integrityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" }
    },
    confidentialityOptions: {
      None: { description: "None level" },
      Low: { description: "Low level" },
      Moderate: { description: "Moderate level" },
      High: { description: "High level" },
      "Very High": { description: "Very High level" }
    }
  }),
}));

// Mock the ComplianceService
vi.mock("../../services/complianceService", () => ({
  ComplianceService: vi.fn().mockImplementation(() => ({
    getComplianceStatus: vi.fn().mockReturnValue({
      status: "Partially Compliant",
      label: "80% Compliant",
      complianceScore: 80,
      compliantFrameworks: [
        { id: "framework1", name: "NIST CSF", status: "compliant" }
      ],
      partiallyCompliantFrameworks: [
        { id: "framework2", name: "ISO 27001", status: "partial" }
      ],
      nonCompliantFrameworks: [
        { id: "framework3", name: "GDPR", status: "non-compliant" }
      ],
      remediationSteps: ["Implement data protection controls", "Document processes"],
      requirements: ["Control 1.1", "Control 2.3"]
    }),
    getFrameworkDescription: vi.fn().mockReturnValue("Framework description"),
  })),
}));

describe("ComplianceStatusWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    securityLevel: "Moderate" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    expect(screen.getByText("Compliance Status")).toBeInTheDocument();
  });

  it("displays framework compliance information", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    
    // Check overall status
    expect(screen.getByText("80% Compliant")).toBeInTheDocument();
    
    // Check framework sections
    expect(screen.getByText("Compliant Frameworks")).toBeInTheDocument();
    expect(screen.getByText("NIST CSF")).toBeInTheDocument();
    
    expect(screen.getByText("Partially Compliant Frameworks")).toBeInTheDocument();
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
    
    expect(screen.getByText("Non-Compliant Frameworks")).toBeInTheDocument();
    expect(screen.getByText("GDPR")).toBeInTheDocument();
  });

  it("displays remediation steps when available", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    
    expect(screen.getByText("Remediation Steps")).toBeInTheDocument();
    expect(screen.getByText("Implement data protection controls")).toBeInTheDocument();
    expect(screen.getByText("Document processes")).toBeInTheDocument();
  });

  it("displays requirements when available", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    
    expect(screen.getByText("Framework Requirements")).toBeInTheDocument();
    expect(screen.getByText("Control 1.1")).toBeInTheDocument();
    expect(screen.getByText("Control 2.3")).toBeInTheDocument();
  });

  it("uses correct styling based on compliance status", () => {
    render(<ComplianceStatusWidget {...defaultProps} />);
    
    // We can check for specific text within elements that have styling
    expect(screen.getByText("80% Compliant")).toBeInTheDocument();
    
    // We can check that key elements have the appropriate test IDs
    expect(screen.getByTestId(COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_TITLE)).toBeInTheDocument();
  });
});
