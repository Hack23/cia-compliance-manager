import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../types/cia";
import widgetRegistry, { WidgetDefinition, WidgetRegistryImpl } from "./widgetRegistry";

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

describe('Widget Registry', () => {
  it('should properly register widgets', () => {
    // Check that widgets are properly registered
    const allWidgets = widgetRegistry.getAll();
    expect(allWidgets.length).toBeGreaterThan(0);
    
    // Check for specific widgets
    const securitySummaryWidget = widgetRegistry.get('security-summary');
    expect(securitySummaryWidget).toBeDefined();
    expect(securitySummaryWidget?.title).toBe('Security Summary');
  });

  it('should include standardized security levels in default props', () => {
    // Get a widget with security level props
    const securityVisualizationWidget = widgetRegistry.get('security-visualization');
    
    // Check that the default security levels are set to "Moderate"
    expect(securityVisualizationWidget?.defaultProps?.availabilityLevel).toBe('Moderate');
    expect(securityVisualizationWidget?.defaultProps?.integrityLevel).toBe('Moderate');
    expect(securityVisualizationWidget?.defaultProps?.confidentialityLevel).toBe('Moderate');
  });

  it('should render widgets with standardized security levels', () => {
    // Render a widget through the registry
    const widgetElement = widgetRegistry.renderWidget('security-summary');
    
    // Render to test environment
    render(<div data-testid="widget-container">{widgetElement}</div>);
    
    // Verify the widget was rendered with the test ID
    expect(screen.getByTestId('widget-security-summary')).toBeInTheDocument();
  });

  it('should render multiple widgets with consistent security levels', () => {
    // Create a new instance for isolation
    const testRegistry = new WidgetRegistryImpl();
    
    // Register test widgets
    testRegistry.register({
      id: 'test-widget-1',
      title: 'Test Widget 1',
      component: (props: Record<string, any>) => <div data-testid="test-widget-1-props">{JSON.stringify(props)}</div>,
      icon: '🧪',
      defaultProps: {
        availabilityLevel: 'Low' as SecurityLevel,
        integrityLevel: 'Low' as SecurityLevel,
        confidentialityLevel: 'Low' as SecurityLevel
      }
    });
    
    testRegistry.register({
      id: 'test-widget-2',
      title: 'Test Widget 2',
      component: (props: Record<string, any>) => <div data-testid="test-widget-2-props">{JSON.stringify(props)}</div>,
      icon: '📊',
      defaultProps: {
        availabilityLevel: 'High' as SecurityLevel,
        integrityLevel: 'High' as SecurityLevel,
        confidentialityLevel: 'High' as SecurityLevel
      }
    });
    
    // Render widgets with global security levels
    const globalProps = {
      availabilityLevel: 'Moderate' as SecurityLevel,
      integrityLevel: 'Moderate' as SecurityLevel,
      confidentialityLevel: 'Moderate' as SecurityLevel
    };
    
    const result = render(<>{testRegistry.renderWidgets(undefined, globalProps)}</>);
    
    // Check that both widgets have the global security levels
    const widget1Props = JSON.parse(result.getByTestId('test-widget-1-props').textContent || '{}');
    const widget2Props = JSON.parse(result.getByTestId('test-widget-2-props').textContent || '{}');
    
    // Both widgets should have the same security levels from globalProps
    expect(widget1Props.availabilityLevel).toBe('Moderate');
    expect(widget1Props.integrityLevel).toBe('Moderate');
    expect(widget1Props.confidentialityLevel).toBe('Moderate');
    
    expect(widget2Props.availabilityLevel).toBe('Moderate');
    expect(widget2Props.integrityLevel).toBe('Moderate');
    expect(widget2Props.confidentialityLevel).toBe('Moderate');
  });

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
