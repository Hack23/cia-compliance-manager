import React from "react";
import { render, screen } from "@testing-library/react";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";

// Add mock options for testing
const mockOptions = {
  None: {
    impact: "No confidentiality controls.",
    businessImpact: "No protection for sensitive information",
    recommendations: [
      "Implement basic access controls",
      "Create classification policy",
    ],
  },
  High: {
    impact: "Advanced confidentiality with end-to-end encryption.",
    businessImpact: "Strong protection for sensitive information",
    recommendations: ["Regular security assessments", "Monitor access logs"],
  },
};

describe("ConfidentialityImpactWidget", () => {
  it("renders without crashing", () => {
    render(<ConfidentialityImpactWidget level="None" options={{}} />);
    // Update test to match component heading format
    expect(
      screen.getByText("Confidentiality Impact: None")
    ).toBeInTheDocument();
  });

  it("renders correctly with default props", () => {
    render(<ConfidentialityImpactWidget level="None" options={{}} />);
    expect(
      screen.getByTestId("widget-confidentiality-impact")
    ).toBeInTheDocument();
  });

  it("displays proper impact information", () => {
    render(<ConfidentialityImpactWidget level="None" options={mockOptions} />);
    expect(screen.getByTestId("confidentiality-impact")).toHaveTextContent(
      "No confidentiality controls."
    );
    expect(screen.getByTestId("business-impact")).toHaveTextContent(
      "No protection for sensitive information"
    );
  });

  it("shows recommendations based on level", () => {
    render(<ConfidentialityImpactWidget level="None" options={mockOptions} />);
    expect(screen.getByTestId("recommendation-0")).toHaveTextContent(
      "Implement basic access controls"
    );
    expect(screen.getByTestId("recommendation-1")).toHaveTextContent(
      "Create classification policy"
    );
  });

  it("shows protection level text", () => {
    render(<ConfidentialityImpactWidget level="None" options={mockOptions} />);
    const protectionLevelText = screen.getByTestId("protection-level-text");
    expect(protectionLevelText).toHaveTextContent("No protection");
  });

  it("handles different security levels", () => {
    const { rerender } = render(
      <ConfidentialityImpactWidget level="High" options={mockOptions} />
    );
    expect(screen.getByTestId("confidentiality-impact")).toHaveTextContent(
      "Advanced confidentiality with end-to-end encryption."
    );

    // Test level that doesn't exist in options
    rerender(
      <ConfidentialityImpactWidget level="Unknown" options={mockOptions} />
    );
    // Should fall back to Unknown protection level
    const protectionLevelText = screen.getByTestId("protection-level-text");
    expect(protectionLevelText).toHaveTextContent("Unknown protection level");
  });
});
