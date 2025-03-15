import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { WidgetBaseProps } from "../types/widgets";
import widgetRegistry from "./widgetRegistry";

// Test component with required props
interface TestWidgetProps extends WidgetBaseProps {
  customValue?: string;
  testId?: string;
}

const TestWidget: React.FC<TestWidgetProps> = ({
  customValue = "default",
  testId = "test-widget",
}) => <div data-testid={testId}>{customValue}</div>;

describe("widgetRegistry advanced functionality", () => {
  // Clear registry before tests to avoid interference
  beforeEach(() => {
    // Register a dummy widget to reset the registry
    widgetRegistry.register({
      id: "test-reset",
      title: "Test Reset",
      component: TestWidget,
    });
  });

  it("handles unregistered widgets gracefully", () => {
    // Attempt to get a widget that doesn't exist
    const widget = widgetRegistry.get("non-existent-widget");
    expect(widget).toBeUndefined();

    // Attempt to render a widget that doesn't exist
    const rendered = widgetRegistry.renderWidget("non-existent-widget");
    expect(rendered).toBeNull();
  });

  it("replaces widget when registering with same ID", () => {
    // Register initial widget
    widgetRegistry.register({
      id: "duplicate-id",
      title: "Original Widget",
      component: TestWidget,
      defaultProps: { customValue: "original" },
    });

    // Register replacement widget with same ID
    widgetRegistry.register({
      id: "duplicate-id",
      title: "Replacement Widget",
      component: TestWidget,
      defaultProps: { customValue: "replacement" },
    });

    // Get the registered widget
    const widget = widgetRegistry.get("duplicate-id");

    // Verify it's the replacement
    expect(widget?.title).toBe("Replacement Widget");

    // Render and verify content
    render(<>{widgetRegistry.renderWidget("duplicate-id")}</>);
    expect(screen.getByTestId("test-widget")).toHaveTextContent("replacement");
  });
});
