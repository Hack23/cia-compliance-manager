import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Selection from './Selection';

describe('Selection Component', () => {
  const defaultProps = {
    id: "test-select",
    label: "Test Label",
    icon: "🔒",
    description: "Test description",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" }
    ],
    value: "option1",
    onChange: vi.fn(),
    iconClassName: "text-blue-600",
    labelClassName: "text-blue-600",
    infoContent: "Info content",
    contextInfo: "Context info",
    disabled: false,
    "data-testid": "test-selection"
  };

  it('renders correctly with options', () => {
    render(<Selection {...defaultProps} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("🔒")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it('contains all option values', () => {
    render(<Selection {...defaultProps} />);
    
    const select = screen.getByRole("combobox");
    const options = Array.from(select.querySelectorAll("option"));
    
    expect(options).toHaveLength(3);
    expect(options[0].value).toBe("option1");
    expect(options[1].value).toBe("option2");
    expect(options[2].value).toBe("option3");
  });

  it('handles changes correctly', () => {
    render(<Selection {...defaultProps} />);
    
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "option2" } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith("option2");
  });

  it('handles options with no corresponding security icons', () => {
    render(
      <Selection
        {...defaultProps}
        options={[
          { value: "custom1", label: "Custom 1" },
          { value: "custom2", label: "Custom 2" }
        ]}
      />
    );

    const select = screen.getByRole("combobox");
    const options = Array.from(select.querySelectorAll("option"));
    
    expect(options).toHaveLength(2);
    expect(options[0].textContent).toBe("Custom 1");
    expect(options[1].textContent).toBe("Custom 2");
  });

  describe('Accessibility', () => {
    it('maintains label-input association', () => {
      render(<Selection {...defaultProps} />);
      
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("id", "test-select");
      
      const label = screen.getByText("Test Label").closest("label");
      expect(label).toHaveAttribute("for", "test-select");
    });

    it('has proper ARIA attributes', () => {
      render(<Selection {...defaultProps} aria-label="Select test option" />);
      
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-label", "Select test option");
    });
  });

  describe('Option Handling', () => {
    it('displays correct number of options', () => {
      render(<Selection {...defaultProps} />);
      
      const select = screen.getByRole("combobox");
      expect(select.querySelectorAll("option")).toHaveLength(3);
    });

    it('maintains option order', () => {
      render(<Selection {...defaultProps} />);
      
      const select = screen.getByRole("combobox");
      const options = Array.from(select.querySelectorAll("option"));
      
      expect(options[0].textContent).toBe("Option 1");
      expect(options[1].textContent).toBe("Option 2");
      expect(options[2].textContent).toBe("Option 3");
    });
  });

  describe('Info and Context Functionality', () => {
    it('toggles info content when info button is clicked', () => {
      render(<Selection {...defaultProps} />);
      
      // Initially info content is not visible
      expect(screen.queryByText("Info content")).not.toBeInTheDocument();
      
      // Click info button to show content
      const infoButton = screen.getByText("ⓘ");
      fireEvent.click(infoButton);
      
      // Now info content should be visible
      expect(screen.getByText("Info content")).toBeInTheDocument();
    });

    it('toggles context info when show/hide context button is clicked', () => {
      render(<Selection {...defaultProps} />);
      
      // Initially context info is not visible
      expect(screen.queryByText("Context info")).not.toBeInTheDocument();
      
      // Show context info
      const showButton = screen.getByText("Show details");
      fireEvent.click(showButton);
      
      // Now context info should be visible
      expect(screen.getByText("Context info")).toBeInTheDocument();
      
      // Hide context info
      const hideButton = screen.getByText("Hide details");
      fireEvent.click(hideButton);
      
      // Context info should be hidden again
      expect(screen.queryByText("Context info")).not.toBeInTheDocument();
    });

    it("doesn't render info button when infoContent is not provided", () => {
      const propsWithoutInfo = { ...defaultProps, infoContent: undefined };
      render(<Selection {...propsWithoutInfo} />);
      
      // Info button should not be present
      expect(screen.queryByText("ⓘ")).not.toBeInTheDocument();
    });

    it("doesn't render context section when contextInfo is not provided", () => {
      const propsWithoutContext = { ...defaultProps, contextInfo: undefined };
      render(<Selection {...propsWithoutContext} />);
      
      // Show details button should not be present
      expect(screen.queryByText("Show details")).not.toBeInTheDocument();
    });
  });
});
