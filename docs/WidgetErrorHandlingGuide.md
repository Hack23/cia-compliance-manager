# Widget Error Handling & Loading States Guide

## Overview

This guide provides comprehensive patterns and best practices for implementing consistent error handling and loading states across all widgets in the CIA Compliance Manager.

## Table of Contents

- [Components Overview](#components-overview)
- [Error Handling Pattern](#error-handling-pattern)
- [Loading States](#loading-states)
- [Complete Widget Example](#complete-widget-example)
- [Testing Error Scenarios](#testing-error-scenarios)
- [Accessibility Considerations](#accessibility-considerations)

## Components Overview

### Available Components

1. **`WidgetErrorBoundary`** - React Error Boundary for catching rendering errors
2. **`useWidgetError` Hook** - Custom hook for managing error state
3. **`ErrorMessage` Component** - Displays error messages with retry functionality
4. **`LoadingSkeleton` Component** - Shows loading placeholders with multiple variants
5. **`LoadingSpinner` Component** - Simple spinner for loading states

### Component Locations

**Note:** Import paths shown are relative to widget files in `src/components/widgets/`. Adjust paths based on your actual widget location.

```typescript
// From widgets in src/components/widgets/[category]/
import { useWidgetError } from '../../../hooks/useWidgetError';
import WidgetErrorBoundary from '../../common/WidgetErrorBoundary';
import ErrorMessage from '../../common/ErrorMessage';
import LoadingSkeleton from '../../common/LoadingSkeleton';
import LoadingSpinner from '../../common/LoadingSpinner';
import WidgetContainer from '../../common/WidgetContainer';
```

## Error Handling Pattern

### Standard Widget Structure

Every widget should follow this structure:

```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { useWidgetError } from '../../../hooks/useWidgetError';
import { useCIAContentService } from '../../../hooks/useCIAContentService';
import WidgetErrorBoundary from '../../common/WidgetErrorBoundary';
import WidgetContainer from '../../common/WidgetContainer';
import ErrorMessage from '../../common/ErrorMessage';
import LoadingSkeleton from '../../common/LoadingSkeleton';

const MyWidget: React.FC<MyWidgetProps> = ({ 
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "my-widget"
}) => {
  // 1. Error handling hook
  const { error, hasError, handleError, clearError } = useWidgetError('MyWidget');
  
  // 2. Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  
  // 3. Service hook
  const { ciaContentService } = useCIAContentService();
  
  // 4. Data loading function with error handling
  const loadData = useCallback(async () => {
    setIsLoading(true);
    clearError();
    
    try {
      if (!ciaContentService) {
        throw new Error('Content service unavailable');
      }
      
      const result = await ciaContentService.getData(availabilityLevel);
      setData(result);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [ciaContentService, availabilityLevel, handleError, clearError]);
  
  // 5. Load data on mount and when dependencies change
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  // 6. Render structure with error boundary
  return (
    <WidgetErrorBoundary widgetName="My Widget">
      <WidgetContainer
        title="My Widget"
        icon="📊"
        className={className}
        testId={testId}
      >
        {/* Loading state */}
        {isLoading && (
          <LoadingSkeleton 
            variant="summary" 
            testId={`${testId}-loading`}
          />
        )}
        
        {/* Error state */}
        {hasError && (
          <ErrorMessage
            message={error?.message || 'Failed to load data'}
            retry={loadData}
            testId={`${testId}-error`}
          />
        )}
        
        {/* Content state */}
        {!isLoading && !hasError && data && (
          <div data-testid={`${testId}-content`}>
            {/* Widget content here */}
          </div>
        )}
        
        {/* Empty state */}
        {!isLoading && !hasError && !data && (
          <div data-testid={`${testId}-empty`}>
            No data available
          </div>
        )}
      </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default MyWidget;
```

## Loading States

### LoadingSkeleton Variants

The `LoadingSkeleton` component supports multiple variants to match different widget layouts:

#### 1. Default Variant (Simple Lines)

```typescript
<LoadingSkeleton lines={3} />
```

Best for simple text content.

#### 2. Summary Variant

```typescript
<LoadingSkeleton variant="summary" />
```

Best for:
- SecuritySummaryWidget
- Summary sections with headers and metrics

Shows: header + content block + 3-column metrics grid

#### 3. Chart Variant

```typescript
<LoadingSkeleton variant="chart" />
```

Best for:
- SecurityVisualizationWidget
- Any chart/graph widget

Shows: title + large chart area + legend items

#### 4. List Variant

```typescript
<LoadingSkeleton variant="list" />
```

Best for:
- SecurityResourcesWidget
- List-based widgets

Shows: 5 list items with icons and text

#### 5. Metrics Variant

```typescript
<LoadingSkeleton variant="metrics" />
```

Best for:
- CostEstimationWidget
- Metric card displays

Shows: 4-column grid of metric cards

#### 6. Tabs Variant

```typescript
<LoadingSkeleton variant="tabs" />
```

Best for:
- Tabbed interfaces
- SecuritySummaryWidget tabs

Shows: tab buttons + content area

### LoadingSpinner

For simpler loading states or when you need more control:

```typescript
<LoadingSpinner size="md" testId="my-widget-spinner" />
```

Sizes: `sm`, `md`, `lg`

## Complete Widget Example

Here's a complete example showing all patterns:

```typescript
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useWidgetError } from '../../../hooks/useWidgetError';
import { useCIAContentService } from '../../../hooks/useCIAContentService';
import { SecurityLevel } from '../../../types/cia';
import { MyWidgetProps } from '../../../types/widget-props';
import WidgetErrorBoundary from '../../common/WidgetErrorBoundary';
import WidgetContainer from '../../common/WidgetContainer';
import ErrorMessage from '../../common/ErrorMessage';
import LoadingSkeleton from '../../common/LoadingSkeleton';
import MetricCard from '../../common/MetricCard';

/**
 * Example widget with comprehensive error handling
 * 
 * ## Business Perspective
 * Provides security metrics visualization with reliable error handling
 * ensuring users always have visibility into system status. 📊
 * 
 * ## Technical Perspective
 * Implements standardized error boundary, loading states, and retry
 * mechanisms for robust user experience.
 */
const ExampleWidget: React.FC<MyWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "example-widget"
}) => {
  // Error handling
  const { 
    error, 
    hasError, 
    handleError, 
    clearError 
  } = useWidgetError('ExampleWidget');
  
  // Loading and data state
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  
  // Service hook
  const { ciaContentService } = useCIAContentService();
  
  // Load data with comprehensive error handling
  const loadData = useCallback(async () => {
    setIsLoading(true);
    clearError();
    
    try {
      // Validate service availability
      if (!ciaContentService) {
        throw new Error('Service unavailable. Please try again later.');
      }
      
      // Fetch data
      const data = await ciaContentService.getMetrics(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
      
      // Validate response
      if (!data) {
        throw new Error('No data received from service');
      }
      
      setMetrics(data);
    } catch (err) {
      // Handle different error types
      if (err instanceof TypeError) {
        handleError(new Error('Invalid data format received'));
      } else if (err instanceof Error && err.message.includes('network')) {
        handleError(new Error('Network error. Please check your connection.'));
      } else {
        handleError(err);
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    handleError,
    clearError
  ]);
  
  // Load data on mount and when dependencies change
  useEffect(() => {
    loadData();
  }, [loadData]);
  
  // Memoize computed values
  const totalScore = useMemo(() => {
    if (!metrics) return 0;
    return metrics.availability + metrics.integrity + metrics.confidentiality;
  }, [metrics]);
  
  return (
    <WidgetErrorBoundary widgetName="Example Widget">
      <WidgetContainer
        title="Security Metrics"
        icon="📊"
        className={className}
        testId={testId}
      >
        {/* Loading State */}
        {isLoading && (
          <LoadingSkeleton 
            variant="metrics" 
            testId={`${testId}-loading`}
          />
        )}
        
        {/* Error State */}
        {hasError && (
          <ErrorMessage
            title="Failed to Load Metrics"
            message={error?.message || 'An unexpected error occurred'}
            retry={loadData}
            testId={`${testId}-error`}
          />
        )}
        
        {/* Content State */}
        {!isLoading && !hasError && metrics && (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-testid={`${testId}-content`}
          >
            <MetricCard
              title="Availability"
              value={metrics.availability}
              subtitle="Current Level"
              testId={`${testId}-availability`}
            />
            <MetricCard
              title="Integrity"
              value={metrics.integrity}
              subtitle="Current Level"
              testId={`${testId}-integrity`}
            />
            <MetricCard
              title="Confidentiality"
              value={metrics.confidentiality}
              subtitle="Current Level"
              testId={`${testId}-confidentiality`}
            />
            <MetricCard
              title="Total Score"
              value={totalScore}
              subtitle="Combined"
              testId={`${testId}-total`}
            />
          </div>
        )}
        
        {/* Empty State */}
        {!isLoading && !hasError && !metrics && (
          <div 
            className="text-center py-8 text-gray-500"
            data-testid={`${testId}-empty`}
          >
            <p>No metrics available</p>
            <button
              onClick={loadData}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Load Metrics
            </button>
          </div>
        )}
      </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default ExampleWidget;
```

## Testing Error Scenarios

### Test Structure

Every widget should have tests for:
1. Loading state
2. Error state
3. Retry functionality
4. Success state
5. Empty state

### Example Test File

```typescript
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ExampleWidget from './ExampleWidget';

// Mock the service
vi.mock('../../../hooks/useCIAContentService', () => ({
  useCIAContentService: vi.fn(),
}));

describe('ExampleWidget Error Handling', () => {
  const defaultProps = {
    availabilityLevel: 'High' as const,
    integrityLevel: 'High' as const,
    confidentialityLevel: 'High' as const,
  };
  
  let mockService;
  
  beforeEach(() => {
    mockService = {
      getMetrics: vi.fn(),
    };
    
    vi.mocked(useCIAContentService).mockReturnValue({
      ciaContentService: mockService,
      error: null,
      isLoading: false,
    });
  });
  
  describe('Loading State', () => {
    it('should display loading skeleton while fetching data', () => {
      render(<ExampleWidget {...defaultProps} />);
      
      expect(screen.getByTestId('example-widget-loading')).toBeInTheDocument();
      expect(screen.getByLabelText('Loading metrics')).toBeInTheDocument();
    });
  });
  
  describe('Error State', () => {
    it('should display error message when service fails', async () => {
      const mockError = new Error('Service unavailable');
      mockService.getMetrics.mockRejectedValue(mockError);
      
      render(<ExampleWidget {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('example-widget-error')).toBeInTheDocument();
        expect(screen.getByText('Service unavailable')).toBeInTheDocument();
      });
    });
    
    it('should handle network errors with specific message', async () => {
      const networkError = new Error('Network request failed');
      mockService.getMetrics.mockRejectedValue(networkError);
      
      render(<ExampleWidget {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });
  });
  
  describe('Retry Functionality', () => {
    it('should retry loading data when retry button clicked', async () => {
      const mockError = new Error('Temporary error');
      const mockData = { availability: 80, integrity: 85, confidentiality: 90 };
      
      mockService.getMetrics
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce(mockData);
      
      render(<ExampleWidget {...defaultProps} />);
      
      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByTestId('example-widget-error')).toBeInTheDocument();
      });
      
      // Click retry button
      const retryButton = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(retryButton);
      
      // Wait for success
      await waitFor(() => {
        expect(screen.queryByTestId('example-widget-error')).not.toBeInTheDocument();
        expect(screen.getByTestId('example-widget-content')).toBeInTheDocument();
      });
      
      expect(mockService.getMetrics).toHaveBeenCalledTimes(2);
    });
  });
  
  describe('Success State', () => {
    it('should display metrics when data loads successfully', async () => {
      const mockData = { availability: 80, integrity: 85, confidentiality: 90 };
      mockService.getMetrics.mockResolvedValue(mockData);
      
      render(<ExampleWidget {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('example-widget-content')).toBeInTheDocument();
        expect(screen.getByTestId('example-widget-availability')).toBeInTheDocument();
        expect(screen.getByTestId('example-widget-integrity')).toBeInTheDocument();
        expect(screen.getByTestId('example-widget-confidentiality')).toBeInTheDocument();
      });
    });
  });
  
  describe('Empty State', () => {
    it('should display empty state when no data available', async () => {
      mockService.getMetrics.mockResolvedValue(null);
      
      render(<ExampleWidget {...defaultProps} />);
      
      await waitFor(() => {
        expect(screen.getByTestId('example-widget-empty')).toBeInTheDocument();
        expect(screen.getByText('No metrics available')).toBeInTheDocument();
      });
    });
  });
});
```

## Accessibility Considerations

### ARIA Attributes

Always include proper ARIA attributes for error and loading states:

```typescript
// Loading state
<LoadingSkeleton 
  variant="metrics"
  testId="widget-loading"
  // Automatically includes:
  // role="status"
  // aria-label="Loading metrics"
/>

// Error state
<ErrorMessage
  message="Failed to load"
  retry={retry}
  testId="widget-error"
  // Automatically includes:
  // role="alert"
  // aria-live="polite"
/>

// For critical errors, use announceToScreenReader() with 'assertive' priority
// (see "Screen Reader Announcements" section below)

// Content updates
<div 
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {/* Dynamic content */}
</div>
```

### Screen Reader Announcements

```typescript
import { announceToScreenReader } from '../../../utils/accessibility';

// Announce successful data load
useEffect(() => {
  if (data && !isLoading) {
    announceToScreenReader('Metrics loaded successfully');
  }
}, [data, isLoading]);

// Announce errors
useEffect(() => {
  if (hasError) {
    announceToScreenReader(`Error: ${error?.message}`, 'assertive');
  }
}, [hasError, error]);
```

### Keyboard Navigation

Ensure retry buttons are keyboard accessible:

```typescript
<button
  onClick={retry}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      retry();
    }
  }}
  aria-label="Retry loading data"
>
  Try Again
</button>
```

## Best Practices Checklist

- [ ] Widget wrapped in `WidgetErrorBoundary`
- [ ] Error handling uses `useWidgetError` hook
- [ ] Loading state shows appropriate `LoadingSkeleton` variant
- [ ] Error messages are clear and actionable
- [ ] Retry functionality is implemented
- [ ] All states have proper test coverage
- [ ] ARIA attributes included for accessibility
- [ ] Error and success announcements for screen readers
- [ ] TypeScript types are explicit (no `any`)
- [ ] Error logging uses centralized logger

## Additional Resources

- [WidgetErrorBoundary Component](../src/components/common/WidgetErrorBoundary.tsx)
- [useWidgetError Hook](../src/hooks/useWidgetError.ts)
- [ErrorMessage Component](../src/components/common/ErrorMessage.tsx)
- [LoadingSkeleton Component](../src/components/common/LoadingSkeleton.tsx)
- [Accessibility Utils](../src/utils/accessibility.ts)

---

**Last Updated:** 2025-12-31
**Version:** 1.0
**Maintainer:** CIA Compliance Manager Team
