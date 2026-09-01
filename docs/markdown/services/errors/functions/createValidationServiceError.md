[**CIA Compliance Manager — Markdown Documentation v1.1.142**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / createValidationServiceError

# Function: createValidationServiceError()

> **createValidationServiceError**(`message`, `field?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:269](https://github.com/Hack23/cia-compliance-manager/blob/7749169fe0dfb00ea4da12e5941787f96c33f1d8/src/services/errors.ts#L269)

Create a validation error using ServiceError

## Parameters

### message

`string`

Error message

### field?

`string`

Optional field name that failed validation

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional error context

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
