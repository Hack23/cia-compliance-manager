import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import WidgetActions, { WidgetActionButton } from "./WidgetActions";

describe("WidgetActions", () => {
  it("renders children correctly", () => {
    render(
      <WidgetActions testId="widget-actions">
        <span>Action 1</span>
        <span>Action 2</span>
      </WidgetActions>
    );

    const container = screen.getByTestId("widget-actions");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Action 1")).toBeInTheDocument();
    expect(screen.getByText("Action 2")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <WidgetActions className="custom-class" testId="widget-actions">
        <span>Action</span>
      </WidgetActions>
    );

    const container = screen.getByTestId("widget-actions");
    expect(container.className).toContain("custom-class");
  });

  it("has default spacing and flex layout", () => {
    render(
      <WidgetActions testId="widget-actions">
        <span>Action</span>
      </WidgetActions>
    );

    const container = screen.getByTestId("widget-actions");
    expect(container.className).toContain("flex");
    expect(container.className).toContain("items-center");
    expect(container.className).toContain("space-x-2");
  });
});

describe("WidgetActionButton", () => {
  it("renders the icon", () => {
    const mockIcon = <span data-testid="icon">✅</span>;

    render(
      <WidgetActionButton
        icon={mockIcon}
        onClick={() => {}}
        ariaLabel="Test button"
        testId="action-button"
      />
    );

    const button = screen.getByTestId("action-button");
    const icon = screen.getByTestId("icon");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();

    render(
      <WidgetActionButton
        icon={<span>✅</span>}
        onClick={handleClick}
        ariaLabel="Test button"
        testId="action-button"
      />
    );

    const button = screen.getByTestId("action-button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();

    render(
      <WidgetActionButton
        icon={<span>✅</span>}
        onClick={handleClick}
        ariaLabel="Test button"
        disabled
        testId="action-button"
      />
    );

    const button = screen.getByTestId("action-button");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("has aria-label attribute", () => {
    render(
      <WidgetActionButton
        icon={<span>✅</span>}
        onClick={() => {}}
        ariaLabel="Test button"
        testId="action-button"
      />
    );

    const button = screen.getByTestId("action-button");
    expect(button).toHaveAttribute("aria-label", "Test button");
  });

  it("has disabled attribute and styling when disabled", () => {
    render(
      <WidgetActionButton
        icon={<span>✅</span>}
        onClick={() => {}}
        ariaLabel="Test button"
        disabled
        testId="action-button"
      />
    );

    const button = screen.getByTestId("action-button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("opacity-50");
    expect(button.className).toContain("cursor-not-allowed");
  });

  it("applies custom className", () => {
    render(
      <WidgetActionButton
        icon={<span>✅</span>}
        onClick={() => {}}
        ariaLabel="Test button"
        className="custom-class"
        testId="action-button"
      />
    );

    const button = screen.getByTestId("action-button");
    expect(button.className).toContain("custom-class");
  });

  it("has the expected styling for hover and focus states", () => {
    render(
      <WidgetActionButton
        icon={<span>✅</span>}
        onClick={() => {}}
        ariaLabel="Test button"
        testId="action-button"
      />
    );

    const button = screen.getByTestId("action-button");
    expect(button.className).toContain("hover:bg-gray-200");
    expect(button.className).toContain("dark:hover:bg-gray-700");
    expect(button.className).toContain("focus:outline-none");
    expect(button.className).toContain("focus:ring-2");
    expect(button.className).toContain("focus:ring-blue-500");
  });
});
