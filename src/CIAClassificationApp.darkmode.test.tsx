// Define mocks at the top of the file, before imports
vi.mock("./hooks/useCIAOptions", () => {
const mockOptions = {
    None: { capex: 0, opex: 0 },
    Low: { capex: 5, opex: 2 },
    Moderate: { capex: 10, opex: 5 },
    High: { capex: 15, opex: 8 },
    "Very High": { capex: 20, opex: 10 },
  };

  return {
    __esModule: true,
    // Export named exports that other modules expect
    availabilityOptions: { ...mockOptions },
    integrityOptions: { ...mockOptions },
    confidentialityOptions: { ...mockOptions },
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%" },
      LOW: { returnRate: "100%" },
      MODERATE: { returnRate: "200%" },
      HIGH: { returnRate: "350%" },
      VERY_HIGH: { returnRate: "500%" },
    },
    // Export the hook function
    default: () => ({
      availabilityOptions: mockOptions,
      integrityOptions: mockOptions,
      confidentialityOptions: mockOptions,
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%" },
        LOW: { returnRate: "100%" },
        MODERATE: { returnRate: "200%" },
        HIGH: { returnRate: "350%" },
        VERY_HIGH: { returnRate: "500%" },
      },
    }),
    // The hook usage
    useCIAOptions: () => ({
      availabilityOptions: mockOptions,
      integrityOptions: mockOptions,
      confidentialityOptions: mockOptions,
      ROI_ESTIMATES: {
        NONE: { returnRate: "0%" },
        LOW: { returnRate: "100%" },
        MODERATE: { returnRate: "200%" },
        HIGH: { returnRate: "350%" },
        VERY_HIGH: { returnRate: "500%" },
      },
    }),
  };
});

// Move vi.mock calls to the top, before any imports


// Fix types for mock elements
vi.mock("./components/Dashboard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mocked-dashboard">{children}</div>
  ),
  DashboardWidget: ({
    children,
    testId,
  }: {
    children: React.ReactNode;
    testId?: string;
  }) => <div data-testid={testId || "mocked-widget"}>{children}</div>,
}));

vi.mock("./components/widgets/SecurityLevelWidget", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-security-level-widget">Security Level Widget</div>
  ),
}));

vi.mock("./components/widgets/SecuritySummaryWidget", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="mock-security-summary">Security Summary Widget</div>
  ),
}));

// Then import needed modules after all vi.mock calls
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";
import { APP_TEST_IDS } from "./constants/testIds";

describe("CIAClassificationApp Dark Mode Tests", () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated but needed for compatibility
        removeListener: vi.fn(), // Deprecated but needed for compatibility
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
      writable: true,
    });

    // Mock document methods
    document.documentElement.classList.add = vi.fn();
    document.documentElement.classList.remove = vi.fn();
    vi.spyOn(document, "getElementById").mockImplementation(() => {
      const mockElement = document.createElement("div");
      mockElement.classList.add = vi.fn();
      mockElement.classList.remove = vi.fn();
      return mockElement;
    });
  });

  it("toggles dark mode when theme toggle button is clicked", () => {
    render(<CIAClassificationApp />);
    const themeToggle = screen.getByTestId(APP_TEST_IDS.THEME_TOGGLE);

    // Click the toggle button
    fireEvent.click(themeToggle);

    // Check if dark mode classes were added
    expect(document.documentElement.classList.add).toHaveBeenCalledWith("dark");

    // Click again to toggle back to light mode
    fireEvent.click(themeToggle);

    // Check if dark mode classes were removed
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith(
      "dark"
    );
  });

  it("handles event listeners for test events", () => {
    render(<CIAClassificationApp />);

    // Wrap event dispatch in act
    act(() => {
      // Create and dispatch a test event
      const testEvent = new CustomEvent("test:set-values", {
        detail: {
          availability: "High",
          integrity: "Moderate",
          confidentiality: "Low",
        },
      });
      document.dispatchEvent(testEvent);
    });

    // Verify the component didn't crash
    expect(screen.getByTestId(APP_TEST_IDS.APP_CONTAINER)).toBeInTheDocument();
  });
});
