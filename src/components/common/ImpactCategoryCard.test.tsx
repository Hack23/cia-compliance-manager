import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ImpactCategoryCard, { ImpactCategory } from "./ImpactCategoryCard";

describe("ImpactCategoryCard", () => {
  const mockCategory: ImpactCategory = {
    id: "financial",
    label: "Financial",
    icon: "💰",
    color: "cyan",
  };

  it("renders with all required props", () => {
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="High"
        details="Significant financial impact"
        testId="impact-card"
      />
    );

    const card = screen.getByTestId("impact-card");
    expect(card).toBeInTheDocument();
    expect(screen.getByText("Financial")).toBeInTheDocument();
    expect(screen.getByText("💰")).toBeInTheDocument();
    expect(screen.getByText("Significant financial impact")).toBeInTheDocument();
  });

  it("renders severity badge", () => {
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="Critical"
        details="Critical impact"
        testId="impact-card"
      />
    );

    const badge = screen.getByTestId("impact-card-severity-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Critical");
  });

  it("renders impact bar", () => {
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="Moderate"
        details="Moderate impact"
        testId="impact-card"
      />
    );

    const bar = screen.getByTestId("impact-card-impact-bar");
    expect(bar).toBeInTheDocument();
    expect(bar).toHaveAttribute("aria-valuenow", "50");
  });

  it("displays details text", () => {
    const details =
      "Detailed description of the impact with specific metrics";
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="Low"
        details={details}
        testId="impact-card"
      />
    );

    const detailsElement = screen.getByTestId("impact-card-details");
    expect(detailsElement).toBeInTheDocument();
    expect(detailsElement).toHaveTextContent(details);
    expect(detailsElement).toHaveClass("text-xs");
  });

  it("applies custom className", () => {
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="High"
        details="Impact details"
        testId="impact-card"
        className="custom-class"
      />
    );

    const card = screen.getByTestId("impact-card");
    expect(card).toHaveClass("custom-class");
  });

  it("renders without testId", () => {
    const { container } = render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="Moderate"
        details="Impact details"
      />
    );

    const card = container.querySelector('[role="article"]');
    expect(card).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="High"
        details="Impact details"
        testId="impact-card"
      />
    );

    const card = screen.getByTestId("impact-card");
    expect(card).toHaveAttribute("role", "article");
    expect(card).toHaveAttribute(
      "aria-label",
      "Financial impact: High severity"
    );
  });

  it("icon has correct accessibility label", () => {
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="Low"
        details="Impact details"
        testId="impact-card"
      />
    );

    const icon = screen.getByLabelText("Financial icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent("💰");
  });

  it("renders with different categories", () => {
    const categories: ImpactCategory[] = [
      { id: "financial", label: "Financial", icon: "💰", color: "cyan" },
      { id: "operational", label: "Operational", icon: "⚙️", color: "blue" },
      { id: "reputational", label: "Reputational", icon: "🏆", color: "purple" },
      { id: "regulatory", label: "Regulatory", icon: "⚖️", color: "red" },
    ];

    categories.forEach((category) => {
      const { unmount } = render(
        <ImpactCategoryCard
          category={category}
          severity="Moderate"
          details={`${category.label} impact details`}
          testId={`card-${category.id}`}
        />
      );

      expect(screen.getByText(category.label)).toBeInTheDocument();
      expect(screen.getByText(category.icon)).toBeInTheDocument();

      unmount();
    });
  });

  it("renders with all severity levels", () => {
    const severities: Array<"Low" | "Moderate" | "High" | "Critical"> = [
      "Low",
      "Moderate",
      "High",
      "Critical",
    ];

    severities.forEach((severity) => {
      const { unmount } = render(
        <ImpactCategoryCard
          category={mockCategory}
          severity={severity}
          details={`${severity} severity impact`}
          testId={`card-${severity}`}
        />
      );

      const badge = screen.getByTestId(`card-${severity}-severity-badge`);
      expect(badge).toHaveTextContent(severity);

      unmount();
    });
  });

  it("has correct layout and spacing classes", () => {
    render(
      <ImpactCategoryCard
        category={mockCategory}
        severity="High"
        details="Impact details"
        testId="impact-card"
      />
    );

    const card = screen.getByTestId("impact-card");
    expect(card).toHaveClass(
      "space-y-2",
      "rounded-lg",
      "border",
      "p-3",
      "shadow-sm"
    );
  });
});
