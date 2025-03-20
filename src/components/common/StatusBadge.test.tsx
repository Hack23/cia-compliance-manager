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
});
