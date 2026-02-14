[**CIA Compliance Manager Diagrams v1.1.18**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [services](../README.md) / ErrorService

# Class: ErrorService

Defined in: [services/errorService.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errorService.ts#L85)

Centralized Error Service

Provides consistent error handling, logging, and user-friendly message generation
across the entire application.

## Example

```typescript
// Log an error with context
errorService.logError(
  new Error('Data fetch failed'),
  { service: 'ComplianceService', method: 'fetchData' }
);

// Get user-friendly message
const message = errorService.getUserFriendlyMessage(error);

// Check if error is recoverable
const canRetry = errorService.canRecover(error);
```

## Methods

### canRecover()

> **canRecover**(`error`): `boolean`

Defined in: [services/errorService.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errorService.ts#L261)

Check if an error can be recovered from

#### Parameters

##### error

`unknown`

Error to check

#### Returns

`boolean`

True if the error is recoverable

***

### formatErrorForDisplay()

> **formatErrorForDisplay**(`error`, `includeDetails?`): `string`

Defined in: [services/errorService.ts:377](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errorService.ts#L377)

Create a formatted error message for display

#### Parameters

##### error

`unknown`

Error to format

##### includeDetails?

`boolean` = `false`

Whether to include technical details

#### Returns

`string`

Formatted error message

***

### getErrorSeverity()

> **getErrorSeverity**(`error`): [`ErrorSeverity`](../enumerations/ErrorSeverity.md)

Defined in: [services/errorService.ts:312](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errorService.ts#L312)

Get error severity based on error type

#### Parameters

##### error

`unknown`

Error to analyze

#### Returns

[`ErrorSeverity`](../enumerations/ErrorSeverity.md)

Error severity level

***

### getInstance()

> `static` **getInstance**(): `ErrorService`

Defined in: [services/errorService.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errorService.ts#L91)

Get the singleton instance

#### Returns

`ErrorService`

***

### getUserFriendlyMessage()

> **getUserFriendlyMessage**(`error`): `string`

Defined in: [services/errorService.ts:166](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errorService.ts#L166)

Get a user-friendly error message

#### Parameters

##### error

`unknown`

Error to convert to user-friendly message

#### Returns

`string`

User-friendly error message

***

### logError()

> **logError**(`error`, `context?`, `severity?`): `void`

Defined in: [services/errorService.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/2d08eaf26d0d9c6e1af02c3b8ecb25ccff2a6aff/src/services/errorService.ts#L112)

Log an error with context

#### Parameters

##### error

`Error`

Error to log

##### context?

[`ErrorContext`](../interfaces/ErrorContext.md)

Optional error context

##### severity?

[`ErrorSeverity`](../enumerations/ErrorSeverity.md) = `ErrorSeverity.MEDIUM`

Error severity level

#### Returns

`void`
