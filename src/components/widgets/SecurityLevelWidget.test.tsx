import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SECURITY_LEVEL_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import SecurityLevelWidget from "./SecurityLevelWidget";

// Mock the enhanced security level selector directly
vi.mock("../securitylevel/SecurityLevelSelector", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation((props) => (
    <div data-testid={props.testId || "mock-security-level-selector"}>
      <div>Enhanced Security Level Selector</div>
      <button
        data-testid="mock-change-availability-level"
        onClick={() => props.onAvailabilityChange?.("Low")}
      >
        Change Availability
      </button>
      <button
        data-testid="mock-change-integrity-level"
        onClick={() => props.onIntegrityChange?.("Moderate")}
      >
        Change Integrity
      </button>
      <button
        data-testid="mock-change-confidentiality-level"
        onClick={() => props.onConfidentialityChange?.("High")}
      >
        Change Confidentiality
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

// Update the getRequiredProps function to include all required props
function getRequiredProps() {
  return {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
    setAvailability: vi.fn(),
    setIntegrity: vi.fn(),
    setConfidentiality: vi.fn(),
    onAvailabilityChange: vi.fn(),
    onIntegrityChange: vi.fn(),
    onConfidentialityChange: vi.fn(),
  };
}

describe("SecurityLevelWidget", () => {
  it("renders with default props", () => {
    render(<SecurityLevelWidget {...getRequiredProps()} />);
    expect(
      screen.getByTestId(SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_WIDGET)
    ).toBeInTheDocument();
  });

  it("renders properly", () => {
    render(
      <SecurityLevelWidget
        {...getRequiredProps()}
      />
    );
    // Verify the enhanced selector renders
    expect(screen.getByText("Enhanced Security Level Selector")).toBeInTheDocument();
  });

  it("uses custom testId if provided", () => {
    const customTestId = "custom-security-level-widget-id";
    render(
      <SecurityLevelWidget {...getRequiredProps()} testId={customTestId} />
    );
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("handles availability level change", () => {
    const onAvailabilityChange = vi.fn();
    const setAvailability = vi.fn();
    render(
      <SecurityLevelWidget
        {...getRequiredProps()}
        onAvailabilityChange={onAvailabilityChange}
        setAvailability={setAvailability}
      />
    );

    // Test assertions
    fireEvent.click(screen.getByTestId("mock-change-availability-level"));
    expect(onAvailabilityChange).toHaveBeenCalledWith("Low");
    expect(setAvailability).toHaveBeenCalledWith("Low");
  });

  it("calls onIntegrityChange when integrity changes", () => {
    const onIntegrityChange = vi.fn();
    const setIntegrity = vi.fn();
    render(
      <SecurityLevelWidget
        {...getRequiredProps()}
        onIntegrityChange={onIntegrityChange}
        setIntegrity={setIntegrity}
      />
    );

    fireEvent.click(screen.getByTestId("mock-change-integrity-level"));
    expect(onIntegrityChange).toHaveBeenCalledWith("Moderate");
    expect(setIntegrity).toHaveBeenCalledWith("Moderate");
  });

  it("calls onConfidentialityChange when confidentiality changes", () => {
    const onConfidentialityChange = vi.fn();
    const setConfidentiality = vi.fn();
    render(
      <SecurityLevelWidget
        {...getRequiredProps()}
        onConfidentialityChange={onConfidentialityChange}
        setConfidentiality={setConfidentiality}
      />
    );

    fireEvent.click(screen.getByTestId("mock-change-confidentiality-level"));
    expect(onConfidentialityChange).toHaveBeenCalledWith("High");
    expect(setConfidentiality).toHaveBeenCalledWith("High");
  });

  it("renders loading state correctly", () => {
    render(<SecurityLevelWidget {...getRequiredProps()} loading={true} />);
    expect(screen.getByTestId(SECURITY_LEVEL_TEST_IDS.SECURITY_LEVEL_WIDGET)).toHaveAttribute('data-loading', 'true');
  });

  it("renders error state correctly", () => {
    const error = new Error("Test error message");
    render(<SecurityLevelWidget {...getRequiredProps()} error={error} />);
    expect(screen.getByText("Error Loading Security Levels")).toBeInTheDocument();
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
