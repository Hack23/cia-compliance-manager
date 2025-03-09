import React from "react";
import { render, screen } from "@testing-library/react";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";

describe("ConfidentialityImpactWidget", () => {
  it("renders with empty options", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="None"
        integrityLevel="None"
        availabilityLevel="None"
        options={{}}
      />
    );
    // Update test to match component heading format
    expect(
      screen.getByText("Confidentiality Impact: None")
    ).toBeInTheDocument();
  });

  it("renders with custom level", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="High"
        integrityLevel="None"
        availabilityLevel="None"
        options={{}}
      />
    );
    expect(
      screen.getByTestId("widget-confidentiality-impact")
    ).toBeInTheDocument();
  });

  it("displays detailed information when available", () => {
    const mockOptions = {
      None: {
        impact: "Data accessible to anyone",
        businessImpact: "No protection for sensitive information",
        recommendations: ["Implement basic access controls"],
      },
      High: {
        impact: "Protected against sophisticated attacks",
        businessImpact: "Protects against advanced persistent threats",
        recommendations: ["Implement E2E encryption"],
      },
    };

    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="High"
        integrityLevel="None"
        availabilityLevel="None"
        options={mockOptions}
      />
    );
    expect(screen.getByTestId("confidentiality-impact")).toHaveTextContent(
      "Protected against sophisticated attacks"
    );
    expect(screen.getByTestId("business-impact")).toHaveTextContent(
      "Protects against advanced persistent threats"
    );
  });

  it("handles missing data gracefully", () => {
    const mockOptions = {
      None: {
        impact: "Data accessible to anyone",
        businessImpact: "No protection for sensitive information",
        recommendations: ["Implement basic access controls"],
      },
      High: {
        impact: "Protected against sophisticated attacks",
        businessImpact: "Protects against advanced persistent threats",
        recommendations: ["Implement E2E encryption"],
      },
    };

    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="Moderate"
        integrityLevel="None"
        availabilityLevel="None"
        options={mockOptions}
      />
    );
    // Should fall back to Unknown protection level
    const protectionLevelText = screen.getByTestId("protection-level-text");
    expect(protectionLevelText).toHaveTextContent("Unknown protection level");
  });

  it("renders without errors when options are undefined", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="None"
        integrityLevel="None"
        availabilityLevel="None"
        options={{}}
      />
    );
    const protectionLevelText = screen.getByTestId("protection-level-text");
    expect(protectionLevelText).toHaveTextContent("No protection");
  });

  it("displays recommendations when available", () => {
    const mockOptions = {
      None: {
        impact: "Data accessible to anyone",
        businessImpact: "No protection for sensitive information",
        recommendations: ["Implement basic access controls"],
      },
      High: {
        impact: "Protected against sophisticated attacks",
        businessImpact: "Protects against advanced persistent threats",
        recommendations: ["Implement E2E encryption"],
      },
    };

    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="High"
        integrityLevel="None"
        availabilityLevel="None"
        options={mockOptions}
      />
    );
    expect(screen.getByTestId("recommendation-0")).toHaveTextContent(
      "Implement E2E encryption"
    );
  });
});
