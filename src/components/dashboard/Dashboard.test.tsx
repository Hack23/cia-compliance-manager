// Create mock for widgetRegistry with hoisting to ensure it's defined before imports
const mockRenderWidgets = vi.hoisted(() =>
  vi.fn(() => [<div key="mock-widget">Mock Widget from Registry</div>])
);

// Properly mock the widget registry with correct path
vi.mock("../../utils/widgetRegistry", () => ({
  __esModule: true,
  default: {
    renderWidgets: mockRenderWidgets,
  },
}));

// Mock useCIAOptions with consistent structure
vi.mock("../../hooks/useCIAOptions", () => {
  const mockOptions = {
    availabilityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 10, opex: 5 },
      High: { capex: 15, opex: 8 },
      "Very High": { capex: 20, opex: 10 },
    },
    integrityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 15, opex: 7 },
      High: { capex: 25, opex: 12 },
      "Very High": { capex: 40, opex: 20 },
    },
    confidentialityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 20, opex: 10 },
      High: { capex: 35, opex: 15 },
      "Very High": { capex: 50, opex: 25 },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%" },
      LOW: { returnRate: "100%" },
      MODERATE: { returnRate: "200%" },
      HIGH: { returnRate: "350%" },
      VERY_HIGH: { returnRate: "500%" },
    },
  };

  return {
    __esModule: true,
    useCIAOptions: () => mockOptions,
    default: () => mockOptions,
    // Export direct properties for module-level imports
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
  };
});

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { APP_TEST_IDS } from "../../constants/testIds";
import Dashboard, { DashboardWidget } from "./Dashboard";

describe("Dashboard Component", () => {
  const defaultProps = {
    children: <div data-testid="test-child">Test Child Content</div>,
    availability: "Moderate",
    integrity: "Moderate",
    confidentiality: "Moderate",
  };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it("renders children when useRegistry is false", () => {
    render(<Dashboard {...defaultProps} />);

    expect(screen.getByTestId(APP_TEST_IDS.DASHBOARD_GRID)).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    // Verify render widgets wasn't called when useRegistry is false
    expect(mockRenderWidgets).not.toHaveBeenCalled();
  });

  it("uses widget registry when useRegistry is true", () => {
    render(<Dashboard {...defaultProps} useRegistry={true} />);

    expect(screen.getByTestId(APP_TEST_IDS.DASHBOARD_GRID)).toBeInTheDocument();
    // Check for the text rendered by our mock
    expect(screen.getByText("Mock Widget from Registry")).toBeInTheDocument();
    // Verify renderWidgets was called
    expect(mockRenderWidgets).toHaveBeenCalled();
  });
});

describe("DashboardWidget Component", () => {
  const testWidgetId = "test-widget";

  it("renders with correct props", () => {
    render(
      <DashboardWidget title="Test Widget" testId={testWidgetId}>
        <div>Widget Content</div>
      </DashboardWidget>
    );

    expect(screen.getByTestId(testWidgetId)).toBeInTheDocument();
    expect(screen.getByText("Widget Content")).toBeInTheDocument();
  });
});
