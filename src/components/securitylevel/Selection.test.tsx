import { fireEvent, render, screen } from "@testing-library/react";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";
import Selection from "./Selection";

describe("Selection Component", () => {
  const defaultProps = {
    id: "availability-select",
    label: "Availability",
    value: "None",
    options: {
      None: { description: "No availability guarantees" },
      Low: { description: "Basic availability" },
      Moderate: { description: "Moderate availability" },
      High: { description: "High availability" },
    },
    onChange: vi.fn(),
    testId: "availability-select", // Explicitly set testId
  };

  beforeEach(() => {
    // Ensure cleanup before each test
    vi.clearAllMocks();
  });

  it("renders correctly with options", () => {
    render(<Selection {...defaultProps} />);

    const select = screen.getByTestId("availability-select");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("None");
    expect(screen.getByText("None")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Moderate")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("contains all option values", () => {
    render(<Selection {...defaultProps} />);
    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(
      Object.keys(defaultProps.options).length
    );
  });

  it("handles changes correctly", () => {
    render(<Selection {...defaultProps} />);
    fireEvent.change(screen.getByTestId("availability-select"), {
      target: { value: "Moderate" },
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith("Moderate");
  });

  it("handles options with no corresponding security icons", () => {
    const customProps = {
      ...defaultProps,
      value: "Custom",
      options: {
        ...defaultProps.options,
        Custom: { description: "Custom level" },
      },
    };
    render(<Selection {...customProps} />);
    // If no icon is found, it should use a default lock icon
    const select = screen.getByTestId("availability-select");
    expect(select).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("maintains label-input association", () => {
      render(<Selection {...defaultProps} />);
      const select = screen.getByTestId("availability-select");
      expect(select).toHaveAttribute("id", "availability-select");
    });

    // Update this test to match the new behavior that only adds aria-label if label exists
    it("has proper ARIA attributes", () => {
      // Use unique testid for this test
      const testProps = {
        ...defaultProps,
        testId: "aria-test-select", // Changed from data-testid to testId
      };

      const { rerender } = render(<Selection {...testProps} />);
      const select = screen.getByTestId("aria-test-select");
      expect(select).toHaveAttribute("id");
      expect(select).toHaveAttribute("aria-label", "Availability"); // Changed from "Availability Level"

      // Test with empty label (should not have aria-label)
      rerender(<Selection {...testProps} label="" />);
      const selectWithoutLabel = screen.getByTestId("aria-test-select");
      expect(selectWithoutLabel).not.toHaveAttribute("aria-label");
    });
  });

  describe("Option Handling", () => {
    it("displays correct number of options", () => {
      render(<Selection {...defaultProps} />);
      const optionElements = screen.getAllByRole("option");
      expect(optionElements).toHaveLength(
        Object.keys(defaultProps.options).length
      );
    });

    it("maintains option order", () => {
      render(<Selection {...defaultProps} />);
      const optionElements = screen.getAllByRole("option");
      const optionsArray = Object.keys(defaultProps.options);

      optionElements.forEach((element, index) => {
        expect(element.textContent).toBe(optionsArray[index]);
      });
    });
  });

  describe("Info and Context Functionality", () => {
    it("toggles info content when info button is clicked", () => {
      render(<Selection {...defaultProps} infoContent="Test info content" />);

      // Info content should be hidden initially
      expect(screen.queryByText("Test info content")).not.toBeInTheDocument();

      // Click the info button
      const infoButton = screen.getByRole("button", {
        name: /Show information about Availability/,
      });
      fireEvent.click(infoButton);

      // Info content should now be visible
      expect(screen.getByText("Test info content")).toBeInTheDocument();

      // Click the info button again to hide content
      fireEvent.click(infoButton);

      // Info content should be hidden again
      expect(screen.queryByText("Test info content")).not.toBeInTheDocument();
    });

    it("toggles context info when show/hide context button is clicked", () => {
      render(
        <Selection {...defaultProps} contextInfo="Test context information" />
      );

      // Context button should be visible and context info should be hidden initially
      const contextButton = screen.getByRole("button", {
        name: "Show context",
      });
      expect(contextButton).toBeInTheDocument();
      expect(
        screen.queryByTestId(COMMON_COMPONENT_TEST_IDS.CONTEXT_INFO)
      ).not.toBeInTheDocument();

      // Click the context button
      fireEvent.click(contextButton);

      // Context info should now be visible and button text should change
      expect(
        screen.getByTestId(COMMON_COMPONENT_TEST_IDS.CONTEXT_INFO)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(COMMON_COMPONENT_TEST_IDS.CONTEXT_INFO)
      ).toHaveTextContent("Test context information");
      expect(
        screen.getByRole("button", { name: "Hide context" })
      ).toBeInTheDocument();

      // Click the context button again to hide info
      fireEvent.click(screen.getByRole("button", { name: "Hide context" }));

      // Context info should be hidden again
      expect(
        screen.queryByTestId(COMMON_COMPONENT_TEST_IDS.CONTEXT_INFO)
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Show context" })
      ).toBeInTheDocument();
    });

    it("doesn't render info button when infoContent is not provided", () => {
      render(<Selection {...defaultProps} />);

      // Info button shouldn't be present
      expect(
        screen.queryByRole("button", { name: /Show information about/ })
      ).not.toBeInTheDocument();
    });

    it("doesn't render context section when contextInfo is not provided", () => {
      render(<Selection {...defaultProps} />);

      // Context button shouldn't be present
      expect(
        screen.queryByRole("button", { name: /context/ })
      ).not.toBeInTheDocument();
    });
  });
});
