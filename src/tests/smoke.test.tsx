import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Basic component for testing
const TestComponent = ({ text = "Test Component" }: { text?: string }) => (
  <div data-testid="smoke-test">{text}</div>
);

describe("Testing Environment", () => {
  it("renders a React component", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("smoke-test")).toBeInTheDocument();
    expect(screen.getByText("Test Component")).toBeInTheDocument();
  });

  it("supports basic assertions", () => {
    expect(true).toBe(true);
    expect({}).toEqual({});
    expect("test").toBe("test");
    expect([1, 2, 3]).toHaveLength(3);
  });

  it("supports DOM assertions", () => {
    render(<TestComponent text="Custom Text" />);
    const element = screen.getByText("Custom Text");
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
    expect(element).toHaveTextContent("Custom Text");
  });

  it("supports mocking", () => {
    const mockFunction = vi.fn();
    mockFunction("test");
    expect(mockFunction).toHaveBeenCalledWith("test");
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
