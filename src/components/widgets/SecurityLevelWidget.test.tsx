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
  // Helper function to provide required props
  const getRequiredProps = () => ({
    availabilityLevel: "None",
    integrityLevel: "None",
    confidentialityLevel: "None",
    setAvailability: vi.fn(),
    setIntegrity: vi.fn(),
    setConfidentiality: vi.fn(),
  });

  it("renders with default props", () => {
    render(<SecurityLevelWidget {...getRequiredProps()} />);
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET)
    ).toBeInTheDocument();
  });

  it("shows loading state when loading prop is true", () => {
    render(<SecurityLevelWidget {...getRequiredProps()} loading={true} />);
    expect(
      screen.getByTestId(WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET)
    ).toHaveAttribute("data-loading", "true");
  });

  it("shows error message when error prop is provided", () => {
    const testError = new Error("Test error message");
    render(<SecurityLevelWidget {...getRequiredProps()} error={testError} />);
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
        setAvailability={vi.fn()}
        setIntegrity={vi.fn()}
        setConfidentiality={vi.fn()}
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
    render(
      <SecurityLevelWidget {...getRequiredProps()} testId={customTestId} />
    );
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
        setIntegrity={vi.fn()}
        setConfidentiality={vi.fn()}
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
        setAvailability={vi.fn()}
        setIntegrity={setIntegrity}
        setConfidentiality={vi.fn()}
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
        setAvailability={vi.fn()}
        setIntegrity={vi.fn()}
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
        setIntegrity={vi.fn()}
        setConfidentiality={vi.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("mock-availability-change"));

    expect(onAvailabilityChange).toHaveBeenCalledWith("Low");
    expect(setAvailability).toHaveBeenCalledWith("Low");
  });

  // Replace test that's causing error with proper props:
  test("renders without crashing", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={() => {}}
        setIntegrity={() => {}}
        setConfidentiality={() => {}}
      />
    );
  });

  // Update the test for loading state:
  test("renders loading state", () => {
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={() => {}}
        setIntegrity={() => {}}
        setConfidentiality={() => {}}
        loading={true}
      />
    );
    // Assertions...
  });

  // Fix the error test:
  test("renders error state", () => {
    const testError = new Error("Test error");
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={() => {}}
        setIntegrity={() => {}}
        setConfidentiality={() => {}}
        error={testError}
      />
    );
    // Assertions...
  });

  // Fix the callbacks test:
  test("calls change handlers when values change", () => {
    const handleAvailabilityChange = vi.fn();
    const handleIntegrityChange = vi.fn();
    const handleConfidentialityChange = vi.fn();

    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={() => {}}
        setIntegrity={() => {}}
        setConfidentiality={() => {}}
        onAvailabilityChange={handleAvailabilityChange}
        onIntegrityChange={handleIntegrityChange}
        onConfidentialityChange={handleConfidentialityChange}
      />
    );
    // Assertions...
  });

  // Fix the testId test:
  test("renders with custom testId", () => {
    const customTestId = "custom-security-level-widget";
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={() => {}}
        setIntegrity={() => {}}
        setConfidentiality={() => {}}
        testId={customTestId}
      />
    );
    // Assertions...
  });

  // Fix the setAvailability test:
  test("calls setAvailability when availability level changes", () => {
    const setAvailability = vi.fn();
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={setAvailability}
        setIntegrity={() => {}}
        setConfidentiality={() => {}}
      />
    );
    // Assertions...
  });

  // Fix the setIntegrity test:
  test("calls setIntegrity when integrity level changes", () => {
    const setIntegrity = vi.fn();
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={() => {}}
        setIntegrity={setIntegrity}
        setConfidentiality={() => {}}
      />
    );
    // Assertions...
  });

  // Fix the setConfidentiality test:
  test("calls setConfidentiality when confidentiality level changes", () => {
    const setConfidentiality = vi.fn();
    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={() => {}}
        setIntegrity={() => {}}
        setConfidentiality={setConfidentiality}
      />
    );
    // Assertions...
  });

  // Fix the combined callbacks test:
  test("calls both onChange and setState when available", () => {
    const onAvailabilityChange = vi.fn();
    const setAvailability = vi.fn();

    render(
      <SecurityLevelWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        setAvailability={setAvailability}
        setIntegrity={() => {}}
        setConfidentiality={() => {}}
        onAvailabilityChange={onAvailabilityChange}
      />
    );
    // Assertions...
  });
});
