import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WIDGET_TITLES } from "../../constants/appConstants";
import { SecurityLevel } from "../../types/cia";
import IntegrityImpactWidget from "./IntegrityImpactWidget";

// Mock the CIAContentService
vi.mock("../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getComponentDetails: (component: string, level: string) => ({
        description: `Mock description for ${component} at ${level} level`,
        technical: `Mock technical details for ${component} at ${level} level`,
        recommendations: [
          `Mock recommendation 1 for ${level}`,
          `Mock recommendation 2 for ${level}`,
        ],
        capex: 10,
        opex: 5,
        bg: "green",
        text: "white",
      }),
      getBusinessImpact: (component: string, level: string) => ({
        summary: `Mock business impact for ${component} at ${level} level`,
        financial: {
          description: `Mock financial impact for ${level}`,
          riskLevel: "Medium",
        },
        operational: {
          description: `Mock operational impact for ${level}`,
          riskLevel: "Low",
        },
      }),
      getTechnicalImplementation: (component: string, level: string) => ({
        validationMethod: `Mock validation method for ${level}`,
      }),
      calculateBusinessImpactLevel: (a: string, i: string, c: string) => "Moderate",
    },
  }),
}));

describe("IntegrityImpactWidget", () => {
  const createComponent = (props = {}) => {
    const defaultProps = {
      integrityLevel: "Moderate" as SecurityLevel,
      availabilityLevel: "Moderate" as SecurityLevel,
      confidentialityLevel: "Moderate" as SecurityLevel,
      testId: "test-integrity-widget",
    };
    
    return render(
      <IntegrityImpactWidget {...defaultProps} {...props} />
    );
  };

  it("renders with default props", () => {
    const component = createComponent();
    expect(screen.getByTestId("test-integrity-widget")).toBeInTheDocument();
    expect(screen.getByText(WIDGET_TITLES.INTEGRITY_IMPACT)).toBeInTheDocument();
  });

  it("displays integrity level badge", () => {
    const component = createComponent();
    expect(screen.getByTestId("test-integrity-widget-integrity-badge")).toBeInTheDocument();
    expect(screen.getByText("Moderate")).toBeInTheDocument();
  });

  it("renders description section", () => {
    createComponent();
    expect(screen.getByText(/Mock description for integrity at Moderate level/)).toBeInTheDocument();
  });

  it("renders technical implementation section", () => {
    createComponent();
    expect(screen.getByText(/Mock technical details for integrity at Moderate level/)).toBeInTheDocument();
    expect(screen.getByText(/Mock validation method for Moderate/)).toBeInTheDocument();
  });

  it("renders business impact section", () => {
    createComponent();
    expect(screen.getByText(/Mock business impact for integrity at Moderate level/)).toBeInTheDocument();
    expect(screen.getByText(/Mock financial impact for Moderate/)).toBeInTheDocument();
    expect(screen.getByText(/Mock operational impact for Moderate/)).toBeInTheDocument();
  });

  it("renders recommendations section", () => {
    createComponent();
    expect(screen.getByText(/Mock recommendation 1 for Moderate/)).toBeInTheDocument();
    expect(screen.getByText(/Mock recommendation 2 for Moderate/)).toBeInTheDocument();
  });

  it("displays the none level correctly", () => {
    createComponent({
      integrityLevel: "None" as SecurityLevel,
      availabilityLevel: "None" as SecurityLevel,
      confidentialityLevel: "None" as SecurityLevel
    });
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("displays the low level correctly", () => {
    createComponent({
      integrityLevel: "Low" as SecurityLevel,
      availabilityLevel: "Low" as SecurityLevel,
      confidentialityLevel: "Low" as SecurityLevel
    });
    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  it("displays the high level correctly", () => {
    createComponent({
      integrityLevel: "High" as SecurityLevel,
      availabilityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel
    });
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("displays the very high level correctly", () => {
    createComponent({
      integrityLevel: "Very High" as SecurityLevel,
      availabilityLevel: "Very High" as SecurityLevel,
      confidentialityLevel: "Very High" as SecurityLevel
    });
    expect(screen.getByText("Very High")).toBeInTheDocument();
  });
});
