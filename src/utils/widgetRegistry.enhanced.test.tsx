import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WidgetDefinition, WidgetRegistryImpl } from "./widgetRegistry";

describe("Enhanced Widget Registry Tests", () => {
  it("should register a new widget", () => {
    // Create a new instance for testing
    const testRegistry = new WidgetRegistryImpl();
    
    // Register a test widget
    testRegistry.register({
      id: "testWidget1",
      title: "Test Widget 1", // Use title instead of name
      component: vi.fn(() => <div>Test Widget 1</div>),
      icon: "🧪", // Add required icon
      size: "small",
    });
    
    // Register another test widget
    testRegistry.register({
      id: "testWidget2",
      title: "Test Widget 2", // Use title instead of name
      component: vi.fn(() => <div>Test Widget 2</div>),
      icon: "⚡", // Add required icon
      size: "medium",
    });
    
    // Test getting the registered widget
    const widget = testRegistry.get("testWidget1"); // Use get instead of getWidget
    expect(widget).toBeDefined();
    expect(widget?.id).toBe("testWidget1");
    expect(widget?.title).toBe("Test Widget 1");
    
    // Test rendering the widget
    const { container } = render(
      <div>{testRegistry.renderWidget("testWidget1")}</div>
    );
    expect(container).toBeTruthy();
    
    // Test getting all widgets
    const allWidgets = testRegistry.getAll(); // Use getAll instead of getAllWidgetKeys
    expect(Array.isArray(allWidgets)).toBe(true);
    expect(allWidgets.length).toBe(2);
    
    // Test widget IDs - fix implicit any type
    const widgetIds = allWidgets.map((w: WidgetDefinition) => w.id);
    expect(widgetIds).toContain("testWidget1");
    expect(widgetIds).toContain("testWidget2");
  });
});
