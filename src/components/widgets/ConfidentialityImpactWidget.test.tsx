import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";
import { CIADetails } from "../../types/cia";

describe("ConfidentialityImpactWidget", () => {
  const mockOptions: Record<string, CIADetails> = {
    None: {
      description: "No confidentiality controls.",
      impact: "Data accessible to anyone",
      technical: "No access control or encryption.",
      businessImpact: "No protection for sensitive information",
      capex: 0,
      opex: 0,
      protectionMethod: "None",
      recommendations: [
        "Implement basic access controls",
        "Create classification policy",
      ],
    },
    High: {
      description: "Advanced confidentiality with end-to-end encryption.",
      impact: "Protected against sophisticated attacks",
      technical: "End-to-end encryption with multi-factor authentication.",
      businessImpact: "Protects against advanced persistent threats",
      capex: 25,
      opex: 15,
      protectionMethod: "E2E encryption",
      recommendations: [
        "Implement E2E encryption",
        "Military-grade protection",
      ],
    },
  };

  it("renders correctly with default props", () => {
    render(<ConfidentialityImpactWidget />);

    expect(
      screen.getByTestId("widget-confidentiality-impact")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Confidentiality Impact: None/i)
    ).toBeInTheDocument();
  });

  it("displays the correct confidentiality information", () => {
    render(<ConfidentialityImpactWidget level="None" options={mockOptions} />);

    expect(
      screen.getByText("No confidentiality controls.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("No protection for sensitive information")
    ).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("displays recommendations when available", () => {
    render(<ConfidentialityImpactWidget level="None" options={mockOptions} />);

    expect(
      screen.getByText("Implement basic access controls")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Create classification policy")
    ).toBeInTheDocument();
  });

  it("updates content when level changes", () => {
    const { rerender } = render(
      <ConfidentialityImpactWidget level="None" options={mockOptions} />
    );

    expect(
      screen.getByText("No confidentiality controls.")
    ).toBeInTheDocument();

    rerender(
      <ConfidentialityImpactWidget level="High" options={mockOptions} />
    );

    expect(
      screen.getByText("Advanced confidentiality with end-to-end encryption.")
    ).toBeInTheDocument();
    expect(screen.getByText("E2E encryption")).toBeInTheDocument();
  });
});
