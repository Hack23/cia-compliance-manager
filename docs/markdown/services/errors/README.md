[**CIA Compliance Manager — Markdown Documentation v1.1.126**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / services/errors

# services/errors

# Service Error Types

Standardized error handling for service layer with error codes and context.

## Business Perspective
Provides consistent error reporting across all services, enabling better
debugging, logging, and user-facing error messages. 🔒

## Enumerations

- [ServiceErrorCode](enumerations/ServiceErrorCode.md)

## Classes

- [ServiceError](classes/ServiceError.md)

## Interfaces

- [ErrorContext](interfaces/ErrorContext.md)

## Functions

- [createValidationError](functions/createValidationError.md)
- [createDataNotFoundError](functions/createDataNotFoundError.md)
- [createCalculationError](functions/createCalculationError.md)
- [isServiceError](functions/isServiceError.md)
- [getErrorMessage](functions/getErrorMessage.md)
- [createValidationServiceError](functions/createValidationServiceError.md)
- [createNetworkServiceError](functions/createNetworkServiceError.md)
- [createRetryableServiceError](functions/createRetryableServiceError.md)
- [isValidationError](functions/isValidationError.md)
- [isNetworkError](functions/isNetworkError.md)
- [isRetryableError](functions/isRetryableError.md)
