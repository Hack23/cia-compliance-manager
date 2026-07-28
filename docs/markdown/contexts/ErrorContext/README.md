[**CIA Compliance Manager — Markdown Documentation v1.1.121**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / contexts/ErrorContext

# contexts/ErrorContext

# Error Context

React Context for centralized error state management across the application.
Provides error tracking, toast notifications, and error recovery actions.

## Business Perspective
Centralizes error handling state management, enabling consistent error tracking
and user notifications across the entire application. Critical for operational
excellence and user experience. 🛡️

## Technical Perspective
React Context that manages error state, toast notifications, and provides
actions for error handling. Integrates with centralized error service for
logging and user-friendly message generation.

## Interfaces

- [ErrorEntry](interfaces/ErrorEntry.md)
- [ToastConfig](interfaces/ToastConfig.md)
- [ErrorContextValue](interfaces/ErrorContextValue.md)
- [ErrorProviderProps](interfaces/ErrorProviderProps.md)

## Variables

- [ErrorProvider](variables/ErrorProvider.md)

## Functions

- [useError](functions/useError.md)

## References

### default

Renames and re-exports [ErrorProvider](variables/ErrorProvider.md)
