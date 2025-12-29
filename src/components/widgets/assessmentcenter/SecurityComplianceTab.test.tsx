import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import { ComplianceStatusType } from "../../../types/compliance";
import {
  SecurityComplianceTab,
  SecurityComplianceTabProps,
} from "./SecurityComplianceTab";

describe("SecurityComplianceTab", () => {
  const defaultComplianceStatus: ComplianceStatusType = {
    compliantFrameworks: ["ISO 27001", "SOC 2"],
    partiallyCompliantFrameworks: ["NIST 800-53"],
    nonCompliantFrameworks: ["PCI DSS"],
    complianceScore: 75,
    status: "Substantial",
  };

  const defaultProps: SecurityComplianceTabProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    securityScore: 75,
    complianceStatus: defaultComplianceStatus,
    testId: "security-compliance",
  };

  it("renders without crashing", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(
      screen.getByTestId(defaultProps.testId)
    ).toBeInTheDocument();
  });

  it("displays compliance status overview section", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText(/compliance status overview/i)).toBeInTheDocument();
  });

  it("displays overall compliance score", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText(/75/)).toBeInTheDocument();
  });

  it("lists all compliant frameworks", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
    expect(screen.getByText("SOC 2")).toBeInTheDocument();
  });

  it("lists partially compliant frameworks", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText("NIST 800-53")).toBeInTheDocument();
  });

  it("displays compliance requirements section", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText(/compliance requirements/i)).toBeInTheDocument();
  });

  it("handles null compliance status", () => {
    const nullComplianceProps = {
      ...defaultProps,
      complianceStatus: null,
    };
    
    render(<SecurityComplianceTab {...nullComplianceProps} />);
    expect(
      screen.getByTestId(defaultProps.testId)
    ).toBeInTheDocument();
    // Should display securityScore when complianceStatus is null
    expect(screen.getByText(/75/)).toBeInTheDocument();
  });

  it("handles empty compliant frameworks", () => {
    const emptyCompliantProps = {
      ...defaultProps,
      complianceStatus: {
        ...defaultComplianceStatus,
        compliantFrameworks: [],
      },
    };
    
    render(<SecurityComplianceTab {...emptyCompliantProps} />);
    expect(
      screen.getByTestId(defaultProps.testId)
    ).toBeInTheDocument();
  });

  it("handles empty partially compliant frameworks", () => {
    const emptyPartialProps = {
      ...defaultProps,
      complianceStatus: {
        ...defaultComplianceStatus,
        partiallyCompliantFrameworks: [],
      },
    };
    
    render(<SecurityComplianceTab {...emptyPartialProps} />);
    expect(
      screen.getByTestId(defaultProps.testId)
    ).toBeInTheDocument();
  });

  it("handles empty non-compliant frameworks", () => {
    const emptyNonCompliantProps = {
      ...defaultProps,
      complianceStatus: {
        ...defaultComplianceStatus,
        nonCompliantFrameworks: [],
      },
    };
    
    render(<SecurityComplianceTab {...emptyNonCompliantProps} />);
    expect(
      screen.getByTestId(defaultProps.testId)
    ).toBeInTheDocument();
  });

  it("handles High security levels", () => {
    const highLevelProps = {
      ...defaultProps,
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
      complianceStatus: {
        ...defaultComplianceStatus,
        complianceScore: 90,
        status: "Full Compliance",
      },
    };
    
    render(<SecurityComplianceTab {...highLevelProps} />);
    expect(screen.getByText(/90/)).toBeInTheDocument();
  });

  it("renders with custom testId", () => {
    const customTestId = "custom-compliance-tab";
    render(<SecurityComplianceTab {...defaultProps} testId={customTestId} />);
    
    expect(
      screen.getByTestId(customTestId)
    ).toBeInTheDocument();
  });

  it("displays multiple compliant frameworks", () => {
    const multipleFrameworksProps = {
      ...defaultProps,
      complianceStatus: {
        ...defaultComplianceStatus,
        compliantFrameworks: ["ISO 27001", "SOC 2", "HIPAA", "GDPR"],
      },
    };
    
    render(<SecurityComplianceTab {...multipleFrameworksProps} />);
    expect(screen.getByText("ISO 27001")).toBeInTheDocument();
    expect(screen.getByText("SOC 2")).toBeInTheDocument();
    expect(screen.getByText("HIPAA")).toBeInTheDocument();
    expect(screen.getByText("GDPR")).toBeInTheDocument();
  });

  it("displays compliance guidance description", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(
      screen.getByText(/compliance status based on selected security levels/i)
    ).toBeInTheDocument();
  });

  it("displays compliance score", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    // Score should be displayed somewhere
    const scoreElement = screen.getByText(/75/);
    expect(scoreElement).toBeInTheDocument();
  });

  it("handles mixed security levels for compliance", () => {
    const mixedProps = {
      ...defaultProps,
      availabilityLevel: "Low" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "Moderate" as SecurityLevel,
    };
    
    render(<SecurityComplianceTab {...mixedProps} />);
    expect(
      screen.getByTestId(defaultProps.testId)
    ).toBeInTheDocument();
  });

  it("displays confidentiality compliance requirements", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText(/confidentiality/i)).toBeInTheDocument();
  });

  it("displays integrity compliance requirements", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText(/integrity/i)).toBeInTheDocument();
  });

  it("displays availability compliance requirements", () => {
    render(<SecurityComplianceTab {...defaultProps} />);
    expect(screen.getByText(/availability/i)).toBeInTheDocument();
  });
});
