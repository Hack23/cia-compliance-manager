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

describe("SecurityLevelSelector Enhanced Tests", () => {
  it("renders with different security levels correctly", () => {
    render(
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

    // Check sections are present
    expect(screen.getByTestId("availability-section")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-section")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-section")).toBeInTheDocument();

    // Check values are set correctly
    expect(screen.getByTestId("availability-select")).toHaveValue("Low");
    expect(screen.getByTestId("integrity-select")).toHaveValue("Moderate");
    expect(screen.getByTestId("confidentiality-select")).toHaveValue("High");
  });

  it("handles availability change correctly", () => {
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

    // Find the select element and change value
    const select = screen.getByTestId("availability-select");
    fireEvent.change(select, { target: { value: "High" } });

    // Verify callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("High");
  });

  it("handles integrity change correctly", () => {
    const handleChange = vi.fn();
    
    render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onIntegrityChange={handleChange}
        testId="test-selector"
      />
    );

    // Find the select element and change value
    const select = screen.getByTestId("integrity-select");
    fireEvent.change(select, { target: { value: "Moderate" } });

    // Verify callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("Moderate");
  });

  it("handles confidentiality change correctly", () => {
    const handleChange = vi.fn();
    
    render(
      <SecurityLevelSelector
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onConfidentialityChange={handleChange}
        testId="test-selector"
      />
    );

    // Find the select element and change value
    const select = screen.getByTestId("confidentiality-select");
    fireEvent.change(select, { target: { value: "Very High" } });

    // Verify callback was called with correct value
    expect(handleChange).toHaveBeenCalledWith("Very High");
  });

  it("handles keyboard navigation in dropdowns", () => {
    const handleChange = vi.fn();
    
    render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        onAvailabilityChange={handleChange}
        testId="test-selector"
      />
    );

    // Find the select element
    const select = screen.getByTestId("availability-select");
    
    // Focus the select element
    select.focus();
    
    // Simulate keyboard navigation
    fireEvent.keyDown(select, { key: "ArrowDown" });
    fireEvent.keyDown(select, { key: "Enter" });
    
    // Since we can't simulate the native select dropdown fully,
    // we'll just check that the element received focus
    expect(document.activeElement).toBe(select);
  });

  it("handles tooltip display on hover", () => {
    // The useCIAOptions already provides tooltip content in the mock
    render(
      <SecurityLevelSelector
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
        testId="test-selector"
      />
    );

    // We can't easily test actual tooltip rendering in jsdom,
    // but we can check that the elements with tooltip functionality exist
    const sections = [
      screen.getByTestId("availability-section"),
      screen.getByTestId("integrity-section"),
      screen.getByTestId("confidentiality-section")
    ];
    
    // Check that each section exists
    sections.forEach(section => {
      expect(section).toBeInTheDocument();
    });
  });

  it("renders with different layout on mobile viewport", () => {
    // Mock a mobile viewport width
    global.innerWidth = 400;
    global.dispatchEvent(new Event("resize"));
    
    render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        compact={true} // Enable compact mode for mobile
        testId="test-selector"
      />
    );

    // Check that the component still renders all sections
    expect(screen.getByTestId("test-selector")).toHaveClass("space-y-3");
    expect(screen.getByTestId("availability-section")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-section")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-section")).toBeInTheDocument();
  });

  it("provides accessibility attributes for screen readers", () => {
    render(
      <SecurityLevelSelector
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        testId="test-selector"
      />
    );

    // Check for proper aria attributes
    expect(screen.getByTestId("availability-select")).toHaveAttribute("aria-label", "Select availability level");
    expect(screen.getByTestId("integrity-select")).toHaveAttribute("aria-label", "Select integrity level");
    expect(screen.getByTestId("confidentiality-select")).toHaveAttribute("aria-label", "Select confidentiality level");
  });
});
