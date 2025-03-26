import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import RiskLevelBadge from "./RiskLevelBadge";

describe("RiskLevelBadge", () => {
  it("renders the risk level text", () => {
    render(<RiskLevelBadge riskLevel="Critical" />);
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("renders with correct test ID", () => {
    render(<RiskLevelBadge riskLevel="High" testId="test-high-risk" />);
    expect(screen.getByTestId("test-high-risk")).toBeInTheDocument();
  });

  it("renders with default test ID when not provided", () => {
    render(<RiskLevelBadge riskLevel="Medium" />);
    expect(screen.getByTestId("risk-level-medium")).toBeInTheDocument();
  });

  it("renders with icon when showIcon is true", () => {
    const { container } = render(<RiskLevelBadge riskLevel="Critical" showIcon={true} />);
    // Check that there's a span before the text content, which would be the icon
    expect(container.querySelector("span > span")).toBeInTheDocument();
  });

  it("renders without icon when showIcon is false", () => {
    render(<RiskLevelBadge riskLevel="Low" showIcon={false} />);
    expect(screen.getByText("Low")).toBeInTheDocument();
    // Check direct text content without preceding span
    const badge = screen.getByTestId("risk-level-low");
    const spans = badge.querySelectorAll("span");
    expect(spans.length).toBe(0);
  });

  it("handles undefined risk level gracefully", () => {
    render(<RiskLevelBadge riskLevel={undefined as any} />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("applies additional className when provided", () => {
    render(<RiskLevelBadge riskLevel="Medium" className="test-class" />);
    const badge = screen.getByTestId("risk-level-medium");
    expect(badge.classList.contains("test-class")).toBe(true);
  });
});
