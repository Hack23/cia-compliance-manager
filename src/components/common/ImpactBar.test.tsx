import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ImpactBar from "./ImpactBar";
import { SeverityLevel } from "./SeverityBadge";

describe("ImpactBar", () => {
  it("renders with Low severity (25% fill)", () => {
    render(<ImpactBar severity="Low" testId="impact-bar" />);

    const bar = screen.getByTestId("impact-bar");
    const fill = screen.getByTestId("impact-bar-fill");

    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "25");
    expect(fill).toHaveStyle({ width: "25%" });
    expect(fill).toHaveClass("bg-green-500");
  });

  it("renders with Moderate severity (50% fill)", () => {
    render(<ImpactBar severity="Moderate" testId="impact-bar" />);

    const bar = screen.getByTestId("impact-bar");
    const fill = screen.getByTestId("impact-bar-fill");

    expect(bar).toHaveAttribute("aria-valuenow", "50");
    expect(fill).toHaveStyle({ width: "50%" });
    expect(fill).toHaveClass("bg-yellow-500");
  });

  it("renders with High severity (75% fill)", () => {
    render(<ImpactBar severity="High" testId="impact-bar" />);

    const bar = screen.getByTestId("impact-bar");
    const fill = screen.getByTestId("impact-bar-fill");

    expect(bar).toHaveAttribute("aria-valuenow", "75");
    expect(fill).toHaveStyle({ width: "75%" });
    expect(fill).toHaveClass("bg-orange-500");
  });

  it("renders with Critical severity (100% fill)", () => {
    render(<ImpactBar severity="Critical" testId="impact-bar" />);

    const bar = screen.getByTestId("impact-bar");
    const fill = screen.getByTestId("impact-bar-fill");

    expect(bar).toHaveAttribute("aria-valuenow", "100");
    expect(fill).toHaveStyle({ width: "100%" });
    expect(fill).toHaveClass("bg-red-500");
  });

  it("applies custom className", () => {
    render(
      <ImpactBar severity="High" testId="impact-bar" className="custom-class" />
    );

    const bar = screen.getByTestId("impact-bar");
    expect(bar).toHaveClass("custom-class");
  });

  it("has correct accessibility attributes", () => {
    render(<ImpactBar severity="High" testId="impact-bar" />);

    const bar = screen.getByTestId("impact-bar");
    expect(bar).toHaveAttribute("role", "progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "75");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-label", "High severity: 75%");
  });

  it("renders without testId", () => {
    const { container } = render(<ImpactBar severity="Moderate" />);
    const bar = container.querySelector('[role="progressbar"]');
    expect(bar).toBeInTheDocument();
  });

  it("applies correct base styling", () => {
    render(<ImpactBar severity="Low" testId="impact-bar" />);

    const bar = screen.getByTestId("impact-bar");
    expect(bar).toHaveClass(
      "h-2",
      "w-full",
      "rounded-full",
      "bg-gray-200",
      "dark:bg-gray-700"
    );
  });

  it("fill has transition classes", () => {
    render(<ImpactBar severity="Moderate" testId="impact-bar" />);

    const fill = screen.getByTestId("impact-bar-fill");
    expect(fill).toHaveClass("transition-all", "duration-300");
  });

  it("renders correctly for all severity levels", () => {
    const severities: Array<{ level: SeverityLevel; percentage: number }> = [
      { level: "Low", percentage: 25 },
      { level: "Moderate", percentage: 50 },
      { level: "High", percentage: 75 },
      { level: "Critical", percentage: 100 },
    ];

    severities.forEach(({ level, percentage }) => {
      const { unmount } = render(
        <ImpactBar severity={level} testId={`bar-${level}`} />
      );

      const bar = screen.getByTestId(`bar-${level}`);
      expect(bar).toHaveAttribute("aria-valuenow", percentage.toString());

      unmount();
    });
  });
});
