import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WidgetBase from "./WidgetBase";

describe("WidgetBase Component", () => {
  it("renders with title and content", () => {
    render(
      <WidgetBase title="Test Widget" testId="test-widget">
        <div data-testid="widget-content">Widget Content</div>
      </WidgetBase>
    );

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByTestId("widget-content")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(
      <WidgetBase testId="test-widget-no-title">
        <div>Content Only</div>
      </WidgetBase>
    );

    expect(screen.getByTestId("test-widget-no-title")).toBeInTheDocument();
    expect(screen.getByText("Content Only")).toBeInTheDocument();
  });

  it("applies size styles correctly", () => {
    const { container } = render(
      <WidgetBase size={{ width: 2, height: 3 }} testId="sized-widget">
        <div>Content</div>
      </WidgetBase>
    );

    const widgetElement = screen.getByTestId("sized-widget");
    expect(widgetElement.style.gridColumn).toBe("span 2");
    expect(widgetElement.style.gridRow).toBe("span 3");
  });

  it("renders with icon", () => {
    render(
      <WidgetBase
        title="Widget with Icon"
        icon={<span data-testid="widget-icon">🔒</span>}
        testId="icon-widget"
      >
        <div>Content</div>
      </WidgetBase>
    );

    expect(screen.getByTestId("widget-icon")).toBeInTheDocument();
    expect(screen.getByText("🔒")).toBeInTheDocument();
  });

  it("displays loading state correctly", () => {
    render(
      <WidgetBase loading={true} testId="loading-widget">
        <div>This should not be visible</div>
      </WidgetBase>
    );

    expect(screen.getByTestId("loading-widget-loading")).toBeInTheDocument();
    expect(
      screen.queryByText("This should not be visible")
    ).not.toBeInTheDocument();
  });

  it("displays error state correctly", () => {
    const testError = new Error("Test error message");

    render(
      <WidgetBase error={testError} testId="error-widget">
        <div>This should not be visible</div>
      </WidgetBase>
    );

    expect(screen.getByTestId("error-widget-error")).toBeInTheDocument();
    expect(screen.getByText("Error:")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(
      screen.queryByText("This should not be visible")
    ).not.toBeInTheDocument();
  });
});
