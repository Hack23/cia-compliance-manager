// Define mocks at the top of the file, before imports
vi.mock("../hooks/useCIAOptions", () => {
  // Create mock options data
  const mockOptions = {
    availabilityOptions: {
      None: {
        description: "No availability controls",
        technical: "No technical controls",
        recommendations: ["Implement basic availability"],
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        businessImpact: "No business impact",
        impact: "No impact",
      },
      Low: {
        description: "Basic availability",
        technical: "Basic controls",
        recommendations: ["Basic recommendation"],
        capex: 10,
        opex: 5,
        bg: "#f3e5f5",
        text: "#4a148c",
        businessImpact: "Low business impact",
        impact: "Low impact",
      },
      Moderate: {
        description: "Standard availability",
        technical: "Standard controls",
        recommendations: ["Standard recommendation"],
        capex: 20,
        opex: 10,
        bg: "#e1bee7",
        text: "#6a1b9a",
        businessImpact: "Moderate business impact",
        impact: "Moderate impact",
      },
      High: {
        description: "High availability",
        technical: "Advanced controls",
        recommendations: ["Advanced recommendation"],
        capex: 40,
        opex: 30,
        bg: "#ce93d8",
        text: "#7b1fa2",
        businessImpact: "High business impact",
        impact: "High impact",
      },
      "Very High": {
        description: "Very high availability",
        impact: "Very high impact",
        technical: "Comprehensive technical controls",
        businessImpact: "Critical business impact",
        capex: 60,
        opex: 30,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Comprehensive recommendation"],
      },
    },
    integrityOptions: {
      None: {
        description: "No integrity controls",
        technical: "No technical controls",
        recommendations: ["Implement basic integrity"],
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        businessImpact: "No business impact",
        impact: "No impact",
      },
      Low: {
        description: "Basic integrity",
        technical: "Basic controls",
        recommendations: ["Basic recommendation"],
        capex: 10,
        opex: 5,
        bg: "#e8f5e9",
        text: "#1b5e20",
        businessImpact: "Low business impact",
        impact: "Low impact",
      },
      Moderate: {
        description: "Standard integrity",
        technical: "Standard controls",
        recommendations: ["Standard recommendation"],
        capex: 20,
        opex: 10,
        bg: "#c8e6c9",
        text: "#2e7d32",
        businessImpact: "Moderate business impact",
        impact: "Moderate impact",
      },
      High: {
        description: "High integrity",
        technical: "Advanced controls",
        recommendations: ["Advanced recommendation"],
        capex: 40,
        opex: 30,
        bg: "#a5d6a7",
        text: "#388e3c",
        businessImpact: "High business impact",
        impact: "High impact",
      },
    },
    confidentialityOptions: {
      None: {
        description: "No confidentiality controls",
        technical: "No technical controls",
        recommendations: ["Implement basic confidentiality"],
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        businessImpact: "No business impact",
        impact: "No impact",
      },
      Low: {
        description: "Basic confidentiality",
        technical: "Basic controls",
        recommendations: ["Basic recommendation"],
        capex: 10,
        opex: 5,
        bg: "#f3e5f5",
        text: "#4a148c",
        businessImpact: "Low business impact",
        impact: "Low impact",
      },
      Moderate: {
        description: "Standard confidentiality",
        technical: "Standard controls",
        recommendations: ["Standard recommendation"],
        capex: 20,
        opex: 10,
        bg: "#e1bee7",
        text: "#6a1b9a",
        businessImpact: "Moderate business impact",
        impact: "Moderate impact",
      },
      High: {
        description: "High confidentiality",
        technical: "Advanced controls",
        recommendations: ["Advanced recommendation"],
        capex: 40,
        opex: 30,
        bg: "#ce93d8",
        text: "#7b1fa2",
        businessImpact: "High business impact",
        impact: "High impact",
      },
    },
    // Include ROI_ESTIMATES to fix other tests
    ROI_ESTIMATES: {
      NONE: {
        returnRate: "0%",
        description: "No security investment means no return",
        potentialSavings: "$0",
        breakEvenPeriod: "N/A",
      },
      // Additional ROI estimates would be added here
      // ...
    },
  };

  return {
    // Make sure to export both the hook function and the individual options
    __esModule: true,
    default: mockOptions,
    useCIAOptions: () => mockOptions,
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
  };
});

// Import necessary modules
import { fireEvent, render, screen } from "@testing-library/react";
// Remove unused React import
// import React from "react";
import { describe, expect, it, vi } from "vitest";
import SecurityLevelSelector from "./SecurityLevelSelector";

// Import constants for test IDs to ensure consistency
import { CIA_TEST_IDS } from "../constants/testIds";

// Mock ciaContentService
vi.mock("../services/ciaContentService", () => ({
  __esModule: true,
  default: {
    getComponentDetails: vi.fn().mockImplementation(() => ({
      description: "Mocked description",
      technical: "Mocked technical details",
      recommendations: ["Recommendation 1", "Recommendation 2"],
    })),
  },
  getSecurityLevelDescription: vi.fn().mockReturnValue("Mocked description"),
}));

describe("SecurityLevelSelector", () => {
  it("renders the selector with default values", () => {
    render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onAvailabilityChange={vi.fn()}
        testId="test-selector"
      />
    );

    expect(screen.getByTestId("test-selector")).toBeInTheDocument();
  });

  it("renders with different security levels", () => {
    render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Check for select elements with correct values
    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toHaveValue(
      "Low"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toHaveValue(
      "Moderate"
    );
    expect(screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)).toHaveValue(
      "High"
    );
  });

  it("calls callback when availability level changes", () => {
    const handleChange = vi.fn();

    render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onAvailabilityChange={handleChange}
        testId="test-selector"
      />
    );

    // Find the availability select element using the correct test ID
    const selectElement = screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT);
    fireEvent.change(selectElement, { target: { value: "High" } });

    // Check if callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("High");
  });

  it("handles disabled state", () => {
    render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onAvailabilityChange={vi.fn()}
        disabled={true}
        testId="test-selector"
      />
    );

    // Check if selectors are disabled
    expect(screen.getByTestId(CIA_TEST_IDS.AVAILABILITY_SELECT)).toBeDisabled();
    expect(screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT)).toBeDisabled();
    expect(
      screen.getByTestId(CIA_TEST_IDS.CONFIDENTIALITY_SELECT)
    ).toBeDisabled();
  });
});
