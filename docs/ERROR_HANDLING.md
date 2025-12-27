# Error Handling Documentation

## Overview

The CIA Compliance Manager implements a comprehensive error handling system that provides:

- **Centralized error service** for consistent error logging and user-friendly messages
- **Custom error classes** for different error types (Validation, Network, Retryable)
- **React Error Boundaries** for graceful error recovery
- **Error Context** for application-wide error state management
- **Toast notifications** for non-blocking error messages
- **User-friendly error fallbacks** with technical details option

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
│   ┌──────────┐   ┌──────────────┐  ┌──────────────┐       │
│   │  Error   │   │ ErrorToast   │  │ErrorBoundary │       │
│   │Boundaries│   │(Transient)   │  │ (Critical)   │       │
│   └──────────┘   └──────────────┘  └──────────────┘       │
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
│  │           Custom Error Classes                        │  │
│  │  - ServiceError (with error codes)                    │  │
│  │  - ValidationError (field-specific)                   │  │
│  │  - NetworkError (HTTP status codes)                   │  │
│  │  - RetryableError (with retry timing)                 │  │
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

### ValidationError

For input validation failures.

```typescript
import { ValidationError } from './services/errors';

throw new ValidationError(
  'Email format is invalid',
  'email' // Optional field name
);
```

### NetworkError

For network and HTTP errors.

```typescript
import { NetworkError } from './services/errors';

throw new NetworkError(
  'Failed to fetch data from server',
  500 // HTTP status code
);
```

### RetryableError

For operations that can be retried.

```typescript
import { RetryableError } from './services/errors';

throw new RetryableError(
  'Rate limit exceeded',
  60, // Retry after 60 seconds
  3   // Retry count
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

### ErrorBoundary Component

Enhanced error boundary with recovery options.

```typescript
import { ErrorBoundary } from './components/common/ErrorBoundary';

<ErrorBoundary
  componentName="Security Metrics Widget"
  onError={(error, info) => {
    // Optional error callback
    console.log('Error caught:', error, info);
  }}
  showTechnicalDetails={process.env.NODE_ENV === 'development'}
  allowReset={true}
>
  <SecurityMetricsWidget />
</ErrorBoundary>
```

**Props:**
- `children`: Components to wrap
- `fallback`: Custom fallback component (optional)
- `onError`: Error callback (optional)
- `componentName`: Name for error messages (optional)
- `showTechnicalDetails`: Show technical error details (default: false)
- `allowReset`: Allow error reset/retry (default: true)
- `testId`: Test ID for testing (optional)

### ErrorFallback Component

User-friendly error display with optional technical details.

```typescript
import { ErrorFallback } from './components/common/ErrorFallback';

<ErrorFallback
  title="Widget Error"
  message="Failed to load widget data"
  error={error}
  errorInfo={errorInfo}
  onReset={() => refetch()}
  showTechnicalDetails={true}
/>
```

**Features:**
- Clear error title and message
- Optional reset/retry button
- Collapsible technical details
- Stack trace display
- Component stack display
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
  ValidationError,
  NetworkError 
} from './services/errors';
import { errorService } from './services/errorService';

export class DataService {
  async fetchData(id: string): Promise<Data> {
    try {
      // Validate input
      if (!id) {
        throw new ValidationError('ID is required', 'id');
      }

      // Fetch data
      const response = await fetch(`/api/data/${id}`);
      
      if (!response.ok) {
        throw new NetworkError(
          'Failed to fetch data',
          response.status
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
import { ErrorBoundary } from '../components/common/ErrorBoundary';
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
    <ErrorBoundary componentName="My Widget">
      <div className="widget">
        {/* Widget content */}
      </div>
    </ErrorBoundary>
  );
};
```

## Best Practices

### 1. Always Use Specific Error Classes

```typescript
// ❌ Bad
throw new Error('Invalid input');

// ✅ Good
throw new ValidationError('Email format is invalid', 'email');
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

// ✅ Good - Wrapped with error boundary
<ErrorBoundary componentName="My Widget">
  <MyWidget />
</ErrorBoundary>
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

describe('MyComponent', () => {
  it('should handle errors gracefully', async () => {
    // Mock error
    const mockFetch = vi.fn().mockRejectedValue(
      new NetworkError('Failed to fetch', 500)
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
| `VALIDATION_ERROR` | Validation (1000-1999) | Input validation failed |
| `INVALID_SECURITY_LEVEL` | Validation | Invalid security level provided |
| `INVALID_COMPONENT_TYPE` | Validation | Invalid component type |
| `INVALID_INPUT` | Validation | General invalid input |
| `MISSING_REQUIRED_FIELD` | Validation | Required field missing |
| `DATA_NOT_FOUND` | Data Access (2000-2999) | Data not found |
| `DATA_PROVIDER_ERROR` | Data Access | Data provider error |
| `CONFIGURATION_ERROR` | Data Access | Configuration error |
| `CALCULATION_ERROR` | Business Logic (3000-3999) | Calculation failed |
| `COMPLIANCE_CHECK_ERROR` | Business Logic | Compliance check failed |
| `ROI_CALCULATION_ERROR` | Business Logic | ROI calculation failed |
| `INTERNAL_ERROR` | System (4000-4999) | Internal system error |
| `UNEXPECTED_ERROR` | System | Unexpected error occurred |

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
