import { fireEvent, render, screen } from '@testing-library/react';
import CIAClassificationApp from '../../application/CIAClassificationApp';

describe('Security Level Propagation Integration Tests', () => {
  beforeEach(() => {
    // Mock localStorage to avoid warnings
    const localStorageMock = {
      getItem: vi.fn((key) => {
        if (key === 'availabilityLevel') return '"Moderate"';
        if (key === 'integrityLevel') return '"Moderate"';
        if (key === 'confidentialityLevel') return '"Moderate"';
        if (key === 'darkMode') return 'true';
        return null;
      }),
      setItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
      length: 4,
      key: vi.fn(),
    };
    global.localStorage = localStorageMock;
  });

  test('changing security levels in Security Level Widget updates other widgets', async () => {
    render(<CIAClassificationApp />);
    
    // Locate the security level selectors
    const availabilitySelector = screen.getByTestId('availability-select');
    
    // Change availability level to "High"
    fireEvent.change(availabilitySelector, { target: { value: 'High' } });
    
    // Verify level was updated in SecurityLevelWidget
    const availabilitySummary = screen.getByTestId('security-level-widget-availability-summary');
    expect(availabilitySummary).toHaveTextContent('High');
    
    // Verify the SecuritySummaryWidget was updated (may need to wait for update)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check that the security summary widget updated to reflect new level
    const securitySummary = screen.queryByTestId('security-summary-widget');
    expect(securitySummary).toHaveTextContent('High');
    
    // Check that the visualization widget updated 
    const visualizationWidget = screen.queryByTestId('security-visualization-widget');
    if (visualizationWidget) {
      expect(visualizationWidget).toHaveTextContent('High');
    }
  });
});
