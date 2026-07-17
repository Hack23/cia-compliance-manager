[**CIA Compliance Manager — UML Diagrams v1.1.114**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errorService](../README.md) / ErrorService

# Class: ErrorService

Defined in: [services/errorService.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/services/errorService.ts#L85)

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

### getInstance()

> `static` **getInstance**(): `ErrorService`

Defined in: [services/errorService.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/services/errorService.ts#L91)

Get the singleton instance

#### Returns

`ErrorService`

***

### logError()

> **logError**(`error`, `context?`, `severity?`): `void`

Defined in: [services/errorService.ts:111](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/services/errorService.ts#L111)

Log an error with context

#### Parameters

##### error

`Error`

Error to log

##### context?

[`ErrorContext`](../../errors/interfaces/ErrorContext.md)

Optional error context

##### severity?

[`ErrorSeverity`](../enumerations/ErrorSeverity.md) = `ErrorSeverity.MEDIUM`

Error severity level

#### Returns

`void`

***

### getUserFriendlyMessage()

> **getUserFriendlyMessage**(`error`): `string`

Defined in: [services/errorService.ts:161](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/services/errorService.ts#L161)

Get a user-friendly error message

#### Parameters

##### error

`unknown`

Error to convert to user-friendly message

#### Returns

`string`

User-friendly error message

***

### canRecover()

> **canRecover**(`error`): `boolean`

Defined in: [services/errorService.ts:248](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/services/errorService.ts#L248)

Check if an error can be recovered from

#### Parameters

##### error

`unknown`

Error to check

#### Returns

`boolean`

True if the error is recoverable

***

### getErrorSeverity()

> **getErrorSeverity**(`error`): [`ErrorSeverity`](../enumerations/ErrorSeverity.md)

Defined in: [services/errorService.ts:293](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/services/errorService.ts#L293)

Get error severity based on error type

#### Parameters

##### error

`unknown`

Error to analyze

#### Returns

[`ErrorSeverity`](../enumerations/ErrorSeverity.md)

Error severity level

***

### formatErrorForDisplay()

> **formatErrorForDisplay**(`error`, `includeDetails?`): `string`

Defined in: [services/errorService.ts:352](https://github.com/Hack23/cia-compliance-manager/blob/cfd93aac82f8561e7f02de334225220469ce29a6/src/services/errorService.ts#L352)

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
