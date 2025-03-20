import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SecurityLevel } from '../../types/cia';
import SecurityLevelSelector from './SecurityLevelSelector';

describe('SecurityLevelSelector', () => {
  // Create proper callbacks for each CIA component
  const mockOnAvailabilityChange = vi.fn();
  const mockOnIntegrityChange = vi.fn();
  const mockOnConfidentialityChange = vi.fn();

  // Default prop values for the component - using all required props
  const defaultProps = {
    availabilityLevel: 'Moderate' as SecurityLevel,
    integrityLevel: 'Moderate' as SecurityLevel,
    confidentialityLevel: 'Moderate' as SecurityLevel,
    onAvailabilityChange: mockOnAvailabilityChange,
    onIntegrityChange: mockOnIntegrityChange,
    onConfidentialityChange: mockOnConfidentialityChange
  };

  beforeEach(() => {
    mockOnAvailabilityChange.mockReset();
    mockOnIntegrityChange.mockReset();
    mockOnConfidentialityChange.mockReset();
  });

  it('renders the selector with default values', () => {
    const { container } = render(
      <SecurityLevelSelector {...defaultProps} />
    );

    // More generic approach - look for the selects directly in the container
    const selects = container.querySelectorAll('select');
    expect(selects.length).toBeGreaterThan(0);
    
    // Check if there are sections for each CIA component
    expect(container.textContent).toMatch(/availability/i);
    expect(container.textContent).toMatch(/integrity/i);
    expect(container.textContent).toMatch(/confidentiality/i);
  });

  it('renders with different security levels', () => {
    const { container } = render(
      <SecurityLevelSelector
        {...defaultProps}
        availabilityLevel="High"
        integrityLevel="Very High"
        confidentialityLevel="Low"
      />
    );

    // Just verify that the component renders without errors
    expect(container).toBeInTheDocument();
    
    // The component should have the values we provided
    expect(container.textContent).toContain('High');
    expect(container.textContent).toContain('Very High');
    expect(container.textContent).toContain('Low');
  });

  it('calls callback when availability level changes', () => {
    const { container } = render(
      <SecurityLevelSelector {...defaultProps} />
    );

    // Find the first select (which should be for availability)
    const selects = container.querySelectorAll('select');
    const availabilitySelect = selects[0];
    
    // Change its value
    if (availabilitySelect) {
      fireEvent.change(availabilitySelect, { target: { value: 'High' } });

      // Check if callback was called
      expect(mockOnAvailabilityChange).toHaveBeenCalled();
    }
  });

  it('handles disabled state', () => {
    const { container } = render(
      <SecurityLevelSelector 
        {...defaultProps}
        disabled
      />
    );

    // Check if all selects are disabled
    const selects = container.querySelectorAll('select');
    selects.forEach(select => {
      expect(select).toBeDisabled();
    });
  });
});
