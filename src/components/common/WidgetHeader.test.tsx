import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WidgetHeader from "./WidgetHeader";

describe("WidgetHeader Component", () => {
  it("renders title correctly", () => {
    render(<WidgetHeader title="Test Widget" />);
    expect(screen.getByText("Test Widget")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const testId = "test-icon";
    render(
      <WidgetHeader
        title="Test Widget"
        icon={<span data-testid={testId}>🔒</span>}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByText("Test Widget")).toBeInTheDocument();
  });

  it("renders with actions", () => {
    const actionsTestId = "widget-actions";
    render(
      <WidgetHeader
        title="Test Widget"
        actions={<div data-testid={actionsTestId}>Actions</div>}
      />
    );

    expect(screen.getByTestId(actionsTestId)).toBeInTheDocument();
    expect(screen.getByText("Test Widget")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const customClass = "custom-header";
    render(<WidgetHeader title="Test Widget" className={customClass} />);

    const header = screen.getByText("Test Widget").closest("div");
    expect(header).toHaveClass(customClass);
  });

  it("forwards data-testid attribute", () => {
    const testId = "custom-header-testid";
    render(<WidgetHeader title="Test Widget" data-testid={testId} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("renders title with proper tag and styling", () => {
    render(<WidgetHeader title="Test Widget" />);

    const title = screen.getByText("Test Widget");
    expect(title.tagName).toBe("H3");
    expect(title).toHaveClass("text-lg");
  });
});
