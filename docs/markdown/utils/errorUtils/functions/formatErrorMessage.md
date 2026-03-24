[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/errorUtils](../README.md) / formatErrorMessage

# Function: formatErrorMessage()

> **formatErrorMessage**(`error`): `string`

Defined in: [utils/errorUtils.ts:163](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/utils/errorUtils.ts#L163)

Format an error message from various error types

Extracts error messages from various error formats including Error objects,
objects with message properties, and primitives. Provides fallback message
for null/undefined or unrecognized error formats.

## Parameters

### error

`unknown`

Error value of unknown type

## Returns

`string`

Formatted error message string

## Example

```typescript
// Error object
formatErrorMessage(new Error('Failed'))  // 'Failed'

// Object with message
formatErrorMessage({ message: 'Invalid' })  // 'Invalid'

// String
formatErrorMessage('Something wrong')  // 'Something wrong'

// Null/undefined
formatErrorMessage(null)  // 'An unknown error occurred'
formatErrorMessage(undefined)  // 'An unknown error occurred'

// Object without message
formatErrorMessage({ code: 500 })  // 'An unknown error occurred'

// Usage in error display
const handleError = (err: unknown) => {
  const message = formatErrorMessage(err);
  showNotification(message);
};
```
