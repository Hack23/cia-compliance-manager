# Loading States and User Feedback Components

This document provides examples and best practices for using the loading states and user feedback components in the CIA Compliance Manager.

## Table of Contents

- [LoadingSpinner](#loadingspinner)
- [SkeletonCard](#skeletoncard)
- [Toast Notifications](#toast-notifications)
- [Best Practices](#best-practices)

## LoadingSpinner

The `LoadingSpinner` component provides visual feedback during loading operations.

### Basic Usage

```tsx
import React, { useState } from 'react';
import { LoadingSpinner } from '../components';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  
  if (isLoading) {
    return <LoadingSpinner label="Loading security data..." />;
  }
  
  return <div>Content</div>;
}
```

### Sizes

```tsx
// Small spinner for inline loading
<LoadingSpinner size="small" />

// Medium spinner (default)
<LoadingSpinner size="medium" />

// Large spinner for full-page loading
<LoadingSpinner size="large" />
```

### Accessibility

The LoadingSpinner automatically includes:
- ARIA `role="status"` for screen readers
- ARIA `aria-live="polite"` for non-intrusive announcements
- Screen reader text via `label` prop
- `aria-busy="true"` to indicate loading state

## SkeletonCard

The `SkeletonCard` component improves perceived performance by showing content structure during initial load.

### Basic Usage

```tsx
import React, { useState } from 'react';
import { SkeletonCard } from '../components';

function MyWidget() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  if (isLoading) {
    return <SkeletonCard lines={5} showHeader showFooter />;
  }
  
  return <div>{data}</div>;
}
```

### Customization

```tsx
// Simple skeleton with 3 lines (default)
<SkeletonCard />

// Custom number of lines
<SkeletonCard lines={7} />

// With header and footer
<SkeletonCard showHeader showFooter />

// Without header
<SkeletonCard showHeader={false} />
```

### Accessibility

The SkeletonCard automatically includes:
- ARIA `role="status"` for screen readers
- ARIA `aria-label` describing the loading state
- ARIA `aria-live="polite"` for announcements
- Screen reader text indicating content is loading

## Toast Notifications

Toast notifications provide non-intrusive feedback for user actions and system events.

### Basic Setup

```tsx
import React from 'react';
import { useToast } from '../hooks';
import { ToastContainer } from '../components';

function App() {
  const { toasts, showToast, dismissToast } = useToast();
  
  return (
    <>
      <YourAppContent onAction={showToast} />
      <ToastContainer 
        toasts={toasts} 
        onDismiss={dismissToast}
        position="top-right"
      />
    </>
  );
}
```

### Toast Types

```tsx
const { showToast } = useToast();

// Success notification
showToast({
  type: 'success',
  message: 'Security level updated successfully'
});

// Error notification
showToast({
  type: 'error',
  message: 'Failed to calculate security metrics'
});

// Warning notification
showToast({
  type: 'warning',
  message: 'Security level below recommended threshold'
});

// Info notification
showToast({
  type: 'info',
  message: 'Compliance check in progress'
});
```

### Custom Duration

```tsx
// Auto-dismiss after 5 seconds instead of default 3 seconds
showToast({
  type: 'success',
  message: 'Operation completed',
  duration: 5000
});
```

### Manual Dismiss

```tsx
const { dismissToast, clearToasts } = useToast();

// Dismiss specific toast by ID
dismissToast(toastId);

// Clear all toasts
clearToasts();
```

### Positioning

```tsx
<ToastContainer 
  toasts={toasts} 
  onDismiss={dismissToast}
  position="top-right"  // top-right, top-left, bottom-right, bottom-left, top-center
/>
```

### Accessibility

Toast notifications automatically include:
- ARIA `role="alert"` for immediate announcements
- ARIA `aria-live="assertive"` for priority notifications
- ARIA `aria-atomic="true"` to read entire message
- ARIA labels describing message type
- Keyboard-accessible dismiss buttons

## Best Practices

### Loading States

1. **Use LoadingSpinner for short operations (< 3 seconds)**
   ```tsx
   {isCalculating && <LoadingSpinner label="Calculating..." />}
   ```

2. **Use SkeletonCard for initial page loads**
   ```tsx
   {!dataLoaded && <SkeletonCard lines={5} showHeader />}
   ```

3. **Combine with WidgetContainer's built-in loading**
   ```tsx
   <WidgetContainer title="Security Summary" isLoading={isLoading}>
     <Content />
   </WidgetContainer>
   ```

### Toast Notifications

1. **Use success toasts for completed actions**
   - Security level changes
   - Successful calculations
   - Data saved

2. **Use error toasts for failures**
   - Calculation errors
   - API failures
   - Validation errors

3. **Use warning toasts for concerns**
   - Security levels below threshold
   - Missing required data
   - Potential issues

4. **Use info toasts for status updates**
   - Background processes
   - System notifications
   - Informational messages

### Performance Considerations

1. **Debounce rapid showToast calls**
   ```tsx
   import React, { useMemo } from 'react';
   // Note: debounce can be imported from lodash or a custom utility
   import debounce from 'lodash/debounce';
   
   const debouncedToast = useMemo(
     () => debounce((config) => showToast(config), 500),
     [showToast]
   );
   ```

2. **Limit simultaneous toasts**
   - Toast container handles stacking automatically
   - Consider clearing old toasts before showing new ones for better UX

3. **Use appropriate durations**
   - Success: 3 seconds (default)
   - Error: 5 seconds (longer to allow reading)
   - Warning: 4 seconds
   - Info: 3 seconds

## Example: Complete Widget with Loading and Feedback

```tsx
import React, { useState, useEffect } from 'react';
import { useToast, useCIAContentService } from '../hooks';
import { LoadingSpinner, SkeletonCard, ToastContainer } from '../components';
import WidgetContainer from '../components/common/WidgetContainer';

function SecurityCalculatorWidget() {
  const [data, setData] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toasts, showToast, dismissToast } = useToast();
  const { ciaContentService } = useCIAContentService();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsInitialLoading(true);
      const result = await fetchData();
      setData(result);
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Failed to load initial data'
      });
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleCalculate = async () => {
    try {
      setIsCalculating(true);
      const result = await performCalculation();
      setData(result);
      showToast({
        type: 'success',
        message: 'Calculation completed successfully'
      });
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Calculation failed. Please try again.',
        duration: 5000
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <>
      <WidgetContainer 
        title="Security Calculator" 
        icon="🔒"
        isLoading={isCalculating}
      >
        {isInitialLoading ? (
          <SkeletonCard lines={5} showHeader />
        ) : (
          <div>
            <div>{data?.summary}</div>
            <button onClick={handleCalculate} disabled={isCalculating}>
              {isCalculating ? 'Calculating...' : 'Calculate'}
            </button>
          </div>
        )}
      </WidgetContainer>
      
      <ToastContainer 
        toasts={toasts} 
        onDismiss={dismissToast}
        position="top-right"
      />
    </>
  );
}
```

## Testing

All loading and feedback components include comprehensive test coverage:

```bash
# Run tests for loading components
npm test -- src/components/common/LoadingSpinner.test.tsx
npm test -- src/components/common/SkeletonCard.test.tsx
npm test -- src/components/common/Toast.test.tsx
npm test -- src/hooks/useToast.test.ts
```

## Related Documentation

- [Component Prop Exports](../types/componentPropExports.ts)
- [Widget Container Documentation](../components/common/WidgetContainer.tsx)
- [CIA Content Service Hook](../hooks/useCIAContentService.ts)
