import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";

// Mock the useCIAContentService hook with correct path
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getComponentDetails: vi.fn().mockImplementation((component, level) => ({
        description: `${component} ${level} description`,
        technical: `${component} ${level} technical details`,
        businessImpact: `${component} ${level} business impact`,
      })),
      getTechnicalRequirements: vi
        .fn()
        .mockImplementation(() => [
          "Implement role-based access control",
          "Use standard TLS for data in transit",
        ]),
    },
    error: null,
    isLoading: false,
  }),
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

describe("TechnicalDetailsWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "technical-details-widget",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    expect(screen.getByTestId("technical-details-widget")).toBeInTheDocument();
  });

  it("displays technical implementation details", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // By default, confidentiality tab should be active
    expect(screen.getByTestId("widget-technical-details-label-description")).toHaveTextContent(
      /confidentiality Moderate technical details/i
    );
  });

  it("displays implementation steps", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // Check implementation requirements
    expect(screen.getByTestId("widget-technical-details-list-implementation-steps")).toBeInTheDocument();
    expect(
      screen.getByText(/Implement role-based access control/i)
    ).toBeInTheDocument();
  });

  it("displays technical details for the selected component", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // By default, should show confidentiality content
    expect(screen.getByTestId("confidentiality-section")).toBeInTheDocument();

    // Click on integrity tab
    await act(async () => {
      fireEvent.click(screen.getByTestId("integrity-tab"));
    });

    // Should now show integrity content
    expect(screen.getByTestId("integrity-section")).toBeInTheDocument();
    expect(screen.getByTestId("widget-technical-details-label-description")).toHaveTextContent(
      /integrity Moderate technical details/i
    );
  });

  it("switches between tabs", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // Click on integrity tab
    await act(async () => {
      fireEvent.click(screen.getByTestId("integrity-tab"));
    });

    // Should now show integrity content
    expect(screen.getByTestId("integrity-section")).toBeInTheDocument();
    expect(screen.getByTestId("widget-technical-details-label-description")).toHaveTextContent(
      /integrity Moderate technical details/i
    );

    // Click on availability tab
    await act(async () => {
      fireEvent.click(screen.getByTestId("availability-tab"));
    });

    // Should now show availability content
    expect(screen.getByTestId("availability-section")).toBeInTheDocument();
    expect(screen.getByTestId("widget-technical-details-label-description")).toHaveTextContent(
      /availability Moderate technical details/i
    );
  });

  it("shows implementation details for each level", async () => {
    await act(async () => {
      render(
        <TechnicalDetailsWidget
          availabilityLevel="Low"
          integrityLevel="Moderate"
          confidentialityLevel="High"
          testId="widget-technical-details"
        />
      );
    });

    // Test that headers exist (implementation details are rendered)
    expect(screen.getAllByTestId("widget-technical-details-header")[0]).toBeInTheDocument();
  });

  it("handles different security levels", async () => {
    const { rerender } = render(
      <TechnicalDetailsWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        testId="widget-technical-details"
      />
    );

    // By default shows None level for confidentiality
    expect(screen.getByTestId("widget-technical-details-label-description")).toHaveTextContent(
      /confidentiality None technical details/i
    );

    // Rerender with different security levels
    await act(async () => {
      rerender(
        <TechnicalDetailsWidget
          availabilityLevel="Very High"
          integrityLevel="Very High"
          confidentialityLevel="Very High"
          testId="widget-technical-details"
        />
      );
    });

    // Should still show confidentiality but with Very High level
    expect(screen.getByTestId("widget-technical-details-label-description")).toHaveTextContent(
      /confidentiality Very High technical details/i
    );

    // Switch to integrity tab to see Very High level there
    await act(async () => {
      fireEvent.click(screen.getByTestId("integrity-tab"));
    });

    expect(screen.getByTestId("widget-technical-details-label-description")).toHaveTextContent(
      /integrity Very High technical details/i
    );
  });

  it("displays implementation steps when available", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // The component should show the technical implementation
    expect(screen.getAllByTestId("widget-technical-details-header")[0]).toBeInTheDocument();
    expect(screen.getByTestId("widget-technical-details-label-description")).toBeInTheDocument();
    expect(screen.getAllByTestId("widget-technical-details-header")[0]).toBeInTheDocument();
    expect(screen.getByTestId("widget-technical-details-list-implementation-steps")).toBeInTheDocument();
  });

  it("applies custom testId", async () => {
    const customTestId = "custom-technical-details";
    await act(async () => {
      render(
        <TechnicalDetailsWidget {...defaultProps} testId={customTestId} />
      );
    });

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });
});
