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

  it("renders with default props", () => {
    render(<SecurityVisualizationWidget {...defaultProps} />);

    // Check that widget container is rendered
    const widget = screen.getByTestId(
      "widget-container-security-visualization-widget"
    );
    expect(widget).toBeInTheDocument();

    // Find the risk level element and check its content
    const riskLevel = screen.getByTestId("risk-level");
    expect(riskLevel).toBeInTheDocument();
    expect(riskLevel.textContent).toContain("High Risk");
  });
});
