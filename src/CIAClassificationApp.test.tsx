import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";

// Define mocks using vi.hoisted() to ensure they're available when the mocks are hoisted
const mockRenderWidget = vi.hoisted(() =>
  vi.fn().mockImplementation((id, props) => {
    return (
      <div key={id} data-testid={`widget-${id}`}>
        Mock Widget {id}
      </div>
    );
  })
);

const mockRenderWidgets = vi.hoisted(() =>
  vi.fn().mockImplementation((filter, props) => [
    <div key="widget1" data-testid="widget-1">
      Mocked Widget 1
    </div>,
    <div key="widget2" data-testid="widget-2">
      Mocked Widget 2
    </div>,
  ])
);

// Mock the useCIAOptions hook
vi.mock("./hooks/useCIAOptions", () => {
  const mockOptions = {
    availabilityOptions: {
      None: {
        description: "No availability",
        impact: "No impact",
        technical: "No technical controls",
        businessImpact: "No business impact",
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        recommendations: [],
      },
      Low: {
        description: "Low availability",
        impact: "Low impact",
        technical: "Basic technical controls",
        businessImpact: "Minor business impact",
        capex: 10,
        opex: 5,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Basic recommendation"],
      },
      Moderate: {
        description: "Moderate availability",
        impact: "Moderate impact",
        technical: "Standard technical controls",
        businessImpact: "Moderate business impact",
        capex: 20,
        opex: 10,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Standard recommendation"],
      },
      High: {
        description: "High availability",
        impact: "High impact",
        technical: "Advanced technical controls",
        businessImpact: "Significant business impact",
        capex: 40,
        opex: 20,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Advanced recommendation"],
      },
      "Very High": {
        description: "Very high availability",
        impact: "Very high impact",
        technical: "Comprehensive technical controls",
        businessImpact: "Critical business impact",
        capex: 60,
        opex: 30,
        bg: "#efefef",
        text: "#000000",
        recommendations: ["Comprehensive recommendation"],
      },
    },
    integrityOptions: {
      None: {
        description: "No integrity requirements",
        technical: "No controls needed",
        recommendations: ["No recommendations"],
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        businessImpact: "No business impact",
        impact: "No impact",
      },
      Low: {
        description: "Basic integrity",
        technical: "Basic controls",
        recommendations: ["Basic recommendation"],
        capex: 10,
        opex: 5,
        bg: "#e8f5e9",
        text: "#1b5e20",
        businessImpact: "Low business impact",
        impact: "Low impact",
      },
      // Add remaining integrity options...
    },
    confidentialityOptions: {
      None: {
        description: "No confidentiality requirements",
        technical: "No controls needed",
        recommendations: ["No recommendations"],
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
        businessImpact: "No business impact",
        impact: "No impact",
      },
      Low: {
        description: "Basic confidentiality",
        technical: "Basic controls",
        recommendations: ["Basic recommendation"],
        capex: 10,
        opex: 5,
        bg: "#f3e5f5",
        text: "#4a148c",
        businessImpact: "Low business impact",
        impact: "Low impact",
      },
      // Add remaining confidentiality options...
    },
    ROI_ESTIMATES: {
      NONE: {
        returnRate: "0%",
        description: "No security investment means no return",
        potentialSavings: "$0",
        breakEvenPeriod: "N/A",
      },
      LOW: {
        returnRate: "100%",
        description: "Basic security provides minimal return",
        potentialSavings: "$10,000",
        breakEvenPeriod: "24 months",
      },
      // Add remaining ROI estimates...
    },
  };

  return {
    __esModule: true,
    default: mockOptions,
    useCIAOptions: () => mockOptions,
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
  };
});

// Mock the widgetRegistry module
vi.mock("./utils/widgetRegistry", () => {
  return {
    __esModule: true,
    default: {
      renderWidget: mockRenderWidget,
      renderWidgets: mockRenderWidgets,
      register: vi.fn(),
      get: vi.fn(),
      getAll: vi.fn(),
    },
    renderWidget: mockRenderWidget,
    renderWidgets: mockRenderWidgets,
    widgetRegistry: {
      renderWidget: mockRenderWidget,
      renderWidgets: mockRenderWidgets,
      register: vi.fn(),
      get: vi.fn(),
      getAll: vi.fn(),
    },
  };
});

describe("CIAClassificationApp", () => {
  it("renders the app with all required components", () => {
    // Render the component
    render(<CIAClassificationApp />);

    // Check for the main title
    expect(
      screen.getByText(/CIA Compliance Manager Dashboard/i)
    ).toBeInTheDocument();

    // Instead of checking for role="main" which doesn't exist,
    // check for the dashboard grid container using its data-testid
    expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();

    // Check for elements that should be visible on the dashboard
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    // Verify the page structure is correct by checking the container class
    const dashboardContainer = screen.getByTestId("dashboard-grid");
    expect(dashboardContainer).toHaveClass("dashboard-grid");
  });
});
