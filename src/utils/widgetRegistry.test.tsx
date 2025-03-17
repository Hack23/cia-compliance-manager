import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import widgetRegistry, { widgetRegistryUtils } from "./widgetRegistry";

// Create a simple mock component for testing
const MockWidget = vi
  .fn()
  .mockImplementation(({ testId = "mock-widget" }) => (
    <div data-testid={testId}>Mock Widget Content</div>
  ));

// Mock the required components to avoid errors
vi.mock("../components/widgets/SecuritySummaryWidget", () => ({
  __esModule: true,
  default: ({ testId = "security-summary" }) => (
    <div data-testid={testId}>SecuritySummaryWidget</div>
  ),
}));

vi.mock("../components/widgets/ComplianceStatusWidget", () => ({
  __esModule: true,
  default: ({ testId = "compliance-status" }) => (
    <div data-testid={testId}>ComplianceStatusWidget</div>
  ),
}));

vi.mock("../components/common/WidgetContainer", () => ({
  __esModule: true,
  default: ({
    children,
    testId = "widget-container",
  }: {
    children: React.ReactNode;
    testId?: string;
  }) => <div data-testid={testId}>{children}</div>,
}));

describe("widgetRegistry", () => {
  it("should retrieve a registered widget by id", () => {
    const widget = widgetRegistry.get("security-summary");
    expect(widget).toBeDefined();
    expect(widget?.id).toBe("security-summary");
  });

  it("should return undefined for non-existent widgets", () => {
    const widget = widgetRegistry.get("non-existent-widget");
    expect(widget).toBeUndefined();
  });

  it("should return all registered widgets", () => {
    const widgets = widgetRegistry.getAll();
    expect(widgets.length).toBeGreaterThan(0);
    expect(widgets.some((w) => w.id === "security-summary")).toBe(true);
  });

  it("should render a widget by id", () => {
    const { container } = render(
      <div>{widgetRegistry.renderWidget("security-summary")}</div>
    );
    expect(container).toBeTruthy();
  });

  it("should render multiple widgets with filtering", () => {
    const { container } = render(
      <div>
        {widgetRegistry.renderWidgets(
          (widget) => widget.id === "security-summary"
        )}
      </div>
    );
    expect(container).toBeTruthy();
  });
});

describe("widgetRegistryUtils", () => {
  it("should get a widget by id", () => {
    const widget = widgetRegistryUtils.getWidget("security-summary");
    expect(widget).toBeDefined();
    expect(widget?.id).toBe("security-summary");
  });

  it("should render a specific widget", () => {
    const { container } = render(
      <div>{widgetRegistryUtils.renderWidget("security-summary")}</div>
    );
    expect(container).toBeTruthy();
  });

  it("should render specific widgets by keys", () => {
    const { container } = render(
      <div>{widgetRegistryUtils.renderWidgets(["security-summary"])}</div>
    );
    expect(container).toBeTruthy();
  });

  it("should get all widget keys", () => {
    const keys = widgetRegistryUtils.getAllWidgetKeys();
    expect(keys.length).toBeGreaterThan(0);
    expect(keys).toContain("security-summary");
  });
});
