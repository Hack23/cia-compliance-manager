import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MetricsCard from "./MetricsCard";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("MetricsCard Component", () => {
  it("renders with title and value", () => {
    render(<MetricsCard title="Test Metric" value="100%" />);

    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TITLE)
    ).toHaveTextContent("Test Metric");
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_VALUE)
    ).toHaveTextContent("100%");
  });

  it("renders with custom test ID", () => {
    const customTestId = "custom-metrics-card";
    render(
      <MetricsCard title="Test Metric" value="100%" testId={customTestId} />
    );

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("renders with trend indicator", () => {
    render(
      <MetricsCard
        title="Test Metric"
        value="100%"
        trend={{ value: "+10%", direction: "up" }}
      />
    );

    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TREND)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TREND)
    ).toHaveTextContent("+10%");
  });

  it("renders with trend indicator", () => {
    render(
      <MetricsCard
        title="Growth Metric"
        value="25%"
        trend={{ value: "+5%", direction: "up" }}
      />
    );

    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TREND)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.METRICS_CARD_TREND)
    ).toHaveTextContent("+5%");
  });

  it("applies variant styling", () => {
    render(
      <MetricsCard title="Success Metric" value="100%" variant="success" />
    );

    const metricValue = screen.getByTestId(
      COMMON_COMPONENT_TEST_IDS.METRICS_CARD_VALUE
    );
    expect(metricValue.className).toContain("text-green");
  });
});
