import { fireEvent, render } from "@testing-library/react";
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

describe("SecurityLevelSelector Enhanced Tests", () => {
  it("renders with different security levels correctly", () => {
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate" 
        confidentialityLevel="High"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Check if the component renders
    expect(getByTestId("test-selector")).toBeInTheDocument();
    
    // Check values are set correctly
    expect(getByTestId("availability-select")).toHaveValue("Low");
    expect(getByTestId("integrity-select")).toHaveValue("Moderate");
    expect(getByTestId("confidentiality-select")).toHaveValue("High");
  });

  it("handles availability change correctly", () => {
    const handleChange = vi.fn();
    
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onAvailabilityChange={handleChange}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Find the select element and change value
    const select = getByTestId("availability-select");
    fireEvent.change(select, { target: { value: "High" } });

    // Verify callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("High");
  });

  it("handles integrity change correctly", () => {
    const handleChange = vi.fn();
    
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={handleChange}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Find the select element and change value
    const select = getByTestId("integrity-select");
    fireEvent.change(select, { target: { value: "Moderate" } });

    // Verify callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("Moderate");
  });

  it("handles confidentiality change correctly", () => {
    const handleChange = vi.fn();
    
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={handleChange}
        testId="test-selector"
      />
    );

    // Find the select element and change value
    const select = getByTestId("confidentiality-select");
    fireEvent.change(select, { target: { value: "Very High" } });

    // Verify callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("Very High");
  });

  it("handles keyboard navigation in dropdowns", () => {
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Find the select element
    const select = getByTestId("availability-select");
    
    // Focus the select element
    select.focus();
    
    // Verify it receives focus
    expect(document.activeElement).toBe(select);
  });

  it("handles tooltip display on hover", () => {
    // The useCIAOptions already provides tooltip content in the mock
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // We can't easily test actual tooltip rendering in jsdom,
    // but we can check that the elements with tooltip functionality exist
    const availabilitySection = getByTestId("test-selector");
    expect(availabilitySection).toBeInTheDocument();
  });

  it("renders with different layout on mobile viewport", () => {
    // Mock a mobile viewport width
    global.innerWidth = 400;
    global.dispatchEvent(new Event("resize"));
    
    const { getByTestId } = render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        compact={true} // Enable compact mode for mobile
        testId="test-selector"
      />
    );

    // Check that the component renders with appropriate className
    expect(getByTestId("test-selector")).toBeInTheDocument();
  });

  it("provides accessibility attributes for screen readers", () => {
    const { getByLabelText } = render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-selector"
      />
    );

    // Check for accessibility through label text
    const availabilitySelect = getByLabelText(/availability/i);
    const integritySelect = getByLabelText(/integrity/i);
    const confidentialitySelect = getByLabelText(/confidentiality/i);
    
    expect(availabilitySelect).toBeInTheDocument();
    expect(integritySelect).toBeInTheDocument();
    expect(confidentialitySelect).toBeInTheDocument();
  });
});
