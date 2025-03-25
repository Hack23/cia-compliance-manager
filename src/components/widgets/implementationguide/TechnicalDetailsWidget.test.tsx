import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";

// Mock the useCIAContentService hook
vi.mock("../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getTechnicalImplementation: vi.fn().mockReturnValue({
        description: "Mock technical implementation",
        implementationSteps: ["Step 1", "Step 2"],
        effort: {
          development: "Weeks (2-4)",
          maintenance: "Regular",
          expertise: "Security professional",
        },
      }),
      // Add the missing getComponentDetails function
      getComponentDetails: vi.fn().mockImplementation((component, level) => ({
        description: `${component} ${level} description`,
        technical: `${component} ${level} technical details`,
        businessImpact: `${component} ${level} business impact`,
      })),
      getImplementationTime: vi.fn().mockReturnValue("1-2 months"),
      getImplementationDifficulty: vi.fn().mockReturnValue("Moderate"),
      // Fix: Add getTechnicalDescription that returns the expected format
      getTechnicalDescription: vi
        .fn()
        .mockImplementation(
          (component, level) => `${component} ${level} technical details`
        ),
    },
  }),
}));

describe("TechnicalDetailsWidget", () => {
  it("renders without crashing", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(
      screen.getByText("Technical Implementation Details")
    ).toBeInTheDocument();
  });

  it("displays technical details for the selected component", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // The test shows that Availability is the default tab that's active, not confidentiality
    // We need to click on the confidentiality tab first
    fireEvent.click(screen.getByTestId("confidentiality-tab"));

    // Now check for content in the confidentiality tab
    expect(
      screen.getByText("confidentiality Moderate technical details")
    ).toBeInTheDocument();
  });

  it("switches between tabs", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Click on integrity tab
    fireEvent.click(screen.getByText("Integrity"));
    expect(
      screen.getByText("integrity Moderate technical details")
    ).toBeInTheDocument();

    // Click on availability tab
    fireEvent.click(screen.getByText("Availability"));
    expect(
      screen.getByText("availability Moderate technical details")
    ).toBeInTheDocument();

    // Back to confidentiality
    fireEvent.click(screen.getByText("Confidentiality"));
    expect(
      screen.getByText("confidentiality Moderate technical details")
    ).toBeInTheDocument();
  });

  it("shows implementation details for each level", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
      />
    );

    // Test implementation effort sections instead of specific text
    expect(screen.getByText(/expertise/i)).toBeInTheDocument();
    expect(screen.getByText(/maintenance/i)).toBeInTheDocument();
    expect(screen.getByText(/development/i)).toBeInTheDocument();
  });

  it("handles different security levels", () => {
    const { rerender } = render(
      <TechnicalDetailsWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    // Click on the confidentiality tab first
    fireEvent.click(screen.getByTestId("confidentiality-tab"));

    // Now check for confidentiality content
    expect(
      screen.getByText("confidentiality None technical details")
    ).toBeInTheDocument();

    rerender(
      <TechnicalDetailsWidget
        availabilityLevel="Very High"
        integrityLevel="Very High"
        confidentialityLevel="Very High"
      />
    );

    // Click on confidentiality tab again after rerender
    fireEvent.click(screen.getByTestId("confidentiality-tab"));

    // Check for updated content
    expect(
      screen.getByText("confidentiality Very High technical details")
    ).toBeInTheDocument();
  });
});
