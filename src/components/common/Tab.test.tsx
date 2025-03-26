import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Tab from "./Tab";

describe("Tab Component", () => {
  it("renders correctly with default props", () => {
    render(
      <Tab id="test-tab" label="Test Tab">
        Tab Content
      </Tab>
    );

    const tab = screen.getByRole("tab");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveAttribute("id", "test-tab");
    expect(tab).toHaveTextContent("Test Tab");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(
      <Tab id="test-tab" label="Test Tab" onClick={handleClick}>
        Tab Content
      </Tab>
    );

    const tab = screen.getByRole("tab");
    fireEvent.click(tab);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies active state correctly", () => {
    render(
      <Tab id="test-tab" label="Test Tab" active={true}>
        Tab Content
      </Tab>
    );

    const tab = screen.getByRole("tab");
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).toHaveClass("bg-primary-50");
  });

  it("applies inactive state correctly", () => {
    render(
      <Tab id="test-tab" label="Test Tab" active={false}>
        Tab Content
      </Tab>
    );

    const tab = screen.getByRole("tab");
    expect(tab).toHaveAttribute("aria-selected", "false");
    expect(tab).not.toHaveClass("bg-primary-50");
  });

  it("renders with custom className", () => {
    render(
      <Tab id="test-tab" label="Test Tab" className="custom-class">
        Tab Content
      </Tab>
    );

    const tab = screen.getByRole("tab");
    expect(tab).toHaveClass("custom-class");
  });
});
