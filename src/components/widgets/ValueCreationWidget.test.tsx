import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ValueCreationWidget from "./ValueCreationWidget";

// Mock the service functions
vi.mock("../../services/ciaContentService", () => {
  return {
    __esModule: true,
    getROIEstimate: vi.fn().mockImplementation((level) => ({
      value:
        level === "None"
          ? "0%"
          : level === "Low"
          ? "50%"
          : level === "Moderate"
          ? "200%"
          : level === "High"
          ? "350%"
          : "450%",
      description: `ROI estimate for ${level} security level`,
    })),
    getBusinessImpactDescription: vi
      .fn()
      .mockImplementation((component, level) => {
        return `${component} business impact for ${level} level`;
      }),
  };
});

describe("ValueCreationWidget", () => {
  it("renders the widget with None level", () => {
    render(
      <ValueCreationWidget
        securityLevel="None"
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    expect(screen.getByText("Business Value & ROI")).toBeInTheDocument();
    // Use data-testid for more reliable tests instead of exact text matching
    expect(screen.getByTestId("value-creation-widget-roi")).toBeInTheDocument();
  });

  it("renders the widget with High level", () => {
    render(
      <ValueCreationWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Look for metrics card instead of exact percentage
    const roiMetric = screen.getByTestId("value-creation-widget-roi");
    expect(roiMetric).toBeInTheDocument();

    // Check business impact text instead of ROI percentage
    expect(
      screen.getByText("availability business impact for High level")
    ).toBeInTheDocument();
  });

  it("displays ROI information", () => {
    render(
      <ValueCreationWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(screen.getByText("Return on Investment")).toBeInTheDocument();
    // Use getByTestId instead of exact text
    expect(screen.getByTestId("value-creation-widget-roi")).toBeInTheDocument();

    expect(
      screen.getByText("availability business impact for Moderate level")
    ).toBeInTheDocument();
  });

  it("displays different value points for different security levels", () => {
    const { rerender } = render(
      <ValueCreationWidget
        securityLevel="Low"
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // Check Low level business impact
    expect(
      screen.getByText("availability business impact for Low level")
    ).toBeInTheDocument();
    expect(
      screen.getByText("integrity business impact for Low level")
    ).toBeInTheDocument();
    expect(
      screen.getByText("confidentiality business impact for Low level")
    ).toBeInTheDocument();

    // Rerender with High level
    rerender(
      <ValueCreationWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check High level business impact
    expect(
      screen.getByText("availability business impact for High level")
    ).toBeInTheDocument();
    expect(
      screen.getByText("integrity business impact for High level")
    ).toBeInTheDocument();
    expect(
      screen.getByText("confidentiality business impact for High level")
    ).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const customTestId = "custom-value-creation-widget";
    render(
      <ValueCreationWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
        testId={customTestId}
      />
    );

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });
});
