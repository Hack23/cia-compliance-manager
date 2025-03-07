import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import IntegrityImpactWidget from "./IntegrityImpactWidget";
import { CIADetails } from "../../types/cia";

describe("IntegrityImpactWidget", () => {
  const mockOptions: Record<string, CIADetails> = {
    None: {
      description: "No data integrity controls.",
      impact: "Data corruption may go undetected",
      technical: "No validation or verification processes.",
      businessImpact: "Decisions based on potentially corrupt data",
      capex: 0,
      opex: 0,
      validationMethod: "None",
      recommendations: [
        "Implement basic data validation",
        "Create manual verification processes",
      ],
    },
    High: {
      description: "Advanced integrity with blockchain verification.",
      impact: "All changes tracked and validated",
      technical: "Distributed ledger technology and digital signatures.",
      businessImpact: "Full validation trail for all critical information",
      capex: 25,
      opex: 15,
      validationMethod: "Blockchain verification",
      recommendations: [
        "Implement immutable audit logs",
        "Hash-based verification systems",
      ],
    },
  };

  it("renders correctly with default props", () => {
    render(<IntegrityImpactWidget />);

    expect(screen.getByTestId("widget-integrity-impact")).toBeInTheDocument();
    expect(screen.getByText(/Integrity Impact: None/i)).toBeInTheDocument();
  });

  it("displays the correct integrity information", () => {
    render(<IntegrityImpactWidget level="None" options={mockOptions} />);

    expect(screen.getByText("No data integrity controls.")).toBeInTheDocument();
    expect(
      screen.getByText("Decisions based on potentially corrupt data")
    ).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("displays recommendations when available", () => {
    render(<IntegrityImpactWidget level="None" options={mockOptions} />);

    expect(
      screen.getByText("Implement basic data validation")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Create manual verification processes")
    ).toBeInTheDocument();
  });

  it("updates content when level changes", () => {
    const { rerender } = render(
      <IntegrityImpactWidget level="None" options={mockOptions} />
    );

    expect(screen.getByText("No data integrity controls.")).toBeInTheDocument();

    rerender(<IntegrityImpactWidget level="High" options={mockOptions} />);

    expect(
      screen.getByText("Advanced integrity with blockchain verification.")
    ).toBeInTheDocument();
    expect(screen.getByText("Blockchain verification")).toBeInTheDocument();
  });
});
