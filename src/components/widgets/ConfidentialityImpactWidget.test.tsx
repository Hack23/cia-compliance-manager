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
      />
    );
    expect(
      screen.getByTestId("widget-confidentiality-impact")
    ).toBeInTheDocument();
  });

  it("displays detailed information when available", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="High"
        integrityLevel="None"
        availabilityLevel="None"
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
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="Moderate"
        integrityLevel="None"
        availabilityLevel="None"
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
      />
    );
    const protectionLevelText = screen.getByTestId("protection-level-text");
    expect(protectionLevelText).toHaveTextContent("No protection");
  });

  it("displays recommendations when available", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="High"
        integrityLevel="None"
        availabilityLevel="None"
      />
    );
    expect(screen.getByTestId("recommendation-0")).toHaveTextContent(
      "Implement E2E encryption"
    );
  });

  it("renders without crashing", () => {
    render(
      <ConfidentialityImpactWidget
        confidentialityLevel="None"
        integrityLevel="None"
        availabilityLevel="None"
      />
    );
    expect(screen.getByText("None Confidentiality")).toBeInTheDocument();
  });
});
