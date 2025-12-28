# Error Handling Documentation

## Overview

The CIA Compliance Manager implements a comprehensive error handling system that provides:

- **Centralized error service** for consistent error logging and user-friendly messages
- **Extended ServiceError system** with factory functions for different error types (Validation, Network, Retryable)
- **React Error Boundaries** (WidgetErrorBoundary) for graceful error recovery
- **Error Context** for application-wide error state management
- **Toast notifications** for non-blocking error messages
- **User-friendly error displays** using existing ErrorMessage component

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           ErrorProvider (React Context)               │  │
│  │  - Centralizes error state                            │  │
│  │  - Manages toast notifications                        │  │
│  │  - Tracks error history                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│   ┌───────────────┐   ┌──────────────┐  ┌──────────────┐  │
│   │Widget Error   │   │ ErrorToast   │  │ErrorMessage  │  │
│   │Boundary (11)  │   │(Transient)   │  │(Fallback UI) │  │
│   └───────────────┘   └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              ErrorService                             │  │
│  │  - Logs errors with context                           │  │
│  │  - Generates user-friendly messages                   │  │
│  │  - Determines error severity                          │  │
│  │  - Checks error recoverability                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         ServiceError with Factory Functions           │  │
│  │  - ServiceError (base class with error codes)         │  │
│  │  - createValidationServiceError() factory             │  │
│  │  - createNetworkServiceError() factory                │  │
│  │  - createRetryableServiceError() factory              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Error Classes

### ServiceError

Base error class for service-layer errors with error codes and context.

```typescript
import { ServiceError, ServiceErrorCode } from './services/errors';

throw new ServiceError(
  'Invalid security level provided',
  ServiceErrorCode.VALIDATION_ERROR,
  { service: 'ComplianceService', level: invalidLevel }
);
```

**Properties:**
- `code`: ServiceErrorCode - Categorizes the error
- `context`: ErrorContext - Additional information
- `cause`: Error - Original error if wrapping
- `timestamp`: Date - When the error occurred

### Factory Functions for Common Error Types

Instead of creating separate error classes, use factory functions that return ServiceError instances with appropriate error codes:

#### createValidationServiceError

For input validation failures.

```typescript
import { createValidationServiceError } from './services/errors';

throw createValidationServiceError(
  'Email format is invalid',
  'email', // Optional field name
  { component: 'UserForm' } // Optional additional context
);
```

#### createNetworkServiceError

For network and HTTP errors.

```typescript
import { createNetworkServiceError } from './services/errors';

throw createNetworkServiceError(
  'Failed to fetch data from server',
  500, // HTTP status code
  { service: 'DataService' } // Optional additional context
);
```

#### createRetryableServiceError

For operations that can be retried.

```typescript
import { createRetryableServiceError } from './services/errors';

throw createRetryableServiceError(
  'Rate limit exceeded',
  60, // Retry after 60 seconds
  { component: 'APIClient' } // Optional additional context
);
```

## Error Service

The centralized error service provides consistent error handling across the application.

### Methods

#### logError(error, context?, severity?)

Logs an error with context and severity.

```typescript
import { errorService, ErrorSeverity } from './services/errorService';

try {
  await fetchData();
} catch (error) {
  errorService.logError(
    error as Error,
    { service: 'DataService', operation: 'fetch' },
    ErrorSeverity.HIGH
  );
}
```

#### getUserFriendlyMessage(error)

Converts any error into a user-friendly message.

```typescript
const userMessage = errorService.getUserFriendlyMessage(error);
// Returns: "Network connection issue. Please check your connection and try again."
```

#### canRecover(error)

Checks if an error is recoverable.

```typescript
if (errorService.canRecover(error)) {
  // Show retry button
}
```

#### getErrorSeverity(error)

Determines error severity.

```typescript
const severity = errorService.getErrorSeverity(error);
// Returns: ErrorSeverity.HIGH
```

## Error Context

React Context for application-wide error state management.

### Usage

```typescript
import { useError } from './contexts/ErrorContext';

function MyComponent() {
  const { addError, showToast, clearError } = useError();

  const handleSubmit = async () => {
    try {
      await saveData();
    } catch (error) {
      // Track error in context
      addError(error as Error, { component: 'MyComponent', action: 'submit' });
      
      // Show toast notification
      showToast({
        message: 'Failed to save data',
        title: 'Save Error',
        onRetry: handleSubmit
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
}
```

### Methods

- `addError(error, context?)` - Track an error
- `clearError(id)` - Remove specific error
- `clearAllErrors()` - Remove all errors
- `showToast(config)` - Display toast notification
- `hideToast()` - Hide current toast
- `getLatestError()` - Get most recent error

## Error Boundaries

### WidgetErrorBoundary Component

The application uses the existing WidgetErrorBoundary component, which is actively wrapping all 11 widgets in production. This component integrates with the error service for user-friendly error displays.

```typescript
import { WidgetErrorBoundary } from './components/common/WidgetErrorBoundary';

<WidgetErrorBoundary 
  widgetName="Security Metrics Widget"
  onError={(error, errorInfo) => {
    // Optional error callback
    console.log('Error caught:', error, errorInfo);
  }}
>
  <SecurityMetricsWidget />
</WidgetErrorBoundary>
```

**Props:**
- `children`: Components to wrap
- `widgetName`: Name of the widget for error messages
- `onError`: Error callback (optional)
- `testId`: Test ID for testing (optional)

**Features:**
- Component-level error isolation
- Integration with centralized logger
- Uses ErrorMessage component for fallback UI
- Consistent error handling across all widgets

### ErrorMessage Component (Fallback UI)

The existing ErrorMessage component is used by WidgetErrorBoundary as the default fallback UI for displaying errors.

```typescript
import { ErrorMessage } from './components/common/ErrorMessage';

<ErrorMessage
  title="Widget Error"
  message="Failed to load widget data"
  onRetry={() => refetch()}
/>
```

**Features:**
- Clear error title and message display
- Optional retry functionality via retry callback
- Consistent styling with error icon
- Test IDs for testing
- Accessibility support (ARIA attributes)

## Toast Notifications

### ErrorToast Component

Non-blocking toast notifications for transient errors.

```typescript
import { ErrorToast } from './components/common/ErrorToast';

const [showToast, setShowToast] = useState(false);

<ErrorToast
  message="Failed to save changes"
  title="Save Error"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
  autoHideDuration={5000}
  position="top-right"
  onRetry={() => saveChanges()}
/>
```

**Props:**
- `message`: Error message (required)
- `title`: Toast title (default: "Error")
- `isVisible`: Visibility state (required)
- `onDismiss`: Dismiss callback (required)
- `autoHideDuration`: Auto-hide time in ms (default: 5000, 0 to disable)
- `position`: Toast position (default: "top-right")
- `onRetry`: Retry callback (optional)

**Positions:** `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`

## Service Layer Integration

### Example Service Implementation

```typescript
import { 
  ServiceError, 
  ServiceErrorCode,
  createValidationServiceError,
  createNetworkServiceError
} from './services/errors';
import { errorService } from './services/errorService';

export class DataService {
  async fetchData(id: string): Promise<Data> {
    try {
      // Validate input
      if (!id) {
        throw createValidationServiceError('ID is required', 'id', {
          service: 'DataService',
          method: 'fetchData'
        });
      }

      // Fetch data
      const response = await fetch(`/api/data/${id}`);
      
      if (!response.ok) {
        throw createNetworkServiceError(
          'Failed to fetch data',
          response.status,
          { service: 'DataService', method: 'fetchData', id }
        );
      }

      return await response.json();
    } catch (error) {
      // Log error
      errorService.logError(
        error as Error,
        { service: 'DataService', method: 'fetchData', id }
      );

      // Re-throw or return undefined
      throw error;
    }
  }
}
```

## Widget Integration

### Adding Error Handling to Widgets

```typescript
import { WidgetErrorBoundary } from '../components/common/WidgetErrorBoundary';
import { useError } from '../contexts/ErrorContext';

export const MyWidget: React.FC<MyWidgetProps> = (props) => {
  const { addError, showToast } = useError();
  const [data, setData] = useState<Data | null>(null);

  const loadData = async () => {
    try {
      const result = await dataService.fetchData(props.id);
      setData(result);
    } catch (error) {
      addError(error as Error, { widget: 'MyWidget', action: 'load' });
      showToast({
        message: 'Failed to load widget data',
        onRetry: loadData
      });
    }
  };

  return (
    <WidgetErrorBoundary widgetName="My Widget">
      <div className="widget">
        {/* Widget content */}
      </div>
    </WidgetErrorBoundary>
  );
};
```

## Best Practices

### 1. Always Use Factory Functions for Specific Error Types

```typescript
// ❌ Bad
throw new Error('Invalid input');

// ✅ Good
throw createValidationServiceError('Email format is invalid', 'email');
```

### 2. Provide Context

```typescript
// ❌ Bad
errorService.logError(error);

// ✅ Good
errorService.logError(error, {
  service: 'ComplianceService',
  method: 'calculateScore',
  userId: currentUser.id
});
```

### 3. Use Error Boundaries for Component Errors

```typescript
// ❌ Bad - No error boundary
<MyWidget />

// ✅ Good - Wrapped with WidgetErrorBoundary
<WidgetErrorBoundary widgetName="My Widget">
  <MyWidget />
</WidgetErrorBoundary>
```

### 4. Show User-Friendly Messages

```typescript
// ❌ Bad
alert(error.message); // Technical message

// ✅ Good
showToast({
  message: errorService.getUserFriendlyMessage(error)
});
```

### 5. Provide Recovery Options

```typescript
// ❌ Bad - No recovery option
showToast({ message: 'Failed to save' });

// ✅ Good - With retry option
showToast({
  message: 'Failed to save',
  onRetry: () => saveData()
});
```

### 6. Log Before Displaying

```typescript
// ✅ Good pattern
try {
  await operation();
} catch (error) {
  // 1. Log for debugging
  errorService.logError(error as Error, context);
  
  // 2. Track in context
  addError(error as Error, context);
  
  // 3. Notify user
  showToast({
    message: errorService.getUserFriendlyMessage(error),
    onRetry: canRecover ? () => operation() : undefined
  });
}
```

## Testing

### Testing Error Handling

```typescript
import { render, screen } from '@testing-library/react';
import { ErrorProvider } from './contexts/ErrorContext';
import { createNetworkServiceError } from './services/errors';

describe('MyComponent', () => {
  it('should handle errors gracefully', async () => {
    // Mock error using factory function
    const mockFetch = vi.fn().mockRejectedValue(
      createNetworkServiceError('Failed to fetch', 500)
    );

    render(
      <ErrorProvider>
        <MyComponent fetch={mockFetch} />
      </ErrorProvider>
    );

    // Trigger error
    await user.click(screen.getByRole('button', { name: 'Load' }));

    // Assert toast is shown
    expect(screen.getByTestId('error-toast')).toBeInTheDocument();
    expect(screen.getByText(/network connection/i)).toBeInTheDocument();
  });
});
```

## Error Severity Levels

| Severity | Description | When to Use |
|----------|-------------|-------------|
| **LOW** | Informational errors | Validation errors, user input errors |
| **MEDIUM** | User action may be needed | Network errors, missing data |
| **HIGH** | Significant functionality impacted | Calculation errors, service failures |
| **CRITICAL** | Application-wide impact | System configuration errors, internal failures |

## Error Codes

| Code | Category | Description |
|------|----------|-------------|
| `VALIDATION_ERROR` | Validation | Input validation failed |
| `INVALID_SECURITY_LEVEL` | Validation | Invalid security level provided |
| `INVALID_COMPONENT_TYPE` | Validation | Invalid component type |
| `INVALID_INPUT` | Validation | General invalid input |
| `MISSING_REQUIRED_FIELD` | Validation | Required field missing |
| `DATA_NOT_FOUND` | Data Access | Data not found |
| `DATA_PROVIDER_ERROR` | Data Access | Data provider error |
| `CONFIGURATION_ERROR` | Data Access | Configuration error |
| `CALCULATION_ERROR` | Business Logic | Calculation failed |
| `COMPLIANCE_CHECK_ERROR` | Business Logic | Compliance check failed |
| `ROI_CALCULATION_ERROR` | Business Logic | ROI calculation failed |
| `NETWORK_ERROR` | Network | Network request failed |
| `CONNECTION_ERROR` | Network | Connection failed |
| `TIMEOUT_ERROR` | Network | Request timed out |
| `RETRYABLE_ERROR` | Retryable | Operation can be retried |
| `RATE_LIMIT_ERROR` | Retryable | Rate limit exceeded |
| `INTERNAL_ERROR` | System | Internal system error |
| `UNEXPECTED_ERROR` | System | Unexpected error occurred |

> **Note:** The `ServiceErrorCode` enum uses string identifiers (e.g., `'VALIDATION_ERROR'`). The categories listed above are organizational groupings for documentation purposes. Error code comments in the source code (e.g., "1000-1999") indicate organizational ranges but the actual values are strings.

## Troubleshooting

### Common Issues

#### 1. useError throws "must be used within ErrorProvider"

**Solution:** Ensure component is wrapped with ErrorProvider.

```typescript
// App.tsx
<ErrorProvider>
  <App />
</ErrorProvider>
```

#### 2. Toast not appearing

**Solution:** Check that ErrorProvider is rendering and isVisible is true.

```typescript
const { showToast } = useError();
showToast({ message: 'Test message' });
```

#### 3. Error boundaries not catching errors

**Solution:** Error boundaries only catch rendering errors. Use try-catch for async errors.

```typescript
// ❌ Won't be caught by error boundary
useEffect(() => {
  fetchData(); // Async error
}, []);

// ✅ Will work
useEffect(() => {
  try {
    fetchData();
  } catch (error) {
    handleError(error);
  }
}, []);
```

## Performance Considerations

1. **Error Tracking Limit:** Set `maxErrors` prop on ErrorProvider to prevent memory leaks
2. **Toast Auto-Dismiss:** Use appropriate `autoHideDuration` to avoid cluttering UI
3. **Error Logging:** Errors are logged synchronously; consider debouncing for high-frequency errors
4. **Context Updates:** Minimize error context updates to reduce re-renders

## Future Enhancements

- Error monitoring integration (Sentry, LogRocket, etc.)
- Error analytics and reporting dashboard
- Automatic error recovery strategies
- Error notification preferences
- Batch error handling
- Error rate limiting
- Custom error handlers per component type

## References

- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Error Handling Best Practices](https://react.dev/learn/error-boundaries)
- [TypeScript Error Handling](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)

## Support

For questions or issues with error handling:

1. Check this documentation
2. Review existing error handling patterns in the codebase
3. Consult the error service tests for usage examples
4. Open a GitHub issue with the `error-handling` label
