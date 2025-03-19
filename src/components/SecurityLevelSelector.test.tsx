import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../types/cia";
import SecurityLevelSelector from "./SecurityLevelSelector";

// Mock the imported components
vi.mock("./common/SecurityLevelSelector", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(({ label, value, onChange, testId }) => (
    <div data-testid={testId || "mock-simple-selector"}>
      <span>Simple Selector: {label}</span>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value as SecurityLevel)}
        data-testid={`${testId}-select`}
      >
        <option value="None">None</option>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
        <option value="Very High">Very High</option>
      </select>
    </div>
  )),
}));

vi.mock("./securitylevel/SecurityLevelSelector", () => ({
  __esModule: true,
  default: vi.fn().mockImplementation(({ 
    availabilityLevel, 
    integrityLevel, 
    confidentialityLevel,
    onAvailabilityChange,
    onIntegrityChange,
    onConfidentialityChange,
    testId
  }) => (
    <div data-testid={testId || "mock-enhanced-selector"}>
      <div>Enhanced Selector</div>
      <button 
        data-testid="mock-change-availability"
        onClick={() => onAvailabilityChange?.("Low" as SecurityLevel)}
      >
        Change Availability
      </button>
      <button 
        data-testid="mock-change-integrity"
        onClick={() => onIntegrityChange?.("Moderate" as SecurityLevel)}
      >
        Change Integrity
      </button>
      <button 
        data-testid="mock-change-confidentiality"
        onClick={() => onConfidentialityChange?.("High" as SecurityLevel)}
      >
        Change Confidentiality
      </button>
    </div>
  )),
}));

describe("SecurityLevelSelector", () => {
  // Define security level constants to avoid TypeScript casting issues in JSX
  const noneLevel: SecurityLevel = "None";
  
  it("renders simple selector when simple props are provided", () => {
    render(
      <SecurityLevelSelector
        label="Test Selector"
        value="Moderate"
        onChange={vi.fn()}
        options={["None", "Low", "Moderate", "High", "Very High"]}
        testId="test-selector"
      />
    );
    
    expect(screen.getByTestId("test-selector")).toBeInTheDocument();
    expect(screen.getByText("Simple Selector: Test Selector")).toBeInTheDocument();
  });

  it("renders enhanced selector when enhanced props are provided", () => {
    render(
      <SecurityLevelSelector
        availabilityLevel={noneLevel}
        integrityLevel={noneLevel}
        confidentialityLevel={noneLevel}
        onAvailabilityChange={vi.fn()}
        onIntegrityChange={vi.fn()}
        onConfidentialityChange={vi.fn()}
        testId="test-enhanced-selector"
      />
    );
    
    expect(screen.getByTestId("test-enhanced-selector")).toBeInTheDocument();
    expect(screen.getByText("Enhanced Selector")).toBeInTheDocument();
  });

  it("handles type conversion in simple selector", () => {
    const handleChange = vi.fn();
    
    render(
      <SecurityLevelSelector
        label="Test Simple"
        value="Low"
        onChange={handleChange}
        options={["None", "Low", "Moderate", "High", "Very High"]}
        testId="test-simple"
      />
    );
    
    // Simulate selecting a different value
    fireEvent.change(screen.getByTestId("test-simple-select"), {
      target: { value: "High" }
    });
    
    // Check that callback was called with the string value
    expect(handleChange).toHaveBeenCalledWith("High");
  });

  it("handles type conversion in enhanced selector", () => {
    const handleAvailabilityChange = vi.fn();
    const handleIntegrityChange = vi.fn();
    const handleConfidentialityChange = vi.fn();
    
    render(
      <SecurityLevelSelector
        availabilityLevel={noneLevel}
        integrityLevel={noneLevel}
        confidentialityLevel={noneLevel}
        onAvailabilityChange={handleAvailabilityChange}
        onIntegrityChange={handleIntegrityChange}
        onConfidentialityChange={handleConfidentialityChange}
        testId="test-enhanced"
      />
    );
    
    // Test availability change
    fireEvent.click(screen.getByTestId("mock-change-availability"));
    expect(handleAvailabilityChange).toHaveBeenCalledWith("Low");
    
    // Test integrity change
    fireEvent.click(screen.getByTestId("mock-change-integrity"));
    expect(handleIntegrityChange).toHaveBeenCalledWith("Moderate");
    
    // Test confidentiality change
    fireEvent.click(screen.getByTestId("mock-change-confidentiality"));
    expect(handleConfidentialityChange).toHaveBeenCalledWith("High");
  });
});
