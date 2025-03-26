// Use vi.hoisted for mock creation - this properly hoists the mock to the top
const mockOptions = vi.hoisted(() => ({
  availabilityOptions: {
    None: { description: "No availability", capex: 0, opex: 0 },
    Low: { description: "Low availability", capex: 5, opex: 2 },
    Moderate: { description: "Moderate availability", capex: 10, opex: 5 },
    High: { description: "High availability", capex: 15, opex: 8 },
    "Very High": { description: "Very High availability", capex: 20, opex: 10 },
  },
  integrityOptions: {
    None: { description: "No integrity", capex: 0, opex: 0 },
    Low: { description: "Low integrity", capex: 5, opex: 2 },
    Moderate: { description: "Moderate integrity", capex: 10, opex: 5 },
    High: { description: "High integrity", capex: 15, opex: 8 },
    "Very High": { description: "Very High integrity", capex: 20, opex: 10 },
  },
  confidentialityOptions: {
    None: { description: "No confidentiality", capex: 0, opex: 0 },
    Low: { description: "Low confidentiality", capex: 5, opex: 2 },
    Moderate: { description: "Moderate confidentiality", capex: 10, opex: 5 },
    High: { description: "High confidentiality", capex: 15, opex: 8 },
    "Very High": {
      description: "Very High confidentiality",
      capex: 20,
      opex: 10,
    },
  },
  ROI_ESTIMATES: {
    NONE: { returnRate: "0%", description: "No ROI" },
    LOW: { returnRate: "50%", description: "Low ROI" },
    MODERATE: { returnRate: "200%", description: "Moderate ROI" },
    HIGH: { returnRate: "350%", description: "High ROI" },
    VERY_HIGH: { returnRate: "500%", description: "Very High ROI" },
  },
}));

// Define mocks using vi.hoisted to ensure they're available when the mocks are hoisted
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
  vi.fn().mockImplementation((_filter, _props) => [
    <div key="widget1" data-testid="widget-1">
      Mocked Widget 1
    </div>,
    <div key="widget2" data-testid="widget-2">
      Mocked Widget 2
    </div>,
  ])
);

// Mock the useCIAOptions hook
vi.mock("./hooks/useCIAOptions", () => ({
  __esModule: true,
  // Fix: Use function to return the object instead of calling it
  useCIAOptions: () => mockOptions,
  default: mockOptions,
  // Export the mock options directly as well
  availabilityOptions: mockOptions.availabilityOptions,
  integrityOptions: mockOptions.integrityOptions,
  confidentialityOptions: mockOptions.confidentialityOptions,
  ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
}));

// Mock Dashboard component with DashboardWidget export
vi.mock("./components/Dashboard", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(({ children, className }) => (
    // Update the class to match what's in the actual component
    <div
      data-testid="dashboard-grid"
      className={`dashboard-grid-container ${className || ""}`}
    >
      {children}
    </div>
  )),
  // Add the missing DashboardWidget export
  DashboardWidget: vi
    .fn()
    .mockImplementation(({ children, testId = "dashboard-widget" }) => (
      <div data-testid={testId}>{children}</div>
    )),
}));

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

// Import dependencies after mocks
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";

describe("CIAClassificationApp", () => {
  it("renders the app with all required components", () => {
    // Render the component
    render(<CIAClassificationApp />);

    // Check for the main title
    expect(screen.getByText(/CIA Compliance Manager/i)).toBeInTheDocument();

    // Check for the dashboard grid container with correct class
    const dashboardContainer = screen.getByTestId("dashboard-grid");
    expect(dashboardContainer).toBeInTheDocument();
    expect(dashboardContainer).toHaveClass("dashboard-grid-container");
  });
});
