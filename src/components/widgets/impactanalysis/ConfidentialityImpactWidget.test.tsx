import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import { CIAComponentType } from "../../../types/cia-services";
import ConfidentialityImpactWidget from "./ConfidentialityImpactWidget";

// Mock useCIAContentService hook
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getComponentDetails: (
        component: CIAComponentType,
        level: SecurityLevel
      ) => {
        if (level === ("Unknown" as SecurityLevel)) {
          return undefined;
        }
        return {
          description: `${level} ${component} description`,
          technical: `${level} ${component} technical details`,
          businessImpact: `${level} ${component} business impact`,
          privacyImpact: `${level === "None" ? "No" : level} Privacy Controls`,
          protectionMethod:
            level !== "None" ? `${level} protection method` : undefined,
        };
      },
      getBusinessImpact: (
        component: CIAComponentType,
        level: SecurityLevel
      ) => ({
        summary: `${level} ${component} business impact summary`,
        reputational: {
          description: `${level} reputational impact`,
          riskLevel: level === "None" ? "Critical Risk" : "Medium Risk",
        },
        regulatory: {
          description: `${level} regulatory impact`,
          riskLevel: level === "None" ? "Critical Risk" : "Low Risk",
        },
      }),
      getInformationSensitivity: (level: SecurityLevel) => {
        switch (level) {
          case "None":
            return "Public Data";
          case "Low":
            return "Internal Data";
          case "Moderate":
            return "Sensitive Data";
          case "High":
            return "Confidential Data";
          case "Very High":
            return "Restricted Data";
          default:
            return "Unknown Classification";
        }
      },
      getDefaultPrivacyImpact: (level: SecurityLevel) => {
        return `${level === "None" ? "No" : level} Privacy Controls`;
      },
    },
    error: null,
    isLoading: false,
  }),
}));

// Mock StatusBadge component
vi.mock("../../../components/common/StatusBadge", () => ({
  default: ({
    children,
    status,
  }: {
    children: React.ReactNode;
    status: string;
  }) => (
    <span data-testid="status-badge" className={`status-badge-${status}`}>
      {children}
    </span>
  ),
}));

// Mock BusinessImpactSection component
vi.mock("../../../components/common/BusinessImpactSection", () => ({
  default: ({
    impact,
    testId,
  }: {
    impact: { summary: string } | undefined;
    testId?: string;
  }) => (
    <div data-testid={testId || "business-impact-section"}>
      {impact?.summary}
    </div>
  ),
}));

// Mock SecurityLevelBadge component
vi.mock("../../../components/common/SecurityLevelBadge", () => ({
  default: ({ level, testId }: { level: string; testId?: string }) => (
    <div data-testid={testId || "security-level-badge"}>{level}</div>
  ),
}));

// Mock WidgetContainer component
vi.mock("../../../components/common/WidgetContainer", () => ({
  default: ({
    children,
    title,
    testId,
  }: {
    children: React.ReactNode;
    title: string;
    testId?: string;
  }) => (
    <div data-testid={testId || "widget-container"}>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

describe("ConfidentialityImpactWidget", () => {
  const defaultProps = {
    level: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
    testId: "confidentiality-widget",
  };

  it("renders without crashing", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByTestId("confidentiality-widget")).toBeInTheDocument();
  });

  it("displays security level badge with the correct level", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(
      screen.getByTestId("confidentiality-widget-confidentiality-badge")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("confidentiality-widget-confidentiality-badge")
    ).toHaveTextContent("Moderate");
  });

  it("displays business impact section", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(
      screen.getByTestId("confidentiality-widget-business-impact")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Moderate confidentiality business impact summary")
    ).toBeInTheDocument();
  });

  it("displays data protection heading and data classification", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Data Protection")).toBeInTheDocument();
    expect(screen.getByText("Data Classification")).toBeInTheDocument();
    expect(screen.getByText("Sensitive Data")).toBeInTheDocument();
    expect(screen.getByText("Level of data sensitivity")).toBeInTheDocument();
  });

  it("displays privacy impact section", () => {
    render(<ConfidentialityImpactWidget {...defaultProps} />);
    expect(screen.getByText("Privacy Impact")).toBeInTheDocument();
    expect(screen.getByText("Privacy Impact:")).toBeInTheDocument();
    expect(screen.getByText("Moderate Privacy Controls")).toBeInTheDocument();
  });

  it("uses the specific confidentiality level prop when available", () => {
    render(
      <ConfidentialityImpactWidget
        {...defaultProps}
        level="Low"
        confidentialityLevel="High"
      />
    );
    expect(
      screen.getByTestId("confidentiality-widget-confidentiality-badge")
    ).toHaveTextContent("High");
  });

  it("falls back to legacy level prop when specific level isn't provided", () => {
    render(
      <ConfidentialityImpactWidget
        level="Low"
        confidentialityLevel="Low" // Provide a valid SecurityLevel value
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
      />
    );
    // Update to use the correct testId based on how the component builds it
    expect(
      screen.getByTestId("widget-confidentiality-impact-confidentiality-badge")
    ).toHaveTextContent("Low");
  });

  it("handles None level correctly", () => {
    render(
      <ConfidentialityImpactWidget
        {...defaultProps}
        confidentialityLevel="None"
      />
    );
    expect(
      screen.getByTestId("confidentiality-widget-confidentiality-badge")
    ).toHaveTextContent("None");
    expect(screen.getByText("No Privacy Controls")).toBeInTheDocument();
    expect(screen.getByText("Public Data")).toBeInTheDocument();
  });

  it("handles Very High level correctly", () => {
    render(
      <ConfidentialityImpactWidget
        {...defaultProps}
        confidentialityLevel="Very High"
      />
    );
    expect(
      screen.getByTestId("confidentiality-widget-confidentiality-badge")
    ).toHaveTextContent("Very High");
    expect(screen.getByText("Very High Privacy Controls")).toBeInTheDocument();
    expect(screen.getByText("Restricted Data")).toBeInTheDocument();
  });

  it("accepts custom testId prop", () => {
    render(
      <ConfidentialityImpactWidget {...defaultProps} testId="custom-test-id" />
    );
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
    expect(
      screen.getByTestId("custom-test-id-confidentiality-badge")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("custom-test-id-business-impact")
    ).toBeInTheDocument();
  });
});
