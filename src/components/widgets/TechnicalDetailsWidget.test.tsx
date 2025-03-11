import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import userEvent from "@testing-library/user-event";
import * as ciaContentServiceModule from '../../services/ciaContentService';
import { TechnicalImplementationDetails } from '../../types/cia-services';

// Mock ciaContentService to control technical description content
vi.mock("../../services/ciaContentService", () => ({
  default: {
    getTechnicalImplementation: vi
      .fn()
      .mockImplementation((component, level) => {
        if (component === "availability" && level === "None") {
          return {
            description:
              "No redundancy, backup systems, monitoring, or disaster recovery procedures are implemented.",
            effort: {
              development: "Minimal",
              maintenance: "Minimal",
              expertise: "Basic",
            },
            rto: "Undefined",
            rpo: "Undefined",
            // Add implementationSteps to prevent the TypeError
            implementationSteps: ["No implementation required"],
          };
        }
        return {
          description: `${level} technical implementation for ${component}`,
          effort: {
            development: "Medium",
            maintenance: "Ongoing",
            expertise: "Advanced",
          },
          // Add implementationSteps to prevent the TypeError
          implementationSteps: [
            `Step 1 for ${component} at ${level} level`,
            `Step 2 for ${component} at ${level} level`,
          ],
        };
      }),
  },
  createCIAContentService: vi.fn(),
}));

describe("TechnicalDetailsWidget", () => {
  const defaultProps = {
    availabilityLevel: "None",
    integrityLevel: "Low",
    confidentialityLevel: "Moderate",
    testId: WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
  };

  // Use cleanup between tests
  afterEach(() => {
    document.body.innerHTML = "";
  });

  // Update this mock to match the new structure from the refactored ciaContentService
  const mockTechnicalImplementation: TechnicalImplementationDetails = {
    description: 'Test technical implementation',
    implementationSteps: ['Step 1', 'Step 2'],
    effort: {
      development: 'Days (1-5)',
      maintenance: 'Minimal',
      expertise: 'Basic security knowledge',
    },
    requirements: ['Req 1', 'Req 2'],
    technologies: ['Tech 1', 'Tech 2'],
  };

  beforeEach(() => {
    // Reset and setup the mock implementation
    vi.mocked(ciaContentServiceModule.default.getTechnicalImplementation).mockReset();
    vi.mocked(ciaContentServiceModule.default.getTechnicalImplementation).mockImplementation(
      (component, level) => {
        // Return component-specific test data based on the inputs
        if (component === 'availability') {
          return {
            ...mockTechnicalImplementation,
            description: `Availability (${level}) technical details`
          };
        }
        if (component === 'integrity') {
          return {
            ...mockTechnicalImplementation,
            description: `Integrity (${level}) technical details`,
            validationMethod: 'Test validation method',
          };
        }
        if (component === 'confidentiality') {
          return {
            ...mockTechnicalImplementation,
            description: `Confidentiality (${level}) technical details`,
            protectionMethod: 'Test protection method',
          };
        }
        return mockTechnicalImplementation;
      }
    );
  });

  it("renders without crashing", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);

    // Use queryAllByTestId to handle duplicate IDs and check the first element
    const elements = screen.queryAllByTestId(
      WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET
    );
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });

  it("displays technical details for the selected component", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    // Default tab is availability
    // Updated expectation to match the actual implementation
    expect(screen.getByTestId("technical-description")).toHaveTextContent(
      "No redundancy, backup systems, monitoring, or disaster recovery procedures are implemented."
    );
  });

  it("switches between tabs", async () => {
    // Use container to scope queries
    const { container } = render(
      <TechnicalDetailsWidget
        availabilityLevel="Moderate"
        integrityLevel="High"
        confidentialityLevel="Very High"
        testId="test-technical-details-widget"
      />
    );

    // Create a scoped query function for this specific rendered component
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Find the integrity tab and click it
    const integrityTab = getByTestId(
      "test-technical-details-widget-integrity-tab"
    );
    fireEvent.click(integrityTab);

    // Verify tab content is displayed
    expect(getByTestId("integrity-level-indicator")).toHaveTextContent("High");

    // Find the invisible element that's used in tests for integrity tab
    const hiddenTab = getByTestId("integrity-tab");

    // Verify active tab styling on the hidden element that the test is looking for
    expect(hiddenTab).toHaveClass("border-b-2");
    expect(hiddenTab).toHaveClass("border-blue-500");

    // Test clicking the confidentiality tab
    const confidentialityTab = getByTestId(
      "test-technical-details-widget-confidentiality-tab"
    );
    fireEvent.click(confidentialityTab);

    // Verify confidentiality tab content is displayed
    expect(getByTestId("confidentiality-level-indicator")).toHaveTextContent(
      "Very High"
    );

    // Test for hidden tab styling as well
    const hiddenConfidentialityTab = getByTestId("confidentiality-tab");
    expect(hiddenConfidentialityTab).toHaveClass("border-b-2");
  });

  it("handles different security levels", () => {
    // Use container to scope queries
    const { container } = render(
      <TechnicalDetailsWidget
        availabilityLevel="Low"
        integrityLevel="Moderate"
        confidentialityLevel="High"
        testId="unique-test-id"
      />
    );

    // Create a scoped query function for this specific rendered component
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Check if availability level shows correctly
    expect(getByTestId("availability-level-indicator")).toHaveTextContent(
      "Low"
    );

    // Switch to integrity tab
    const integrityTab = getByTestId("unique-test-id-integrity-tab");
    fireEvent.click(integrityTab);

    // Check if integrity level shows correctly
    expect(getByTestId("integrity-level-indicator")).toHaveTextContent(
      "Moderate"
    );

    // Switch to confidentiality tab
    const confidentialityTab = getByTestId(
      "unique-test-id-confidentiality-tab"
    );
    fireEvent.click(confidentialityTab);

    // Check if confidentiality level shows correctly
    expect(getByTestId("confidentiality-level-indicator")).toHaveTextContent(
      "High"
    );
  });

  it("shows implementation details for each level", () => {
    const { container } = render(
      <TechnicalDetailsWidget {...defaultProps} testId="details-test-widget" />
    );

    // Create a scoped query function
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Choose a tab
    fireEvent.click(getByTestId("details-test-widget-availability-tab"));

    // Check for implementation headers
    expect(getByTestId("implementation-header")).toBeInTheDocument();
    expect(getByTestId("resources-header")).toBeInTheDocument();
    expect(getByTestId("development-effort")).toBeInTheDocument();
    expect(getByTestId("maintenance-level")).toBeInTheDocument();
    expect(getByTestId("required-expertise")).toBeInTheDocument();
  });

  it("handles backward compatibility props", () => {
    const { container } = render(
      <TechnicalDetailsWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
        testId="compat-test-widget"
      />
    );

    // Create a scoped query function
    const getByTestId = (id: string) => within(container).getByTestId(id);

    // Should use the backward compatibility props
    expect(getByTestId("availability-level-indicator")).toHaveTextContent(
      "High"
    );

    // Switch to integrity tab
    fireEvent.click(getByTestId("compat-test-widget-integrity-tab"));
    expect(getByTestId("integrity-level-indicator")).toHaveTextContent("High");
  });

  it('renders without crashing', () => {
    render(<TechnicalDetailsWidget 
      availabilityLevel="Moderate" 
      integrityLevel="Moderate" 
      confidentialityLevel="Moderate" 
    />);
    
    expect(screen.getByText(/Technical Implementation Guide/i)).toBeInTheDocument();
  });

  it('displays technical details for the selected tab', () => {
    render(<TechnicalDetailsWidget 
      availabilityLevel="High" 
      integrityLevel="Moderate" 
      confidentialityLevel="Low" 
    />);
    
    // By default, it should show availability tab
    expect(screen.getByText(/Availability \(High\) technical details/i)).toBeInTheDocument();
    
    // Switch to integrity tab
    const integrityTab = screen.getByTestId('integrity-tab-button');
    integrityTab.click();
    
    // Now it should show integrity details
    expect(screen.getByText(/Integrity \(Moderate\) technical details/i)).toBeInTheDocument();
    
    // Switch to confidentiality tab
    const confidentialityTab = screen.getByTestId('confidentiality-tab-button');
    confidentialityTab.click();
    
    // Now it should show confidentiality details
    expect(screen.getByText(/Confidentiality \(Low\) technical details/i)).toBeInTheDocument();
  });

  // Add more tests as needed
});
