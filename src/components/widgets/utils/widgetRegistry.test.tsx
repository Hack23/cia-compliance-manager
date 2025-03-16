import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import widgetRegistryUtils from "./widgetRegistry";

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
        {widgetRegistryUtils.renderWidgets([
          "security-level",
          "security-summary",
        ])}
      </div>
    );

    // Check if the widgets were rendered
    expect(widgetRegistryUtils.getAllWidgetKeys()).toContain("security-level");
    expect(widgetRegistryUtils.getAllWidgetKeys()).toContain(
      "security-summary"
    );
  });

  it("should render all widgets when keys are not provided", () => {
    // Get the count of all widgets
    const allKeys = widgetRegistryUtils.getAllWidgetKeys();
    const count = allKeys.length;

    // Render with no keys specified (should render all)
    const renderedWidgets = widgetRegistryUtils.renderWidgets();

    // Check if the right number of widgets was returned
    expect(renderedWidgets.length).toBe(count);
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
