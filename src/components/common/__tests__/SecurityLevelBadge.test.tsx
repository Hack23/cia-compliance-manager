import { render, screen } from '@testing-library/react';
import { SecurityLevel } from '../../../types/cia';
import SecurityLevelBadge from '../SecurityLevelBadge';

describe('SecurityLevelBadge', () => {
  test('renders with correct category and level', () => {
    render(
      <SecurityLevelBadge 
        category="Availability" 
        level="High" 
        testId="test-badge" 
      />
    );
    
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveTextContent('Availability: High');
  });
  
  test('applies custom color and text classes', () => {
    render(
      <SecurityLevelBadge 
        category="Integrity" 
        level="Moderate" 
        colorClass="bg-custom-color"
        textClass="text-custom-color"
        testId="test-badge" 
      />
    );
    
    const badge = screen.getByTestId('test-badge');
    expect(badge.firstChild).toHaveClass('bg-custom-color');
    expect(badge.firstChild?.firstChild).toHaveClass('text-custom-color');
  });
  
  test('applies default color classes based on security level', () => {
    const testCases: { level: SecurityLevel; expectedColorClass: string; expectedTextClass: string }[] = [
      { level: 'None', expectedColorClass: 'bg-red-100', expectedTextClass: 'text-red-800' },
      { level: 'Low', expectedColorClass: 'bg-yellow-100', expectedTextClass: 'text-yellow-800' },
      { level: 'Moderate', expectedColorClass: 'bg-blue-100', expectedTextClass: 'text-blue-800' },
      { level: 'High', expectedColorClass: 'bg-green-100', expectedTextClass: 'text-green-800' },
      { level: 'Very High', expectedColorClass: 'bg-purple-100', expectedTextClass: 'text-purple-800' },
    ];
    
    testCases.forEach(({ level, expectedColorClass, expectedTextClass }) => {
      const { container, unmount } = render(
        <SecurityLevelBadge 
          category="Test" 
          level={level}
        />
      );
      
      const colorElement = container.querySelector('div > div');
      const textElement = container.querySelector('div > div > span');
      
      expect(colorElement?.className).toContain(expectedColorClass);
      expect(textElement?.className).toContain(expectedTextClass);
      
      unmount();
    });
  });
  
  test('applies custom className to container', () => {
    render(
      <SecurityLevelBadge 
        category="Confidentiality" 
        level="High" 
        className="custom-container-class"
        testId="test-badge" 
      />
    );
    
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveClass('custom-container-class');
  });
});
