import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import SecurityVisualizationWidget from "./SecurityVisualizationWidget"; // Fixed import syntax

describe("SecurityVisualizationWidget", () => {
  const defaultProps = {
    availabilityLevel: "moderate" as SecurityLevel,
    integrityLevel: "moderate" as SecurityLevel,
    confidentialityLevel: "moderate" as SecurityLevel,
  };

  it("renders with default props", async () => {
    render(
      <SecurityVisualizationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check that widget container is rendered
    const widget = screen.getByTestId(
      "widget-container-widget-security-visualization"
    );
    expect(widget).toBeInTheDocument();

    // Find the risk level element and check its content
    const riskLevel = screen.getByTestId("widget-security-visualization-label-risk-level");
    expect(riskLevel).toBeInTheDocument();
    expect(riskLevel.textContent).toContain("Low Risk");
  });
});
