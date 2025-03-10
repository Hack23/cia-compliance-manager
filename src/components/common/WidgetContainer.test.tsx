import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WidgetContainer from "./WidgetContainer";
import { WIDGET_TEST_IDS } from "../../constants/testIds";

describe("WidgetContainer Component", () => {
  const defaultProps = {
    title: "Test Widget",
    children: <div>Widget Content</div>,
  };

  it("renders with title and content", () => {
    render(<WidgetContainer {...defaultProps} />);

    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByText("Widget Content")).toBeInTheDocument();
  });

  it("renders with loading state", () => {
    render(<WidgetContainer {...defaultProps} loading={true} />);

    expect(
      screen.getByTestId(WIDGET_TEST_IDS.LOADING_INDICATOR)
    ).toBeInTheDocument();
    expect(screen.queryByText("Widget Content")).not.toBeInTheDocument();
  });

  it("renders with error state", () => {
    render(
      <WidgetContainer
        {...defaultProps}
        error={new Error("Test error message")}
      />
    );

    expect(screen.getByText("Test error message")).toBeInTheDocument();
    expect(screen.queryByText("Widget Content")).not.toBeInTheDocument();
  });

  it("renders with custom header content", () => {
    // Create a testable headerContent component with a testId
    const customProps = {
      ...defaultProps,
      headerContent: <button data-testid="custom-action">Custom Action</button>,
    };

    render(<WidgetContainer {...customProps} />);

    // Use getByTestId to find the custom action button
    expect(screen.getByTestId("custom-action")).toBeInTheDocument();
  });

  it("renders content title when provided", () => {
    render(<WidgetContainer {...defaultProps} contentTitle="Content Title" />);

    expect(screen.getByText("Content Title")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    const { container } = render(
      <WidgetContainer
        title="Test Widget"
        className={customClass}
        testId="test-widget"
      >
        <div>Widget content</div>
      </WidgetContainer>
    );

    // Instead of directly checking the root element, find the widget container within
    // Use container.querySelector to find an element with the custom class
    const widgetWithCustomClass = container.querySelector(`.${customClass}`);
    expect(widgetWithCustomClass).not.toBeNull();

    // Alternative: Check if any element within the container has the custom class
    expect(container.innerHTML).toContain(customClass);
  });
});
