# Error Handling Patterns

This document describes the error handling patterns and components available in the CIA Compliance Manager application.

## Overview

The application provides a comprehensive set of error handling components and patterns to ensure robust, user-friendly error handling across all widgets and components.

## Components

### 1. LoadingSpinner

A consistent loading indicator for showing data loading states.

**Location:** `src/components/common/LoadingSpinner.tsx`

**Props:**
- `size?: 'sm' | 'md' | 'lg'` - Size of the spinner (default: 'md')
- `testId?: string` - Test ID for automated testing
- `className?: string` - Additional CSS classes

**Example Usage:**
```tsx
import { LoadingSpinner } from '@/components';

// Default medium spinner
<LoadingSpinner />

// Small spinner
<LoadingSpinner size="sm" />

// Large spinner with custom test ID
<LoadingSpinner size="lg" testId="metrics-loader" />
```

### 2. ErrorMessage

User-friendly error message component with optional retry functionality.

**Location:** `src/components/common/ErrorMessage.tsx`

**Props:**
- `title?: string` - Error title (default: 'Error')
- `message: string` - Error message to display (required)
- `retry?: () => void` - Optional retry callback function
- `testId?: string` - Test ID for automated testing
- `className?: string` - Additional CSS classes

**Example Usage:**
```tsx
import { ErrorMessage } from '@/components';

// Simple error message
<ErrorMessage message="Failed to load data" />

// Error with custom title
<ErrorMessage 
  title="Connection Error" 
  message="Unable to reach the server"
/>

// Error with retry button
<ErrorMessage 
  message="Failed to load metrics"
  retry={() => refetchData()}
/>
```

### 3. LoadingSkeleton

Animated placeholder content for better perceived performance.

**Location:** `src/components/common/LoadingSkeleton.tsx`

**Props:**
- `lines?: number` - Number of skeleton lines (default: 3)
- `testId?: string` - Test ID for automated testing
- `className?: string` - Additional CSS classes

**Example Usage:**
```tsx
import { LoadingSkeleton } from '@/components';

// Default 3-line skeleton
<LoadingSkeleton />

// Custom number of lines
<LoadingSkeleton lines={5} />

// With custom styling
<LoadingSkeleton lines={4} className="my-4" />
```

### 4. WidgetErrorBoundary

Error boundary component for catching and handling React rendering errors.

**Location:** `src/components/common/WidgetErrorBoundary.tsx`

**Props:**
- `children: ReactNode` - Child components to protect (required)
- `fallback?: ReactNode` - Custom fallback UI on error
- `onError?: (error: Error, errorInfo: React.ErrorInfo) => void` - Error callback
- `widgetName?: string` - Widget name for error messages
- `testId?: string` - Test ID for automated testing

**Example Usage:**
```tsx
import { WidgetErrorBoundary } from '@/components';

// Basic usage
<WidgetErrorBoundary>
  <SecurityMetricsWidget />
</WidgetErrorBoundary>

// With custom fallback
<WidgetErrorBoundary fallback={<CustomErrorUI />}>
  <ComplianceWidget />
</WidgetErrorBoundary>

// With error logging
<WidgetErrorBoundary 
  widgetName="Security Metrics"
  onError={(error, info) => logToService(error, info)}
>
  <SecurityMetricsWidget />
</WidgetErrorBoundary>
```

## Hooks

### useServiceData

Custom hook for fetching service data with loading and error states.

**Location:** `src/hooks/useServiceData.ts`

**Returns:**
- `data: T | null` - Fetched data
- `loading: boolean` - Loading state
- `error: Error | null` - Error if fetch failed
- `refetch: () => void` - Manual refetch function

**Example Usage:**
```tsx
import { useServiceData } from '@/hooks';
import { LoadingSpinner, ErrorMessage } from '@/components';

const MyWidget: React.FC<Props> = ({ level }) => {
  const { data, loading, error, refetch } = useServiceData(
    () => getSecurityMetrics(level),
    [level]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} retry={refetch} />;
  if (!data) return <div>No data available</div>;

  return <DataDisplay data={data} />;
};
```

## Patterns

### Pattern 1: Widget with Loading and Error States

The standard pattern for widgets that fetch data:

```tsx
import React from 'react';
import { useServiceData } from '@/hooks';
import { LoadingSpinner, ErrorMessage, WidgetContainer } from '@/components';

interface MyWidgetProps {
  levels: SecurityLevels;
}

const MyWidget: React.FC<MyWidgetProps> = ({ levels }) => {
  const { data, loading, error, refetch } = useServiceData(
    () => fetchData(levels),
    [levels]
  );

  return (
    <WidgetContainer 
      title="My Widget"
      isLoading={loading}
      error={error}
    >
      {data ? (
        <DataDisplay data={data} />
      ) : (
        <div>No data available</div>
      )}
    </WidgetContainer>
  );
};

export default MyWidget;
```

### Pattern 2: Widget with Error Boundary

Wrap widgets with error boundaries to prevent crashes:

```tsx
import React from 'react';
import { WidgetErrorBoundary } from '@/components';
import SecurityMetricsWidget from './SecurityMetricsWidget';

const SecurityTab: React.FC = () => {
  return (
    <div>
      <WidgetErrorBoundary widgetName="Security Metrics">
        <SecurityMetricsWidget />
      </WidgetErrorBoundary>
      
      <WidgetErrorBoundary widgetName="Compliance Status">
        <ComplianceStatusWidget />
      </WidgetErrorBoundary>
    </div>
  );
};
```

### Pattern 3: Graceful Degradation

Display partial data when available:

```tsx
const MyWidget: React.FC<Props> = ({ levels }) => {
  const { data, loading, error } = useServiceData(
    () => fetchData(levels),
    [levels]
  );

  if (loading) return <LoadingSkeleton lines={5} />;

  // Show partial data if available
  if (error && data?.partialData) {
    return (
      <WidgetContainer title="My Widget">
        <div className="mb-2 p-2 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded">
          <span className="text-sm text-yellow-800 dark:text-yellow-300">
            ⚠️ Some data unavailable
          </span>
        </div>
        <PartialDataDisplay data={data.partialData} />
      </WidgetContainer>
    );
  }

  // Complete error
  if (error) {
    return (
      <WidgetContainer title="My Widget">
        <ErrorMessage 
          title="Unable to load widget data"
          message={error.message}
        />
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer title="My Widget">
      <FullDataDisplay data={data!} />
    </WidgetContainer>
  );
};
```

### Pattern 4: Using WidgetContainer Built-in Error Handling

The simplest pattern - let WidgetContainer handle errors:

```tsx
const MyWidget: React.FC<Props> = ({ levels }) => {
  const { data, loading, error } = useServiceData(
    () => fetchData(levels),
    [levels]
  );

  return (
    <WidgetContainer 
      title="My Widget"
      isLoading={loading}
      error={error}
    >
      <DataDisplay data={data} />
    </WidgetContainer>
  );
};
```

## Best Practices

### 1. Always Handle Loading States

Show loading indicators to provide user feedback:

```tsx
// ✅ Good
if (loading) return <LoadingSpinner />;

// ❌ Bad - No loading feedback
// Just waiting silently
```

### 2. Provide Actionable Error Messages

Give users clear information and actions:

```tsx
// ✅ Good
<ErrorMessage 
  title="Connection Error"
  message="Unable to connect to the server. Please check your connection."
  retry={refetch}
/>

// ❌ Bad
<ErrorMessage message="Error" />
```

### 3. Use Error Boundaries for Critical Components

Prevent widget failures from crashing the entire app:

```tsx
// ✅ Good
<WidgetErrorBoundary widgetName="Critical Widget">
  <CriticalWidget />
</WidgetErrorBoundary>

// ❌ Bad - No error protection
<CriticalWidget />
```

### 4. Log Errors for Debugging

Always log errors for troubleshooting:

```tsx
// ✅ Good
const { data, error } = useServiceData(() => fetchData());

useEffect(() => {
  if (error) {
    console.error('Failed to fetch data:', error);
  }
}, [error]);

// ❌ Bad - Errors silently ignored
```

### 5. Validate Data Before Using

Use type guards to ensure data integrity:

```tsx
import { isValidSecurityMetrics } from '@/utils/typeGuards';

// ✅ Good
if (!isValidSecurityMetrics(data)) {
  return <ErrorMessage message="Invalid data received" />;
}

// ❌ Bad - No validation
return <Display data={data} />;
```

## Testing Error Scenarios

### Testing Loading States

```tsx
describe('MyWidget', () => {
  it('shows loading spinner while fetching data', () => {
    const { getByTestId } = render(<MyWidget levels={mockLevels} />);
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
```

### Testing Error States

```tsx
describe('MyWidget', () => {
  it('shows error message when fetch fails', () => {
    vi.spyOn(service, 'fetchData').mockImplementation(() => {
      throw new Error('Service unavailable');
    });

    const { getByText } = render(<MyWidget levels={mockLevels} />);
    expect(getByText(/service unavailable/i)).toBeInTheDocument();
  });
});
```

### Testing Error Boundaries

```tsx
describe('WidgetErrorBoundary', () => {
  it('catches and displays errors from child components', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    const { getByText } = render(
      <WidgetErrorBoundary>
        <ThrowError />
      </WidgetErrorBoundary>
    );

    expect(getByText(/test error/i)).toBeInTheDocument();
  });
});
```

## Accessibility

All error handling components follow accessibility best practices:

1. **ARIA Labels**: Components include proper ARIA labels for screen readers
2. **Role Attributes**: Appropriate role attributes (status, alert, etc.)
3. **Keyboard Navigation**: All interactive elements are keyboard accessible
4. **Screen Reader Text**: Hidden text for screen readers where appropriate

Example:
```tsx
<ErrorMessage 
  message="Error occurred"
  retry={refetch}
/>
// Renders with role="alert" and aria-live="polite"
```

## Security Considerations

1. **Never expose sensitive data** in error messages
2. **Sanitize error messages** before displaying to users
3. **Log detailed errors** server-side, show generic messages to users
4. **Validate all user input** before processing

```tsx
// ✅ Good
catch (error) {
  console.error('Detailed error:', error); // Log details
  return <ErrorMessage message="Unable to process request" />; // Generic message
}

// ❌ Bad
catch (error) {
  return <ErrorMessage message={error.stack} />; // Exposes internals
}
```

## Migration Guide

### Migrating Existing Widgets

If you have a widget with custom error handling, migrate to the standard pattern:

**Before:**
```tsx
const MyWidget = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    try {
      const result = fetchData();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data}</div>;
};
```

**After:**
```tsx
import { useServiceData } from '@/hooks';
import { WidgetContainer } from '@/components';

const MyWidget = () => {
  const { data, loading, error } = useServiceData(() => fetchData(), []);

  return (
    <WidgetContainer 
      title="My Widget"
      isLoading={loading}
      error={error}
    >
      <div>{data}</div>
    </WidgetContainer>
  );
};
```

## Summary

The error handling system provides:

- ✅ Consistent error display across all widgets
- ✅ User-friendly loading states
- ✅ Graceful error recovery with retry options
- ✅ Error boundaries to prevent app crashes
- ✅ Comprehensive testing support
- ✅ Full accessibility compliance
- ✅ Type-safe implementations

For questions or issues, refer to the component source code or tests for detailed examples.
