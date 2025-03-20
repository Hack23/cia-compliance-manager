import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SecurityLevelBadge from "../SecurityLevelBadge";

describe("SecurityLevelBadge", () => {
  it("renders with default props", () => {
    render(
      <SecurityLevelBadge
        category="Availability"
        level="Moderate"
        testId="test-badge"
      />
    );
    const badge = screen.getByTestId("test-badge");
    expect(badge).toBeInTheDocument();
  });

  it("applies custom color and text classes", () => {
    render(
      <SecurityLevelBadge
        category="Availability"
        level="Moderate"
        testId="test-badge"
        colorClass="bg-custom-color"
        textClass="text-custom-color"
      />
    );

    const badge = screen.getByTestId("test-badge");
    // Check if the classes are applied anywhere in the component's HTML
    expect(badge.innerHTML).toContain("bg-custom-color");
    expect(badge.innerHTML).toContain("text-custom-color");
  });

  it("applies default color classes based on security level", () => {
    const testCases = [
      { level: "None", colorClass: "bg-red-100", textClass: "text-red-800" },
      {
        level: "Low",
        colorClass: "bg-orange-100",
        textClass: "text-orange-800",
      },
      {
        level: "Moderate",
        colorClass: "bg-yellow-100",
        textClass: "text-yellow-800",
      },
      {
        level: "High",
        colorClass: "bg-green-100",
        textClass: "text-green-800",
      },
      {
        level: "Very High",
        colorClass: "bg-blue-100",
        textClass: "text-blue-800",
      },
    ];

    for (const { level, colorClass, textClass } of testCases) {
      const { container, rerender } = render(
        <SecurityLevelBadge
          category="Test"
          level={level as any}
          testId="test-badge"
        />
      );

      const badge = screen.getByTestId("test-badge");
      expect(badge.innerHTML).toContain(colorClass);
      expect(badge.innerHTML).toContain(textClass);

      rerender(<div />); // Clean up before next test case
    }
  });
});
