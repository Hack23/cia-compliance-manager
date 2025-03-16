import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import widgetRegistryUtils from "./widgetRegistry";

// Mock all components to avoid rendering real implementation
vi.mock("../SecurityLevelWidget", () => ({
  __esModule: true,
  default: (props: { testId?: string; [key: string]: any }) => (
    <div data-testid={props.testId || "widget-security-level"}>
      SecurityLevelWidget
    </div>
  ),
}));

vi.mock("../SecuritySummaryWidget", () => ({
  __esModule: true,
  default: (props: { testId?: string; [key: string]: any }) => (
    <div data-testid={props.testId || "security-summary-widget"}>
      SecuritySummaryWidget
    </div>
  ),
}));

vi.mock("../ComplianceStatusWidget", () => ({
  __esModule: true,
  default: (props: { testId?: string; [key: string]: any }) => (
    <div data-testid={props.testId || "mock-compliance-status"}>
      ComplianceStatusWidget
    </div>
  ),
}));

// Mock component for testing
const TestComponent = ({
  testId,
  title,
}: {
  testId?: string;
  title?: string;
}) => <div data-testid={testId}>{title || "Test Widget"}</div>;

// Helper to create a mock widget registration
const createMockWidget = (key: string, testId: string) => ({
  key,
  component: TestComponent,
  testId,
});

describe("widgetRegistry", () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it("should get a widget by key", () => {
    // We'll use one of the existing widgets
    const widget = widgetRegistryUtils.getWidget("security-level");
    expect(widget).toBeDefined();
    expect(widget?.key).toBe("security-level");
  });

  it("should return undefined for non-existent widget", () => {
    const widget = widgetRegistryUtils.getWidget("non-existent-widget");
    expect(widget).toBeUndefined();
  });

  it("should render a widget with props", () => {
    // Create a custom title for testing
    const customTitle = "Custom Widget Title";

    // Render a widget that exists in the registry
    render(
      <div>
        {widgetRegistryUtils.renderWidget("security-level", {
          title: customTitle,
          testId: "custom-test-id",
        })}
      </div>
    );

    // Check if the widget rendered with custom props
    const widget = screen.queryByTestId("custom-test-id");
    expect(widget).toBeInTheDocument();
  });

  it("should return null when rendering non-existent widget", () => {
    const result = widgetRegistryUtils.renderWidget("non-existent-widget");
    expect(result).toBeNull();
  });

  it("should render multiple widgets", () => {
    // Render a subset of widgets
    render(
      <div>
        {widgetRegistryUtils.renderWidgets(
          ["security-level", "security-summary"],
          {
            // Provide required props to security-summary widget
            "security-summary": {
              securityLevel: "Moderate",
              availabilityLevel: "Moderate",
              integrityLevel: "Moderate",
              confidentialityLevel: "Moderate",
            },
          }
        )}
      </div>
    );

    // Check if widgets were rendered - use the actual testIds that are shown in the error
    expect(screen.getByTestId("widget-security-level")).toBeInTheDocument();
    expect(screen.getByTestId("security-summary-widget")).toBeInTheDocument();
  });

  it("should render all widgets when keys are not provided", () => {
    // Mock renderWidget to track number of calls
    const renderWidgetSpy = vi.spyOn(widgetRegistryUtils, "renderWidget");
    renderWidgetSpy.mockImplementation(() => <div>Mocked Widget</div>);

    // Call renderWidgets without specifying keys
    widgetRegistryUtils.renderWidgets(undefined, {
      // Provide required props for all potential widgets
      "security-summary": {
        securityLevel: "Moderate",
        availabilityLevel: "Moderate",
        integrityLevel: "Moderate",
        confidentialityLevel: "Moderate",
      },
    });

    // Ensure renderWidget was called for all registered widgets
    const allKeys = widgetRegistryUtils.getAllWidgetKeys();
    expect(renderWidgetSpy).toHaveBeenCalledTimes(allKeys.length);

    // Restore original implementation
    renderWidgetSpy.mockRestore();
  });

  it("should pass custom props to rendered widgets", () => {
    const customTestId = "my-custom-test-id";
    const props = {
      "security-level": {
        testId: customTestId,
      },
    };

    // Render with custom props
    render(
      <div>{widgetRegistryUtils.renderWidgets(["security-level"], props)}</div>
    );

    // Check if the custom props were applied
    const widget = screen.queryByTestId(customTestId);
    expect(widget).toBeInTheDocument();
  });

  it("should get all widget keys", () => {
    const keys = widgetRegistryUtils.getAllWidgetKeys();
    expect(keys).toBeInstanceOf(Array);
    expect(keys.length).toBeGreaterThan(0);
    expect(keys).toContain("security-level");
    expect(keys).toContain("security-summary");
  });
});
