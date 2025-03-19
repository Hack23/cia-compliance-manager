import { render, screen } from '@testing-library/react';
import withSecurityLevelState, { WithSecurityLevelProps } from './withSecurityLevelState';

// Mock component to wrap
const TestComponent = (props: WithSecurityLevelProps) => {
  return (
    <div data-testid="test-component">
      <div data-testid="availability">{props.availabilityLevel}</div>
      <div data-testid="integrity">{props.integrityLevel}</div>
      <div data-testid="confidentiality">{props.confidentialityLevel}</div>
    </div>
  );
};

// Enhanced component with state management
const EnhancedComponent = withSecurityLevelState(TestComponent);

describe('withSecurityLevelState HOC', () => {
  it('passes security levels to the wrapped component', () => {
    render(
      <EnhancedComponent
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );
    
    expect(screen.getByTestId('availability')).toHaveTextContent('High');
    expect(screen.getByTestId('integrity')).toHaveTextContent('Moderate');
    expect(screen.getByTestId('confidentiality')).toHaveTextContent('Low');
  });
  
  it('updates local state when props change', () => {
    const { rerender } = render(
      <EnhancedComponent
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="Low"
      />
    );
    
    // Update props
    rerender(
      <EnhancedComponent
        availabilityLevel="Very High"
        integrityLevel="High"
        confidentialityLevel="Moderate"
      />
    );
    
    // Check that component reflects new values
    expect(screen.getByTestId('availability')).toHaveTextContent('Very High');
    expect(screen.getByTestId('integrity')).toHaveTextContent('High');
    expect(screen.getByTestId('confidentiality')).toHaveTextContent('Moderate');
  });
});
