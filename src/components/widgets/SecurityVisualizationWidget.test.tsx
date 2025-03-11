import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SecurityVisualizationWidget from './SecurityVisualizationWidget';
import { SecurityLevel } from '../../types/cia';
import { vi } from 'vitest';

// Mock RadarChart since it uses canvas which is difficult to test
vi.mock('../RadarChart', () => ({
  default: () => <div data-testid="mock-radar-chart">Mock Radar Chart</div>
}));

describe('SecurityVisualizationWidget', () => {
  // Mock the useEffect for typing animation
  beforeEach(() => {
    vi.spyOn(React, 'useEffect').mockImplementation(f => f());
  });
  
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <SecurityVisualizationWidget 
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    
    expect(screen.getByText(/Security Profile Visualization/i)).toBeInTheDocument();
    expect(screen.getByTestId("mock-radar-chart")).toBeInTheDocument();
  });

  it('displays risk assessment metrics', () => {
    render(
      <SecurityVisualizationWidget 
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );
    
    // Check that risk metrics are displayed
    expect(screen.getByText(/Value at Risk/i)).toBeInTheDocument();
    expect(screen.getByText(/Probability/i)).toBeInTheDocument();
    expect(screen.getByText(/Risk Score/i)).toBeInTheDocument();
  });

  it('renders risk gauge with proper segments', () => {
    render(
      <SecurityVisualizationWidget 
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    
    // Check for the risk gauge elements
    const lowRiskLabel = screen.getByText(/Low Risk/i);
    const highRiskLabel = screen.getByText(/High Risk/i);
    
    expect(lowRiskLabel).toBeInTheDocument();
    expect(highRiskLabel).toBeInTheDocument();
  });

  it('displays risk mitigation recommendations', () => {
    render(
      <SecurityVisualizationWidget 
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );
    
    // Check for recommendations section
    expect(screen.getByText(/Risk Mitigation Recommendations/i)).toBeInTheDocument();
  });

  it('toggles tip visibility when clicking on recommendations', () => {
    render(
      <SecurityVisualizationWidget 
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );
    
    // Find a recommendation and click it
    const recommendation = screen.getByText(/Increase your/i);
    fireEvent.click(recommendation);
    
    // After clicking, implementation tips should be visible
    expect(screen.getByText(/Implementation tips:/i)).toBeInTheDocument();
  });
});
