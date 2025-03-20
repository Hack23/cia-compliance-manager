import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { SecurityLevelProvider, useSecurityLevelContext } from '../SecurityLevelContext';

// Test component that uses the security level context
const TestComponent: React.FC = () => {
  const {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    setAvailabilityLevel,
    setIntegrityLevel,
    setConfidentialityLevel
  } = useSecurityLevelContext();

  return (
    <div>
      <div data-testid="availability">Availability: {availabilityLevel}</div>
      <div data-testid="integrity">Integrity: {integrityLevel}</div>
      <div data-testid="confidentiality">Confidentiality: {confidentialityLevel}</div>
      
      <button 
        data-testid="set-high-availability"
        onClick={() => setAvailabilityLevel('High')}
      >
        Set High Availability
      </button>
      
      <button 
        data-testid="set-high-integrity"
        onClick={() => setIntegrityLevel('High')}
      >
        Set High Integrity
      </button>
      
      <button 
        data-testid="set-high-confidentiality"
        onClick={() => setConfidentialityLevel('High')}
      >
        Set High Confidentiality
      </button>
    </div>
  );
};

describe('SecurityLevelContext', () => {
  test('provides default values', () => {
    render(
      <SecurityLevelProvider>
        <TestComponent />
      </SecurityLevelProvider>
    );
    
    expect(screen.getByTestId('availability')).toHaveTextContent('Availability: Moderate');
    expect(screen.getByTestId('integrity')).toHaveTextContent('Integrity: Moderate');
    expect(screen.getByTestId('confidentiality')).toHaveTextContent('Confidentiality: Moderate');
  });
  
  test('provides initial values', () => {
    render(
      <SecurityLevelProvider 
        initialAvailability="High"
        initialIntegrity="Low"
        initialConfidentiality="Very High"
      >
        <TestComponent />
      </SecurityLevelProvider>
    );
    
    expect(screen.getByTestId('availability')).toHaveTextContent('Availability: High');
    expect(screen.getByTestId('integrity')).toHaveTextContent('Integrity: Low');
    expect(screen.getByTestId('confidentiality')).toHaveTextContent('Confidentiality: Very High');
  });
  
  test('updates values when setter functions are called', () => {
    render(
      <SecurityLevelProvider>
        <TestComponent />
      </SecurityLevelProvider>
    );
    
    // Check initial values
    expect(screen.getByTestId('availability')).toHaveTextContent('Availability: Moderate');
    
    // Change availability level
    fireEvent.click(screen.getByTestId('set-high-availability'));
    
    // Check updated values
    expect(screen.getByTestId('availability')).toHaveTextContent('Availability: High');
    
    // Change other levels
    fireEvent.click(screen.getByTestId('set-high-integrity'));
    fireEvent.click(screen.getByTestId('set-high-confidentiality'));
    
    expect(screen.getByTestId('integrity')).toHaveTextContent('Integrity: High');
    expect(screen.getByTestId('confidentiality')).toHaveTextContent('Confidentiality: High');
  });
  
  test('can be nested with more specific providers', () => {
    render(
      <SecurityLevelProvider initialAvailability="Low">
        <div>
          <TestComponent />
          <SecurityLevelProvider initialAvailability="High">
            <div data-testid="nested">
              <TestComponent />
            </div>
          </SecurityLevelProvider>
        </div>
      </SecurityLevelProvider>
    );
    
    // Check outer provider values
    expect(screen.getAllByTestId('availability')[0]).toHaveTextContent('Availability: Low');
    
    // Check nested provider values
    const nestedElement = screen.getByTestId('nested');
    expect(nestedElement.querySelector('[data-testid="availability"]')).toHaveTextContent('Availability: High');
  });
});
