import React from "react";
import { render, screen } from "@testing-library/react";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";

// Add mock options for testing
const mockOptions = {
  None: {
    description: "No confidentiality controls.",
    businessImpact: "No protection for sensitive information",
    protectionMethod: "None",
    recommendations: [
      "Implement basic access controls",
      "Create classification policy",
    ],
  },
  High: {
    description: "Advanced confidentiality with end-to-end encryption.",
    businessImpact: "Strong protection for sensitive information",
    protectionMethod: "E2E encryption",
    recommendations: ["Regular security assessments", "Monitor access logs"],
  },
};

describe("ConfidentialityImpactWidget", () => {
  it("renders without crashing", () => {
    render(<ConfidentialityImpactWidget level="None" options={{}} />);
    expect(
      screen.getByText("Confidentiality Impact: None")
    ).toBeInTheDocument();
  });

  it("renders correctly with default props", () => {
    render(<ConfidentialityImpactWidget level="None" options={{}} />);

    expect(
      screen.getByTestId("widget-confidentiality-impact")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Confidentiality Impact: None/i)
    ).toBeInTheDocument();
  });

  it("displays the correct confidentiality information", () => {
    render(<ConfidentialityImpactWidget level="None" options={{}} />);

    expect(
      screen.getByText("No confidentiality controls.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("No protection for sensitive information")
    ).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("displays recommendations when available", () => {
    render(<ConfidentialityImpactWidget level="None" options={{}} />);

    expect(
      screen.getByText("Implement basic access controls")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Create classification policy")
    ).toBeInTheDocument();
  });

  it("updates content when level changes", () => {
    const { rerender } = render(
      <ConfidentialityImpactWidget level="None" options={{}} />
    );

    expect(
      screen.getByText("No confidentiality controls.")
    ).toBeInTheDocument();

    rerender(<ConfidentialityImpactWidget level="High" options={{}} />);

    expect(
      screen.getByText("Advanced confidentiality with end-to-end encryption.")
    ).toBeInTheDocument();
    expect(screen.getByText("E2E encryption")).toBeInTheDocument();
  });
});
