import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from "./StatusBadge";

describe("StatusBadge Component", () => {
  it("renders with status text", () => {
    render(<StatusBadge status="success">Success</StatusBadge>);

    expect(screen.getByText("Success")).toBeInTheDocument();
  });

  it("renders with custom test ID", () => {
    render(
      <StatusBadge status="success" testId="custom-badge">
        Success
      </StatusBadge>
    );

    expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
  });

  it("applies status-based styling", () => {
    const { rerender } = render(
      <StatusBadge status="success" testId="badge">
        Success
      </StatusBadge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("bg-green-100");

    rerender(
      <StatusBadge status="error" testId="badge">
        Error
      </StatusBadge>
    );
    expect(badge.className).toContain("bg-red-100");

    rerender(
      <StatusBadge status="warning" testId="badge">
        Warning
      </StatusBadge>
    );
    expect(badge.className).toContain("bg-yellow-100");

    rerender(
      <StatusBadge status="info" testId="badge">
        Info
      </StatusBadge>
    );
    expect(badge.className).toContain("bg-blue-100");
  });

  it("applies size styling", () => {
    const { rerender } = render(
      <StatusBadge status="success" size="sm" testId="badge">
        Small
      </StatusBadge>
    );
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("text-xs");

    rerender(
      <StatusBadge status="success" size="md" testId="badge">
        Medium
      </StatusBadge>
    );
    expect(badge.className).toContain("text-xs");

    rerender(
      <StatusBadge status="success" size="lg" testId="badge">
        Large
      </StatusBadge>
    );
    expect(badge.className).toContain("text-sm");
  });

  it("renders with success status", () => {
    render(
      <StatusBadge status="success" testId="success-badge">
        Success
      </StatusBadge>
    );

    const badge = screen.getByTestId("success-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Success");
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-800");
  });

  it("renders with warning status", () => {
    render(
      <StatusBadge status="warning" testId="warning-badge">
        Warning
      </StatusBadge>
    );

    const badge = screen.getByTestId("warning-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Warning");
    expect(badge).toHaveClass("bg-yellow-100");
    expect(badge).toHaveClass("text-yellow-800");
  });

  it("renders with error status", () => {
    render(
      <StatusBadge status="error" testId="error-badge">
        Error
      </StatusBadge>
    );

    const badge = screen.getByTestId("error-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Error");
    expect(badge).toHaveClass("bg-red-100");
    expect(badge).toHaveClass("text-red-800");
  });

  it("renders with info status", () => {
    render(
      <StatusBadge status="info" testId="info-badge">
        Info
      </StatusBadge>
    );

    const badge = screen.getByTestId("info-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Info");
    expect(badge).toHaveClass("bg-blue-100");
    expect(badge).toHaveClass("text-blue-800");
  });

  it("renders with neutral status", () => {
    render(
      <StatusBadge status="neutral" testId="neutral-badge">
        Neutral
      </StatusBadge>
    );

    const badge = screen.getByTestId("neutral-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Neutral");
    expect(badge).toHaveClass("bg-gray-100");
    expect(badge).toHaveClass("text-gray-800");
  });

  it("applies custom className", () => {
    render(
      <StatusBadge
        status="success"
        className="custom-class"
        testId="custom-badge"
      >
        With Custom Class
      </StatusBadge>
    );

    const badge = screen.getByTestId("custom-badge");
    expect(badge).toHaveClass("custom-class");
  });
});
