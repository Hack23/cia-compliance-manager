import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import IntegrityImpactWidget from "./IntegrityImpactWidget";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import ciaContentService from "../../services/ciaContentService";

// Mock ciaContentService
vi.mock("../../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation((component, level) => ({
      description: `${level} integrity description`,
      businessImpact: `${level} integrity business impact`,
      validationMethod:
        level !== "None" ? `${level} validation method` : undefined,
    })),
    getBusinessImpact: vi.fn().mockImplementation((component, level) => ({
      summary: `${level} integrity business impact summary`,
      operational: {
        description: `${level} operational impact`,
        riskLevel: level === "None" ? "High Risk" : "Medium Risk",
      },
      financial: {
        description: `${level} financial impact`,
        riskLevel: level === "None" ? "High Risk" : "Low Risk",
      },
    })),
    getTechnicalImplementation: vi
      .fn()
      .mockImplementation((component, level) => ({
        description: `${level} technical implementation`,
        validationMethod:
          level !== "None" ? `${level} validation method` : undefined,
      })),
    getRecommendations: vi
      .fn()
      .mockImplementation((component, level) => [
        `${level} recommendation 1`,
        `${level} recommendation 2`,
        `${level} recommendation 3`,
        `${level} recommendation 4`,
      ]),
  },
}));

describe("IntegrityImpactWidget", () => {
  const defaultProps = {
    integrityLevel: "High" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "High" as SecurityLevel,
  };

  it("renders without crashing", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    expect(screen.getByText("High Integrity")).toBeInTheDocument();
  });

  it("displays integrity description from ciaContentService", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    expect(
      screen.getByTestId(INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_DESCRIPTION)
    ).toHaveTextContent("High integrity description");
  });

  it("displays business impact information", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Business Impact")).toBeInTheDocument();
    expect(
      screen.getByTestId(
        `${INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX}-business-impact`
      )
    ).toHaveTextContent("High integrity business impact summary");
  });

  it("displays operational and financial impact cards", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Operational Impact")).toBeInTheDocument();
    expect(screen.getByText("Financial Impact")).toBeInTheDocument();
    expect(screen.getByText("High operational impact")).toBeInTheDocument();
    expect(screen.getByText("High financial impact")).toBeInTheDocument();
  });

  it("shows validation method when available", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    expect(
      screen.getByTestId(
        `${INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX}-validation-method`
      )
    ).toHaveTextContent("High validation method");

    // Rerender with None level (which shouldn't have validation method)
    render(<IntegrityImpactWidget {...defaultProps} integrityLevel="None" />);
    expect(screen.queryByText("Validation Method")).not.toBeInTheDocument();
  });

  it("displays recommendations list", () => {
    render(<IntegrityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Recommendations")).toBeInTheDocument();

    // By default, should show only first 3 recommendations
    expect(
      screen.getByTestId(
        `${INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX}-recommendation-0`
      )
    ).toHaveTextContent("High recommendation 1");
    expect(
      screen.getByTestId(
        `${INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX}-recommendation-2`
      )
    ).toHaveTextContent("High recommendation 3");
    expect(screen.queryByText("High recommendation 4")).not.toBeInTheDocument();

    // Show more button should be visible
    expect(screen.getByText("Show All")).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-integrity-widget";
    render(<IntegrityImpactWidget {...defaultProps} testId={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("handles empty integrity details gracefully", () => {
    vi.mocked(ciaContentService.getComponentDetails).mockReturnValueOnce(
      undefined
    );
    render(<IntegrityImpactWidget {...defaultProps} />);
    expect(
      screen.getByText("Integrity details not available")
    ).toBeInTheDocument();
  });
});
