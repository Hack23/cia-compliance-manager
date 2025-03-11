import React from "react";
import { render, screen } from "@testing-library/react";
import widgetRegistry, { WidgetDefinition } from "./widgetRegistry";
import { WidgetBaseProps } from "../types/widgets";

// Create a mock component that extends WidgetBaseProps
interface MockWidgetProps extends WidgetBaseProps {
  testProp?: string;
}

const MockWidget: React.FC<MockWidgetProps> = ({
  testProp = "default",
  testId,
}) => <div data-testid={testId || "mock-widget"}>{testProp}</div>;

describe("widgetRegistry", () => {
  beforeEach(() => {
    // Clear any existing widgets before each test
    // This is a hack since we can't directly clear the Map in the singleton
    // We'll register a test cleanup widget and then test with it
    widgetRegistry.register<MockWidgetProps>({
      id: "test-cleanup",
      title: "Test Cleanup",
      component: MockWidget,
    });
  });

  it("registers a widget correctly", () => {
    // Register a test widget
    widgetRegistry.register<MockWidgetProps>({
      id: "test-widget",
      title: "Test Widget",
      component: MockWidget,
      icon: "📊",
      size: "medium",
      order: 10,
    });

    // Get the registered widget
    const widget = widgetRegistry.get("test-widget");

    // Verify widget is registered with correct properties
    expect(widget).toBeDefined();
    expect(widget?.id).toBe("test-widget");
    expect(widget?.title).toBe("Test Widget");
    expect(widget?.size).toBe("medium");
    expect(widget?.order).toBe(10);
  });

  it("registers a widget with default values when not provided", () => {
    // Register with minimal properties
    widgetRegistry.register<MockWidgetProps>({
      id: "minimal-widget",
      title: "Minimal Widget",
      component: MockWidget,
    });

    // Get the registered widget
    const widget = widgetRegistry.get("minimal-widget");

    // Verify default values are applied
    expect(widget).toBeDefined();
    expect(widget?.id).toBe("minimal-widget");
    expect(widget?.size).toBe("medium"); // Default size
    expect(widget?.order).toBe(999); // Default order
  });

  it("retrieves all registered widgets", () => {
    // Register multiple test widgets
    widgetRegistry.register<MockWidgetProps>({
      id: "widget-1",
      title: "Widget 1",
      component: MockWidget,
      order: 10,
    });

    widgetRegistry.register<MockWidgetProps>({
      id: "widget-2",
      title: "Widget 2",
      component: MockWidget,
      order: 20,
    });

    // Get all widgets
    const widgets = widgetRegistry.getAll();

    // Verify we get an array with all registered widgets
    expect(widgets).toBeInstanceOf(Array);
    expect(widgets.length).toBeGreaterThan(1);

    // Verify widgets are ordered correctly by order property
    const widget1 = widgets.find((w) => w.id === "widget-1");
    const widget2 = widgets.find((w) => w.id === "widget-2");
    expect(widget1).toBeDefined();
    expect(widget2).toBeDefined();
    expect(widget1?.order).toBeLessThan(widget2?.order || Infinity);
  });

  it("renders a widget correctly", () => {
    // Register test widget
    widgetRegistry.register<MockWidgetProps>({
      id: "render-test",
      title: "Render Test",
      component: MockWidget,
      defaultProps: { testProp: "custom value" },
    });

    // Render the widget
    const element = widgetRegistry.renderWidget("render-test");

    // Verify the component is rendered correctly with the default props
    render(<>{element}</>);
    expect(screen.getByTestId("mock-widget")).toHaveTextContent("custom value");
  });

  it("renders all widgets that match a filter", () => {
    // Register some widgets with different sizes
    widgetRegistry.register<MockWidgetProps>({
      id: "small-widget",
      title: "Small Widget",
      component: MockWidget,
      size: "small",
      defaultProps: { testProp: "small" },
    });

    widgetRegistry.register<MockWidgetProps>({
      id: "large-widget",
      title: "Large Widget",
      component: MockWidget,
      size: "large",
      defaultProps: { testProp: "large" },
    });

    // Render only small widgets
    const elements = widgetRegistry.renderWidgets(
      (widget) => widget.size === "small"
    );

    // Verify the correct widget was rendered
    render(<>{elements}</>);
    expect(screen.getByTestId("mock-widget")).toHaveTextContent("small");
    expect(screen.queryByText("large")).not.toBeInTheDocument();
  });

  it("renders a widget with custom props that override defaults", () => {
    // Register test widget with default props
    widgetRegistry.register<MockWidgetProps>({
      id: "props-test",
      title: "Props Test",
      component: MockWidget,
      defaultProps: { testProp: "default value" },
    });

    // Render with custom props - use proper typing for the props
    const { container } = render(
      <div>
        {widgetRegistry.renderWidget<MockWidgetProps>("props-test", {
          testProp: "override value", // Now properly typed
        })}
      </div>
    );

    // Check that custom props override default props
    expect(screen.getByTestId("mock-widget")).toHaveTextContent(
      "override value"
    );
  });

  it("renders multiple widgets with filter", () => {
    // Register multiple widgets with different orders
    widgetRegistry.register<MockWidgetProps>({
      id: "filter-test-1",
      title: "Filter Test 1",
      component: MockWidget,
      order: 5,
      defaultProps: { testProp: "widget 1" },
    });

    widgetRegistry.register<MockWidgetProps>({
      id: "filter-test-2",
      title: "Filter Test 2",
      component: MockWidget,
      order: 10,
      defaultProps: { testProp: "widget 2" },
    });

    // Render with filter to only include widget 2
    const { container } = render(
      <div>
        {widgetRegistry.renderWidgets(
          (widget) => widget.id === "filter-test-2"
        )}
      </div>
    );

    // Check that only widget 2 is rendered
    expect(screen.queryByText("Filter Test 1")).not.toBeInTheDocument();
    expect(screen.getByText("Filter Test 2")).toBeInTheDocument();
    expect(screen.getByTestId("mock-widget")).toHaveTextContent("widget 2");
  });

  it("renders multiple widgets with custom props", () => {
    // Register test widgets
    widgetRegistry.register<MockWidgetProps>({
      id: "multi-props-1",
      title: "Multi Props 1",
      component: MockWidget,
      defaultProps: { testProp: "default 1" },
    });

    widgetRegistry.register<MockWidgetProps>({
      id: "multi-props-2",
      title: "Multi Props 2",
      component: MockWidget,
      defaultProps: { testProp: "default 2" },
    });

    // Render with custom props for each widget
    const props = {
      "multi-props-1": { testProp: "custom 1" },
      "multi-props-2": { testProp: "custom 2" },
    };

    const { container } = render(
      <div>
        {widgetRegistry.renderWidgets(
          (widget) => widget.id.startsWith("multi-props"),
          props
        )}
      </div>
    );

    // Check that both widgets are rendered with custom props
    const widgets = screen.getAllByTestId("mock-widget");
    expect(widgets.length).toBe(2);
    expect(widgets[0]).toHaveTextContent("custom 1");
    expect(widgets[1]).toHaveTextContent("custom 2");
  });

  it("returns null when rendering a non-existent widget", () => {
    const result = widgetRegistry.renderWidget("non-existent-widget");
    expect(result).toBeNull();
  });

  test("renderWidget returns null for non-existent widget", () => {
    const widget = widgetRegistry.renderWidget("non-existent-widget");
    expect(widget).toBeNull();
  });

  test("getAll returns widgets sorted by order", () => {
    const widgets = widgetRegistry.getAll();

    // Skip the test if there are fewer than 2 widgets
    if (widgets.length < 2) {
      return;
    }

    // Verify sorting by checking consecutive pairs
    for (let i = 1; i < widgets.length; i++) {
      const prevOrderValue = widgets[i - 1]?.order ?? 0;
      const currOrderValue = widgets[i]?.order ?? 0;
      expect(prevOrderValue).toBeLessThanOrEqual(currOrderValue);
    }
  });

  test("registry handles props correctly when rendering widgets", () => {
    // Register a test component with testID to verify props
    interface TestComponentProps extends WidgetBaseProps {
      testValue: string;
    }

    const TestComponent = ({ testValue, testId }: TestComponentProps) => (
      <div data-testid={testId || "test-component-value"}>{testValue}</div>
    );

    widgetRegistry.register<TestComponentProps>({
      id: "test-props-widget",
      title: "Test Props Widget",
      component: TestComponent,
      defaultProps: { testValue: "default" },
    });

    // Render with overriding props - use proper typing for the props
    const { getByTestId } = render(
      <div>
        {widgetRegistry.renderWidget<TestComponentProps>("test-props-widget", {
          testValue: "override", // Now properly typed
        })}
      </div>
    );

    // Verify the props were properly overridden
    expect(getByTestId("test-component-value")).toHaveTextContent("override");
  });
});
