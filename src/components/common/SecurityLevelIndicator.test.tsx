import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecurityLevel } from "../../types/cia";
import SecurityLevelIndicator from "./SecurityLevelIndicator";

describe("SecurityLevelIndicator", () => {
  it("renders with security level text", () => {
    render(
      <SecurityLevelIndicator level="Moderate" testId="level-indicator" />
    );

    const indicator = screen.getByTestId("level-indicator");
    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveTextContent("Moderate");
  });

  it("applies appropriate classes for each security level", () => {
    const levels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];

    const { rerender } = render(
      <SecurityLevelIndicator level={levels[0]} testId="level-indicator" />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("bg-red-100");

    rerender(
      <SecurityLevelIndicator level={levels[1]} testId="level-indicator" />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("bg-yellow-100");

    rerender(
      <SecurityLevelIndicator level={levels[2]} testId="level-indicator" />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("bg-blue-100");

    rerender(
      <SecurityLevelIndicator level={levels[3]} testId="level-indicator" />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("bg-green-100");

    rerender(
      <SecurityLevelIndicator level={levels[4]} testId="level-indicator" />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("bg-purple-100");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <SecurityLevelIndicator
        level="Moderate"
        size="sm"
        testId="level-indicator"
      />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("text-xs px-1.5");

    rerender(
      <SecurityLevelIndicator
        level="Moderate"
        size="md"
        testId="level-indicator"
      />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("text-xs px-2");

    rerender(
      <SecurityLevelIndicator
        level="Moderate"
        size="lg"
        testId="level-indicator"
      />
    );
    expect(screen.getByTestId("level-indicator")).toHaveClass("text-sm px-3");
  });

  it("applies custom className", () => {
    render(
      <SecurityLevelIndicator
        level="Moderate"
        className="custom-class"
        testId="level-indicator"
      />
    );

    expect(screen.getByTestId("level-indicator")).toHaveClass("custom-class");
  });
});
