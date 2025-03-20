import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SecurityWidgetProps } from '../../types/widget-props';
import withSecurityLevelState from '../withSecurityLevelState';

// Create a simple test component
interface TestComponentProps extends SecurityWidgetProps {
  title?: string;
}

const TestComponent: React.FC<TestComponentProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  onAvailabilityChange,
  onIntegrityChange,
  onConfidentialityChange,
  title = 'Test Component'
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <div data-testid="availability-level">Availability: {availabilityLevel}</div>
      <div data-testid="integrity-level">Integrity: {integrityLevel}</div>
      <div data-testid="confidentiality-level">Confidentiality: {confidentialityLevel}</div>
      
      <button 
        data-testid="change-availability"
        onClick={() => onAvailabilityChange?.('High')}
      >
        Change Availability
      </button>
      <button 
        data-testid="change-integrity"
        onClick={() => onIntegrityChange?.('High')}
      >
        Change Integrity
      </button>
      <button 
        data-testid="change-confidentiality"
        onClick={() => onConfidentialityChange?.('High')}
      >
        Change Confidentiality
      </button>
    </div>
  );
};

// Wrap the test component with the HOC
const EnhancedComponent = withSecurityLevelState(TestComponent);

describe('withSecurityLevelState HOC', () => {
  test('should provide default security levels if not specified', () => {
    render(
      <EnhancedComponent 
        availabilityLevel="Moderate" 
        integrityLevel="Moderate" 
        confidentialityLevel="Moderate" 
      />
    );
    
    // Check if the default security level is "Moderate"
    expect(screen.getByTestId('availability-level')).toHaveTextContent('Availability: Moderate');
    expect(screen.getByTestId('integrity-level')).toHaveTextContent('Integrity: Moderate');
    expect(screen.getByTestId('confidentiality-level')).toHaveTextContent('Confidentiality: Moderate');
  });

  test('should use provided security levels', () => {
    render(
      <EnhancedComponent 
        availabilityLevel="High"
        integrityLevel="Low"
        confidentialityLevel="Very High"
      />
    );
    
    expect(screen.getByTestId('availability-level')).toHaveTextContent('Availability: High');
    expect(screen.getByTestId('integrity-level')).toHaveTextContent('Integrity: Low');
    expect(screen.getByTestId('confidentiality-level')).toHaveTextContent('Confidentiality: Very High');
  });

  test('should call change handlers when provided', () => {
    const onAvailabilityChange = vi.fn();
    const onIntegrityChange = vi.fn();
    const onConfidentialityChange = vi.fn();
    
    render(
      <EnhancedComponent 
        availabilityLevel="Moderate" 
        integrityLevel="Moderate" 
        confidentialityLevel="Moderate"
        onAvailabilityChange={onAvailabilityChange}
        onIntegrityChange={onIntegrityChange}
        onConfidentialityChange={onConfidentialityChange}
      />
    );
    
    // Click the buttons to trigger level changes
    fireEvent.click(screen.getByTestId('change-availability'));
    fireEvent.click(screen.getByTestId('change-integrity'));
    fireEvent.click(screen.getByTestId('change-confidentiality'));
    
    // Verify the handlers were called with the correct values
    expect(onAvailabilityChange).toHaveBeenCalledWith('High');
    expect(onIntegrityChange).toHaveBeenCalledWith('High');
    expect(onConfidentialityChange).toHaveBeenCalledWith('High');
  });

  test('should update internal state when security level changes', () => {
    render(
      <EnhancedComponent 
        availabilityLevel="Moderate" 
        integrityLevel="Moderate" 
        confidentialityLevel="Moderate"
      />
    );
    
    // Initial state should be "Moderate"
    expect(screen.getByTestId('availability-level')).toHaveTextContent('Availability: Moderate');
    
    // Trigger a level change
    fireEvent.click(screen.getByTestId('change-availability'));
    
    // State should be updated
    expect(screen.getByTestId('availability-level')).toHaveTextContent('Availability: High');
  });

  test('should pass through other props', () => {
    render(
      <EnhancedComponent 
        availabilityLevel="Moderate" 
        integrityLevel="Moderate" 
        confidentialityLevel="Moderate"
        title="Custom Title" 
      />
    );
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });
});
