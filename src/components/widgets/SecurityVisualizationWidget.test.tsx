import React from 'react';
import { render, screen } from '@testing-library/react';
import SecurityVisualizationWidget from './SecurityVisualizationWidget';
import { SecurityLevel } from '../../types/cia';

// Mock RadarChart since it uses canvas which is difficult to test
vi.mock('../RadarChart', () => ({
  default: () => <div data-testid="mock-radar-chart">Mock Radar Chart</div>
}));

describe('SecurityVisualizationWidget', () => {
  it('renders without crashing', () => {
    render(
      <SecurityVisualizationWidget 
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    
    expect(screen.getByText(/Security Profile Visualization/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Risk Score Gauge/i)).toBeInTheDocument();
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

  it('displays risk level recommendations based on security levels', () => {
    render(
      <SecurityVisualizationWidget 
        availabilityLevel="Low"
        integrityLevel="Low"
        confidentialityLevel="Low"
      />
    );
    
    // Check for recommendations section
    expect(screen.getByText(/Risk Mitigation Recommendations/i)).toBeInTheDocument();
    
    // Check for specific recommendations based on the security levels
    expect(screen.getByText(/Increase your Availability security level/i)).toBeInTheDocument();
    expect(screen.getByText(/Enhance Integrity controls/i)).toBeInTheDocument();
    expect(screen.getByText(/Strengthen Confidentiality measures/i)).toBeInTheDocument();
  });
});
