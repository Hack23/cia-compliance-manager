import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import widgetRegistry, { WidgetDefinition } from "./widgetRegistry";

// Mock the app constants
vi.mock("../constants/appConstants", () => ({
  WIDGET_ICONS: {
    SECURITY_SUMMARY: "📊",
    SECURITY_LEVEL: "🛡️",
    SECURITY_VISUALIZATION: "📈",
    AVAILABILITY_IMPACT: "⏱️",
    INTEGRITY_IMPACT: "✓",
    CONFIDENTIALITY_IMPACT: "🔒",
    CIA_IMPACT_SUMMARY: "🔐",
    TECHNICAL_DETAILS: "⚙️",
    COMPLIANCE_STATUS: "✅",
    VALUE_CREATION: "💰",
    COST_ESTIMATION: "💲",
    BUSINESS_IMPACT: "🏢",
    SECURITY_RESOURCES: "📚",
  },
  WIDGET_TITLES: {
    SECURITY_SUMMARY: "Security Summary",
    SECURITY_LEVEL: "Security Level",
    SECURITY_VISUALIZATION: "Security Visualization",
    AVAILABILITY_IMPACT: "Availability Impact",
    INTEGRITY_IMPACT: "Integrity Impact",
    CONFIDENTIALITY_IMPACT: "Confidentiality Impact",
    CIA_IMPACT_SUMMARY: "CIA Impact Summary",
    TECHNICAL_DETAILS: "Technical Details",
    COMPLIANCE_STATUS: "Compliance Status",
    VALUE_CREATION: "Value Creation",
    COST_ESTIMATION: "Cost Estimation",
    BUSINESS_IMPACT: "Business Impact",
    SECURITY_RESOURCES: "Security Resources",
  },
}));

// Mock the components
vi.mock("../components/widgets/SecuritySummaryWidget", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mock Security Summary Widget</div>),
}));

// Other component mocks as needed
// ...

describe("Widget Registry", () => {
  it("should export the required methods", () => {
    // Update to use the current interface methods
    expect(typeof widgetRegistry.get).toBe("function");
    expect(typeof widgetRegistry.getAll).toBe("function");
    expect(typeof widgetRegistry.register).toBe("function");
    expect(typeof widgetRegistry.renderWidget).toBe("function");
    expect(typeof widgetRegistry.renderWidgets).toBe("function");
  });

  it("should get a registered widget by id", () => {
    const securitySummaryWidget = widgetRegistry.get("security-summary");
    expect(securitySummaryWidget).toBeDefined();
    expect(securitySummaryWidget?.id).toBe("security-summary");
    expect(securitySummaryWidget?.title).toBeDefined();
    expect(securitySummaryWidget?.component).toBeDefined();
  });

  it("should return undefined for non-existent widget", () => {
    const nonExistentWidget = widgetRegistry.get("nonExistent");
    expect(nonExistentWidget).toBeUndefined();
  });

  it("should get all registered widgets", () => {
    const allWidgets = widgetRegistry.getAll();
    expect(Array.isArray(allWidgets)).toBe(true);
    expect(allWidgets.length).toBeGreaterThan(0);
    
    // Check that key widgets are registered
    const widgetIds = allWidgets.map((w) => w.id);
    expect(widgetIds).toContain("security-summary");
    expect(widgetIds).toContain("security-level");
  });

  it("should render a widget with props", () => {
    const mockDefinition: WidgetDefinition = {
      id: "testWidget",
      title: "Test Widget",
      component: vi.fn(() => <div>Test Component</div>),
      icon: "🧪", // Add the required icon property
      defaultProps: { title: "Test Title" },
    };
    
    // Mock get method instead of getWidget
    vi.spyOn(widgetRegistry, "get").mockReturnValueOnce(mockDefinition);
    
    const { container } = render(
      <div>{widgetRegistry.renderWidget("testWidget")}</div>
    );
    
    expect(container).toBeTruthy();
  });

  it("should render multiple widgets based on a filter", () => {
    // Use a filter function instead of an array of IDs
    const result = widgetRegistry.renderWidgets(
      widget => ["security-summary", "availability-impact"].includes(widget.id)
    );
    
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Remove or update tests for methods that don't exist in the new interface
  // Replace with tests for the current functionality
});
