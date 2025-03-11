import React from 'react';
import { render, screen } from '@testing-library/react';
import BusinessImpactSection from './BusinessImpactSection';
import { BusinessImpactDetails } from '../../types/cia-services';

describe('BusinessImpactSection', () => {
  // Create a mock BusinessImpactDetails object that matches the current implementation
  const mockBusinessImpact: BusinessImpactDetails = {
    summary: 'Test business impact summary',
    financial: {
      description: 'Test financial impact',
      riskLevel: 'High',
    },
    operational: {
      description: 'Test operational impact',
      riskLevel: 'Medium',
    }
    // Note: reputational field not included as it's not required by the component
  };

  it('renders without crashing', () => {
    render(
      <BusinessImpactSection 
        impact={mockBusinessImpact} 
        color="blue" 
        testId="test-business-impact"
      />
    );
    
    expect(screen.getByTestId('test-business-impact')).toBeInTheDocument();
  });

  it('displays the business impact summary', () => {
    render(
      <BusinessImpactSection 
        impact={mockBusinessImpact} 
        color="blue" 
        testId="test-business-impact"
      />
    );
    
    expect(screen.getByTestId('test-business-impact-summary')).toHaveTextContent('Test business impact summary');
  });

  it('displays financial and operational impact sections', () => {
    render(
      <BusinessImpactSection 
        impact={mockBusinessImpact} 
        color="blue"
      />
    );
    
    expect(screen.getByText('Financial Impact')).toBeInTheDocument();
    expect(screen.getByText('Operational Impact')).toBeInTheDocument();
    expect(screen.getByText('Test financial impact')).toBeInTheDocument();
    expect(screen.getByText('Test operational impact')).toBeInTheDocument();
  });

  it('uses the default testId when none is provided', () => {
    render(
      <BusinessImpactSection 
        impact={mockBusinessImpact} 
        color="blue"
      />
    );
    
    expect(screen.getByTestId('business-impact-section')).toBeInTheDocument();
  });

  it('handles missing impact properties gracefully', () => {
    const minimalImpact: BusinessImpactDetails = {
      summary: 'Minimal summary',
      financial: {
        description: '',
        riskLevel: '',
      },
      operational: {
        description: '',
        riskLevel: '',
      },
    };

    render(
      <BusinessImpactSection 
        impact={minimalImpact} 
        color="blue"
      />
    );
    
    expect(screen.getByText('Financial Impact')).toBeInTheDocument();
    expect(screen.getByText('Operational Impact')).toBeInTheDocument();
    expect(screen.getByText('No financial impact information available')).toBeInTheDocument();
    expect(screen.getByText('No operational impact information available')).toBeInTheDocument();
  });
});
