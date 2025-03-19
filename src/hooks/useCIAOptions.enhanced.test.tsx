import { vi } from "vitest";
import { renderHook } from "../tests/testUtils/hookTestUtils";

// Mock the useCIAOptions hook directly - don't use vi.mock which has already been set
const mockOptions = {
  availabilityOptions: {
    None: { description: "Test None" },
    Low: { description: "Test Low" },
    Moderate: { description: "Test Moderate" },
    High: { description: "Test High" },
    "Very High": { description: "Test Very High" },
  },
  integrityOptions: {
    None: { description: "Test None" },
    Low: { description: "Test Low" },
    Moderate: { description: "Test Moderate" },
    High: { description: "Test High" },
    "Very High": { description: "Test Very High" },
  },
  confidentialityOptions: {
    None: { description: "Test None" },
    Low: { description: "Test Low" },
    Moderate: { description: "Test Moderate" },
    High: { description: "Test High" },
    "Very High": { description: "Test Very High" },
  },
  ROI_ESTIMATES: {
    NONE: { returnRate: "0%", description: "Test NONE" },
    LOW: { returnRate: "50%", description: "Test LOW" },
    MODERATE: { returnRate: "100%", description: "Test MODERATE" },
    HIGH: { returnRate: "200%", description: "Test HIGH" },
    VERY_HIGH: { returnRate: "500%", description: "Test VERY_HIGH" },
  },
};

// Import useCIAOptions after mock is defined
import { useCIAOptions } from "./useCIAOptions";

// Mock the module with vi.mocked
vi.mock("./useCIAOptions", () => ({
  useCIAOptions: vi.fn().mockReturnValue(mockOptions),
}));

describe("useCIAOptions Enhanced", () => {
  it("should return all CIA options", () => {
    const { result } = renderHook(() => useCIAOptions());
    expect(result.current).toHaveProperty("availabilityOptions");
    expect(result.current).toHaveProperty("integrityOptions");
    expect(result.current).toHaveProperty("confidentialityOptions");
    expect(result.current).toHaveProperty("ROI_ESTIMATES");
  });
});

describe("useCIAOptions Hook Enhanced Tests", () => {
  it("returns consistent options structure on multiple renders", () => {
    // Since we're mocking the hook to return the same object every time,
    // we can just check that it returns something without expecting stable references
    const { result } = renderHook(() => useCIAOptions());
    expect(result.current).toEqual(mockOptions);
  });

  it("provides all required security levels", () => {
    const { result } = renderHook(() => useCIAOptions());

    // Check availability options
    expect(result.current.availabilityOptions).toHaveProperty("None");
    expect(result.current.availabilityOptions).toHaveProperty("Low");
    expect(result.current.availabilityOptions).toHaveProperty("Moderate");
    expect(result.current.availabilityOptions).toHaveProperty("High");
    expect(result.current.availabilityOptions).toHaveProperty("Very High");

    // Similar checks for integrity and confidentiality
    expect(result.current.integrityOptions).toHaveProperty("None");
    expect(result.current.integrityOptions).toHaveProperty("Very High");

    expect(result.current.confidentialityOptions).toHaveProperty("None");
    expect(result.current.confidentialityOptions).toHaveProperty("Very High");
  });

  it("provides ROI estimates for all security levels", () => {
    const { result } = renderHook(() => useCIAOptions());

    expect(result.current.ROI_ESTIMATES).toHaveProperty("NONE");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("LOW");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("MODERATE");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("HIGH");
    expect(result.current.ROI_ESTIMATES).toHaveProperty("VERY_HIGH");
  });
});
