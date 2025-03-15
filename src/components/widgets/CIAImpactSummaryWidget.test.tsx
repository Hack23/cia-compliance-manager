import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CIAImpactSummaryWidget from "./CIAImpactSummaryWidget";

describe("CIAImpactSummaryWidget", () => {
  it("renders with correct security levels", () => {
    render(
      <CIAImpactSummaryWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // Check that widget renders correctly
    expect(screen.getByTestId("cia-impact-summary-widget")).toBeInTheDocument();

    // Instead of trying to find elements by text directly (which might cause multiple matches),
    // find elements by their data-testid and then check their content

    // Get all status badges
    const statusBadges = screen.getAllByTestId("status-badge");

    // Check for the presence of each security level
    const badgeTexts = statusBadges.map((badge) => badge.textContent);
    expect(badgeTexts).toContain("High");
    expect(badgeTexts).toContain("Moderate");
    expect(badgeTexts).toContain("Low");

    // Alternative approach: Find specific sections using a more targeted approach
    // Get all divs that might contain our CIA components
    const securityComponents = screen.getAllByRole("heading", { level: 4 });

    // Find the Availability heading and check its following badge
    const availabilityHeading = securityComponents.find((h) =>
      h.textContent?.includes("Availability")
    );
    const availabilityBadge = availabilityHeading?.parentElement?.querySelector(
      '[data-testid="status-badge"]'
    );
    expect(availabilityBadge?.textContent).toBe("High");

    // Find the Integrity heading and check its following badge
    const integrityHeading = securityComponents.find((h) =>
      h.textContent?.includes("Integrity")
    );
    const integrityBadge = integrityHeading?.parentElement?.querySelector(
      '[data-testid="status-badge"]'
    );
    expect(integrityBadge?.textContent).toBe("Moderate");

    // Find the Confidentiality heading and check its following badge
    const confidentialityHeading = securityComponents.find((h) =>
      h.textContent?.includes("Confidentiality")
    );
    const confidentialityBadge =
      confidentialityHeading?.parentElement?.querySelector(
        '[data-testid="status-badge"]'
      );
    expect(confidentialityBadge?.textContent).toBe("Low");
  });

  it("handles None security level", () => {
    render(
      <CIAImpactSummaryWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
      />
    );

    // Updated to check for "None" text rather than specific testIds
    const noneBadges = screen.getAllByText("None");
    expect(noneBadges.length).toBeGreaterThan(0);
  });

  it("renders with custom class name", () => {
    const customClass = "custom-class";
    render(
      <CIAImpactSummaryWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
        className={customClass}
      />
    );

    // Check that custom class is applied to the widget
    expect(screen.getByTestId("cia-impact-summary-widget")).toHaveClass(
      customClass
    );
  });

  it("accepts custom testId prop", () => {
    const testId = "custom-impact-summary";
    render(
      <CIAImpactSummaryWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
        testId={testId}
      />
    );

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });
});
