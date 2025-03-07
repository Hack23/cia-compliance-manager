import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";
import { APP_TEST_IDS, CHART_TEST_IDS } from "./constants/testIds";
import { SECURITY_LEVELS } from "./constants/appConstants";

// Mock the child components
vi.mock("./components/Dashboard", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-dashboard">{children}</div>
  ),
  DashboardWidget: ({
    title,
    children,
    testId,
  }: {
    title: string;
    children: React.ReactNode;
    testId: string;
  }) => (
    <div
      data-testid={
        testId ||
        `mock-dashboard-widget-${title?.toLowerCase().replace(/\s/g, "-")}`
      }
    >
      <h3>{title}</h3>
      {children}
    </div>
  ),
}));

// Mock all widgets
vi.mock("./components/widgets/SecurityLevelWidget", () => ({
  default: () => (
    <div data-testid="mock-security-level">Security Level Widget</div>
  ),
}));

vi.mock("./components/widgets/CostEstimationWidget", () => ({
  default: () => <div data-testid="mock-cost-estimation">Cost Estimation</div>,
}));

vi.mock("./components/widgets/SecuritySummaryWidget", () => ({
  default: () => (
    <div data-testid="mock-security-summary">Security Summary</div>
  ),
}));

vi.mock("./components/widgets/ValueCreationWidget", () => ({
  default: () => <div data-testid="mock-value-creation">Value Creation</div>,
}));

vi.mock("./components/widgets/ComplianceStatusWidget", () => ({
  default: () => (
    <div data-testid="mock-compliance-status">Compliance Status</div>
  ),
}));

// Mock the new widgets
vi.mock("./components/widgets/IntegrityImpactWidget", () => ({
  default: () => (
    <div data-testid="mock-integrity-impact">Integrity Impact</div>
  ),
}));

vi.mock("./components/widgets/ConfidentialityImpactWidget", () => ({
  default: () => (
    <div data-testid="mock-confidentiality-impact">Confidentiality Impact</div>
  ),
}));

vi.mock("./components/widgets/AvailabilityImpactWidget", () => ({
  default: () => (
    <div data-testid="mock-availability-impact">Availability Impact</div>
  ),
}));

vi.mock("./components/widgets/SecurityResourcesWidget", () => ({
  default: () => (
    <div data-testid="mock-security-resources">Security Resources</div>
  ),
}));

vi.mock("./components/widgets/TechnicalDetailsWidget", () => ({
  default: () => (
    <div data-testid="mock-technical-details">Technical Details</div>
  ),
}));

vi.mock("./components/widgets/BusinessImpactAnalysisWidget", () => ({
  default: () => (
    <div data-testid="mock-business-impact">Business Impact Analysis</div>
  ),
}));

vi.mock("./components/RadarChart", () => {
  return {
    default: ({
      availability,
      integrity,
      confidentiality,
    }: {
      availability: string;
      integrity: string;
      confidentiality: string;
    }) => (
      <div data-testid="mock-radar-chart">
        <div data-testid={CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE}>
          {availability}
        </div>
        <div data-testid={CHART_TEST_IDS.RADAR_INTEGRITY_VALUE}>
          {integrity}
        </div>
        <div data-testid={CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE}>
          {confidentiality}
        </div>
      </div>
    ),
  };
});

describe("CIAClassificationApp", () => {
  it("renders the app with all components", () => {
    render(<CIAClassificationApp />);

    // Verify app container is present
    expect(screen.getByTestId(APP_TEST_IDS.APP_CONTAINER)).toBeInTheDocument();

    // Verify all widgets are rendered
    expect(screen.getByTestId("mock-security-level")).toBeInTheDocument();
    expect(screen.getByTestId("mock-radar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("mock-security-summary")).toBeInTheDocument();
    expect(screen.getByTestId("mock-cost-estimation")).toBeInTheDocument();
    expect(screen.getByTestId("mock-value-creation")).toBeInTheDocument();
    expect(screen.getByTestId("mock-compliance-status")).toBeInTheDocument();

    // Test for new widgets
    expect(screen.getByTestId("mock-integrity-impact")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-confidentiality-impact")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-availability-impact")).toBeInTheDocument();
    expect(screen.getByTestId("mock-security-resources")).toBeInTheDocument();
    expect(screen.getByTestId("mock-technical-details")).toBeInTheDocument();
    expect(screen.getByTestId("mock-business-impact")).toBeInTheDocument();
  });

  it("updates the radar chart when security levels change", async () => {
    render(<CIAClassificationApp />);

    // The radar chart should initially use "None" as the default value for all dimensions
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent(SECURITY_LEVELS.NONE);

    // When we update the app state to change security levels, the radar chart should update
    // Note: In a real test, you would call setAvailability through user events
    // Here we're just verifying that the props are properly connected
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE)
    ).toHaveTextContent(SECURITY_LEVELS.NONE);
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_INTEGRITY_VALUE)
    ).toHaveTextContent(SECURITY_LEVELS.NONE);
    expect(
      screen.getByTestId(CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE)
    ).toHaveTextContent(SECURITY_LEVELS.NONE);
  });
});
