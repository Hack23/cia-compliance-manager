import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SeverityBadge, { SeverityLevel } from "./SeverityBadge";

describe("SeverityBadge", () => {
  it("renders with Low severity", () => {
    render(<SeverityBadge severity="Low" testId="severity-badge" />);

    const badge = screen.getByTestId("severity-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Low");
    expect(badge).toHaveClass("bg-green-100", "text-green-800");
  });

  it("renders with Moderate severity", () => {
    render(<SeverityBadge severity="Moderate" testId="severity-badge" />);

    const badge = screen.getByTestId("severity-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Moderate");
    expect(badge).toHaveClass("bg-yellow-100", "text-yellow-800");
  });

  it("renders with High severity", () => {
    render(<SeverityBadge severity="High" testId="severity-badge" />);

    const badge = screen.getByTestId("severity-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("High");
    expect(badge).toHaveClass("bg-orange-100", "text-orange-800");
  });

  it("renders with Critical severity", () => {
    render(<SeverityBadge severity="Critical" testId="severity-badge" />);

    const badge = screen.getByTestId("severity-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Critical");
    expect(badge).toHaveClass("bg-red-100", "text-red-800");
  });

  it("applies custom className", () => {
    render(
      <SeverityBadge
        severity="High"
        testId="severity-badge"
        className="custom-class"
      />
    );

    const badge = screen.getByTestId("severity-badge");
    expect(badge).toHaveClass("custom-class");
  });

  it("renders without testId", () => {
    const { container } = render(<SeverityBadge severity="Moderate" />);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(<SeverityBadge severity="Critical" testId="severity-badge" />);

    const badge = screen.getByTestId("severity-badge");
    expect(badge).toHaveAttribute("role", "status");
    expect(badge).toHaveAttribute("aria-label", "Severity: Critical");
  });

  it("applies correct styling for all severity levels", () => {
    const severities: SeverityLevel[] = ["Low", "Moderate", "High", "Critical"];

    severities.forEach((severity) => {
      const { unmount } = render(
        <SeverityBadge severity={severity} testId={`badge-${severity}`} />
      );

      const badge = screen.getByTestId(`badge-${severity}`);
      expect(badge).toHaveClass("rounded-full", "px-2", "py-0.5", "text-xs");

      unmount();
    });
  });
});
