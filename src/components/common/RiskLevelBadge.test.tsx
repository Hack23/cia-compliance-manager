import { render, screen } from "@testing-library/react";
import RiskLevelBadge from "./RiskLevelBadge";

describe("RiskLevelBadge", () => {
  it("displays risk level text", () => {
    render(<RiskLevelBadge risk="Critical Risk" />);
    expect(screen.getByText(/Critical Risk/i)).toBeInTheDocument();
  });

  it("uses custom test ID when provided", () => {
    render(<RiskLevelBadge risk="High Risk" testId="custom-test-id" />);
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });

  it("adds Risk suffix when not present", () => {
    render(<RiskLevelBadge risk="Medium" />);
    expect(screen.getByText(/Medium Risk/i)).toBeInTheDocument();
  });

  it("displays icon when showIcon is true", () => {
    const { rerender } = render(
      <RiskLevelBadge risk="Critical" showIcon={true} />
    );
    const badgeText = screen.getByTestId("risk-level-badge").textContent;
    expect(badgeText).match(/⚠️/);

    rerender(<RiskLevelBadge risk="Low" showIcon={true} />);
    const lowRiskBadgeText = screen.getByTestId("risk-level-badge").textContent;
    expect(lowRiskBadgeText).match(/ℹ️/);
  });

  it("handles undefined risk level gracefully", () => {
    render(<RiskLevelBadge risk={undefined as any} />);
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("applies custom class name", () => {
    render(<RiskLevelBadge risk="Medium Risk" className="custom-class" />);
    const badge = screen.getByTestId("risk-level-badge");
    expect(badge.classList.contains("custom-class")).true;
  });
});
