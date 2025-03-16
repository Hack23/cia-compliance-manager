// Define mocks at the top of the file for proper hoisting
vi.mock("../../components/common/SecurityLevelSelector", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation((props) => (
    <div data-testid={props.testId || "mock-security-level-selector"}>
      <div>Mock Security Level Selector</div>
      <div>
        {props.label}: {props.value}
      </div>
      <button
        data-testid={`mock-change-${props.label
          ?.toLowerCase()
          .replace(/\s/g, "-")}`}
        onClick={() =>
          props.onChange &&
          props.onChange(
            props.label?.includes("Confidentiality")
              ? "High"
              : props.label?.includes("Integrity")
              ? "Moderate"
              : "Low"
          )
        }
      >
        Change {props.label}
      </button>
    </div>
  )),
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
import { SECURITY_LEVEL_TEST_IDS } from "../../constants/testIds";
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
    // Fix: Use SECURITY_LEVEL_TEST_IDS instead of WIDGET_TEST_IDS and
    // use the actual testId used by the component
    expect(
      screen.getByTestId(SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_WIDGET)
    ).toBeInTheDocument();
  });

  it("shows loading state when loading prop is true", () => {
    render(<SecurityLevelWidget {...getRequiredProps()} loading={true} />);
    // Fix: Use SECURITY_LEVEL_TEST_IDS instead of WIDGET_TEST_IDS
    expect(
      screen.getByTestId(SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_WIDGET)
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

    // Use the new testId that matches our mock implementation
    fireEvent.click(screen.getByTestId("mock-change-availability-level"));
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

    fireEvent.click(screen.getByTestId("mock-change-integrity-level"));
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

    fireEvent.click(screen.getByTestId("mock-change-confidentiality-level"));
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

    fireEvent.click(screen.getByTestId("mock-change-availability-level"));

    expect(onAvailabilityChange).toHaveBeenCalledWith("Low");
    expect(setAvailability).toHaveBeenCalledWith("Low");
  });

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
    expect(screen.getByText(/Current Security Profile/i)).toBeInTheDocument();
  });
});
