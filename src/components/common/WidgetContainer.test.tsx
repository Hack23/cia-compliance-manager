import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WidgetContainer from "./WidgetContainer";

describe("WidgetContainer", () => {
  it("renders with title and content", () => {
    render(
      <WidgetContainer title="Test Widget">
        <div data-testid="test-content">Content</div>
      </WidgetContainer>
    );

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByTestId("widget-container")).toBeInTheDocument();
  });

  it("renders with loading state", () => {
    render(
      <WidgetContainer title="Test Widget" isLoading={true}>
        <div>Content (should not be visible during loading)</div>
      </WidgetContainer>
    );

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByTestId("widget-spinner")).toBeInTheDocument();
    expect(
      screen.getByTestId("widget-container-loading-container")
    ).toBeInTheDocument();
  });

  it("renders with error state", () => {
    render(
      <WidgetContainer title="Test Widget" error="Test error">
        <div>Content (should not be visible during error)</div>
      </WidgetContainer>
    );

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByTestId("test-widget-error")).toHaveTextContent(
      "Test error"
    );
    expect(screen.getByTestId("widget-container-error")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const iconTestId = "test-icon";
    render(
      <WidgetContainer
        title="Test Widget"
        icon={<span data-testid={iconTestId}>🔒</span>}
      >
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(
      <WidgetContainer title="Test Widget" className={customClass}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId("widget-container")).toHaveClass(customClass);
  });

  it("renders children", () => {
    const childTestId = "test-child";
    render(
      <WidgetContainer title="Test Widget">
        <div data-testid={childTestId}>Child Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId(childTestId)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "my-custom-class";
    render(
      <WidgetContainer title="Test Widget" className={customClass}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId("widget-container")).toHaveClass(customClass);
  });

  it("renders with title", () => {
    render(
      <WidgetContainer title="Custom Widget Title">
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByText("Custom Widget Title")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    // Test with the "loading" prop for backward compatibility
    render(
      <WidgetContainer title="Test Widget" isLoading={true}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(screen.getByTestId("widget-spinner")).toBeInTheDocument();
  });

  it("renders with test ID", () => {
    const testId = "custom-widget-id";
    render(
      <WidgetContainer title="Test Widget" testId={testId}>
        <div>Content</div>
      </WidgetContainer>
    );

    expect(
      screen.getByTestId(`widget-container-${testId}`)
    ).toBeInTheDocument();
  });
});
