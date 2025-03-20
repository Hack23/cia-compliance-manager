import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Selection from './Selection';

describe('Selection Component', () => {
  // Convert options to array format that the component expects
  const mockOptions = [
    { value: 'None', label: 'None', description: 'No security' },
    { value: 'Low', label: 'Low', description: 'Basic security' },
    { value: 'Moderate', label: 'Moderate', description: 'Standard security' },
    { value: 'High', label: 'High', description: 'Advanced security' },
    { value: 'Very High', label: 'Very High', description: 'Maximum security' },
  ];

  const defaultProps = {
    id: 'test-selection-id',
    label: 'Test Selection',
    value: 'Moderate',
    options: mockOptions,
    onChange: vi.fn(),
    showInfoButton: true,
    contextInfo: 'Context information',
    infoContent: 'More information',
  };

  it('renders correctly with options', () => {
    render(<Selection {...defaultProps} />);
    expect(screen.getByText("Test Selection")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it('contains all option values', () => {
    render(<Selection {...defaultProps} />);
    
    const select = screen.getByRole("combobox");
    const options = Array.from(select.querySelectorAll("option"));
    
    expect(options).toHaveLength(5);
    expect(options[0].value).toBe("None");
    expect(options[1].value).toBe("Low");
    expect(options[2].value).toBe("Moderate");
  });

  it('handles changes correctly', () => {
    render(<Selection {...defaultProps} />);
    
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "High" } });
    
    expect(defaultProps.onChange).toHaveBeenCalledWith("High");
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
      expect(select).toHaveAttribute("id", "test-selection-id");
      
      const label = screen.getByText("Test Selection").closest("label");
      expect(label).toHaveAttribute("for", "test-selection-id");
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
      expect(select.querySelectorAll("option")).toHaveLength(5);
    });

    it('maintains option order', () => {
      render(<Selection {...defaultProps} />);
      
      const select = screen.getByRole("combobox");
      const options = Array.from(select.querySelectorAll("option"));
      
      expect(options[0].textContent).toContain("None");
      expect(options[1].textContent).toContain("Low");
      expect(options[2].textContent).toContain("Moderate");
    });
  });

  describe('Info and Context Functionality', () => {
    it('toggles info content when info button is clicked', async () => {
      render(<Selection {...defaultProps} />);
      
      // Find the info button - use a more flexible selector
      const infoButton = screen.getByRole('button', { 
        name: /info|details|more/i 
      });
      expect(infoButton).toBeInTheDocument();
      
      // Initially, the info content should not be visible
      expect(screen.queryByText(defaultProps.infoContent)).not.toBeInTheDocument();
      
      // Click to show info
      fireEvent.click(infoButton);
      
      // Check if info content is now visible
      await waitFor(() => {
        expect(screen.getByText(defaultProps.infoContent)).toBeInTheDocument();
      });
      
      // Click again to hide
      fireEvent.click(infoButton);
      
      // Check if info content is now hidden
      await waitFor(() => {
        expect(screen.queryByText(defaultProps.infoContent)).not.toBeInTheDocument();
      });
    });

    it('toggles context info when show/hide context button is clicked', async () => {
      render(<Selection {...defaultProps} />);
      
      // Find any button that might be the context button using a very flexible query
      // This addresses the issue where the button text may vary between "Show Context" or just "Context"
      const contextButtons = screen.getAllByRole('button');
      const contextButton = contextButtons.find(button => 
        button.textContent?.toLowerCase().includes('context') ||
        button.textContent?.toLowerCase().includes('show')
      );
      
      expect(contextButton).toBeDefined();
      expect(contextButton).toBeInTheDocument();
      
      // Initially, the context info should not be visible
      expect(screen.queryByText(defaultProps.contextInfo)).not.toBeInTheDocument();
      
      if (contextButton) {
        // Click to show context
        fireEvent.click(contextButton);
        
        // Check if context info is now visible
        await waitFor(() => {
          expect(screen.getByText(defaultProps.contextInfo)).toBeInTheDocument();
        });
        
        // Find any button that might hide the context
        const hideButtons = screen.getAllByRole('button');
        const hideButton = hideButtons.find(button => 
          button.textContent?.toLowerCase().includes('hide') ||
          button.textContent?.toLowerCase().includes('close') ||
          button.textContent?.toLowerCase().includes('context')
        );
        
        expect(hideButton).toBeDefined();
        
        if (hideButton) {
          // Click again to hide
          fireEvent.click(hideButton);
          
          // Check if context info is now hidden
          await waitFor(() => {
            expect(screen.queryByText(defaultProps.contextInfo)).not.toBeInTheDocument();
          });
        }
      }
    });

    it('doesn\'t render info button when infoContent is not provided', () => {
      render(<Selection {...defaultProps} infoContent={undefined} />);
      
      const infoButton = screen.queryByRole('button', { name: /more info/i });
      expect(infoButton).not.toBeInTheDocument();
    });

    it('doesn\'t render context section when contextInfo is not provided', () => {
      render(<Selection {...defaultProps} contextInfo={undefined} />);
      
      const contextButton = screen.queryByRole('button', { name: /show context/i });
      expect(contextButton).not.toBeInTheDocument();
    });
  });
});
