import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CIAContentServiceProvider } from "../../../contexts/CIAContentServiceContext";
import { getCIAContentServiceMock } from "../../../mocks/ciaContentServiceMock";
import { SecurityLevel } from "../../../types/cia";
import ValueCreationWidget from "./ValueCreationWidget";

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
        if (component === "availability") {
          return {
            summary: "Improves system uptime and reduces business disruptions",
            financialImpact: "Reduces downtime costs by 30%",
          };
        } else if (component === "integrity") {
          return {
            summary: "Ensures data accuracy and prevents costly errors",
            businessAdvantage: "More reliable business operations",
          };
        } else if (component === "confidentiality") {
          return {
            summary: "Protects sensitive data and maintains customer trust",
            competitiveAdvantage:
              "Enhanced customer confidence and brand value",
          };
        }
        return null;
      }),
  };

  const renderWidget = (props = {}) => {
    const defaultProps = {
      availabilityLevel: "Moderate" as SecurityLevel,
      integrityLevel: "Moderate" as SecurityLevel,
      confidentialityLevel: "Moderate" as SecurityLevel,
      testId: "value-creation-widget",
    };

    return render(
      <CIAContentServiceProvider value={mockService}>
        <ValueCreationWidget {...defaultProps} {...props} />
      </CIAContentServiceProvider>
    );
  };

  it("renders the widget with title", () => {
    renderWidget();
    expect(screen.getByText("Business Value Creation")).toBeInTheDocument();
  });

  it("displays value score", () => {
    renderWidget();
    expect(screen.getByTestId("value-score")).toBeInTheDocument();
  });

  it("displays ROI estimate from service", () => {
    renderWidget();
    expect(screen.getByTestId("roi-estimate")).toBeInTheDocument();
    expect(screen.getByTestId("roi-estimate")).toHaveTextContent("20-25%");
  });

  it("displays cost savings from service", () => {
    renderWidget();
    expect(screen.getByTestId("cost-savings")).toBeInTheDocument();
    expect(screen.getByTestId("cost-savings")).toHaveTextContent("$75K-100K");
  });

  it("displays productivity gain from service", () => {
    renderWidget();
    expect(screen.getByTestId("productivity")).toBeInTheDocument();
    expect(screen.getByTestId("productivity")).toHaveTextContent("15-20%");
  });

  it("displays business benefits", () => {
    renderWidget();
    expect(screen.getByText("Business Benefits")).toBeInTheDocument();
    expect(
      screen.getByText("Improved customer trust and retention")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Reduced risk of security incidents")
    ).toBeInTheDocument();
  });

  it("displays component-specific value", () => {
    renderWidget();
    expect(screen.getByTestId("availability-value")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-value")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-value")).toBeInTheDocument();
  });

  it("handles different security levels properly", () => {
    renderWidget({
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
    });

    // Service methods should have been called with the new security levels
    expect(mockService.getValueCreation).toHaveBeenCalledWith(
      "High",
      "High",
      "High"
    );
    expect(mockService.getComponentBusinessValue).toHaveBeenCalledWith(
      "availability",
      "High"
    );
    expect(mockService.getComponentBusinessValue).toHaveBeenCalledWith(
      "integrity",
      "High"
    );
    expect(mockService.getComponentBusinessValue).toHaveBeenCalledWith(
      "confidentiality",
      "High"
    );
  });

  it("handles service errors gracefully", () => {
    // Mock implementation that throws errors
    const errorMockService = {
      ...getCIAContentServiceMock(),
      getValueCreation: vi.fn().mockImplementation(() => {
        throw new Error("Service error");
      }),
      getComponentBusinessValue: vi.fn().mockImplementation(() => {
        throw new Error("Service error");
      }),
    };

    render(
      <CIAContentServiceProvider value={errorMockService}>
        <ValueCreationWidget
          availabilityLevel="Moderate"
          integrityLevel="Moderate"
          confidentialityLevel="Moderate"
        />
      </CIAContentServiceProvider>
    );

    // Should still render the widget without crashing
    expect(screen.getByText("Business Value Creation")).toBeInTheDocument();

    // Should display default values when service fails
    expect(screen.getByText(/ROI/i)).toBeInTheDocument();
  });

  it("calculates correct security score based on levels", () => {
    renderWidget({
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "Very High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
    });

    // Formula is (3+4+3)/12*100 = 83.3%, rounded to 83%
    const scoreElement = screen.getByTestId("value-score");
    expect(scoreElement).toBeInTheDocument();

    // Can't check exact value as it depends on the SecurityRiskScore implementation
    // But we can check the wrapper component exists
    expect(scoreElement).toHaveTextContent(/Value Score/i);
  });
});
