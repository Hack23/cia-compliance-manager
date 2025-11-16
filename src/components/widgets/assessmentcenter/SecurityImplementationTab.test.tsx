import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import {
  SecurityImplementationTab,
  SecurityImplementationTabProps,
} from "./SecurityImplementationTab";

describe("SecurityImplementationTab", () => {
  const defaultProps: SecurityImplementationTabProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    implementationComplexity: "Medium",
    implementationTime: "3-6 months",
    requiredResources: "2-3 FTEs",
    testId: "security-implementation",
  };

  it("renders without crashing", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(
      screen.getByTestId("security-implementation-content-implementation")
    ).toBeInTheDocument();
  });

  it("displays implementation overview section", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText(/implementation overview/i)).toBeInTheDocument();
  });

  it("displays implementation timeline", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText("3-6 months")).toBeInTheDocument();
  });

  it("displays required resources", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText("2-3 FTEs")).toBeInTheDocument();
  });

  it("displays confidentiality implementation section", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText(/confidentiality implementation/i)).toBeInTheDocument();
  });

  it("displays integrity implementation section", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText(/integrity implementation/i)).toBeInTheDocument();
  });

  it("displays availability implementation section", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText(/availability implementation/i)).toBeInTheDocument();
  });

  it("displays confidentiality level", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    // Should display Moderate for confidentiality
    const elements = screen.getAllByText(/moderate/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it("displays integrity level", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    // Should display Moderate for integrity
    const elements = screen.getAllByText(/moderate/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it("displays availability level", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    // Should display Moderate for availability
    const elements = screen.getAllByText(/moderate/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it("handles High security levels", () => {
    const highLevelProps = {
      ...defaultProps,
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
      implementationComplexity: "High",
      implementationTime: "6-12 months",
      requiredResources: "4-6 FTEs",
    };
    
    render(<SecurityImplementationTab {...highLevelProps} />);
    expect(screen.getByText("6-12 months")).toBeInTheDocument();
    expect(screen.getByText("4-6 FTEs")).toBeInTheDocument();
  });

  it("handles Very High security levels", () => {
    const veryHighProps = {
      ...defaultProps,
      availabilityLevel: "Very High" as SecurityLevel,
      integrityLevel: "Very High" as SecurityLevel,
      confidentialityLevel: "Very High" as SecurityLevel,
      implementationComplexity: "Very High",
      implementationTime: "12-24 months",
      requiredResources: "6+ FTEs",
    };
    
    render(<SecurityImplementationTab {...veryHighProps} />);
    expect(screen.getByText("12-24 months")).toBeInTheDocument();
    expect(screen.getByText("6+ FTEs")).toBeInTheDocument();
  });

  it("handles None security levels", () => {
    const noneProps = {
      ...defaultProps,
      availabilityLevel: "None" as SecurityLevel,
      integrityLevel: "None" as SecurityLevel,
      confidentialityLevel: "None" as SecurityLevel,
      implementationComplexity: "Minimal",
      implementationTime: "Minimal",
      requiredResources: "Minimal",
    };
    
    render(<SecurityImplementationTab {...noneProps} />);
    expect(screen.getByText("Minimal")).toBeInTheDocument();
  });

  it("renders with custom testId", () => {
    const customTestId = "custom-implementation-tab";
    render(<SecurityImplementationTab {...defaultProps} testId={customTestId} />);
    
    expect(
      screen.getByTestId(`${customTestId}-content-implementation`)
    ).toBeInTheDocument();
  });

  it("displays implementation phases", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText(/phase/i)).toBeInTheDocument();
  });

  it("displays implementation requirements", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText(/requirement/i)).toBeInTheDocument();
  });

  it("displays implementation best practices", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(screen.getByText(/best practice/i)).toBeInTheDocument();
  });

  it("handles mixed security levels", () => {
    const mixedProps = {
      ...defaultProps,
      availabilityLevel: "Low" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "Moderate" as SecurityLevel,
    };
    
    render(<SecurityImplementationTab {...mixedProps} />);
    expect(
      screen.getByTestId("security-implementation-content-implementation")
    ).toBeInTheDocument();
  });

  it("displays different implementation times correctly", () => {
    const shortTimeProps = { ...defaultProps, implementationTime: "1-2 months" };
    const { rerender } = render(<SecurityImplementationTab {...shortTimeProps} />);
    expect(screen.getByText("1-2 months")).toBeInTheDocument();

    const longTimeProps = { ...defaultProps, implementationTime: "18-24 months" };
    rerender(<SecurityImplementationTab {...longTimeProps} />);
    expect(screen.getByText("18-24 months")).toBeInTheDocument();
  });

  it("displays different resource requirements correctly", () => {
    const minimalResourceProps = { ...defaultProps, requiredResources: "1 FTE" };
    const { rerender } = render(
      <SecurityImplementationTab {...minimalResourceProps} />
    );
    expect(screen.getByText("1 FTE")).toBeInTheDocument();

    const largeResourceProps = { ...defaultProps, requiredResources: "8-10 FTEs" };
    rerender(<SecurityImplementationTab {...largeResourceProps} />);
    expect(screen.getByText("8-10 FTEs")).toBeInTheDocument();
  });

  it("displays implementation description", () => {
    render(<SecurityImplementationTab {...defaultProps} />);
    expect(
      screen.getByText(/step-by-step/i)
    ).toBeInTheDocument();
  });
});
