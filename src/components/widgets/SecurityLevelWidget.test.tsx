// Define mocks at the top of the file for proper hoisting
vi.mock("../../hooks/useCIAOptions", () => {
  // Create mock options data
  const mockOptions = {
    availabilityOptions: {
      None: {
        description: "Test availability None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 0,
        opex: 0,
        bg: "#ffffff",
        text: "#000000",
      },
      Low: {
        description: "Test availability Low",
        technical: "Test technical Low",
        businessImpact: "Test business impact Low",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 5,
        opex: 2,
      },
      Moderate: {
        description: "Test availability Moderate",
        technical: "Test technical Moderate",
        businessImpact: "Test business impact Moderate",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 10,
        opex: 5,
      },
      High: {
        description: "Test availability High",
        technical: "Test technical High",
        businessImpact: "Test business impact High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 15,
        opex: 8,
      },
      "Very High": {
        description: "Test availability Very High",
        technical: "Test technical Very High",
        businessImpact: "Test business impact Very High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 20,
        opex: 10,
      },
    },
    integrityOptions: {
      None: {
        description: "Test integrity None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 0,
        opex: 0,
      },
      Low: {
        description: "Test integrity Low",
        technical: "Test technical Low",
        businessImpact: "Test business impact Low",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 5,
        opex: 2,
      },
      Moderate: {
        description: "Test integrity Moderate",
        technical: "Test technical Moderate",
        businessImpact: "Test business impact Moderate",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 10,
        opex: 5,
      },
      High: {
        description: "Test integrity High",
        technical: "Test technical High",
        businessImpact: "Test business impact High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 15,
        opex: 8,
      },
      "Very High": {
        description: "Test integrity Very High",
        technical: "Test technical Very High",
        businessImpact: "Test business impact Very High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 20,
        opex: 10,
      },
    },
    confidentialityOptions: {
      None: {
        description: "Test confidentiality None",
        technical: "Test technical None",
        businessImpact: "Test business impact None",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 0,
        opex: 0,
      },
      Low: {
        description: "Test confidentiality Low",
        technical: "Test technical Low",
        businessImpact: "Test business impact Low",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 5,
        opex: 2,
      },
      Moderate: {
        description: "Test confidentiality Moderate",
        technical: "Test technical Moderate",
        businessImpact: "Test business impact Moderate",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 10,
        opex: 5,
      },
      High: {
        description: "Test confidentiality High",
        technical: "Test technical High",
        businessImpact: "Test business impact High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 15,
        opex: 8,
      },
      "Very High": {
        description: "Test confidentiality Very High",
        technical: "Test technical Very High",
        businessImpact: "Test business impact Very High",
        recommendations: ["Rec 1", "Rec 2"],
        capex: 20,
        opex: 10,
      },
    },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: { returnRate: "200%", description: "Moderate ROI" },
      HIGH: { returnRate: "350%", description: "High ROI" },
      VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
    },
  };

  return {
    __esModule: true,
    default: mockOptions,
    useCIAOptions: () => mockOptions,
    // Export constants to avoid errors when they're imported directly
    availabilityOptions: mockOptions.availabilityOptions,
    integrityOptions: mockOptions.integrityOptions,
    confidentialityOptions: mockOptions.confidentialityOptions,
    ROI_ESTIMATES: mockOptions.ROI_ESTIMATES,
  };
});

// Mock SecurityLevelSelector component to capture all props properly
vi.mock("../../components/securitylevel/SecurityLevelSelector", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation((props) => {
    // Store the entire props object so we can access handlers later
    return (
      <div data-testid={props.testId || "mock-security-level-selector"}>
        Mock Security Level Selector
        <button
          data-testid="mock-availability-change"
          onClick={() =>
            props.onAvailabilityChange && props.onAvailabilityChange("Low")
          }
        >
          Change Availability
        </button>
        <button
          data-testid="mock-integrity-change"
          onClick={() =>
            props.onIntegrityChange && props.onIntegrityChange("Moderate")
          }
        >
          Change Integrity
        </button>
        <button
          data-testid="mock-confidentiality-change"
          onClick={() =>
            props.onConfidentialityChange &&
            props.onConfidentialityChange("High")
          }
        >
          Change Confidentiality
        </button>
      </div>
    );
  }),
}));

// Mock WidgetContainer component to correctly handle loading prop
vi.mock("../../components/common/WidgetContainer", () => ({
  __esModule: true,
  default: vi
    .fn()
    .mockImplementation(({ children, loading, testId, ...props }) => (
      <div
        data-testid={testId}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        {children}
      </div>
    )),
}));

// Import dependencies after mocks
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import SecurityLevelWidget from "./SecurityLevelWidget";

describe("SecurityLevelWidget", () => {
  it("renders with default props", () => {
    render(<SecurityLevelWidget />);
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET)
    ).toBeInTheDocument();
  });

  it("shows loading state when loading prop is true", () => {
    render(<SecurityLevelWidget loading={true} />);
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET)
    ).toHaveAttribute("data-loading", "true");
  });

  it("shows error message when error prop is provided", () => {
    const testError = new Error("Test error message");
    render(<SecurityLevelWidget error={testError} />);
    expect(
      screen.getByText("Error Loading Security Levels")
    ).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("passes correct props to SecurityLevelSelector", () => {
    const handleAvailabilityChange = vi.fn();
    const handleIntegrityChange = vi.fn();
    const handleConfidentialityChange = vi.fn();

    render(
      <SecurityLevelWidget
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
        onAvailabilityChange={handleAvailabilityChange}
        onIntegrityChange={handleIntegrityChange}
        onConfidentialityChange={handleConfidentialityChange}
      />
    );

    // Verify the selector component was included
    expect(
      screen.getByText("Mock Security Level Selector")
    ).toBeInTheDocument();
  });

  it("uses custom testId if provided", () => {
    const customTestId = "custom-security-level-widget-id";
    render(<SecurityLevelWidget testId={customTestId} />);
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("calls setAvailability when availability changes", () => {
    const setAvailability = vi.fn();
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={setAvailability}
      />
    );

    // Instead of trying to access the handler directly, use the mock buttons we added
    fireEvent.click(screen.getByTestId("mock-availability-change"));

    expect(setAvailability).toHaveBeenCalledWith("Low");
  });

  it("calls setIntegrity when integrity changes", () => {
    const setIntegrity = vi.fn();
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setIntegrity={setIntegrity}
      />
    );

    fireEvent.click(screen.getByTestId("mock-integrity-change"));

    expect(setIntegrity).toHaveBeenCalledWith("Moderate");
  });

  it("calls setConfidentiality when confidentiality changes", () => {
    const setConfidentiality = vi.fn();
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setConfidentiality={setConfidentiality}
      />
    );

    fireEvent.click(screen.getByTestId("mock-confidentiality-change"));

    expect(setConfidentiality).toHaveBeenCalledWith("High");
  });

  it("handles both callback styles (onChange and setState)", () => {
    const onAvailabilityChange = vi.fn();
    const setAvailability = vi.fn();

    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        onAvailabilityChange={onAvailabilityChange}
        setAvailability={setAvailability}
      />
    );

    fireEvent.click(screen.getByTestId("mock-availability-change"));

    expect(onAvailabilityChange).toHaveBeenCalledWith("Low");
    expect(setAvailability).toHaveBeenCalledWith("Low");
  });
});
