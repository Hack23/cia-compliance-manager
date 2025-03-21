import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { SecurityLevel } from "../types/cia";
import { useSecurityLevelSync } from "./useSecurityLevelSync";

describe("useSecurityLevelSync", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useSecurityLevelSync());

    expect(result.current.availabilityLevel).toBe("Moderate");
    expect(result.current.integrityLevel).toBe("Moderate");
    expect(result.current.confidentialityLevel).toBe("Moderate");
  });

  it("should initialize with provided values", () => {
    const { result } = renderHook(() =>
      useSecurityLevelSync(
        "High" as SecurityLevel,
        "Low" as SecurityLevel,
        "Very High" as SecurityLevel
      )
    );

    expect(result.current.availabilityLevel).toBe("High");
    expect(result.current.integrityLevel).toBe("Low");
    expect(result.current.confidentialityLevel).toBe("Very High");
  });

  it("should call callbacks when security levels change", () => {
    const onAvailabilityChange = vi.fn();
    const onIntegrityChange = vi.fn();
    const onConfidentialityChange = vi.fn();

    const { result } = renderHook(() =>
      useSecurityLevelSync("Moderate", {
        onAvailabilityChange,
        onIntegrityChange,
        onConfidentialityChange,
      })
    );

    act(() => {
      result.current.setAvailabilityLevel("High" as SecurityLevel);
    });

    expect(onAvailabilityChange).toHaveBeenCalledWith("High");

    act(() => {
      result.current.setIntegrityLevel("High" as SecurityLevel);
    });

    expect(onIntegrityChange).toHaveBeenCalledWith("High");

    act(() => {
      result.current.setConfidentialityLevel("High" as SecurityLevel);
    });

    expect(onConfidentialityChange).toHaveBeenCalledWith("High");
  });

  it("should accept object props format", () => {
    const { result } = renderHook(() =>
      useSecurityLevelSync({
        availabilityLevel: "High" as SecurityLevel,
        integrityLevel: "Low" as SecurityLevel,
        confidentialityLevel: "Very High" as SecurityLevel,
      })
    );

    expect(result.current.availabilityLevel).toBe("High");
    expect(result.current.integrityLevel).toBe("Low");
    expect(result.current.confidentialityLevel).toBe("Very High");
  });
});
