import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";
import { WIDGET_TEST_IDS, TECHNICAL_DETAILS_TEST_IDS } from "../../constants/testIds";
import * as ciaContentServiceModule from '../../services/ciaContentService';
import { TechnicalImplementationDetails } from '../../types/cia-services';

// Mock ciaContentService to control technical description content
vi.mock("../../services/ciaContentService", () => ({
  default: {
    getTechnicalImplementation: vi.fn().mockImplementation((component, level) => {
      return {
        description: `${component} (${level}) technical details`,
        implementationSteps: [
          `Step 1 for ${component} at ${level} level`,
          `Step 2 for ${component} at ${level} level`,
        ],
        effort: {
          development: component === 'availability' ? 'Minimal' : 'Medium',
          maintenance: component === 'availability' ? 'Minimal' : 'Ongoing',
          expertise: component === 'availability' ? 'Basic' : 'Advanced',
        },
        rto: component === 'availability' ? 'Undefined' : undefined,
        rpo: component === 'availability' ? 'Undefined' : undefined,
        validationMethod: component === 'integrity' ? 'Test validation method' : undefined,
        protectionMethod: component === 'confidentiality' ? 'Test protection method' : undefined,
      };
    }),
    getDetailedDescription: vi.fn().mockImplementation((component, level) => {
      return `${component} (${level}) detailed description`;
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
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    expect(screen.getByText(/Technical Implementation Guide/i)).toBeInTheDocument();
  });

  it("displays technical details for the selected component", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    // Default tab is availability
    expect(screen.getByText(/availability \(None\) technical details/i)).toBeInTheDocument();
  });

  it("switches between tabs", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    
    // Find the integrity tab by testId and click it
    const integrityTab = screen.getByTestId("integrity-tab-button");
    fireEvent.click(integrityTab);
    
    // Verify tab content is displayed
    expect(screen.getByText(/integrity \(Low\) technical details/i)).toBeInTheDocument();
    
    // Find the confidentiality tab by testId and click it
    const confidentialityTab = screen.getByTestId("confidentiality-tab-button");
    fireEvent.click(confidentialityTab);
    
    // Verify confidentiality tab content is displayed
    expect(screen.getByText(/confidentiality \(Moderate\) technical details/i)).toBeInTheDocument();
  });

  it("shows implementation details for each level", () => {
    render(<TechnicalDetailsWidget {...defaultProps} />);
    
    // Check for implementation steps
    expect(screen.getByText(/Step 1 for availability at None level/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 2 for availability at None level/i)).toBeInTheDocument();
    
    // Get resource headers that should be visible in the component
    const resourcesHeader = screen.getByTestId("resources-header");
    expect(resourcesHeader).toBeInTheDocument();
    
    // Check for development, maintenance, and expertise by looking at the elements that contain
    // these terms rather than searching for exact matches with emojis
    expect(screen.getByText(/development/i, { selector: "h4" })).toBeInTheDocument();
    expect(screen.getByText(/maintenance/i, { selector: "h4" })).toBeInTheDocument();
    expect(screen.getByText(/expertise/i, { selector: "h4" })).toBeInTheDocument();
  });

  it("handles different security levels", () => {
    render(
      <TechnicalDetailsWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );
    
    // Check if availability level content is correct
    expect(screen.getByText(/availability \(High\) technical details/i)).toBeInTheDocument();
    
    // Switch to integrity tab using testId
    const integrityTab = screen.getByTestId("integrity-tab-button");
    fireEvent.click(integrityTab);
    
    // Check if integrity level content is correct
    expect(screen.getByText(/integrity \(Moderate\) technical details/i)).toBeInTheDocument();
    
    // Switch to confidentiality tab using testId
    const confidentialityTab = screen.getByTestId("confidentiality-tab-button");
    fireEvent.click(confidentialityTab);
    
    // Check if confidentiality level content is correct
    expect(screen.getByText(/confidentiality \(Low\) technical details/i)).toBeInTheDocument();
  });
});
