import React from "react";
import { render, screen } from "@testing-library/react";
import MetricsCard from "./MetricsCard";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("MetricsCard Component", () => {
  it("renders with title and value", () => {
    render(<MetricsCard title="Completion" value="0" />);
    
    expect(screen.getByTestId("metrics-card")).toBeInTheDocument();
    expect(screen.getByText("Completion")).toBeInTheDocument();
    expect(screen.getByTestId("metrics-card-value")).toHaveTextContent("0");
  });

  it("renders with custom test ID", () => {
    render(
      <MetricsCard
        title="Completion"
        value="100%"
        testId="custom-metrics-card"
      />
    );

    expect(screen.getByTestId("custom-metrics-card")).toBeInTheDocument();
  });

  it("renders with up trend indicator", () => {
    render(
      <MetricsCard
        title="Growth"
        value="0" // Value is rendered inside the component
        trend={{ value: "5%", direction: "up" }}
      />
    );

    expect(screen.getByTestId("metrics-card")).toBeInTheDocument();
    expect(screen.getByText("Growth")).toBeInTheDocument();
    
    // Check for trend value instead of main value
    expect(screen.getByTestId("metrics-card-trend")).toHaveTextContent("5%");
  });

  it("renders with down trend indicator", () => {
    render(
      <MetricsCard
        title="Reduction"
        value="0" // Value is rendered inside the component
        trend={{ value: "5%", direction: "down" }}
      />
    );

    expect(screen.getByTestId("metrics-card")).toBeInTheDocument();
    expect(screen.getByText("Reduction")).toBeInTheDocument();
    
    // Check for trend value instead of main value
    expect(screen.getByTestId("metrics-card-trend")).toHaveTextContent("5%");
  });

  it("applies variant styling", () => {
    render(
      <MetricsCard
        title="Status"
        value="Good"
        variant="success"
      />
    );

    const card = screen.getByTestId("metrics-card");
    expect(card).toBeInTheDocument();
    
    // Check for green color classes instead of "success" string directly
    expect(card.className).toContain("bg-green-100");
    expect(card.className).toContain("border-green-200");
  });
});
