import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import ValueCreationWidget from "./ValueCreationWidget";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  default: {
    getROIEstimates: vi.fn().mockImplementation((level) => ({
      returnRate: `${level === "None" ? "0" : "200"}%`,
      description: `${level} ROI description`,
      potentialSavings: "$100,000",
      breakEvenPeriod: "12 months",
    })),
    getValueCreationPoints: vi
      .fn()
      .mockImplementation((level) => [
        `${level} value point 1`,
        `${level} value point 2`,
      ]),
  },
  // Additional mock exports
  getValuePoints: vi
    .fn()
    .mockImplementation((level) => [
      `${level} value point 1`,
      `${level} value point 2`,
    ]),
  getROIEstimate: vi.fn().mockImplementation((level) => ({
    value: level === "None" ? "0%" : "200%",
    description: `${level} ROI description`,
  })),
  getImplementationConsiderations: vi
    .fn()
    .mockImplementation((level) => [
      `${level} implementation consideration 1`,
      `${level} implementation consideration 2`,
    ]),
}));

describe("ValueCreationWidget", () => {
  it("renders the widget with None level", () => {
    render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.NONE}
        availabilityLevel={SECURITY_LEVELS.NONE}
        integrityLevel={SECURITY_LEVELS.NONE}
        confidentialityLevel={SECURITY_LEVELS.NONE}
      />
    );

    // Check widget title is rendered
    expect(screen.getByText("Security Value Creation")).toBeInTheDocument();

    // Check for None level in the status badge specifically
    const statusBadge = screen.getByTestId("status-badge");
    expect(statusBadge).toHaveTextContent(SECURITY_LEVELS.NONE);

    // Verify the ROI description is shown correctly
    expect(screen.getByText("None ROI description")).toBeInTheDocument();
  });

  it("renders the widget with High level", () => {
    render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.HIGH}
        availabilityLevel={SECURITY_LEVELS.HIGH}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
      />
    );

    // Check for High level in the status badge specifically
    const statusBadge = screen.getByTestId("status-badge");
    expect(statusBadge).toHaveTextContent(SECURITY_LEVELS.HIGH);

    // Check value points are rendered correctly
    expect(screen.getByText("High value point 1")).toBeInTheDocument();
    expect(screen.getByText("High value point 2")).toBeInTheDocument();

    // Check value points list exists by finding first value point
    const valuePoint = screen.getByTestId(
      "value-creation-widget-value-point-0"
    );
    expect(valuePoint).toBeInTheDocument();
  });

  it("displays ROI information", () => {
    render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.MODERATE}
        availabilityLevel={SECURITY_LEVELS.MODERATE}
        integrityLevel={SECURITY_LEVELS.MODERATE}
        confidentialityLevel={SECURITY_LEVELS.MODERATE}
      />
    );

    // Check for the ROI metrics cards
    const roiCard = screen.getByTestId("value-creation-widget-roi");
    expect(roiCard).toBeInTheDocument();

    // Check for ROI description text
    expect(screen.getByText("Moderate ROI description")).toBeInTheDocument();

    // Check for business benefits section
    expect(screen.getByText("Business Benefits")).toBeInTheDocument();
  });

  it("displays different value points for different security levels", () => {
    const { rerender } = render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.LOW}
        availabilityLevel={SECURITY_LEVELS.LOW}
        integrityLevel={SECURITY_LEVELS.LOW}
        confidentialityLevel={SECURITY_LEVELS.LOW}
      />
    );

    // Check Low level value point
    expect(screen.getByText(/Low value point 1/i)).toBeInTheDocument();

    // Rerender with High level
    rerender(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.HIGH}
        availabilityLevel={SECURITY_LEVELS.HIGH}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
      />
    );

    // Check High level value point
    expect(screen.getByText(/High value point 1/i)).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-value-creation";
    render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.MODERATE}
        availabilityLevel={SECURITY_LEVELS.MODERATE}
        integrityLevel={SECURITY_LEVELS.MODERATE}
        confidentialityLevel={SECURITY_LEVELS.MODERATE}
        testId={testId}
      />
    );

    // Check if the custom testId is applied to the widget container
    expect(screen.getByTestId(testId)).toBeInTheDocument();

    // Check for ROI metrics cards with the custom prefix
    expect(screen.getByTestId(`${testId}-roi`)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-savings`)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-breakeven`)).toBeInTheDocument();
  });
});
