import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SECURITY_LEVEL_TEST_IDS } from "../../constants/testIds";
import { SecurityLevel } from "../../types/cia";
import SecurityLevelWidget from "./SecurityLevelWidget";

// Update the mock function to handle props better
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

// Update the getRequiredProps function to include all required props
function getRequiredProps() {
  return {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
    securityLevel: "None" as SecurityLevel,
    onAvailabilityLevelChange: vi.fn(),
    onIntegrityLevelChange: vi.fn(),
    onConfidentialityLevelChange: vi.fn(),
    onSecurityLevelChange: vi.fn(),
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
    // Use getAllByText to find all elements containing this text
    expect(screen.getAllByText(/Mock Security Level Selector/)[0]).toBeInTheDocument();
  });

  it("uses custom testId if provided", () => {
    const customTestId = "custom-security-level-widget-id";
    render(
      <SecurityLevelWidget {...getRequiredProps()} testId={customTestId} />
    );
    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  // Replace calls to setAvailability with onAvailabilityLevelChange
  it("handles availability level change", () => {
    const onAvailabilityLevelChange = vi.fn();
    render(
      <SecurityLevelWidget
        {...getRequiredProps()}
        onAvailabilityLevelChange={onAvailabilityLevelChange}
      />
    );

    // Test assertions
    fireEvent.click(screen.getByTestId("mock-change-availability-level"));
    expect(onAvailabilityLevelChange).toHaveBeenCalledWith("Low");
  });

  it("calls onIntegrityLevelChange when integrity changes", () => {
    const onIntegrityLevelChange = vi.fn();
    render(
      <SecurityLevelWidget
        {...getRequiredProps()}
        onIntegrityLevelChange={onIntegrityLevelChange}
      />
    );

    fireEvent.click(screen.getByTestId("mock-change-integrity-level"));
    expect(onIntegrityLevelChange).toHaveBeenCalledWith("Moderate");
  });

  it("calls onConfidentialityLevelChange when confidentiality changes", () => {
    const onConfidentialityLevelChange = vi.fn();
    render(
      <SecurityLevelWidget
        {...getRequiredProps()}
        onConfidentialityLevelChange={onConfidentialityLevelChange}
      />
    );

    fireEvent.click(screen.getByTestId("mock-change-confidentiality-level"));
    expect(onConfidentialityLevelChange).toHaveBeenCalledWith("High");
  });

  it("renders without crashing", () => {
    // Simplify the test to just check component renders
    render(<SecurityLevelWidget {...getRequiredProps()} />);
    // Use getAllByText since there might be multiple elements with this text
    expect(screen.getAllByText(/Mock Security Level Selector/)[0]).toBeInTheDocument();
  });
});
