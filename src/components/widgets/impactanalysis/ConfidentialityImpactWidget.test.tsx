import { act, render, screen } from "@testing-library/react";
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
          businessImpact: `${level} ${component} business impact`,
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
          riskLevel: level === "None" ? "High Risk" : "Medium Risk",
        },
        regulatory: {
          description: `${level} regulatory impact`,
          riskLevel: level === "None" ? "High Risk" : "Low Risk",
        },
      }),
      getTechnicalImplementation: (
        component: CIAComponentType,
        level: SecurityLevel
      ) => ({
        description: `${level} technical implementation`,
        implementationSteps: [
          `Step 1 for ${component} at ${level} level`,
          `Step 2 for ${component} at ${level} level`,
          `Step 3 for ${component} at ${level} level`,
          `Step 4 for ${component} at ${level} level`,
        ],
        effort: {
          development: "Medium",
          maintenance: "Ongoing",
          expertise: "Advanced",
        },
        protectionMethod:
          level !== "None" ? `${level} protection method` : undefined,
      }),
      getRecommendations: (
        component: CIAComponentType,
        level: SecurityLevel
      ) => [
        `${level} recommendation 1`,
        `${level} recommendation 2`,
        `${level} recommendation 3`,
        `${level} recommendation 4`,
      ],
      getInformationSensitivity: (level: SecurityLevel) => {
        switch (level) {
          case "None":
            return "Public Data";
          case "Low":
            return "Internal Use";
          case "Moderate":
            return "Confidential";
          case "High":
            return "Restricted";
          case "Very High":
            return "Top Secret";
          default:
            return "Unknown";
        }
      },
      getProtectionLevel: (level: SecurityLevel) => {
        switch (level) {
          case "None":
            return "No Protection";
          case "Low":
            return "Basic Protection";
          case "Moderate":
            return "Standard Protection";
          case "High":
            return "Enhanced Protection";
          case "Very High":
            return "Maximum Protection";
          default:
            return "Unknown protection";
        }
      },
      getSecurityLevel: () => "High",
      getRiskBadgeVariant: () => "success",
      calculateBusinessImpactLevel: () => "Medium",
      getSecurityIcon: () => "🔒",
      getCategoryIcon: () => "🔒",
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
    size,
  }: {
    children: React.ReactNode;
    status: string;
    size?: string;
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
      <h3>Business Impact</h3>
      <p>{impact?.summary}</p>
    </div>
  ),
}));

// Add missing mock for WidgetContainer
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
    confidentialityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    availabilityLevel: "Moderate" as SecurityLevel,
    testId: "confidentiality-impact-widget",
  };

  it("renders without crashing", async () => {
    await act(async () => {
      render(<ConfidentialityImpactWidget {...defaultProps} />);
    });

    expect(
      screen.getByTestId("confidentiality-impact-widget")
    ).toBeInTheDocument();
  });

  it("displays confidentiality description", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          confidentialityLevel="High"
        />
      );
    });

    expect(
      screen.getByTestId("confidentiality-impact-widget")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/High confidentiality description/i)
    ).toBeInTheDocument();
  });

  it("displays protection method when available", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          confidentialityLevel="High"
        />
      );
    });

    expect(
      screen.getByTestId("confidentiality-impact-widget")
    ).toBeInTheDocument();

    expect(screen.getByText(/High protection method/i)).toBeInTheDocument();
  });

  it("doesn't display protection method when not available", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          confidentialityLevel="None"
        />
      );
    });

    // Should still render without crashing
    expect(
      screen.getByTestId("confidentiality-impact-widget")
    ).toBeInTheDocument();

    // Protection method shouldn't be visible for "None" level
    expect(
      screen.queryByText(/None protection method/i)
    ).not.toBeInTheDocument();
  });

  it("shows business impact information", async () => {
    await act(async () => {
      render(<ConfidentialityImpactWidget {...defaultProps} />);
    });

    // Check for business impact section
    expect(screen.getByTestId("business-impact-section")).toBeInTheDocument();
    expect(
      screen.getByText(/Moderate confidentiality business impact summary/i)
    ).toBeInTheDocument();
  });

  it("displays technical implementation details", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          confidentialityLevel="High"
        />
      );
    });

    expect(
      screen.getByTestId("confidentiality-impact-widget")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/High technical implementation/i)
    ).toBeInTheDocument();
  });

  it("displays data protection classification", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          confidentialityLevel="Very High"
        />
      );
    });

    expect(
      screen.getByTestId("confidentiality-impact-widget")
    ).toBeInTheDocument();

    expect(screen.getByText(/Top Secret/i)).toBeInTheDocument();
  });

  it("shows recommendations", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          confidentialityLevel="High"
        />
      );
    });

    // Find recommendations section
    expect(
      screen.getByText(/recommendations/i, { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByText(/High recommendation 1/i)).toBeInTheDocument();
  });

  it("handles error state when details not available", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          confidentialityLevel={"Unknown" as SecurityLevel}
        />
      );
    });

    // Should render without crashing
    expect(
      screen.getByTestId("confidentiality-impact-widget")
    ).toBeInTheDocument();
  });

  it("accepts custom testId prop", async () => {
    await act(async () => {
      render(
        <ConfidentialityImpactWidget
          {...defaultProps}
          testId="custom-test-id"
        />
      );
    });

    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });
});
