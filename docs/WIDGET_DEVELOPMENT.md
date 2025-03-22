# Widget Development Guide

This guide explains how to create and maintain widgets in the CIA Compliance Manager application with a focus on the standardized security level handling.

## Security Level Standards

All widgets that work with security levels should:

1. Use the `WithSecurityLevelProps` interface:
   ```tsx
   import { WithSecurityLevelProps } from '../types/widget-props';

   interface MyWidgetProps extends WithSecurityLevelProps {
     // Additional props specific to your widget
   }
   ```

2. Implement one of these approaches for state management:
   - Use the `withSecurityLevelState` HOC for class components or components that need internal state management.
   - Use the `useSecurityLevelSync` hook for function components.

3. Use standard security level display components:
   - `SecurityLevelBadge` for consistent visual representation
   - Standard color schemes based on security levels

4. Propagate level changes up to the application:
   - Handle `onAvailabilityChange`, `onIntegrityChange`, and `onConfidentialityChange` props
   - Call these handlers when internal security levels change

## Example Widget Implementation

```tsx
import React, { useMemo } from 'react';
import withSecurityLevelState from '../hoc/withSecurityLevelState';
import { SecurityWidgetProps } from '../types/widget-props';
import WidgetContainer from '../common/WidgetContainer';
import SecurityLevelBadge from '../common/SecurityLevelBadge';
import { getSecurityLevelValue } from '../utils/securityLevelUtils';

interface MyWidgetProps extends SecurityWidgetProps {
  title?: string;
}

const MyWidget: React.FC<MyWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  onAvailabilityChange,
  title = "My Widget",
  className = "",
  testId = "my-widget",
}) => {
  const securityScore = useMemo(() => 
    getSecurityLevelValue(availabilityLevel) * 25, 
    [availabilityLevel]
  );

  return (
    <WidgetContainer
      title={title}
      icon="🔒"
      className={className}
      testId={testId}
    >
      <div className="p-4">
        <SecurityLevelBadge
          category="Availability"
          level={availabilityLevel}
          colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
          textClass="text-blue-800 dark:text-blue-300"
          testId={`${testId}-availability-badge`}
        />
        
        <div className="mt-4">
          <h3>Security Score: {securityScore}%</h3>
        </div>
        
        <button
          onClick={() => onAvailabilityChange?.('High')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upgrade Availability
        </button>
      </div>
    </WidgetContainer>
  );
};

// Apply the HOC to handle security level state management
export default withSecurityLevelState(MyWidget);
```

## Testing Widgets

Use the provided test utilities to simplify widget testing:

```tsx
import { render, screen } from '@testing-library/react';
import MyWidget from '../MyWidget';
import { createSecurityLevelTestProps } from '../../test/securityLevelTestUtils';

describe('MyWidget', () => {
  test('displays the correct security level and score', () => {
    // Create test props with a High availability level
    const props = createSecurityLevelTestProps({
      availabilityLevel: 'High',
      testId: 'test-my-widget',
    });
    
    render(<MyWidget {...props} />);
    
    // Check if the security level badge shows "High"
    expect(screen.getByTestId('test-my-widget-availability-badge')).toHaveTextContent('High');
    
    // Check if the security score is correctly calculated
    expect(screen.getByText('Security Score: 75%')).toBeInTheDocument();
  });
});
```

## Migrating Existing Widgets

When updating existing widgets to follow the new standards:

1. Replace custom level state management with `withSecurityLevelState` or `useSecurityLevelSync`
2. Update prop interfaces to extend `WithSecurityLevelProps` or an appropriate widget-specific interface
3. Replace custom security level display with `SecurityLevelBadge`
4. Ensure consistent naming (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`)
5. Add handlers for level changes
