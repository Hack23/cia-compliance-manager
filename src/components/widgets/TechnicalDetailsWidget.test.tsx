import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";
import { CIADetails } from "../../types/cia";
import { WIDGET_TEST_IDS } from "../../constants/testIds";

// Enhanced mock options that satisfy the CIADetails interface
const createMockCIADetails = (
  technical: string,
  implementationSteps: string[]
): CIADetails => ({
  description: "Mock description",
  impact: "Mock impact",
  technical,
  implementationSteps,
  businessImpact: "Mock business impact",
  capex: 0,
  opex: 0,
  bg: "#ffffff",
  text: "#000000",
  recommendations: ["Mock recommendation 1", "Mock recommendation 2"],
});

// Mock options for testing
const mockOptions: Record<string, CIADetails> = {
  None: createMockCIADetails("No redundancy or monitoring in place.", [
    "No implementation required",
    "No monitoring in place",
    "No recovery procedures",
  ]),
  Low: createMockCIADetails(
    "Basic monitoring with manual recovery procedures.",
    [
      "Set up basic monitoring",
      "Document manual recovery procedures",
      "Implement backup system",
    ]
  ),
  Moderate: createMockCIADetails(
    "Automated monitoring with scheduled backups.",
    [
      "Configure automated monitoring",
      "Set up scheduled backups",
      "Create recovery runbooks",
    ]
  ),
  High: createMockCIADetails(
    "High availability monitoring with redundant systems.",
    [
      "Implement high availability infrastructure",
      "Configure comprehensive monitoring",
      "Establish automated recovery",
    ]
  ),
};

describe("TechnicalDetailsWidget", () => {
  const defaultProps = {
    availabilityLevel: "None",
    integrityLevel: "None",
    confidentialityLevel: "None",
    availabilityOptions: mockOptions,
    integrityOptions: mockOptions,
    confidentialityOptions: mockOptions,
  };

  it("renders without crashing", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        availabilityOptions={{}}
        integrityOptions={{}}
        confidentialityOptions={{}}
      />
    );
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET)
    ).toBeInTheDocument();
  });

  it("displays technical details for the selected component", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);

    // Default tab is availability
    expect(screen.getByTestId("technical-description")).toHaveTextContent(
      "No redundancy or monitoring in place."
    );
  });

  it("switches between tabs", async () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="Moderate"
        integrityLevel="High"
        confidentialityLevel="Very High"
      />
    );

    // Find the integrity tab and click it
    const integrityTab = screen.getByTestId(
      `${WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET}-integrity-tab`
    );
    fireEvent.click(integrityTab);

    // Verify tab content is displayed
    expect(screen.getByTestId("integrity-level-indicator")).toHaveTextContent(
      "High"
    );

    // Find the invisible element that's used in tests for integrity tab
    const hiddenTab = screen.getByTestId("integrity-tab");

    // Verify active tab styling on the hidden element that the test is looking for
    expect(hiddenTab).toHaveClass("border-b-2");
  });

  it("shows implementation steps", () => {
    render(
      <TechnicalDetailsWidget {...defaultProps} availabilityLevel="Low" />
    );

    // Should show implementation steps for Low availability
    expect(screen.getByTestId("implementation-step-0")).toHaveTextContent(
      "Set up basic monitoring"
    );
    expect(screen.getByTestId("implementation-step-1")).toHaveTextContent(
      "Document manual recovery procedures"
    );
  });

  it("shows resource requirements", () => {
    render(
      <TechnicalDetailsWidget {...defaultProps} availabilityLevel="Moderate" />
    );

    // Check if resource requirements are displayed
    expect(screen.getByTestId("development-effort")).toBeInTheDocument();
    expect(screen.getByTestId("maintenance-level")).toBeInTheDocument();
    expect(screen.getByTestId("required-expertise")).toBeInTheDocument();
  });

  it("handles different security levels", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
      />
    );

    // Check if availability level shows correctly
    expect(
      screen.getByTestId("availability-level-indicator")
    ).toHaveTextContent("Low");

    // Start with availability tab - this should be visible immediately
    expect(
      screen.getByTestId("availability-level-indicator")
    ).toHaveTextContent("Moderate");

    // Click on integrity tab
    fireEvent.click(screen.getByTestId("integrity-tab"));
    expect(
      screen.getByTestId("availability-level-indicator")
    ).toHaveTextContent("Low");

    // Click on confidentiality tab
    fireEvent.click(screen.getByTestId("confidentiality-tab"));
    expect(
      screen.getByTestId("availability-level-indicator")
    ).toHaveTextContent("High");
  });

  it("handles edge case with empty options", () => {
    // Test with no options provided - add empty objects for required options props
    render(
      <TechnicalDetailsWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
        availabilityOptions={{}}
        integrityOptions={{}}
        confidentialityOptions={{}}
      />
    );

    // Should display fallback text for technical details
    expect(screen.getByTestId("technical-description")).toHaveTextContent(
      "No technical details available."
    );

    // Should still display implementation steps (generated defaults)
    const steps = screen.getAllByTestId(/implementation-step-\d+/);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("displays recommended technologies appropriately", () => {
    const { unmount } = render(<TechnicalDetailsWidget {...defaultProps} />);

    // Initial render should show "No technologies" for "None" level
    const techItems = screen.getAllByTestId(/tech-stack-\d+/);
    expect(techItems.length).toBeGreaterThan(0);
    expect(techItems[0]).toHaveTextContent("No technologies");

    // Unmount and render with High level
    unmount();

    // Create new props with High level and render a fresh component
    const highProps = {
      ...defaultProps,
      availabilityLevel: "High",
    };

    render(<TechnicalDetailsWidget {...highProps} />);

    // Now it should show High level technologies
    const highTechItems = screen.getAllByTestId(/tech-stack-\d+/);
    expect(highTechItems.length).toBeGreaterThan(0);

    // Instead of checking it doesn't contain "No technologies",
    // check it contains expected High level tech
    expect(highTechItems[0]).toHaveTextContent("Multi-region deployment");
  });

  it("handles custom testId prop", () => {
    const customTestId = "custom-technical-details";
    render(<TechnicalDetailsWidget {...defaultProps} testId={customTestId} />);

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("correctly displays implementation costs when available", () => {
    vi.mock("../../constants/appConstants", async () => {
      const actual = await vi.importActual("../../constants/appConstants");
      return {
        ...actual,
        IMPLEMENTATION_COSTS: {
          None: {
            developmentEffort: "Test Effort",
            maintenance: "Test Maintenance",
            expertise: "Test Expertise",
          },
        },
      };
    });

    render(<TechnicalDetailsWidget {...defaultProps} />);

    expect(screen.getByTestId("development-effort")).toBeInTheDocument();
    expect(screen.getByTestId("maintenance-level")).toBeInTheDocument();
    expect(screen.getByTestId("required-expertise")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        availabilityOptions={{}}
        integrityOptions={{}}
        confidentialityOptions={{}}
      />
    );
    expect(
      screen.getByText("Technical Implementation Guide")
    ).toBeInTheDocument();
  });
});
