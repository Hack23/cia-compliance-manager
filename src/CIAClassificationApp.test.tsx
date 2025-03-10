import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";
import { APP_TEST_IDS } from "./constants/testIds";

// Simplified mock approach - mock all widgets at once
vi.mock("./components/widgets", () => ({
  SecurityLevelWidget: () => (
    <div data-testid="mock-security-level">Security Level Widget</div>
  ),
  SecuritySummaryWidget: () => (
    <div data-testid="mock-security-summary">Security Summary Widget</div>
  ),
  CostEstimationWidget: () => (
    <div data-testid="mock-cost-estimation">Cost Estimation Widget</div>
  ),
  ValueCreationWidget: () => (
    <div data-testid="mock-value-creation">Value Creation Widget</div>
  ),
  ComplianceStatusWidget: () => (
    <div data-testid="mock-compliance-status">Compliance Status Widget</div>
  ),
  IntegrityImpactWidget: () => (
    <div data-testid="mock-integrity-impact">Integrity Impact Widget</div>
  ),
  ConfidentialityImpactWidget: () => (
    <div data-testid="mock-confidentiality-impact">
      Confidentiality Impact Widget
    </div>
  ),
  AvailabilityImpactWidget: () => (
    <div data-testid="mock-availability-impact">Availability Impact Widget</div>
  ),
  TechnicalDetailsWidget: () => (
    <div data-testid="mock-technical-details">Technical Details Widget</div>
  ),
  BusinessImpactAnalysisWidget: () => (
    <div data-testid="mock-business-impact">Business Impact Widget</div>
  ),
  SecurityResourcesWidget: () => (
    <div data-testid="mock-security-resources">Security Resources Widget</div>
  ),
}));

// Mock Dashboard component - adding TypeScript types
vi.mock("./components/Dashboard", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-dashboard">{children}</div>
  ),
  DashboardWidget: ({
    title,
    children,
    testId,
  }: {
    title?: string;
    children: React.ReactNode;
    testId?: string;
  }) => (
    <div
      data-testid={
        testId || `mock-widget-${title?.toLowerCase().replace(/\s/g, "-")}`
      }
    >
      <h3>{title}</h3>
      {children}
    </div>
  ),
}));

// Mock RadarChart
vi.mock("./components/RadarChart", () => ({
  default: () => <div data-testid="mock-radar-chart">Radar Chart</div>,
}));

describe("CIAClassificationApp", () => {
  it("renders the app with all required components", () => {
    render(<CIAClassificationApp />);

    // Verify app container is present
    expect(screen.getByTestId(APP_TEST_IDS.APP_CONTAINER)).toBeInTheDocument();

    // Verify all key widgets are rendered
    expect(screen.getByTestId("mock-security-level")).toBeInTheDocument();
    expect(screen.getByTestId("mock-radar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("mock-security-summary")).toBeInTheDocument();
    expect(screen.getByTestId("mock-cost-estimation")).toBeInTheDocument();
    expect(screen.getByTestId("mock-value-creation")).toBeInTheDocument();
    expect(screen.getByTestId("mock-compliance-status")).toBeInTheDocument();
    expect(screen.getByTestId("mock-integrity-impact")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-confidentiality-impact")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-availability-impact")).toBeInTheDocument();
    expect(screen.getByTestId("mock-technical-details")).toBeInTheDocument();
  });
});
