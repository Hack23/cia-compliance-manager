// Define mocks at the top of the file, before imports
vi.mock("../hooks/useCIAOptions", () => {
  return {
    availabilityOptions: {
      Moderate: { capex: 10, opex: 5 },
    },
    integrityOptions: {
      Moderate: { capex: 15, opex: 7 },
    },
    confidentialityOptions: {
      Moderate: { capex: 20, opex: 10 },
    },
    __esModule: true,
    default: {
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
        MODERATE: {
          returnRate: "200%",
          description: "Standard security provides good value",
          potentialSavings: "$50,000",
          breakEvenPeriod: "18 months",
        },
        HIGH: {
          returnRate: "350%",
          description: "Advanced security provides significant protection",
          potentialSavings: "$250,000",
          breakEvenPeriod: "12 months",
        },
        VERY_HIGH: {
          returnRate: "500%",
          description: "Maximum security provides optimal protection",
          potentialSavings: "$500,000",
          breakEvenPeriod: "6 months",
        },
      },
    }, // Added missing comma here
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
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good value",
        potentialSavings: "$50,000",
        breakEvenPeriod: "18 months",
      },
      HIGH: {
        returnRate: "350%",
        description: "Advanced security provides significant protection",
        potentialSavings: "$250,000",
        breakEvenPeriod: "12 months",
      },
      VERY_HIGH: {
        returnRate: "500%",
        description: "Maximum security provides optimal protection",
        potentialSavings: "$500,000",
        breakEvenPeriod: "6 months",
      },
    },
  };
});

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { APP_TEST_IDS } from "../constants/testIds";
import Dashboard, { DashboardWidget } from "./Dashboard";

// Mock the widget registry
vi.mock("../utils/widgetRegistry", () => ({
  default: {
    renderWidgets: vi.fn(() => [<div key="mock-widget">Mock Widget</div>]),
  },
  __esModule: true,
}));

// Mock the useCIAOptions hook

describe("Dashboard Component", () => {
  const defaultProps = {
    children: <div data-testid="test-child">Test Child Content</div>,
    availability: "Moderate",
    integrity: "Moderate",
    confidentiality: "Moderate",
  };

  it("renders children when useRegistry is false", () => {
    render(<Dashboard {...defaultProps} />);

    expect(screen.getByTestId(APP_TEST_IDS.DASHBOARD_GRID)).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("uses widget registry when useRegistry is true", () => {
    render(<Dashboard {...defaultProps} useRegistry={true} />);

    expect(screen.getByTestId(APP_TEST_IDS.DASHBOARD_GRID)).toBeInTheDocument();
    expect(screen.getByText("Mock Widget")).toBeInTheDocument();
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
