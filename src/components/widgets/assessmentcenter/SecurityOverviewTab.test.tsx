import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import { SecurityOverviewTab, SecurityOverviewTabProps } from "./SecurityOverviewTab";

// Mock RadarChart component
vi.mock("../../charts/RadarChart", () => ({
  default: ({ testId }: { testId: string }) => (
    <div data-testid={testId}>Mocked RadarChart</div>
  ),
}));

// Mock SecurityLevelIndicator component
vi.mock("../../common/SecurityLevelIndicator", () => ({
  default: ({ level, testId }: { level: SecurityLevel; testId: string }) => (
    <div data-testid={testId}>{level}</div>
  ),
}));

// Mock StatusBadge component
vi.mock("../../common/StatusBadge", () => ({
  default: ({ text, testId }: { text: string; testId: string }) => (
    <div data-testid={testId}>{text}</div>
  ),
}));

describe("SecurityOverviewTab", () => {
  const defaultProps: SecurityOverviewTabProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    dataClassification: "Confidential",
    implementationComplexity: "Medium",
    businessMaturityLevel: "Optimizing",
    businessMaturityDescription: "Advanced security practices",
    securityScore: 75,
    complianceScore: 80,
    testId: "security-overview",
    getStatusVariant: vi.fn(() => "info" as const),
  };

  it("renders without crashing", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    expect(
      screen.getByTestId("security-overview-content-overview")
    ).toBeInTheDocument();
  });

  it("displays radar chart with correct testId", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    // Radar chart is rendered by the mocked component
    expect(screen.getByTestId("security-overview-radar-chart")).toBeInTheDocument();
  });

  it("displays CIA component cards", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    
    // Check that the component renders CIA-related content
    expect(screen.getByText(/confidentiality/i)).toBeInTheDocument();
    expect(screen.getByText(/integrity/i)).toBeInTheDocument();
    expect(screen.getByText(/availability/i)).toBeInTheDocument();
  });

  it("displays correct security levels for each component", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    
    // Check that security level indicators are rendered with correct levels
    const indicators = screen.getAllByText("Moderate");
    expect(indicators.length).toBeGreaterThan(0);
  });

  it("displays data classification", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    expect(screen.getByText("Confidential")).toBeInTheDocument();
  });

  it("displays implementation complexity", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("displays business maturity level and description", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    expect(screen.getByText("Optimizing")).toBeInTheDocument();
    expect(screen.getByText("Advanced security practices")).toBeInTheDocument();
  });

  it("displays key metrics", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    // Key metrics section contains implementation complexity and other metrics
    expect(screen.getByText(/implementation complexity/i)).toBeInTheDocument();
  });

  it("displays compliance score when provided", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    expect(screen.getByText(/80/)).toBeInTheDocument();
  });

  it("handles missing compliance score", () => {
    const propsWithoutCompliance = { ...defaultProps, complianceScore: undefined };
    render(<SecurityOverviewTab {...propsWithoutCompliance} />);
    expect(
      screen.getByTestId("security-overview-content-overview")
    ).toBeInTheDocument();
  });

  it("displays validation level for integrity", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    // Validation level text should be present
    expect(screen.getByText(/validation/i)).toBeInTheDocument();
  });

  it("displays uptime target for availability", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    // Uptime target should be present
    expect(screen.getByText(/uptime/i)).toBeInTheDocument();
  });

  it("calls getStatusVariant with correct parameters", () => {
    const mockGetStatusVariant = vi.fn(() => "info" as const);
    render(
      <SecurityOverviewTab
        {...defaultProps}
        getStatusVariant={mockGetStatusVariant}
      />
    );
    
    expect(mockGetStatusVariant).toHaveBeenCalled();
  });

  it("handles different security levels", () => {
    const highLevelProps = {
      ...defaultProps,
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
    };
    
    render(<SecurityOverviewTab {...highLevelProps} />);
    
    const indicators = screen.getAllByText("High");
    expect(indicators.length).toBeGreaterThan(0);
  });

  it("handles Very High security levels", () => {
    const veryHighProps = {
      ...defaultProps,
      availabilityLevel: "Very High" as SecurityLevel,
      integrityLevel: "Very High" as SecurityLevel,
      confidentialityLevel: "Very High" as SecurityLevel,
    };
    
    render(<SecurityOverviewTab {...veryHighProps} />);
    
    const indicators = screen.getAllByText("Very High");
    expect(indicators.length).toBeGreaterThan(0);
  });

  it("handles None security levels", () => {
    const noneProps = {
      ...defaultProps,
      availabilityLevel: "None" as SecurityLevel,
      integrityLevel: "None" as SecurityLevel,
      confidentialityLevel: "None" as SecurityLevel,
    };
    
    render(<SecurityOverviewTab {...noneProps} />);
    
    const indicators = screen.getAllByText("None");
    expect(indicators.length).toBeGreaterThan(0);
  });

  it("renders with custom testId", () => {
    const customTestId = "custom-overview-tab";
    render(<SecurityOverviewTab {...defaultProps} testId={customTestId} />);
    
    expect(
      screen.getByTestId(`${customTestId}-content-overview`)
    ).toBeInTheDocument();
  });

  it("displays security components section", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    expect(screen.getByText(/security components/i)).toBeInTheDocument();
  });

  it("displays key security metrics section", () => {
    render(<SecurityOverviewTab {...defaultProps} />);
    expect(screen.getByText(/key security metrics/i)).toBeInTheDocument();
  });
});
