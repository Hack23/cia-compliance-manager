import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SecurityLevelSelector from "./SecurityLevelSelector";

// Mock useCIAOptions hook
vi.mock("../../hooks/useCIAOptions", () => {
  const mockOptions = {
    availabilityOptions: {
      None: { description: "No availability", technical: "No controls" },
      Low: { description: "Basic availability", technical: "Basic controls" },
      Moderate: { description: "Standard availability", technical: "Standard controls" },
      High: { description: "High availability", technical: "Advanced controls" },
      "Very High": { description: "Maximum availability", technical: "Maximum controls" }
    },
    integrityOptions: {
      None: { description: "No integrity", technical: "No controls" },
      Low: { description: "Basic integrity", technical: "Basic controls" },
      Moderate: { description: "Standard integrity", technical: "Standard controls" },
      High: { description: "High integrity", technical: "Advanced controls" },
      "Very High": { description: "Maximum integrity", technical: "Maximum controls" }
    },
    confidentialityOptions: {
      None: { description: "No confidentiality", technical: "No controls" },
      Low: { description: "Basic confidentiality", technical: "Basic controls" },
      Moderate: { description: "Standard confidentiality", technical: "Standard controls" },
      High: { description: "High confidentiality", technical: "Advanced controls" },
      "Very High": { description: "Maximum confidentiality", technical: "Maximum controls" }
    }
  };

  return {
    useCIAOptions: () => mockOptions
  };
});

describe("SecurityLevelSelector", () => {
  it("renders the selector with default values", () => {
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        testId="test-selector"
      />
    );

    expect(getByTestId("test-selector")).toBeInTheDocument();
  });

  it("renders with different security levels", () => {
    render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        testId="test-selector"
      />
    );

    // Check for select elements with correct values
    expect(screen.getByTestId("availability-select")).toHaveValue("Low");
    expect(screen.getByTestId("integrity-select")).toHaveValue("Moderate");
    expect(screen.getByTestId("confidentiality-select")).toHaveValue("High");
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
    const selectElement = screen.getByTestId("availability-select");
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
        disabled={true}
        testId="test-selector"
      />
    );

    // Check if selectors are disabled
    expect(screen.getByTestId("availability-select")).toBeDisabled();
    expect(screen.getByTestId("integrity-select")).toBeDisabled();
    expect(screen.getByTestId("confidentiality-select")).toBeDisabled();
  });
});
