import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";

// Mock the ciaContentService
vi.mock("../../services/ciaContentService", () => {
  return {
    __esModule: true,
    default: {
      getComponentDetails: vi.fn().mockImplementation((component, level) => ({
        description: `${component} ${level} description`,
        technical: `${component} ${level} technical details`,
        uptime: component === "availability" ? "99.9% uptime" : undefined,
        validationMethod:
          component === "integrity" ? "Hash validation" : undefined,
        protectionMethod:
          component === "confidentiality" ? "Encryption" : undefined,
        effort: {
          development: `${level} development effort`,
          maintenance: `${level} maintenance effort`,
          expertise: `${level} expertise level`,
        },
        implementationSteps: ["Step 1", "Step 2"],
        codeExamples: [
          {
            title: "Example",
            language: "javascript",
            code: "console.log('test');",
          },
        ],
      })),
      getRecommendations: vi
        .fn()
        .mockReturnValue(["Recommendation 1", "Recommendation 2"]),
      getTechnicalImplementation: vi
        .fn()
        .mockImplementation((component, level) => ({
          technical: `${component} ${level} technical details`,
          steps: ["Step 1", "Step 2"],
        })),
    },
  };
});

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

    // Default active tab is confidentiality
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

    // Check confidentiality tab
    expect(screen.getByText("High expertise level")).toBeInTheDocument();

    // Switch to integrity tab and check
    fireEvent.click(screen.getByText("Integrity"));
    expect(screen.getByText("Moderate maintenance effort")).toBeInTheDocument();

    // Switch to availability tab and check
    fireEvent.click(screen.getByText("Availability"));
    expect(screen.getByText("Low development effort")).toBeInTheDocument();
  });

  it("handles different security levels", () => {
    const { rerender } = render(
      <TechnicalDetailsWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

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

    expect(
      screen.getByText("confidentiality Very High technical details")
    ).toBeInTheDocument();
  });
});
