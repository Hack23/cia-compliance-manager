import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SecurityRiskScore from "./SecurityRiskScore";

describe("SecurityRiskScore", () => {
  it("renders with a score and label", () => {
    render(
      <SecurityRiskScore
        score={75}
        label="Security Score"
        testId="security-score"
      />
    );

    const element = screen.getByTestId("security-score");
    const value = screen.getByTestId("security-score-value");
    const label = screen.getByTestId("security-score-label");

    expect(element).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("75");
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("Security Score");
  });

  it("normalizes scores below 0", () => {
    render(
      <SecurityRiskScore
        score={-10}
        label="Security Score"
        testId="security-score"
      />
    );

    const value = screen.getByTestId("security-score-value");
    expect(value).toHaveTextContent("0");
  });

  it("normalizes scores above maxScore", () => {
    render(
      <SecurityRiskScore
        score={150}
        maxScore={100}
        label="Security Score"
        testId="security-score"
      />
    );

    const value = screen.getByTestId("security-score-value");
    expect(value).toHaveTextContent("100");
  });

  it("uses green color for high scores", () => {
    render(
      <SecurityRiskScore
        score={80}
        label="Security Score"
        testId="security-score"
      />
    );

    const value = screen.getByTestId("security-score-value");
    // Check that the class contains green color
    expect(value.className).toContain("text-green");
  });

  it("uses yellow color for medium scores", () => {
    render(
      <SecurityRiskScore
        score={60}
        label="Security Score"
        testId="security-score"
      />
    );

    const value = screen.getByTestId("security-score-value");
    // Check that the class contains yellow color
    expect(value.className).toContain("text-yellow");
  });

  it("uses red color for low scores", () => {
    render(
      <SecurityRiskScore
        score={20}
        label="Security Score"
        testId="security-score"
      />
    );

    const value = screen.getByTestId("security-score-value");
    // Check that the class contains red color
    expect(value.className).toContain("text-red");
  });

  it("applies custom className", () => {
    render(
      <SecurityRiskScore
        score={50}
        label="Security Score"
        className="custom-class"
        testId="security-score"
      />
    );

    const element = screen.getByTestId("security-score");
    expect(element.className).toContain("custom-class");
  });

  it("calculates correct stroke dash offset based on score", () => {
    render(
      <SecurityRiskScore
        score={50}
        label="Security Score"
        testId="security-score"
      />
    );

    // Find the svg circle for the score indicator
    const circle = screen
      .getByTestId("security-score")
      .querySelector("circle:nth-of-type(2)");
    expect(circle).toBeInTheDocument();

    // Check that the circle has correct attributes
    if (circle) {
      // The stroke-dasharray should be the circumference (2πr = 2π*28)
      expect(circle.getAttribute("stroke-dasharray")).toBeTruthy();
      // The stroke-dashoffset should reflect the 50% score
      const dashOffset = circle.getAttribute("stroke-dashoffset");
      expect(dashOffset).toBeTruthy();
      if (dashOffset) {
        // For 50% score, offset should be about half the circumference
        const circumference = 2 * Math.PI * 28;
        const expectedOffset = circumference * 0.5;
        expect(parseFloat(dashOffset)).toBeCloseTo(expectedOffset, 0);
      }
    }
  });
});
