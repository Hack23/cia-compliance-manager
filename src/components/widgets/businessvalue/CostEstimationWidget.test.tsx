import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { COST_TEST_IDS } from "../../../constants/testIds";
import { CIAContentServiceProvider } from "../../../contexts/CIAContentServiceContext";
import { getCIAContentServiceMock } from "../../../mocks/ciaContentServiceMock";
import { SecurityLevel } from "../../../types/cia";
import CostEstimationWidget from "./CostEstimationWidget";

// Mock the useCIAOptions hook
vi.mock("../../../hooks/useCIAOptions", () => ({
  useCIAOptions: () => ({
    availabilityOptions: {
      None: { description: "None level", capex: 0, opex: 0 },
      Low: { description: "Low level", capex: 5, opex: 2 },
      Moderate: { description: "Moderate level", capex: 10, opex: 5 },
      High: { description: "High level", capex: 15, opex: 8 },
      "Very High": { description: "Very High level", capex: 20, opex: 10 },
    },
    integrityOptions: {
      None: { description: "None level", capex: 0, opex: 0 },
      Low: { description: "Low level", capex: 5, opex: 2 },
      Moderate: { description: "Moderate level", capex: 10, opex: 5 },
      High: { description: "High level", capex: 15, opex: 8 },
      "Very High": { description: "Very High level", capex: 20, opex: 10 },
    },
    confidentialityOptions: {
      None: { description: "None level", capex: 0, opex: 0 },
      Low: { description: "Low level", capex: 5, opex: 2 },
      Moderate: { description: "Moderate level", capex: 10, opex: 5 },
      High: { description: "High level", capex: 15, opex: 8 },
      "Very High": { description: "Very High level", capex: 20, opex: 10 },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No return" },
      LOW: { returnRate: "50%", description: "Low return" },
      MODERATE: { returnRate: "150%", description: "Moderate return" },
      HIGH: { returnRate: "300%", description: "High return" },
      VERY_HIGH: { returnRate: "500%", description: "Very high return" },
    },
  }),
}));

describe("CostEstimationWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    className: "custom-class",
    testId: "custom-test-id",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Cost Estimation")).toBeInTheDocument();
  });

  it("displays implementation time correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByText("Estimated Implementation Time")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.IMPLEMENTATION_TIME)
    ).toBeInTheDocument();
  });

  it("calculates CAPEX costs correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(
      screen.getByText("Implementation Costs (CAPEX)")
    ).toBeInTheDocument();
    // Since each component at Moderate level has a capex of 10, the total should be 30
    const capexSection = screen.getByTestId(COST_TEST_IDS.CAPEX_SECTION);
    expect(capexSection).toBeInTheDocument();

    // Check capex value and percentage
    const percentageDisplay = screen.getByTestId(
      COST_TEST_IDS.CAPEX_PERCENTAGE
    );
    // 30/60 * 100 = 50%
    expect(percentageDisplay.textContent).toBe("50%");
  });

  it("calculates OPEX costs correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Ongoing Maintenance (OPEX)")).toBeInTheDocument();
    // Since each component at Moderate level has an opex of 5, the total should be 15
    const opexSection = screen.getByTestId(COST_TEST_IDS.OPEX_SECTION);
    expect(opexSection).toBeInTheDocument();

    // Check opex percentage
    const percentageDisplay = screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE);
    // 15/30 * 100 = 50%
    expect(percentageDisplay.textContent).toBe("50%");
  });

  it("displays total cost information", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Total Cost of Ownership")).toBeInTheDocument();
    expect(
      screen.getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL)
    ).toBeInTheDocument();
    // Total cost should be CAPEX + (OPEX * 36 months)
    // 30 + (15 * 36) = 30 + 540 = 570
  });

  it("displays ROI information", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    expect(screen.getByText("Return on Investment")).toBeInTheDocument();
    expect(screen.getByTestId(COST_TEST_IDS.ROI_ESTIMATE)).toHaveTextContent(
      "150%"
    );
  });

  it("handles different security levels", () => {
    // Test with Low security levels
    render(
      <CostEstimationWidget
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );

    // With Low security levels, capex should be 15 (5 per component)
    // and opex should be 6 (2 per component)
    expect(screen.getByTestId(COST_TEST_IDS.CAPEX_PERCENTAGE).textContent).toBe(
      "25%"
    ); // 15/60 * 100
    expect(screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE).textContent).toBe(
      "20%"
    ); // 6/30 * 100
    expect(screen.getByTestId(COST_TEST_IDS.ROI_ESTIMATE)).toHaveTextContent(
      "50%"
    );

    // Clean up
    screen.unmount();

    // Test with High security levels
    render(
      <CostEstimationWidget
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // With High security levels, capex should be 45 (15 per component)
    // and opex should be 24 (8 per component)
    expect(screen.getByTestId(COST_TEST_IDS.CAPEX_PERCENTAGE).textContent).toBe(
      "75%"
    ); // 45/60 * 100
    expect(screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE).textContent).toBe(
      "80%"
    ); // 24/30 * 100
    expect(screen.getByTestId(COST_TEST_IDS.ROI_ESTIMATE)).toHaveTextContent(
      "300%"
    );
  });

  it("handles mixed security levels", () => {
    render(
      <CostEstimationWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );

    // With Mixed security levels: High (15), Moderate (10), Low (5) = 30 for capex
    // and High (8), Moderate (5), Low (2) = 15 for opex
    expect(screen.getByTestId(COST_TEST_IDS.CAPEX_PERCENTAGE).textContent).toBe(
      "50%"
    ); // 30/60 * 100
    expect(screen.getByTestId(COST_TEST_IDS.OPEX_PERCENTAGE).textContent).toBe(
      "50%"
    ); // 15/30 * 100
  });

  it("formats currency values correctly", () => {
    render(<CostEstimationWidget {...defaultProps} />);

    // Check for currency formatting in various places
    const capexValue = screen.getByTestId(COST_TEST_IDS.CAPEX_ESTIMATE_VALUE);
    expect(capexValue.textContent).toMatch(/\$[0-9,]+/); // Should match currency format

    const opexValue = screen.getByTestId(COST_TEST_IDS.OPEX_ESTIMATE_VALUE);
    expect(opexValue.textContent).toMatch(/\$[0-9,]+/); // Should match currency format

    const totalCost = screen.getByTestId(COST_TEST_IDS.THREE_YEAR_TOTAL);
    expect(totalCost.textContent).toMatch(/\$[0-9,]+/); // Should match currency format
  });

  it("renders with custom props", () => {
    render(<CostEstimationWidget {...defaultProps} />);
    const widget = screen.getByTestId("custom-test-id");
    expect(widget).toHaveClass("custom-class");
  });

  it("renders with default props", () => {
    render(
      <CostEstimationWidget
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(screen.getByTestId("widget-cost-estimation")).toBeInTheDocument();
  });

  // Mock service with implementation for cost methods
  const mockService = {
    ...getCIAContentServiceMock(),
    calculateImplementationCost: vi.fn().mockReturnValue({
      total: 75000,
      personnel: "1.5 FTE",
      factors: [
        {
          name: "Technology & Infrastructure",
          description:
            "Hardware, software licenses, cloud services, and specialized tools.",
        },
        {
          name: "Personnel & Training",
          description:
            "Staff time for implementation, operation, and ongoing training.",
        },
      ],
    }),
    calculateOperationalCost: vi.fn().mockReturnValue({
      annual: 30000,
    }),
    getComponentCost: vi.fn().mockReturnValue({
      implementation: "$25,000",
      operational: "$10,000 / year",
      personnel: "0.5 FTE",
    }),
    getImplementationTimeline: vi.fn().mockReturnValue({
      total: "12 weeks",
      phases: [
        { name: "Planning", duration: "3 weeks" },
        { name: "Implementation", duration: "6 weeks" },
        { name: "Testing & Adoption", duration: "3 weeks" },
      ],
    }),
  };

  const renderWidget = (props = {}) => {
    const defaultProps = {
      availabilityLevel: "Moderate" as SecurityLevel,
      integrityLevel: "Moderate" as SecurityLevel,
      confidentialityLevel: "Moderate" as SecurityLevel,
      testId: "cost-estimation-widget",
    };

    return render(
      <CIAContentServiceProvider value={mockService}>
        <CostEstimationWidget {...defaultProps} {...props} />
      </CIAContentServiceProvider>
    );
  };

  it("renders the widget with title", () => {
    renderWidget();
    expect(screen.getByText("Security Cost Estimation")).toBeInTheDocument();
  });

  it("displays implementation cost from service", () => {
    renderWidget();
    expect(screen.getByTestId("implementation-cost")).toBeInTheDocument();
    expect(screen.getByTestId("implementation-cost")).toHaveTextContent(
      "$75,000"
    );
  });

  it("displays operational cost from service", () => {
    renderWidget();
    expect(screen.getByTestId("operational-cost")).toBeInTheDocument();
    expect(screen.getByTestId("operational-cost")).toHaveTextContent("$30,000");
  });

  it("displays personnel needs from service", () => {
    renderWidget();
    expect(screen.getByTestId("personnel-cost")).toBeInTheDocument();
    expect(screen.getByTestId("personnel-cost")).toHaveTextContent("1.5 FTE");
  });

  it("displays component breakdowns", () => {
    renderWidget();
    expect(screen.getByTestId("availability-cost")).toBeInTheDocument();
    expect(screen.getByTestId("integrity-cost")).toBeInTheDocument();
    expect(screen.getByTestId("confidentiality-cost")).toBeInTheDocument();
  });

  it("displays implementation timeline", () => {
    renderWidget();
    expect(screen.getByTestId("implementation-timeline")).toBeInTheDocument();
    expect(screen.getByTestId("implementation-timeline")).toHaveTextContent(
      "12 weeks"
    );
  });

  it("handles different security levels properly", () => {
    renderWidget({
      availabilityLevel: "High" as SecurityLevel,
      integrityLevel: "High" as SecurityLevel,
      confidentialityLevel: "High" as SecurityLevel,
    });

    // Service methods should have been called with the new security levels
    expect(mockService.calculateImplementationCost).toHaveBeenCalledWith(
      "High",
      "High",
      "High"
    );
    expect(mockService.calculateOperationalCost).toHaveBeenCalledWith(
      "High",
      "High",
      "High"
    );
  });

  it("handles service errors gracefully", () => {
    // Mock implementation that throws errors
    const errorMockService = {
      ...getCIAContentServiceMock(),
      calculateImplementationCost: vi.fn().mockImplementation(() => {
        throw new Error("Service error");
      }),
      calculateOperationalCost: vi.fn().mockImplementation(() => {
        throw new Error("Service error");
      }),
    };

    render(
      <CIAContentServiceProvider value={errorMockService}>
        <CostEstimationWidget
          availabilityLevel="Moderate"
          integrityLevel="Moderate"
          confidentialityLevel="Moderate"
        />
      </CIAContentServiceProvider>
    );

    // Should still render the widget without crashing
    expect(screen.getByText("Security Cost Estimation")).toBeInTheDocument();

    // Should fallback to calculated values based on security levels
    const values = screen.getAllByText(/\$\d+,\d+/);
    expect(values.length).toBeGreaterThan(0);
  });
});
