import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import ValueCreationWidget from "./ValueCreationWidget";
import { CIAContentServiceProvider } from "../../../contexts/CIAContentServiceContext";
import { getCIAContentServiceMock } from "../../../mocks/ciaContentServiceMock";

describe("ValueCreationWidget", () => {
  // Mock service with implementation for value creation methods
  const mockService = {
    ...getCIAContentServiceMock(),
    getValueCreation: vi.fn().mockReturnValue({
      roi: "20-25%",
      roiTimeframe: "Over 2 years",
      costSavings: "$75K-100K",
      savingsTimeframe: "Annual",
      productivityGain: "15-20%",
      productivityDetails: "Improved system availability",
      strategicValue: "Enables future growth and meets compliance requirements",
      benefits: [
        "Improved customer trust and retention",
        "Reduced risk of security incidents",
        "Enhanced compliance with regulatory requirements",
        "Better decision making with reliable data",
      ],
    }),
    getComponentBusinessValue: vi
      .fn()
      .mockImplementation((component, level) => {
        return {
          summary: `${level} ${component} value summary`,
          benefits: [
            `${level} ${component} benefit 1`,
            `${level} ${component} benefit 2`,
          ],
          metrics: {
            trustScore: component === "confidentiality" ? "85%" : "75%",
            efficiencyGain: component === "availability" ? "25%" : "15%",
            qualityImprovement: component === "integrity" ? "40%" : "20%",
          },
        };
      }),
    getBusinessValueSummary: vi.fn().mockImplementation((a, i, c) => {
      return `Business value summary for ${a}/${i}/${c} security levels`;
    }),
    getROIEstimate: vi.fn().mockImplementation((a, i, c) => {
      const levels = { None: 0, Low: 1, Moderate: 2, High: 3, "Very High": 4 };
      const score = (levels[a] + levels[i] + levels[c]) / 3;
      
      if (score < 1) return { value: "20-50%", description: "Basic return" };
      if (score < 2) return { value: "50-100%", description: "Moderate return" };
      if (score < 3) return { value: "100-200%", description: "Good return" };
      return { value: "200-300%", description: "Excellent return" };
    }),
    getComponentValueStatements: vi.fn().mockImplementation((component, level) => {
      return [
        `${component} ${level} value statement 1`,
        `${component} ${level} value statement 2`,
        `${component} ${level} value statement 3`,
      ];
    }),
    getBusinessValueMetrics: vi.fn().mockImplementation((a, i, c) => {
      return [
        {
          category: "Trust Enhancement",
          value: "85%",
          description: "Increased customer and partner trust",
          icon: "🤝",
        },
        {
          category: "Operational Efficiency",
          value: "30%",
          description: "Improved operational efficiency",
          icon: "⚙️",
        },
        {
          category: "Risk Reduction",
          value: "70%",
          description: "Reduced likelihood of disruptions",
          icon: "🛡️",
        },
      ];
    }),
  };

  const renderWidget = (props = {}) => {
    const defaultProps = {
      availabilityLevel: "Moderate" as SecurityLevel,
      integrityLevel: "Moderate" as SecurityLevel,
      confidentialityLevel: "Moderate" as SecurityLevel,
      testId: "test-value-creation-widget",
    };

    return render(
      <CIAContentServiceProvider value={mockService}>
        <ValueCreationWidget {...defaultProps} {...props} />
      </CIAContentServiceProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the widget with title", () => {
    renderWidget();
    expect(screen.getByText(/Business Value Creation/i)).toBeInTheDocument();
  });

  it("displays value score", () => {
    renderWidget();
    expect(screen.getByText(/Overall Value Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Level/i)).toBeInTheDocument();
  });

  it("displays ROI estimate from service", () => {
    renderWidget();
    expect(screen.getByText(/Estimated Return on Investment/i)).toBeInTheDocument();
    expect(screen.getByTestId("roi-value")).toBeInTheDocument();
    expect(mockService.getROIEstimate).toHaveBeenCalledWith("Moderate", "Moderate", "Moderate");
  });

  it("displays business value metrics from service", () => {
    renderWidget();
    expect(screen.getByTestId("value-metrics-grid")).toBeInTheDocument();
    expect(mockService.getBusinessValueMetrics).toHaveBeenCalledWith("Moderate", "Moderate", "Moderate");
    
    // Check that the metrics are displayed
    expect(screen.getByText("Trust Enhancement")).toBeInTheDocument();
    expect(screen.getByText("Operational Efficiency")).toBeInTheDocument();
    expect(screen.getByText("Risk Reduction")).toBeInTheDocument();
  });

  it("displays component-specific value", () => {
    renderWidget();
    
    // Check availability section
    expect(screen.getByTestId("availability-value-section")).toBeInTheDocument();
    expect(screen.getByText(/Availability Value/)).toBeInTheDocument();
    expect(mockService.getComponentValueStatements).toHaveBeenCalledWith("availability", "Moderate");
    
    // Check integrity section
    expect(screen.getByTestId("integrity-value-section")).toBeInTheDocument();
    expect(screen.getByText(/Integrity Value/)).toBeInTheDocument();
    expect(mockService.getComponentValueStatements).toHaveBeenCalledWith("integrity", "Moderate");
    
    // Check confidentiality section
    expect(screen.getByTestId("confidentiality-value-section")).toBeInTheDocument();
    expect(screen.getByText(/Confidentiality Value/)).toBeInTheDocument();
    expect(mockService.getComponentValueStatements).toHaveBeenCalledWith("confidentiality", "Moderate");
  });

  it("handles different security levels properly", () => {
    renderWidget({
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "Low" as SecurityLevel,
      confidentialityLevel: "Very High" as SecurityLevel,
    });

    // Service should be called with the new levels
    expect(mockService.getROIEstimate).toHaveBeenCalledWith("High", "Low", "Very High");
    expect(mockService.getBusinessValueMetrics).toHaveBeenCalledWith("High", "Low", "Very High");
    expect(mockService.getComponentValueStatements).toHaveBeenCalledWith("availability", "High");
    expect(mockService.getComponentValueStatements).toHaveBeenCalledWith("integrity", "Low");
    expect(mockService.getComponentValueStatements).toHaveBeenCalledWith("confidentiality", "Very High");
  });

  it("handles service errors gracefully", () => {
    // Create a mock service that throws errors
    const errorMockService = {
      ...getCIAContentServiceMock(),
      getROIEstimate: vi.fn().mockImplementation(() => {
        throw new Error("ROI estimation error");
      }),
      getBusinessValueMetrics: vi.fn().mockImplementation(() => {
        throw new Error("Business metrics error");
      }),
    };

    // Render with the error-throwing service
    render(
      <CIAContentServiceProvider value={errorMockService}>
        <ValueCreationWidget
          availabilityLevel="Moderate"
          integrityLevel="Moderate"
          confidentialityLevel="Moderate"
        />
      </CIAContentServiceProvider>
    );

    // Should still render without crashing
    expect(screen.getByText(/Business Value Creation/i)).toBeInTheDocument();
    
    // Should display fallback content
    expect(screen.getByTestId("roi-value")).toBeInTheDocument();
    expect(screen.getByTestId("value-metrics-grid")).toBeInTheDocument();
  });

  it("calculates correct security score based on levels", () => {
    renderWidget({
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
    });

    // The UI should reflect the High security level
    expect(screen.getByText("Security Level:").nextElementSibling).toHaveTextContent("High");
    
    // With a different set of levels
    renderWidget({
      availabilityLevel: "Low" as SecurityLevel,
      integrityLevel: "Low" as SecurityLevel,
      confidentialityLevel: "Low" as SecurityLevel,
    });
    
    // The UI should reflect the Low security level
    expect(screen.getByText("Security Level:").nextElementSibling).toHaveTextContent("Low");
  });
});
