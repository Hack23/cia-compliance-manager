import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import SecurityLevelWidget from "./SecurityLevelWidget";
import { SecurityLevel } from "../../types/cia";
import {
  SECURITY_LEVEL_TEST_IDS,
  WIDGET_TEST_IDS,
  CIA_TEST_IDS,
} from "../../constants/testIds";
import { ROIEstimatesMap } from "../../types/cia-services";

// Mock the useCIAOptions hook
vi.mock("../../hooks/useCIAOptions", () => {
  const mockOptions = {
    availabilityOptions: {
      None: {
        description: "No availability",
        impact: "No impact",
        technical: "No technical controls",
        businessImpact: "No business impact",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Low availability",
        impact: "Low impact",
        technical: "Basic technical controls",
        businessImpact: "Minor business impact",
        capex: 10,
        opex: 5,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Basic recommendation"],
      },
      Moderate: {
        description: "Moderate availability",
        impact: "Moderate impact",
        technical: "Standard technical controls",
        businessImpact: "Moderate business impact",
        capex: 20,
        opex: 10,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Standard recommendation"],
      },
      High: {
        description: "High availability",
        impact: "High impact",
        technical: "Advanced technical controls",
        businessImpact: "Significant business impact",
        capex: 40,
        opex: 20,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Advanced recommendation"],
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
        description: "No integrity requirements",
        technical: "No controls needed",
        recommendations: ["No recommendations"],
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
        opex: 15,
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
      "Very High": {
        description: "Very high integrity",
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
    confidentialityOptions: {
      None: {
        description: "No confidentiality requirements",
        technical: "No controls needed",
        recommendations: ["No recommendations"],
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
        opex: 15,
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
      "Very High": {
        description: "Very high confidentiality",
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
    // Add ROI_ESTIMATES to fix other tests
    ROI_ESTIMATES: {
      NONE: {
        returnRate: "0%",
        description: "No security investment means no return",
        potentialSavings: "$0",
        breakEvenPeriod: "N/A",
      },
      LOW: {
        returnRate: "100%",
        description: "Basic security provides minimal return",
        potentialSavings: "$10,000",
        breakEvenPeriod: "24 months",
      },
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good value",
        potentialSavings: "$100,000",
        breakEvenPeriod: "12 months",
      },
      HIGH: {
        returnRate: "300%",
        description: "Advanced security provides excellent value",
        potentialSavings: "$500,000",
        breakEvenPeriod: "6 months",
      },
      VERY_HIGH: {
        returnRate: "400%",
        description: "Comprehensive security provides optimal value",
        potentialSavings: "$1,000,000+",
        breakEvenPeriod: "3 months",
      },
    },
  };

  return {
    // Make sure to export both the mock object AND the hook function that returns it
    __esModule: true,
    default: mockOptions,
    useCIAOptions: () => mockOptions,
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
  };
});

describe("SecurityLevelWidget Component", () => {
  const mockSetAvailability = vi.fn();
  const mockSetIntegrity = vi.fn();
  const mockSetConfidentiality = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default values", () => {
    render(<SecurityLevelWidget />);

    // Check that the widget title is rendered - use a more specific selector
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /security profile configuration/i,
      })
    ).toBeInTheDocument();

    // Check for security level selectors using role instead of testId
    expect(
      screen.getByRole("combobox", { name: /availability/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /integrity/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /confidentiality/i })
    ).toBeInTheDocument();
  });

  it("shows descriptions when available", () => {
    render(<SecurityLevelWidget />);

    // Check that descriptions are shown - use the exact text from the rendered component
    expect(
      screen.getByText("Controls who can access your data and systems")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ensures data remains accurate and unaltered")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Determines how reliably your systems can be accessed")
    ).toBeInTheDocument();
  });

  it("passes custom test ID properly", () => {
    const testId = "custom-security-level";
    render(<SecurityLevelWidget testId={testId} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("handles callbacks when availability level changes", () => {
    const mockOnAvailabilityChange = vi.fn();
    const mockSetAvailability = vi.fn();

    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        onAvailabilityChange={mockOnAvailabilityChange}
        setAvailability={mockSetAvailability}
      />
    );

    // Get availability select and change it
    const availabilitySelect = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_SELECT
    );
    fireEvent.change(availabilitySelect, { target: { value: "High" } });

    // Verify both callbacks were called with "High"
    expect(mockOnAvailabilityChange).toHaveBeenCalledWith("High");
    expect(mockSetAvailability).toHaveBeenCalledWith("High");
  });

  it("handles callbacks when integrity level changes", () => {
    const mockOnIntegrityChange = vi.fn();
    const mockSetIntegrity = vi.fn();

    render(
      <SecurityLevelWidget
        integrityLevel="None"
        onIntegrityChange={mockOnIntegrityChange}
        setIntegrity={mockSetIntegrity}
      />
    );

    // Get integrity select and change it
    const integritySelect = screen.getByTestId(CIA_TEST_IDS.INTEGRITY_SELECT);
    fireEvent.change(integritySelect, { target: { value: "High" } });

    // Verify both callbacks were called with "High"
    expect(mockOnIntegrityChange).toHaveBeenCalledWith("High");
    expect(mockSetIntegrity).toHaveBeenCalledWith("High");
  });

  it("handles callbacks when confidentiality level changes", () => {
    const mockOnConfidentialityChange = vi.fn();
    const mockSetConfidentiality = vi.fn();

    render(
      <SecurityLevelWidget
        confidentialityLevel="None"
        onConfidentialityChange={mockOnConfidentialityChange}
        setConfidentiality={mockSetConfidentiality}
      />
    );

    // Get confidentiality select and change it
    const confidentialitySelect = screen.getByTestId(
      CIA_TEST_IDS.CONFIDENTIALITY_SELECT
    );
    fireEvent.change(confidentialitySelect, { target: { value: "High" } });

    // Verify both callbacks were called with "High"
    expect(mockOnConfidentialityChange).toHaveBeenCalledWith("High");
    expect(mockSetConfidentiality).toHaveBeenCalledWith("High");
  });

  it("renders with loading state", () => {
    render(<SecurityLevelWidget loading={true} />);

    // Check for the loading indicator
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("renders with error state", () => {
    const testError = new Error("Test error");
    render(<SecurityLevelWidget error={testError} />);

    // Check for the error message
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it("works with both callback styles", () => {
    // Test with only onAvailabilityChange
    const mockOnAvailabilityChange = vi.fn();
    const mockSetAvailability = vi.fn();

    const { rerender } = render(
      <SecurityLevelWidget onAvailabilityChange={mockOnAvailabilityChange} />
    );

    // Get availability select and change it
    const availabilitySelect = screen.getByTestId(
      CIA_TEST_IDS.AVAILABILITY_SELECT
    );
    fireEvent.change(availabilitySelect, { target: { value: "Moderate" } });

    // Verify callback was called
    expect(mockOnAvailabilityChange).toHaveBeenCalledWith("Moderate");

    // Test with only setAvailability
    rerender(<SecurityLevelWidget setAvailability={mockSetAvailability} />);

    // Change it again
    fireEvent.change(availabilitySelect, { target: { value: "High" } });

    // Verify callback was called
    expect(mockSetAvailability).toHaveBeenCalledWith("High");
  });
});
