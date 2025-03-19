import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { APP_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import Dashboard from "./Dashboard";

// Mock the registry
vi.mock("../../utils/widgetRegistry", () => ({
  __esModule: true,
  default: {
    renderWidgets: vi.fn(() => [
      <div key="mock-widget-1" data-testid="mock-widget-1">
        Mock Widget 1
      </div>,
      <div key="mock-widget-2" data-testid="mock-widget-2">
        Mock Widget 2
      </div>,
    ]),
  },
}));

// Mock TechnicalDetailsWidget
vi.mock("../widgets/TechnicalDetailsWidget", () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="mock-technical-details">Mock Technical Details</div>),
}));

describe("Dashboard", () => {
  it("renders with children", () => {
    render(
      <Dashboard
        availability={"Moderate" as SecurityLevel}
        integrity={"Moderate" as SecurityLevel}
        confidentiality={"Moderate" as SecurityLevel}
      >
        <div data-testid="test-child">Test Child Content</div>
      </Dashboard>
    );

    expect(screen.getByTestId(APP_TEST_IDS.DASHBOARD_GRID)).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("renders with technical details widget when not using registry", () => {
    render(
      <Dashboard
        availability={"Moderate" as SecurityLevel}
        integrity={"Moderate" as SecurityLevel}
        confidentiality={"Moderate" as SecurityLevel}
        useRegistry={false}
      >
        <div data-testid="test-child">Test Child Content</div>
      </Dashboard>
    );

    expect(screen.getByTestId("mock-technical-details")).toBeInTheDocument();
  });

  it("renders using the widget registry", () => {
    render(
      <Dashboard
        availability={"Moderate" as SecurityLevel}
        integrity={"Moderate" as SecurityLevel}
        confidentiality={"Moderate" as SecurityLevel}
        useRegistry={true}
      >
        <div data-testid="test-child">This child should not render</div>
      </Dashboard>
    );

    expect(screen.getByTestId("mock-widget-1")).toBeInTheDocument();
    expect(screen.getByTestId("mock-widget-2")).toBeInTheDocument();
    expect(screen.queryByTestId("test-child")).not.toBeInTheDocument();
  });
});
